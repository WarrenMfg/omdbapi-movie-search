import { SyntheticEvent, useRef, useEffect } from 'react';

import { fetchMovies } from '../../api/api';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import { Movie, MovieDetails } from '../../state/movies/moviesReducer';
import { Query } from '../../state/types';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';

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
          dispatch(fetchMovies(query, movies.length / 10 + 1));

          // no more movies to fetch
        } else if (!hasMoreMoviesToFetch) {
          observer.unobserve(ref as Element);
        }
      };

      const observer = new IntersectionObserver(handleIntersect);
      observer.observe(ref as Element);

      return () => {
        observer.unobserve(ref as Element);
      };
    }
  }, [query, movies, hasMoreMoviesToFetch, dispatch]);

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

export default MoviesList;
