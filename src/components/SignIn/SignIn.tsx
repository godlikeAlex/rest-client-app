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

export default function SignIn() {
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validateInputOnChange: true,
    validate: {
      email: isEmail('Invalid email address'),
      password: (value: string) => validatePassword(value),
    },
  });

  async function authorization(values: AuthorizationValues) {
    setError('');
    try {
      await signIn(values.email, values.password);
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Неверный логин или пароль`);
      }
    }
  }

  return (
    <Container size="xs">
      <Title order={3} ta="center">
        Authorization
      </Title>
      <Space h="xs" />
      <form onSubmit={form.onSubmit(authorization)}>
        <TextInput
          label="Email"
          type="text"
          placeholder="Please enter your email"
          {...form.getInputProps('email')}
        />
        <Space h="xs" />
        <PasswordInput
          label="Password"
          type="password"
          placeholder="Please enter your password"
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
          Sign in
        </Button>
      </form>
    </Container>
  );
}
