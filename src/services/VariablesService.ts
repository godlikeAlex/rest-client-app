import type { Variable } from '@/types/variables';
import type { HeaderClient } from '@/types/headers';

const STORAGE_KEY = 'usersVariables';

interface VariablesDataType {
  [userId: string]: Variable[];
}

type RequestData = {
  url: string;
  body?: string;
  headers?: HeaderClient[];
};

export default class VariablesService {
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

  static replaceVariables(template: RequestData, variables: Variable[]) {
    const replaceInString = (template?: string): string => {
      if (!template) return '';
      return template.replace(/{{\s*([\w.-]+)\s*}}/g, (_, varName) => {
        const found = variables.find((v) => v.enabled && v.key === varName);
        return found ? found.value : `{{${varName}}}`;
      });
    };

    const replacedHeaders =
      template.headers?.map((obj) => ({
        ...obj,
        key: replaceInString(obj.key),
        value: replaceInString(obj.value),
      })) ?? [];

    return {
      url: replaceInString(template.url),
      body: replaceInString(template.body),
      headers: replacedHeaders,
    };
  }
}
