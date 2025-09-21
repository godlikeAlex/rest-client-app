import { session } from '@/app/cookies';
import { serverAuth } from '@/services/firebase.server';
import { redirect } from 'react-router';
import { requireAuth } from '../authCheck';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Mock } from 'vitest';

vi.mock('@/app/cookies', () => ({
  session: {
    parse: vi.fn(),
    serialize: vi.fn(),
  },
}));

vi.mock('@/services/firebase.server', () => ({
  serverAuth: {
    verifySessionCookie: vi.fn(),
  },
}));

vi.mock('react-router', () => ({
  redirect: vi.fn(),
}));

describe('authCheck utils', () => {
  const mockRequest = (url: string, cookie?: string) =>
    new Request(url, { headers: { Cookie: cookie || '' } });

  const mockParse: Mock = vi.mocked(session.parse);
  const mockSerialize: Mock = vi.mocked(session.serialize);
  const mockVerify: Mock = vi.mocked(serverAuth.verifySessionCookie);
  const mockRedirect: Mock = vi.mocked(redirect);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if pathname sign-in or sign-up', async () => {
    const req1 = mockRequest('http://localhost/en/sign-in');
    const req2 = mockRequest('http://localhost/en/sign-up');
    mockRedirect.mockImplementation((url, opts) => ({ url, opts }));

    const res1 = await requireAuth(req1);
    const res2 = await requireAuth(req2);

    expect(res1).toBeNull();
    expect(res2).toBeNull();
  });

  it('should redirect if not userId', async () => {
    mockParse.mockResolvedValue(null);
    mockSerialize.mockResolvedValue('mock-cookie');

    const request = mockRequest('http:/localhost/en/protected');

    await expect(requireAuth(request)).rejects.toThrow();
    expect(redirect).toHaveBeenCalledWith('/en', {
      headers: { 'Set-Cookie': 'mock-cookie' },
    });
  });

  it('should return null if not userId and redirect=false', async () => {
    mockParse.mockResolvedValue(null);
    mockSerialize.mockResolvedValue('mock-cookie');

    const request = mockRequest('http:/localhost/en/protected');

    const result = await requireAuth(request, { redirect: false });

    expect(result).toBeNull();
  });

  it('should redirect if userId is Invalid', async () => {
    mockParse.mockResolvedValue('user123');
    mockVerify.mockRejectedValue(new Error('Invalid token'));
    mockSerialize.mockResolvedValue('mock-cookie');

    const request = mockRequest('http:/localhost/en/protected');

    await expect(requireAuth(request)).rejects.toEqual(
      redirect('/en', {
        headers: { 'Set-Cookie': 'mock-cookie' },
      })
    );
  });

  it('return token if userId is Valid', async () => {
    mockParse.mockResolvedValue('user123');
    mockVerify.mockResolvedValue('mock-token');

    const request = mockRequest('http:/localhost/en/protected');

    const token = await requireAuth(request);

    expect(token).toBe('mock-token');
  });
});
