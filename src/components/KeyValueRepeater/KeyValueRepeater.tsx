import { Button, Center, Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import RepeaterRow from './RepeaterRow';
import type useKeyValueRepeater from './useKeyValueRepeater';

interface Props extends ReturnType<typeof useKeyValueRepeater> {
  canDisable?: boolean;
}

export default function KeyValueRepeater({
  rows,
  addRow,
  updateRow,
  deleteRow,
  canDisable = true,
}: Props) {
  const { t } = useTranslation();

  const repeaterRows = rows.map(({ key, value, enabled }, index) => (
    <RepeaterRow
      key={index}
      inputs={{ key, value, enabled }}
      onChange={(input, value) => updateRow(index, input, value)}
      onDelete={() => deleteRow(index)}
      canDisable={canDisable}
    />
  ));

  return (
    <>
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50} />
            <Table.Th>{t('restClient.headersRepeater.key')}</Table.Th>
            <Table.Th>{t('restClient.headersRepeater.value')}</Table.Th>
            <Table.Th w={50} />
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{repeaterRows}</Table.Tbody>
      </Table>

      <Center>
        <Button mt={'xs'} variant="light" onClick={() => addRow()}>
          {t('restClient.headersRepeater.addHeader')}
        </Button>
      </Center>
    </>
  );
}
