'use client';

import React from 'react';
import { CustomSoftwareContentDTO, CustomSoftwareStatItem } from '@/backend/services/services/services.types';
import { PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface CustomSoftwareStatsTabProps {
  formData: CustomSoftwareContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<CustomSoftwareContentDTO | null>>;
  onOpenAssetPicker?: (target: string) => void;
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '6px',
};

export default function CustomSoftwareStatsTab({
  formData,
  setFormData,
}: CustomSoftwareStatsTabProps) {
  const stats = formData.stats || ({} as any);
  const items = stats.items || [];

  const handleStatsChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, stats: { ...prev.stats, [field]: val } };
    });
  };

  const handleAddStat = () => {
    const newStat: CustomSoftwareStatItem = {
      id: `stat-${Date.now()}`,
      value: '100+',
      label: 'New Metric Milestone',
    };
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          items: [...(prev.stats?.items || []), newStat],
        },
      };
    });
  };

  const handleUpdateStat = (idx: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.stats?.items || [])];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, stats: { ...prev.stats, items: copy } };
    });
  };

  const handleRemoveStat = (idx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.stats?.items || [])];
      copy.splice(idx, 1);
      return { ...prev, stats: { ...prev.stats, items: copy } };
    });
  };

  return (
    <div style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Section */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          Numbers & Impact Header
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Sub-Badge Text</label>
            <input
              type="text"
              style={inputStyle}
              value={stats.subBadgeText || ''}
              onChange={(e) => handleStatsChange('subBadgeText', e.target.value)}
              placeholder="our numbers"
            />
          </div>

          <div>
            <label style={labelStyle}>Headline (Scroll Reveal Text)</label>
            <input
              type="text"
              style={inputStyle}
              value={stats.headline || ''}
              onChange={(e) => handleStatsChange('headline', e.target.value)}
              placeholder="Businesses across India trust us to build software that actually works"
            />
          </div>
        </div>
      </div>

      {/* 2. Stat Items */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Metrics & Achievements ({items.length})</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748B' }}>Numbers shown with animated card borders</p>
          </div>
          <button
            type="button"
            onClick={handleAddStat}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <PlusIcon /> Add Metric
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {items.map((item, idx) => (
            <div key={item.id || idx} style={{ padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Metric #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStat(idx)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                >
                  <TrashIcon />
                </button>
              </div>

              <div>
                <label style={labelStyle}>Number Value</label>
                <input
                  type="text"
                  style={{ ...inputStyle, fontWeight: 800, color: '#1833FE', fontSize: '1.1rem' }}
                  value={item.value}
                  onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                  placeholder="500+"
                />
              </div>

              <div>
                <label style={labelStyle}>Label / Description</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={item.label}
                  onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                  placeholder="Software projects delivered"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
