'use client';

import React from 'react';
import { MobileAppContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';

interface MobileAppProcessTabProps {
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

export default function MobileAppProcessTab({ formData, setFormData, onOpenAssetPicker }: MobileAppProcessTabProps) {
  const handleProcessChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, process: { ...prev.process, [field]: val } };
    });
  };

  const handleCardChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const cards = [...(prev.process?.cards || [])];
      cards[index] = { ...cards[index], [field]: val };
      return { ...prev, process: { ...prev.process, cards } };
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
            2. Development Process
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Manage the section title, sub-badge, and the 3 development process workflow cards.
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
          3 Process Cards
        </span>
      </div>

      {/* Sub Badge & Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Section Sub-Badge</label>
          <input
            type="text"
            value={formData.process?.subBadgeText || ''}
            onChange={(e) => handleProcessChange('subBadgeText', e.target.value)}
            placeholder="development process"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Section Main Heading *</label>
          <input
            type="text"
            value={formData.process?.heading || ''}
            onChange={(e) => handleProcessChange('heading', e.target.value)}
            placeholder="How we build your mobile app from start to finish"
            style={{ ...inputStyle, fontWeight: 600 }}
          />
        </div>
      </div>

      {/* 3 Process Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {(formData.process?.cards || []).map((card, idx) => (
          <div
            key={card.id || idx}
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
                Step #{idx + 1}: {card.title || 'Untitled Step'}
              </span>
              <span style={{ fontSize: '0.725rem', color: '#64748B' }}>Card ID: {card.id || `process-${idx + 1}`}</span>
            </div>

            <div>
              <label style={labelStyle}>Step Title</label>
              <input
                type="text"
                placeholder="Title (e.g. Intuitive UX/UI Design)"
                value={card.title || ''}
                onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                style={{ ...inputStyle, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Step Description</label>
              <textarea
                rows={2}
                placeholder="Step description..."
                value={card.desc || ''}
                onChange={(e) => handleCardChange(idx, 'desc', e.target.value)}
                style={textareaStyle}
              />
            </div>

            {/* Visual Media for Card */}
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                Step Mockup Image & Floating Graphic
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                <ImageFieldWithUpload
                  label="Main Step Graphic Mockup"
                  recommendedDimensions="740 × 420 px (16:9 Banner)"
                  value={card.image || ''}
                  onChange={(url) => handleCardChange(idx, 'image', url)}
                  altValue={card.imageAlt || ''}
                  onAltChange={(alt) => handleCardChange(idx, 'imageAlt', alt)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`mobileApp.process.${idx}.image`) : undefined}
                  uploadPrefix={`process-${idx + 1}-main`}
                  previewHeight={110}
                  placeholder="/service-3-assets/...webp"
                />

                {idx === 1 && (
                  <ImageFieldWithUpload
                    label="Overlay Floating Graphic (Optional)"
                    recommendedDimensions="400 × 300 px (Floating Graphic)"
                    value={card.smallImage || ''}
                    onChange={(url) => handleCardChange(idx, 'smallImage', url)}
                    altValue={card.smallImageAlt || ''}
                    onAltChange={(alt) => handleCardChange(idx, 'smallImageAlt', alt)}
                    onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`mobileApp.process.${idx}.smallImage`) : undefined}
                    uploadPrefix={`process-${idx + 1}-overlay`}
                    previewHeight={110}
                    placeholder="/service-3-assets/...webp"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
