'use client';

import React from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';
import { ImageFieldWithUpload } from '../common';

interface GraphicsDesigningAboutTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
  onOpenAssetPicker?: (target: string) => void;
}

export default function GraphicsDesigningAboutTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: GraphicsDesigningAboutTabProps) {
  const about = formData?.about || ({} as any);

  const updateAboutField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev?.about,
        [field]: value,
      },
    }));
  };

  const updateFeatureField = (index: number, field: string, value: any) => {
    const features = [...(about?.features || [])];
    if (features[index]) {
      features[index] = { ...features[index], [field]: value };
      updateAboutField('features', features);
    }
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
      {/* 1. Header Typography & Narrative */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          1. Why Choose Us Header &amp; Narrative
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Category Sub-Badge</label>
            <input
              type="text"
              value={about.subBadgeText || ''}
              onChange={(e) => updateAboutField('subBadgeText', e.target.value)}
              placeholder="e.g. Why choose us for design"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              type="text"
              value={about.headline || ''}
              onChange={(e) => updateAboutField('headline', e.target.value)}
              placeholder="Design that speaks before your business says a word"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <label style={labelStyle}>Section Description</label>
          <textarea
            rows={3}
            value={about.description || ''}
            onChange={(e) => updateAboutField('description', e.target.value)}
            placeholder="Describe the philosophy and quality commitment..."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
      </div>

      {/* 2. Left Visual Upload & CTA */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          2. Left Showcase Graphic &amp; CTA Button
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
          <ImageFieldWithUpload
            label="Left Showcase Graphic"
            value={about.image || ''}
            onChange={(val) => updateAboutField('image', val)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.about.image') : undefined}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={labelStyle}>Action Button</label>
            <input
              type="text"
              value={about.buttonText || ''}
              onChange={(e) => updateAboutField('buttonText', e.target.value)}
              placeholder="Get started today"
              style={inputStyle}
            />
            <input
              type="text"
              value={about.buttonLink || ''}
              onChange={(e) => updateAboutField('buttonLink', e.target.value)}
              placeholder="/contact"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* 3. Feature Highlights */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          3. Core Value Pillars (2 Features)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {(about.features || []).map((feat: any, idx: number) => (
            <div
              key={feat.id || idx}
              style={{
                padding: '0',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '12px' }}>
                Pillar #{idx + 1}
              </span>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Pillar Title</label>
                <input
                  type="text"
                  value={feat.title || ''}
                  onChange={(e) => updateFeatureField(idx, 'title', e.target.value)}
                  placeholder="e.g. 100% Custom & Original Designs"
                  style={{ ...inputStyle, fontWeight: 700 }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Pillar Description</label>
                <textarea
                  rows={2}
                  value={feat.desc || ''}
                  onChange={(e) => updateFeatureField(idx, 'desc', e.target.value)}
                  placeholder="Explain this guarantee..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <ImageFieldWithUpload
                label="Icon SVG"
                value={feat.icon || ''}
                onChange={(val) => updateFeatureField(idx, 'icon', val)}
                onOpenLibrary={
                  onOpenAssetPicker ? () => onOpenAssetPicker(`graphicsDesigning.about.features.${idx}`) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
