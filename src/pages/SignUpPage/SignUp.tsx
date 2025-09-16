import { signUp } from '@/services/firebase.client';
import {
  isSamePasswords,
  validatePassword,
  type AuthorizationValues,
} from '@/utils/validate';
import {
  Button,
  Text,
  PasswordInput,
  TextInput,
  Title,
  Card,
  Alert,
  Anchor,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { LocaleLink } from '@/components';

export default function SignUp() {
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const fetcher = useFetcher();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validateInputOnChange: true,
    validate: {
      name: (value: string) => (value ? null : t('validate.validateName')),
      email: (value: string) => isEmail(t('validate.validateEmail'))(value),
      password: (value: string) => validatePassword(value),
      confirmPassword: (value: string, values: AuthorizationValues) =>
        isSamePasswords(value, values),
    },
  });

  const disabled = form.submitting || fetcher.state === 'submitting';

  async function registration(values: AuthorizationValues) {
    setError('');
    try {
      const user = await signUp({
        email: values.email,
        password: values.password,
        name: values.name || '',
      });
      const idToken = await user.user.getIdToken();
      const formData = new FormData();
      formData.append('idToken', idToken);
      await fetcher.submit(formData, { method: 'post' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} ta="center">
        {t('signUp.signUpTitle')}
      </Title>

      <Text c="dimmed" ta="center">
        {t('signUp.signUpDescription')}
      </Text>

      <form onSubmit={form.onSubmit(registration)}>
        <TextInput
          label={t('signUp.labels.name')}
          type="text"
          placeholder={t('signUp.placeholders.name')}
          {...form.getInputProps('name')}
          disabled={disabled}
          mt="md"
        />

        <TextInput
          label={t('signUp.labels.email')}
          type="text"
          placeholder={t('signUp.placeholders.email')}
          {...form.getInputProps('email')}
          disabled={disabled}
          mt="md"
        />

        <PasswordInput
          label={t('signUp.labels.password')}
          type="password"
          placeholder={t('signUp.placeholders.password')}
          {...form.getInputProps('password')}
          disabled={disabled}
          mt="md"
        />

        <PasswordInput
          label={t('signUp.labels.confirmPassword')}
          type="password"
          placeholder={t('signUp.placeholders.confirmPassword')}
          {...form.getInputProps('confirmPassword')}
          disabled={disabled}
          mt="md"
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

        <Button type="submit" fullWidth loading={disabled} mt="lg">
          {t('signUp.button')}
        </Button>

        <Text mt="md" ta="center">
          {t('signUp.hasAccountMessage')}{' '}
          <Anchor component={LocaleLink} to="/sign-in">
            {t('home.buttonSignIn')}
          </Anchor>
        </Text>
      </form>
    </Card>
  );
}
