import { Button, Center, Group, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavBar } from '@/components';
import { Link, useRouteLoaderData } from 'react-router';

export default function WelcomeBanner() {
  const { t } = useTranslation();
  const rootData = useRouteLoaderData('root');
  const user = rootData?.user;
  const userName = user ? user.name : '';
  return (
    <Center py="xl" mih="750px">
      <Stack align="center" gap="md">
        {user ? (
          <>
            <Text size="xl" fw={600}>
              {t('home.back')}, {userName}!
            </Text>
            <NavBar />
            тр
          </>
        ) : (
          <>
            <Text size="xl" fw={600}>
              {t('home.greetings')}!
            </Text>
            <Group>
              <Button variant="default" size="md" component={Link} to="signin">
                {t('home.buttonSignIn')}
              </Button>
              <Button variant="filled" size="md" component={Link} to="signup">
                {t('home.buttonSignUp')}
              </Button>
            </Group>
          </>
        )}
      </Stack>
    </Center>
  );
}
