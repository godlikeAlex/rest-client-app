import type { Variable } from '@/types/variables';
import { useEffect, useState } from 'react';
import {
  getUsersVariables,
  setUsersVariables,
} from '@/pages/Variables/hooks/useStore';

export default function useVariables(userId: string) {
  const [variables, setVariables] = useState<Variable[]>([]);

  const addVariable = (
    variable: Variable = { key: '', value: '', enabled: true }
  ) => {
    setVariables((prev) => [...prev, variable]);
    console.log(variables);
  };

  const updateVariable = <K extends keyof Variable>(
    index: number,
    key: K,
    value: Variable[K]
  ) => {
    setVariables((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
    console.log(variables);
  };

  const deleteVariable = (index: number) => {
    setVariables((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const loaded = getUsersVariables(userId);
    setVariables(loaded);
  }, [userId]);

  useEffect(() => {
    setUsersVariables(userId, variables);
  }, [variables, userId]);

  return {
    variables,
    addVariable,
    updateVariable,
    deleteVariable,
    setVariables,
  };
}
