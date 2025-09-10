import { Button, Center, Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import RepeaterRow from '@/pages/RestClientPage/components/HeadersRepeater/RepeaterRow';
import useVariables from '@/pages/Variables/hooks/useVariables';

export default function VariablesRepeater() {
  const { t } = useTranslation();
  const { variables, addVariable, updateVariable, deleteVariable } =
    useVariables();

  const variableItem = variables.map(({ key, value, enabled }, index) => (
    <RepeaterRow
      key={index}
      inputs={{ key, value, enabled }}
      onChange={() => updateVariable()}
      onDelete={() => deleteVariable()}
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

        <Table.Tbody>{variableItem}</Table.Tbody>
      </Table>

      <Center>
        <Button mt={'xs'} variant="light" onClick={() => addVariable()}>
          {t('restClient.headersRepeater.addHeader')}
        </Button>
      </Center>
    </>
  );
}
