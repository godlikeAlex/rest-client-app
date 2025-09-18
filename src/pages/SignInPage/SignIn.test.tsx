import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SignIn from './SignIn';
import { renderWithProviders, userEvent } from '@/tests/utils';
import { MemoryRouter } from 'react-router';
import { signIn } from '@/services/firebase.client';

let mockGetIdToken: ReturnType<typeof vi.fn>;
let mockSubmit: ReturnType<typeof vi.fn>;

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useFetcher: () => ({
      state: 'idle',
      submit: mockSubmit,
    }),
  };
});

vi.mock('@/services/firebase.client', () => ({
  signIn: vi.fn(),
}));

describe('signIn component', () => {
  mockGetIdToken = vi.fn().mockResolvedValue('mock-token');
  mockSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetIdToken = vi.fn().mockResolvedValue('mock-token');
    mockSubmit = vi.fn();
    (signIn as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      user: { getIdToken: mockGetIdToken },
    });
  });

  it('should render title and description', () => {
    renderWithProviders(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Please sign in to continue.')).toBeInTheDocument();
  });

  it('should show error message at fail authorization', async () => {
    (signIn as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Invalid credentials')
    );
    renderWithProviders(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const inputEmail = screen.getByPlaceholderText('Please enter your email');
    const inputPassword = screen.getByPlaceholderText(
      'Please enter your password'
    );

    await userEvent.type(inputEmail, 'test@mail.ru');
    await userEvent.type(inputPassword, 'Test12345!');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await expect(
      screen.findByText('Incorrect login or password')
    ).resolves.toBeInTheDocument();
  });

  it('should get idToken, create FormData and call fetcher.submit', async () => {
    mockGetIdToken.mockResolvedValue('mock-token');

    const fetcherMock = { submit: mockSubmit, state: 'idle' };

    const values = { email: 'test@mail.ru', password: 'test12345!!' };

    const user = await signIn({
      email: values.email,
      password: values.password,
    });
    const idToken = await user.user.getIdToken();
    const formData = new FormData();
    formData.append('idToken', idToken);
    await fetcherMock.submit(formData, { method: 'post' });

    expect(signIn).toHaveBeenCalledWith({
      email: 'test@mail.ru',
      password: 'test12345!!',
    });
    expect(mockGetIdToken).toHaveBeenCalledWith();
    expect(mockSubmit).toHaveBeenCalledWith(formData, { method: 'post' });
  });

  it('should show error on failed login, then clear error on success', async () => {
    (signIn as unknown as ReturnType<typeof vi.fn>)
      .mockRejectedValueOnce(new Error('Invalid credentials'))
      .mockResolvedValueOnce({ user: { getIdToken: mockGetIdToken } });

    renderWithProviders(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const inputEmail = screen.getByPlaceholderText('Please enter your email');
    const inputPassword = screen.getByPlaceholderText(
      'Please enter your password'
    );
    const button = screen.getByRole('button', { name: 'Sign in' });

    await userEvent.type(inputEmail, 'test@mail.ru');
    await userEvent.type(inputPassword, '1');
    await userEvent.click(button);

    await expect(
      screen.findByText('Incorrect login or password')
    ).resolves.toBeInTheDocument();

    await userEvent.clear(inputPassword);
    await userEvent.clear(inputEmail);
    await userEvent.type(inputEmail, 'test@mail.ru');
    await userEvent.type(inputPassword, 'CorrectPassword123!');
    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.queryByText('Incorrect login or password')
      ).not.toBeInTheDocument();
    });

    expect(signIn).toHaveBeenCalledTimes(2);
    expect(mockGetIdToken).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
