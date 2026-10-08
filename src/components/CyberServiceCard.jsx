import React from 'react';
import './CyberServiceCard.css';
import { ArrowRight } from 'lucide-react';

export default function CyberServiceCard({ service, icon: IconComponent, index, onInquire }) {
  return (
    <div className="cyber-card-container noselect">
      <div className="cyber-canvas">
        {/* 25 Interactive Tracking Grid Cells for 3D Perspective Tilt */}
        {Array.from({ length: 25 }, (_, i) => (
          <div 
            key={i} 
            className={`cyber-tracker tr-${i + 1}`} 
            onClick={() => onInquire && onInquire()}
            title={`Click to inquire about ${service.title}`}
          />
        ))}

        {/* 3D Cyber Tilt Card */}
        <div className="cyber-card">
          {/* Card Glare & Scanning Hologram Effects */}
          <div className="card-glare" />
          <div className="cyber-lines">
            <span /><span /><span /><span />
          </div>
          <div className="corner-elements">
            <span /><span /><span /><span />
          </div>
          <div className="scan-line" />
          
          <div className="glowing-elements">
            <div className="glow-1" />
            <div className="glow-2" />
            <div className="glow-3" />
          </div>

          <div className="card-particles">
            <span /><span /><span /><span /><span /><span />
          </div>

          {/* Card Content */}
          <div className="cyber-card-content">
            
            {/* Top row: Number pill & Circular Icon */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
              <div style={{
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '15px',
                  fontWeight: '800',
                  letterSpacing: '0.12em',
                  color: '#22d3ee'
                }}>
                  {service.num}
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(245, 243, 255, 0.45)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
                  // SYSTEM
                </span>
              </div>

              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(34, 211, 238, 0.1)',
                border: '1px solid rgba(34, 211, 238, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22d3ee',
                boxShadow: '0 0 14px rgba(34, 211, 238, 0.2)'
              }}>
                {IconComponent && <IconComponent size={20} />}
              </div>
            </div>

            {/* Middle: Title, Tagline, and Description */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', justifyContent: 'center' }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#fff',
                margin: '0 0 6px',
                fontFamily: "'Unbounded', sans-serif",
                lineHeight: '1.25',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(45deg, #ffffff, #a5f3fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {service.title}
              </h3>

              <h4 style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#22d3ee',
                margin: '0 0 12px',
                lineHeight: '1.3'
              }}>
                {service.tagline}
              </h4>

              <p style={{
                fontSize: '13px',
                lineHeight: '1.6',
                color: 'rgba(245, 243, 255, 0.72)',
                margin: 0
              }}>
                {service.description}
              </p>
            </div>

            {/* Bottom Row: Tier Indicator & Inquire Pill Button */}
            <div style={{
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '40px'
            }}>
              <span style={{
                fontSize: '11px',
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(245, 243, 255, 0.45)'
              }}>
                Tier 0{index + 1} Spec
              </span>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(34, 211, 238, 0.1)',
                border: '1px solid rgba(34, 211, 238, 0.35)',
                fontSize: '11px',
                fontWeight: '700',
                color: '#22d3ee',
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 0 10px rgba(34, 211, 238, 0.15)'
              }}>
                Inquire
                <ArrowRight size={13} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
