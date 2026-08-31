'use client';

import React, { useState } from 'react';
import { MobileAppContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { GlobeIcon, SearchIcon } from '../common/StandardSvgIcons';

interface MobileAppSeoTabProps {
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

export default function MobileAppSeoTab({ formData, setFormData, onOpenAssetPicker }: MobileAppSeoTabProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const handleFieldChange = (field: keyof MobileAppContentDTO, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: val };
    });
  };

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    const current = formData.keywords || [];
    if (!current.includes(newKeyword.trim())) {
      handleFieldChange('keywords', [...current, newKeyword.trim()]);
    }
    setNewKeyword('');
  };

  const handleRemoveKeyword = (kw: string) => {
    const current = formData.keywords || [];
    handleFieldChange('keywords', current.filter((k) => k !== kw));
  };

  const titleLength = (formData.metaTitle || '').length;
  const descLength = (formData.metaDescription || '').length;

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            8. SEO, Social Graph & Publication
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Control search engine meta tags, OpenGraph social preview cards, target keywords, and live publication state.
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
          SEO Engine
        </span>
      </div>

      {/* Google SERP Live Snippet Preview Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <SearchIcon size={16} color="var(--brand-blue, #1833fe)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>
            Live Google SERP Search Snippet Preview
          </span>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#1A0DAB', textDecoration: 'underline', fontWeight: 600, wordBreak: 'break-all' }}>
          {formData.metaTitle || 'Mobile App Development Company in Ahmedabad | Tryangle Tech'}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#006621' }}>
          {formData.canonicalUrl || 'https://tryangletech.com/service/mobile-application'}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#4D5156', lineHeight: '1.4' }}>
          {formData.metaDescription || 'iOS and Android app development in Ahmedabad. From concept to App Store launch...'}
        </div>
      </div>

      {/* Meta Title & Meta Description */}
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
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ ...labelStyle, margin: 0 }}>SEO Meta Title *</label>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: titleLength >= 50 && titleLength <= 65 ? '#15803D' : '#D97706' }}>
              {titleLength} / 60 characters
            </span>
          </div>
          <input
            type="text"
            value={formData.metaTitle || ''}
            onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
            placeholder="Mobile App Development Company in Ahmedabad | Tryangle Tech"
            style={inputStyle}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ ...labelStyle, margin: 0 }}>SEO Meta Description *</label>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: descLength >= 120 && descLength <= 160 ? '#15803D' : '#D97706' }}>
              {descLength} / 160 characters
            </span>
          </div>
          <textarea
            rows={3}
            value={formData.metaDescription || ''}
            onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
            placeholder="iOS and Android app development in Ahmedabad..."
            style={textareaStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Canonical URL</label>
          <input
            type="text"
            value={formData.canonicalUrl || 'https://tryangletech.com/service/mobile-application'}
            onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
            placeholder="https://tryangletech.com/service/mobile-application"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Target Keywords */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GlobeIcon size={16} color="var(--brand-blue, #1833fe)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
            Target Keywords & Search Terms
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Add keyword (e.g. Flutter Mobile Apps)..."
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddKeyword();
              }
            }}
            style={inputStyle}
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            style={{
              padding: '0 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--brand-blue, #1833fe)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Add
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(formData.keywords || []).map((kw) => (
            <span
              key={kw}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: 'var(--brand-blue, #1833fe)',
                border: '1px solid #BFDBFE',
                fontSize: '0.785rem',
                fontWeight: 600,
              }}
            >
              <span>{kw}</span>
              <button
                type="button"
                onClick={() => handleRemoveKeyword(kw)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '12px',
                }}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* OpenGraph Social Image */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '20px',
        }}
      >
        <ImageFieldWithUpload
          label="OpenGraph Social Share Image"
          recommendedDimensions="1200 × 630 px (1.91:1 Social Card)"
          value={formData.ogImage || ''}
          onChange={(url) => handleFieldChange('ogImage', url)}
          altValue={formData.ogImageAlt || ''}
          onAltChange={(alt) => handleFieldChange('ogImageAlt', alt)}
          onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('mobileApp.seo.ogImage') : undefined}
          uploadPrefix="mobile-og-image"
          placeholder="/service-3-assets/...webp"
        />
      </div>

      {/* Publication State */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.9rem' }}>
            Live Publication Status
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
            When published, the page is live and indexed on search engines.
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleFieldChange('isPublished', !formData.isPublished)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: formData.isPublished !== false ? '#DCFCE7' : '#F1F5F9',
            color: formData.isPublished !== false ? '#15803D' : '#64748B',
            fontWeight: 800,
            fontSize: '0.825rem',
            cursor: 'pointer',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: formData.isPublished !== false ? '#86EFAC' : '#CBD5E1',
          }}
        >
          {formData.isPublished !== false ? '● Live / Published' : '○ Private / Draft'}
        </button>
      </div>
    </div>
  );
}
