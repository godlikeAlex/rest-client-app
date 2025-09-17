import { Container, Text } from '@mantine/core';
import { VariablesRepeater } from '@/pages/Variables/components';
import { useTranslation } from 'react-i18next';

export default function VariablesPage() {
  const { t } = useTranslation();
  return (
    <Container px="md" py="xs">
      <Text py="xs">{t('variables.header')}:</Text>
      <VariablesRepeater />
    </Container>
  );
}
