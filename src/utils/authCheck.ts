import { session } from '@/app/cookies';
import { serverAuth } from '@/services/firebase.server';
import { redirect } from 'react-router';

export async function requireAuth(request: Request) {
  const userId = await session.parse(request.headers.get('Cookie'));
  const url = new URL(request.url);
  const pathname = url.pathname;
  const languages = pathname.match(/^\/(en|ru)(\/|$)/);
  const language = languages ? languages[1] : 'en';

  if (!userId) {
    throw redirect(`/${language}/signin`, {
      headers: {
        'Set-Cookie': await session.serialize('', {
          expires: new Date(0),
        }),
      },
    });
  }
  try {
    const token = await serverAuth.verifySessionCookie(userId);
    return token;
  } catch (error) {
    console.error('Invalid session cookie:', error);
  }
}
