import { SignUp } from '@/pages';
import AuthService from '@/services/AuthService';
import { redirect, type ActionFunction } from 'react-router';

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

export default function SignUpPage() {
  return <SignUp />;
}
