import {
  ActionIcon,
  CopyButton as CopyButtonMantine,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface Props {
  content?: string;
}

export default function CopyButton({ content }: Props) {
  const { t } = useTranslation();

  return (
    <CopyButtonMantine value={content ?? ''} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          disabled={!content}
          label={copied ? t('copyButton.copied') : t('copyButton.copy')}
          withArrow
          position="right"
        >
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            variant="light"
            onClick={copy}
            size="input-sm"
          >
            {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButtonMantine>
  );
}
