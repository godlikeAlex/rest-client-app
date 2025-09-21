import { renderWithProviders } from '@/tests/utils';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import { signUp } from '@/services/firebase.client';
import userEvent from '@testing-library/user-event';

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
  signUp: vi.fn(),
}));

describe('signUp component', () => {
  mockGetIdToken = vi.fn().mockResolvedValue('mock-token');
  mockSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetIdToken = vi.fn().mockResolvedValue('mock-token');
    mockSubmit = vi.fn();
    (signUp as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      user: { getIdToken: mockGetIdToken },
    });
  });

  it('should render title and description', () => {
    renderWithProviders(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign Up', { selector: 'h3' })).toBeInTheDocument();
    expect(
      screen.getByText('Join us by creating your account.')
    ).toBeInTheDocument();
  });

  it('should validation message for empty inputs', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    renderWithProviders(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(
      'Please enter your password'
    );

    await user.click(screen.getByRole('button', { name: 'Sign Up' }));
    await user.type(passwordInput, '123');

    expect(
      screen.getByText('Password must be at least 8 characters long')
    ).toBeInTheDocument();
  });

  it('should get idToken, create FormData and call fetcher.submit', async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    renderWithProviders(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText('Please enter your name');
    const emailInput = screen.getByPlaceholderText('Please enter your email');
    const passwordInput = screen.getByPlaceholderText(
      'Please enter your password'
    );
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Please confirm password'
    );

    await user.type(nameInput, 'test');
    await user.type(emailInput, 'test@mail.ru');
    await user.type(passwordInput, 'test12345!!');
    await user.type(confirmPasswordInput, 'test12345!!');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        email: 'test@mail.ru',
        password: 'test12345!!',
        name: 'test',
      });
    });

    expect(mockGetIdToken).toHaveBeenCalledWith(true);

    const submitCall = mockSubmit.mock.calls[0];
    const formData = submitCall[0] as FormData;
    const options = submitCall[1];

    expect(formData.get('idToken')).toBe('mock-token');

    expect(options).toEqual({ method: 'post' });
  });

  it('should show error by registration', async () => {
    expect.hasAssertions();

    (signUp as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Email already exists')
    );

    renderWithProviders(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText('Please enter your name');
    const emailInput = screen.getByPlaceholderText('Please enter your email');
    const passwordInput = screen.getByPlaceholderText(
      'Please enter your password'
    );
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Please confirm password'
    );

    await user.type(nameInput, 'test');
    await user.type(emailInput, 'test@mail.ru');
    await user.type(passwordInput, 'test12345!!');
    await user.type(confirmPasswordInput, 'test12345!!');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(screen.getByText('Email already exists')).toBeInTheDocument();
    expect(signUp).toHaveBeenCalledTimes(1);
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
