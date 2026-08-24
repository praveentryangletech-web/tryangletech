'use client';

import React from 'react';
import { HomeCtaBannerSection } from '@/backend/services/home/home.types';
import HomeImageUploadField from './HomeImageUploadField';

interface CtaBannerTabProps {
  ctaBanner: HomeCtaBannerSection;
  setCtaBanner: React.Dispatch<React.SetStateAction<HomeCtaBannerSection>>;
  onOpenAssetPicker: (target: string) => void;
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

export default function CtaBannerTab({
  ctaBanner,
  setCtaBanner,
  onOpenAssetPicker,
}: CtaBannerTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 7: Call to Action Banner
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Conversion Closer
        </span>
      </div>

      <div>
        <label style={labelStyle}>Banner Headline</label>
        <input
          type="text"
          value={ctaBanner.heading || ctaBanner.title || ''}
          onChange={(e) => setCtaBanner({ ...ctaBanner, heading: e.target.value, title: e.target.value })}
          style={inputStyle}
          placeholder="e.g. Have a Project in Mind? Let's Build Something Exceptional"
        />
      </div>

      <div>
        <label style={labelStyle}>Banner Description</label>
        <textarea
          rows={2}
          value={ctaBanner.description || ''}
          onChange={(e) => setCtaBanner({ ...ctaBanner, description: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="e.g. Schedule a direct 30-minute discovery call with our senior tech leads..."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Button Text</label>
          <input
            type="text"
            value={ctaBanner.buttonText || ''}
            onChange={(e) => setCtaBanner({ ...ctaBanner, buttonText: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Schedule a Consultation"
          />
        </div>
        <div>
          <label style={labelStyle}>Button Link</label>
          <input
            type="text"
            value={ctaBanner.buttonLink || ''}
            onChange={(e) => setCtaBanner({ ...ctaBanner, buttonLink: e.target.value })}
            style={inputStyle}
            placeholder="e.g. /contact"
          />
        </div>
      </div>

      <div
        style={{
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px',
          backgroundColor: '#F8FAFC',
        }}
      >
        <HomeImageUploadField
          label="CTA Background / Graphic (Optional)"
          value={ctaBanner.image || ''}
          onChange={(url) => setCtaBanner({ ...ctaBanner, image: url })}
          onOpenAssetPicker={() => onOpenAssetPicker('ctaBanner.image')}
          altValue={ctaBanner.imageAlt || ''}
          onAltChange={(alt) => setCtaBanner({ ...ctaBanner, imageAlt: alt })}
          placeholder="Image URL (optional)"
          previewWidth={80}
          previewHeight={60}
          recommendedDimensions="400 × 400 px (SVG or PNG)"
          helperText="Optional decorative background texture or floating badge."
        />
      </div>
    </div>
  );
}
