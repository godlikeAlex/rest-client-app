import type { action } from '@/app/routes/rest-client';
import { useFetcher } from 'react-router';

const KEY = 'REST_API_FETCH';

export default function useFetcherRest() {
  const fetcher = useFetcher<typeof action>({ key: KEY });

  return fetcher;
}
