import React, { useRef } from 'react';
import CyberServiceCard from './CyberServiceCard';
import { SERVICES } from '../data/companyInfo';
import { 
  Laptop, 
  Server, 
  Network, 
  Cloud, 
  ShieldCheck, 
  Code, 
  Bot, 
  Headphones,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const icons = [Laptop, Server, Network, Cloud, ShieldCheck, Code, Bot, Headphones];

export default function ServicesSpotlightSection({ onNavigate }) {
  const scrollTrackRef = useRef(null);

  const scrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="services-cyber-wrapper" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', pointerEvents: 'auto' }}>
      
      {/* Top Controls: 01 to 08 Badge & Scroll Navigation Buttons */}
      <div className="services-controls-bar" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px',
        padding: '0 8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#22d3ee',
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.15)'
          }}>
            01 — 08 SERVICES
          </span>
          <span style={{
            fontSize: '11px',
            fontFamily: "'Space Grotesk', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(245, 243, 255, 0.5)'
          }}>
            Swipe or Scroll Right → Left
          </span>
        </div>

        {/* Arrow Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous service"
            className="services-nav-arrow"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
              touchAction: 'manipulation'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next service"
            className="services-nav-arrow"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(34, 211, 238, 0.15)',
              border: '1px solid rgba(34, 211, 238, 0.4)',
              color: '#22d3ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 16px rgba(34, 211, 238, 0.25)',
              backdropFilter: 'blur(8px)',
              touchAction: 'manipulation'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Curved Track: All 8 Cards EXACT Same Size with Uiverse 3D Tilt */}
      <div
        ref={scrollTrackRef}
        className="services-horizontal-track"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'stretch',
          gap: '20px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollPaddingLeft: '12px',
          scrollPaddingRight: '12px',
          scrollSnapType: 'x mandatory',
          padding: '12px 8px 24px 8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {SERVICES.map((service, index) => {
          const IconComponent = icons[index % icons.length];
          return (
            <CyberServiceCard
              key={service.id}
              service={service}
              icon={IconComponent}
              index={index}
              onInquire={() => onNavigate && onNavigate(7)}
            />
          );
        })}
      </div>

    </div>
  );
}
