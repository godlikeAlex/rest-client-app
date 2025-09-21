import { produce } from 'immer';

import { useRestContext } from '../context/RestContext';
import type { HeaderClient } from '@/types/headers';

export default function useRestState() {
  const { state, setState } = useRestContext();

  function setBody(body: string) {
    setState((currentState) =>
      produce(currentState, (draft) => {
        draft.body = body;
      })
    );
  }

  function setHeaders(headers: HeaderClient[]) {
    setState((currentState) =>
      produce(currentState, (draft) => {
        draft.headers = headers;
      })
    );
  }

  return {
    headers: state.headers,
    body: state.body,
    setHeaders: setHeaders,
    setBody,
  };
}
