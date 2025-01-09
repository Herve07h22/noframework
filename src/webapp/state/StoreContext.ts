import { createContext, useContext } from 'react';
import { Store } from './makeStore';
import { useSnapshot } from 'valtio';

export const StoreContext = createContext<Store | null>(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  const snap = useSnapshot(store)
  // We should return something like toJs(snap) to remove mutations, since a snap is immutable.
  return snap;
};

