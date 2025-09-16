import { SignUp } from '@/pages';
import AuthService from '@/services/AuthService';
import { redirect, type ActionFunction } from 'react-router';
import type { Route } from './+types/sign-up';
import i18next from '../i18next.server';

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

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);

  const title = t('signUp.seo.title');
  const description = t('signUp.seo.description');
  return {
    meta: {
      title,
      description,
    },
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.meta?.title },
    { name: 'description', content: loaderData.meta?.description },
  ];
}

export default function SignUpPage() {
  return <SignUp />;
}
