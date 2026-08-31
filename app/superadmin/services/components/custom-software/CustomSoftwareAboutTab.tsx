'use client';

import React from 'react';
import { CustomSoftwareContentDTO, CustomSoftwareAboutFeature } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { PlusIcon, TrashIcon, LinkIcon, ImageIcon } from '../common/StandardSvgIcons';

interface CustomSoftwareAboutTabProps {
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

export default function CustomSoftwareAboutTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: CustomSoftwareAboutTabProps) {
  const about = formData.about || ({} as any);
  const features = about.features || [];

  const handleAboutChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, about: { ...prev.about, [field]: val } };
    });
  };

  const handleAddFeature = () => {
    const newFeature: CustomSoftwareAboutFeature = {
      id: `feat-${Date.now()}`,
      title: 'New Value Proposition',
      desc: 'Detail why enterprise businesses trust your team with custom software.',
      icon: '/service-2-assets/6916f191d4b3b4e4b2cee5b2_Vector (35).svg',
    };
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        about: {
          ...prev.about,
          features: [...(prev.about?.features || []), newFeature],
        },
      };
    });
  };

  const handleUpdateFeature = (idx: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.about?.features || [])];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, about: { ...prev.about, features: copy } };
    });
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.about?.features || [])];
      copy.splice(idx, 1);
      return { ...prev, about: { ...prev.about, features: copy } };
    });
  };

  return (
    <div style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header & Text Content */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          Why Choose Us / About Section
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Sub-Badge Text</label>
            <input
              type="text"
              style={inputStyle}
              value={about.subBadgeText || ''}
              onChange={(e) => handleAboutChange('subBadgeText', e.target.value)}
              placeholder="Why choose us for software"
            />
          </div>

          <div>
            <label style={labelStyle}>Section Heading</label>
            <input
              type="text"
              style={inputStyle}
              value={about.headline || ''}
              onChange={(e) => handleAboutChange('headline', e.target.value)}
              placeholder="Software that solves real problems and keeps growing with you"
            />
          </div>

          <div>
            <label style={labelStyle}>Description Paragraph</label>
            <textarea
              rows={3}
              style={textareaStyle}
              value={about.description || ''}
              onChange={(e) => handleAboutChange('description', e.target.value)}
              placeholder="We take the time to understand your business properly..."
            />
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
          <div>
            <label style={labelStyle}>Button Label</label>
            <input
              type="text"
              style={inputStyle}
              value={about.buttonText || ''}
              onChange={(e) => handleAboutChange('buttonText', e.target.value)}
              placeholder="Get started today"
            />
          </div>
          <div>
            <label style={labelStyle}>Button Destination</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                style={inputStyle}
                value={about.buttonLink || ''}
                onChange={(e) => handleAboutChange('buttonLink', e.target.value)}
                placeholder="/contact"
              />
              <span style={{ position: 'absolute', right: '12px', top: '13px', color: '#94A3B8' }}><LinkIcon /></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Artwork */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon /> Left Column Visual Banner
        </h3>

        <div style={{ maxWidth: '400px' }}>
          <ImageFieldWithUpload
            label="Visual Showcase Graphic"
            value={about.image || ''}
            onChange={(url) => handleAboutChange('image', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.about.image') : undefined}
          />
        </div>
      </div>

      {/* 3. Feature Value Proposition Cards */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Key Value Highlights ({features.length})</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748B' }}>Feature items with icons and descriptions</p>
          </div>
          <button
            type="button"
            onClick={handleAddFeature}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <PlusIcon /> Add Highlight
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {features.map((feat, idx) => (
            <div key={feat.id || idx} style={{ padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>Feature #{idx + 1} — {feat.title || 'Untitled'}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                >
                  <TrashIcon />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px' }}>
                <ImageFieldWithUpload
                  label="Icon SVG"
                  value={feat.icon}
                  onChange={(url) => handleUpdateFeature(idx, 'icon', url)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`customSoftware.about.features.${idx}.icon`) : undefined}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Feature Title</label>
                    <input
                      type="text"
                      style={inputStyle}
                      value={feat.title}
                      onChange={(e) => handleUpdateFeature(idx, 'title', e.target.value)}
                      placeholder="e.g. Fully custom and built for you"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Feature Description</label>
                    <textarea
                      rows={2}
                      style={textareaStyle}
                      value={feat.desc}
                      onChange={(e) => handleUpdateFeature(idx, 'desc', e.target.value)}
                      placeholder="Explain this value proposition..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
