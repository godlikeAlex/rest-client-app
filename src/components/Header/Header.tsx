import { Link } from 'react-router';
import logo from '../../assets/logo.svg';
import i18next from '@/app/i18n';
import { Button, Group, Container, Image, Divider } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();
  const user = false;
  return (
    <>
      <Container py="md" px="xl" fluid>
        <Group justify="space-between">
          <Group>
            <Link to="/">
              <Image src={logo} width={60} height={60} alt="Logo" />
            </Link>
            <Group ml="md">
              {user ? (
                <Button variant="subtle">Sign Out</Button>
              ) : (
                <>
                  <Button
                    variant="subtle"
                    px={1} /*onClick={() => navigate('/signin')}*/
                  >
                    {t('home.buttonSignIn')}
                  </Button>
                  <Button
                    variant="subtle"
                    px={1} /*onClick={() => navigate('/signup')}*/
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
                size="xs"
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
