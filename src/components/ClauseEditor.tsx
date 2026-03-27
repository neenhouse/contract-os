import { useState, useCallback } from 'react';
import type { Template, Clause } from '../lib/types';

interface ClauseEditorProps {
  template: Template;
  onBack: () => void;
}

export default function ClauseEditor({ template, onBack }: ClauseEditorProps) {
  const [clauses, setClauses] = useState<Clause[]>(() =>
    template.clauses.map(c => ({ ...c }))
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    new Set(template.clauses.map(c => c.id))
  );
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const toggleClause = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const updateClauseContent = useCallback((id: string, content: string) => {
    setClauses(prev => prev.map(c => c.id === id ? { ...c, content } : c));
  }, []);

  const updateClauseTitle = useCallback((id: string, title: string) => {
    setClauses(prev => prev.map(c => c.id === id ? { ...c, title } : c));
  }, []);

  const removeClause = useCallback((id: string) => {
    setClauses(prev => prev.filter(c => c.id !== id));
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const addClause = useCallback(() => {
    const newClause: Clause = {
      id: `clause-${Date.now()}`,
      title: 'New Clause',
      content: 'Enter clause content here...',
      order: clauses.length,
    };
    setClauses(prev => [...prev, newClause]);
    setExpandedIds(prev => new Set([...prev, newClause.id]));
  }, [clauses.length]);

  const moveClause = useCallback((fromIdx: number, toIdx: number) => {
    setClauses(prev => {
      const next = [...prev];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next.map((c, i) => ({ ...c, order: i }));
    });
  }, []);

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx !== null && draggedIdx !== idx) {
      moveClause(draggedIdx, idx);
      setDraggedIdx(idx);
    }
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(\{\{[^}]+\}\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        return (
          <span key={i} className="clause-variable" data-testid="clause-variable">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="clause-editor">
      <div className="clause-editor__header">
        <button className="clause-editor__back" onClick={onBack}>
          &larr; Back to Templates
        </button>
        <div className="clause-editor__title-row">
          <h2 className="serif">{template.title}</h2>
          <span className="clause-editor__clause-count">{clauses.length} clauses</span>
        </div>
        <p className="clause-editor__subtitle">{template.description}</p>
      </div>

      <div className="clause-editor__clauses" data-testid="clause-list">
        {clauses.map((clause, idx) => (
          <div
            key={clause.id}
            className={`clause-block ${draggedIdx === idx ? 'dragging' : ''}`}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={e => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            data-testid={`clause-${clause.id}`}
          >
            <div className="clause-block__header" onClick={() => toggleClause(clause.id)}>
              <div className="clause-block__drag-handle" title="Drag to reorder">
                <span>&#x2630;</span>
              </div>
              <span className="clause-block__number">{idx + 1}.</span>
              <input
                className="clause-block__title-input serif"
                value={clause.title}
                onChange={e => updateClauseTitle(clause.id, e.target.value)}
                onClick={e => e.stopPropagation()}
              />
              <div className="clause-block__actions">
                <button
                  className="clause-block__remove"
                  onClick={e => { e.stopPropagation(); removeClause(clause.id); }}
                  title="Remove clause"
                  aria-label={`Remove clause ${clause.title}`}
                >
                  &times;
                </button>
                <span className={`clause-block__chevron ${expandedIds.has(clause.id) ? 'expanded' : ''}`}>
                  &#x25B6;
                </span>
              </div>
            </div>
            {expandedIds.has(clause.id) && (
              <div className="clause-block__body">
                <div className="clause-block__preview serif">
                  {renderContent(clause.content)}
                </div>
                <textarea
                  className="clause-block__textarea"
                  value={clause.content}
                  onChange={e => updateClauseContent(clause.id, e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="clause-editor__add" onClick={addClause}>
        + Add Clause
      </button>
    </div>
  );
}
