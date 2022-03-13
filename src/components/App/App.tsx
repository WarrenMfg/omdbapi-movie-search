import { SyntheticEvent, useEffect, useState } from 'react';

import { fetchMovieDetails, fetchMovies } from '../../api/api';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import { Movie, MovieDetails } from '../../state/movies/moviesReducer';
import { FAVORITES } from '../../utils/constants';
import Card from '../Card/Card';
import Error from '../Error/Error';
import Modal from '../Modal/Modal';
import MovieModalContent from '../MovieModalContent/MovieModalContent';
import Spinner from '../Spinner/Spinner';

import './App.module.css';

interface AppProps {
  query: string;
}

const App = ({ query }: AppProps) => {
  const [moviesIdxForModal, setMoviesIdxForModal] = useState(-1);
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.error.message);
  const movies = useSelector(state => state.movies[query]?.results);
  const isFavorites = query === FAVORITES;

  useEffect(() => {
    if (!movies && !isFavorites) {
      dispatch(fetchMovies(query));
    }
  }, [query, dispatch, movies, isFavorites]);

  const handleOpenCard = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const id = target.closest('button')?.id;
    if (!id) return;
    const [idx, imdbID] = id.split('-');
    const movie = movies.find(movie => movie.imdbID === imdbID);
    if (!movie) return;
    if (!movie.hasDetails) {
      dispatch(fetchMovieDetails(query, imdbID));
    }
    setMoviesIdxForModal(+idx);
  };

  if (errorMessage) return <Error errorMessage={errorMessage} />;
  if (!movies && !isFavorites) return <Spinner />;
  return (
    <>
      <AppHeading {...{ query, isFavorites }} />
      <MoviesList {...{ movies, handleOpenCard }} />
      <Modal
        isOpen={moviesIdxForModal > -1}
        closeModal={() => setMoviesIdxForModal(-1)}
      >
        <MovieModalContent
          query={query}
          movie={movies[moviesIdxForModal] as MovieDetails}
          closeModal={() => setMoviesIdxForModal(-1)}
        />
      </Modal>
    </>
  );
};

interface AppHeadingProps {
  query: string;
  isFavorites: boolean;
}

const AppHeading = ({ query, isFavorites }: AppHeadingProps) => (
  <h2 className='m-auto mt-2 mb-6 max-w-xs text-lg font-bold text-cyan-700 tl:max-w-none'>
    {isFavorites ? (
      <span className='capitalize'>{FAVORITES}</span>
    ) : (
      <span>
        Movie List for <span className='capitalize tl:hidden'>"{query}"</span>
      </span>
    )}
  </h2>
);

interface MoviesListProps {
  movies: (Movie | MovieDetails)[];
  handleOpenCard: (e: SyntheticEvent) => void;
}

const MoviesList = ({ movies, handleOpenCard }: MoviesListProps) =>
  movies.length ? (
    <ul className='grid grid-cols-1 place-items-center gap-8 tl:grid-cols-2 lg:grid-cols-3'>
      {movies.map((movie, i) => (
        <Card
          key={`${i}-${movie.Title}`}
          handleOpenCard={handleOpenCard}
          title={movie.Title}
          isFavorite={!!movie.isFavorite}
          year={movie.Year}
          image={movie.Poster}
          id={`${i}-${movie.imdbID}`}
        />
      ))}
    </ul>
  ) : (
    <p className='text-center font-bold text-cyan-700'>
      Pick some favorites! 🎉
    </p>
  );

export default App;
