'use client';

import React from 'react';
import { LocationRegion, LocationFaq } from '@/backend/services/geo/geo.types';
import CitySearchSelect from './CitySearchSelect';
import { CitySearchResult } from '@/app/api/geo/cities/route';

const REGION_OPTIONS: LocationRegion[] = [
  'Gujarat',
  'India Metros',
  'Middle East',
  'USA & Canada',
  'Europe & UK',
  'Global Hubs',
];

interface GeoSettingsTabProps {
  isEditingLocation: boolean;
  locSlug: string;
  setLocSlug: (val: string) => void;
  locCity: string;
  setLocCity: (val: string) => void;
  locState: string;
  setLocState: (val: string) => void;
  locCountry: string;
  setLocCountry: (val: string) => void;
  locCountryCode: string;
  setLocCountryCode: (val: string) => void;
  locRegion: LocationRegion;
  setLocRegion: (val: LocationRegion) => void;
  locRegionCode: string;
  setLocRegionCode: (val: string) => void;
  locPostalCode: string;
  setLocPostalCode: (val: string) => void;
  locLatitude: string;
  setLocLatitude: (val: string) => void;
  locLongitude: string;
  setLocLongitude: (val: string) => void;
  locPopular: boolean;
  setLocPopular: (val: boolean) => void;
  locIsPublished?: boolean;
  setLocIsPublished?: (val: boolean) => void;
  locMetaTitle: string;
  setLocMetaTitle: (val: string) => void;
  locMetaDescription: string;
  setLocMetaDescription: (val: string) => void;
  locKeywords: string;
  setLocKeywords: (val: string) => void;
  locFaqs: LocationFaq[];
  setLocFaqs: React.Dispatch<React.SetStateAction<LocationFaq[]>>;
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

export default function GeoSettingsTab({
  isEditingLocation,
  locSlug,
  setLocSlug,
  locCity,
  setLocCity,
  locCountry,
  setLocCountry,
  locRegion,
  setLocRegion,
  locPostalCode,
  setLocPostalCode,
  locLatitude,
  setLocLatitude,
  locLongitude,
  setLocLongitude,
  locPopular,
  setLocPopular,
  locMetaTitle,
  setLocMetaTitle,
  locMetaDescription,
  setLocMetaDescription,
  locKeywords,
  setLocKeywords,
  locFaqs,
  setLocFaqs,
}: GeoSettingsTabProps) {
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
            <span>🎯 Search, AI & Geo Knowledge Center</span>
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
                https://tryangletech.com{isEditingLocation ? `/location/${locSlug || 'city'}` : ''}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '1.15rem', color: '#1a0dab', fontWeight: 500, lineHeight: 1.3, marginBottom: '4px', cursor: 'pointer' }}>
            {locMetaTitle || (isEditingLocation ? `Web Development & Custom Software in ${locCity} | TryangleTech` : 'TryangleTech | Web, App & Custom Software Development')}
          </div>

          <div style={{ fontSize: '0.85rem', color: '#4d5156', lineHeight: 1.4 }}>
            {locMetaDescription || (isEditingLocation ? `Top web development and software company serving ${locCity}. 350+ projects delivered.` : "Ahmedabad's leading IT team building high-performance websites, iOS/Android apps, and custom software. 350+ projects delivered.")}
          </div>
        </div>

        {/* Character Metrics Bar */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '0.78rem', flexWrap: 'wrap' }}>
          <div>
            <strong style={{ color: '#334155' }}>Title Length: </strong>
            <span style={{ color: (locMetaTitle.length >= 40 && locMetaTitle.length <= 65) ? '#16A34A' : locMetaTitle.length > 65 ? '#DC2626' : '#EA580C', fontWeight: 700 }}>
              {locMetaTitle.length} / 60 chars
            </span>
            <span style={{ color: '#94A3B8', marginLeft: '4px' }}>(Optimal: 50-60)</span>
          </div>
          <div>
            <strong style={{ color: '#334155' }}>Description Length: </strong>
            <span style={{ color: (locMetaDescription.length >= 120 && locMetaDescription.length <= 160) ? '#16A34A' : locMetaDescription.length > 160 ? '#DC2626' : '#EA580C', fontWeight: 700 }}>
              {locMetaDescription.length} / 160 chars
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
            value={locMetaTitle}
            onChange={(e) => setLocMetaTitle(e.target.value)}
            placeholder="e.g. Web Development & Custom Software in Varanasi | TryangleTech"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>SEO Meta Description *</label>
          <textarea
            rows={2}
            value={locMetaDescription}
            onChange={(e) => setLocMetaDescription(e.target.value)}
            placeholder="e.g. Leading IT & Web Development company in Varanasi. We build custom websites, iOS/Android mobile apps, and custom software systems with 350+ delivered projects."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={labelStyle}>Target Keywords & Semantic Entities (comma-separated)</label>
          <input
            type="text"
            value={locKeywords}
            onChange={(e) => setLocKeywords(e.target.value)}
            placeholder="e.g. varanasi web development, software company varanasi, mobile app developers, IT services"
            style={inputStyle}
          />
          {/* Live Keyword Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
            {locKeywords
              .split(',')
              .map((k) => k.trim())
              .filter(Boolean)
              .map((kw, kwIdx) => (
                <span key={kwIdx} style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '14px', backgroundColor: '#FFFFFF', color: '#475569', border: '1px solid #CBD5E1' }}>
                  #{kw}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* CARD 3: AEO & AI ANSWER ENGINE OPTIMIZATION */}
      <div
        style={{
          padding: '18px 20px',
          borderRadius: '12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #BFDBFE',
          boxShadow: '0 2px 10px rgba(24, 51, 254, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h4 style={{ margin: '0 0 2px 0', fontSize: '0.98rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🤖 AEO & AI Knowledge Engine (ChatGPT, Perplexity & Google AI)</span>
            </h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B' }}>
              These structured Q&A pairs are injected into <code>schema.org/FAQPage</code> and <code>Speakable</code> JSON-LD schema for instant AI bot answers & voice search citations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setLocFaqs([
                ...locFaqs,
                {
                  q: isEditingLocation ? `Why hire TryangleTech for web development in ${locCity}?` : 'Why hire TryangleTech for custom software development?',
                  a: isEditingLocation ? `TryangleTech provides enterprise-grade web development and mobile apps for businesses in ${locCity} backed by 7+ years of experience and 350+ delivered projects.` : 'We deliver full-stack web and mobile software with dedicated senior engineer communication and transparent pricing.',
                },
              ]);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid var(--brand-blue, #1833fe)',
              backgroundColor: '#EFF6FF',
              color: 'var(--brand-blue, #1833fe)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <span>+ Add AEO FAQ Question</span>
          </button>
        </div>

        {/* FAQ Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {locFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '8px', color: '#94A3B8', fontSize: '0.85rem' }}>
              No AEO FAQs added yet. Click &quot;+ Add AEO FAQ Question&quot; above to generate AI citation targets.
            </div>
          ) : (
            locFaqs.map((faq, fIdx) => (
              <div key={fIdx} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', backgroundColor: '#FFFFFF', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                    AEO Query #{fIdx + 1} (Direct AI Citation Target)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLocFaqs(locFaqs.filter((_, i) => i !== fIdx));
                    }}
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#DC2626',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    ✕ Remove
                  </button>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={labelStyle}>User Query / Voice Prompt</label>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => {
                      const copy = [...locFaqs];
                      copy[fIdx] = { ...copy[fIdx], q: e.target.value };
                      setLocFaqs(copy);
                    }}
                    placeholder="e.g. What software services does TryangleTech offer in this city?"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Direct AI Answer (Concise citation for Perplexity/ChatGPTBot)</label>
                  <textarea
                    rows={2}
                    value={faq.a}
                    onChange={(e) => {
                      const copy = [...locFaqs];
                      copy[fIdx] = { ...copy[fIdx], a: e.target.value };
                      setLocFaqs(copy);
                    }}
                    placeholder="e.g. TryangleTech develops bespoke Next.js web applications, mobile apps, and custom software systems with 350+ delivered projects."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CARD 4: GEO IDENTITY & LOCAL GRAPH (When editing Location Clones) */}
      {isEditingLocation && (
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
            📍 Local GEO Entity & GPS Coordinates
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            <div>
              <CitySearchSelect
                label="City Name *"
                value={locCity}
                onChange={(val) => setLocCity(val)}
                onSelectCity={(cityData: CitySearchResult) => {
                  setLocCity(cityData.city);
                  if (cityData.country) setLocCountry(cityData.country);
                  if (cityData.region) setLocRegion(cityData.region);
                  if (cityData.latitude) setLocLatitude(String(cityData.latitude));
                  if (cityData.longitude) setLocLongitude(String(cityData.longitude));
                  if (cityData.postalCode) setLocPostalCode(cityData.postalCode);
                  if (!locSlug || locSlug === 'main') setLocSlug(cityData.slug);
                }}
                placeholder="Search city (e.g. Varanasi, Mumbai, Dubai, London)..."
                required
              />
            </div>
            <div>
              <label style={labelStyle}>URL Slug (/location/[slug]) *</label>
              <input type="text" value={locSlug} onChange={(e) => setLocSlug(e.target.value)} style={inputStyle} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Region</label>
              <select value={locRegion} onChange={(e) => setLocRegion(e.target.value as any)} style={{ ...inputStyle, backgroundColor: '#FFFFFF' }}>
                {REGION_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Country</label>
              <input type="text" value={locCountry} onChange={(e) => setLocCountry(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Postal Code</label>
              <input type="text" value={locPostalCode} onChange={(e) => setLocPostalCode(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label style={labelStyle}>GPS Latitude</label>
              <input type="number" step="any" value={locLatitude} onChange={(e) => setLocLatitude(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>GPS Longitude</label>
              <input type="number" step="any" value={locLongitude} onChange={(e) => setLocLongitude(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px' }}>
            <input
              type="checkbox"
              id="editPopular"
              checked={locPopular}
              onChange={(e) => setLocPopular(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--brand-blue, #1833fe)', cursor: 'pointer' }}
            />
            <label htmlFor="editPopular" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              🌟 Featured / Popular Commercial Hub (Highlights on Directory & Menus)
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
