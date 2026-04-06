import { useState } from 'react';
import { Link } from 'react-router-dom';
import TemplateLibrary from '../components/TemplateLibrary';
import ClauseEditor from '../components/ClauseEditor';
import SignatureFlow from '../components/SignatureFlow';
import ExpirationDash from '../components/ExpirationDash';
import AuditTrail from '../components/AuditTrail';
import type { Template } from '../lib/types';

type View = 'templates' | 'editor' | 'signatures' | 'expiration' | 'audit';

const navItems: { key: View; label: string; icon: string }[] = [
  { key: 'templates', label: 'Templates', icon: '\u{1F4DC}' },
  { key: 'signatures', label: 'Signatures', icon: '\u{1F58A}\u{FE0F}' },
  { key: 'expiration', label: 'Expiration', icon: '\u{23F0}' },
  { key: 'audit', label: 'Audit Trail', icon: '\u{1F6E1}\u{FE0F}' },
];

export default function AppLayout() {
  const [view, setView] = useState<View>('templates');
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const handleSelectTemplate = (template: Template) => {
    setEditingTemplate(template);
    setView('editor');
  };

  const handleBackToTemplates = () => {
    setEditingTemplate(null);
    setView('templates');
  };

  const handleNavClick = (key: View) => {
    if (key === 'templates') {
      setEditingTemplate(null);
    }
    setView(key);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Link to="/" className="sidebar__logo serif">ContractOS</Link>
        <nav className="sidebar__nav" data-testid="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`sidebar__link ${view === item.key || (view === 'editor' && item.key === 'templates') ? 'active' : ''}`}
              onClick={() => handleNavClick(item.key)}
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar__footer">
          <Link to="/" className="sidebar__back">
            &larr; Back to Home
          </Link>
        </div>
      </aside>
      <main id="main-content" className="app-main">
        {view === 'templates' && <TemplateLibrary onSelectTemplate={handleSelectTemplate} />}
        {view === 'editor' && editingTemplate && (
          <ClauseEditor template={editingTemplate} onBack={handleBackToTemplates} />
        )}
        {view === 'signatures' && <SignatureFlow />}
        {view === 'expiration' && <ExpirationDash />}
        {view === 'audit' && <AuditTrail />}
      </main>
    </div>
  );
}
