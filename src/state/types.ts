import { ErrorState } from './error/errorReducer';
import { MobileNavState } from './mobileNav/mobileNavReducer';
import { MoviesState } from './movies/moviesReducer';
import { FAVORITES } from '../utils/constants';

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
