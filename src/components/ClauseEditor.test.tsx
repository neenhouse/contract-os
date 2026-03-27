import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClauseEditor from './ClauseEditor';
import { templates } from '../lib/data';

const ndaTemplate = templates[0];

describe('ClauseEditor', () => {
  it('renders all clauses from the template', () => {
    render(<ClauseEditor template={ndaTemplate} onBack={() => {}} />);
    const clauseList = screen.getByTestId('clause-list');
    expect(clauseList.children.length).toBe(ndaTemplate.clauses.length);
  });

  it('highlights template variables in accent color', () => {
    render(<ClauseEditor template={ndaTemplate} onBack={() => {}} />);
    const variables = screen.getAllByTestId('clause-variable');
    expect(variables.length).toBeGreaterThan(0);
    expect(variables[0].textContent).toMatch(/\{\{.+\}\}/);
  });

  it('adds a new clause when Add Clause is clicked', async () => {
    const user = userEvent.setup();
    render(<ClauseEditor template={ndaTemplate} onBack={() => {}} />);

    const initialCount = screen.getByTestId('clause-list').children.length;
    await user.click(screen.getByText('+ Add Clause'));
    expect(screen.getByTestId('clause-list').children.length).toBe(initialCount + 1);
  });

  it('calls onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(<ClauseEditor template={ndaTemplate} onBack={onBack} />);

    await user.click(screen.getByText(/Back to Templates/));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
