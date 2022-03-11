import { useEffect } from 'react';

import { fetchMovies } from '../../api/api';
import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import Error from '../Error/Error';

import './App.module.css';

interface AppProps {
  query: string;
}

function App({ query }: AppProps) {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.error.message);
  const movies = useSelector(state => state.movies[query]?.Search);

  useEffect(() => {
    dispatch(fetchMovies(query));
  }, [query, dispatch]);

  if (errorMessage) return <Error errorMessage={errorMessage} />;
  if (!movies) return <p>'Loading...'</p>;
  return (
    <>
      <h2>Movie List: {query}</h2>
      <section>
        {movies.map(movie => (
          <p key={movie.Title}>{movie.Title}</p>
        ))}
      </section>
    </>
  );
}

export default App;
