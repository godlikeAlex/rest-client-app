import { Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export default function NavBar() {
  const { t } = useTranslation();
  return (
    <>
      <Group gap="xl">
        <Button variant="subtle" component={Link} to={'restClient'} px={5}>
          {t('home.restButton')}
        </Button>
        <Button variant="subtle" component={Link} to={'history'} px={5}>
          {t('home.historyButton')}
        </Button>
        <Button variant="subtle" component={Link} to={'variables'} px={5}>
          {t('home.variablesButton')}
        </Button>
      </Group>
    </>
  );
}
