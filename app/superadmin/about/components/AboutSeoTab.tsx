'use client';

import React from 'react';
import { AboutContentDTO } from '@/backend/services/about/about.types';

interface AboutSeoTabProps {
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  keywords: string;
  setKeywords: (val: string) => void;
  canonicalUrl?: string;
  setCanonicalUrl?: (val: string) => void;
  fullData: AboutContentDTO;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 1rem',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  fontSize: '0.875rem',
  fontWeight: 500,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '5px',
};

export default function AboutSeoTab({
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  keywords,
  setKeywords,
  canonicalUrl = 'https://tryangletech.com/about',
  setCanonicalUrl,
  fullData,
}: AboutSeoTabProps) {
  const titleLength = (metaTitle || '').length;
  const descLength = (metaDescription || '').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      {/* Header Banner */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h3
            style={{
              margin: '0 0 4px 0',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--dark-indigo, #1a0b54)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>🎯 Search, AI & SEO Knowledge Center</span>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: 'var(--brand-blue, #1833fe)',
                fontWeight: 800,
                border: '1px solid #BFDBFE',
              }}
            >
              SEO + AEO + GEO
            </span>
          </h3>
          <p style={{ margin: 0, fontSize: '0.825rem', color: '#64748B' }}>
            Manage Google SERP metadata, Schema.org Local Graph, and AI Answer Engine Optimization (ChatGPT, Perplexity, Claude, Google AI Overviews).
          </p>
        </div>
      </div>

      {/* CARD 1: GOOGLE & AI CITATION LIVE PREVIEW */}
      <div
        style={{
          padding: '18px 20px',
          borderRadius: '12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
            🌐 Google SERP & AI Search Preview
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
            Live Canonical Rendering
          </span>
        </div>

        {/* SERP Snippet Box */}
        <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'var(--brand-blue, #1833fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '10px', fontWeight: 900 }}>
              T
            </div>
            <div style={{ fontSize: '0.78rem', color: '#202124', lineHeight: 1.2 }}>
              <div style={{ fontWeight: 600 }}>TryangleTech</div>
              <div style={{ color: '#5f6368', fontSize: '0.72rem' }}>
                https://tryangletech.com/about
              </div>
            </div>
          </div>

          <div style={{ fontSize: '1.15rem', color: '#1a0dab', fontWeight: 500, lineHeight: 1.3, marginBottom: '4px', cursor: 'pointer' }}>
            {metaTitle || 'About Tryangle Tech | IT & Software Engineering Company in Ahmedabad'}
          </div>

          <div style={{ fontSize: '0.85rem', color: '#4d5156', lineHeight: 1.4 }}>
            {metaDescription || 'Learn about Tryangle Tech, a premier IT company based in Ahmedabad delivering 350+ web, app, and custom software projects with transparent execution.'}
          </div>
        </div>

        {/* Character Metrics Bar */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '0.78rem', flexWrap: 'wrap' }}>
          <div>
            <strong style={{ color: '#334155' }}>Title Length: </strong>
            <span style={{ color: (titleLength >= 40 && titleLength <= 65) ? '#16A34A' : titleLength > 65 ? '#DC2626' : '#EA580C', fontWeight: 700 }}>
              {titleLength} / 60 chars
            </span>
            <span style={{ color: '#94A3B8', marginLeft: '4px' }}>(Optimal: 50-60)</span>
          </div>
          <div>
            <strong style={{ color: '#334155' }}>Description Length: </strong>
            <span style={{ color: (descLength >= 120 && descLength <= 160) ? '#16A34A' : descLength > 160 ? '#DC2626' : '#EA580C', fontWeight: 700 }}>
              {descLength} / 160 chars
            </span>
            <span style={{ color: '#94A3B8', marginLeft: '4px' }}>(Optimal: 140-160)</span>
          </div>
        </div>
      </div>

      {/* CARD 2: CORE SEO META FIELDS */}
      <div
        style={{
          padding: '18px 20px',
          borderRadius: '12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
          🏷️ Core Meta Tags & Search Keywords
        </span>

        <div>
          <label style={labelStyle}>SEO Meta Title *</label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="e.g. About Tryangle Tech | IT & Software Engineering Company in Ahmedabad"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>SEO Meta Description *</label>
          <textarea
            rows={3}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="e.g. Learn about Tryangle Tech, a premier IT company based in Ahmedabad delivering 350+ web, app, and custom software projects..."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={labelStyle}>Target Meta Keywords (Comma Separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="About TryangleTech, IT Company in Ahmedabad, Software Engineering Agency, Web Development"
            style={inputStyle}
          />
        </div>

        {setCanonicalUrl && (
          <div>
            <label style={labelStyle}>Canonical URL</label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="https://tryangletech.com/about"
              style={inputStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
}
