import {
  Movie,
  MovieDetails,
  MoviesState,
} from '../state/movies/moviesReducer';
import reduceObject from './reduceObject';

const movieDetailsProperties = [
  'Rated',
  'Released',
  'Runtime',
  'Genre',
  'Director',
  'Writer',
  'Actors',
  'Plot',
  'Language',
  'Country',
];

const updateMovieResults = (
  state: MoviesState,
  query: string,
  imdbID: string,
  data: Record<string, string>
) => {
  const movieDetails = reduceObject(data, movieDetailsProperties);
  const movieIdx = state[query].results.findIndex(
    (movie: Movie) => movie.imdbID === imdbID
  );
  if (movieIdx < 0) return state[query].results;
  const updatedMovie = {
    ...state[query].results[movieIdx],
    ...movieDetails,
    hasDetails: true,
  } as MovieDetails;
  const updatedMovieResults = [...state[query].results];
  updatedMovieResults[movieIdx] = updatedMovie;
  return updatedMovieResults;
};

export default updateMovieResults;
