'use client';
import React, { useEffect, useRef } from 'react';
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { CustomSoftwareProcessSection } from '@/backend/services/services/services.types';

interface CustomSoftwareFeaturesProps {
  data?: CustomSoftwareProcessSection;
}

export default function CustomSoftwareFeatures({ data }: CustomSoftwareFeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const subBadgeText = data?.subBadgeText || 'our development process';
  const headline = data?.headline || 'Deliver projects on time through streamlined execution';
  const description = data?.description || 'A disciplined 4-stage engineering lifecycle designed for speed, stability, and full transparency.';
  const steps = data?.steps || [];

  // Native Scroll Reveal Observer matching About page animation timing
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultStepMeta = [
    {
      topOffset: "4%",
      leftOffset: "0%",
      delay: "0.15s",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
    {
      topOffset: "28%",
      leftOffset: "24%",
      delay: "0.30s",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
    {
      topOffset: "52%",
      leftOffset: "48%",
      delay: "0.45s",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      topOffset: "76%",
      leftOffset: "72%",
      delay: "0.60s",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="rt-features-interactive-timeline"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0c0f1d',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 3.5vw, 3rem)',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Background Mesh Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(24, 51, 254, 0.18) 0%, transparent 40%),
            radial-gradient(circle at 85% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 45%),
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto clamp(3rem, 6vw, 5rem)' }}>
          <div className="rt-sub-gap" style={{ justifyContent: 'center' }}>
            <div
              className="rt-sub-text"
              style={{
                color: '#60a5fa',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {subBadgeText}
            </div>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              margin: '12px 0 16px',
            }}
          >
            {headline}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.125rem)',
              color: '#94a3b8',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* 4-Stage Stepped Cascade Cards Container */}
        <div
          className="rt-timeline-cascade-container"
          style={{
            position: 'relative',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {steps.map((step, idx) => {
            const meta = defaultStepMeta[idx % defaultStepMeta.length];
            const isWhite = step.bg === '#ffffff' || step.bg?.toLowerCase() === 'white';
            return (
              <div
                key={step.id || idx}
                className="rt-cascade-card"
                style={{
                  background: step.bg,
                  borderRadius: '20px',
                  padding: '32px 28px',
                  boxShadow: step.shadow || '0 10px 28px rgba(0,0,0,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: isWhite ? '1px solid rgba(24, 51, 254, 0.12)' : 'none',
                }}
              >
                {/* Header with Step Num and Column Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      backgroundColor: isWhite ? '#eff6ff' : 'rgba(255, 255, 255, 0.18)',
                      color: isWhite ? '#1833fe' : '#ffffff',
                    }}
                  >
                    {step.column}
                  </span>
                  <span
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      color: isWhite ? 'rgba(15, 23, 42, 0.2)' : 'rgba(255, 255, 255, 0.4)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {step.stepNum}
                  </span>
                </div>

                {/* Step Title */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: step.color,
                    lineHeight: 1.35,
                    margin: 0,
                  }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  style={{
                    fontSize: '0.925rem',
                    color: step.descColor || (isWhite ? '#64748b' : 'rgba(255, 255, 255, 0.9)'),
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
