import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { serverAuth } from '../firebase.server';
import { session } from '@/app/cookies';
import AuthService from '../AuthService';

vi.mock('@/services/firebase.server', () => ({
  serverAuth: {
    verifyIdToken: vi.fn(),
    createSessionCookie: vi.fn(),
  },
}));

vi.mock('@/app/cookies', () => ({
  session: {
    serialize: vi.fn(),
  },
}));

describe(AuthService, () => {
  const mockVerify: Mock = vi.mocked(serverAuth.verifyIdToken);
  const mockCreate: Mock = vi.mocked(serverAuth.createSessionCookie);
  const mockSerialize: Mock = vi.mocked(session.serialize);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate sessionCookie correctly', async () => {
    const idToken = 'mock-id-token';
    const jwtToken = 'mock-jwt-token';
    const cookieHeader = 'mock-cookie';

    mockVerify.mockResolvedValue(true);
    mockCreate.mockResolvedValue(jwtToken);
    mockSerialize.mockResolvedValue(cookieHeader);

    const result = await AuthService.generateSessionCookie(idToken);

    expect(mockVerify).toHaveBeenCalledWith(idToken);
    expect(mockCreate).toHaveBeenCalledWith(idToken, {
      expiresIn: 60 * 60 * 24 * 1000,
    });
    expect(mockSerialize).toHaveBeenCalledWith(
      jwtToken,
      expect.objectContaining({ expires: expect.any(Date) })
    );

    expect(result).toEqual({
      jwt: jwtToken,
      cookieHeader,
    });
  });
});
