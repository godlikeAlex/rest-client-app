import { session } from '@/app/cookies';
import { serverAuth } from '@/services/firebase.server';
import { redirect } from 'react-router';

export async function requireAuth(
  request: Request,
  options: { redirect?: boolean } = { redirect: true }
) {
  const userId = await session.parse(request.headers.get('Cookie'));
  const url = new URL(request.url);
  const pathname = url.pathname;
  const language = pathname.split('/')[1] || 'en';

  if (pathname.endsWith('sign-in') || pathname.endsWith('sign-up')) {
    return null;
  }

  if (!userId) {
    if (options.redirect) {
      throw redirect(`/${language}/sign-in`, {
        headers: {
          'Set-Cookie': await session.serialize('', {
            expires: new Date(0),
          }),
        },
      });
    }
    return null;
  }
  try {
    const token = await serverAuth.verifySessionCookie(userId);
    return token;
  } catch (error) {
    console.error('Invalid session cookie:', error);
    if (options.redirect) {
      throw redirect(`/${language}/sign-in`, {
        headers: {
          'Set-Cookie': await session.serialize('', { expires: new Date(0) }),
        },
      });
    }
    return null;
  }
}
