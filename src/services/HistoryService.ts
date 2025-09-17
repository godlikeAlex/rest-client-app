import { serverDb } from '@/services/firebase.server';
import type { RequestBase } from './RequestService';

export interface RequestData extends RequestBase {
  id: string;
  url: string;
  method: string;
  duration: number;
  error: string | null;
  requestData: {
    headers: { key: string; value: string; enabled: boolean }[];
    body: string;
    queryParams: Record<string, string>;
  };
}

export default class HistoryService {
  static async saveUserHistory(userId: string, data: Omit<RequestData, 'id'>) {
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

    const data: RequestData[] = [];

    snapshot.forEach((doc) => {
      data.push({
        ...(doc.data() as RequestData),
        id: doc.id,
      });
    });

    return data;
  }
}
