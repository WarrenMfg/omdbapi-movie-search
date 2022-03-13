import { Component, ErrorInfo, ReactNode } from 'react';
import Error from '../Error/Error';

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * App error boundary
 */
class ErrorBoundary extends Component<ReactNode, ErrorBoundaryState> {
  constructor(props: ReactNode) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // POST error to logging service
  }

  render() {
    if (this.state.hasError) {
      return <Error errorMessage="Something's not right..." />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
