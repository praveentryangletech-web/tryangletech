'use client';

import React from 'react';
import { ServiceHeroSection } from '@/backend/services/services/services.types';
import { ShieldIcon, PlusIcon, CloseIcon } from '../common/StandardSvgIcons';

interface ServiceHeroTabProps {
  hero: ServiceHeroSection;
  setHero: React.Dispatch<React.SetStateAction<ServiceHeroSection>>;
  onOpenAssetPicker: (target: string) => void;
}

export default function ServiceHeroTab({ hero, setHero }: ServiceHeroTabProps) {
  const handleTrustBadgeChange = (idx: number, val: string) => {
    const updated = [...(hero.trustBadges || [])];
    updated[idx] = val;
    setHero((prev) => ({ ...prev, trustBadges: updated }));
  };

  const handleAddTrustBadge = () => {
    setHero((prev) => ({
      ...prev,
      trustBadges: [...(prev.trustBadges || []), 'Quality Assured'],
    }));
  };

  const handleRemoveTrustBadge = (idx: number) => {
    const updated = (hero.trustBadges || []).filter((_, i) => i !== idx);
    setHero((prev) => ({ ...prev, trustBadges: updated }));
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)', margin: 0 }}>
            1. Hero Header & Overview Banner
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.785rem', color: '#64748B' }}>
            Configure the main above-the-fold headline, introduction, action buttons, and trust badges on /service.
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Above the Fold
        </span>
      </div>

      {/* Sub Badge & Main Headline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
            Overtitle / Sub-Badge Text
          </label>
          <input
            type="text"
            value={hero.subBadgeText || ''}
            onChange={(e) => setHero((prev) => ({ ...prev, subBadgeText: e.target.value }))}
            placeholder="e.g. Our Services"
            style={{
              width: '100%',
              height: '40px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem',
              color: '#1E293B',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
            Hero Main Headline *
          </label>
          <input
            type="text"
            value={hero.headline || ''}
            onChange={(e) => setHero((prev) => ({ ...prev, headline: e.target.value }))}
            placeholder="Comprehensive Digital Solutions for Your Business Growth"
            style={{
              width: '100%',
              height: '40px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem',
              color: '#1E293B',
              boxSizing: 'border-box',
              fontWeight: 600,
            }}
          />
        </div>
      </div>

      {/* Subheadline / Intro Description */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
          Hero Subheadline / Value Pitch *
        </label>
        <textarea
          rows={3}
          value={hero.subheadline || ''}
          onChange={(e) => setHero((prev) => ({ ...prev, subheadline: e.target.value }))}
          placeholder="From custom software to data-driven marketing, we provide end-to-end services..."
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            fontSize: '0.85rem',
            color: '#1E293B',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* CTA Buttons */}
      <div style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}>
        <strong style={{ fontSize: '0.85rem', color: '#0F172A', display: 'block', marginBottom: '12px' }}>
          🔗 Call-To-Action (CTA) Buttons
        </strong>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Primary Button Text
            </label>
            <input
              type="text"
              value={hero.primaryBtnText || ''}
              onChange={(e) => setHero((prev) => ({ ...prev, primaryBtnText: e.target.value }))}
              placeholder="Get started today"
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Primary Button Target URL
            </label>
            <input
              type="text"
              value={hero.primaryBtnLink || ''}
              onChange={(e) => setHero((prev) => ({ ...prev, primaryBtnLink: e.target.value }))}
              placeholder="/contact"
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Secondary Button Text
            </label>
            <input
              type="text"
              value={hero.secondaryBtnText || ''}
              onChange={(e) => setHero((prev) => ({ ...prev, secondaryBtnText: e.target.value }))}
              placeholder="View portfolio"
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Secondary Button Target URL
            </label>
            <input
              type="text"
              value={hero.secondaryBtnLink || ''}
              onChange={(e) => setHero((prev) => ({ ...prev, secondaryBtnLink: e.target.value }))}
              placeholder="/portfolio"
              style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
            />
          </div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldIcon size={16} color="var(--brand-blue, #1833fe)" />
              <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>Trust Indicators & Value Pills</strong>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748B' }}>
              Checked indicator badges shown below the action buttons.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddTrustBadge}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
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
            <PlusIcon size={12} color="#4338CA" />
            <span>Add Badge</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {(hero.trustBadges || []).map((badge, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFFFFF',
                padding: '6px 8px 6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <input
                type="text"
                value={badge}
                onChange={(e) => handleTrustBadgeChange(idx, e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.825rem',
                  color: '#1E293B',
                  fontWeight: 600,
                  backgroundColor: 'transparent',
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveTrustBadge(idx)}
                title="Remove badge"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  color: '#EF4444',
                  cursor: 'pointer',
                  padding: 0,
                  marginRight: '2px',
                  flexShrink: 0,
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <CloseIcon size={12} color="#EF4444" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
