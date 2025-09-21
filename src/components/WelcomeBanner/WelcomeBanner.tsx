import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { NavBar } from '@/components';
import { Link } from 'react-router';
import { useUser } from '@/hooks/useUser';
import helloImage from '@/assets/hello.webp';

export default function WelcomeBanner() {
  const { t } = useTranslation();
  const { user } = useUser();
  const userName = user?.name;

  return (
    <Center py="xl" mih="80vh">
      {user ? (
        <Stack mt="md" gap="md" ta="center">
          <Image src={helloImage} w={280} mx="auto" fit="contain" />

          <Title order={2} mb="md">
            {t('home.back')}, {userName}!
          </Title>
          <NavBar />
        </Stack>
      ) : (
        <Flex gap={15} wrap="wrap" p={'lg'}>
          <Image src={helloImage} w={360} fit="contain" />

          <Box maw={500}>
            <Title order={1}>{t('home.welcomeSection.title')}</Title>
            <Text c="dimmed" mt="xs">
              {t('home.welcomeSection.descriptionSection')}
            </Text>

            <Text c="dimmed" mt="xs">
              {t('home.welcomeSection.descriptionSectionSecond')}
            </Text>

            <Group mt="md">
              <Button variant="default" size="md" component={Link} to="sign-in">
                {t('home.buttonSignIn')}
              </Button>
              <Button variant="filled" size="md" component={Link} to="sign-up">
                {t('home.buttonSignUp')}
              </Button>
            </Group>
          </Box>
        </Flex>
      )}
    </Center>
  );
}
