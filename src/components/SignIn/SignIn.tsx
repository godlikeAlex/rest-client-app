import { signIn } from '@/services/firebase';
import {
  Button,
  Container,
  PasswordInput,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { useState, type FormEvent } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function authorization(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
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
      <form onSubmit={authorization}>
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
        <Space h="md" />
        <Button
          type="submit"
          color="rgba(125, 217, 33, 1)"
          display="block"
          mx="auto"
        >
          Sign in
        </Button>
        <Space h="xs" />
        {error}
      </form>
    </Container>
  );
}
