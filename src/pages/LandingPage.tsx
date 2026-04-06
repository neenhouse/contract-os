import { Link } from 'react-router-dom';

const features = [
  {
    icon: '\u{1F4DC}',
    title: 'Template Library',
    desc: 'Start from professionally drafted contract templates. NDA, freelance, SaaS, employment, consulting, and partnership agreements ready to customize.',
  },
  {
    icon: '\u{270F}\u{FE0F}',
    title: 'Clause Builder',
    desc: 'Assemble contracts from reusable clauses. Drag to reorder, edit inline, and fill smart placeholders that highlight automatically.',
  },
  {
    icon: '\u{1F58A}\u{FE0F}',
    title: 'E-Signature Flow',
    desc: 'Add signers, track status in real time, and capture legally binding signatures with our built-in signature pad.',
  },
  {
    icon: '\u{1F6E1}\u{FE0F}',
    title: 'Expiration Tracking',
    desc: 'Never miss a renewal. Color-coded dashboard shows every contract\'s status, expiration date, and days remaining at a glance.',
  },
];

const trustSignals = [
  { icon: '\u{1F512}', text: 'Bank-grade encryption' },
  { icon: '\u{1F6E1}\u{FE0F}', text: 'SOC 2 compliant' },
  { icon: '\u{2705}', text: 'Legally binding signatures' },
];

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing__nav">
        <div className="landing__nav-inner">
          <span className="landing__logo serif">ContractOS</span>
          <div className="landing__nav-links">
            <a href="#features">Features</a>
            <Link to="/app" className="btn btn--primary btn--sm">Open App</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="main-content" className="landing__hero landing__hero--split">
        <div className="landing__hero-inner">
          <div className="landing__hero-badge">Contract Lifecycle Management</div>
          <h1 className="landing__headline">
            Contracts,<br />
            <span className="serif">simplified</span>
          </h1>
          <p className="landing__subheadline">
            Template library, clause builder, e-signature flow, expiration tracking, and full audit trail &mdash; all in one platform.
          </p>
          <div className="landing__ctas">
            <Link to="/app" className="btn btn--primary btn--lg">
              Get Started Free
            </Link>
            <a href="#features" className="btn btn--ghost btn--lg">
              See Features
            </a>
          </div>
          <div className="landing__trust">
            {trustSignals.map((signal, i) => (
              <div key={i} className="landing__trust-item">
                <span className="landing__trust-icon">{signal.icon}</span>
                <span>{signal.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="landing__hero-image-panel">
          <img
            src="/hero-og.webp"
            alt="ContractOS platform preview"
            className="landing__hero-image"
            loading="eager"
          />
        </div>
      </section>

      {/* Features */}
      <section className="landing__features" id="features">
        <div className="landing__features-inner">
          <div className="landing__section-label">Features</div>
          <h2 className="landing__section-title">Everything you need to manage contracts</h2>
          <div className="landing__feature-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing__cta-section">
        <div className="landing__cta-inner">
          <h2>Ready to streamline your contract workflow?</h2>
          <p>Join thousands of teams managing contracts with confidence.</p>
          <Link to="/app" className="btn btn--primary btn--lg">
            Start Managing Contracts
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <span className="serif">ContractOS</span>
        <span className="landing__footer-copy">&copy; 2026 ContractOS. All rights reserved.</span>
      </footer>
    </div>
  );
}
