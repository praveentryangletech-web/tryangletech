'use client';

import React from 'react';
import { CustomSoftwareContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { LinkIcon, ImageIcon, PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface CustomSoftwareHeroTabProps {
  formData: CustomSoftwareContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<CustomSoftwareContentDTO | null>>;
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

export default function CustomSoftwareHeroTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: CustomSoftwareHeroTabProps) {
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
          images: {
            ...prev.hero?.images,
            [key]: url,
          },
        },
      };
    });
  };

  const handleAddLogo = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const currentLogos = prev.hero?.marqueeLogos || [];
      return {
        ...prev,
        hero: {
          ...prev.hero,
          marqueeLogos: [
            ...currentLogos,
            { src: '/service-2-assets/68ef27127d946b9cb9fdcbce_logo.svg', alt: 'Client Logo', width: 150, height: 60 },
          ],
        },
      };
    });
  };

  const handleUpdateLogo = (idx: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.hero?.marqueeLogos || [])];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, hero: { ...prev.hero, marqueeLogos: copy } };
    });
  };

  const handleRemoveLogo = (idx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.hero?.marqueeLogos || [])];
      copy.splice(idx, 1);
      return { ...prev, hero: { ...prev.hero, marqueeLogos: copy } };
    });
  };

  return (
    <div style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header & Text Content */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          Hero Headline & Text
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Sub-Badge Text</label>
            <input
              type="text"
              style={inputStyle}
              value={hero.subBadgeText || ''}
              onChange={(e) => handleHeroChange('subBadgeText', e.target.value)}
              placeholder="e.g. Custom Software Development"
            />
          </div>

          <div>
            <label style={labelStyle}>Main Headline (H1)</label>
            <input
              type="text"
              style={inputStyle}
              value={hero.headline || ''}
              onChange={(e) => handleHeroChange('headline', e.target.value)}
              placeholder="e.g. We build software that fits your business exactly the way it is"
            />
          </div>

          <div>
            <label style={labelStyle}>Subheadline / Supporting Description</label>
            <textarea
              rows={3}
              style={textareaStyle}
              value={hero.subheadline || ''}
              onChange={(e) => handleHeroChange('subheadline', e.target.value)}
              placeholder="Detailed introduction text..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
          <div>
            <label style={labelStyle}>Primary Button Label</label>
            <input
              type="text"
              style={inputStyle}
              value={hero.primaryBtnText || ''}
              onChange={(e) => handleHeroChange('primaryBtnText', e.target.value)}
              placeholder="Get started today"
            />
          </div>
          <div>
            <label style={labelStyle}>Primary Button Destination</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                style={inputStyle}
                value={hero.primaryBtnLink || ''}
                onChange={(e) => handleHeroChange('primaryBtnLink', e.target.value)}
                placeholder="/about"
              />
              <span style={{ position: 'absolute', right: '12px', top: '13px', color: '#94A3B8' }}><LinkIcon /></span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Secondary Button Label</label>
            <input
              type="text"
              style={inputStyle}
              value={hero.secondaryBtnText || ''}
              onChange={(e) => handleHeroChange('secondaryBtnText', e.target.value)}
              placeholder="View pricing"
            />
          </div>
          <div>
            <label style={labelStyle}>Secondary Button Destination</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                style={inputStyle}
                value={hero.secondaryBtnLink || ''}
                onChange={(e) => handleHeroChange('secondaryBtnLink', e.target.value)}
                placeholder="/pricing"
              />
              <span style={{ position: 'absolute', right: '12px', top: '13px', color: '#94A3B8' }}><LinkIcon /></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Graphic Slots */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon /> Hero Visual Graphics
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Hero Main Screen (hero-2)</label>
            <ImageFieldWithUpload
              label=""
              value={images.hero2 || ''}
              onChange={(url) => handleImageChange('hero2', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.hero2') : undefined}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Left Floating (hero-1)</label>
            <ImageFieldWithUpload
              label=""
              value={images.hero1 || ''}
              onChange={(url) => handleImageChange('hero1', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.hero1') : undefined}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Bottom Banner</label>
            <ImageFieldWithUpload
              label=""
              value={images.heroBannerBottom || ''}
              onChange={(url) => handleImageChange('heroBannerBottom', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.heroBannerBottom') : undefined}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Dashboard UI (hero-8)</label>
            <ImageFieldWithUpload
              label=""
              value={images.hero8 || ''}
              onChange={(url) => handleImageChange('hero8', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.hero8') : undefined}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Data Analytics (hero-7)</label>
            <ImageFieldWithUpload
              label=""
              value={images.hero7 || ''}
              onChange={(url) => handleImageChange('hero7', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.hero7') : undefined}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Workflow UI (hero-6)</label>
            <ImageFieldWithUpload
              label=""
              value={images.hero6 || ''}
              onChange={(url) => handleImageChange('hero6', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.hero6') : undefined}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Metrics Widget (hero-9)</label>
            <ImageFieldWithUpload
              label=""
              value={images.hero9 || ''}
              onChange={(url) => handleImageChange('hero9', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.hero9') : undefined}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Floating Badge (Round)</label>
            <ImageFieldWithUpload
              label=""
              value={images.heroRound || ''}
              onChange={(url) => handleImageChange('heroRound', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.heroRound') : undefined}
            />
          </div>
          <div>
            <label style={labelStyle}>Hero Background Glow (bg)</label>
            <ImageFieldWithUpload
              label=""
              value={images.bg || ''}
              onChange={(url) => handleImageChange('bg', url)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.hero.images.bg') : undefined}
            />
          </div>
        </div>
      </div>

      {/* 3. Marquee Partner Logos */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Client & Partner Logos (Marquee)</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748B' }}>Logos animated in continuous train below the hero</p>
          </div>
          <button
            type="button"
            onClick={handleAddLogo}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <PlusIcon /> Add Logo
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {logos.map((logo, idx) => (
            <div key={idx} style={{ padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Logo #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLogo(idx)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                >
                  <TrashIcon />
                </button>
              </div>
              <ImageFieldWithUpload
                label="Logo SVG / PNG"
                value={logo.src}
                onChange={(url) => handleUpdateLogo(idx, 'src', url)}
                onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`customSoftware.hero.marqueeLogos.${idx}.src`) : undefined}
              />
              <input
                type="text"
                style={inputStyle}
                value={logo.alt || ''}
                onChange={(e) => handleUpdateLogo(idx, 'alt', e.target.value)}
                placeholder="Alt description"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
