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

export async function action({ request, params }: Route.ActionArgs) {
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
