import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { NAV_ITEMS } from '../../state/types';
import Navigation from './Navigation';

describe('Navigation', () => {
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    ).container;
    expect(screen.getByRole('navigation')).toBeVisible();
  });

  it('should contain all routes', () => {
    container = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    ).container;
    expect(screen.queryAllByRole('link')).toHaveLength(NAV_ITEMS.length);
  });
});
