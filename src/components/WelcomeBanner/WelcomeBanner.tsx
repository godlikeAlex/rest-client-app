import { Button, Center, Group, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

type Props = {
  isUserLog: boolean;
};
export default function WelcomeBanner({ isUserLog }: Props) {
  const { t } = useTranslation();
  return (
    <Center h="100%" py="xl">
      <Stack align="center" gap="md">
        {isUserLog ? (
          <Text size="xl" fw={600}>
            {t('welcomeBanner.back')}, {'user'}!
          </Text>
        ) : (
          <>
            <Text size="xl" fw={600}>
              {t('welcomeBanner.greetings')}!
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
