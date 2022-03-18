import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  const hello = /hello/i;

  it('should render', () => {
    render(<Button>Hello</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(hello);
  });

  it('should accept an aria-label, id, and classes', () => {
    const ariaLabel = 'aria label';
    const id = 'id';
    const className = 'className';
    render(
      <Button ariaLabel={ariaLabel} id={id} className={className}>
        Hello
      </Button>
    );
    const el = screen.getByText(hello);
    expect(el).toHaveAttribute('aria-label', ariaLabel);
    expect(el).toHaveAttribute('id', id);
    expect(el).toHaveAttribute('class', className);
  });

  it('should handle clicks', () => {
    const handleOnClick = jest.fn();
    render(<Button handleOnClick={handleOnClick}>Hello</Button>);
    screen.getByRole('button').click();
    expect(handleOnClick).toHaveBeenCalled();
  });
});
