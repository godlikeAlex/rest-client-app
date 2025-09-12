import { createCookie } from 'react-router';

export const session = createCookie('session', {
  expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  path: '/',
});
