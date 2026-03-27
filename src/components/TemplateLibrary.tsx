import { useState } from 'react';
import { templates } from '../lib/data';
import type { Template } from '../lib/types';

interface TemplateLibraryProps {
  onSelectTemplate: (template: Template) => void;
}

export default function TemplateLibrary({ onSelectTemplate }: TemplateLibraryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

  const filtered = templates.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="template-library">
      <div className="template-library__header">
        <div>
          <h2>Template Library</h2>
          <p className="template-library__subtitle">Choose a template to start drafting your contract</p>
        </div>
      </div>

      <div className="template-library__filters">
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="template-library__search"
          aria-label="Search templates"
        />
        <div className="template-library__categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`template-library__category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="template-library__grid" data-testid="template-grid">
        {filtered.map(template => (
          <div key={template.id} className="template-card" data-testid={`template-${template.id}`}>
            <div className="template-card__icon">
              {categoryIcon(template.category)}
            </div>
            <div className="template-card__body">
              <span className="template-card__category">{template.category}</span>
              <h3 className="template-card__title">{template.title}</h3>
              <p className="template-card__desc">{template.description}</p>
              <div className="template-card__meta">
                <span className="template-card__clause-count">
                  {template.clauses.length} clauses
                </span>
              </div>
            </div>
            <button
              className="template-card__action"
              onClick={() => onSelectTemplate(template)}
            >
              Use Template
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="template-library__empty">
            No templates match your search.
          </div>
        )}
      </div>
    </div>
  );
}

function categoryIcon(category: string): string {
  switch (category) {
    case 'Confidentiality': return '\u{1F512}';
    case 'Services': return '\u{1F4BC}';
    case 'Technology': return '\u{1F4BB}';
    case 'Employment': return '\u{1F465}';
    case 'Business Formation': return '\u{1F3DB}';
    default: return '\u{1F4C4}';
  }
}
