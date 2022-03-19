import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FAVORITES } from '../../utils/constants';
import Heading from './Heading';

describe('Heading', () => {
  const query = 'super';
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(
      <Heading query={query} isViewingFavorites={false} />
    ).container;
    expect(screen.getByRole('heading')).toBeVisible();
  });

  it('should display the query when not viewing favorites', () => {
    container = render(
      <Heading query={query} isViewingFavorites={false} />
    ).container;
    expect(screen.getByRole('heading')).toHaveTextContent(query);
  });

  it('should not display the query when viewing favorites', () => {
    container = render(
      <Heading query={query} isViewingFavorites={true} />
    ).container;
    const heading = screen.getByRole('heading');
    expect(heading).not.toHaveTextContent(query);
    expect(heading).toHaveTextContent(FAVORITES);
  });
});
