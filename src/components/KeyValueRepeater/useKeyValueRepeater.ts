import { produce } from 'immer';

export interface KeyValueItem {
  enabled: boolean;
  key: string;
  value: string;
}

type UpdateFN = (state: KeyValueItem[]) => KeyValueItem[];

interface UseKeyValueRepeaterParams {
  state: KeyValueItem[];
  onStateChange: (updater: UpdateFN) => void;
}

export default function useKeyValueRepeater({
  state,
  onStateChange,
}: UseKeyValueRepeaterParams) {
  function addRow(
    header: KeyValueItem = { key: '', value: '', enabled: true }
  ) {
    onStateChange((currentState) =>
      produce(currentState, (draft) => {
        draft.push(header);
      })
    );
  }

  function updateRow<T extends keyof KeyValueItem>(
    headerPosition: number,
    input: T,
    value: KeyValueItem[T]
  ) {
    onStateChange((currentState) =>
      produce(currentState, (draft) => {
        const targetHeader = draft[headerPosition];

        if (!targetHeader) return;

        targetHeader[input] = value;
      })
    );
  }

  function deleteRow(headerPosition: number) {
    onStateChange((currentState) =>
      produce(currentState, (draft) => {
        draft.splice(headerPosition, 1);
      })
    );
  }

  return {
    rows: state,
    addRow,
    updateRow,
    deleteRow,
  };
}
