import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignatureFlow from './SignatureFlow';

describe('SignatureFlow', () => {
  it('renders initial signers', () => {
    render(<SignatureFlow />);
    expect(screen.getByText('John Reynolds')).toBeInTheDocument();
    expect(screen.getByText('Lisa Wong')).toBeInTheDocument();
  });

  it('adds a new signer', async () => {
    const user = userEvent.setup();
    render(<SignatureFlow />);

    await user.type(screen.getByPlaceholderText('Full name'), 'Alice Cooper');
    await user.type(screen.getByPlaceholderText('Email address'), 'alice@example.com');
    await user.click(screen.getByText('Add Signer'));

    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  it('shows correct status badges', () => {
    render(<SignatureFlow />);
    expect(screen.getByText('signed')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });
});
