'use client';

import React from 'react';
import { HomeWhyChooseUsSection } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';
import HomeImageUploadField from './HomeImageUploadField';

interface WhyChooseUsTabProps {
  whyChooseUs: HomeWhyChooseUsSection;
  setWhyChooseUs: React.Dispatch<React.SetStateAction<HomeWhyChooseUsSection>>;
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

export default function WhyChooseUsTab({
  whyChooseUs,
  setWhyChooseUs,
  onOpenAssetPicker,
}: WhyChooseUsTabProps) {
  const items = whyChooseUs.items || DEFAULT_HOME_CONTENT.whyChooseUs.items;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 4: Why Choose Us (Value Pillars)
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          4 Key Differentiators
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Heading Text</label>
          <input
            type="text"
            value={whyChooseUs.heading || ''}
            onChange={(e) => setWhyChooseUs({ ...whyChooseUs, heading: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Why GIFT City & Gandhinagar Businesses"
          />
        </div>
        <div>
          <label style={labelStyle}>Heading Highlight</label>
          <input
            type="text"
            value={whyChooseUs.headingHighlight || ''}
            onChange={(e) => setWhyChooseUs({ ...whyChooseUs, headingHighlight: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Choose TryangleTech"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            style={{
              border: 'none',
              padding: '0 0 18px 0',
              borderBottom: idx < items.length - 1 ? '1px solid #E2E8F0' : 'none',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontWeight: 800, color: 'var(--brand-blue, #1833fe)', fontSize: '0.875rem' }}>
              Pillar #{idx + 1}: {item.title || 'Untitled Pillar'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Pillar Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => {
                    const copy = { ...whyChooseUs, items: [...items] };
                    copy.items[idx] = { ...copy.items[idx], title: e.target.value };
                    setWhyChooseUs(copy);
                  }}
                  style={inputStyle}
                />
              </div>

              {/* Pillar Icon with Upload & Asset Picker */}
              <HomeImageUploadField
                label="Pillar Icon / Graphic"
                value={item.icon || ''}
                onChange={(url) => {
                  const copy = { ...whyChooseUs, items: [...items] };
                  copy.items[idx] = { ...copy.items[idx], icon: url };
                  setWhyChooseUs(copy);
                }}
                onOpenAssetPicker={() => onOpenAssetPicker(`whyChooseUs.items.${idx}.icon`)}
                placeholder="Icon URL (e.g. /Taskopia_files/...)"
                previewWidth={44}
                previewHeight={44}
                shape="square"
                recommendedDimensions="64 × 64 px (SVG or PNG)"
              />
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                rows={2}
                value={item.description || ''}
                onChange={(e) => {
                  const copy = { ...whyChooseUs, items: [...items] };
                  copy.items[idx] = { ...copy.items[idx], description: e.target.value };
                  setWhyChooseUs(copy);
                }}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
