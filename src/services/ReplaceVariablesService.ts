import type { Variable } from '@/types/variables';

export default class ReplaceVariablesService {
  static replaceVariables(template: string, variables: Variable[]): string {
    return template.replace(/{{\s*([\w.-]+)\s*}}/g, (_, varName) => {
      const found = variables.find((v) => v.enabled && v.key === varName);
      return found ? found.value : `{{${varName}}}`;
    });
  }
}
