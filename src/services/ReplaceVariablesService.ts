import type { Variable } from '@/types/variables';
import type { HeaderClient } from '@/types/headers';

export default class ReplaceVariablesService {
  static replaceVariables(template: string, variables: Variable[]): string {
    return template.replace(/{{\s*([\w.-]+)\s*}}/g, (_, varName) => {
      const found = variables.find((v) => v.enabled && v.key === varName);
      return found ? found.value : `{{${varName}}}`;
    });
  }

  static prepareRequestComponents(
    url: string,
    body: string,
    headers: HeaderClient[],
    variables: Variable[]
  ) {
    return {
      url: ReplaceVariablesService.replaceVariables(url, variables),
      body: body
        ? ReplaceVariablesService.replaceVariables(body, variables)
        : '',
      headers: headers.map((obj) => ({
        ...obj,
        key: ReplaceVariablesService.replaceVariables(obj.key, variables),
        value: ReplaceVariablesService.replaceVariables(obj.value, variables),
      })),
    };
  }
}
