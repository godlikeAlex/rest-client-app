import type { Variable } from '@/types/variables';

const STORAGE_KEY = 'usersVariables';

interface VariablesDataType {
  [userId: string]: Variable[];
}
export default class LocalStorageService {
  static setUsersVariables(userId: string, variables: Variable[]) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: VariablesDataType = raw ? JSON.parse(raw) : {};
      parsed[userId] = variables;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch (e) {
      console.error('Wrong with saving to localStorage:', e);
    }
  }

  static getUsersVariables(userId: string): Variable[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: VariablesDataType = JSON.parse(raw);
      return parsed[userId] || [];
    } catch {
      return [];
    }
  }
}
