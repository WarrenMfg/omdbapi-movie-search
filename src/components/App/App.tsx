import { SyntheticEvent, useEffect } from 'react';

import { fetchMovieDetails, fetchMovies } from '../../api/api';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import Card from '../Card/Card';
import Error from '../Error/Error';
import { FAVORITES } from '../Routes/Routes';
import Spinner from '../Spinner/Spinner';

import './App.module.css';

interface AppProps {
  query: string;
}

const App = ({ query }: AppProps) => {
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
    const movie = movies.find(movie => movie.imdbID === id);
    if (!movie || movie.hasDetails) return;
    dispatch(fetchMovieDetails(query, id));
  };

  if (errorMessage) return <Error errorMessage={errorMessage} />;
  if (!movies && !isFavorites) return <Spinner />;
  return (
    <>
      <AppHeading {...{ query, isFavorites }} />
      <ul className='grid grid-cols-1 place-items-center gap-8 tl:grid-cols-2 lg:grid-cols-3'>
        {movies.map((movie, i) => (
          <Card
            key={`${i}-${movie.Title}`}
            handleOpenCard={handleOpenCard}
            title={movie.Title}
            year={movie.Year}
            image={movie.Poster}
            imdbID={movie.imdbID}
          />
        ))}
      </ul>
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
      'Favorites'
    ) : (
      <span>
        Movie List<span className='capitalize tl:hidden'>: "{query}"</span>
      </span>
    )}
  </h2>
);

export default App;
