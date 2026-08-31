'use client';

import React from 'react';
import { MobileAppContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { LinkIcon, ImageIcon } from '../common/StandardSvgIcons';

interface MobileAppHeroTabProps {
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

export default function MobileAppHeroTab({ formData, setFormData, onOpenAssetPicker }: MobileAppHeroTabProps) {
  const handleHeroChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, hero: { ...prev.hero, [field]: val } };
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
            1. Hero Header & Overview Banner
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Configure above-the-fold headlines, subheadlines, call-to-action buttons, trust marquee text, and floating mobile mockups.
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
          Above the Fold
        </span>
      </div>

      {/* Sub Badge & Main Headline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Overtitle / Sub-Badge Text</label>
          <input
            type="text"
            value={formData.hero?.subBadgeText || ''}
            onChange={(e) => handleHeroChange('subBadgeText', e.target.value)}
            placeholder="e.g. Mobile Application Development"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Hero Main Headline *</label>
          <input
            type="text"
            value={formData.hero?.headline || ''}
            onChange={(e) => handleHeroChange('headline', e.target.value)}
            placeholder="We build mobile apps that work great and help your business grow"
            style={{ ...inputStyle, fontWeight: 700 }}
          />
        </div>
      </div>

      {/* Hero Subheadline */}
      <div>
        <label style={labelStyle}>Hero Subheadline / Value Pitch *</label>
        <textarea
          rows={3}
          value={formData.hero?.subheadline || ''}
          onChange={(e) => handleHeroChange('subheadline', e.target.value)}
          placeholder="We turn your ideas into mobile apps for both iPhone and Android..."
          style={textareaStyle}
        />
      </div>

      {/* CTA Buttons & Trust Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <LinkIcon size={16} color="var(--brand-blue, #1833fe)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
            Action Button & Trust Text
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Primary Button Text</label>
            <input
              type="text"
              value={formData.hero?.primaryBtnText || ''}
              onChange={(e) => handleHeroChange('primaryBtnText', e.target.value)}
              placeholder="Start your app project"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Primary Button Link</label>
            <input
              type="text"
              value={formData.hero?.primaryBtnLink || ''}
              onChange={(e) => handleHeroChange('primaryBtnLink', e.target.value)}
              placeholder="/contact"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Client Trust Text</label>
            <input
              type="text"
              value={formData.hero?.trustText || ''}
              onChange={(e) => handleHeroChange('trustText', e.target.value)}
              placeholder="Trusted by 350+ businesses"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Hero Visual Mockups */}
      <div
        style={{
          backgroundColor: 'transparent',
          borderRadius: '0',
          border: 'none',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
          <ImageIcon size={18} color="var(--brand-blue, #1833fe)" />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              Hero Visual Mockups & Background
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Manage the 3D phone showcase graphics, floating app screenshots, and background banner.
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Top Floating Mockup 1 */}
          <ImageFieldWithUpload
            label="Top Phone Mockup (Graphic 1)"
            recommendedDimensions="800 × 800 px (1:1 Square / Transparent WebP)"
            value={formData.hero?.imageRightOne || ''}
            onChange={(url) => handleHeroChange('imageRightOne', url)}
            altValue={formData.hero?.imageRightOneAlt || ''}
            onAltChange={(alt) => handleHeroChange('imageRightOneAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('mobileApp.hero.imageRightOne') : undefined}
            uploadPrefix="mobile-hero-one"
            placeholder="/service-3-assets/...webp"
          />

          {/* Bottom Floating Mockup 2 */}
          <ImageFieldWithUpload
            label="Bottom Floating Phone (Graphic 2)"
            recommendedDimensions="800 × 800 px (1:1 Square / Transparent WebP)"
            value={formData.hero?.imageRightTwo || ''}
            onChange={(url) => handleHeroChange('imageRightTwo', url)}
            altValue={formData.hero?.imageRightTwoAlt || ''}
            onAltChange={(alt) => handleHeroChange('imageRightTwoAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('mobileApp.hero.imageRightTwo') : undefined}
            uploadPrefix="mobile-hero-two"
            placeholder="/service-3-assets/...webp"
          />

          {/* Hero Backdrop Banner */}
          <ImageFieldWithUpload
            label="Hero Backdrop Banner Graphic"
            recommendedDimensions="1200 × 800 px (Background Graphic)"
            value={formData.hero?.imageBanner || ''}
            onChange={(url) => handleHeroChange('imageBanner', url)}
            altValue={formData.hero?.imageBannerAlt || ''}
            onAltChange={(alt) => handleHeroChange('imageBannerAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('mobileApp.hero.imageBanner') : undefined}
            uploadPrefix="mobile-hero-banner"
            placeholder="/service-3-assets/...webp"
          />
        </div>
      </div>
    </div>
  );
}
