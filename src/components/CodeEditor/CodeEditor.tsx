import CodeMirror, { EditorView } from '@uiw/react-codemirror';

import { type LanguageSupport } from '@codemirror/language';

import { githubLight } from '@uiw/codemirror-theme-github';
import { useEffect, useState } from 'react';

const LANGUAGES = {
  javascript: async () =>
    (await import('@codemirror/lang-javascript')).javascript,
  json: async () => (await import('@codemirror/lang-json')).json,
  html: async () => (await import('@codemirror/lang-html')).html,
  go: async () => (await import('@codemirror/lang-go')).go,
  java: async () => (await import('@codemirror/lang-java')).java,
  csharp: async () => (await import('@replit/codemirror-lang-csharp')).csharp,
  python: async () => (await import('@codemirror/lang-python')).python,
  php: async () => (await import('@codemirror/lang-php')).php,
} as const;

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
      const syntaxModule = await LANGUAGES[language];
      const syntax = await syntaxModule();

      setLanguageSyntax(syntax());
    }

    fetchLanguageSyntax();
  }, [language]);

  return (
    <CodeMirror
      value={value}
      theme={githubLight}
      height="200px"
      extensions={extensions}
      onChange={onChange}
      style={{ fontSize: 12 }}
      readOnly={readOnly}
    />
  );
}
