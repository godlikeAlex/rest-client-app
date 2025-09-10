import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),
  route(':locale', 'routes/locale.tsx', [
    index('routes/home.tsx'),
    route('signin', 'routes/signin.tsx'),
    route('signup', 'routes/signup.tsx'),
  ]),
] satisfies RouteConfig;
