export interface Variable {
  key: string;
  value: string;
  enabled: boolean;
}

export default function useVariables() {
  const variables: Variable[] = [];
  const addVariable = () => {};
  const updateVariable = () => {};
  const deleteVariable = () => {};
  return {
    variables,
    addVariable,
    updateVariable,
    deleteVariable,
  };
}
