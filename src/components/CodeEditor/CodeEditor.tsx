import CodeMirror, { EditorView } from '@uiw/react-codemirror';

import { type LanguageSupport } from '@codemirror/language';

import { useEffect, useState } from 'react';
import { LANGUAGES } from './languages';

export type CodeEditorHighlightLanguage = keyof typeof LANGUAGES;

interface Props {
  value: string;
  onChange?: (value: string) => void;
  language?: CodeEditorHighlightLanguage;
  readOnly?: boolean;
}

const codeEditorTheme = EditorView.theme({
  '&.cm-focused': {
    outline: 'none',
  },
  '.cm-gutters': {
    backgroundColor: '#fafafaff',
    color: 'dark',
    border: 'none',
  },
});

export default function CodeEditor({
  value,
  onChange,
  language = 'json',
  readOnly = false,
}: Props) {
  const [languageSyntax, setLanguageSyntax] = useState<LanguageSupport | null>(
    null
  );

  const extensions = languageSyntax
    ? [languageSyntax, codeEditorTheme]
    : [codeEditorTheme];

  useEffect(() => {
    async function fetchLanguageSyntax() {
      if (!window) return;

      const syntaxModule = await LANGUAGES[language];

      if (syntaxModule) {
        const syntax = await syntaxModule();
        setLanguageSyntax(syntax());
      }
    }

    fetchLanguageSyntax();
  }, [language]);

  return (
    <CodeMirror
      value={value}
      // theme={githubLight}
      height="200px"
      extensions={extensions}
      onChange={onChange}
      style={{ fontSize: 12 }}
      readOnly={readOnly}
    />
  );
}
