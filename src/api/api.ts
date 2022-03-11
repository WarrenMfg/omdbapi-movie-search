import { setError } from '../state/error/errorActions';
import { setMovies } from '../state/movies/moviesActions';
import { DispatchForLoop, Thunk } from '../state/types';

const baseUrl = 'http://www.omdbapi.com/';

const handleResponse = async (res: Response) => {
  if (!res.ok) throw new Error('Oops! Data could not be fetched.');
  const data = await res.json();
  if (data.Response !== 'True') throw new Error(data.Error);
  return data;
};

export const fetchMovies =
  (query: string): Thunk =>
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
