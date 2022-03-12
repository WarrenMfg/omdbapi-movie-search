import { ReactNode, useEffect } from 'react';
import useRootReducer from '../../hooks/useRootReducer';
import Store from '../../state/store';
import { FAVORITES } from '../../utils/constants';
import setLocalStorage from '../../utils/setLocalStorage';

interface GlobalStoreProps {
  children: ReactNode;
}

const GlobalStore = ({ children }: GlobalStoreProps) => {
  const combinedState = useRootReducer();

  useEffect(() => {
    // window.onbeforeunload = () =>
    //   setLocalStorage(FAVORITES, combinedState.movies[FAVORITES].results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Store.Provider value={combinedState}>{children}</Store.Provider>;
};

export default GlobalStore;
