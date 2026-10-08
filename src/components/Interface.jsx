import ServicesSpotlightSection from './ServicesSpotlightSection';
import ServicesTiltedHero from './ServicesTiltedHero';
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Marquee from './Marquee';
import CurvedLoop from './CurvedLoop';
import SpotlightCard from './SpotlightCard';
import ContactForm from './ContactForm';
import LegalModal from './LegalModal';
import {
  COMPANY,
  SERVICES,
  WHY_US,
  PROCESS_STEPS,
  INDUSTRIES,
  INDUSTRY_CATEGORIES,
  TECH_STACK,
  PORTFOLIO_PROJECTS,
  FAQS
} from '../data/companyInfo';

export default function Interface({ onNavigate, onSelectProject, scrollContainer }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' });
  const solutionsTrackRef = useRef(null);

  const scrollSolutionsLeft = () => {
    if (solutionsTrackRef.current) {
      solutionsTrackRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollSolutionsRight = () => {
    if (solutionsTrackRef.current) {
      solutionsTrackRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

  const openLegal = (type) => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <div className="interface">
      {/* ================================================== */}
      {/* 01 - HOME */}
      {/* ================================================== */}
      <section className="section section--center section--hero" data-num="01">
        <p className="tagline">01 — {COMPANY.heroEyebrow}</p>
        <h1 className="hero-title">
          Technology That Works<br />
          as Hard as <em>Your Business</em>.
        </h1>
        <p className="hero-sub">{COMPANY.heroDescription}</p>
        <div className="hero-buttons">
          <button className="cta" onClick={() => onNavigate(7)}>
            {COMPANY.primaryCTA}
          </button>
          <button className="cta cta--secondary" onClick={() => onNavigate(2)}>
            {COMPANY.secondaryCTA}
          </button>
        </div>
        <div className="scroll-hint">
          <span className="scroll-hint__line" />
          <span className="scroll-hint__label">scroll</span>
        </div>
      </section>

      {/* ================================================== */}
      {/* 02 - ABOUT */}
      {/* ================================================== */}
      <section className="section section--left" data-num="02">
        <p className="kicker">02 — About</p>
        <h2>
          Your Technology.<br />
          Our <em>Expertise</em>.
        </h2>
        <div className="body">
          <p>{COMPANY.about.descriptionParagraphs[0]}</p>
          <p style={{ marginTop: '14px' }}>{COMPANY.about.descriptionParagraphs[1]}</p>
        </div>
        <button className="cta" onClick={() => onNavigate(2)}>
          {COMPANY.about.cta}
        </button>
        <CurvedLoop
          marqueeText="TECHNOLOGY ✦ EXPERTISE ✦ RESULTS ✦ IT SOLUTIONS ✦ CLOUD ✦ SECURITY ✦ SOFTWARE ✦ AI ✦"
          speed={2}
          curveAmount={80}
          direction="left"
          interactive={true}
          className="curved-loop-text"
        />
      </section>

      {/* ================================================== */}
      {/* 03 - SERVICES (Full-page scroll stack) */}
      {/* ================================================== */}
      <section className="section section--services" data-num="03">
        <div className="section-header-wrap">
          <p className="kicker">03 — Services</p>
          <h2>
            Comprehensive <em>Services</em>.
          </h2>
          <p className="body">
            Explore our core technical offerings designed to maintain, protect, and modernize your technology environment.
          </p>
        </div>

        {/* 01 to 08 Horizontal Scrolling Spotlight Cards moving Right to Left */}
        <ServicesSpotlightSection onNavigate={onNavigate} />

        <p className="hint" style={{ marginTop: '24px' }}>✦ scroll horizontally or swipe right to left to explore all 8 services</p>
      </section>

      {/* ================================================== */}
      {/* 04 - SOLUTIONS */}
      {/* ================================================== */}
      <section className="section section--left section--why-us" data-num="04">
        <p className="kicker">04 — Solutions</p>
        <h2>
          Technology Expertise With a <em>Business Mindset</em>.
        </h2>
        <p className="body">{WHY_US.description}</p>

        {/* Mobile-Only Manual Arrow Navigation for Card Swipe */}
        <div className="solutions-mobile-controls">
          <div className="solutions-mobile-info">
            <span className="solutions-badge">01 — 05 SOLUTIONS</span>
            <span className="solutions-hint">Swipe cards or tap arrow</span>
          </div>

          <div className="solutions-arrows-group">
            <button
              type="button"
              className="solutions-nav-arrow"
              onClick={scrollSolutionsLeft}
              aria-label="Previous solution card"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="solutions-nav-arrow solutions-nav-arrow--primary"
              onClick={scrollSolutionsRight}
              aria-label="Next solution card (swipe left)"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={solutionsTrackRef} className="cards-grid cards-grid--slide-down">
          {WHY_US.items.map((item, idx) => (
            <SpotlightCard
              key={idx}
              className="feature-card"
              spotlightColor="rgba(34, 211, 238, 0.28)"
            >
              <span className="feature-card__index">0{idx + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 05 - INDUSTRIES & TECH STACK */}
      {/* ================================================== */}
      <section className="section section--left section--industries-tech" data-num="05">
        <p className="kicker">05 — Industries &amp; Technology</p>
        <h2>
          Built for <em>Industries</em>. Powered by <em>Modern Tech</em>.
        </h2>

        <div className="industries-tech-split">
          <div className="industries-col">
            <h3 className="sub-heading">Industries We Serve</h3>
            <div className="tech-stack-groups">
              {INDUSTRY_CATEGORIES.map((ind) => (
                <div key={ind.category} className="tech-group">
                  <strong>{ind.category}:</strong>
                  <span>{ind.items.join(' · ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-col">
            <h3 className="sub-heading">{TECH_STACK.heading}</h3>
            <div className="tech-stack-groups">
              {TECH_STACK.categories.map((cat) => (
                <div key={cat.category} className="tech-group">
                  <strong>{cat.category}:</strong>
                  <span>{cat.technologies.join(' · ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 06 - PORTFOLIO */}
      {/* ================================================== */}
      <section className="section section--top section--portfolio" data-num="06">
        <div className="portfolio-content-col">
          <p className="kicker">06 — Portfolio Placeholders</p>
          <h2>Selected Solutions.</h2>
          <p className="body" style={{ marginBottom: '16px' }}>
            Editable portfolio frameworks demonstrating our architecture and solution structures. Click any 3D card or item below to inspect.
          </p>

          <div className="portfolio-cardholder-hint">
            <span className="pulse-indicator" />
            <span>Interactive Card Holder · Click to inspect</span>
          </div>

          <ul className="projects projects--interactive">
            {PORTFOLIO_PROJECTS.map((proj, idx) => (
              <li
                key={proj.id || idx}
                onClick={() => onSelectProject && onSelectProject(proj)}
                title="Click to open card holder popup"
                className="project-item-interactive"
              >
                <div className="project-item-header">
                  <span className="project-card-num">CARD {proj.cardNum || `0${idx + 1}`}</span>
                  <em>{proj.title}</em>
                  <span className="project-action-icon">↗</span>
                </div>
                <p className="project-desc">{proj.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================================== */}
      {/* 07 - FAQ & INSIGHTS */}
      {/* ================================================== */}
      <section className="section section--center" data-num="07">
        <p className="kicker">07 — Insights &amp; FAQ</p>
        <h2>
          Frequently Asked <em>Questions</em>.
        </h2>

        <div className="faq-container">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${activeFaq === idx ? 'is-open' : ''}`}
              onClick={() => toggleFaq(idx)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-icon">{activeFaq === idx ? '−' : '+'}</span>
              </div>
              {activeFaq === idx && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 08 - CONTACT & FOOTER */}
      {/* ================================================== */}
      <section className="section section--center section--contact" data-num="08">
        <div className="contact-curved-loop-wrapper">
          <CurvedLoop
            marqueeText="LETS BUILD RELIABLE TECHNOLOGY ✦ START A PROJECT ✦"
            speed={2}
            curveAmount={-40}
            direction="right"
            interactive={true}
            className="curved-loop-text"
          />
        </div>

        <div className="contact-wrapper">
          <div className="contact-intro">
            <p className="kicker">08 — Contact</p>
            <h2>
              Let's Build the <em>Future</em> of Your Business.
            </h2>
            <p className="body">
              Ready to modernize your infrastructure, enhance security, or automate operations? Speak directly with our technical team.
            </p>

            <div className="contact-placeholders-card">
              <h4>Contact Channels</h4>
              <div className="contact-meta-item">
                <span className="contact-meta-label">Phone:</span>
                <code>{COMPANY.contactPlaceholders.phone}</code>
              </div>
              <div className="contact-meta-item">
                <span className="contact-meta-label">Email:</span>
                <code>{COMPANY.contactPlaceholders.email}</code>
              </div>
              <div className="contact-meta-item">
                <span className="contact-meta-label">Address:</span>
                <code>{COMPANY.contactPlaceholders.address}</code>
              </div>
              <div className="contact-meta-item">
                <span className="contact-meta-label">WhatsApp:</span>
                <code>{COMPANY.contactPlaceholders.whatsapp}</code>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        {/* Global Footer */}
        <footer className="footer-full">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>{COMPANY.name}</h3>
              <p className="footer-tagline">{COMPANY.tagline}</p>
              <p className="footer-desc">
                Helping businesses build reliable technology, solve technical challenges and embrace digital transformation.
              </p>
            </div>

            <div className="footer-columns">
              <div className="footer-col">
                <h4>Company</h4>
                <button onClick={() => onNavigate(1)}>About</button>
                <button onClick={() => onNavigate(2)}>Services</button>
                <button onClick={() => onNavigate(3)}>Solutions</button>
                <button onClick={() => onNavigate(4)}>Industries</button>
                <button onClick={() => onNavigate(5)}>Portfolio</button>
                <button onClick={() => onNavigate(6)}>Insights</button>
                <button onClick={() => onNavigate(7)}>Contact</button>
              </div>

              <div className="footer-col">
                <h4>Services</h4>
                {SERVICES.map((s) => (
                  <button key={s.id} onClick={() => onNavigate(2)}>
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="footer-col">
                <h4>Resources</h4>
                <button onClick={() => onNavigate(6)}>Insights</button>
                <button onClick={() => onNavigate(6)}>FAQ</button>
                <button onClick={() => openLegal('privacy')}>Privacy Policy</button>
                <button onClick={() => openLegal('terms')}>Terms &amp; Conditions</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 {COMPANY.name}. All Rights Reserved.</span>
            <span>{COMPANY.positioning}</span>
          </div>
        </footer>
      </section>

      {/* Legal Policy Modals */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ isOpen: false, type: 'privacy' })}
        type={legalModal.type}
      />
    </div>
  );
}
