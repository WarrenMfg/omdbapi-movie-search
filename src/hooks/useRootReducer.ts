import { useCallback, useEffect, useReducer, useRef } from 'react';
import mobileNavReducer, {
  mobileNavInitialState,
} from '../state/mobileNav/mobileNavReducer';
import {
  Action,
  Dispatch,
  DispatchForLoop,
  RootState,
  Thunk,
} from '../state/types';

const useRootReducer = (): RootState => {
  const combinedDispatches = useRef<React.Dispatch<Action>[]>([]);
  const [mobileNav, mobileNavDispatch] = useReducer(
    mobileNavReducer,
    mobileNavInitialState
  );

  useEffect(() => {
    combinedDispatches.current.push(mobileNavDispatch);
  }, []);

  const dispatchForLoop: DispatchForLoop = useCallback((action: Action) => {
    for (let i = 0; i < combinedDispatches.current.length; i++) {
      combinedDispatches.current[i](action);
    }
  }, []);

  const dispatch: Dispatch = useCallback(
    (action: Thunk | Action, ...args: any[]) => {
      if (typeof action === 'function') {
        action(dispatchForLoop, ...args);
      } else {
        dispatchForLoop(action);
      }
    },
    [dispatchForLoop]
  );

  return {
    dispatch,
    mobileNav,
  };
};

export default useRootReducer;
