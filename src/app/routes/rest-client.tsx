import { RestClientPage } from '@/pages';
import RestContextProvider, {
  type RestClientState,
} from '@/pages/RestClientPage/context/RestContext';
import i18next from '@/app/i18next.server';

import type { Route } from './+types/rest-client';
import { data } from 'react-router';
import { UrlTransformerService } from '@/services';

export async function loader({ request, params }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);

  const title = t('restClient.seo.title');
  const description = t('restClient.seo.description');

  const decoded = UrlTransformerService.decode({
    url: params.url,
    body: params.body,
    headers: new URL(request.url).searchParams,
  });

  const initialData: Partial<RestClientState> = {
    method: params.method,
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
  return (
    <RestContextProvider initialState={loaderData.initialData}>
      <RestClientPage />
    </RestContextProvider>
  );
}
