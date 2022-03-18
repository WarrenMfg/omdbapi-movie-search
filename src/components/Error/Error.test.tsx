import { render, screen } from '@testing-library/react';
import { BUTTON_STYLE } from '../../utils/constants';
import Error from './Error';

const errorMessage = 'Error message';

describe('Error', () => {
  it('should render', () => {
    render(<Error {...{ errorMessage }} />);
    expect(screen.getByRole('alert')).toBeVisible();
  });

  it('should have a style button', () => {
    render(<Error {...{ errorMessage }} />);
    expect(screen.getByRole('button')).toHaveClass(...BUTTON_STYLE.split(' '));
  });

  it('should reload on button click', () => {
    // Make all properties in T optional
    delete (window as Partial<Window>).location;
    window.location = { ...window.location, reload: jest.fn() };

    render(<Error {...{ errorMessage }} />);
    screen.getByRole('button').click();

    expect(window.location.reload).toHaveBeenCalled();
  });
});
