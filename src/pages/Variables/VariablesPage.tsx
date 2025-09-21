import { Center, Container, Loader, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { KeyValueRepeater } from '@/components';
import { useKeyValueRepeater } from '@/components/KeyValueRepeater';
import { useEffect, useState } from 'react';
import VariablesService from '@/services/VariablesService';
import { useUser } from '@/hooks/useUser';
import { type Variable } from '@/types/variables';

export default function VariablesPage() {
  const { t } = useTranslation();
  const { user } = useUser();

  const userID = user ? user.uid : '';

  const [variables, setVariables] = useState<Variable[]>(() =>
    VariablesService.getUsersVariables(userID)
  );
  const [initialized, setInitialized] = useState(false);

  const repeaterInstance = useKeyValueRepeater({
    state: variables,
    onStateChange: (updater) => {
      if (!initialized) return;

      setVariables(updater(variables));
    },
  });

  useEffect(() => {
    const loaded = VariablesService.getUsersVariables(userID);
    setVariables(loaded ?? []);
    setInitialized(true);
  }, [userID]);

  useEffect(() => {
    VariablesService.setUsersVariables(userID, variables);
  }, [variables, userID]);

  return (
    <Container px="md" py="xs" mih={'80vh'}>
      <Title order={3} py="xs">
        {t('variables.header')}:
      </Title>
      {initialized ? (
        <KeyValueRepeater canDisable={false} {...repeaterInstance} />
      ) : (
        <Center>
          <Loader />
        </Center>
      )}
    </Container>
  );
}
