import { Link } from 'react-router-dom';

const features = [
  {
    icon: '\u{1F4DA}',
    title: 'Template Library',
    desc: 'Start from six professionally drafted contract templates. NDA, freelance, SaaS, employment, consulting, and partnership agreements ready to customize.',
  },
  {
    icon: '\u{270F}\u{FE0F}',
    title: 'Clause Builder',
    desc: 'Assemble contracts from reusable clauses. Drag to reorder, edit inline, and fill smart placeholders that highlight automatically.',
  },
  {
    icon: '\u{270D}\u{FE0F}',
    title: 'E-Signature Flow',
    desc: 'Add signers, track status in real time, and capture legally binding signatures with our built-in signature pad.',
  },
  {
    icon: '\u{1F4C5}',
    title: 'Expiration Tracking',
    desc: 'Never miss a renewal. Color-coded dashboard shows every contract\'s status, expiration date, and days remaining at a glance.',
  },
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
      <section className="landing__hero">
        <div className="landing__hero-inner">
          <div className="landing__hero-badge">Contract Lifecycle Management</div>
          <h1 className="landing__headline">
            Manage contracts<br />
            <span className="serif">from draft to signature</span>
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
        </div>
      </section>

      {/* Features */}
      <section className="landing__features" id="features">
        <div className="landing__features-inner">
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
