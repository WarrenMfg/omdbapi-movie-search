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

/**
 * Redux-like root reducer
 */
const useRootReducer = (): RootState => {
  const combinedDispatches = useRef<React.Dispatch<Action>[]>([]);

  // Mobile navigation
  const [mobileNav, mobileNavDispatch] = useReducer(
    mobileNavReducer,
    mobileNavInitialState
  );

  // Movies
  const [movies, moviesDispatch] = useReducer(
    moviesReducer,
    moviesInitialState
  );

  // Error
  const [error, errorDispatch] = useReducer(errorReducer, errorInitialState);

  // On mount, save all dispatch functions to a ref
  useEffect(() => {
    if (!combinedDispatches.current.length) {
      combinedDispatches.current.push(
        mobileNavDispatch,
        moviesDispatch,
        errorDispatch
      );
    }
  }, []);

  // Dispatch loop to call reducers and update state
  const dispatchForLoop: DispatchForLoop = useCallback((action: Action) => {
    for (let i = 0; i < combinedDispatches.current.length; i++) {
      combinedDispatches.current[i](action);
    }
  }, []);

  // Dispatch wrapper to check for Thunk-like functions that are dispatched,
  // otherwise, the dispatch loop above is called
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
