import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100dvh',
            gap: '16px',
            padding: '32px',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}
        >
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Something went wrong
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px' }}>
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn--primary btn--sm"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
