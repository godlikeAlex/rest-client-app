import { RestClientPage } from '@/pages';
import RestContextProvider, {
  type RestClientState,
} from '@/pages/RestClientPage/context/RestContext';
import i18next from '@/app/i18next.server';

import type { Route } from './+types/rest-client';
import { data, useRevalidator } from 'react-router';
import { requireAuth } from '@/utils/authCheck';
import { RequestService, UrlTransformerService } from '@/services';
import { useEffect } from 'react';
import HistoryService, { type RequestData } from '@/services/HistoryService';

export async function action({ request, params }: Route.ActionArgs) {
  const user = await requireAuth(request);
  if (!user) return;
  const { url, body, headers } = UrlTransformerService.decode({
    url: params.url ?? '',
    body: params.body,
    headers: new URL(request.url).searchParams,
  });

  const response = await RequestService.sendRequest({
    url,
    method: params.method ?? 'GET',
    body,
    clientHeaders: headers,
  });

  const data: Omit<RequestData, 'id' | 'timestamp'> = {
    url,
    method: params.method ?? 'GET',
    status: response.error ? 0 : response.status,
    duration: response.error ? 0 : response.time,
    time: Date.now(),
    requestSize: response.error ? body?.length || 0 : response.requestSize,
    responseSize: response.error ? 0 : response.responseSize,
    error: response.error ? response.message : null,
    requestData: {
      headers: headers.map((h) => ({
        key: h.key,
        value: h.value,
        enabled: true,
      })),
      body: body || '',
      queryParams: {},
    },
  };

  await HistoryService.saveUserHistory(user.uid, data);
  return response;
}

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireAuth(request);
  const t = await i18next.getFixedT(request);

  const title = t('restClient.seo.title');
  const description = t('restClient.seo.description');

  const decoded = UrlTransformerService.decode({
    url: params.url,
    body: params.body,
    headers: new URL(request.url).searchParams,
  });

  const initialData: Partial<RestClientState> = {
    method: params.method ?? 'GET',
    body: decoded.body,
    url: decoded.url,
    headers: decoded.headers,
  };

  return data({ title, description, initialData });
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: 'description', content: loaderData.description },
  ];
}

export default function RestClient({ loaderData }: Route.ComponentProps) {
  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();

    const handleFocus = () => {
      revalidator.revalidate();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <RestContextProvider initialState={loaderData.initialData}>
      <RestClientPage />
    </RestContextProvider>
  );
}
