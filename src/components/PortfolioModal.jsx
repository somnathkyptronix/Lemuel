import React, { useEffect } from 'react';

export default function PortfolioModal({ project, isOpen, onClose, onInquire }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="portfolio-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      <div className="portfolio-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="portfolio-modal-close"
          onClick={onClose}
          aria-label="Close portfolio details"
        >
          ✕
        </button>

        <div className="portfolio-modal-grid">
          {/* Card Preview Visual */}
          <div className="portfolio-modal-visual" style={{ borderColor: project.color }}>
            <div
              className="portfolio-modal-image"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="portfolio-card-badge">
              <span>CARD {project.cardNum || '01'}</span>
            </div>
            <div className="portfolio-modal-overlay-glow" style={{ background: project.color }} />
          </div>

          {/* Card Content & Specifications */}
          <div className="portfolio-modal-details">
            <div className="portfolio-modal-kicker">
              <span>{project.category}</span>
              <span className="dot-divider">•</span>
              <span>{project.scope}</span>
            </div>

            <h2 id="portfolio-modal-title" className="portfolio-modal-title">
              {project.title}
            </h2>

            <p className="portfolio-modal-desc">{project.description}</p>

            {/* Architecture Highlights */}
            {project.highlights && (
              <div className="portfolio-modal-section">
                <h4>Architecture &amp; Capabilities</h4>
                <ul className="portfolio-highlights-list">
                  {project.highlights.map((item, idx) => (
                    <li key={idx}>
                      <span className="check-bullet">▹</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {project.tech && (
              <div className="portfolio-modal-section">
                <h4>Technologies &amp; Frameworks</h4>
                <div className="portfolio-modal-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="portfolio-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="portfolio-modal-placeholder-note">
              <span>ℹ Structured Portfolio Framework — Customizable for production deployment</span>
            </div>

            {/* Modal Actions */}
            <div className="portfolio-modal-actions">
              <button
                className="cta cta--modal-primary"
                onClick={() => {
                  onClose();
                  if (onInquire) onInquire();
                }}
              >
                Inquire About This Solution →
              </button>
              <button className="cta cta--secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
