import { Movie, MovieDetails } from '../state/movies/moviesReducer';
import { FAVORITES } from './constants';

export const addFavoriteToLocalStorage = (movie: Movie) => {
  const favorites = getLocalStorage<Movie[]>(FAVORITES, []);
  favorites.push({ ...movie, isFavorite: true, hasDetails: false });
  setLocalStorage(FAVORITES, favorites);
};

export const removeFavoriteFromLocalStorage = (movie: MovieDetails) => {
  const favorites = getLocalStorage<Movie[]>(FAVORITES, []).filter(
    mov => mov.imdbID !== movie.imdbID
  );
  setLocalStorage(FAVORITES, favorites);
};

export const getLocalStorage = <RT>(key: string, defaultValue: any): RT => {
  try {
    return JSON.parse(localStorage.getItem(key) || '');
  } catch (error) {
    return defaultValue;
  }
};

export const setLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
    // POST error to logging service
  }
};
