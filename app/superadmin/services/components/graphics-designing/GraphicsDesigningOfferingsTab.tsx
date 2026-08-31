'use client';

import React from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';

interface GraphicsDesigningOfferingsTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
}

export default function GraphicsDesigningOfferingsTab({
  formData,
  setFormData,
}: GraphicsDesigningOfferingsTabProps) {
  const offerings = formData?.offerings || ({} as any);

  const updateOfferingsHeader = (field: 'subBadgeText' | 'headline', value: string) => {
    setFormData((prev) => ({
      ...prev,
      offerings: {
        ...prev?.offerings,
        [field]: value,
      },
    }));
  };

  const updateCardField = (index: number, field: string, value: any) => {
    const cards = [...(offerings?.cards || [])];
    if (cards[index]) {
      cards[index] = { ...cards[index], [field]: value };
      setFormData((prev) => ({
        ...prev,
        offerings: {
          ...prev?.offerings,
          cards,
        },
      }));
    }
  };

  const updateCardPoint = (cardIndex: number, pointIndex: number, value: string) => {
    const cards = [...(offerings?.cards || [])];
    if (cards[cardIndex]) {
      const points = [...(cards[cardIndex].points || [])];
      points[pointIndex] = value;
      cards[cardIndex].points = points;
      setFormData((prev) => ({
        ...prev,
        offerings: {
          ...prev?.offerings,
          cards,
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
          1. Offerings Header &amp; Overview
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Category Sub-Badge</label>
            <input
              type="text"
              value={offerings.subBadgeText || ''}
              onChange={(e) => updateOfferingsHeader('subBadgeText', e.target.value)}
              placeholder="e.g. specialized design offerings"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              type="text"
              value={offerings.headline || ''}
              onChange={(e) => updateOfferingsHeader('headline', e.target.value)}
              placeholder="Comprehensive design solutions tailored to your brand"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* 2. Offering Cards */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
          2. Specialized Design Offering Cards ({offerings.cards?.length || 0})
        </h3>
        <p style={{ fontSize: '0.825rem', color: '#64748B', marginBottom: '16px' }}>
          Manage the 6 comprehensive core design service cards (Logo, Brochure, Visiting Card, Letterhead, Label, Hoarding).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {(offerings.cards || []).map((card: any, idx: number) => (
            <div
              key={card.id || idx}
              style={{
                padding: '0',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: 'var(--brand-blue, #1833fe)',
                    backgroundColor: '#EFF6FF',
                    padding: '4px 10px',
                    borderRadius: '999px',
                  }}
                >
                  Service #{idx + 1}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'monospace' }}>
                  icon: {card.iconSvgName || 'default'}
                </span>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Card Title</label>
                <input
                  type="text"
                  value={card.title || ''}
                  onChange={(e) => updateCardField(idx, 'title', e.target.value)}
                  placeholder="e.g. Logo Design"
                  style={{ ...inputStyle, fontWeight: 700 }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows={3}
                  value={card.desc || ''}
                  onChange={(e) => updateCardField(idx, 'desc', e.target.value)}
                  placeholder="Describe this design deliverable..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ ...labelStyle, color: '#334155' }}>Key Highlights / Deliverables (3 Points)</label>
                {(card.points || []).map((point: string, pIdx: number) => (
                  <div key={pIdx} style={{ marginBottom: '6px' }}>
                    <input
                      type="text"
                      value={point || ''}
                      onChange={(e) => updateCardPoint(idx, pIdx, e.target.value)}
                      placeholder={`Point #${pIdx + 1}`}
                      style={{ ...inputStyle, fontSize: '0.8rem', padding: '8px 12px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
