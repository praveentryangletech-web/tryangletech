'use client';

import React from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';
import { ImageFieldWithUpload } from '../common';

interface GraphicsDesigningHeroTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
  onOpenAssetPicker?: (target: string) => void;
}

export default function GraphicsDesigningHeroTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: GraphicsDesigningHeroTabProps) {
  const hero = formData?.hero || ({} as any);

  const updateHeroField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev?.hero,
        [field]: value,
      },
    }));
  };

  const updateHeroImage = (imageKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev?.hero,
        images: {
          ...prev?.hero?.images,
          [imageKey]: value,
        },
      },
    }));
  };

  const updateStatItem = (index: number, field: 'value' | 'label', value: string) => {
    const stats = [...(hero?.stats || [])];
    if (stats[index]) {
      stats[index] = { ...stats[index], [field]: value };
      updateHeroField('stats', stats);
    }
  };

  const addMarqueeLogo = () => {
    const logos = [...(hero?.marqueeLogos || [])];
    logos.push({
      id: `logo-${Date.now()}`,
      name: 'New Client Partner',
      src: '/service-2-assets/68ef27127d946b9cb9fdcbce_logo.svg',
    });
    updateHeroField('marqueeLogos', logos);
  };

  const updateMarqueeLogo = (index: number, field: 'name' | 'src', value: string) => {
    const logos = [...(hero?.marqueeLogos || [])];
    if (logos[index]) {
      logos[index] = { ...logos[index], [field]: value };
      updateHeroField('marqueeLogos', logos);
    }
  };

  const removeMarqueeLogo = (index: number) => {
    const logos = [...(hero?.marqueeLogos || [])].filter((_, i) => i !== index);
    updateHeroField('marqueeLogos', logos);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    fontSize: '0.875rem',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Typography */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          1. Hero Header &amp; Branding Badges
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Live Studio Pill Tag</label>
            <input
              type="text"
              value={hero.badgePillText || ''}
              onChange={(e) => updateHeroField('badgePillText', e.target.value)}
              placeholder="e.g. Creative Studio · Ahmedabad"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Category Sub-Badge</label>
            <input
              type="text"
              value={hero.subBadgeText || ''}
              onChange={(e) => updateHeroField('subBadgeText', e.target.value)}
              placeholder="e.g. Graphic Design Services"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginTop: '16px' }}>
          <div>
            <label style={labelStyle}>Primary Headline</label>
            <input
              type="text"
              value={hero.headline || ''}
              onChange={(e) => updateHeroField('headline', e.target.value)}
              placeholder="Designs that make your brand"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Headline Gradient Highlight</label>
            <input
              type="text"
              value={hero.headlineHighlight || ''}
              onChange={(e) => updateHeroField('headlineHighlight', e.target.value)}
              placeholder="impossible to ignore"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <label style={labelStyle}>Subheadline Narrative</label>
          <textarea
            rows={3}
            value={hero.subheadline || ''}
            onChange={(e) => updateHeroField('subheadline', e.target.value)}
            placeholder="Describe the design value proposition..."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
      </div>

      {/* 2. Call To Action Buttons */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          2. Call-To-Action (CTA) Links
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ ...labelStyle, color: 'var(--brand-blue, #1833fe)' }}>Primary CTA Button</label>
            <input
              type="text"
              value={hero.primaryBtnText || ''}
              onChange={(e) => updateHeroField('primaryBtnText', e.target.value)}
              placeholder="Start your project"
              style={inputStyle}
            />
            <input
              type="text"
              value={hero.primaryBtnLink || ''}
              onChange={(e) => updateHeroField('primaryBtnLink', e.target.value)}
              placeholder="/contact"
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ ...labelStyle, color: '#64748B' }}>Secondary CTA Button</label>
            <input
              type="text"
              value={hero.secondaryBtnText || ''}
              onChange={(e) => updateHeroField('secondaryBtnText', e.target.value)}
              placeholder="View our work"
              style={inputStyle}
            />
            <input
              type="text"
              value={hero.secondaryBtnLink || ''}
              onChange={(e) => updateHeroField('secondaryBtnLink', e.target.value)}
              placeholder="/portfolio"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* 3. Hero Quick Stats Row */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          3. Hero Quick Stats Counters
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {(hero.stats || []).map((stat: any, idx: number) => (
            <div key={idx} style={{ padding: '0', border: 'none', borderRadius: '0', backgroundColor: 'transparent' }}>
              <label style={labelStyle}>Counter #{idx + 1}</label>
              <input
                type="text"
                value={stat.value || ''}
                onChange={(e) => updateStatItem(idx, 'value', e.target.value)}
                placeholder="500+"
                style={{ ...inputStyle, marginBottom: '8px', fontWeight: 800 }}
              />
              <input
                type="text"
                value={stat.label || ''}
                onChange={(e) => updateStatItem(idx, 'label', e.target.value)}
                placeholder="Projects Delivered"
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Animated Portfolio Image Grid Slots */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
          4. Hero Portfolio Visual Grid (5 Columns)
        </h3>
        <p style={{ fontSize: '0.825rem', color: '#64748B', marginBottom: '16px' }}>
          Upload or select high-resolution mockup visuals for each column in the dynamic floating hero showcase.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          <ImageFieldWithUpload
            label="Col 1 - Top Artwork"
            value={hero.images?.col1Img1 || ''}
            onChange={(val) => updateHeroImage('col1Img1', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col1Img1') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 1 - Bottom Artwork"
            value={hero.images?.col1Img2 || ''}
            onChange={(val) => updateHeroImage('col1Img2', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col1Img2') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 2 - Top Artwork"
            value={hero.images?.col2Img1 || ''}
            onChange={(val) => updateHeroImage('col2Img1', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col2Img1') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 2 - Bottom Artwork"
            value={hero.images?.col2Img2 || ''}
            onChange={(val) => updateHeroImage('col2Img2', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col2Img2') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 3 - Top Artwork"
            value={hero.images?.col3Img1 || ''}
            onChange={(val) => updateHeroImage('col3Img1', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col3Img1') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 3 - Bottom Artwork"
            value={hero.images?.col3Img2 || ''}
            onChange={(val) => updateHeroImage('col3Img2', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col3Img2') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 4 - Top Artwork"
            value={hero.images?.col4Img1 || ''}
            onChange={(val) => updateHeroImage('col4Img1', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col4Img1') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 4 - Bottom Artwork"
            value={hero.images?.col4Img2 || ''}
            onChange={(val) => updateHeroImage('col4Img2', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col4Img2') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 4 - Floating Round Badge"
            value={hero.images?.col4Badge || ''}
            onChange={(val) => updateHeroImage('col4Badge', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col4Badge') : undefined}
          />
          <ImageFieldWithUpload
            label="Hero Atmospheric Background"
            value={hero.images?.bgImage || ''}
            onChange={(val) => updateHeroImage('bgImage', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.bgImage') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 5 - Top Artwork"
            value={hero.images?.col5Img1 || ''}
            onChange={(val) => updateHeroImage('col5Img1', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col5Img1') : undefined}
          />
          <ImageFieldWithUpload
            label="Col 5 - Bottom Artwork"
            value={hero.images?.col5Img2 || ''}
            onChange={(val) => updateHeroImage('col5Img2', val)}
            previewHeight={90}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.hero.images.col5Img2') : undefined}
          />
        </div>
      </div>

      {/* 5. Marquee Partner Logos */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              5. Marquee Partner Logos ({hero.marqueeLogos?.length || 0})
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0 0' }}>
              Looping client trust logos displayed directly beneath the hero visual showcase.
            </p>
          </div>
          <button
            type="button"
            onClick={addMarqueeLogo}
            style={{
              padding: '6px 14px',
              backgroundColor: '#EFF6FF',
              color: 'var(--brand-blue, #1833fe)',
              border: '1px solid #BFDBFE',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Add Partner Logo
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {(hero.marqueeLogos || []).map((logo: any, idx: number) => (
            <div
              key={logo.id || idx}
              style={{
                padding: '0',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>Logo #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeMarqueeLogo(idx)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#EF4444',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>

              <div>
                <label style={labelStyle}>Partner Name / Alt</label>
                <input
                  type="text"
                  value={logo.name || ''}
                  onChange={(e) => updateMarqueeLogo(idx, 'name', e.target.value)}
                  placeholder="e.g. Tattvam Arts"
                  style={inputStyle}
                />
              </div>

              <ImageFieldWithUpload
                label="Logo SVG / PNG"
                value={logo.src || ''}
                onChange={(val) => updateMarqueeLogo(idx, 'src', val)}
                previewHeight={70}
                recommendedDimensions="400 × 200 px"
                onOpenLibrary={
                  onOpenAssetPicker ? () => onOpenAssetPicker(`graphicsDesigning.hero.marqueeLogos.${idx}`) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
