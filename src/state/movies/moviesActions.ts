import { QueryResults } from './moviesReducer';

export const SET_MOVIES = 'movies/set';

export const setMovies = (query: string, data: QueryResults) => ({
  type: SET_MOVIES,
  payload: {
    query,
    data,
  },
});
