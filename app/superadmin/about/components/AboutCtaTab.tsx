'use client';

import React from 'react';
import { AboutFooterCtaSection } from '@/backend/services/about/about.types';

interface AboutCtaTabProps {
  ctaBanner: AboutFooterCtaSection;
  setCtaBanner: React.Dispatch<React.SetStateAction<AboutFooterCtaSection>>;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 1rem',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  fontSize: '0.875rem',
  fontWeight: 500,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '5px',
};

export default function AboutCtaTab({ ctaBanner, setCtaBanner }: AboutCtaTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', backgroundColor: 'transparent' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 6: Closing Footer Call-To-Action (CTA)
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Conversion Banner
        </span>
      </div>

      {/* Sub Badge & Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Overtitle Tag / Badge</label>
          <input
            type="text"
            value={ctaBanner.subBadgeText || ''}
            onChange={(e) => setCtaBanner({ ...ctaBanner, subBadgeText: e.target.value })}
            style={inputStyle}
            placeholder="e.g. GROW YOUR BUSINESS ONLINE"
          />
        </div>
        <div>
          <label style={labelStyle}>CTA Heading Proposition *</label>
          <input
            type="text"
            value={ctaBanner.heading || ''}
            onChange={(e) => setCtaBanner({ ...ctaBanner, heading: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Build smarter, launch faster, grow your business online"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>CTA Narrative Description</label>
        <textarea
          rows={2}
          value={ctaBanner.description || ''}
          onChange={(e) => setCtaBanner({ ...ctaBanner, description: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Partner with Tryangletech for expert website development..."
        />
      </div>

      {/* Button Text & Link */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Button Label *</label>
          <input
            type="text"
            value={ctaBanner.buttonText || ''}
            onChange={(e) => setCtaBanner({ ...ctaBanner, buttonText: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Get started today"
          />
        </div>
        <div>
          <label style={labelStyle}>Button Target URL *</label>
          <input
            type="text"
            value={ctaBanner.buttonLink || ''}
            onChange={(e) => setCtaBanner({ ...ctaBanner, buttonLink: e.target.value })}
            style={inputStyle}
            placeholder="e.g. /contact"
          />
        </div>
      </div>
    </div>
  );
}
