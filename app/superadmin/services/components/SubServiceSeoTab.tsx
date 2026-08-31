'use client';

import React from 'react';
import { WebDevContentDTO } from '@/backend/services/services/services.types';

interface SubServiceSeoTabProps {
  formData: WebDevContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<WebDevContentDTO | null>>;
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

export default function SubServiceSeoTab({ formData, setFormData }: SubServiceSeoTabProps) {
  const [keywordInput, setKeywordInput] = React.useState('');

  const handleAddKeyword = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (!keywordInput.trim()) return;
    const current = formData.keywords || [];
    if (!current.includes(keywordInput.trim())) {
      setFormData((prev) => (prev ? { ...prev, keywords: [...current, keywordInput.trim()] } : prev));
    }
    setKeywordInput('');
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData((prev) =>
      prev ? { ...prev, keywords: (prev.keywords || []).filter((k) => k !== keyword) } : prev
    );
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
        gap: '24px',
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            6. SEO, Social Meta & Visibility
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Configure search engine meta tags, OpenGraph previews, and public publication status.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.785rem', color: '#64748B', fontWeight: 600 }}>Status:</span>
          <button
            type="button"
            onClick={() => setFormData((prev) => (prev ? { ...prev, isPublished: !prev.isPublished } : prev))}
            style={{
              padding: '5px 14px',
              borderRadius: '20px',
              border: `1px solid ${formData.isPublished ? '#BBF7D0' : '#FDE68A'}`,
              backgroundColor: formData.isPublished ? '#DCFCE7' : '#FEF3C7',
              color: formData.isPublished ? '#15803D' : '#B45309',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            ● {formData.isPublished ? 'Live Published' : 'Draft'}
          </button>
        </div>
      </div>

      {/* Meta Title */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <label style={labelStyle}>Page Meta Title (Browser Tab & SERP) *</label>
          <span style={{ fontSize: '0.725rem', color: (formData.metaTitle?.length || 0) > 60 ? '#D97706' : '#64748B', fontWeight: 600 }}>
            {formData.metaTitle?.length || 0} / 60 chars
          </span>
        </div>
        <input
          type="text"
          value={formData.metaTitle || ''}
          onChange={(e) => setFormData((prev) => (prev ? { ...prev, metaTitle: e.target.value } : prev))}
          placeholder="Website Development Company in Ahmedabad | Tryangle Tech"
          style={inputStyle}
        />
      </div>

      {/* Meta Description */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <label style={labelStyle}>Meta Description (Search Snippet) *</label>
          <span style={{ fontSize: '0.725rem', color: (formData.metaDescription?.length || 0) > 160 ? '#D97706' : '#64748B', fontWeight: 600 }}>
            {formData.metaDescription?.length || 0} / 160 chars
          </span>
        </div>
        <textarea
          rows={3}
          value={formData.metaDescription || ''}
          onChange={(e) => setFormData((prev) => (prev ? { ...prev, metaDescription: e.target.value } : prev))}
          placeholder="Comprehensive meta description explaining services..."
          style={textareaStyle}
        />
      </div>

      {/* Target Keywords */}
      <div>
        <label style={labelStyle}>Target Keywords & Search Terms</label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleAddKeyword}
            placeholder="Type keyword and press Enter or click Add..."
            style={{ ...inputStyle, flex: 1 }}
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
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Add
          </button>
        </div>

        {/* Keyword Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(formData.keywords || []).map((kw, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: '#EFF6FF',
                color: 'var(--brand-blue, #1833fe)',
                border: '1px solid #DBEAFE',
                fontSize: '0.8rem',
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
                  color: '#93C5FD',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: 0,
                  display: 'flex',
                }}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
