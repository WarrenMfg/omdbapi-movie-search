import { FAVORITES, MOVIE_DETAILS_PROPERTIES } from '../../utils/constants';
import { getLocalStorage } from '../../utils/localStorage';
import reduceObject from '../../utils/reduceObject';
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
  query: string;
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
  favorites: {
    results: getLocalStorage(FAVORITES, []),
  },
};

const moviesReducer = (
  state = moviesInitialState,
  action: Action
): MoviesState => {
  switch (action.type) {
    case SET_MOVIES: {
      const favoritesMap = state.favorites.results.reduce((acc, cur) => {
        acc[cur.imdbID] = cur;
        return acc;
      }, {} as Record<string, Movie | MovieDetails>);

      const results = action.payload.data.Search.map((movie: Movie) => ({
        ...movie,
        hasDetails: false,
        isFavorite: !!favoritesMap[movie.imdbID],
        query: action.payload.query,
      })) as Movie[];

      const totalResults = +action.payload.data.totalResults;

      return {
        ...state,
        [action.payload.query]: { totalResults, results },
      };
    }

    case SET_MOVIE_WITH_DETAILS: {
      const { query, imdbID, data } = action.payload;
      const movieIdx = state[query].results.findIndex(
        (movie: Movie) => movie.imdbID === imdbID
      );
      if (movieIdx < 0) return state;
      const movieDetails = reduceObject(data, MOVIE_DETAILS_PROPERTIES);
      const updatedMovieResults = [...state[query].results];
      updatedMovieResults[movieIdx] = {
        ...state[query].results[movieIdx],
        ...movieDetails,
        hasDetails: true,
      };
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
        favorites: {
          ...state.favorites,
          results: [...state.favorites.results, updatedMovieResults[movieIdx]],
        },
      };
    }

    case REMOVE_FAVORITE_MOVIE: {
      const { query, imdbID } = action.payload;
      const restState = {
        ...state,
        favorites: {
          ...state.favorites,
          results: state.favorites.results.filter(
            movie => movie.imdbID !== imdbID
          ),
        },
      };

      if (state[query]) {
        const movieIdx = state[query].results.findIndex(
          movie => movie.imdbID === imdbID
        );
        if (movieIdx < 0) return restState;
        const updatedMovieResults = [...state[query].results];
        updatedMovieResults[movieIdx] = {
          ...updatedMovieResults[movieIdx],
          isFavorite: false,
        };

        return {
          ...restState,
          [query]: {
            ...state[query],
            results: updatedMovieResults,
          },
        };
      }

      return restState;
    }

    default:
      return state;
  }
};

export default moviesReducer;
