import { Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export default function NavBar() {
  const { t } = useTranslation();
  return (
    <Group gap="xl">
      <Button variant="light" component={Link} to={'rest-client'}>
        {t('home.restButton')}
      </Button>
      <Button variant="light" component={Link} to={'variables'} color="blue">
        {t('home.variablesButton')}
      </Button>
      <Button variant="light" component={Link} to={'history'} color="yellow">
        {t('home.historyButton')}
      </Button>
    </Group>
  );
}
