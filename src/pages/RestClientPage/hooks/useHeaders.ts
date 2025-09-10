import { produce } from 'immer';
import { useRestContext } from '../context/RestContext';
import type { HeaderClient } from '@/types/headers';

export default function useHeaders() {
  const { state, setState } = useRestContext();

  function addHeader(
    header: HeaderClient = { key: '', value: '', enabled: true }
  ) {
    setState((currentState) =>
      produce(currentState, (draft) => {
        draft.headers.push(header);
      })
    );
  }

  function updateHeader<T extends keyof HeaderClient>(
    headerPosition: number,
    input: T,
    value: HeaderClient[T]
  ) {
    setState((currentState) =>
      produce(currentState, (draft) => {
        const targetHeader = draft.headers[headerPosition];

        if (!targetHeader) return;

        targetHeader[input] = value;
      })
    );
  }

  function deleteHeader(headerPosition: number) {
    setState((currentState) =>
      produce(currentState, (draft) => {
        draft.headers.splice(headerPosition, 1);
      })
    );
  }

  return {
    headers: state.headers,
    addHeader,
    updateHeader,
    deleteHeader,
  };
}
