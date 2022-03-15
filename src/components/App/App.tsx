import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { fetchMovieDetails, fetchMovies } from '../../api/api';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import { MovieDetails } from '../../state/movies/moviesReducer';
import { Query } from '../../state/types';
import { FAVORITES } from '../../utils/constants';
import Error from '../Error/Error';
import Heading from '../Heading/Heading';
import Modal from '../Modal/Modal';
import MovieModalContent from '../MovieModalContent/MovieModalContent';
import MoviesList from '../MoviesList/MoviesList';
import Spinner from '../Spinner/Spinner';

interface AppProps {
  query: Query;
}

/**
 * Main shell component to render all routes
 */
const App = ({ query }: AppProps) => {
  // Movies array index for modal
  const [moviesIdxForModal, setMoviesIdxForModal] = useState(-1);
  // Keep track of active card so we can focus on it later
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
    const movie = movies?.find(movie => movie.imdbID === imdbID);
    if (!movie) return;

    if (!movie.hasDetails) {
      dispatch(fetchMovieDetails(query, imdbID));
    }

    // Keep track of active card so we can focus on close
    cardRef.current = button;
    setMoviesIdxForModal(+idx);
  };

  const handleCloseModal = () => setMoviesIdxForModal(-1);

  if (errorMessage) return <Error errorMessage={errorMessage} />;
  if (!movies && !isViewingFavorites) return <Spinner />;
  return (
    <>
      <Heading {...{ query, isViewingFavorites }} />
      <MoviesList {...{ query, handleOpenCard }} movies={movies || []} />
      <Modal isOpen={moviesIdxForModal > -1} closeModal={handleCloseModal}>
        <MovieModalContent
          movie={movies && (movies[moviesIdxForModal] as MovieDetails)}
          closeModal={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default App;
