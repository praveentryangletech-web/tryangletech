'use client';

import React from 'react';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';
import { ServiceHighlightsSection, ServiceHighlightPillar } from '@/backend/services/services/services.types';
import { ImageIcon, StarIcon } from './StandardSvgIcons';

interface ServiceHighlightsTabProps {
  highlights: ServiceHighlightsSection;
  setHighlights: React.Dispatch<React.SetStateAction<ServiceHighlightsSection>>;
  onOpenAssetPicker: (target: string) => void;
}

export default function ServiceHighlightsTab({ highlights, setHighlights, onOpenAssetPicker }: ServiceHighlightsTabProps) {
  const handlePillarChange = (idx: number, field: keyof ServiceHighlightPillar, value: string) => {
    setHighlights((prev) => {
      const pillars = [...(prev.pillars || [])];
      if (pillars[idx]) {
        pillars[idx] = { ...pillars[idx], [field]: value };
      }
      return { ...prev, pillars };
    });
  };

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            3. Key Highlights & Value Pillars
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.785rem', color: '#64748B' }}>
            Configure the Service About section with visual mockups and 4 foundational value pillars (Collaboration, Innovation, Efficiency, Security).
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338CA', backgroundColor: '#EEF2FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #C7D2FE' }}>
          Key Highlights
        </span>
      </div>

      {/* Heading Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
            Section Overtitle
          </label>
          <input
            type="text"
            value={highlights.subBadgeText || ''}
            onChange={(e) => setHighlights((prev) => ({ ...prev, subBadgeText: e.target.value }))}
            placeholder="Key Highlights"
            style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
            Section Main Heading *
          </label>
          <input
            type="text"
            value={highlights.heading || ''}
            onChange={(e) => setHighlights((prev) => ({ ...prev, heading: e.target.value }))}
            placeholder="Deliver excellence, drive innovation, achieve scale"
            style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontWeight: 600 }}
          />
        </div>
      </div>

      {/* Visual Mockup Images */}
      <div style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <ImageIcon size={16} color="var(--brand-blue, #1833fe)" />
          <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>
            Left-Side Showcase Mockup Images
          </strong>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <HomeImageUploadField
            label="Main Project Overview Mockup"
            value={highlights.imageMain || ''}
            onChange={(val) => setHighlights((prev) => ({ ...prev, imageMain: val }))}
            onOpenAssetPicker={() => onOpenAssetPicker('highlights.imageMain')}
            altValue={highlights.imageMainAlt || ''}
            onAltChange={(alt) => setHighlights((prev) => ({ ...prev, imageMainAlt: alt }))}
            recommendedDimensions="600 × 450 px (WebP)"
            previewHeight={70}
            previewWidth={110}
            shape="rect"
          />

          <HomeImageUploadField
            label="Small Floating Badge Mockup"
            value={highlights.imageSmall || ''}
            onChange={(val) => setHighlights((prev) => ({ ...prev, imageSmall: val }))}
            onOpenAssetPicker={() => onOpenAssetPicker('highlights.imageSmall')}
            altValue={highlights.imageSmallAlt || ''}
            onAltChange={(alt) => setHighlights((prev) => ({ ...prev, imageSmallAlt: alt }))}
            recommendedDimensions="240 × 160 px (WebP)"
            previewHeight={70}
            previewWidth={110}
            shape="rect"
          />
        </div>
      </div>

      {/* 4 Value Pillars Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StarIcon size={16} color="var(--brand-blue, #1833fe)" />
          <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>
            4 Core Value Pillars
          </strong>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {(highlights.pillars || []).map((pillar, idx) => (
            <div
              key={pillar.id || idx}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#E2E8F0', color: '#475569', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={pillar.title || ''}
                  onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                  placeholder="Pillar Title"
                  style={{ flex: 1, height: '32px', padding: '0 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}
                />
              </div>
              <textarea
                rows={2}
                value={pillar.description || ''}
                onChange={(e) => handlePillarChange(idx, 'description', e.target.value)}
                placeholder="Pillar Description"
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.775rem', color: '#334155', fontFamily: 'inherit' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
