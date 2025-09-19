import { Button, Center, Group, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavBar } from '@/components';
import { Link } from 'react-router';
import { useUser } from '@/hooks/useUser';

export default function WelcomeBanner() {
  const { t } = useTranslation();
  const { user } = useUser();
  const userName = user?.name;
  return (
    <Center py="xl" mih="750px">
      <Stack align="center" gap="md">
        {user ? (
          <>
            <Text size="xl" fw={600}>
              {t('home.back')}, {userName}!
            </Text>
            <NavBar />
          </>
        ) : (
          <>
            <Text size="xl" fw={600}>
              {t('home.greetings')}!
            </Text>
            <Group>
              <Button variant="default" size="md" component={Link} to="sign-in">
                {t('home.buttonSignIn')}
              </Button>
              <Button variant="filled" size="md" component={Link} to="sign-up">
                {t('home.buttonSignUp')}
              </Button>
            </Group>
          </>
        )}
      </Stack>
    </Center>
  );
}
