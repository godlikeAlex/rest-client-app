import { signUp } from '@/services/firebase';
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
    <div>
      <form onSubmit={registration}>
        <input
          type="text"
          value={name}
          placeholder="Введите имя"
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          value={confirmPassword}
          placeholder="Введите пароль"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button>Sign Up</button>
        {error}
      </form>
    </div>
  );
}
