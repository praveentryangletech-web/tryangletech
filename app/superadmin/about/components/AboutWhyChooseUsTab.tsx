'use client';

import React from 'react';
import { AboutWhyChooseUsSection, AboutWhyChooseUsItem } from '@/backend/services/about/about.types';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';

interface AboutWhyChooseUsTabProps {
  whyChooseUs: AboutWhyChooseUsSection;
  setWhyChooseUs: React.Dispatch<React.SetStateAction<AboutWhyChooseUsSection>>;
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

export default function AboutWhyChooseUsTab({ whyChooseUs, setWhyChooseUs, onOpenAssetPicker }: AboutWhyChooseUsTabProps) {
  const items = whyChooseUs.items || [];

  const handleUpdateItem = (idx: number, field: keyof AboutWhyChooseUsItem, val: string) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: val };
    setWhyChooseUs({ ...whyChooseUs, items: updated });
  };

  const handleAddItem = () => {
    const newItem: AboutWhyChooseUsItem = {
      id: `wcu-${Date.now()}`,
      icon: '/about-assets/6916f56a114dfcf4637d80a2_Vector (36).svg',
      title: 'New Value Reason',
      description: 'Explain why clients choose TryangleTech for engineering excellence.',
    };
    setWhyChooseUs({ ...whyChooseUs, items: [...items, newItem] });
  };

  const handleRemoveItem = (idx: number) => {
    const updated = items.filter((_, i) => i !== idx);
    setWhyChooseUs({ ...whyChooseUs, items: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', backgroundColor: 'transparent' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 4: Why Choose Us (Trust Pillars)
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          4-Card Trust Grid
        </span>
      </div>

      {/* Main Section Header */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Section Badge / Subtitle</label>
            <input
              type="text"
              value={whyChooseUs.subBadgeText || ''}
              onChange={(e) => setWhyChooseUs({ ...whyChooseUs, subBadgeText: e.target.value })}
              style={inputStyle}
              placeholder="e.g. Why choose us"
            />
          </div>
          <div>
            <label style={labelStyle}>Heading Prefix</label>
            <input
              type="text"
              value={whyChooseUs.heading || ''}
              onChange={(e) => setWhyChooseUs({ ...whyChooseUs, heading: e.target.value })}
              style={inputStyle}
              placeholder="e.g. Your trusted partner for digital"
            />
          </div>
          <div>
            <label style={labelStyle}>Highlighted Heading</label>
            <input
              type="text"
              value={whyChooseUs.headingHighlight || ''}
              onChange={(e) => setWhyChooseUs({ ...whyChooseUs, headingHighlight: e.target.value })}
              style={inputStyle}
              placeholder="e.g. growth and innovation"
            />
          </div>
        </div>
      </div>

      {/* 4 Value Pillars List */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>🛡️ Trust & Value Cards</strong>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748B' }}>
              Displayed in the 4-column Why Choose Us container on the About page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              border: '1px solid #C7D2FE',
              backgroundColor: '#EEF2FF',
              color: '#4338CA',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Add Pillar
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                  PILLAR #{idx + 1}: {item.title || 'Untitled'}
                </span>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    style={{ border: 'none', background: 'transparent', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}
                  >
                    ✕ Delete
                  </button>
                )}
              </div>

              <div>
                <label style={labelStyle}>Pillar Title *</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleUpdateItem(idx, 'title', e.target.value)}
                  style={inputStyle}
                  placeholder="e.g. 7+ Years of Experience"
                />
              </div>

              <HomeImageUploadField
                label="Icon / SVG Asset"
                value={item.icon}
                onChange={(val) => handleUpdateItem(idx, 'icon', val)}
                onOpenAssetPicker={() => onOpenAssetPicker(`aboutWcuIcon_${idx}`)}
                previewHeight="65px"
              />

              <div>
                <label style={labelStyle}>Description Narrative</label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => handleUpdateItem(idx, 'description', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Over 7 years of delivering high-quality web..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
