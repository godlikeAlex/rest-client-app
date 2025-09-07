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
      route('restClient', 'routes/restClient.tsx'),
      route('history', 'routes/history.tsx'),
      route('signIn', 'routes/signIn.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
