import { signUp } from '@/services/firebase';
import { validatePassword, type AuthorizationValues } from '@/utils/validate';
import {
  Button,
  Text,
  Container,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useState } from 'react';

export default function SignUp() {
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validateInputOnChange: true,
    validate: {
      name: isNotEmpty('Name is required'),
      email: isEmail('Invalid email address'),
      password: (value: string) => validatePassword(value),
      confirmPassword: (value: string, values: AuthorizationValues) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  async function registration(values: AuthorizationValues) {
    setError('');
    try {
      await signUp(values.email, values.password, values.name ?? '');
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
        Register account
      </Title>
      <Space h="xs" />
      <form onSubmit={form.onSubmit(registration)}>
        <TextInput
          label="Name"
          type="text"
          placeholder="Please enter your name"
          {...form.getInputProps('name')}
        />
        <Space h="xs" />
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
        <PasswordInput
          label="Confirm password"
          type="password"
          placeholder="Please confirm password"
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
          Sign Up
        </Button>
      </form>
    </Container>
  );
}
