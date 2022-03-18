import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BUTTON_STYLE } from '../../utils/constants';
import Error from './Error';

const errorMessage = 'Error message';

describe('Error', () => {
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(<Error {...{ errorMessage }} />).container;
    expect(screen.getByRole('alert')).toBeVisible();
  });

  it('should have a style button', () => {
    container = render(<Error {...{ errorMessage }} />).container;
    expect(screen.getByRole('button')).toHaveClass(...BUTTON_STYLE.split(' '));
  });

  it('should reload on button click', () => {
    // Make all properties in T optional
    delete (window as Partial<Window>).location;
    window.location = { ...window.location, reload: jest.fn() };

    container = render(<Error {...{ errorMessage }} />).container;
    screen.getByRole('button').click();

    expect(window.location.reload).toHaveBeenCalled();
  });
});
