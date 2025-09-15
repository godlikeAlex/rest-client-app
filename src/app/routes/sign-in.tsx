import { SignIn } from '@/pages';
import { redirect, type ActionFunction } from 'react-router';
import AuthService from '@/services/AuthService';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const idToken = formData.get('idToken')?.toString();
  if (!idToken) throw new Error('Token is required');

  const { cookieHeader } = await AuthService.generateSessionCookie(idToken);
  return redirect('/', {
    headers: {
      'Set-Cookie': cookieHeader,
    },
  });
};

export default function SignInPage() {
  return <SignIn />;
}
