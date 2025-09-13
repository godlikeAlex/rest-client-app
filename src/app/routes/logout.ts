import { redirect, type LoaderFunction } from 'react-router';
import { session } from '../cookies';

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const url = new URL(request.url);
  const part = url.pathname.split('/');
  const lang = part[1] || 'en';
  return redirect(`/${lang}`, {
    headers: {
      'Set-Cookie': await session.serialize('', {
        expires: new Date(0),
      }),
    },
  });
};
