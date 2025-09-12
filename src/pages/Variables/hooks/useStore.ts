import type { Variable } from '@/types/variables';

interface VariablesDataType {
  [userId: string]: Variable[];
}

const STORAGE_KEY = 'usersVariables';

export function setUsersVariables(userId: string, variables: Variable[]) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: VariablesDataType = raw ? JSON.parse(raw) : {};
    console.log(parsed);
    parsed[userId] = variables;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch (e) {
    console.error('Wrong with saving to localStorage:', e);
  }
}

export function getUsersVariables(userId: string): Variable[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: VariablesDataType = JSON.parse(raw);
    return parsed[userId] || [];
  } catch {
    return [];
  }
}
