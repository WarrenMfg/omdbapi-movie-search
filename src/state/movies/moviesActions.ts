import { QueryResults } from './moviesReducer';

export const SET_MOVIES = 'movies/setMany';
export const SET_MOVIE_WITH_DETAILS = 'movies/setOne';
export const ADD_FAVORITE_MOVIE = 'movies/addFavorite';
export const REMOVE_FAVORITE_MOVIE = 'movies/removeFavorite';

export const setMovies = (query: string, data: QueryResults) => ({
  type: SET_MOVIES,
  payload: {
    query,
    data,
  },
});

export const setMovie = (
  query: string,
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

export const addFavoriteMovie = (query: string, imdbID: string) => ({
  type: ADD_FAVORITE_MOVIE,
  payload: {
    query,
    imdbID,
  },
});

export const removeFavoriteMovie = (query: string, imdbID: string) => ({
  type: REMOVE_FAVORITE_MOVIE,
  payload: {
    query,
    imdbID,
  },
});
