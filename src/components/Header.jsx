import React, { useState } from 'react';
import { SERVICES } from '../data/companyInfo';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

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
      <button className="logo" onClick={() => handleNavClick(0)} aria-label="Lemuel Home">
        LEMUEL
        <span className="logo__sub">TECHNICAL SERVICES INC</span>
      </button>

      {/* Desktop Navigation */}
      <nav className="nav" aria-label="Main Navigation">
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
                  {item.label} <ChevronDown size={13} className="caret" />
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

      {/* Header Actions */}
      <div className="header-actions">
        <button
          className="cta cta--header desktop-only-cta"
          onClick={() => handleNavClick(7)}
        >
          <span>Start a Project</span>
          <ArrowRight size={13} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
        </button>

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation Menu">
          <div className="mobile-drawer__links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className="mobile-drawer__btn"
                onClick={() => handleNavClick(item.page)}
              >
                <span>{item.label}</span>
                <span className="mobile-drawer__num">0{item.page + 1}</span>
              </button>
            ))}
            <button
              className="cta cta--big"
              style={{
                marginTop: '16px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onClick={() => handleNavClick(7)}
            >
              <span>Start a Project</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
