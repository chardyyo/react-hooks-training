import React, { ReactNode, PureComponent } from "react";

export type ErrorBoundaryProps = { children: ReactNode };
export type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <div>Something went wrong.</div>;
    }

    return children;
  }
}

export default ErrorBoundary;
