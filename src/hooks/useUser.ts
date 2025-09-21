import { useRouteLoaderData } from 'react-router';
import type { Variable } from '@/types/variables';

type User = {
  uid: string;
  variables?: Variable[];
  name: string;
};

export const useUser = () => {
  return useRouteLoaderData('root') as { user: User | null };
};
