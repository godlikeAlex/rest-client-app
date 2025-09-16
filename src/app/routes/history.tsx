import { requireAuth } from '@/utils/authCheck';
import { useLoaderData } from 'react-router';
import type { Route } from './+types/history';
import HistoryService from '@/services/HistoryService';

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuth(request);
  if (!user?.uid) return [];
  const history = await HistoryService.getUserHistory(user?.uid);
  return history;
}

export default function History() {
  const requests = useLoaderData<typeof loader>();
  console.log(requests);
  return (
    <ul>
      {requests.map((req) => (
        <li key={req.id}>
          <p>URL:{[req.url]}</p>
          <p>Method:{[req.method]}</p>
          <p>Duration:{[req.duration]}</p>
        </li>
      ))}
    </ul>
  );
}
