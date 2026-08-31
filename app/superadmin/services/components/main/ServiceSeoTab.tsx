'use client';

import React from 'react';
import { SearchIcon, PlusIcon, CloseIcon } from '../common/StandardSvgIcons';

interface ServiceSeoTabProps {
  metaTitle: string;
  setMetaTitle: React.Dispatch<React.SetStateAction<string>> | ((val: string) => void);
  metaDescription: string;
  setMetaDescription: React.Dispatch<React.SetStateAction<string>> | ((val: string) => void);
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>> | ((val: string[]) => void);
  canonicalUrl?: string;
  setCanonicalUrl?: (val: string) => void;
  isPublished?: boolean;
  setIsPublished?: React.Dispatch<React.SetStateAction<boolean>> | ((val: boolean) => void);
}

export default function ServiceSeoTab({
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  keywords,
  setKeywords,
  canonicalUrl = 'https://tryangletech.com/service',
  setCanonicalUrl,
  isPublished = true,
  setIsPublished,
}: ServiceSeoTabProps) {
  const [keywordInput, setKeywordInput] = React.useState('');

  const handleAddKeyword = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (!keywordInput.trim()) return;
    if (!keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
    }
    setKeywordInput('');
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
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
        gap: '22px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            7. Search Engine Optimization (SEO) & AEO
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.785rem', color: '#64748B' }}>
            Configure metadata, Google search appearance, and live indexation status.
          </p>
        </div>

        {setIsPublished && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#334155' }}>
              Publish Status:
            </span>
            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '16px',
                border: '1px solid',
                borderColor: isPublished ? '#BBF7D0' : '#FDE68A',
                backgroundColor: isPublished ? '#DCFCE7' : '#FEF3C7',
                color: isPublished ? '#15803D' : '#B45309',
                fontSize: '0.775rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span>●</span>
              <span>{isPublished ? 'Live Published' : 'Draft / Private'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Meta Title */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
            Meta Page Title
          </label>
          <span style={{ fontSize: '0.75rem', color: metaTitle.length > 60 ? '#EF4444' : '#64748B', fontWeight: 600 }}>
            {metaTitle.length}/60 chars (Recommended: 50–60)
          </span>
        </div>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          placeholder="e.g. Our Services | Web, Mobile, Custom Software & Marketing | TryangleTech"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            fontSize: '0.875rem',
            color: '#1E293B',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Meta Description */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
            Meta Description
          </label>
          <span style={{ fontSize: '0.75rem', color: metaDescription.length > 160 ? '#EF4444' : '#64748B', fontWeight: 600 }}>
            {metaDescription.length}/160 chars (Recommended: 120–160)
          </span>
        </div>
        <textarea
          rows={3}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="Provide a compelling overview for search engines and AI summaries..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            fontSize: '0.875rem',
            color: '#1E293B',
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Keywords Tagging */}
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
          SEO & AEO Keywords (Press Enter or click Add)
        </label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleAddKeyword}
            placeholder="e.g. Custom Software Development"
            style={{
              flex: 1,
              padding: '0.65rem 0.9rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={handleAddKeyword}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--brand-blue, #1833fe)',
              color: '#FFFFFF',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <PlusIcon size={12} color="#FFFFFF" />
            <span>Add</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {keywords.map((kw, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '100px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#1D4ED8',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <span>{kw}</span>
              <button
                type="button"
                onClick={() => handleRemoveKeyword(kw)}
                style={{ background: 'none', border: 'none', color: '#1D4ED8', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
              >
                <CloseIcon size={10} color="#1D4ED8" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Google SERP Live Preview Box */}
      <div style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
          <SearchIcon size={14} color="#64748B" />
          <span>Live Google Search Preview</span>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '14px', maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--brand-blue, #1833fe)', color: '#FFFFFF', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              T
            </div>
            <div style={{ fontSize: '0.75rem', color: '#202124' }}>
              https://tryangletech.com › service
            </div>
          </div>
          <div style={{ color: '#1a0dab', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '4px', cursor: 'pointer' }}>
            {metaTitle || 'Our Services | TryangleTech'}
          </div>
          <div style={{ color: '#4d5156', fontSize: '0.8rem', lineHeight: 1.4 }}>
            {metaDescription || 'Explore TryangleTech’s full spectrum of digital services...'}
          </div>
        </div>
      </div>
    </div>
  );
}
