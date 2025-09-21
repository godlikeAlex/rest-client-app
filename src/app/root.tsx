import '@mantine/core/styles.css';

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import { useTranslation } from 'react-i18next';
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from '@mantine/core';

import type { Route } from './+types/root';
import { requireAuth } from '@/utils/authCheck';
import VariablesService from '@/services/VariablesService';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'green',
});

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuth(request, { redirect: false });
  return { user };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const { user } = await serverLoader();
  if (!user?.uid) {
    return { user };
  }

  const variables = VariablesService.getUsersVariables(user.uid);
  return {
    user: {
      ...user,
      variables,
    },
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} {...mantineHtmlProps}>
      <head>
        <title>Rest Client</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Meta />
        <ColorSchemeScript />
        <Links />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
