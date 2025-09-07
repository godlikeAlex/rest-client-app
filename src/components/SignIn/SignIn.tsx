import { signIn } from '@/services/firebase';
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
    <div>
      <form onSubmit={authorization}>
        <input
          type="text"
          value={email}
          placeholder="Введите почту"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign in</button>
        {error}
      </form>
    </div>
  );
}
