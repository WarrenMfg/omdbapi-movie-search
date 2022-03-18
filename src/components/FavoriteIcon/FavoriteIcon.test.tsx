import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import FavoriteIcon from './FavoriteIcon';

describe('FavoriteIcon', () => {
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(<FavoriteIcon isFavorite={true} />).container;
    expect(screen.getByRole('presentation')).toBeVisible();
  });

  it('should be filled when is favorite', () => {
    container = render(<FavoriteIcon isFavorite={true} />).container;
    expect(screen.getByRole('presentation')).toHaveClass('fill-current');
  });

  it('should not be filled when is not favorite', () => {
    container = render(<FavoriteIcon isFavorite={false} />).container;
    expect(screen.getByRole('presentation')).not.toHaveClass('fill-current');
  });
});
