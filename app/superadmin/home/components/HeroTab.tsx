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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '14px' }}>
            {[0, 1, 2].map((idx) => {
              const avVal = avatars[idx] || (idx === 0 ? '#38bdf8' : idx === 1 ? '#3b82f6' : '#a855f7');
              const isImg = avVal.startsWith('http') || avVal.startsWith('/') || avVal.startsWith('data:');
              const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(avVal);
              const hexVal = isHex
                ? (avVal.length === 4 ? `#${avVal[1]}${avVal[1]}${avVal[2]}${avVal[2]}${avVal[3]}${avVal[3]}` : avVal)
                : (idx === 0 ? '#38bdf8' : idx === 1 ? '#3b82f6' : '#a855f7');

              const PRESET_COLORS = ['#38bdf8', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];

              const handleColorChange = (newHex: string) => {
                const copy = [...avatars];
                copy[idx] = newHex;
                setHero({ ...hero, avatars: copy });
              };

              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #CBD5E1',
                    borderRadius: '10px',
                    padding: '12px',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>
                      Avatar #{idx + 1}
                    </span>

                    {/* Interactive Preview Circle (Clicking opens native Color Picker if not image) */}
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: !isImg ? avVal : '#F1F5F9',
                          overflow: 'hidden',
                          flexShrink: 0,
                          border: '2px solid #CBD5E1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                          cursor: isImg ? 'default' : 'pointer',
                        }}
                        title={isImg ? 'Image Avatar' : 'Click to pick color'}
                      >
                        {isImg ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={avVal} alt={`Avatar ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <input
                            type="color"
                            value={hexVal}
                            onChange={(e) => handleColorChange(e.target.value)}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              opacity: 0,
                              cursor: 'pointer',
                            }}
                            title="Choose Color"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder={`Avatar #${idx + 1} (URL or Hex #)`}
                      value={avVal}
                      onChange={(e) => handleColorChange(e.target.value)}
                      style={{ ...inputStyle, padding: '0.5rem 0.75rem', fontSize: '0.825rem', fontFamily: isHex ? 'monospace' : 'inherit' }}
                    />
                  </div>

                  {/* Quick Color Swatches Palette */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B' }}>
                      Presets:
                    </span>
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleColorChange(c)}
                        title={`Select ${c}`}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: c,
                          border: avVal.toLowerCase() === c.toLowerCase() ? '2px solid #000' : '1px solid rgba(0,0,0,0.15)',
                          cursor: 'pointer',
                          padding: 0,
                          transform: avVal.toLowerCase() === c.toLowerCase() ? 'scale(1.15)' : 'scale(1)',
                          transition: 'all 0.15s ease',
                        }}
                      />
                    ))}
                  </div>

                  {/* Dual Action Buttons: Color Picker & Media Library Asset */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <label
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        color: '#334155',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <input
                        type="color"
                        value={hexVal}
                        onChange={(e) => handleColorChange(e.target.value)}
                        style={{
                          position: 'absolute',
                          opacity: 0,
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer',
                        }}
                      />
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: hexVal,
                          border: '1px solid rgba(0,0,0,0.2)',
                          flexShrink: 0,
                        }}
                      />
                      <span>Pick Color</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => onOpenAssetPicker(`hero.avatar.${idx}`)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #BFDBFE',
                        backgroundColor: '#EFF6FF',
                        color: '#1833FE',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>🖼 Pick Image</span>
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
