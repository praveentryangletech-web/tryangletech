'use client';

import React from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';

interface GraphicsDesigningStatsTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
}

export default function GraphicsDesigningStatsTab({
  formData,
  setFormData,
}: GraphicsDesigningStatsTabProps) {
  const statsSection = formData?.stats || ({} as any);

  const updateStatsHeader = (field: 'subBadgeText' | 'headline', value: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev?.stats,
        [field]: value,
      },
    }));
  };

  const updateStatItem = (index: number, field: 'value' | 'label', value: string) => {
    const stats = [...(statsSection?.stats || [])];
    if (stats[index]) {
      stats[index] = { ...stats[index], [field]: value };
      setFormData((prev) => ({
        ...prev,
        stats: {
          ...prev?.stats,
          stats,
        },
      }));
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #CBD5E1',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    fontSize: '0.875rem',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#475569',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Typography */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          1. Impact Metrics &amp; Section Header
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Category Sub-Badge</label>
            <input
              type="text"
              value={statsSection.subBadgeText || ''}
              onChange={(e) => updateStatsHeader('subBadgeText', e.target.value)}
              placeholder="e.g. our numbers"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              type="text"
              value={statsSection.headline || ''}
              onChange={(e) => updateStatsHeader('headline', e.target.value)}
              placeholder="Trusted by businesses across Ahmedabad for creative design that delivers real results"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* 2. Milestone Stats Cards */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          2. Impact Milestone Counters (4 Cards)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {(statsSection.stats || []).map((stat: any, idx: number) => (
            <div
              key={stat.id || idx}
              style={{
                padding: '20px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: 'var(--brand-blue, #1833fe)',
                  backgroundColor: '#EFF6FF',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  display: 'inline-block',
                  marginBottom: '12px',
                }}
              >
                Milestone #{idx + 1}
              </span>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Metric Value / Number</label>
                <input
                  type="text"
                  value={stat.value || ''}
                  onChange={(e) => updateStatItem(idx, 'value', e.target.value)}
                  placeholder="e.g. 500+"
                  style={{ ...inputStyle, fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Metric Label</label>
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={(e) => updateStatItem(idx, 'label', e.target.value)}
                  placeholder="e.g. Design projects delivered"
                  style={inputStyle}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
