'use client';

import React from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';
import { ImageFieldWithUpload } from '../common';

interface GraphicsDesigningCoreTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
  onOpenAssetPicker?: (target: string) => void;
}

export default function GraphicsDesigningCoreTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: GraphicsDesigningCoreTabProps) {
  const core = formData?.core || ({} as any);

  const updateCoreField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      core: {
        ...prev?.core,
        [field]: value,
      },
    }));
  };

  const updatePointField = (index: number, field: string, value: any) => {
    const points = [...(core?.points || [])];
    if (points[index]) {
      points[index] = { ...points[index], [field]: value };
      updateCoreField('points', points);
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
          1. Creative Excellence Header &amp; Narrative
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Category Sub-Badge</label>
            <input
              type="text"
              value={core.subBadgeText || ''}
              onChange={(e) => updateCoreField('subBadgeText', e.target.value)}
              placeholder="e.g. creative excellence"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              type="text"
              value={core.headline || ''}
              onChange={(e) => updateCoreField('headline', e.target.value)}
              placeholder="Great design is the silent ambassador of your brand"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <label style={labelStyle}>Section Description</label>
          <textarea
            rows={3}
            value={core.description || ''}
            onChange={(e) => updateCoreField('description', e.target.value)}
            placeholder="Describe the creative excellence and brand impression..."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
      </div>

      {/* 2. Right Visual & CTA Button */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          2. Right Showcase Graphic &amp; CTA Button
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
          <ImageFieldWithUpload
            label="Right Showcase Graphic"
            value={core.rightImage || ''}
            onChange={(val) => updateCoreField('rightImage', val)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.core.rightImage') : undefined}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={labelStyle}>Action Button</label>
            <input
              type="text"
              value={core.buttonText || ''}
              onChange={(e) => updateCoreField('buttonText', e.target.value)}
              placeholder="Explore benefits"
              style={inputStyle}
            />
            <input
              type="text"
              value={core.buttonLink || ''}
              onChange={(e) => updateCoreField('buttonLink', e.target.value)}
              placeholder="/about"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* 3. Core Philosophy Points */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          3. Core Philosophy Points (2 Items)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {(core.points || []).map((point: any, idx: number) => (
            <div
              key={point.id || idx}
              style={{
                padding: '16px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '12px' }}>
                Point #{idx + 1}
              </span>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Point Title</label>
                <input
                  type="text"
                  value={point.title || ''}
                  onChange={(e) => updatePointField(idx, 'title', e.target.value)}
                  placeholder="e.g. Purpose-Driven Design"
                  style={{ ...inputStyle, fontWeight: 700 }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Point Description</label>
                <textarea
                  rows={2}
                  value={point.desc || ''}
                  onChange={(e) => updatePointField(idx, 'desc', e.target.value)}
                  placeholder="Explain this design philosophy..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <ImageFieldWithUpload
                label="Icon SVG"
                value={point.icon || ''}
                onChange={(val) => updatePointField(idx, 'icon', val)}
                onOpenLibrary={
                  onOpenAssetPicker ? () => onOpenAssetPicker(`graphicsDesigning.core.points.${idx}`) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
