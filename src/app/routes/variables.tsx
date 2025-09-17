import type { Route } from './+types/variables';
import i18next from '@/app/i18next.server';
import { data } from 'react-router';
import { VariablesPage } from '@/pages/Variables';
import { requireAuth } from '@/utils/authCheck';

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);

  const t = await i18next.getFixedT(request);

  const title = t('home.seo.title');
  const description = t('home.seo.description');

  return data({ title, description });
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: 'description', content: loaderData.description },
  ];
}

export default function Variables() {
  return <VariablesPage />;
}
