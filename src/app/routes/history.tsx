import { requireAuth } from '@/utils/authCheck';
import type { Route } from './+types/history';

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuth(request);
  return user;
}

export default function History() {
  return <p>There will be history here</p>;
}
