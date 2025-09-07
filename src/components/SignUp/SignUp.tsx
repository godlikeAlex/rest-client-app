import { signUp } from '@/services/firebase';
import {
  Button,
  Text,
  Container,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { useState, type FormEvent } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function registration(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('The passwords entered do not match.');
      return;
    }
    try {
      await signUp(email, password, name);
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
      <form onSubmit={registration}>
        <TextInput
          label="Name"
          type="text"
          value={name}
          placeholder="Please enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <Space h="xs" />
        <TextInput
          label="Email"
          type="text"
          value={email}
          placeholder="Please enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Space h="xs" />
        <PasswordInput
          label="Password"
          type="password"
          value={password}
          placeholder="Please enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Space h="xs" />
        <PasswordInput
          label="Confirm password"
          type="password"
          value={confirmPassword}
          placeholder="Please confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
