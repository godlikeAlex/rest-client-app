import { signIn } from '@/services/firebase';
import { validatePassword, type AuthorizationValues } from '@/utils/validate';
import {
  Button,
  Container,
  Text,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
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
      password: (value: string) => validatePassword(value),
    },
  });

  async function authorization(values: AuthorizationValues) {
    setError('');
    try {
      await signIn({ email: values.email, password: values.password });
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Incorrect login or password`);
      }
    }
  }

  return (
    <Container size="xs">
      <Title order={3} ta="center">
        {t('signIn.signInTitle')}
      </Title>
      <Space h="xs" />
      <form onSubmit={form.onSubmit(authorization)}>
        <TextInput
          label={t('signIn.labels.email')}
          type="text"
          placeholder={t('signIn.placeholders.email')}
          {...form.getInputProps('email')}
        />
        <Space h="xs" />
        <PasswordInput
          label={t('signIn.labels.password')}
          type="password"
          placeholder={t('signIn.placeholders.password')}
          {...form.getInputProps('password')}
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
          {t('signIn.button')}
        </Button>
      </form>
    </Container>
  );
}
