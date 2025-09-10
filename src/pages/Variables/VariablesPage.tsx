import { Container, Text } from '@mantine/core';
import { VariablesRepeater } from '@/pages/Variables/components';

export default function VariablesPage() {
  return (
    <Container px="md" py="xs">
      <Text py="xs">Variables in request:</Text>
      <VariablesRepeater />
    </Container>
  );
}
