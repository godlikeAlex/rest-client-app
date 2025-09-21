import { renderWithProviders, screen } from '@/tests/utils';
import { describe, expect, it, vi } from 'vitest';
import MainLayout from './main-layout';
import { createMemoryRouter, RouterProvider } from 'react-router';
import type { ReactNode } from 'react';
import AuthLayout from './auth-layout';

const createRouter = (component: ReactNode) =>
  createMemoryRouter([{ path: '/', element: component }], {
    initialEntries: ['/'],
  });

vi.mock('@/hooks/useUser', () => ({
  useUser: () => vi.fn(),
}));

describe('main layout', () => {
  it('should render header and footer', () => {
    expect.hasAssertions();

    renderWithProviders(
      <RouterProvider router={createRouter(<MainLayout />)} />
    );

    expect(screen.getByText('Русский 🇷🇺')).toBeInTheDocument();
  });

  it('should render auth layout', () => {
    expect.hasAssertions();

    renderWithProviders(
      <RouterProvider router={createRouter(<AuthLayout />)} />
    );

    expect(screen.getByTestId('auth-layout')).toBeInTheDocument();
  });
});
