import { describe, it, expect, vi } from 'vitest';
import RequestService, { type RequestError } from '../RequestService';

describe('request service', () => {
  const mockUrl = 'https://api.example.com/test';

  it('should return success response', async () => {
    expect.hasAssertions();

    const mockResponseBody = { hello: 'world' };
    const mockHeaders = new Headers({
      'content-type': 'application/json',
      'x-custom': '123',
    });

    const mockResponse = new Response(JSON.stringify(mockResponseBody), {
      status: 200,
      headers: mockHeaders,
    });

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const result = await RequestService.sendRequest({
      method: 'POST',
      url: mockUrl,
      body: JSON.stringify({ test: true }),
      clientHeaders: [
        { key: 'X-Test', value: 'abc', enabled: true },
        { key: 'X-Ignored', value: 'zzz', enabled: false },
      ],
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      mockUrl,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Test': 'abc',
        }),
      })
    );

    expect(result.error).toBe(false);
    expect(result).toHaveProperty('time');
    expect(result).toHaveProperty('requestSize');
    expect(result).toHaveProperty('responseSize');
  });

  it('should return error on error fetch', async () => {
    expect.hasAssertions();

    vi.spyOn(global, 'fetch').mockRejectedValue(
      new Error('Network error', { cause: 'Poor Connection' })
    );

    const result = (await RequestService.sendRequest({
      method: 'GET',
      url: mockUrl,
      clientHeaders: [],
    })) as RequestError;

    console.log(result.error === true ? result.message : false);

    expect(result.error).toBe(true);
    expect(result.message).contains('Poor Connection');
  });
});
