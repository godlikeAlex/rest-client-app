import { useMemo, useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { Alert, Flex, Select, type ComboboxItem } from '@mantine/core';

import { CodeEditor, CopyButton } from '@/components';
import type { CodeEditorHighlightLanguage } from '@/components/CodeEditor';

import CodeGeneratorService, {
  type SnippetGeneratorKey,
} from '@/services/CodeGeneratorService';
import useRequestForm from '@/pages/RestClientPage/hooks/useRequestForm';
import useHeaders from '@/pages/RestClientPage/hooks/useHeaders';
import useRestState from '@/pages/RestClientPage/hooks/useRestState';

import type { Variable } from '@/types/variables';
import { useUser } from '@/hooks/useUser';

type ComboboxSnippet = {
  label: string;
  value: SnippetGeneratorKey;
};

const CODEGENERATION_LANGUAGES: Array<ComboboxSnippet> = [
  {
    label: 'curl',
    value: 'curl',
  },
  {
    label: 'JavaScript (Fetch api)',
    value: 'javascriptFetch',
  },
  {
    label: 'JavaScript (XHR)',
    value: 'javascriptXHR',
  },
  {
    label: 'NodeJS',
    value: 'nodejs',
  },
  {
    label: 'php',
    value: 'php',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'C#',
    value: 'csharp',
  },
  {
    label: 'Go',
    value: 'go',
  },
];

const CODE_HIGHLIGHTS: Record<
  SnippetGeneratorKey,
  CodeEditorHighlightLanguage
> = {
  curl: 'javascript',
  javascriptFetch: 'javascript',
  javascriptXHR: 'javascript',
  nodejs: 'javascript',
  java: 'java',
  python: 'python',
  csharp: 'csharp',
  go: 'go',
  php: 'php',
};

const defaultCodeSnippetLanguage = CODEGENERATION_LANGUAGES[1];

export default function CodeGenerationTab() {
  const { t } = useTranslation();
  const { body } = useRestState();
  const { url, method } = useRequestForm();
  const { headers } = useHeaders();

  const [language, setLanguage] = useState<ComboboxSnippet | null>(
    defaultCodeSnippetLanguage
  );
  const { user } = useUser();

  const generatedCode = useMemo(() => {
    if (!language) return;

    const variables: Variable[] = user?.variables ?? [];

    return CodeGeneratorService.generateCodeSnippet(
      language.value,
      {
        url: url,
        method: method,
        headers,
        body,
      },
      variables
    );
  }, [language, url, method, headers, body]);

  function handleSelectLanguage(_: string | null, option: ComboboxItem) {
    const targetLanguage = CODEGENERATION_LANGUAGES.find(
      (language) => language.value === option.value
    );

    if (targetLanguage) {
      setLanguage(targetLanguage);
    }
  }

  return (
    <>
      <Flex mb={'xs'} justify="space-between" gap={'md'}>
        <Select
          data={CODEGENERATION_LANGUAGES}
          onChange={handleSelectLanguage}
          value={language ? language.value : null}
          allowDeselect={false}
          placeholder="language"
        />

        <CopyButton content={generatedCode?.toString() ?? ''} />
      </Flex>

      {generatedCode ? (
        <CodeEditor
          language={language ? CODE_HIGHLIGHTS[language.value] : undefined}
          value={generatedCode.toString()}
          readOnly
        />
      ) : (
        <Alert
          variant="light"
          color="yellow"
          title={t('restClient.codeGeneration.errorTitle')}
          icon={<IconInfoCircle />}
        >
          {t('restClient.codeGeneration.errorDescription')}
        </Alert>
      )}
    </>
  );
}
