import { Button, Center, Group, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavBar } from '@/components';

type Props = {
  isUserLog: boolean;
};
export default function WelcomeBanner({ isUserLog }: Props) {
  const { t } = useTranslation();
  return (
    <Center py="xl" mih="760px">
      <Stack align="center" gap="md">
        {isUserLog ? (
          <>
            <Text size="xl" fw={600}>
              {t('home.back')}, {'user'}!
            </Text>
            <NavBar />
          </>
        ) : (
          <>
            <Text size="xl" fw={600}>
              {t('home.greetings')}!
            </Text>
            <Group>
              <Button variant="default" size="md">
                {t('home.buttonSignIn')}
              </Button>
              <Button variant="filled" size="md">
                {t('home.buttonSignUp')}
              </Button>
            </Group>
          </>
        )}
      </Stack>
    </Center>
  );
}
