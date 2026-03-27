import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuditTrail from './AuditTrail';

describe('AuditTrail', () => {
  it('renders all audit events', () => {
    render(<AuditTrail />);
    const timeline = screen.getByTestId('audit-timeline');
    // 11 events in mock data
    const events = timeline.querySelectorAll('[data-testid^="audit-event-"]');
    expect(events.length).toBe(11);
  });

  it('displays actor names for each event', () => {
    render(<AuditTrail />);
    expect(screen.getAllByText('Sarah Mitchell').length).toBeGreaterThan(0);
    expect(screen.getByText('David Park')).toBeInTheDocument();
  });

  it('groups events by date', () => {
    render(<AuditTrail />);
    const dateMarkers = screen.getByTestId('audit-timeline').querySelectorAll('.audit-trail__date-marker');
    expect(dateMarkers.length).toBeGreaterThanOrEqual(2);
  });
});
