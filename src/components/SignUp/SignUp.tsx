import { signUp } from '@/services/firebase';
import { digitRegex, letterRegex, specialRegex } from '@/utils/const';
import {
  Button,
  Text,
  Container,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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
      name: (value: string) =>
        value.trim().length < 2 ? 'Name must have at least 2 characters' : null,
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email address',
      password: (value: string) => {
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!letterRegex.test(value)) {
          return 'Password must contain at least one letter';
        }
        if (!digitRegex.test(value)) {
          return 'Password must contain at least one digit';
        }
        if (!specialRegex.test(value)) {
          return 'Password must contain at least one special character';
        }
        return null;
      },
      confirmPassword: (value: string, values: SignUpFormValues) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  async function registration(values: SignUpFormValues) {
    setError('');
    try {
      await signUp(values.email, values.password, values.name);
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
