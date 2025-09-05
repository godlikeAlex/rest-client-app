import { Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const { t } = useTranslation();
  return (
    <>
      <Group gap="xl">
        <Button
          variant="subtle"
          px={5} /*onClick={() => navigate('/restClient')}*/
        >
          {t('home.restButton')}
        </Button>
        <Button
          variant="subtle"
          px={5} /*onClick={() => navigate('/history')}*/
        >
          {t('home.historyButton')}
        </Button>
        <Button
          variant="subtle"
          px={5} /*onClick={() => navigate('/variables')}*/
        >
          {t('home.variablesButton')}
        </Button>
      </Group>
    </>
  );
}
