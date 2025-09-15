import { createCookie } from 'react-router';

export const session = createCookie('session', {
  path: '/',
  httpOnly: true,
});
