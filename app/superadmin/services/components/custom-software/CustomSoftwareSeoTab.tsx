'use client';

import React, { useState } from 'react';
import { CustomSoftwareContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { GlobeIcon, SearchIcon, PlusIcon, CloseIcon } from '../common/StandardSvgIcons';

interface CustomSoftwareSeoTabProps {
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

export default function CustomSoftwareSeoTab({ formData, setFormData, onOpenAssetPicker }: CustomSoftwareSeoTabProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const handleFieldChange = (field: keyof CustomSoftwareContentDTO, val: any) => {
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

  return (
    <div style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Meta Titles & Description */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SearchIcon /> Search Engine Optimization (SEO)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={labelStyle}>Meta Title</label>
              <span style={{ fontSize: '0.75rem', color: (formData.metaTitle || '').length > 60 ? '#EF4444' : '#64748B' }}>
                {(formData.metaTitle || '').length} / 60 chars
              </span>
            </div>
            <input
              type="text"
              style={inputStyle}
              value={formData.metaTitle || ''}
              onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
              placeholder="e.g. Custom Software Development Ahmedabad | Tryangle Tech"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={labelStyle}>Meta Description</label>
              <span style={{ fontSize: '0.75rem', color: (formData.metaDescription || '').length > 160 ? '#EF4444' : '#64748B' }}>
                {(formData.metaDescription || '').length} / 160 chars
              </span>
            </div>
            <textarea
              rows={3}
              style={textareaStyle}
              value={formData.metaDescription || ''}
              onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
              placeholder="Enter a compelling snippet for search results..."
            />
          </div>

          <div>
            <label style={labelStyle}>Canonical URL</label>
            <input
              type="text"
              style={inputStyle}
              value={formData.canonicalUrl || 'https://tryangletech.com/service/custom-software'}
              onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
              placeholder="https://tryangletech.com/service/custom-software"
            />
          </div>
        </div>
      </div>

      {/* 2. SEO Keywords Manager */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          Target SEO Keywords
        </h3>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            style={inputStyle}
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddKeyword();
              }
            }}
            placeholder="Add target keyword e.g. Enterprise ERP Software..."
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 20px', borderRadius: '8px', backgroundColor: '#1833FE', color: '#FFFFFF', border: 'none', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            <PlusIcon /> Add
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(formData.keywords || []).map((kw, idx) => (
            <span
              key={idx}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '20px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #DBEAFE' }}
            >
              {kw}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(kw)}
                style={{ background: 'none', border: 'none', color: '#93C5FD', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
              >
                <CloseIcon />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 3. Open Graph Social Share Image */}
      <div style={{ backgroundColor: 'transparent', padding: '0', borderRadius: '0', border: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GlobeIcon /> Social Media Sharing (OpenGraph & Twitter Cards)
        </h3>

        <div style={{ maxWidth: '480px' }}>
          <ImageFieldWithUpload
            label="Open Graph Preview Banner (1200 × 630 px)"
            value={formData.ogImage || ''}
            onChange={(url) => handleFieldChange('ogImage', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('customSoftware.seo.ogImage') : undefined}
          />
        </div>
      </div>

      {/* 4. Google SERP Live Snippet Preview */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#475569' }}>
          Google Search Results Preview
        </h3>
        <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', maxWidth: '650px', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ fontSize: '0.8rem', color: '#202124', marginBottom: '4px' }}>
            https://tryangletech.com &gt; service &gt; custom-software
          </div>
          <div style={{ fontSize: '1.15rem', color: '#1a0dab', fontWeight: 500, lineHeight: '1.3', marginBottom: '4px', cursor: 'pointer' }}>
            {formData.metaTitle || 'Custom Software Development Ahmedabad | Tryangle Tech'}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#4d5156', lineHeight: '1.4' }}>
            {formData.metaDescription || 'We build custom software around how your business actually works, not off-the-shelf templates.'}
          </div>
        </div>
      </div>
    </div>
  );
}
