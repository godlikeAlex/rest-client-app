import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';

import * as ghThemes from '@uiw/codemirror-theme-github';

const LANGUAGES = {
  javascript: () => javascript(),
  json: () => json(),
  html: () => html(),
} as const;

interface Props {
  value: string;
  onChange: (value: string) => void;
  language?: keyof typeof LANGUAGES;
  readOnly?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  language = 'json',
  readOnly = false,
}: Props) {
  const targetLanguageProcessor = LANGUAGES[language];

  return (
    <CodeMirror
      value={value}
      theme={ghThemes.githubLight}
      height="200px"
      extensions={[
        targetLanguageProcessor(),
        EditorView.theme({
          '&.cm-focused': {
            outline: 'none',
          },
        }),
      ]}
      onChange={onChange}
      style={{ fontSize: 12 }}
      readOnly={readOnly}
    />
  );
}
