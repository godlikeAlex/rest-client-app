import type { Variable } from '@/types/variables';
import { useEffect, useState } from 'react';
import LocalStorageService from '@/services/LocalStorageService';

export default function useVariables(userId: string) {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loaded = LocalStorageService.getUsersVariables(userId);
    setVariables(loaded ?? []);
    setInitialized(true);
  }, [userId]);

  useEffect(() => {
    if (!initialized) return;
    LocalStorageService.setUsersVariables(userId, variables);
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
