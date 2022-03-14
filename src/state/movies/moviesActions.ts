import { Query } from '../types';
import { MovieDetails, QueryResults } from './moviesReducer';

export const SET_MOVIES = 'movies/setMany';
export const SET_MOVIE_WITH_DETAILS = 'movies/setOne';
export const ADD_FAVORITE_MOVIE = 'movies/addFavorite';
export const REMOVE_FAVORITE_MOVIE = 'movies/removeFavorite';

export const setMovies = (query: Query, data: QueryResults) => ({
  type: SET_MOVIES,
  payload: {
    query,
    data,
  },
});

export const setMovieWithDetails = (
  query: Query,
  imdbID: string,
  data: Record<string, string>
) => ({
  type: SET_MOVIE_WITH_DETAILS,
  payload: {
    query,
    imdbID,
    data,
  },
});

export const addFavoriteMovie = (movie: MovieDetails) => ({
  type: ADD_FAVORITE_MOVIE,
  payload: movie,
});

export const removeFavoriteMovie = (movie: MovieDetails) => ({
  type: REMOVE_FAVORITE_MOVIE,
  payload: movie,
});
