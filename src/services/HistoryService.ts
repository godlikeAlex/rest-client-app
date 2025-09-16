import { serverDb } from '@/services/firebase.server';

export type requestData = {
  id: string;
  url: string;
  method: string;
  statusCode: number;
  duration: number;
  timestamp: number;
  requestSize: number;
  responseSize: number;
  error: string | null;
  requestData: {
    headers: { key: string; value: string; enabled: boolean }[];
    body: string;
    queryParams: Record<string, string>;
  };
};

export default class HistoryService {
  static async saveUserHistory(userId: string, data: Omit<requestData, 'id'>) {
    const userDoc = serverDb
      .collection('users')
      .doc(userId)
      .collection('requests');
    const requestRef = userDoc.doc();

    await requestRef.set({
      ...data,
    });
  }

  static async getUserHistory(userId: string) {
    const colRef = serverDb
      .collection('users')
      .doc(userId)
      .collection('requests');
    const snapshot = await colRef.get();

    const data: requestData[] = [];

    snapshot.forEach((doc) => {
      data.push({
        ...(doc.data() as requestData),
        id: doc.id,
      });
    });

    return data;
  }
}
