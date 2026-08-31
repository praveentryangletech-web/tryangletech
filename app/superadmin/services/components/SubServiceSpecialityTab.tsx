'use client';

import React from 'react';
import { WebDevContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from './ImageFieldWithUpload';

interface SubServiceSpecialityTabProps {
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

export default function SubServiceSpecialityTab({ formData, setFormData, onOpenAssetPicker }: SubServiceSpecialityTabProps) {
  const handleSpecialityChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, speciality: { ...prev.speciality, [field]: val } };
    });
  };

  const handleSpecialityCardChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const cards = [...prev.speciality.cards];
      cards[index] = { ...cards[index], [field]: val };
      return { ...prev, speciality: { ...prev.speciality, cards } };
    });
  };

  const handleSpecialityImageChange = (cardIdx: number, imgIdx: number, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const cards = [...prev.speciality.cards];
      const images = [...(cards[cardIdx].images || [])];
      images[imgIdx] = val;
      cards[cardIdx] = { ...cards[cardIdx], images };
      return { ...prev, speciality: { ...prev.speciality, cards } };
    });
  };

  const handleSpecialityImageAltChange = (cardIdx: number, imgIdx: number, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const cards = [...prev.speciality.cards];
      const imagesAlt = [...(cards[cardIdx].imagesAlt || [])];
      imagesAlt[imgIdx] = val;
      cards[cardIdx] = { ...cards[cardIdx], imagesAlt };
      return { ...prev, speciality: { ...prev.speciality, cards } };
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
            2. Capabilities & Feature Highlights
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Manage the section heading, card copies, icons, screenshot showcases, and alt texts for the 3 core capability cards.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '4px 10px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          3 Core Cards
        </span>
      </div>

      {/* Sub Badge & Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Section Sub-Badge</label>
          <input
            type="text"
            value={formData.speciality.subBadgeText || ''}
            onChange={(e) => handleSpecialityChange('subBadgeText', e.target.value)}
            placeholder="Speciality / features"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Section Heading *</label>
          <input
            type="text"
            value={formData.speciality.heading || ''}
            onChange={(e) => handleSpecialityChange('heading', e.target.value)}
            placeholder="Websites that work well on every device..."
            style={{ ...inputStyle, fontWeight: 600 }}
          />
        </div>
      </div>

      {/* 3 Capability Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {(formData.speciality.cards || []).map((card, idx) => {
          const imageCount = idx === 1 ? 3 : 2; // Card 2 has 3 images, Cards 1 & 3 have 2 images
          return (
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
                  Capability Card #{idx + 1}: {card.title || 'Untitled Card'}
                </span>
                <span style={{ fontSize: '0.725rem', color: '#64748B' }}>Card ID: {card.id || `spec-${idx + 1}`}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Card Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Responsive Design"
                    value={card.title || ''}
                    onChange={(e) => handleSpecialityCardChange(idx, 'title', e.target.value)}
                    style={{ ...inputStyle, fontWeight: 700 }}
                  />
                </div>

                {/* Card Icon & Alt */}
                <ImageFieldWithUpload
                  label="Card Feature Icon"
                  recommendedDimensions="64 × 64 px (SVG / Vector)"
                  value={card.icon || ''}
                  onChange={(url) => handleSpecialityCardChange(idx, 'icon', url)}
                  altValue={card.iconAlt || ''}
                  onAltChange={(alt) => handleSpecialityCardChange(idx, 'iconAlt', alt)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`subService.speciality.${idx}.icon`) : undefined}
                  uploadPrefix={`spec-${idx + 1}-icon`}
                  previewHeight={70}
                  placeholder="/service-1-assets/...svg"
                />
              </div>

              <div>
                <label style={labelStyle}>Card Description</label>
                <textarea
                  rows={2}
                  placeholder="Card description explaining benefit..."
                  value={card.desc || ''}
                  onChange={(e) => handleSpecialityCardChange(idx, 'desc', e.target.value)}
                  style={textareaStyle}
                />
              </div>

              {/* Showcase Images for this Card */}
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                  Showcase Graphics & Alt Texts ({imageCount} Mockup Images)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`, gap: '12px' }}>
                  {Array.from({ length: imageCount }).map((_, imgIdx) => {
                    const currentImg = card.images?.[imgIdx] || '';
                    const currentAlt = card.imagesAlt?.[imgIdx] || '';
                    return (
                      <ImageFieldWithUpload
                        key={imgIdx}
                        label={`Mockup Graphic #${imgIdx + 1}`}
                        recommendedDimensions="600 × 400 px (3:2)"
                        value={currentImg}
                        onChange={(url) => handleSpecialityImageChange(idx, imgIdx, url)}
                        altValue={currentAlt}
                        onAltChange={(alt) => handleSpecialityImageAltChange(idx, imgIdx, alt)}
                        onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`subService.speciality.${idx}.images.${imgIdx}`) : undefined}
                        uploadPrefix={`spec-${idx + 1}-mockup-${imgIdx + 1}`}
                        previewHeight={110}
                        placeholder="/service-1-assets/...webp"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
