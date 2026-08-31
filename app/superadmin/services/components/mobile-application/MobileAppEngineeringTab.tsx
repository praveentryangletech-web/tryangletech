'use client';

import React from 'react';
import { MobileAppContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';

interface MobileAppEngineeringTabProps {
  formData: MobileAppContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<MobileAppContentDTO | null>>;
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

export default function MobileAppEngineeringTab({ formData, setFormData, onOpenAssetPicker }: MobileAppEngineeringTabProps) {
  const handleEngineeringChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, engineering: { ...prev.engineering, [field]: val } };
    });
  };

  const handlePillarChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const pillars = [...(prev.engineering?.pillars || [])];
      pillars[index] = { ...pillars[index], [field]: val };
      return { ...prev, engineering: { ...prev.engineering, pillars } };
    });
  };

  const handleAdvantageChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, advantage: { ...prev.advantage, [field]: val } };
    });
  };

  const handlePointChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const points = [...(prev.advantage?.points || [])];
      points[index] = { ...points[index], [field]: val };
      return { ...prev, advantage: { ...prev.advantage, points } };
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
        gap: '28px',
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            4. Engineering & Development Advantage
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Configure Native iOS/Android capabilities, engineering pillars, and the agile development advantage section.
          </p>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--brand-blue, #1833fe)',
            backgroundColor: '#EFF6FF',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid #BFDBFE',
          }}
        >
          Capabilities & Advantages
        </span>
      </div>

      {/* BLOCK A: MOBILE ENGINEERING (OUR SERVICES SECTION) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
          Part A: Mobile Engineering Capabilities (Native iPhone & Android)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Overtitle / Sub-Badge</label>
            <input
              type="text"
              value={formData.engineering?.subBadgeText || ''}
              onChange={(e) => handleEngineeringChange('subBadgeText', e.target.value)}
              placeholder="mobile engineering"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Section Heading</label>
            <input
              type="text"
              value={formData.engineering?.heading || ''}
              onChange={(e) => handleEngineeringChange('heading', e.target.value)}
              placeholder="Scalable apps built for high-growth businesses"
              style={{ ...inputStyle, fontWeight: 700 }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Section Description</label>
          <textarea
            rows={2}
            value={formData.engineering?.description || ''}
            onChange={(e) => handleEngineeringChange('description', e.target.value)}
            placeholder="We engineer high-performance mobile applications tailored to your business logic..."
            style={textareaStyle}
          />
        </div>

        {/* 2 Engineering Pillars: iPhone & Android */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {(formData.engineering?.pillars || []).map((pillar, idx) => (
            <div key={pillar.id || idx} style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--brand-blue, #1833fe)' }}>
                Pillar #{idx + 1}: {pillar.title || (idx === 0 ? 'Native iPhone' : 'Native Android')}
              </div>
              <div>
                <label style={labelStyle}>Pillar Title</label>
                <input
                  type="text"
                  value={pillar.title || ''}
                  onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Pillar Description</label>
                <textarea
                  rows={2}
                  value={pillar.desc || ''}
                  onChange={(e) => handlePillarChange(idx, 'desc', e.target.value)}
                  style={textareaStyle}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Visual Assets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <ImageFieldWithUpload
            label="Main Portfolio Showcase Graphic"
            recommendedDimensions="800 × 800 px"
            value={formData.engineering?.imageMain || ''}
            onChange={(url) => handleEngineeringChange('imageMain', url)}
            altValue={formData.engineering?.imageMainAlt || ''}
            onAltChange={(alt) => handleEngineeringChange('imageMainAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('mobileApp.engineering.imageMain') : undefined}
            uploadPrefix="engineering-main"
            placeholder="/service-3-assets/...webp"
          />

          <ImageFieldWithUpload
            label="Marquee Preview Graphic"
            recommendedDimensions="800 × 800 px"
            value={formData.engineering?.imageMarquee || ''}
            onChange={(url) => handleEngineeringChange('imageMarquee', url)}
            altValue={formData.engineering?.imageMarqueeAlt || ''}
            onAltChange={(alt) => handleEngineeringChange('imageMarqueeAlt', alt)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('mobileApp.engineering.imageMarquee') : undefined}
            uploadPrefix="engineering-marquee"
            placeholder="/service-3-assets/...webp"
          />
        </div>
      </div>

      {/* BLOCK B: DEVELOPMENT ADVANTAGE */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
          Part B: Development Advantage (Agile Sprints & Key Benefits)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Advantage Sub-Badge</label>
            <input
              type="text"
              value={formData.advantage?.subBadgeText || ''}
              onChange={(e) => handleAdvantageChange('subBadgeText', e.target.value)}
              placeholder="development advantage"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Advantage Main Heading</label>
            <input
              type="text"
              value={formData.advantage?.heading || ''}
              onChange={(e) => handleAdvantageChange('heading', e.target.value)}
              placeholder="High-performance apps delivered with zero stress"
              style={{ ...inputStyle, fontWeight: 700 }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Advantage Description</label>
          <textarea
            rows={2}
            value={formData.advantage?.description || ''}
            onChange={(e) => handleAdvantageChange('description', e.target.value)}
            placeholder="We accelerate your time-to-market with agile development sprints..."
            style={textareaStyle}
          />
        </div>

        {/* 2 Advantage Points: Speed & Tool Integration */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {(formData.advantage?.points || []).map((point, idx) => (
            <div key={point.id || idx} style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--brand-blue, #1833fe)' }}>
                Advantage Point #{idx + 1}
              </div>
              <div>
                <label style={labelStyle}>Point Title</label>
                <input
                  type="text"
                  value={point.title || ''}
                  onChange={(e) => handlePointChange(idx, 'title', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Point Description</label>
                <textarea
                  rows={2}
                  value={point.desc || ''}
                  onChange={(e) => handlePointChange(idx, 'desc', e.target.value)}
                  style={textareaStyle}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
