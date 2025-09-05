import { CodeEditor } from '@/components';
import useRestState from '@/pages/RestClientPage/hooks/useRestState';

export default function BodyTab() {
  const { body, setBody } = useRestState();

  return <CodeEditor value={body} onChange={(code) => setBody(code)} />;
}
