'use client';

import React from 'react';
import { MobileAppContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';

interface MobileAppFeaturesTabProps {
  formData: MobileAppContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<MobileAppContentDTO | null>>;
  onOpenAssetPicker?: (target: string) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '42px',
  padding: '0 14px',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  fontSize: '0.875rem',
  color: '#0F172A',
  outline: 'none',
  boxSizing: 'border-box',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  fontSize: '0.875rem',
  color: '#0F172A',
  lineHeight: '1.5',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '6px',
};

export default function MobileAppFeaturesTab({ formData, setFormData, onOpenAssetPicker }: MobileAppFeaturesTabProps) {
  const handleFeaturesChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, features: { ...prev.features, [field]: val } };
    });
  };

  const handleItemChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const items = [...(prev.features?.items || [])];
      items[index] = { ...items[index], [field]: val };
      return { ...prev, features: { ...prev.features, items } };
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
        gap: '24px',
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            5. Features & "What You Get"
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Configure the 3 core deliverable features (Simple to Use, Safe & Secure, Works on Any Phone) and main hero showcase graphic.
          </p>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--brand-blue, #1833fe)',
            backgroundColor: '#EFF6FF',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid #BFDBFE',
          }}
        >
          3 Deliverable Pillars
        </span>
      </div>

      {/* Sub Badge & Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Section Sub-Badge</label>
          <input
            type="text"
            value={formData.features?.subBadgeText || ''}
            onChange={(e) => handleFeaturesChange('subBadgeText', e.target.value)}
            placeholder="what you get"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Section Main Heading *</label>
          <input
            type="text"
            value={formData.features?.heading || ''}
            onChange={(e) => handleFeaturesChange('heading', e.target.value)}
            placeholder="Make work easier and help your business run better"
            style={{ ...inputStyle, fontWeight: 600 }}
          />
        </div>
      </div>

      {/* Main Feature Banner Graphic */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
        <ImageFieldWithUpload
          label="Main Showcase Hero Asset"
          recommendedDimensions="800 × 800 px (3D Mockup / Banner)"
          value={formData.features?.imageMain || ''}
          onChange={(url) => handleFeaturesChange('imageMain', url)}
          altValue={formData.features?.imageMainAlt || ''}
          onAltChange={(alt) => handleFeaturesChange('imageMainAlt', alt)}
          onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('mobileApp.features.imageMain') : undefined}
          uploadPrefix="features-main"
          placeholder="/service-3-assets/...avif"
        />
      </div>

      {/* 3 Feature Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {(formData.features?.items || []).map((item, idx) => (
          <div
            key={item.id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ fontWeight: 800, color: 'var(--brand-blue, #1833fe)', fontSize: '0.85rem' }}>
              Feature #{idx + 1}: {item.title || 'Untitled'}
            </div>

            <div>
              <label style={labelStyle}>Feature Title</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleItemChange(idx, 'title', e.target.value)}
                style={{ ...inputStyle, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Feature Description</label>
              <textarea
                rows={2}
                value={item.desc || ''}
                onChange={(e) => handleItemChange(idx, 'desc', e.target.value)}
                style={textareaStyle}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
