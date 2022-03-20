import { Movie, MovieDetails } from '../state/movies/moviesReducer';
import { FAVORITES } from './constants';
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from './localStorage';

describe('localStorage', () => {
  const movie = {
    Title: 'Movie title',
    Year: '1970',
    imdbID: 'imdbID',
    Type: 'movie',
    Poster: 'Movie poster',
  } as Movie;
  const test = '__test__';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should set localStorage item', () => {
    setLocalStorage(FAVORITES, test);
    const result = JSON.parse(localStorage.getItem(FAVORITES) || '');
    expect(result).toBe(test);
  });

  it('should get localStorage item', () => {
    setLocalStorage(FAVORITES, test);
    const result = getLocalStorage(FAVORITES, '');
    expect(result).toBe(test);
  });

  it('should add a favorite to localStorage', () => {
    addFavoriteToLocalStorage(movie);
    const result = getLocalStorage(FAVORITES, '');
    expect(result).toEqual([{ ...movie, isFavorite: true, hasDetails: false }]);
  });

  it('should remove a favorite from localStorage', () => {
    addFavoriteToLocalStorage(movie);
    removeFavoriteFromLocalStorage(movie as MovieDetails);
    const result = getLocalStorage(FAVORITES, '');
    expect(result).toEqual([]);
  });
});
