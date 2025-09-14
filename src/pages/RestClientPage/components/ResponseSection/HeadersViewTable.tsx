import { Table } from '@mantine/core';

interface Props {
  headers: { key: string; value: string }[];
}

export default function HeadersViewTable({ headers }: Props) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Key</Table.Th>
          <Table.Th>Value</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {headers.map(({ key, value }) => (
          <Table.Tr key={key}>
            <Table.Td>{key}</Table.Td>
            <Table.Td>{value}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
