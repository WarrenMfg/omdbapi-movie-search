import { FAVORITES } from '../../utils/constants';
import getLocalStorage from '../../utils/getLocalStorage';
import updateMovieResults from '../../utils/updateMovieResults';
import { Action } from '../types';
import { SET_MOVIE, SET_MOVIES } from './moviesActions';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  hasDetails: boolean;
  isFavorite: boolean;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
}

export interface QueryResults {
  results: (Movie | MovieDetails)[];
  totalResults?: number;
}

export interface MoviesState {
  [query: string]: QueryResults;
}

export const moviesInitialState: MoviesState = {
  [FAVORITES]: {
    results: getLocalStorage(FAVORITES, []),
  },
};

const moviesReducer = (
  state = moviesInitialState,
  action: Action
): MoviesState => {
  switch (action.type) {
    case SET_MOVIES: {
      const faveMap = state[FAVORITES].results.reduce((acc, cur) => {
        acc[cur.imdbID] = cur;
        return acc;
      }, {} as Record<string, Movie | MovieDetails>);

      const results = action.payload.data.Search.map((movie: Movie) => ({
        ...movie,
        hasDetails: false,
        isFavorite: !!faveMap[movie.imdbID],
      })) as Movie[];

      const totalResults = +action.payload.data.totalResults;

      return {
        ...state,
        [action.payload.query]: { totalResults, results },
      };
    }

    case SET_MOVIE: {
      const { query, imdbID, data } = action.payload;
      const updatedMovieResults = updateMovieResults(
        state,
        query,
        imdbID,
        data
      );
      return {
        ...state,
        [query]: {
          ...state[query],
          results: updatedMovieResults,
        },
      };
    }

    default:
      return state;
  }
};

export default moviesReducer;
