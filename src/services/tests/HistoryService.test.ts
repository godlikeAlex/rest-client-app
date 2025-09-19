import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Mock } from 'vitest';
import HistoryService from '../HistoryService';

const { setMock, collectionMock, docMock } = vi.hoisted(() => {
  const setMock = vi.fn();

  const docMock: Mock = vi.fn(() => ({
    set: setMock,
    collection: vi.fn(() => ({
      doc: docMock,
      get: vi.fn(),
      collection: collectionMock,
    })),
  }));

  const collectionMock: Mock = vi.mocked(vi.fn(() => ({
    doc: docMock,
    get: vi.fn(),
    collection: vi.fn(() => ({
      doc: docMock,
      get: vi.fn(),
      collection: collectionMock,
    })),
  })));
  return { setMock, collectionMock, docMock };
});

vi.mock('@/services/firebase.server', () => ({
  serverDb: {
    collection: collectionMock,
  },
}));

describe(HistoryService, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saveUserHistory должен корректно сохранять данные пользователя', async () => {
    const userId = 'agent007';
    const requestData = {
      url: 'https://api.test',
      method: 'GET',
      time: 123,
      duration: 1,
      requestSize: 11,
      responseSize: 10,
      status: 200,
      error: null,
      requestData: {
        headers: [
          { key: 'Authorization', value: 'Bearer token', enabled: true },
        ],
        body: '',
        queryParams: { q: 'test' },
      },
    };

    await HistoryService.saveUserHistory(userId, requestData);

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalledWith(userId);
    expect(docMock().collection().doc).toHaveBeenCalledWith();
    expect(setMock).toHaveBeenCalledWith(requestData);
  });
});
