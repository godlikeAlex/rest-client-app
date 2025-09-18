import type { Variable } from '@/types/variables';
import { useEffect, useState } from 'react';
import VariablesService from '@/services/VariablesService';

export default function useVariables(userId: string) {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loaded = VariablesService.getUsersVariables(userId);
    setVariables(loaded ?? []);
    setInitialized(true);
  }, [userId]);

  useEffect(() => {
    if (!initialized) return;
    VariablesService.setUsersVariables(userId, variables);
  }, [variables, userId, initialized]);

  const addVariable = (
    variable: Variable = { key: '', value: '', enabled: true }
  ) => {
    setVariables((prev) => [...prev, variable]);
  };

  const updateVariable = <K extends keyof Variable>(
    index: number,
    key: K,
    value: Variable[K]
  ) => {
    setVariables((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const deleteVariable = (index: number) => {
    setVariables((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    variables,
    addVariable,
    updateVariable,
    deleteVariable,
    setVariables,
  };
}
