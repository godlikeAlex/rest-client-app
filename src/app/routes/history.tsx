import { requireAuth } from '@/utils/authCheck';
import type { Route } from './+types/history';
import HistoryService from '@/services/HistoryService';
import HistoryPage from '@/pages/HistoryPage/HistoryPage';
import i18next from '../i18next.server';

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuth(request);
  const t = await i18next.getFixedT(request);
  if (!user?.uid) return { history: [], title: '', description: '' };

  const title = t('history.seo.title');
  const description = t('history.seo.description');

  const history = await HistoryService.getUserHistory(user?.uid);
  return {
    history,
    meta: {
      title,
      description,
    },
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.meta?.title },
    { name: 'description', content: loaderData.meta?.description },
  ];
}

export default function History() {
  return <HistoryPage />;
}
