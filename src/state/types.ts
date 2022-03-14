import { Dispatch as ReactDispatch, ReducerAction } from 'react';
import { ErrorState } from './error/errorReducer';
import { MobileNavState } from './mobileNav/mobileNavReducer';
import { MoviesState } from './movies/moviesReducer';
import { FAVORITES } from '../utils/constants';
import { MoviesAction } from './movies/moviesActions';
import { ErrorAction } from './error/errorActions';
import { MobileNavAction } from './mobileNav/mobileNavActions';

export type Dispatch = (action: Thunk | Action, ...args: any[]) => void;

export type DispatchForLoop = (action: Action, ...args: any[]) => void;

export type Thunk = (
  dispatch: DispatchForLoop,
  ...args: any[]
) => Promise<void>;

export type Action = MoviesAction | ErrorAction | MobileNavAction;

export type CombinedDispatches = (
  | React.Dispatch<MoviesAction>
  | React.Dispatch<ErrorAction>
  | React.Dispatch<MobileNavAction>
)[];

type Reducer =
  | ((
      state: MobileNavState | undefined,
      action: MobileNavAction
    ) => MobileNavState)
  | ((state: MoviesState | undefined, action: MoviesAction) => MoviesState)
  | ((state: ErrorState | undefined, action: ErrorAction) => ErrorState);

export type ReactDispatcher = ReactDispatch<ReducerAction<Reducer>>;

export interface RootState {
  dispatch: Dispatch;
  mobileNav: MobileNavState;
  movies: MoviesState;
  error: ErrorState;
}

export const NAV_ITEMS = [
  'super',
  'cool',
  'nice',
  'sweet',
  'awesome',
  'dude',
  FAVORITES,
] as const;

export type Query = typeof NAV_ITEMS[number];
