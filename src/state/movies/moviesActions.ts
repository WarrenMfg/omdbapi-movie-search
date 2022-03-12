import { QueryResults } from './moviesReducer';

export const SET_MOVIES = 'movies/setMany';
export const SET_MOVIE = 'movies/setOne';

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
  type: SET_MOVIE,
  payload: {
    query,
    imdbID,
    data,
  },
});
