import { useTranslation } from 'react-i18next';
import type { Route } from './+types/home';
import i18next from '@/app/i18next.server';
import { data } from 'react-router';
import { Header } from '@/components';
import { SignIn } from '@/components/SignIn';

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

export default function Home() {
  const { t } = useTranslation();

  return (
    <main>
      <Header />
      <h1>{t('home.homeTitle')}</h1>
      <SignIn />
    </main>
  );
}
