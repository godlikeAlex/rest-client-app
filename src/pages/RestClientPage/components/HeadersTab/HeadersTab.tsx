import { KeyValueRepeater } from '@/components';
import { useKeyValueRepeater } from '@/components/KeyValueRepeater';
import useRestState from '@/pages/RestClientPage/hooks/useRestState';

export default function HeadersRepeater() {
  const { headers, setHeaders } = useRestState();

  const repeaterInstance = useKeyValueRepeater({
    state: headers,
    onStateChange: (updater) => setHeaders(updater(headers)),
  });

  return <KeyValueRepeater {...repeaterInstance} />;
}
