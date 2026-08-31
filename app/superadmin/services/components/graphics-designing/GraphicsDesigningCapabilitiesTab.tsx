'use client';

import React from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';
import { ImageFieldWithUpload } from '../common';

interface GraphicsDesigningCapabilitiesTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
  onOpenAssetPicker?: (target: string) => void;
}

export default function GraphicsDesigningCapabilitiesTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: GraphicsDesigningCapabilitiesTabProps) {
  const capabilities = formData?.capabilities || ({} as any);

  const updateCapabilitiesHeader = (field: 'subBadgeText' | 'headline' | 'description', value: string) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: {
        ...prev?.capabilities,
        [field]: value,
      },
    }));
  };

  const updateCapabilityItem = (index: number, field: string, value: any) => {
    const items = [...(capabilities?.items || [])];
    if (items[index]) {
      items[index] = { ...items[index], [field]: value };
      setFormData((prev) => ({
        ...prev,
        capabilities: {
          ...prev?.capabilities,
          items,
        },
      }));
    }
  };

  const updatePreviewImage = (index: number, value: string) => {
    const previewImages = [...(capabilities?.previewImages || [])];
    previewImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      capabilities: {
        ...prev?.capabilities,
        previewImages,
      },
    }));
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
          1. Capabilities Section Header &amp; Narrative
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Category Sub-Badge</label>
            <input
              type="text"
              value={capabilities.subBadgeText || ''}
              onChange={(e) => updateCapabilitiesHeader('subBadgeText', e.target.value)}
              placeholder="e.g. our services"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              type="text"
              value={capabilities.headline || ''}
              onChange={(e) => updateCapabilitiesHeader('headline', e.target.value)}
              placeholder="Everything you need to build a powerful visual brand"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <label style={labelStyle}>Section Description</label>
          <textarea
            rows={3}
            value={capabilities.description || ''}
            onChange={(e) => updateCapabilitiesHeader('description', e.target.value)}
            placeholder="Describe the end-to-end visual capabilities..."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
      </div>

      {/* 2. Visual Capability Items */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
          2. Visual Branding Capabilities (4 Left Tab Items)
        </h3>
        <p style={{ fontSize: '0.825rem', color: '#64748B', marginBottom: '16px' }}>
          Manage the 4 interactive service layers (Social Media, Video Editing, Branding, Exhibition Banner).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {(capabilities.items || []).map((item: any, idx: number) => (
            <div
              key={item.id || idx}
              style={{
                padding: '16px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '12px' }}>
                Capability #{idx + 1}
              </span>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateCapabilityItem(idx, 'title', e.target.value)}
                  placeholder="e.g. Social Media Creation"
                  style={{ ...inputStyle, fontWeight: 700 }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows={3}
                  value={item.desc || ''}
                  onChange={(e) => updateCapabilityItem(idx, 'desc', e.target.value)}
                  placeholder="Describe this service offering..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <ImageFieldWithUpload
                label="Icon SVG"
                value={item.icon || ''}
                onChange={(val) => updateCapabilityItem(idx, 'icon', val)}
                onOpenLibrary={
                  onOpenAssetPicker ? () => onOpenAssetPicker(`graphicsDesigning.capabilities.items.${idx}`) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Right Interactive Layer Preview Graphics */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
          3. Right Interactive Preview Graphics (4 Layers)
        </h3>
        <p style={{ fontSize: '0.825rem', color: '#64748B', marginBottom: '16px' }}>
          Upload high-fidelity mockup renders displayed on the right column of the capabilities section.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <ImageFieldWithUpload
            label="Layer 1 - Service Preview"
            value={capabilities.previewImages?.[0] || ''}
            onChange={(val) => updatePreviewImage(0, val)}
            onOpenLibrary={
              onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.capabilities.previewImages.0') : undefined
            }
          />
          <ImageFieldWithUpload
            label="Layer 2 - Task Mockup"
            value={capabilities.previewImages?.[1] || ''}
            onChange={(val) => updatePreviewImage(1, val)}
            onOpenLibrary={
              onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.capabilities.previewImages.1') : undefined
            }
          />
          <ImageFieldWithUpload
            label="Layer 3 - Dashboard Preview"
            value={capabilities.previewImages?.[2] || ''}
            onChange={(val) => updatePreviewImage(2, val)}
            onOpenLibrary={
              onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.capabilities.previewImages.2') : undefined
            }
          />
          <ImageFieldWithUpload
            label="Layer 4 - Mobile Showcase"
            value={capabilities.previewImages?.[3] || ''}
            onChange={(val) => updatePreviewImage(3, val)}
            onOpenLibrary={
              onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.capabilities.previewImages.3') : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
