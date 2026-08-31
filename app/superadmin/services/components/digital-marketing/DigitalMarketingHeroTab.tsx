
'use client';

import React from 'react';
import { DigitalMarketingContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { LinkIcon, ImageIcon, PlusIcon, TrashIcon } from '../common/StandardSvgIcons';
import {
  standardAddButtonStyle,
  standardAddButtonHover,
  standardDeleteButtonStyle,
  standardDeleteButtonHover,
} from '../common/AdminButtonStyles';

interface DigitalMarketingHeroTabProps {
  formData: DigitalMarketingContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<DigitalMarketingContentDTO | null>>;
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

export default function DigitalMarketingHeroTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: DigitalMarketingHeroTabProps) {
  const hero = formData.hero || ({} as any);
  const images = hero.images || {};
  const logos = hero.marqueeLogos || [];

  const handleHeroChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, hero: { ...prev.hero, [field]: val } };
    });
  };

  const handleImageChange = (key: string, url: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          images: { ...prev.hero.images, [key]: url },
        },
      };
    });
  };

  const handleLogoChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.hero?.marqueeLogos || [])];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: val };
      }
      return {
        ...prev,
        hero: { ...prev.hero, marqueeLogos: copy },
      };
    });
  };

  const addLogo = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const newLogo = {
        id: `logo-${Date.now()}`,
        name: '',
        src: '',
      };
      const copy = [newLogo, ...(prev.hero?.marqueeLogos || [])];
      return {
        ...prev,
        hero: { ...prev.hero, marqueeLogos: copy },
      };
    });
  };

  const removeLogo = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.hero?.marqueeLogos || [])];
      copy.splice(index, 1);
      return {
        ...prev,
        hero: { ...prev.hero, marqueeLogos: copy },
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header Typography */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 16px 0',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '12px',
          }}
        >
          Hero Typography &amp; Badge
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Small Sub-Badge Pill</label>
            <input
              style={inputStyle}
              value={hero.subBadgeText || ''}
              onChange={(e) => handleHeroChange('subBadgeText', e.target.value)}
              placeholder="e.g. Digital Marketing"
            />
          </div>

          <div>
            <label style={labelStyle}>Main Headline (H1)</label>
            <input
              style={inputStyle}
              value={hero.headline || ''}
              onChange={(e) => handleHeroChange('headline', e.target.value)}
              placeholder="e.g. Get found online and turn visitors into customers"
            />
          </div>

          <div>
            <label style={labelStyle}>Subheadline / Supporting Narrative</label>
            <textarea
              style={{ ...textareaStyle, minHeight: '90px' }}
              value={hero.subheadline || ''}
              onChange={(e) => handleHeroChange('subheadline', e.target.value)}
              placeholder="Describe your growth marketing value proposition..."
            />
          </div>
        </div>
      </div>

      {/* 2. Call-to-Action Buttons */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 16px 0',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <LinkIcon style={{ width: '16px', height: '16px', color: '#6366F1' }} />
          Hero Action Buttons
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Primary CTA Text</label>
            <input
              style={inputStyle}
              value={hero.primaryBtnText || ''}
              onChange={(e) => handleHeroChange('primaryBtnText', e.target.value)}
              placeholder="e.g. Get a Free Strategy Call"
            />
          </div>
          <div>
            <label style={labelStyle}>Primary CTA Link</label>
            <input
              style={inputStyle}
              value={hero.primaryBtnLink || ''}
              onChange={(e) => handleHeroChange('primaryBtnLink', e.target.value)}
              placeholder="/contact"
            />
          </div>
          <div>
            <label style={labelStyle}>Secondary CTA Text</label>
            <input
              style={inputStyle}
              value={hero.secondaryBtnText || ''}
              onChange={(e) => handleHeroChange('secondaryBtnText', e.target.value)}
              placeholder="e.g. View our work"
            />
          </div>
          <div>
            <label style={labelStyle}>Secondary CTA Link</label>
            <input
              style={inputStyle}
              value={hero.secondaryBtnLink || ''}
              onChange={(e) => handleHeroChange('secondaryBtnLink', e.target.value)}
              placeholder="/contact"
            />
          </div>
        </div>
      </div>

      {/* 3. Hero Visual Assets */}
      <div
        style={{
          backgroundColor: 'transparent',
          borderRadius: '0',
          border: 'none',
          padding: '0',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 16px 0',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ImageIcon style={{ width: '16px', height: '16px', color: '#6366F1' }} />
          Hero Visual Media &amp; Backgrounds
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <ImageFieldWithUpload
            label="Hero Desktop Showcase Asset"
            value={images.heroMain || ''}
            onChange={(url) => handleImageChange('heroMain', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('digitalMarketing.hero.images.heroMain') : undefined}
          />
          <ImageFieldWithUpload
            label="Hero Mobile/Phone Floating Overlay"
            value={images.heroPhone || ''}
            onChange={(url) => handleImageChange('heroPhone', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('digitalMarketing.hero.images.heroPhone') : undefined}
          />
          <ImageFieldWithUpload
            label="Hero Background Texture Graphic"
            value={images.bg || ''}
            onChange={(url) => handleImageChange('bg', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('digitalMarketing.hero.images.bg') : undefined}
          />
        </div>
      </div>

      {/* 4. Marquee Partner Logos */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Marquee Partner Logos ({logos.length})
          </h3>
          <button
            type="button"
            onClick={addLogo}
            style={standardAddButtonStyle}
            {...standardAddButtonHover}
          >
            <PlusIcon style={{ width: '14px', height: '14px' }} />
            <span>Add Logo</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {logos.map((logo, idx) => (
            <div
              key={logo.id || idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr auto',
                gap: '12px',
                alignItems: 'center',
                backgroundColor: '#F8FAFC',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
              }}
            >
              <div>
                <label style={{ ...labelStyle, fontSize: '0.75rem' }}>Partner Name</label>
                <input
                  style={{ ...inputStyle, height: '36px' }}
                  value={logo.name || ''}
                  onChange={(e) => handleLogoChange(idx, 'name', e.target.value)}
                  placeholder="e.g. Rezota"
                />
              </div>
              <div>
                <ImageFieldWithUpload
                  label="Logo SVG/PNG Image"
                  value={logo.src || ''}
                  onChange={(url) => handleLogoChange(idx, 'src', url)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`digitalMarketing.hero.marqueeLogos.${idx}`) : undefined}
                />
              </div>
              <button
                type="button"
                onClick={() => removeLogo(idx)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #FCA5A5',
                  backgroundColor: '#FEF2F2',
                  color: '#EF4444',
                  cursor: 'pointer',
                  alignSelf: 'center',
                }}
                title="Remove Logo"
              >
                <TrashIcon style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
