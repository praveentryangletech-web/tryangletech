'use client';

import React from 'react';
import { DigitalMarketingContentDTO } from '@/backend/services/services/services.types';

interface DigitalMarketingStatementTabProps {
  formData: DigitalMarketingContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<DigitalMarketingContentDTO | null>>;
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

export default function DigitalMarketingStatementTab({
  formData,
  setFormData,
}: DigitalMarketingStatementTabProps) {
  const statement = formData.statement || ({} as any);

  const handleChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        statement: { ...prev.statement, [field]: val },
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 16px 0',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '12px',
          }}
        >
          Mission Statement &amp; Animated Text Reveal Banner
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Pill Badge / Tagline Text</label>
            <input
              style={inputStyle}
              value={statement.subBadgeText || ''}
              onChange={(e) => handleChange('subBadgeText', e.target.value)}
              placeholder="e.g. tryangletech"
            />
          </div>

          <div>
            <label style={labelStyle}>Scroll Text Reveal Statement</label>
            <textarea
              style={{ ...textareaStyle, minHeight: '110px' }}
              value={statement.statement || ''}
              onChange={(e) => handleChange('statement', e.target.value)}
              placeholder="We craft full-funnel marketing strategies that turn your audience into paying customers."
            />
            <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
              This statement features interactive word-by-word scroll revelation on the public page.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
