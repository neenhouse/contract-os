import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TemplateLibrary from './TemplateLibrary';

describe('TemplateLibrary', () => {
  it('renders all 6 templates', () => {
    render(<TemplateLibrary onSelectTemplate={() => {}} />);
    expect(screen.getByTestId('template-grid').children.length).toBe(6);
  });

  it('filters templates by search input', async () => {
    const user = userEvent.setup();
    render(<TemplateLibrary onSelectTemplate={() => {}} />);

    await user.type(screen.getByPlaceholderText('Search templates...'), 'Non-Disclosure');
    const grid = screen.getByTestId('template-grid');
    expect(grid.children.length).toBe(1);
    expect(screen.getByText('Non-Disclosure Agreement')).toBeInTheDocument();
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    render(<TemplateLibrary onSelectTemplate={() => {}} />);

    // Click the category button (inside .template-library__categories)
    const categoryButtons = document.querySelectorAll('.template-library__category-btn');
    const servicesBtn = Array.from(categoryButtons).find(el => el.textContent === 'Services');
    expect(servicesBtn).toBeTruthy();
    await user.click(servicesBtn!);
    const grid = screen.getByTestId('template-grid');
    // Freelance Agreement + Consulting Agreement
    expect(grid.children.length).toBe(2);
  });

  it('calls onSelectTemplate when Use Template is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TemplateLibrary onSelectTemplate={onSelect} />);

    const buttons = screen.getAllByText('Use Template');
    await user.click(buttons[0]);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'nda', title: 'Non-Disclosure Agreement' })
    );
  });
});
