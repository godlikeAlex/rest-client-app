import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { renderWithProviders } from '@/tests/utils';
import homeEn from '@/app/locales/en/home';
import { WelcomeBanner } from '@/components';

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
  createMemoryRouter([{ path: '/', element: <WelcomeBanner /> }], {
    initialEntries: ['/'],
  });

describe('welcomeBanner component', () => {
  it('renders welcome section when user is not logged in', () => {
    expect.hasAssertions();

    mockedUseUser.mockReturnValue({ user: null });

    const router = createRouter();
    renderWithProviders(<RouterProvider router={router} />);

    expect(screen.getByText(homeEn.buttonSignIn)).toBeInTheDocument();
    expect(screen.getByText(homeEn.buttonSignUp)).toBeInTheDocument();
  });

  it('renders welcome section when user is logged in', () => {
    expect.hasAssertions();

    const userName = 'userName';
    mockedUseUser.mockReturnValue({
      user: { name: userName, uid: 'uid123', value: [] },
    });

    const router = createRouter();
    renderWithProviders(<RouterProvider router={router} />);

    const expectedMessage = `${homeEn.back}, ${userName}!`;

    expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  });
});
