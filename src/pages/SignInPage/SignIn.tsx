import { signIn } from '@/services/firebase.client';
import { validatePassword, type AuthorizationValues } from '@/utils/validate';
import {
  Button,
  Text,
  PasswordInput,
  TextInput,
  Title,
  Card,
  Box,
  Anchor,
  Alert,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { LocaleLink } from '@/components';
import { notifications } from '@mantine/notifications';

export default function SignIn() {
  const fetcher = useFetcher();
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validateInputOnChange: true,
    validate: {
      email: (value: string) => isEmail(t('validate.validateEmail'))(value),
      password: (value: string) => validatePassword(value, t),
    },
  });

  const disabled = form.submitting || fetcher.state === 'submitting';

  async function authorization(values: AuthorizationValues) {
    setError('');
    try {
      const user = await signIn({
        email: values.email,
        password: values.password,
      });
      const idToken = await user.user.getIdToken();
      const formData = new FormData();
      formData.append('idToken', idToken);
      await fetcher.submit(formData, { method: 'post' });
      notifications.show({
        title: t('signIn.successTitle'),
        message: t('signIn.successMessage'),
        color: 'green',
        icon: <IconCheck />,
      });
      setError('');
    } catch (error: unknown) {
      notifications.show({
        title: t('signIn.errorTitle'),
        message: t('signIn.errorMessage'),
        color: 'red',
        icon: <IconAlertCircle />,
      });
      if (error instanceof Error) {
        setError(t('signIn.error'));
      }
    }
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} ta="center">
        {t('signIn.signInTitle')}
      </Title>

      <Text c="dimmed" ta="center">
        {t('signIn.signInDescription')}
      </Text>

      <Box mt={'sm'} component="form" onSubmit={form.onSubmit(authorization)}>
        <TextInput
          label={t('signIn.labels.email')}
          type="text"
          placeholder={t('signIn.placeholders.email')}
          {...form.getInputProps('email')}
          disabled={disabled}
        />

        <PasswordInput
          label={t('signIn.labels.password')}
          type="password"
          placeholder={t('signIn.placeholders.password')}
          {...form.getInputProps('password')}
          disabled={disabled}
          mt={'md'}
        />

        {error ? (
          <Alert
            mt={'md'}
            variant="light"
            color="red"
            title={error}
            icon={<IconAlertCircle />}
          />
        ) : null}

        <Button type="submit" mt={'lg'} fullWidth loading={disabled}>
          {t('signIn.button')}
        </Button>

        <Text mt="md" ta="center">
          {t('signIn.noAccountMessage')}{' '}
          <Anchor component={LocaleLink} to="/sign-up">
            {t('home.buttonSignUp')}
          </Anchor>
        </Text>
      </Box>
    </Card>
  );
}
