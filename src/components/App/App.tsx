import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

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

interface AppProps {
  query: string;
}

/**
 * Main shell component to render all routes
 */
const App = ({ query }: AppProps) => {
  const [moviesIdxForModal, setMoviesIdxForModal] = useState(-1);
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.error.message);
  const movies = useSelector(state => state.movies[query]?.results);
  const isViewingFavorites = query === FAVORITES;

  // If user is not on '/favorites' routes, then fetch movies
  useEffect(() => {
    if (!movies && !isViewingFavorites) {
      dispatch(fetchMovies(query));
    }
  }, [query, dispatch, movies, isViewingFavorites]);

  // Focus the active card after closing the modal
  useEffect(() => {
    if (moviesIdxForModal === -1) {
      cardRef.current?.focus();
    }
  }, [moviesIdxForModal]);

  // Fetch movie details if haven't already done so
  const handleOpenCard = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const button = target.closest('button');
    const id = button?.id;
    if (!id) return;

    // Get the movie list array index and the imdbID
    const [idx, imdbID] = id.split('-');
    const movie = movies.find(movie => movie.imdbID === imdbID);
    if (!movie) return;

    if (!movie.hasDetails) {
      dispatch(fetchMovieDetails(query, imdbID));
    }

    // Keep track of active card so we can focus on it later
    cardRef.current = button;
    setMoviesIdxForModal(+idx);
  };

  const handleCloseModal = useCallback(() => setMoviesIdxForModal(-1), []);

  if (errorMessage) return <Error errorMessage={errorMessage} />;
  if (!movies && !isViewingFavorites) return <Spinner />;
  return (
    <>
      <AppHeading {...{ query, isViewingFavorites }} />
      <MoviesList {...{ movies, handleOpenCard }} />
      <Modal isOpen={moviesIdxForModal > -1} closeModal={handleCloseModal}>
        <MovieModalContent
          movie={movies[moviesIdxForModal] as MovieDetails}
          closeModal={handleCloseModal}
        />
      </Modal>
    </>
  );
};

interface AppHeadingProps {
  query: string;
  isViewingFavorites: boolean;
}

/**
 * Dynamic heading for movie list routes and favorites
 */
const AppHeading = ({ query, isViewingFavorites }: AppHeadingProps) => (
  <h2 className='m-auto mt-2 mb-6 max-w-xs text-lg font-bold text-cyan-700 tl:max-w-none'>
    {isViewingFavorites ? (
      <span className='capitalize'>{FAVORITES}</span>
    ) : (
      <span>
        Movie List<span className='capitalize tl:hidden'> for "{query}"</span>
      </span>
    )}
  </h2>
);

interface MoviesListProps {
  movies: (Movie | MovieDetails)[];
  handleOpenCard: (e: SyntheticEvent) => void;
}

/**
 * Displays movie list, or if on '/favorites' and none are saved then show message
 */
const MoviesList = ({ movies, handleOpenCard }: MoviesListProps) =>
  movies.length ? (
    <ul
      className='grid grid-cols-1 place-items-center gap-8 tl:grid-cols-2 lg:grid-cols-3'
      data-cy='movie-list'
    >
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
