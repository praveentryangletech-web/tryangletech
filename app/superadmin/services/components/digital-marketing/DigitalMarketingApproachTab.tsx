'use client';

import React from 'react';
import { DigitalMarketingContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { LinkIcon, ImageIcon, PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface DigitalMarketingApproachTabProps {
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

export default function DigitalMarketingApproachTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: DigitalMarketingApproachTabProps) {
  const approach = formData.approach || ({} as any);
  const features = approach.features || [];

  const handleApproachChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        approach: { ...prev.approach, [field]: val },
      };
    });
  };

  const handleFeatureChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.approach?.features || [])];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: val };
      }
      return {
        ...prev,
        approach: { ...prev.approach, features: copy },
      };
    });
  };

  const addFeature = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.approach?.features || [])];
      copy.push({
        id: `approach-${Date.now()}`,
        title: 'New Strategy Pillar',
        desc: 'Customized strategy execution built around high-intent customer acquisition.',
        icon: '/Home3_files/6916b33016cea6a92e3f8264_specialiti-icon-2.svg',
      });
      return {
        ...prev,
        approach: { ...prev.approach, features: copy },
      };
    });
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.approach?.features || [])];
      copy.splice(index, 1);
      return {
        ...prev,
        approach: { ...prev.approach, features: copy },
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Typography & Headline */}
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
          Our Approach &amp; Strategy Framing
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Pill Badge Text</label>
            <input
              style={inputStyle}
              value={approach.subBadgeText || ''}
              onChange={(e) => handleApproachChange('subBadgeText', e.target.value)}
              placeholder="e.g. Our Approach"
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              style={inputStyle}
              value={approach.headline || ''}
              onChange={(e) => handleApproachChange('headline', e.target.value)}
              placeholder="e.g. Marketing built around your business, not a template"
            />
          </div>
          <div>
            <label style={labelStyle}>Overview Paragraph</label>
            <textarea
              style={{ ...textareaStyle, minHeight: '90px' }}
              value={approach.description || ''}
              onChange={(e) => handleApproachChange('description', e.target.value)}
              placeholder="We start by understanding what you actually sell..."
            />
          </div>
        </div>
      </div>

      {/* 2. Visual Graphic & Consultation CTA */}
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
          <ImageIcon style={{ width: '16px', height: '16px', color: '#6366F1' }} />
          Approach Graphic &amp; Consultation CTA
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <ImageFieldWithUpload
            label="Left Column Graphic Asset"
            value={approach.image || ''}
            onChange={(url) => handleApproachChange('image', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('digitalMarketing.approach.image') : undefined}
          />
          <div>
            <label style={labelStyle}>Consultation Button Text</label>
            <input
              style={inputStyle}
              value={approach.buttonText || ''}
              onChange={(e) => handleApproachChange('buttonText', e.target.value)}
              placeholder="e.g. Book a Free Consultation"
            />
            <div style={{ marginTop: '12px' }}>
              <label style={labelStyle}>Consultation Button Link</label>
              <input
                style={inputStyle}
                value={approach.buttonLink || ''}
                onChange={(e) => handleApproachChange('buttonLink', e.target.value)}
                placeholder="/contact"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Strategy Features List */}
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
            Approach Feature Pillars ({features.length})
          </h3>
          <button
            type="button"
            onClick={addFeature}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #6366F1',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <PlusIcon style={{ width: '14px', height: '14px' }} />
            Add Pillar
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {features.map((feat, idx) => (
            <div
              key={feat.id || idx}
              style={{
                backgroundColor: '#F8FAFC',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '120px' }}>
                <ImageFieldWithUpload
                  label="Icon SVG"
                  value={feat.icon || ''}
                  onChange={(url) => handleFeatureChange(idx, 'icon', url)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`digitalMarketing.approach.features.${idx}.icon`) : undefined}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <label style={labelStyle}>Feature Title</label>
                  <input
                    style={{ ...inputStyle, height: '36px' }}
                    value={feat.title || ''}
                    onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                    placeholder="e.g. SEO"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Feature Description</label>
                  <textarea
                    style={{ ...textareaStyle, minHeight: '60px' }}
                    value={feat.desc || ''}
                    onChange={(e) => handleFeatureChange(idx, 'desc', e.target.value)}
                    placeholder="We optimize your site's content and structure..."
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFeature(idx)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #FCA5A5',
                  backgroundColor: '#FEF2F2',
                  color: '#EF4444',
                  cursor: 'pointer',
                }}
                title="Remove Feature"
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
