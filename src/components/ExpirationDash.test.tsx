import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpirationDash from './ExpirationDash';

describe('ExpirationDash', () => {
  it('renders the contracts table with 15 rows', () => {
    render(<ExpirationDash />);
    const table = screen.getByTestId('expiration-table');
    const rows = table.querySelectorAll('tbody tr');
    expect(rows.length).toBe(15);
  });

  it('filters by status when a stat card is clicked', async () => {
    const user = userEvent.setup();
    render(<ExpirationDash />);

    // Click the stat card for Draft (inside .stat-card__label)
    const statLabels = document.querySelectorAll('.stat-card__label');
    const draftLabel = Array.from(statLabels).find(el => el.textContent === 'Draft');
    expect(draftLabel).toBeTruthy();
    await user.click(draftLabel!.closest('button')!);

    const table = screen.getByTestId('expiration-table');
    const rows = table.querySelectorAll('tbody tr');
    // 2 draft contracts in mock data
    expect(rows.length).toBe(2);
  });

  it('displays color-coded status badges', () => {
    render(<ExpirationDash />);
    const badges = document.querySelectorAll('.status-badge--expiring-soon');
    expect(badges.length).toBeGreaterThan(0);
    expect(badges[0].textContent).toBe('Expiring Soon');
  });
});
