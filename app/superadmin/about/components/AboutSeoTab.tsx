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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', backgroundColor: 'transparent' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 8: Dynamic SEO, OpenGraph & AEO Knowledge Graph
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BBF7D0' }}>
          Google & AI Optimization
        </span>
      </div>

      {/* Meta Title */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Meta Title (SEO & Social Cards) *</label>
          <span style={{ fontSize: '0.75rem', color: titleLength > 60 ? '#DC2626' : titleLength >= 35 ? '#16A34A' : '#64748B', fontWeight: 700 }}>
            {titleLength} / 60 chars {titleLength >= 35 && titleLength <= 60 ? '✓ Ideal' : ''}
          </span>
        </div>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          style={inputStyle}
          placeholder="About Tryangle Tech | IT & Software Engineering Company in Ahmedabad"
        />
      </div>

      {/* Meta Description */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Meta Description *</label>
          <span style={{ fontSize: '0.75rem', color: descLength > 160 ? '#DC2626' : descLength >= 120 ? '#16A34A' : '#64748B', fontWeight: 700 }}>
            {descLength} / 160 chars {descLength >= 120 && descLength <= 160 ? '✓ Ideal' : ''}
          </span>
        </div>
        <textarea
          rows={3}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Learn about Tryangle Tech, a premier IT company based in Ahmedabad delivering 350+ web, app, and custom software projects..."
        />
      </div>

      {/* Keywords */}
      <div>
        <label style={labelStyle}>Target Meta Keywords (Comma Separated)</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          style={inputStyle}
          placeholder="About TryangleTech, IT Company in Ahmedabad, Software Engineering Agency, Web Development"
        />
      </div>

      {/* Canonical URL */}
      {setCanonicalUrl && (
        <div>
          <label style={labelStyle}>Canonical URL</label>
          <input
            type="text"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            style={inputStyle}
            placeholder="https://tryangletech.com/about"
          />
        </div>
      )}

      {/* Live Google Search Preview Card */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <strong style={{ fontSize: '0.85rem', color: '#0F172A', display: 'block', marginBottom: '10px' }}>
          🔍 Google Search Result Snippet Preview
        </strong>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', maxWidth: '600px' }}>
          <div style={{ fontSize: '0.8rem', color: '#202124', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '9px', fontWeight: 800 }}>T</span>
            <span style={{ color: '#202124', fontWeight: 600 }}>TryangleTech</span>
            <span style={{ color: '#5f6368', fontSize: '0.75rem' }}>https://tryangletech.com › about</span>
          </div>
          <div style={{ fontSize: '1.05rem', color: '#1a0dab', fontWeight: 500, lineHeight: 1.3, cursor: 'pointer', textDecoration: 'none' }}>
            {metaTitle || 'About Tryangle Tech | IT & Software Engineering Company'}
          </div>
          <div style={{ fontSize: '0.825rem', color: '#4d5156', lineHeight: 1.4, marginTop: '4px' }}>
            {metaDescription || 'Learn about Tryangle Tech, a premier IT company delivering 350+ web, app, and custom software projects with transparent execution.'}
          </div>
        </div>
      </div>

      {/* Live AEO Answer Engine Preview */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <strong style={{ fontSize: '0.85rem', color: '#0F172A', display: 'block', marginBottom: '6px' }}>
          🤖 AI Answer Engine & Schema.org Graph Integration
        </strong>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.75rem', color: '#64748B' }}>
          The About Page dynamically outputs Schema.org <code>AboutPage</code>, <code>Organization</code>, and <code>FAQPage</code> structured data for AI crawlers (Google AI Overviews, ChatGPT Search, Perplexity).
        </p>
        <div style={{ backgroundColor: '#1E293B', color: '#38BDF8', padding: '12px', borderRadius: '8px', fontSize: '0.75rem', fontFamily: 'monospace', overflowX: 'auto', maxHeight: '180px' }}>
          {JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'AboutPage',
                  name: metaTitle,
                  description: metaDescription,
                },
                {
                  '@type': 'Organization',
                  name: 'TryangleTech',
                  url: 'https://tryangletech.com',
                },
                {
                  '@type': 'FAQPage',
                  faqCount: (fullData.faqSection?.faqs || []).length,
                },
              ],
            },
            null,
            2
          )}
        </div>
      </div>
    </div>
  );
}
