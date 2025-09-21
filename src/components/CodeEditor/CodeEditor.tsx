import CodeMirror, { EditorView, type Extension } from '@uiw/react-codemirror';

import { type LanguageSupport } from '@codemirror/language';

import { useEffect, useState } from 'react';
import { LANGUAGES } from './languages';

export type CodeEditorHighlightLanguage = keyof typeof LANGUAGES;

interface Props {
  value: string;
  onChange?: (value: string) => void;
  language?: CodeEditorHighlightLanguage;
  readOnly?: boolean;
  type?: 'code' | 'area';
}

export default function CodeEditor({
  value,
  onChange,
  language = 'json',
  readOnly = false,
  type = 'code',
}: Props) {
  const [languageSyntax, setLanguageSyntax] = useState<LanguageSupport | null>(
    null
  );

  const [codeEditorTheme, setCodeEditorTheme] = useState<Extension>(() => {
    return EditorView.theme({
      '&.cm-focused': {
        outline: 'none',
      },
      '.cm-gutters': {
        backgroundColor: '#fafafaff',
        color: 'dark',
        opacity: 1,
        border: 'none',
      },
    });
  });

  const extensions = languageSyntax
    ? [languageSyntax, codeEditorTheme]
    : [codeEditorTheme];

  useEffect(() => {
    const codeEditorTheme = EditorView.theme({
      '&.cm-focused': {
        outline: 'none',
      },
      '.cm-gutters': {
        backgroundColor: '#fafafaff',
        color: 'dark',
        opacity: type === 'code' ? 1 : 0,
        border: 'none',
      },
    });

    setCodeEditorTheme(codeEditorTheme);
  }, [type]);

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
      height="200px"
      extensions={extensions}
      onChange={onChange}
      style={{ fontSize: 12 }}
      readOnly={readOnly}
    />
  );
}
