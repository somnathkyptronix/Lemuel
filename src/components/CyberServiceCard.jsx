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
            title={`Inquire about ${service.title}`}
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
            <div className="cyber-card-header">
              <div className="cyber-num-badge">
                <span className="cyber-num-val">
                  {service.num}
                </span>
                <span className="cyber-num-sys">
                  // SYS
                </span>
              </div>

              <div className="cyber-icon-badge">
                {IconComponent && <IconComponent size={18} />}
              </div>
            </div>

            {/* Middle: Title, Tagline, and Description */}
            <div className="cyber-card-body-wrap">
              <h3 className="cyber-card-title">
                {service.title}
              </h3>

              <h4 className="cyber-card-tagline">
                {service.tagline}
              </h4>

              <p className="cyber-card-desc">
                {service.description}
              </p>
            </div>

            {/* Bottom Row: Tier Indicator & Inquire Pill Button */}
            <div className="cyber-card-footer">
              <span className="cyber-tier-label">
                Tier 0{index + 1}
              </span>

              <div className="cyber-inquire-pill">
                <span>Inquire</span>
                <ArrowRight size={12} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
