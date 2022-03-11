import { ErrorState } from './error/errorReducer';
import { MobileNavState } from './mobileNav/mobileNavReducer';
import { MoviesState } from './movies/moviesReducer';

export type Dispatch = (action: Thunk | Action, ...args: any[]) => void;

export type DispatchForLoop = (action: Action, ...args: any[]) => void;

export type Thunk = (
  dispatch: DispatchForLoop,
  ...args: any[]
) => Promise<void>;

export interface Action {
  type: string;
  payload: any;
}

export interface RootState {
  dispatch: Dispatch;
  mobileNav: MobileNavState;
  movies: MoviesState;
  error: ErrorState;
}
