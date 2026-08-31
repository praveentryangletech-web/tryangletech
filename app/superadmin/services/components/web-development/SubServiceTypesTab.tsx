'use client';

import React from 'react';
import { WebDevContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';

interface SubServiceTypesTabProps {
  formData: WebDevContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<WebDevContentDTO | null>>;
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

export default function SubServiceTypesTab({ formData, setFormData, onOpenAssetPicker }: SubServiceTypesTabProps) {
  const handleTypesChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, types: { ...prev.types, [field]: val } };
    });
  };

  const handleTypeCardChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const cards = [...prev.types.cards];
      cards[index] = { ...cards[index], [field]: val };
      return { ...prev, types: { ...prev.types, cards } };
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
            3. Website Types We Build
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Configure headings, descriptions, showcase mockups, badges, and alt texts for the 5 website categories.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '4px 10px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          5 Types Grid
        </span>
      </div>

      {/* Sub Badge & Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Section Sub-Badge</label>
          <input
            type="text"
            value={formData.types.subBadgeText || ''}
            onChange={(e) => handleTypesChange('subBadgeText', e.target.value)}
            placeholder="website types"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Section Main Heading *</label>
          <input
            type="text"
            value={formData.types.heading || ''}
            onChange={(e) => handleTypesChange('heading', e.target.value)}
            placeholder="Unveiling the Variety in Website Types We Build"
            style={{ ...inputStyle, fontWeight: 600 }}
          />
        </div>
      </div>

      {/* 5 Type Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {(formData.types.cards || []).map((typeCard, idx) => (
          <div
            key={typeCard.id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
                Type #{idx + 1}: {typeCard.title || 'Untitled Type'}
              </span>
              <span style={{ fontSize: '0.725rem', color: '#64748B' }}>Badge: {typeCard.badge || 'Default'}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Title</label>
                <input
                  type="text"
                  placeholder="Title (e.g. Business & Corporate Websites)"
                  value={typeCard.title || ''}
                  onChange={(e) => handleTypeCardChange(idx, 'title', e.target.value)}
                  style={{ ...inputStyle, fontWeight: 700 }}
                />
              </div>
              <div>
                <label style={labelStyle}>Category Tag / Badge</label>
                <input
                  type="text"
                  placeholder="e.g. Corporate"
                  value={typeCard.badge || ''}
                  onChange={(e) => handleTypeCardChange(idx, 'badge', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                rows={2}
                placeholder="Description of this website category..."
                value={typeCard.desc || ''}
                onChange={(e) => handleTypeCardChange(idx, 'desc', e.target.value)}
                style={textareaStyle}
              />
            </div>

            {/* Media Assets & Alt Text for this Type Card */}
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                Showcase Mockups & Accessibility (Alt Text)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {/* Main Card Image */}
                <ImageFieldWithUpload
                  label="Main Graphic Mockup"
                  recommendedDimensions="800 × 500 px (16:10)"
                  value={typeCard.image || ''}
                  onChange={(url) => handleTypeCardChange(idx, 'image', url)}
                  altValue={typeCard.imageAlt || ''}
                  onAltChange={(alt) => handleTypeCardChange(idx, 'imageAlt', alt)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`subService.types.${idx}.image`) : undefined}
                  uploadPrefix={`type-${idx + 1}-main`}
                  previewHeight={110}
                  placeholder="/Home2_files/...webp"
                />

                {/* Floating Badge Graphic */}
                <ImageFieldWithUpload
                  label="Floating Badge Graphic (Optional)"
                  recommendedDimensions="400 × 300 px (4:3 Floating Badge)"
                  value={typeCard.smallImage || ''}
                  onChange={(url) => handleTypeCardChange(idx, 'smallImage', url)}
                  altValue={typeCard.smallImageAlt || ''}
                  onAltChange={(alt) => handleTypeCardChange(idx, 'smallImageAlt', alt)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`subService.types.${idx}.smallImage`) : undefined}
                  uploadPrefix={`type-${idx + 1}-badge`}
                  previewHeight={110}
                  placeholder="/Home2_files/...webp"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
