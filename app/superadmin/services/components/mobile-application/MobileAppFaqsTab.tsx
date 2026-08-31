'use client';

import React from 'react';
import { MobileAppContentDTO, MobileAppFaqItem } from '@/backend/services/services/services.types';
import { PlusIcon, TrashIcon, HelpIcon } from '../common/StandardSvgIcons';

interface MobileAppFaqsTabProps {
  formData: MobileAppContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<MobileAppContentDTO | null>>;
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

export default function MobileAppFaqsTab({ formData, setFormData }: MobileAppFaqsTabProps) {
  const handleFaqChange = (index: number, field: 'q' | 'a', val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const faqs = [...(prev.faqs || [])];
      faqs[index] = { ...faqs[index], [field]: val };
      return { ...prev, faqs };
    });
  };

  const handleAddFaq = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const newFaq: MobileAppFaqItem = {
        id: `faq-${Date.now()}`,
        q: 'New Question?',
        a: 'Answer explanation here...',
      };
      return {
        ...prev,
        faqs: [...(prev.faqs || []), newFaq],
      };
    });
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const faqs = (prev.faqs || []).filter((_, idx) => idx !== index);
      return { ...prev, faqs };
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
            7. Dynamic FAQs & Answer Engine Optimization (AEO)
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Manage the interactive accordion questions and answers. These automatically inject Schema.org FAQPage structured data for Google Search & AI engines.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddFaq}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            backgroundColor: '#EFF6FF',
            color: 'var(--brand-blue, #1833fe)',
            border: '1px solid #BFDBFE',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <PlusIcon size={14} color="var(--brand-blue, #1833fe)" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(formData.faqs || []).map((faq, idx) => (
          <div
            key={faq.id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpIcon size={16} color="var(--brand-blue, #1833fe)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                  Question #{idx + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFaq(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <TrashIcon size={12} color="#EF4444" />
                <span>Remove</span>
              </button>
            </div>

            <div>
              <label style={labelStyle}>Question *</label>
              <input
                type="text"
                placeholder="e.g. Do you build apps for both iPhone and Android?"
                value={faq.q || ''}
                onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                style={{ ...inputStyle, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Answer Explanation *</label>
              <textarea
                rows={3}
                placeholder="Clear answer for users and search bots..."
                value={faq.a || ''}
                onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                style={textareaStyle}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
