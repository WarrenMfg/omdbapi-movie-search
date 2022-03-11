import { useContext } from 'react';
import Store from '../state/store';

const useDispatch = () => {
  const { dispatch } = useContext(Store);
  return dispatch;
};

export default useDispatch;
