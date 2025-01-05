import { createContext, useContext } from 'react';
import { Store } from './makeStore';

export const StoreContext = createContext<Store | null>(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

