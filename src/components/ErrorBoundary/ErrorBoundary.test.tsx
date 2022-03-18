import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render children', () => {
    container = render(
      <ErrorBoundary>
        <p>Hello</p>
      </ErrorBoundary>
    ).container;
    expect(screen.getByText('Hello')).toBeVisible();
  });

  it('should render a fallback UI when an error is thrown', () => {
    // suppress jsdom error logging
    const preventDefault = (e: ErrorEvent) => e.preventDefault();
    window.addEventListener('error', preventDefault);

    const ThrowError = () => {
      throw new Error();
    };

    container = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    ).container;

    expect(screen.getByRole('alert')).toBeVisible();

    window.removeEventListener('error', preventDefault);
  });
});
