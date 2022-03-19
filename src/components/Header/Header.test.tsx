import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Header from './Header';

describe('Header', () => {
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(
      <BrowserRouter>
        <Header handleOnClick={() => undefined} isMobileNavOpen={false} />
        <Navigation id='mobile-nav' />
      </BrowserRouter>
    ).container;

    expect(screen.getByRole('heading')).toBeVisible();
  });

  it('should handle button clicks', () => {
    const handleOnClick = jest.fn();
    container = render(
      <BrowserRouter>
        <Header handleOnClick={handleOnClick} isMobileNavOpen={false} />
        <Navigation id='mobile-nav' />
      </BrowserRouter>
    ).container;

    const button = screen.getByRole('button');
    button.click();
    expect(handleOnClick).toHaveBeenCalled();
  });

  it('should have aria attributes based on closed nav', () => {
    container = render(
      <BrowserRouter>
        <Header handleOnClick={() => undefined} isMobileNavOpen={false} />
        <Navigation id='mobile-nav' />
      </BrowserRouter>
    ).container;

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/open/i)
    );
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('should have aria attributes based on open nav', () => {
    container = render(
      <BrowserRouter>
        <Header handleOnClick={() => undefined} isMobileNavOpen={true} />
        <Navigation id='mobile-nav' />
      </BrowserRouter>
    ).container;

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/close/i)
    );
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
