import { produce } from 'immer';
import { useRestContext } from '../context/RestContext';

export default function useRequestForm() {
  const { state, setState } = useRestContext();

  function setMethod(method: string) {
    setState((currentState) =>
      produce(currentState, (draft) => {
        draft.method = method;
      })
    );
  }

  function setUrl(url: string) {
    setState((currentState) =>
      produce(currentState, (draft) => {
        draft.url = url;
      })
    );
  }

  return {
    url: state.url,
    method: state.method,
    setUrl,
    setMethod,
  };
}
