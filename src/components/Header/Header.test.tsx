import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Header from './Header';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { renderWithProviders } from '@/tests/utils';
import homeEn from '@/app/locales/en/home';

const mockedUseUser = vi.fn();

vi.mock('@/hooks/useUser', () => ({
  useUser: () => mockedUseUser(),
}));

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => {
        const k = key.startsWith('home.') ? key.replace('home.', '') : key;
        return homeEn[k as keyof typeof homeEn] || key;
      },
      i18n: { language: 'en' },
    }),
    initReactI18next: { type: '3rdParty', init: vi.fn() },
  };
});

const createRouter = () =>
  createMemoryRouter([{ path: '/', element: <Header /> }], {
    initialEntries: ['/'],
  });

describe('header component', () => {
  it('should render logo', () => {
    expect.hasAssertions();

    mockedUseUser.mockReturnValue({ user: null });

    const router = createRouter();
    renderWithProviders(<RouterProvider router={router} />);

    const logo = screen.getByAltText('logo');

    expect(logo).toBeInTheDocument();
  });

  it('should display "Sign Out" if the user is logged in', () => {
    expect.hasAssertions();

    mockedUseUser.mockReturnValue({ user: { uid: '123' } });

    const router = createRouter();
    renderWithProviders(<RouterProvider router={router} />);

    const signOutBtn = screen.getByText('Sign Out');

    expect(signOutBtn).toBeInTheDocument();
  });

  it('should display "Sign In" and "Sign Up" if user is not logged in', () => {
    expect.hasAssertions();

    mockedUseUser.mockReturnValue({ user: null });

    const router = createRouter();
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
