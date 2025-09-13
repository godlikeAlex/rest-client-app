import { Button, Center, Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import RepeaterRow from '@/pages/RestClientPage/components/HeadersRepeater/RepeaterRow';
import useVariables from '@/pages/Variables/hooks/useVariables';

export default function VariablesRepeater() {
  const userId = 'user2';

  const { t } = useTranslation();

  const { variables, addVariable, updateVariable, deleteVariable } =
    useVariables(userId);

  const variableItem = variables.map(({ key, value, enabled }, index) => (
    <RepeaterRow
      key={index}
      inputs={{ key, value, enabled }}
      onChange={(key, value) => updateVariable(index, key, value)}
      onDelete={() => deleteVariable(index)}
    />
  ));

  return (
    <>
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50} />
            <Table.Th>{t('variables.variableRepeater.key')}</Table.Th>
            <Table.Th>{t('variables.variableRepeater.value')}</Table.Th>
            <Table.Th w={50} />
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{variableItem}</Table.Tbody>
      </Table>

      <Center>
        <Button mt={'xs'} variant="light" onClick={() => addVariable()}>
          {t('variables.variableRepeater.addVariable')}
        </Button>
      </Center>
    </>
  );
}
