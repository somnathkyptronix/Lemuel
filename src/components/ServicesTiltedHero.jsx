import React, { useState } from 'react';
import { TiltedGridHero } from './ui/tilted-grid-hero';
import { SERVICES } from '../data/companyInfo';

const SERVICE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    alt: "01 IT Consulting",
    num: "01",
    title: "IT Consulting"
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    alt: "02 Managed IT Services",
    num: "02",
    title: "Managed IT Services"
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    alt: "03 Network & Infrastructure",
    num: "03",
    title: "Network & Infrastructure"
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    alt: "04 Cloud Solutions",
    num: "04",
    title: "Cloud Solutions"
  },
  {
    src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    alt: "05 Cybersecurity",
    num: "05",
    title: "Cybersecurity"
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    alt: "06 Software & Digital Solutions",
    num: "06",
    title: "Software & Digital Solutions"
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    alt: "07 AI & Automation",
    num: "07",
    title: "AI & Automation"
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    alt: "08 Technical Support",
    num: "08",
    title: "Technical Support"
  }
];

export default function ServicesTiltedHero({ onNavigate }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeService = SERVICES[selectedIdx] || SERVICES[0];

  return (
    <div className="services-tilted-wrapper" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', pointerEvents: 'auto' }}>
      
      {/* 3D Cylindrical Band: Streams images Right to Left */}
      <TiltedGridHero
        images={SERVICE_IMAGES}
        className="services-tilted-hero-card"
        speed={3.6}
        curve={78}
        tileHeight={34}
        aspectRatio={16 / 9}
        fade={14}
        style={{
          width: '100%',
          height: '420px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          background: 'rgba(6, 8, 20, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px',
          pointerEvents: 'none'
        }}>
          {/* Top header badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#22d3ee'
            }}>
              03 // HORIZONTAL 3D STREAM
            </span>
            <span style={{
              fontSize: '11px',
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(245, 243, 255, 0.5)'
            }}>
              Right → Left Curved Stream
            </span>
          </div>

          {/* Bottom active service card pill */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            pointerEvents: 'auto'
          }}>
            <div style={{
              padding: '20px 24px',
              borderRadius: '18px',
              background: 'rgba(10, 12, 22, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              maxWidth: '560px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ color: '#22d3ee', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 'bold', fontSize: '15px' }}>
                  {activeService.num}
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0, fontFamily: "'Unbounded', sans-serif" }}>
                  {activeService.title}
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: '#22d3ee', fontWeight: '600', margin: '0 0 6px' }}>
                {activeService.tagline}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(245, 243, 255, 0.75)', margin: 0, lineHeight: 1.6 }}>
                {activeService.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate(7)}
              style={{
                padding: '12px 26px',
                borderRadius: '999px',
                background: '#22d3ee',
                color: '#050509',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 8px 24px rgba(34, 211, 238, 0.3)'
              }}
            >
              Inquire About Service ↗
            </button>
          </div>
        </div>
      </TiltedGridHero>

      {/* Horizontal 1-by-1 Interactive Navigation Tabs (01 to 08) */}
      <div style={{
        width: '100%',
        marginTop: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '0 10px'
      }}>
        {SERVICES.map((s, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              style={{
                padding: '9px 18px',
                borderRadius: '12px',
                border: isSelected ? '1px solid #22d3ee' : '1px solid rgba(255, 255, 255, 0.1)',
                background: isSelected ? '#22d3ee' : 'rgba(255, 255, 255, 0.05)',
                color: isSelected ? '#050509' : 'rgba(245, 243, 255, 0.7)',
                fontSize: '12px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: isSelected ? '700' : '500',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{s.num}</span>
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
