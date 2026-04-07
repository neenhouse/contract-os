import { Link } from 'react-router-dom';

export default function NotFoundPage() {
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
      }}
    >
      <p
        style={{
          fontSize: '72px',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'var(--accent)',
          lineHeight: 1,
        }}
      >
        404
      </p>
      <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
        Page not found
      </p>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '360px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn--primary btn--sm" style={{ marginTop: '8px' }}>
        Back to Home
      </Link>
    </div>
  );
}
