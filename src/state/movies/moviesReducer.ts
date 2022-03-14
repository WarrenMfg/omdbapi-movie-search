import { FAVORITES, MOVIE_DETAILS_PROPERTIES } from '../../utils/constants';
import { getLocalStorage } from '../../utils/localStorage';
import reduceObject from '../../utils/reduceObject';
import { Query } from '../types';
import {
  ADD_FAVORITE_MOVIE,
  SET_MOVIE_WITH_DETAILS,
  SET_MOVIES,
  REMOVE_FAVORITE_MOVIE,
  MoviesAction,
  SetMoviesAction,
} from './moviesActions';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  hasDetails: boolean;
  isFavorite: boolean;
  query: Query;
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

export interface RawQueryResults {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface QueryResults {
  results: (Movie | MovieDetails)[];
  totalResults?: number;
}

export interface MoviesState {
  super?: QueryResults;
  cool?: QueryResults;
  nice?: QueryResults;
  sweet?: QueryResults;
  awesome?: QueryResults;
  dude?: QueryResults;
  favorites: QueryResults;
}

export interface Favorites {
  favorites: QueryResults;
}

const favorites: Favorites = {
  favorites: {
    results: getLocalStorage(FAVORITES, []),
  },
};

export const moviesInitialState: MoviesState = {
  ...favorites,
};

const moviesReducer = (
  state = moviesInitialState,
  action: MoviesAction
): MoviesState => {
  switch (action.type) {
    /**
     * Set movies
     */
    case SET_MOVIES: {
      // Create a lookup map based in imdbID to determine if any movies are a favorite
      const favoritesMap = state.favorites.results.reduce((acc, cur) => {
        acc[cur.imdbID] = cur;
        return acc;
      }, {} as Record<string, Movie | MovieDetails>);

      // Add additional details to search results
      const results = (action as SetMoviesAction).payload.data.Search.map(
        (movie: Movie) => ({
          ...movie,
          hasDetails: false,
          isFavorite: !!favoritesMap[movie.imdbID],
          query: action.payload.query,
        })
      ) as Movie[];

      const totalResults = +action.payload.data.totalResults;

      return {
        ...state,
        [action.payload.query]: {
          totalResults,
          results,
        },
      };
    }

    /**
     * Set movie with details
     */
    case SET_MOVIE_WITH_DETAILS: {
      const { query, imdbID, data } = action.payload;
      const queryResults = state[query] as QueryResults;

      const movieIdx = queryResults.results.findIndex(
        (movie: Movie) => movie.imdbID === imdbID
      );
      if (movieIdx < 0) return state;

      // Reduce details to only the details necessary
      const movieDetails = reduceObject(data, MOVIE_DETAILS_PROPERTIES);

      // Update movie with details
      const updatedMovieResults = [...queryResults.results];
      updatedMovieResults[movieIdx] = {
        ...queryResults.results[movieIdx],
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

    /**
     * Add favorite movie
     */
    case ADD_FAVORITE_MOVIE: {
      const { query, imdbID } = action.payload;
      const queryResults = state[query] as QueryResults;

      const movieIdx = queryResults.results.findIndex(
        movie => movie.imdbID === imdbID
      );
      if (movieIdx < 0) return state;

      // Update movie as favorite
      const updatedMovieResults = [...queryResults.results];
      updatedMovieResults[movieIdx] = {
        ...updatedMovieResults[movieIdx],
        isFavorite: true,
      };

      return {
        ...state,
        [query]: {
          ...queryResults,
          results: updatedMovieResults,
        },
        favorites: {
          ...state.favorites,
          results: [...state.favorites.results, updatedMovieResults[movieIdx]],
        },
      };
    }

    /**
     * Remove favorite movie
     */
    case REMOVE_FAVORITE_MOVIE: {
      const { query, imdbID } = action.payload;
      const queryResults = state[query] as QueryResults;

      const restState = {
        ...state,
        favorites: {
          ...state.favorites,
          results: state.favorites.results.filter(
            movie => movie.imdbID !== imdbID
          ),
        },
      };

      // On reload, queryResults may not exist yet
      if (queryResults) {
        const movieIdx = queryResults.results.findIndex(
          movie => movie.imdbID === imdbID
        );
        if (movieIdx < 0) return restState;

        // Update move as not a favorite
        const updatedMovieResults = [...queryResults.results];
        updatedMovieResults[movieIdx] = {
          ...updatedMovieResults[movieIdx],
          isFavorite: false,
        };

        return {
          ...restState,
          [query]: {
            ...queryResults,
            results: updatedMovieResults,
          },
        };
      }

      return restState;
    }

    /**
     * Default
     */
    default:
      return state;
  }
};

export default moviesReducer;
