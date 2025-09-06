import type { Route } from './+types/home';
import i18next from '@/app/i18next.server';
import { data, Outlet } from 'react-router';
import { Footer, Header } from '@/components';

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
  const user = false;
  return (
    <main>
      <Header isUserLog={user} />
      <Outlet />
      <Footer />
    </main>
  );
}
