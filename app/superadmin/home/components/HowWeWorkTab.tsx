'use client';

import React from 'react';
import { HomeHowWeWorkSection } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';
import HomeImageUploadField from './HomeImageUploadField';

interface HowWeWorkTabProps {
  howWeWork: HomeHowWeWorkSection;
  setHowWeWork: React.Dispatch<React.SetStateAction<HomeHowWeWorkSection>>;
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

export default function HowWeWorkTab({
  howWeWork,
  setHowWeWork,
  onOpenAssetPicker,
}: HowWeWorkTabProps) {
  const items = howWeWork.items || DEFAULT_HOME_CONTENT.howWeWork.items;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 5: How We Work (Delivery Process)
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          3-Step Execution Framework
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Heading Text</label>
          <input
            type="text"
            value={howWeWork.heading || ''}
            onChange={(e) => setHowWeWork({ ...howWeWork, heading: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Transparent, Agile & Milestone-Driven"
          />
        </div>
        <div>
          <label style={labelStyle}>Heading Highlight</label>
          <input
            type="text"
            value={howWeWork.headingHighlight || ''}
            onChange={(e) => setHowWeWork({ ...howWeWork, headingHighlight: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Development Process"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Process Narrative</label>
        <textarea
          rows={2}
          value={howWeWork.description || ''}
          onChange={(e) => setHowWeWork({ ...howWeWork, description: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="e.g. From initial architectural planning to cloud deployment and ongoing maintenance..."
        />
      </div>

      {/* 3 Process Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {items.map((st, sIdx) => (
          <div
            key={st.id || sIdx}
            style={{
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ fontWeight: 800, color: 'var(--brand-blue, #1833fe)', fontSize: '0.875rem' }}>
              Process Step #{sIdx + 1}: {st.title || 'Untitled Step'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Step Title</label>
                <input
                  type="text"
                  value={st.title || ''}
                  onChange={(e) => {
                    const copy = { ...howWeWork, items: [...items] };
                    copy.items[sIdx] = { ...copy.items[sIdx], title: e.target.value };
                    setHowWeWork(copy);
                  }}
                  style={inputStyle}
                />
              </div>

              {/* Step Icon with Upload & Asset Picker */}
              <HomeImageUploadField
                label="Step Icon / Graphic"
                value={st.icon || ''}
                onChange={(url) => {
                  const copy = { ...howWeWork, items: [...items] };
                  copy.items[sIdx] = { ...copy.items[sIdx], icon: url };
                  setHowWeWork(copy);
                }}
                onOpenAssetPicker={() => onOpenAssetPicker(`howWeWork.items.${sIdx}.icon`)}
                placeholder="Icon URL"
                previewWidth={44}
                previewHeight={44}
                shape="square"
                recommendedDimensions="64 × 64 px (SVG or PNG)"
              />
            </div>

            <div>
              <label style={labelStyle}>Step Description</label>
              <textarea
                rows={2}
                value={st.description || ''}
                onChange={(e) => {
                  const copy = { ...howWeWork, items: [...items] };
                  copy.items[sIdx] = { ...copy.items[sIdx], description: e.target.value };
                  setHowWeWork(copy);
                }}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Process Visual Graphics */}
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
          Process Section Visual Graphics
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[1, 2, 3].map((num) => {
            const key = `image${num}` as 'image1' | 'image2' | 'image3';
            const altKey = `image${num}Alt` as 'image1Alt' | 'image2Alt' | 'image3Alt';
            const val = howWeWork[key] || '';
            const altVal = howWeWork[altKey] || '';
            return (
              <HomeImageUploadField
                key={num}
                label={`Process Graphic ${num}`}
                value={val}
                onChange={(url) => setHowWeWork({ ...howWeWork, [key]: url })}
                onOpenAssetPicker={() => onOpenAssetPicker(`howWeWork.${key}`)}
                altValue={altVal}
                onAltChange={(alt) => setHowWeWork({ ...howWeWork, [altKey]: alt })}
                placeholder="Graphic URL"
                previewWidth={60}
                previewHeight={60}
                shape="square"
                recommendedDimensions="800 × 500 px (16:10 ratio)"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
