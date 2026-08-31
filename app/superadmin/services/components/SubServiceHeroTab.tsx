'use client';

import React from 'react';
import { WebDevContentDTO, WebDevHeroBullet } from '@/backend/services/services/services.types';

interface SubServiceHeroTabProps {
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

export default function SubServiceHeroTab({ formData, setFormData }: SubServiceHeroTabProps) {
  const handleHeroChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, hero: { ...prev.hero, [field]: val } };
    });
  };

  const handleHeroBulletChange = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const bullets = [...prev.hero.bullets];
      bullets[index] = { ...bullets[index], [field]: val };
      return { ...prev, hero: { ...prev.hero, bullets } };
    });
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            1. Hero Header & Overview Banner
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Configure the main above-the-fold headline, introduction paragraph, bullet highlights, and action buttons.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '4px 10px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Above the Fold
        </span>
      </div>

      {/* Sub Badge & Main Headline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Overtitle / Sub-Badge Text</label>
          <input
            type="text"
            value={formData.hero.subBadgeText || ''}
            onChange={(e) => handleHeroChange('subBadgeText', e.target.value)}
            placeholder="e.g. Web Development"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Hero Main Headline *</label>
          <input
            type="text"
            value={formData.hero.headline || ''}
            onChange={(e) => handleHeroChange('headline', e.target.value)}
            placeholder="Websites that bring in customers, not just look nice"
            style={{ ...inputStyle, fontWeight: 600 }}
          />
        </div>
      </div>

      {/* Subheadline Paragraph */}
      <div>
        <label style={labelStyle}>Hero Subheadline / Value Pitch *</label>
        <textarea
          rows={3}
          value={formData.hero.subheadline || ''}
          onChange={(e) => handleHeroChange('subheadline', e.target.value)}
          placeholder="Detailed value proposition..."
          style={textareaStyle}
        />
      </div>

      {/* Benefit Bullets (3 items) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{ color: 'var(--brand-blue, #1833fe)', fontSize: '1rem' }}>⚡</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Key Benefit Bullets (3 Items)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {formData.hero.bullets.map((bullet, idx) => (
            <div
              key={bullet.id || idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px' }}>
                  #{idx + 1}
                </span>
                <input
                  type="text"
                  placeholder="Title (e.g. Fast and reliable)"
                  value={bullet.title}
                  onChange={(e) => handleHeroBulletChange(idx, 'title', e.target.value)}
                  style={{ ...inputStyle, height: '38px', flex: 1, fontWeight: 700 }}
                />
                <select
                  value={bullet.iconType || 'performance'}
                  onChange={(e) => handleHeroBulletChange(idx, 'iconType', e.target.value)}
                  style={{ ...inputStyle, height: '38px', width: '135px', fontSize: '0.8rem' }}
                >
                  <option value="performance">⚡ Performance</option>
                  <option value="seo">🔍 Search / SEO</option>
                  <option value="responsive">📱 Responsive</option>
                  <option value="custom">★ Star / Custom</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Description text"
                value={bullet.desc}
                onChange={(e) => handleHeroBulletChange(idx, 'desc', e.target.value)}
                style={{ ...inputStyle, height: '36px', fontSize: '0.825rem' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons & Badges */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span style={{ color: 'var(--brand-blue, #1833fe)', fontSize: '1rem' }}>🔗</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Call-To-Action (CTA) Buttons & Badge</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Primary Button Text</label>
            <input
              type="text"
              value={formData.hero.primaryBtnText || ''}
              onChange={(e) => handleHeroChange('primaryBtnText', e.target.value)}
              placeholder="Get started today"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Primary Button Target URL</label>
            <input
              type="text"
              value={formData.hero.primaryBtnLink || ''}
              onChange={(e) => handleHeroChange('primaryBtnLink', e.target.value)}
              placeholder="/contact"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Floating Pill Badge Text</label>
            <input
              type="text"
              value={formData.hero.smallBadgeText || ''}
              onChange={(e) => handleHeroChange('smallBadgeText', e.target.value)}
              placeholder="Built for you"
              style={inputStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
