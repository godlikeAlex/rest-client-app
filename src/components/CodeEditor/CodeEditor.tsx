import Editor from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';

export type CodeEditorHighlightLanguage =
  | 'plaintext'
  | 'javascript'
  | 'text'
  | 'json'
  | 'php'
  | 'python'
  | 'java'
  | 'csharp'
  | 'go';

interface Props {
  value: string;
  onChange?: (value: string) => void;
  language?: CodeEditorHighlightLanguage;
  readOnly?: boolean;
  height?: number;
}

export default function CodeEditor({
  value,
  onChange,
  language = 'json',
  readOnly = false,
  height = 150,
}: Props) {
  const { t } = useTranslation();

  const handleChange = (value?: string) => {
    if (!onChange || !value || readOnly) return;

    onChange(value);
  };

  return (
    <Editor
      theme="vs-light"
      value={value}
      height={height}
      language={language}
      onChange={handleChange}
      options={{
        readOnly,
        readOnlyMessage: { value: t('restClient.codeGeneration.readOnly') },
        fontSize: 12,
        contextmenu: false,
        scrollBeyondLastLine: false,
        bracketPairColorization: { enabled: false },
        stickyScroll: { enabled: false },
        scrollbar: { verticalScrollbarSize: 2, useShadows: false },
        minimap: { enabled: false },
        suggest: {
          selectionMode: 'never',
          showWords: false,
          shareSuggestSelections: false,
        },
        hover: { enabled: false },
        parameterHints: { enabled: false },
        quickSuggestions: false,
        suggestOnTriggerCharacters: false,
        folding: false,
        renderLineHighlight: 'none',
        domReadOnly: readOnly,
        unicodeHighlight: {
          ambiguousCharacters: false,
        },
      }}
    />
  );
}
