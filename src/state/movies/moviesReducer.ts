import { FAVORITES } from '../../components/Routes/Routes';
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
  totalResults: number;
}

export interface MoviesState {
  [query: string]: QueryResults;
}

export const moviesInitialState: MoviesState = {
  [FAVORITES]: {
    results: [],
    totalResults: 0,
  },
};

const moviesReducer = (
  state = moviesInitialState,
  action: Action
): MoviesState => {
  switch (action.type) {
    case SET_MOVIES: {
      const results = action.payload.data.Search.map((movie: Movie) => ({
        ...movie,
        hasDetails: false,
      }));
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
