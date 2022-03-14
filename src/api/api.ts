import { setError } from '../state/error/errorActions';
import { setMovieWithDetails, setMovies } from '../state/movies/moviesActions';
import { DispatchForLoop, Query, Thunk } from '../state/types';

const baseUrl = 'http://www.omdbapi.com/';

// Basic fetch response handler
const handleResponse = async (res: Response) => {
  if (!res.ok) throw new Error('Data could not be fetched.');
  const data = await res.json();
  if (data.Response !== 'True') throw new Error(data.Error);
  return data;
};

// Thunk-like closure used to fetch movies for a route
export const fetchMovies =
  (query: Query): Thunk =>
  async (dispatch: DispatchForLoop) => {
    try {
      const res = await fetch(
        `${baseUrl}?s=${query}&type=movie&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );
      const data = await handleResponse(res);
      dispatch(setMovies(query, data));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };

// export const fetchMoreMovies = ()

// Thunk-like closure used to fetch details for a single movie
export const fetchMovieDetails =
  (query: Query, imdbID: string) => async (dispatch: DispatchForLoop) => {
    try {
      const res = await fetch(
        `${baseUrl}?i=${imdbID}&plot=full&type=movie&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );
      const data = await handleResponse(res);
      dispatch(setMovieWithDetails(query, imdbID, data));
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  };
