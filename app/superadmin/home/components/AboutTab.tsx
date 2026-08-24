'use client';

import React from 'react';
import { HomeAboutSection } from '@/backend/services/home/home.types';
import HomeImageUploadField from './HomeImageUploadField';

interface AboutTabProps {
  about: HomeAboutSection;
  setAbout: React.Dispatch<React.SetStateAction<HomeAboutSection>>;
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

export default function AboutTab({ about, setAbout, onOpenAssetPicker }: AboutTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 3: About & Story
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Company Narrative
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Main Heading Text</label>
          <input
            type="text"
            value={about.heading || ''}
            onChange={(e) => setAbout({ ...about, heading: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Architecting High-Performance Web & Software for"
          />
        </div>
        <div>
          <label style={labelStyle}>Heading Highlight</label>
          <input
            type="text"
            value={about.headingHighlight || ''}
            onChange={(e) => setAbout({ ...about, headingHighlight: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Gandhinagar & GIFT City"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Story Paragraph / Narrative</label>
        <textarea
          rows={4}
          value={about.description || ''}
          onChange={(e) => setAbout({ ...about, description: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="e.g. TryangleTech is a senior software engineering studio in Gandhinagar..."
        />
      </div>

      {/* About Section Dynamic Images */}
      <div
        style={{
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '18px',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.9rem' }}>
          About Section Dynamic Images
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          <HomeImageUploadField
            label="About Main Illustration (image1)"
            value={about.image1 || ''}
            onChange={(url) => setAbout({ ...about, image1: url })}
            onOpenAssetPicker={() => onOpenAssetPicker('about.image1')}
            placeholder="/Taskopia_files/68ef7bedcf795a787addad8c_Group 2085663562.webp"
            previewWidth={80}
            previewHeight={80}
            recommendedDimensions="800 × 600 px (4:3 ratio)"
            helperText="Primary story graphic on desktop and tablet screens."
          />

          <HomeImageUploadField
            label="About Secondary Graphic (image2)"
            value={about.image2 || ''}
            onChange={(url) => setAbout({ ...about, image2: url })}
            onOpenAssetPicker={() => onOpenAssetPicker('about.image2')}
            placeholder="/Taskopia_files/68ef7bed775c847e27d93569_Group 2085663563.webp"
            previewWidth={80}
            previewHeight={80}
            recommendedDimensions="600 × 400 px (3:2 ratio)"
            helperText="Secondary floating badge graphic or decorative graphic."
          />
        </div>
      </div>
    </div>
  );
}
