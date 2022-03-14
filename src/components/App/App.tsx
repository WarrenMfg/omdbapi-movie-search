import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { fetchMovieDetails, fetchMovies } from '../../api/api';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import { Movie, MovieDetails } from '../../state/movies/moviesReducer';
import { Query } from '../../state/types';
import { FAVORITES } from '../../utils/constants';
import Card from '../Card/Card';
import Error from '../Error/Error';
import Modal from '../Modal/Modal';
import MovieModalContent from '../MovieModalContent/MovieModalContent';
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

    // Keep track of active card so we can focus on it later
    cardRef.current = button;
    setMoviesIdxForModal(+idx);
  };

  const handleCloseModal = () => setMoviesIdxForModal(-1);

  if (errorMessage) return <Error errorMessage={errorMessage} />;
  if (!movies && !isViewingFavorites) return <Spinner />;
  return (
    <>
      <AppHeading {...{ query, isViewingFavorites }} />
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

interface AppHeadingProps {
  query: Query;
  isViewingFavorites: boolean;
}

/**
 * Dynamic heading for movie list routes and favorites
 */
const AppHeading = ({ query, isViewingFavorites }: AppHeadingProps) => (
  <h2
    id='app-heading'
    className='m-auto mt-2 mb-6 max-w-xs text-lg font-bold text-cyan-700 tl:max-w-none'
  >
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
  query: Query;
  movies: (Movie | MovieDetails)[];
  handleOpenCard: (e: SyntheticEvent) => void;
}

/**
 * Displays movie list, or if on '/favorites' and none are saved then show message
 */
const MoviesList = ({ query, movies, handleOpenCard }: MoviesListProps) => {
  const totalResults = useSelector<number | undefined>(
    state => state.movies[query]?.totalResults
  );
  const dispatch = useDispatch();
  // Spinner for infinite scrolling
  const spinnerContainerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);
  const page = useRef(1);
  // This will be `false` for '/favorites' because it doesn't have `totalResults`
  const hasMoreMoviesToFetch = totalResults && totalResults > movies.length;

  useEffect(() => {
    if (hasMoreMoviesToFetch) {
      const ref = spinnerContainerRef.current;

      // IntersectionObserver callback
      const handleIntersect = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        // fetch more movies
        if (
          entries[0].isIntersecting &&
          hasMoreMoviesToFetch &&
          !isFetching.current
        ) {
          isFetching.current = true;
          dispatch(fetchMovies(query, ++page.current));

          // no more movies to fetch
        } else if (!hasMoreMoviesToFetch) {
          observer.unobserve(spinnerContainerRef.current as Element);
        }
      };

      const observer = new IntersectionObserver(handleIntersect);
      observer.observe(ref as Element);
      return () => {
        observer.unobserve(ref as Element);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset toggle when fetching is complete
  useEffect(() => {
    isFetching.current = false;
  }, [movies.length]);

  return movies.length ? (
    <>
      <ul
        className='grid grid-cols-1 place-items-center gap-8 tl:grid-cols-2 lg:grid-cols-3'
        data-cy='movie-list'
        role='feed'
        aria-busy={isFetching.current}
        aria-labelledby='app-heading'
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
            ariaSetSize={totalResults}
            ariaPosInSet={i + 1}
          />
        ))}
      </ul>
      {hasMoreMoviesToFetch && (
        <div ref={spinnerContainerRef} className='mt-4'>
          <Spinner />
        </div>
      )}
    </>
  ) : (
    <p className='text-center font-bold text-cyan-700'>
      Pick some favorites! 🎉
    </p>
  );
};

export default App;
