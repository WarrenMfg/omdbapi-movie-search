import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import HamburgerIcon from './HamburgerIcon';

describe('HamburgerIcon', () => {
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render in closed state', () => {
    container = render(<HamburgerIcon isMobileNavOpen={false} />).container;

    let hamburgerIcon = screen.getByTestId('hamburger-icon');

    expect(hamburgerIcon).toBeVisible();
    expect(
      within(hamburgerIcon).getByTestId('hamburger-icon-top')
    ).not.toHaveClass('rotate-45');
    expect(
      within(hamburgerIcon).getByTestId('hamburger-icon-middle')
    ).not.toHaveClass('opacity-0');
    expect(
      within(hamburgerIcon).getByTestId('hamburger-icon-bottom')
    ).not.toHaveClass('-rotate-45');
  });

  it('should render in open state', () => {
    container = render(<HamburgerIcon isMobileNavOpen={true} />).container;

    let hamburgerIcon = screen.getByTestId('hamburger-icon');

    expect(hamburgerIcon).toBeVisible();
    expect(within(hamburgerIcon).getByTestId('hamburger-icon-top')).toHaveClass(
      'rotate-45'
    );
    expect(
      within(hamburgerIcon).getByTestId('hamburger-icon-middle')
    ).toHaveClass('opacity-0');
    expect(
      within(hamburgerIcon).getByTestId('hamburger-icon-bottom')
    ).toHaveClass('-rotate-45');
  });
});
