import { Action } from '../types';
import { SET_MOVIES } from './moviesActions';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface QueryResults {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MoviesState {
  [query: string]: QueryResults;
}

export const moviesInitialState: MoviesState = {};

const moviesReducer = (
  state = moviesInitialState,
  action: Action
): MoviesState => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        [action.payload.query]: action.payload.data,
      };
    default:
      return state;
  }
};

export default moviesReducer;
