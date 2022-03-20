import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Movie } from '../../state/movies/moviesReducer';
import GlobalStore from '../GlobalStore/GlobalStore';
import MoviesList from './MoviesList';

describe('MoviesList', () => {
  const movie = {
    Title: 'Movie title',
    Year: '1970',
    imdbID: 'imdbID',
    Type: 'movie',
    Poster: 'Movie poster',
  } as Movie;
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render a movie list when given a list with length > 1', () => {
    container = render(
      <GlobalStore>
        <MoviesList
          query={'super'}
          movies={[movie]}
          handleOpenCard={e => undefined}
        />
      </GlobalStore>
    ).container;

    expect(screen.getByRole('feed')).toBeVisible();
  });

  it('should render a paragraph when given a list with no length', () => {
    container = render(
      <GlobalStore>
        <MoviesList
          query={'super'}
          movies={[]}
          handleOpenCard={e => undefined}
        />
      </GlobalStore>
    ).container;

    expect(screen.queryByRole('feed')).toBeNull();
    expect(screen.getByText(/pick some favorites/i)).toBeVisible();
  });

  it('should open a modal when a card is clicked', () => {
    const handleOpenCard = jest.fn();
    container = render(
      <GlobalStore>
        <MoviesList
          query={'super'}
          movies={[movie]}
          handleOpenCard={handleOpenCard}
        />
      </GlobalStore>
    ).container;

    screen.getByText(movie.Title).click();
    expect(handleOpenCard).toHaveBeenCalled();
  });
});
