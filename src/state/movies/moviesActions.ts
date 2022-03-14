import { Query } from '../types';
import { MovieDetails, RawQueryResults } from './moviesReducer';

export const SET_MOVIES = 'movies/setMany';
export const SET_MOVIE_WITH_DETAILS = 'movies/setOne';
export const ADD_FAVORITE_MOVIE = 'movies/addFavorite';
export const REMOVE_FAVORITE_MOVIE = 'movies/removeFavorite';

export interface SetMoviesAction {
  type: typeof SET_MOVIES;
  payload: {
    query: Query;
    data: RawQueryResults;
    page: number;
  };
}

export const setMovies = (
  query: Query,
  data: RawQueryResults,
  page: number
): SetMoviesAction => ({
  type: SET_MOVIES,
  payload: {
    query,
    data,
    page,
  },
});

export interface SetMoviesWithDetailsAction {
  type: typeof SET_MOVIE_WITH_DETAILS;
  payload: {
    query: Query;
    imdbID: string;
    data: Record<string, string>;
  };
}

export const setMovieWithDetails = (
  query: Query,
  imdbID: string,
  data: Record<string, string>
): SetMoviesWithDetailsAction => ({
  type: SET_MOVIE_WITH_DETAILS,
  payload: {
    query,
    imdbID,
    data,
  },
});

export interface AddFavoriteMovieAction {
  type: typeof ADD_FAVORITE_MOVIE;
  payload: MovieDetails;
}

export const addFavoriteMovie = (
  movie: MovieDetails
): AddFavoriteMovieAction => ({
  type: ADD_FAVORITE_MOVIE,
  payload: movie,
});

export interface RemoveFavoriteMovieAction {
  type: typeof REMOVE_FAVORITE_MOVIE;
  payload: MovieDetails;
}

export const removeFavoriteMovie = (
  movie: MovieDetails
): RemoveFavoriteMovieAction => ({
  type: REMOVE_FAVORITE_MOVIE,
  payload: movie,
});

export type MoviesAction =
  | SetMoviesAction
  | SetMoviesWithDetailsAction
  | AddFavoriteMovieAction
  | RemoveFavoriteMovieAction;
