import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AppLayout from './AppLayout';

function renderLayout() {
  return render(
    <MemoryRouter>
      <AppLayout />
    </MemoryRouter>
  );
}

describe('AppLayout', () => {
  it('renders the brand logo', () => {
    renderLayout();
    expect(screen.getAllByText('ContractOS').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the sidebar nav', () => {
    renderLayout();
    expect(screen.getByTestId('sidebar-nav')).toBeInTheDocument();
  });

  it('renders all nav buttons', () => {
    renderLayout();
    expect(screen.getByRole('button', { name: /templates/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signatures/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /expiration/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /audit trail/i })).toBeInTheDocument();
  });

  it('renders Templates view by default', () => {
    renderLayout();
    // TemplateLibrary renders a template grid
    expect(screen.getByTestId('template-grid')).toBeInTheDocument();
  });

  it('switches to Signatures view on nav click', async () => {
    renderLayout();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /signatures/i }));
    // SignatureFlow renders a signer-list
    expect(screen.getByTestId('signer-list')).toBeInTheDocument();
  });

  it('switches to Expiration view on nav click', async () => {
    renderLayout();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /expiration/i }));
    // ExpirationDash renders an expiration-table
    expect(screen.getByTestId('expiration-table')).toBeInTheDocument();
  });

  it('switches to Audit Trail view on nav click', async () => {
    renderLayout();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /audit trail/i }));
    expect(screen.getByTestId('audit-timeline')).toBeInTheDocument();
  });

  it('renders the back to home link', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
  });
});
