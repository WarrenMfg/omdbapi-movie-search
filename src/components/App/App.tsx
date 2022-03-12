import { SyntheticEvent, useEffect } from 'react';

import { fetchMovieDetails, fetchMovies } from '../../api/api';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import Card from '../Card/Card';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';

import './App.module.css';

interface AppProps {
  query: string;
}

function App({ query }: AppProps) {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.error.message);
  const movies = useSelector(state => state.movies[query]?.results);

  useEffect(() => {
    if (!movies) {
      dispatch(fetchMovies(query));
    }
  }, [query, dispatch, movies]);

  const handleOpenCard = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const id = target.closest('button')?.id;
    if (!id) return;
    const movie = movies.find(movie => movie.imdbID === id);
    if (!movie || movie.hasDetails) return;
    dispatch(fetchMovieDetails(query, id));
  };

  if (errorMessage) return <Error errorMessage={errorMessage} />;
  if (!movies) return <Spinner />;
  return (
    <>
      <h2 className='m-auto mt-2 mb-6 max-w-xs text-lg font-bold text-cyan-700 tl:max-w-none'>
        Movie List<span className='capitalize tl:hidden'>: "{query}"</span>
      </h2>
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
}

export default App;
