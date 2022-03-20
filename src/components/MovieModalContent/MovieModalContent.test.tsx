import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { MovieDetails } from '../../state/movies/moviesReducer';
import { BUTTON_STYLE } from '../../utils/constants';
import MovieModalContent from './MovieModalContent';

describe('MovieModalContent', () => {
  const movie = {
    Title: 'title',
    Year: '1970',
    imdbID: 'imdbID',
    Type: 'movie',
    Poster: 'poster',
    hasDetails: true,
    isFavorite: false,
    query: 'super',
    Rated: 'rated',
    Released: 'released',
    Runtime: 'runtime',
    Genre: 'genre',
    Director: 'director',
    Writer: 'writer',
    Actors: 'actors',
    Plot: 'plot',
    Language: 'language',
    Country: 'country',
  } as MovieDetails;
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render a spinner modal when movie is undefined', () => {
    container = render(
      <BrowserRouter>
        <MovieModalContent movie={undefined} closeModal={() => undefined} />
      </BrowserRouter>
    ).container;

    expect(screen.getByTestId('modal-spinner')).toBeVisible();
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Close');
    expect(button).toHaveClass('mt-auto', ...BUTTON_STYLE.split(' '));
  });

  it('should close spinner modal when close button is clicked', () => {
    const closeModal = jest.fn();

    container = render(
      <BrowserRouter>
        <MovieModalContent movie={undefined} closeModal={closeModal} />
      </BrowserRouter>
    ).container;

    screen.getByRole('button').click();

    expect(closeModal).toHaveBeenCalled();
  });

  it('should render movie modal when movie is defined', () => {
    container = render(
      <BrowserRouter>
        <MovieModalContent movie={movie} closeModal={() => undefined} />
      </BrowserRouter>
    ).container;

    expect(screen.queryByTestId('modal-spinner')).toBeNull();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      movie.Title
    );
    expect(screen.getByRole('img')).toBeVisible();
    expect(screen.queryAllByRole('button')).toHaveLength(2);
    ['Favorite', 'Close'].forEach(text => {
      expect(screen.getByText(text)).toHaveClass(
        'w-1/2',
        ...BUTTON_STYLE.split(' ')
      );
    });
  });

  it('should close movie modal when close button is clicked', () => {
    const closeModal = jest.fn();
    container = render(
      <BrowserRouter>
        <MovieModalContent movie={movie} closeModal={closeModal} />
      </BrowserRouter>
    ).container;

    screen.getByText('Close').click();
    expect(closeModal).toHaveBeenCalled();
  });
});
