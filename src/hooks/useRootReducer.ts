import { useCallback, useEffect, useReducer, useRef } from 'react';
import errorReducer, { errorInitialState } from '../state/error/errorReducer';
import mobileNavReducer, {
  mobileNavInitialState,
} from '../state/mobileNav/mobileNavReducer';
import moviesReducer, {
  moviesInitialState,
} from '../state/movies/moviesReducer';
import {
  Action,
  Dispatch,
  DispatchForLoop,
  RootState,
  Thunk,
} from '../state/types';

const useRootReducer = (): RootState => {
  const combinedDispatches = useRef<React.Dispatch<Action>[]>([]);

  // mobile navigation
  const [mobileNav, mobileNavDispatch] = useReducer(
    mobileNavReducer,
    mobileNavInitialState
  );

  // movies
  const [movies, moviesDispatch] = useReducer(
    moviesReducer,
    moviesInitialState
  );

  // error
  const [error, errorDispatch] = useReducer(errorReducer, errorInitialState);

  useEffect(() => {
    combinedDispatches.current.push(
      mobileNavDispatch,
      moviesDispatch,
      errorDispatch
    );
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
    movies,
    error,
  };
};

export default useRootReducer;
