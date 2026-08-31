'use client';

import React, { useState } from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';
import { ImageFieldWithUpload } from '../common';

interface GraphicsDesigningSeoTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
  onOpenAssetPicker?: (target: string) => void;
}

export default function GraphicsDesigningSeoTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: GraphicsDesigningSeoTabProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    const keywords = [...(formData.keywords || [])];
    if (!keywords.includes(newKeyword.trim())) {
      keywords.push(newKeyword.trim());
      updateField('keywords', keywords);
    }
    setNewKeyword('');
  };

  const removeKeyword = (kwToRemove: string) => {
    const keywords = (formData.keywords || []).filter((k) => k !== kwToRemove);
    updateField('keywords', keywords);
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

  const titleLength = formData.metaTitle?.length || 0;
  const descLength = formData.metaDescription?.length || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Publication & Visibility Status */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          1. Page Publication &amp; Indexing Status
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            backgroundColor: formData.isPublished !== false ? '#F0FDF4' : '#FFFBEB',
            border: `1px solid ${formData.isPublished !== false ? '#BBF7D0' : '#FDE68A'}`,
            borderRadius: '10px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>
              {formData.isPublished !== false ? '● Published (Live to Visitors & Search Engines)' : '○ Draft Mode (Unpublished)'}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
              {formData.isPublished !== false
                ? 'Public landing page is currently accessible and indexed on /service/graphics-designing.'
                : 'Page is hidden from public routes.'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => updateField('isPublished', !formData.isPublished)}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: formData.isPublished !== false ? '#15803D' : '#D97706',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
            }}
          >
            {formData.isPublished !== false ? 'Unpublish' : 'Publish Live'}
          </button>
        </div>
      </div>

      {/* 2. Meta Title & Description */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          2. Search Engine Meta Tags
        </h3>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={labelStyle}>Meta Title Tag (Recommended: 50-60 characters)</label>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: titleLength > 60 ? '#EF4444' : '#15803D' }}>
              {titleLength} / 60 chars
            </span>
          </div>
          <input
            type="text"
            value={formData.metaTitle || ''}
            onChange={(e) => updateField('metaTitle', e.target.value)}
            placeholder="Graphic Design Studio in Ahmedabad | Branding & UI/UX | Tryangle Tech"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={labelStyle}>Meta Description Tag (Recommended: 120-160 characters)</label>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: descLength > 160 ? '#EF4444' : '#15803D' }}>
              {descLength} / 160 chars
            </span>
          </div>
          <textarea
            rows={3}
            value={formData.metaDescription || ''}
            onChange={(e) => updateField('metaDescription', e.target.value)}
            placeholder="Creative graphic design services in Ahmedabad: Custom logo design, brand identity..."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={labelStyle}>Canonical URL</label>
          <input
            type="text"
            value={formData.canonicalUrl || ''}
            onChange={(e) => updateField('canonicalUrl', e.target.value)}
            placeholder="https://tryangletech.com/service/graphics-designing"
            style={inputStyle}
          />
        </div>
      </div>

      {/* 3. Keywords Manager */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
          3. Target SEO Keywords ({formData.keywords?.length || 0})
        </h3>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
            placeholder="Add target keyword phrase and press Enter..."
            style={inputStyle}
          />
          <button
            type="button"
            onClick={addKeyword}
            style={{
              padding: '10px 18px',
              backgroundColor: 'var(--brand-blue, #1833fe)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            + Add
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(formData.keywords || []).map((kw, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: '#EFF6FF',
                color: 'var(--brand-blue, #1833fe)',
                border: '1px solid #BFDBFE',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              {kw}
              <button
                type="button"
                onClick={() => removeKeyword(kw)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#EF4444',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 4. Social OpenGraph Banner */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          4. Social Share OpenGraph Banner (1200x630px)
        </h3>
        <ImageFieldWithUpload
          label="OpenGraph Preview Banner"
          value={formData.ogImage || ''}
          onChange={(val) => updateField('ogImage', val)}
          onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker('graphicsDesigning.seo.ogImage') : undefined}
        />
      </div>

      {/* 5. Live Google SERP Snippet Preview */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          5. Live Google Search Result Preview
        </h3>
        <div
          style={{
            padding: '18px 22px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '10px',
            maxWidth: '680px',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#202124', marginBottom: '2px' }}>
            https://tryangletech.com &gt; service &gt; graphics-designing
          </div>
          <div
            style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              color: '#1a0dab',
              cursor: 'pointer',
              marginBottom: '4px',
              textDecoration: 'underline',
            }}
          >
            {formData.metaTitle || 'Graphic Design Studio in Ahmedabad | Branding & UI/UX | Tryangle Tech'}
          </div>
          <div style={{ fontSize: '0.825rem', color: '#4d5156', lineHeight: 1.5 }}>
            {formData.metaDescription ||
              'Creative graphic design services in Ahmedabad: Custom logo design, brand identity, marketing collaterals, packaging, and digital visuals tailored to scale your brand.'}
          </div>
        </div>
      </div>
    </div>
  );
}
