import type { Resource } from 'i18next';
import notFound from './not-found';
import home from './home';
import signIn from './signIn';
import signUp from './signUp';
import validate from './validate';
import restClient from './rest-client';

export default {
  notFound,
  home,
  restClient,
  signIn,
  signUp,
  validate,
} satisfies Resource;
