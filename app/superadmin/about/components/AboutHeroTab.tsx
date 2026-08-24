'use client';

import React from 'react';
import { AboutHeroSection, AboutStatItem } from '@/backend/services/about/about.types';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';

interface AboutHeroTabProps {
  hero: AboutHeroSection;
  setHero: React.Dispatch<React.SetStateAction<AboutHeroSection>>;
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

const COLOR_PRESETS = ['#38bdf8', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];

export default function AboutHeroTab({ hero, setHero, onOpenAssetPicker }: AboutHeroTabProps) {
  const avatars = hero.avatars || ['#38bdf8', '#3b82f6', '#a855f7'];
  const stats = hero.stats || [];

  const handleUpdateStat = (idx: number, field: 'value' | 'label', val: string) => {
    const updated = [...stats];
    updated[idx] = { ...updated[idx], [field]: val };
    setHero({ ...hero, stats: updated });
  };

  const handleAddStat = () => {
    const newStat: AboutStatItem = {
      id: `stat-${Date.now()}`,
      value: '100+',
      label: 'New Statistic Metric',
    };
    setHero({ ...hero, stats: [...stats, newStat] });
  };

  const handleRemoveStat = (idx: number) => {
    const updated = stats.filter((_, i) => i !== idx);
    setHero({ ...hero, stats: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', backgroundColor: 'transparent' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 1: About Hero & Key Stats
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Above the Fold
        </span>
      </div>

      {/* Sub Badge & Headline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Overtitle / Sub-Badge Text</label>
          <input
            type="text"
            value={hero.subBadgeText || ''}
            onChange={(e) => setHero({ ...hero, subBadgeText: e.target.value })}
            style={inputStyle}
            placeholder="e.g. about Tryangletech"
          />
        </div>
        <div>
          <label style={labelStyle}>Main Hero Headline *</label>
          <input
            type="text"
            value={hero.headline || ''}
            onChange={(e) => setHero({ ...hero, headline: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Your Trusted IT & Digital Partner"
          />
        </div>
      </div>

      {/* Paragraphs */}
      <div>
        <label style={labelStyle}>Intro Paragraph 1 *</label>
        <textarea
          rows={2}
          value={hero.introParagraph1 || ''}
          onChange={(e) => setHero({ ...hero, introParagraph1: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Tryangletech is a full-service IT company..."
        />
      </div>

      <div>
        <label style={labelStyle}>Intro Paragraph 2 (Value Proposition)</label>
        <textarea
          rows={2}
          value={hero.introParagraph2 || ''}
          onChange={(e) => setHero({ ...hero, introParagraph2: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="We don't just write code, we partner with you..."
        />
      </div>

      {/* Key Company Statistics */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>📊 Live Company Statistics</strong>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748B' }}>
              Displayed directly below the hero intro text on the About page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddStat}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              border: '1px solid #C7D2FE',
              backgroundColor: '#EEF2FF',
              color: '#4338CA',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Add Stat
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {stats.map((stat, idx) => (
            <div key={stat.id || idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B' }}>STAT #{idx + 1}</span>
                {stats.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStat(idx)}
                    style={{ border: 'none', background: 'transparent', color: '#EF4444', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <label style={{ ...labelStyle, fontSize: '0.72rem', marginBottom: '3px' }}>Metric Value (e.g. 7+, 350+)</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                    style={{ ...inputStyle, padding: '0.45rem 0.75rem', fontWeight: 800, color: '#2d3a8c' }}
                  />
                </div>
                <div>
                  <label style={{ ...labelStyle, fontSize: '0.72rem', marginBottom: '3px' }}>Metric Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                    style={{ ...inputStyle, padding: '0.45rem 0.75rem' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Avatar Color Pickers & Media Asset Swatches */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>🎨 Client Trust Avatar Dots (Color Pickers & Images)</strong>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748B' }}>
              Displayed overlapping on the left of the Hero sub-badge. Pick custom brand colors or choose custom avatar images.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {[0, 1, 2].map((idx) => {
            const avVal = avatars[idx] || (idx === 0 ? '#38bdf8' : idx === 1 ? '#3b82f6' : '#a855f7');
            const isImg = avVal.startsWith('http') || avVal.startsWith('/') || avVal.startsWith('data:');
            const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(avVal);
            const hexVal = isHex
              ? avVal.length === 4
                ? `#${avVal[1]}${avVal[1]}${avVal[2]}${avVal[2]}${avVal[3]}${avVal[3]}`
                : avVal
              : idx === 0
              ? '#38bdf8'
              : idx === 1
              ? '#3b82f6'
              : '#a855f7';

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

                  {/* Interactive Preview Circle (Clicking opens native Color Picker if color) */}
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
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
                    placeholder={`Avatar #${idx + 1} (Hex # or URL)`}
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
                  {COLOR_PRESETS.map((c) => (
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
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                    <span>Pick Color</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => onOpenAssetPicker(`aboutHeroAvatar_${idx}`)}
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
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Choose Asset</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Visual Images with Alt Text */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <HomeImageUploadField
          label="Hero Showcase Visual 1 (Hand Holding Tech)"
          value={hero.heroImage1 || ''}
          onChange={(val) => setHero({ ...hero, heroImage1: val })}
          altValue={hero.heroImage1Alt}
          onAltChange={(alt) => setHero({ ...hero, heroImage1Alt: alt })}
          onOpenAssetPicker={() => onOpenAssetPicker('aboutHero1')}
          recommendedDimensions="680 × 520 px (WebP)"
          previewHeight={110}
          previewWidth={140}
        />
        <HomeImageUploadField
          label="Hero Showcase Visual 2 (Mobile App Preview)"
          value={hero.heroImage2 || ''}
          onChange={(val) => setHero({ ...hero, heroImage2: val })}
          altValue={hero.heroImage2Alt}
          onAltChange={(alt) => setHero({ ...hero, heroImage2Alt: alt })}
          onOpenAssetPicker={() => onOpenAssetPicker('aboutHero2')}
          recommendedDimensions="480 × 620 px (WebP)"
          previewHeight={110}
          previewWidth={100}
        />
      </div>

      {/* Hero Bottom Banner Image with Alt Text */}
      <HomeImageUploadField
        label="Hero Speciality Bottom Banner Image"
        value={hero.bannerImage || ''}
        onChange={(val) => setHero({ ...hero, bannerImage: val })}
        altValue={hero.bannerImageAlt}
        onAltChange={(alt) => setHero({ ...hero, bannerImageAlt: alt })}
        onOpenAssetPicker={() => onOpenAssetPicker('aboutBanner')}
        recommendedDimensions="1200 × 500 px (WebP)"
        previewHeight={130}
        previewWidth={280}
      />
    </div>
  );
}
