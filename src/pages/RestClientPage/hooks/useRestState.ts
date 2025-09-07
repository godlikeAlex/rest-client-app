import { produce } from 'immer';

import { useRestContext } from '../context/RestContext';

export default function useRestState() {
  const { state, setState } = useRestContext();

  function setBody(body: string) {
    setState((currentState) =>
      produce(currentState, (draft) => {
        draft.body = body;
      })
    );
  }

  return {
    headers: state.headers,
    body: state.body,
    setBody,
  };
}
