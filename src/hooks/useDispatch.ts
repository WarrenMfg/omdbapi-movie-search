import { useContext } from 'react';
import Store from '../state/store';

/**
 * Get redux-like dispatch function
 */
const useDispatch = () => {
  const { dispatch } = useContext(Store);
  return dispatch;
};

export default useDispatch;
