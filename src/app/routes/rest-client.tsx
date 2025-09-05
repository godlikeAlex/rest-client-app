import { RestClientPage } from '@/pages';
import RestContextProvider from '@/pages/RestClientPage/context/RestContext';
import i18next from '@/app/i18next.server';

import type { Route } from './+types/rest-client';
import { data } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);

  const title = t('restClient.seo.title');
  const description = t('restClient.seo.description');

  return data({ title, description });
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: 'description', content: loaderData.description },
  ];
}

export default function RestClient() {
  return (
    <RestContextProvider>
      <RestClientPage />
    </RestContextProvider>
  );
}
