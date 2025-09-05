import { Button, Center, Table } from '@mantine/core';
import RepeaterRow from './RepeaterRow';

import useHeaders from '@/pages/RestClientPage/hooks/useHeaders';

export default function HeadersRepeater() {
  const { headers, addHeader, updateHeader, deleteHeader } = useHeaders();

  const headerRows = headers.map(({ key, value, enabled }, index) => (
    <RepeaterRow
      key={index}
      inputs={{ key, value, enabled }}
      onChange={(input, value) => updateHeader(index, input, value)}
      onDelete={() => deleteHeader(index)}
    />
  ));

  return (
    <>
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50} />
            <Table.Th>Key</Table.Th>
            <Table.Th>Value</Table.Th>
            <Table.Th w={50} />
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{headerRows}</Table.Tbody>
      </Table>

      <Center>
        <Button mt={'xs'} variant="light" onClick={() => addHeader()}>
          Add Header
        </Button>
      </Center>
    </>
  );
}
