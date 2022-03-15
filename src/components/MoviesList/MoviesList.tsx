import { SyntheticEvent, useRef, useEffect, useState } from 'react';

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
  const [isFetching, setIsFetching] = useState(false);
  // Intentionally, this will be `false` for '/favorites' because it doesn't have `totalResults`
  const hasMoreMoviesToFetch = totalResults && totalResults > movies.length;

  // Reset toggle when fetching is complete
  useEffect(() => {
    setIsFetching(false);
  }, [movies.length]);

  useEffect(() => {
    if (hasMoreMoviesToFetch) {
      const ref = spinnerContainerRef.current as Element;

      // IntersectionObserver callback
      const handleIntersection = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        // Fetch more movies
        if (entries[0].isIntersecting && hasMoreMoviesToFetch && !isFetching) {
          setIsFetching(true);
          dispatch(fetchMovies(query, movies.length / 10 + 1, true));

          // No more movies to fetch
        } else if (!hasMoreMoviesToFetch) {
          observer.unobserve(ref);
        }
      };

      const observer = new IntersectionObserver(handleIntersection);
      observer.observe(ref);

      return () => {
        observer.unobserve(ref);
      };
    }
  }, [query, movies, hasMoreMoviesToFetch, dispatch, isFetching]);

  return movies.length ? (
    <>
      <section
        className='grid grid-cols-1 place-items-center gap-8 tl:grid-cols-2 lg:grid-cols-3'
        data-cy='movie-list'
        role='feed'
        aria-busy={isFetching}
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
      </section>
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
