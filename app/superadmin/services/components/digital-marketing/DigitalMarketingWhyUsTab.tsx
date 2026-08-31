'use client';

import React from 'react';
import { DigitalMarketingContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { LinkIcon, ImageIcon, PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface DigitalMarketingWhyUsTabProps {
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

export default function DigitalMarketingWhyUsTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: DigitalMarketingWhyUsTabProps) {
  const whyUs = formData.whyUs || ({} as any);
  const points = whyUs.points || [];
  const images = whyUs.images || {};

  const handleWhyUsChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        whyUs: { ...prev.whyUs, [field]: val },
      };
    });
  };

  const handleImageChange = (key: string, url: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        whyUs: {
          ...prev.whyUs,
          images: { ...prev.whyUs.images, [key]: url },
        },
      };
    });
  };

  const handlePointChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.whyUs?.points || [])];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: val };
      }
      return {
        ...prev,
        whyUs: { ...prev.whyUs, points: copy },
      };
    });
  };

  const addPoint = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.whyUs?.points || [])];
      copy.push({
        id: `why-${Date.now()}`,
        title: 'New Value Pillar',
        desc: 'Delivering exceptional transparency and continuous campaign optimization.',
      });
      return {
        ...prev,
        whyUs: { ...prev.whyUs, points: copy },
      };
    });
  };

  const removePoint = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.whyUs?.points || [])];
      copy.splice(index, 1);
      return {
        ...prev,
        whyUs: { ...prev.whyUs, points: copy },
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header & Typography */}
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
          Why Choose Us &amp; Transparency Narrative
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Pill Badge Text</label>
            <input
              style={inputStyle}
              value={whyUs.subBadgeText || ''}
              onChange={(e) => handleWhyUsChange('subBadgeText', e.target.value)}
              placeholder="e.g. why tryangletech"
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              style={inputStyle}
              value={whyUs.headline || ''}
              onChange={(e) => handleWhyUsChange('headline', e.target.value)}
              placeholder="e.g. You'll always know what's happening with your budget"
            />
          </div>
          <div>
            <label style={labelStyle}>Section Description</label>
            <textarea
              style={{ ...textareaStyle, minHeight: '90px' }}
              value={whyUs.description || ''}
              onChange={(e) => handleWhyUsChange('description', e.target.value)}
              placeholder="We provide complete transparency into every dollar spent..."
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Audit CTA Button Text</label>
              <input
                style={inputStyle}
                value={whyUs.buttonText || ''}
                onChange={(e) => handleWhyUsChange('buttonText', e.target.value)}
                placeholder="e.g. Get Your Growth Audit"
              />
            </div>
            <div>
              <label style={labelStyle}>Audit CTA Button Link</label>
              <input
                style={inputStyle}
                value={whyUs.buttonLink || ''}
                onChange={(e) => handleWhyUsChange('buttonLink', e.target.value)}
                placeholder="/contact"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Trust Points List */}
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
            Trust &amp; Advantage Points ({points.length})
          </h3>
          <button
            type="button"
            onClick={addPoint}
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
            Add Point
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {points.map((point, idx) => (
            <div
              key={point.id || idx}
              style={{
                backgroundColor: '#F8FAFC',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <label style={labelStyle}>Point Title</label>
                  <input
                    style={{ ...inputStyle, height: '36px' }}
                    value={point.title || ''}
                    onChange={(e) => handlePointChange(idx, 'title', e.target.value)}
                    placeholder="e.g. Transparent ROI & Reporting"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Point Description</label>
                  <textarea
                    style={{ ...textareaStyle, minHeight: '60px' }}
                    value={point.desc || ''}
                    onChange={(e) => handlePointChange(idx, 'desc', e.target.value)}
                    placeholder="Real-time performance dashboards..."
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => removePoint(idx)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #FCA5A5',
                  backgroundColor: '#FEF2F2',
                  color: '#EF4444',
                  cursor: 'pointer',
                }}
                title="Remove Point"
              >
                <TrashIcon style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Right Column Graphics */}
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
          Right-Column Layered Graphics
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <ImageFieldWithUpload
            label="Main Center Showcase Graphic"
            value={images.main || ''}
            onChange={(url) => handleImageChange('main', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('digitalMarketing.whyUs.images.main') : undefined}
          />
          <ImageFieldWithUpload
            label="Floating Highlight Badge 1"
            value={images.cardOne || ''}
            onChange={(url) => handleImageChange('cardOne', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('digitalMarketing.whyUs.images.cardOne') : undefined}
          />
          <ImageFieldWithUpload
            label="Floating Floating Badge 2"
            value={images.cardTwo || ''}
            onChange={(url) => handleImageChange('cardTwo', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('digitalMarketing.whyUs.images.cardTwo') : undefined}
          />
        </div>
      </div>
    </div>
  );
}
