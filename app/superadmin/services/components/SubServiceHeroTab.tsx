'use client';

import React from 'react';
import { WebDevContentDTO, WebDevHeroBullet } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from './ImageFieldWithUpload';
import CustomDropdown, { DropdownOption } from '@/app/superadmin/components/CustomDropdown';

const ICON_OPTIONS: DropdownOption<string>[] = [
  { value: 'performance', label: '⚡ Performance' },
  { value: 'seo', label: '🔍 Search / SEO' },
  { value: 'responsive', label: '📱 Responsive' },
  { value: 'security', label: '🛡️ Security' },
  { value: 'analytics', label: '📊 Analytics' },
  { value: 'support', label: '💬 Support' },
  { value: 'custom', label: '★ Star / Quality' },
];

interface SubServiceHeroTabProps {
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

const renderStandardSvg = (iconType?: string, color = '#1833fe') => {
  switch (iconType) {
    case 'performance':
    case 'speed':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'seo':
    case 'search':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 'responsive':
    case 'mobile':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'security':
    case 'shield':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'analytics':
    case 'growth':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'support':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'custom':
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
  }
};

export default function SubServiceHeroTab({ formData, setFormData, onOpenAssetPicker }: SubServiceHeroTabProps) {
  const handleHeroChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, hero: { ...prev.hero, [field]: val } };
    });
  };

  const handleHeroBulletChange = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const bullets = [...prev.hero.bullets];
      bullets[index] = { ...bullets[index], [field]: val };
      return { ...prev, hero: { ...prev.hero, bullets } };
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
            Configure the main above-the-fold headline, introduction paragraph, bullet highlights, action buttons, and visual assets.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '4px 10px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Above the Fold
        </span>
      </div>

      {/* Sub Badge & Main Headline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Overtitle / Sub-Badge Text</label>
          <input
            type="text"
            value={formData.hero.subBadgeText || ''}
            onChange={(e) => handleHeroChange('subBadgeText', e.target.value)}
            placeholder="e.g. Web Development"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Hero Main Headline *</label>
          <input
            type="text"
            value={formData.hero.headline || ''}
            onChange={(e) => handleHeroChange('headline', e.target.value)}
            placeholder="Websites that bring in customers, not just look nice"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Hero Subheadline */}
      <div>
        <label style={labelStyle}>Hero Subheadline / Value Pitch *</label>
        <textarea
          rows={3}
          value={formData.hero.subheadline || ''}
          onChange={(e) => handleHeroChange('subheadline', e.target.value)}
          placeholder="Detailed value proposition paragraph..."
          style={textareaStyle}
        />
      </div>

      {/* Key Benefit Highlight Bullets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{ color: 'var(--brand-blue, #1833fe)', display: 'inline-flex' }}>
            {renderStandardSvg('performance', '#1833fe')}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Key Benefit Bullets (3 Items)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {(formData.hero.bullets || []).map((bullet, idx) => (
            <div
              key={bullet.id || idx}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {renderStandardSvg(bullet.iconType, '#1833fe')}
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                    Bullet #{idx + 1}
                  </span>
                </div>

                <CustomDropdown
                  value={bullet.iconType || 'performance'}
                  options={ICON_OPTIONS}
                  onChange={(val) => handleHeroBulletChange(idx, 'iconType', val)}
                  direction="down"
                  size="sm"
                  buttonStyle={{
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.785rem',
                    fontWeight: 700,
                    minWidth: '150px',
                  }}
                />
              </div>

              <div>
                <label style={{ ...labelStyle, fontSize: '0.75rem' }}>Bullet Title</label>
                <input
                  type="text"
                  placeholder="Fast and reliable"
                  value={bullet.title || ''}
                  onChange={(e) => handleHeroBulletChange(idx, 'title', e.target.value)}
                  style={{ ...inputStyle, height: '36px', fontSize: '0.825rem' }}
                />
              </div>

              <div>
                <label style={{ ...labelStyle, fontSize: '0.75rem' }}>Short Description</label>
                <textarea
                  rows={2}
                  placeholder="Your website loads quickly on any device..."
                  value={bullet.desc}
                  onChange={(e) => handleHeroBulletChange(idx, 'desc', e.target.value)}
                  style={{ ...textareaStyle, fontSize: '0.825rem', padding: '8px 12px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons & Badges */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{ color: 'var(--brand-blue, #1833fe)', fontSize: '1rem' }}>🔗</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Call-To-Action (CTA) Buttons & Badge</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Primary Button Text</label>
            <input
              type="text"
              value={formData.hero.primaryBtnText || ''}
              onChange={(e) => handleHeroChange('primaryBtnText', e.target.value)}
              placeholder="Get started today"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Primary Button Target URL</label>
            <input
              type="text"
              value={formData.hero.primaryBtnLink || ''}
              onChange={(e) => handleHeroChange('primaryBtnLink', e.target.value)}
              placeholder="/contact"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Floating Pill Badge Text</label>
            <input
              type="text"
              value={formData.hero.smallBadgeText || ''}
              onChange={(e) => handleHeroChange('smallBadgeText', e.target.value)}
              placeholder="Built for you"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Hero Visual Assets & Alt Text */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <span style={{ color: 'var(--brand-blue, #1833fe)', fontSize: '1.1rem' }}>🖼️</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>Hero Visual Assets & Accessibility (Alt Text)</div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Configure floating showcase graphics, hero background banner, and their descriptive alt attributes.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* 1. Hero Right Graphic 1 */}
          <ImageFieldWithUpload
            label="Top Floating Graphic (Graphic 1)"
            recommendedDimensions="800 × 800 px (1:1 Square)"
            value={formData.hero.imageRightOne || ''}
            onChange={(url) => handleHeroChange('imageRightOne', url)}
            altValue={formData.hero.imageRightOneAlt || ''}
            onAltChange={(alt) => handleHeroChange('imageRightOneAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('subService.hero.imageRightOne') : undefined}
            uploadPrefix="hero-graphic1"
            placeholder="/service-1-assets/...webp"
          />

          {/* 2. Hero Right Graphic 2 */}
          <ImageFieldWithUpload
            label="Bottom Floating Screenshot (Graphic 2)"
            recommendedDimensions="800 × 600 px (4:3 Rect)"
            value={formData.hero.imageRightTwo || ''}
            onChange={(url) => handleHeroChange('imageRightTwo', url)}
            altValue={formData.hero.imageRightTwoAlt || ''}
            onAltChange={(alt) => handleHeroChange('imageRightTwoAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('subService.hero.imageRightTwo') : undefined}
            uploadPrefix="hero-graphic2"
            placeholder="/service-1-assets/...avif"
          />

          {/* 3. Hero Backdrop Banner */}
          <ImageFieldWithUpload
            label="Backdrop Banner Graphic"
            recommendedDimensions="1920 × 1080 px (16:9 Banner)"
            value={formData.hero.imageBanner || ''}
            onChange={(url) => handleHeroChange('imageBanner', url)}
            altValue={formData.hero.imageBannerAlt || ''}
            onAltChange={(alt) => handleHeroChange('imageBannerAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('subService.hero.imageBanner') : undefined}
            uploadPrefix="hero-banner"
            placeholder="/service-1-assets/...webp"
          />

          {/* 4. Decorative Dot Overlay */}
          <ImageFieldWithUpload
            label="Decorative Dot Overlay"
            recommendedDimensions="800 × 800 px (Pattern/Dot)"
            value={formData.hero.imageDot || ''}
            onChange={(url) => handleHeroChange('imageDot', url)}
            altValue={formData.hero.imageDotAlt || ''}
            onAltChange={(alt) => handleHeroChange('imageDotAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('subService.hero.imageDot') : undefined}
            uploadPrefix="hero-dot"
            placeholder="/service-1-assets/...webp"
          />
        </div>
      </div>
    </div>
  );
}
