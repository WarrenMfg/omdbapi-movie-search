import { Movie } from '../state/movies/moviesReducer';

const getLocalStorage = (key: string, defaultValue: any): Movie[] => {
  try {
    return JSON.parse(localStorage.get(key));
  } catch (error) {
    return defaultValue;
  }
};

export default getLocalStorage;
