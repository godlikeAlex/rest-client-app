import { redirect, type LoaderFunction } from 'react-router';
import { session } from '../cookies';

export const loader: LoaderFunction = async ({ params }) => {
  const lang = params.locale || 'en';
  return redirect(`/${lang}`, {
    headers: {
      'Set-Cookie': await session.serialize('', {
        expires: new Date(0),
      }),
    },
  });
};
