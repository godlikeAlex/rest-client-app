import { Link, useLocation, useParams } from 'react-router';
import logo from '@/assets/logo.webp';
import {
  Button,
  Group,
  Container,
  Image,
  Divider,
  Box,
  Flex,
  SegmentedControl,
  UnstyledButton,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { signOutProfile } from '@/services/firebase.client';
import { useUser } from '@/hooks/useUser';
import { LocaleLink } from '../LocaleLink';
import replaceLanguage from '@/utils/replace-language';

export default function Header() {
  const { t } = useTranslation();

  const { locale } = useParams<'locale'>();
  const { pathname } = useLocation();

  const { user } = useUser();

  return (
    <Box component="header">
      <Container py={'sm'} size="lg">
        <Flex justify="space-between">
          <LocaleLink to="/">
            <Image src={logo} w={120} alt="logo" />
          </LocaleLink>

          <Flex align="center">
            <Group gap={10}>
              {user ? (
                <Button
                  onClick={async () => await signOutProfile()}
                  component={Link}
                  variant="outline"
                  to={'logout'}
                >
                  {t('home.buttonSignOut')}
                </Button>
              ) : (
                <>
                  <Button variant="outline" component={Link} to={'sign-in'}>
                    {t('home.buttonSignIn')}
                  </Button>
                  <Button component={Link} to={'sign-up'}>
                    {t('home.buttonSignUp')}
                  </Button>
                </>
              )}
            </Group>

            <Group gap={2} ml={28}>
              <SegmentedControl
                styles={{ label: { padding: 0 } }}
                value={locale}
                data={[
                  {
                    value: 'ru',
                    label: (
                      <UnstyledButton
                        component={Link}
                        display="block"
                        px="xs"
                        py={4}
                        to={replaceLanguage(pathname, 'ru')}
                      >
                        Русский 🇷🇺
                      </UnstyledButton>
                    ),
                  },
                  {
                    value: 'en',
                    label: (
                      <UnstyledButton
                        component={Link}
                        display="block"
                        px="xs"
                        py={4}
                        to={replaceLanguage(pathname, 'en')}
                      >
                        English 🇬🇧
                      </UnstyledButton>
                    ),
                  },
                ]}
                size="md"
              />
            </Group>
          </Flex>
        </Flex>
      </Container>

      <Divider />
    </Box>
  );
}
