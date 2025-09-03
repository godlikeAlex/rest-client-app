import type { Config, Context } from '@netlify/functions';
import { createRequestHandler, unstable_createContext } from 'react-router';

declare module 'react-router' {
  interface AppLoadContext {
    VALUE_FROM_NETLIFY: string;
  }
}

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE
);

export default async (request: Request, context: Context) => {
  return requestHandler(request, {
    VALUE_FROM_NETLIFY: 'Hello from Netlify',
  });
};

export const config: Config = {
  path: '/*',
  preferStatic: true,
};
