// import { useEffect, useState } from 'react';
// import type {Variable} from '@/types/variables'
//
// interface VariablesDataType {
//   [userId: string]: Variable[];
// }
//
// const STORAGE_KEY = 'usersVariables';
//
// export function useStore() {
//   const [variables, setVariables] = useState<VariablesDataType>({});
//
//   useEffect(() => {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (stored) {
//       try {
//         setVariables(JSON.parse(stored));
//       } catch (e) {
//         console.error('Failed to parse variables from localStorage', e);
//       }
//     }
//   }, []);
//
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(variables));
//   }, [variables]);
//
//   function setVariable(userId: string, key: string, value: string, enabled: boolean) {
//
//   }
//   function getUserVariables(userId: string): Variable[] {
//     return variables[userId] || [];
//   }
//   return {
//     getUserVariables,
//     setVariable,
//   };
// }
