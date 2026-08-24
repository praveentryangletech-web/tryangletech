'use client';

import React from 'react';
import { HomeHeroSection } from '@/backend/services/home/home.types';
import HomeImageUploadField from './HomeImageUploadField';

interface HeroTabProps {
  hero: HomeHeroSection;
  setHero: React.Dispatch<React.SetStateAction<HomeHeroSection>>;
  onOpenAssetPicker: (target: string) => void;
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

export default function HeroTab({ hero, setHero, onOpenAssetPicker }: HeroTabProps) {
  const avatars = hero.avatars || ['#38bdf8', '#3b82f6', '#a855f7'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 1: Hero Banner
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Above the Fold
        </span>
      </div>

      <div>
        <label style={labelStyle}>Headline Proposition *</label>
        <textarea
          rows={2}
          value={hero.headline || ''}
          onChange={(e) => setHero({ ...hero, headline: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="e.g. FinTech, SaaS and enterprise software development in Gandhinagar & GIFT City"
        />
      </div>

      <div>
        <label style={labelStyle}>Subheadline / Supporting Narrative</label>
        <textarea
          rows={3}
          value={hero.subheadline || ''}
          onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="e.g. Building next-generation web platforms, cloud software, and API integrations..."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        <div>
          <label style={labelStyle}>Primary CTA Button Text</label>
          <input
            type="text"
            value={hero.ctaText || ''}
            onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Talk to us today"
          />
        </div>
        <div>
          <label style={labelStyle}>Primary CTA Button Link</label>
          <input
            type="text"
            value={hero.ctaLink || ''}
            onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
            style={inputStyle}
            placeholder="e.g. /contact"
          />
        </div>
      </div>

      {/* Hero Dashboard Image with Device Upload & Existing Asset Picker */}
      <div
        style={{
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '18px',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', fontSize: '0.9rem' }}>
          Hero Visual Assets
        </div>

        <HomeImageUploadField
          label="Hero Dashboard Showcase Image"
          value={hero.dashboardImage || ''}
          onChange={(url) => setHero({ ...hero, dashboardImage: url })}
          onOpenAssetPicker={() => onOpenAssetPicker('hero.dashboardImage')}
          placeholder="/Taskopia_files/6915c8033293ed4e29e1f4ac_taskopia-hero-one-dashbord.avif or https://..."
          previewWidth={120}
          previewHeight={72}
          recommendedDimensions="1078 × 604 px (16:9 ratio)"
          helperText="High-resolution hero dashboard preview shown prominently in the hero section."
        />

        {/* Social Proof Client Avatars */}
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '14px', marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '5px' }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>
              Social Proof Client Avatars (3 Images or Hex Color Codes)
            </label>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: '#1833FE',
                border: '1px solid #BFDBFE',
              }}
            >
              Recommended: 120 × 120 px (1:1 ratio)
            </span>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.75rem', color: '#64748B' }}>
            Enter image URLs (e.g. <code>https://...</code>, <code>/Taskopia_files/...</code>) or hex color codes (e.g. <code>#38bdf8</code>).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {[0, 1, 2].map((idx) => {
              const avVal = avatars[idx] || (idx === 0 ? '#38bdf8' : idx === 1 ? '#3b82f6' : '#a855f7');
              const isImg = avVal.startsWith('http') || avVal.startsWith('/') || avVal.startsWith('data:');

              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #CBD5E1',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                      Avatar #{idx + 1}
                    </span>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: !isImg ? avVal : '#F1F5F9',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '1.5px solid #CBD5E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isImg && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avVal} alt={`Avatar ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder={`Avatar #${idx + 1} (URL or Hex)`}
                    value={avVal}
                    onChange={(e) => {
                      const copy = [...avatars];
                      copy[idx] = e.target.value;
                      setHero({ ...hero, avatars: copy });
                    }}
                    style={{ ...inputStyle, padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                  />

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => onOpenAssetPicker(`hero.avatar.${idx}`)}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #BFDBFE',
                        backgroundColor: '#EFF6FF',
                        color: '#1833FE',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>🖼 Pick Asset</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
