import { Link } from 'react-router';
import logo from '@/assets/logo.svg';
import i18next from '@/app/i18n';
import { Button, Group, Container, Image, Divider } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { signOutProfile } from '@/services/firebase.client';
import { useUser } from '@/hooks/useUser';

export default function Header() {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <>
      <Container py="md" px="xl" fluid>
        <Group justify="space-between">
          <Group>
            <Link to="/">
              <Image
                src={logo}
                width={60}
                height={60}
                fit="contain"
                alt="Logo"
              />
            </Link>
            <Group ml="md">
              {user ? (
                <Button
                  variant="subtle"
                  onClick={async () => await signOutProfile()}
                  component={Link}
                  to={'logout'}
                >
                  {t('home.buttonSignOut')}
                </Button>
              ) : (
                <>
                  <Button
                    variant="subtle"
                    component={Link}
                    to={'sign-in'}
                    px={1}
                  >
                    {t('home.buttonSignIn')}
                  </Button>
                  <Button
                    variant="subtle"
                    px={1}
                    component={Link}
                    to={'sign-up'}
                  >
                    {t('home.buttonSignUp')}
                  </Button>
                </>
              )}
            </Group>
          </Group>
          <Group gap={2}>
            {i18next.supportedLngs.map((language) => (
              <Button
                variant="default"
                size="sm"
                component={Link}
                to={`/${language}`}
                key={language}
              >
                {language}
              </Button>
            ))}
          </Group>
        </Group>
      </Container>
      <Divider />
    </>
  );
}
