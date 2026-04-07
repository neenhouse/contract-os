import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

function renderLanding() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
}

describe('LandingPage', () => {
  it('renders the brand name', () => {
    renderLanding();
    expect(screen.getAllByText('ContractOS').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the main heading', () => {
    renderLanding();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    renderLanding();
    expect(screen.getByText('Template Library')).toBeInTheDocument();
    expect(screen.getByText('Clause Builder')).toBeInTheDocument();
    expect(screen.getByText('E-Signature Flow')).toBeInTheDocument();
    expect(screen.getByText('Expiration Tracking')).toBeInTheDocument();
  });

  it('renders CTA links to /app', () => {
    renderLanding();
    const appLinks = screen.getAllByRole('link', { name: /get started|open app|start managing/i });
    expect(appLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders trust signals', () => {
    renderLanding();
    expect(screen.getByText(/bank-grade encryption/i)).toBeInTheDocument();
    // "Legally binding signatures" may appear in features + trust signals
    expect(screen.getAllByText(/legally binding signatures/i).length).toBeGreaterThanOrEqual(1);
  });
});
