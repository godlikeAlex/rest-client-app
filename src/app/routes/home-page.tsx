import { WelcomeBanner } from '@/components';
import type { Route } from './+types/home-page';
import { data } from 'react-router';
import i18next from '../i18next.server';

export async function loader({ request }: Route.LoaderArgs) {
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

export default function HomePage() {
  return <WelcomeBanner />;
}
