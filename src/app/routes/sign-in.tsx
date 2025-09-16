import { SignIn } from '@/pages';
import { redirect, type ActionFunction } from 'react-router';
import AuthService from '@/services/AuthService';
import type { Route } from './+types/sign-in';
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

  const title = t('signIn.seo.title');
  const description = t('signIn.seo.description');
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

export default function SignInPage() {
  return <SignIn />;
}
