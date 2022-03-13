import { FAVORITES } from '../../utils/constants';
import { getLocalStorage } from '../../utils/localStorage';
import updateMovieWithDetails from '../../utils/updateMovieWithDetails';
import { Action } from '../types';
import {
  ADD_FAVORITE_MOVIE,
  SET_MOVIE_WITH_DETAILS,
  SET_MOVIES,
  REMOVE_FAVORITE_MOVIE,
} from './moviesActions';

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

    case SET_MOVIE_WITH_DETAILS: {
      const { query, imdbID, data } = action.payload;
      const updatedMovieResults = updateMovieWithDetails(
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

    case ADD_FAVORITE_MOVIE: {
      const { query, imdbID } = action.payload;
      const movieIdx = state[query].results.findIndex(
        movie => movie.imdbID === imdbID
      );
      if (movieIdx < 0) return state;
      const updatedMovieResults = [...state[query].results];
      updatedMovieResults[movieIdx] = {
        ...updatedMovieResults[movieIdx],
        isFavorite: true,
      };
      return {
        ...state,
        [query]: {
          ...state[query],
          results: updatedMovieResults,
        },
        [FAVORITES]: {
          ...state[FAVORITES],
          results: [...state[FAVORITES].results, updatedMovieResults[movieIdx]],
        },
      };
    }

    case REMOVE_FAVORITE_MOVIE: {
      const { query, imdbID } = action.payload;
      const movieIdx = state[query].results.findIndex(
        movie => movie.imdbID === imdbID
      );
      if (movieIdx < 0) return state;
      const updatedMovieResults = [...state[query].results];
      updatedMovieResults[movieIdx] = {
        ...updatedMovieResults[movieIdx],
        isFavorite: false,
      };
      return {
        ...state,
        [query]: {
          ...state[query],
          results: updatedMovieResults,
        },
        [FAVORITES]: {
          ...state[FAVORITES],
          results: state[FAVORITES].results.filter(
            movie => movie.imdbID !== imdbID
          ),
        },
      };
    }

    default:
      return state;
  }
};

export default moviesReducer;
