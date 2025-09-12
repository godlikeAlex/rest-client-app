import { requireAuth } from '@/utils/authCheck';
import type { Route } from './+types/history';
import { useLoaderData } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuth(request);
  return user;
}

export default function History() {
  const data = useLoaderData();
  console.log(data);
  return <p>There will be history here</p>;
}
