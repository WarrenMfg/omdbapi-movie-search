import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Button from './Button';

describe('Button', () => {
  const hello = /hello/i;
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(<Button>Hello</Button>).container;
    expect(screen.getByRole('button')).toHaveTextContent(hello);
  });

  it('should accept an aria-label, id, and classes', async () => {
    const ariaLabel = 'aria label';
    const id = 'id';
    const className = 'className';
    container = render(
      <Button ariaLabel={ariaLabel} id={id} className={className}>
        Hello
      </Button>
    ).container;
    const el = screen.getByText(hello);
    expect(el).toHaveAttribute('aria-label', ariaLabel);
    expect(el).toHaveAttribute('id', id);
    expect(el).toHaveAttribute('class', className);
  });

  it('should handle clicks', () => {
    const handleOnClick = jest.fn();
    container = render(
      <Button handleOnClick={handleOnClick}>Hello</Button>
    ).container;
    screen.getByRole('button').click();
    expect(handleOnClick).toHaveBeenCalled();
  });
});
