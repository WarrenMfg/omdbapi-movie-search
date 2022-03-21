import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { useEffect } from 'react';
import { rest } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import GlobalStore from '../components/GlobalStore/GlobalStore';
import useDispatch from '../hooks/useDispatch';
import useSelector from '../hooks/useSelector';
import { fetchMovieDetails, fetchMovies } from './api';
import {
  Movie,
  MovieDetails,
  moviesInitialState,
} from '../state/movies/moviesReducer';

let server: SetupServerApi;

/**
 * Helper function to setup server
 */
const intercept = (status: number, json: any) => {
  server = setupServer(
    rest.get('http://www.omdbapi.com/', (req, res, ctx) => {
      return res(ctx.status(status), ctx.json(json));
    })
  );
  server.listen({ onUnhandledRequest: 'error' });
};

/**
 * Helper component to fetchMovies
 */
const FetchMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.super?.results);
  const error = useSelector(state => state.error.message);
  useEffect(() => {
    dispatch(fetchMovies('super'));
  }, [dispatch]);

  return movies ? (
    <div role='feed'>
      {movies.map((movie, i) => (
        <article key={i}>{movie.Title}</article>
      ))}
    </div>
  ) : error ? (
    <h1>{error}</h1>
  ) : null;
};

/**
 * Helper component to fetchMovieDetails
 */
const FetchMovieDetails = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.super?.results);
  const error = useSelector(state => state.error.message);

  useEffect(() => {
    dispatch(fetchMovieDetails('super', 'movie 1'));
  }, [dispatch]);

  return movies?.[0].hasDetails ? (
    <article>{(movies[0] as MovieDetails).Runtime}</article>
  ) : error ? (
    <h1>{error}</h1>
  ) : null;
};

describe('api', () => {
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
    server.resetHandlers();
  });

  afterAll(() => server.close());

  describe('FetchMovies', () => {
    it('should fetchMovies', async () => {
      intercept(200, {
        Search: [{ Title: 'movie 1' }, { Title: 'movie 2' }],
        totalResults: '2',
        Response: 'True',
      });

      container = render(
        <GlobalStore>
          <FetchMovies />
        </GlobalStore>
      ).container;

      await waitFor(() =>
        expect(screen.getAllByRole('article').length).toBeGreaterThan(0)
      );
    });

    it('should handle fetchMovies !res.ok', async () => {
      intercept(500, {});

      container = render(
        <GlobalStore>
          <FetchMovies />
        </GlobalStore>
      ).container;

      await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    });

    it('should handle fetchMovies data.Response !== "True" errors', async () => {
      intercept(200, { Response: 'False', Error: 'Movie not found!' });

      container = render(
        <GlobalStore>
          <FetchMovies />
        </GlobalStore>
      ).container;

      await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    });
  });

  describe('FetchMovieDetails', () => {
    it('should fetchMovieDetails', async () => {
      // seed initial state
      moviesInitialState.super = {
        results: [
          { Title: 'movie 1', imdbID: 'movie 1' } as Movie,
          { Title: 'movie 2', imdbID: 'movie 2' } as Movie,
        ],
      };

      // movie details for 'movie 1'
      intercept(200, {
        Runtime: '120',
        Response: 'True',
      });

      container = render(
        <GlobalStore>
          <FetchMovieDetails />
        </GlobalStore>
      ).container;

      await waitFor(() =>
        expect(screen.getAllByRole('article').length).toEqual(1)
      );
    });

    it('should handle fetchMovieDetails !res.ok', async () => {
      intercept(500, {});

      container = render(
        <GlobalStore>
          <FetchMovieDetails />
        </GlobalStore>
      ).container;

      await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    });

    it('should handle fetchMovieDetails data.Response !== "True" errors', async () => {
      intercept(200, { Response: 'False', Error: 'Movie not found!' });

      container = render(
        <GlobalStore>
          <FetchMovieDetails />
        </GlobalStore>
      ).container;

      await waitFor(() => expect(screen.getByRole('heading')).toBeVisible());
    });
  });
});
