import { MovieDetails } from '../state/movies/moviesReducer';
import { FAVORITES } from './constants';

export const addToLocalStorage = (movie: MovieDetails) => {
  const favorites = getLocalStorage(FAVORITES, []);
  favorites.push(movie);
  setLocalStorage(FAVORITES, favorites);
};

export const removeFromLocalStorage = (movie: MovieDetails) => {
  const favorites = getLocalStorage(FAVORITES, []).filter(
    mov => mov.imdbID !== movie.imdbID
  );
  setLocalStorage(FAVORITES, favorites);
};

export const getLocalStorage = (
  key: string,
  defaultValue: any
): MovieDetails[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || '');
  } catch (error) {
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, data: any) => {
  try {
    console.log(key);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
    // POST error to logging service
  }
};
