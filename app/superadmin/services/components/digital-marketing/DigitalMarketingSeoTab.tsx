'use client';

import React, { useState } from 'react';
import { DigitalMarketingContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { GlobeIcon, SearchIcon, PlusIcon, CloseIcon } from '../common/StandardSvgIcons';

interface DigitalMarketingSeoTabProps {
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

export default function DigitalMarketingSeoTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: DigitalMarketingSeoTabProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const handleFieldChange = (field: keyof DigitalMarketingContentDTO, val: any) => {
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

  const handleRemoveKeyword = (tag: string) => {
    const current = formData.keywords || [];
    handleFieldChange(
      'keywords',
      current.filter((k) => k !== tag)
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Meta Tags */}
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
          <SearchIcon style={{ width: '16px', height: '16px', color: '#6366F1' }} />
          Meta Tags &amp; Search Engine Optimization
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>SEO Meta Title</label>
              <span style={{ fontSize: '0.75rem', color: (formData.metaTitle || '').length > 60 ? '#EF4444' : '#64748B' }}>
                {(formData.metaTitle || '').length}/60 chars
              </span>
            </div>
            <input
              style={inputStyle}
              value={formData.metaTitle || ''}
              onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
              placeholder="e.g. Digital Marketing Company in Ahmedabad | SEO & Ads | Tryangle Tech"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Meta Description</label>
              <span style={{ fontSize: '0.75rem', color: (formData.metaDescription || '').length > 160 ? '#EF4444' : '#64748B' }}>
                {(formData.metaDescription || '').length}/160 chars
              </span>
            </div>
            <textarea
              style={{ ...textareaStyle, minHeight: '85px' }}
              value={formData.metaDescription || ''}
              onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
              placeholder="Grow your business online with SEO, Google Ads, and social media marketing in Ahmedabad..."
            />
          </div>

          <div>
            <label style={labelStyle}>Target Keyword Tags</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                placeholder="Type keyword and press Enter or Add"
              />
              <button
                type="button"
                onClick={handleAddKeyword}
                style={{
                  padding: '0 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#6366F1',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <PlusIcon style={{ width: '14px', height: '14px' }} />
                Add
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(formData.keywords || []).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    backgroundColor: '#EEF2FF',
                    color: '#4F46E5',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(tag)}
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      color: '#4F46E5',
                      display: 'flex',
                    }}
                  >
                    <CloseIcon style={{ width: '12px', height: '12px' }} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. OpenGraph & Canonical */}
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
          <GlobeIcon style={{ width: '16px', height: '16px', color: '#6366F1' }} />
          Canonical URL &amp; Social Share (OpenGraph)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Canonical URL</label>
            <input
              style={inputStyle}
              value={formData.canonicalUrl || ''}
              onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
              placeholder="https://tryangletech.com/service/digital-marketing"
            />
          </div>

          <ImageFieldWithUpload
            label="Social Share Banner (og:image)"
            value={formData.ogImage || ''}
            onChange={(url) => handleFieldChange('ogImage', url)}
            onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('digitalMarketing.seo.ogImage') : undefined}
          />
        </div>
      </div>

      {/* 3. Live Google SERP Preview */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748B', margin: '0 0 12px 0' }}>
          LIVE GOOGLE SEARCH SNIPPET PREVIEW
        </h3>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            maxWidth: '650px',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '4px' }}>
            https://tryangletech.com &gt; service &gt; digital-marketing
          </div>
          <div style={{ fontSize: '1.1rem', color: '#1A0DAB', fontWeight: 600, marginBottom: '4px', cursor: 'pointer' }}>
            {formData.metaTitle || 'Digital Marketing Company in Ahmedabad | SEO & Ads | Tryangle Tech'}
          </div>
          <div style={{ fontSize: '0.825rem', color: '#4D5156', lineHeight: '1.4' }}>
            {formData.metaDescription || 'Grow your business online with SEO, Google Ads, and social media marketing in Ahmedabad...'}
          </div>
        </div>
      </div>
    </div>
  );
}
