import { ReactNode } from 'react';
import useRootReducer from '../../hooks/useRootReducer';
import Store from '../../state/store';

interface GlobalStoreProps {
  children: ReactNode;
}

/**
 * Redux-like store
 */
const GlobalStore = ({ children }: GlobalStoreProps) => {
  const combinedState = useRootReducer();
  return <Store.Provider value={combinedState}>{children}</Store.Provider>;
};

export default GlobalStore;
