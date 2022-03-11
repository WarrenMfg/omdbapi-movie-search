import { useContext } from 'react';
import Store from '../state/store';
import { RootState } from '../state/types';

const useSelector = <T>(selector: (state: RootState) => T): T => {
  const context = useContext(Store);
  return selector(context);
};

export default useSelector;
