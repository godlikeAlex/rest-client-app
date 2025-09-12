import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),
  route(':locale', 'routes/locale.tsx', [
    layout('routes/mainLayout.tsx', [
      index('routes/homePage.tsx'),
      route('rest-client/:method?/:url?/:body?', 'routes/rest-client.tsx'),
      route('history', 'routes/history.tsx'),
      route('signin', 'routes/signin.tsx'),
      route('signup', 'routes/signup.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
