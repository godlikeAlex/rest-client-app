import type { HeaderClient } from '@/types/headers';
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

export type RestClientState = {
  method: string;
  url: string;
  body: string;
  headers: HeaderClient[];
};

const RestContext = createContext<{
  state: RestClientState;
  setState: Dispatch<SetStateAction<RestClientState>>;
} | null>(null);

const defaultState: RestClientState = {
  method: 'GET',
  url: '',
  body: '{}',
  headers: [],
};

export default function RestContextProvider({
  children,
  initialState = defaultState,
}: {
  children: ReactNode;
  initialState?: Partial<RestClientState>;
}) {
  const [state, setState] = useState<RestClientState>({
    ...defaultState,
    ...initialState,
  });

  return (
    <RestContext.Provider value={{ state, setState }}>
      {children}
    </RestContext.Provider>
  );
}

export function useRestContext() {
  const context = useContext(RestContext);

  if (!context) {
    throw new Error('useRestContext must be used within TableProvider');
  }

  return context;
}
