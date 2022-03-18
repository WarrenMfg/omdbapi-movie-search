import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render children', () => {
    render(
      <ErrorBoundary>
        <p>Hello</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('Hello')).toBeVisible();
  });

  it('should render a fallback UI when an error is thrown', () => {
    // suppress jsdom error logging
    const preventDefault = (e: ErrorEvent) => e.preventDefault();
    window.addEventListener('error', preventDefault);

    const ThrowError = () => {
      throw new Error();
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error')).toBeVisible();

    window.removeEventListener('error', preventDefault);
  });
});
