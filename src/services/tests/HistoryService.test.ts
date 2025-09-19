import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Mock } from 'vitest';
import HistoryService, { type RequestData } from '../HistoryService';

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
    headers: [{ key: 'Authorization', value: 'Bearer token', enabled: true }],
    body: '',
    queryParams: { q: 'test' },
  },
};

const { setMock, collectionMock, docMock, getMock } = vi.hoisted(() => {
  const setMock = vi.fn();
  const getMock = vi.fn(() => ({
    forEach: (cb: (doc: { id: string; data: () => RequestData }) => void) => {
      cb({ id: 'req1', data: () => ({ ...requestData, id: 'req1' }) });
    },
  }));

  const docMock: Mock = vi.fn(() => ({
    set: setMock,
    collection: vi.fn(() => ({
      doc: docMock,
      get: getMock,
      collection: collectionMock,
    })),
  }));

  const collectionMock: Mock = vi.mocked(
    vi.fn(() => ({
      doc: docMock,
      get: vi.fn(),
      collection: vi.fn(() => ({
        doc: docMock,
        get: vi.fn(),
        collection: collectionMock,
      })),
    }))
  );
  return { setMock, collectionMock, docMock, getMock };
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

  it('saveUserHistory should correct save date', async () => {
    const userId = 'agent007';

    await HistoryService.saveUserHistory(userId, requestData);

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalledWith(userId);
    expect(docMock().collection().doc).toHaveBeenCalledWith();
    expect(setMock).toHaveBeenCalledWith(requestData);
  });

  it('getUserHistory should correct return user history', async () => {
    const userId = 'agent007';

    const result = await HistoryService.getUserHistory(userId);

    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(getMock).toHaveBeenCalledWith();
    expect(result).toEqual([{ ...requestData, id: 'req1' }]);
  });
});
