import { signUp } from '@/services/firebase.client';
import {
  isSamePasswords,
  validatePassword,
  type AuthorizationValues,
} from '@/utils/validate';
import {
  Button,
  Text,
  Container,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const [error, setError] = useState('');
  const { t } = useTranslation();

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

  async function registration(values: AuthorizationValues) {
    setError('');
    try {
      await signUp({
        email: values.email,
        password: values.password,
        name: values.name || '',
      });
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <Container size="xs">
      <Title order={3} ta={'center'}>
        {t('signUp.signUpTitle')}
      </Title>
      <Space h="xs" />
      <form onSubmit={form.onSubmit(registration)}>
        <TextInput
          label={t('signUp.labels.name')}
          type="text"
          placeholder={t('signUp.placeholders.name')}
          {...form.getInputProps('name')}
        />
        <Space h="xs" />
        <TextInput
          label={t('signUp.labels.email')}
          type="text"
          placeholder={t('signUp.placeholders.email')}
          {...form.getInputProps('email')}
        />
        <Space h="xs" />
        <PasswordInput
          label={t('signUp.labels.password')}
          type="password"
          placeholder={t('signUp.placeholders.password')}
          {...form.getInputProps('password')}
        />
        <Space h="xs" />
        <PasswordInput
          label={t('signUp.labels.confirmPassword')}
          type="password"
          placeholder={t('signUp.placeholders.confirmPassword')}
          {...form.getInputProps('confirmPassword')}
        />
        <Space h="xs" />
        <Text c="red" size="sm" mt="xs" ta="center">
          {error}
        </Text>
        <Space h="xs" />
        <Button
          type="submit"
          color="rgba(125, 217, 33, 1)"
          display="block"
          mx="auto"
        >
          {t('signUp.button')}
        </Button>
      </form>
    </Container>
  );
}
