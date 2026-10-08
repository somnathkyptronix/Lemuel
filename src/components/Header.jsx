import React, { useState } from 'react';
import { SERVICES } from '../data/companyInfo';

const NAV_ITEMS = [
  { label: 'Home', page: 0 },
  { label: 'About', page: 1 },
  {
    label: 'Services',
    page: 2,
    hasDropdown: true
  },
  { label: 'Solutions', page: 3 },
  { label: 'Industries', page: 4 },
  { label: 'Portfolio', page: 5 },
  { label: 'Insights', page: 6 },
  { label: 'Contact', page: 7 }
];

export default function Header({ onNavigate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    onNavigate(page);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <button className="logo" onClick={() => handleNavClick(0)}>
        LEMUEL
        <span className="logo__sub">TECHNICAL SERVICES INC</span>
      </button>

      {/* Desktop Navigation */}
      <nav className="nav">
        {NAV_ITEMS.map((item) => {
          if (item.hasDropdown) {
            return (
              <div
                key={item.label}
                className="nav-item-dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="nav-btn nav-btn--dropdown"
                  onClick={() => handleNavClick(item.page)}
                >
                  {item.label} <span className="caret">▾</span>
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        className="dropdown-item"
                        onClick={() => handleNavClick(2)}
                      >
                        <span className="dropdown-num">{s.num}</span>
                        <div className="dropdown-info">
                          <strong>{s.title}</strong>
                          <small>{s.tagline}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.label}
              className="nav-btn"
              onClick={() => handleNavClick(item.page)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Header Action Button */}
      <div className="header-actions">
        <button
          className="cta cta--header"
          onClick={() => handleNavClick(7)}
        >
          Start a Project →
        </button>

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer__links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className="mobile-drawer__btn"
                onClick={() => handleNavClick(item.page)}
              >
                {item.label}
              </button>
            ))}
            <button
              className="cta"
              style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}
              onClick={() => handleNavClick(7)}
            >
              Start a Project →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
