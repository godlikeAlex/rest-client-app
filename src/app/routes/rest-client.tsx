import { RestClientPage } from '@/pages';
import RestContextProvider from '@/pages/RestClientPage/context/RestContext';

export function meta() {
  return [{ title: 'Rest Client' }, { name: 'description', content: '' }];
}

export default function RestClient() {
  return (
    <RestContextProvider>
      <RestClientPage />
    </RestContextProvider>
  );
}
