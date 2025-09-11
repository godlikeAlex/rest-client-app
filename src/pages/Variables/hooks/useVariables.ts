import type { Variable } from '@/types/variables';
import { useState } from 'react';

export default function useVariables() {
  // const {variables} = AuthContext()
  // const {getUserVariables, setVariable} = useStore();
  // const oldVar = getUserVariables('user1');

  const [variables, setVariables] = useState<Variable[]>([]);
  //const variables = getUserVariables('user1')
  const addVariable = (
    variable: Variable = { key: '', value: '', enabled: true }
  ) => {
    setVariables((prev) => [...prev, variable]);
    // setVariable('user1', '2' , 'first', true)
  };
  const updateVariable = () => {};
  const deleteVariable = (index: number) => {
    setVariables((prev) => prev.filter((_, i) => i !== index));
  };
  return {
    variables,
    addVariable,
    updateVariable,
    deleteVariable,
  };
}
