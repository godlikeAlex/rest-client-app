import type { HeaderClient } from '@/types/headers';
import { ActionIcon, Checkbox, Input, Table } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onChange: <K extends keyof HeaderClient>(
    key: K,
    value: HeaderClient[K]
  ) => void;
  onDelete: () => void;
  inputs: HeaderClient;
  canDisable: boolean;
}

export default function RepeaterRow({
  onChange,
  onDelete,
  inputs,
  canDisable,
}: Props) {
  const { t } = useTranslation();

  return (
    <Table.Tr
      bg={!inputs.enabled ? 'var(--mantine-color-gray-light)' : undefined}
    >
      <Table.Td>
        {canDisable && (
          <Checkbox
            size="xs"
            aria-label={`Enable ${inputs.key}`}
            checked={inputs.enabled}
            onChange={(e) => onChange('enabled', e.target.checked)}
          />
        )}
      </Table.Td>
      <Table.Td>
        <Input
          size="xs"
          variant="unstyled"
          placeholder={t('restClient.headersRepeater.key')}
          name="key"
          value={inputs.key}
          onChange={(e) => onChange('key', e.target.value)}
        />
      </Table.Td>
      <Table.Td>
        <Input
          size="xs"
          variant="unstyled"
          placeholder={t('restClient.headersRepeater.value')}
          name="value"
          value={inputs.value}
          onChange={(e) => onChange('value', e.target.value)}
        />
      </Table.Td>

      <Table.Td>
        <ActionIcon
          variant="subtle"
          color="red"
          aria-label={`Delete ${inputs.key}`}
          onClick={onDelete}
        >
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
}
