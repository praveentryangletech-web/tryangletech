'use client';

import React from 'react';
import { DigitalMarketingContentDTO, DigitalMarketingFaqItem } from '@/backend/services/services/services.types';
import { PlusIcon, TrashIcon } from '../common/StandardSvgIcons';
import {
  standardAddButtonStyle,
  standardAddButtonHover,
  standardDeleteButtonStyle,
  standardDeleteButtonHover,
} from '../common/AdminButtonStyles';

interface DigitalMarketingFaqsTabProps {
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

export default function DigitalMarketingFaqsTab({
  formData,
  setFormData,
}: DigitalMarketingFaqsTabProps) {
  const faqs = formData.faqs || [];

  const handleFaqChange = (index: number, field: 'q' | 'a', value: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.faqs || [])];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: value };
      }
      return { ...prev, faqs: copy };
    });
  };

  const addFaq = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const newFaq = {
        id: `faq-${Date.now()}`,
        q: '',
        a: '',
      };
      const copy = [newFaq, ...(prev.faqs || [])];
      return { ...prev, faqs: copy };
    });
  };

  const removeFaq = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.faqs || [])];
      copy.splice(index, 1);
      return { ...prev, faqs: copy };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div
        style={{
          backgroundColor: 'transparent',
          borderRadius: '0',
          border: 'none',
          padding: '0',
          boxShadow: 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Dynamic FAQs ({faqs.length})
          </h3>
          <button
            type="button"
            onClick={addFaq}
            style={standardAddButtonStyle}
            {...standardAddButtonHover}
          >
            <PlusIcon style={{ width: '14px', height: '14px' }} />
            <span>Add FAQ</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={faq.id || idx}
              style={{
                backgroundColor: 'transparent',
                padding: '0',
                borderRadius: '0',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5' }}>
                  Question #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeFaq(idx)}
                  style={{
                    padding: '4px',
                    borderRadius: '4px',
                    border: '1px solid #FCA5A5',
                    backgroundColor: '#FEF2F2',
                    color: '#EF4444',
                    cursor: 'pointer',
                  }}
                  title="Remove FAQ"
                >
                  <TrashIcon style={{ width: '14px', height: '14px' }} />
                </button>
              </div>

              <div>
                <label style={labelStyle}>Question (Q)</label>
                <input
                  style={{ ...inputStyle, height: '38px' }}
                  value={faq.q || ''}
                  onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                  placeholder="e.g. How soon will I see results from SEO?"
                />
              </div>

              <div>
                <label style={labelStyle}>Answer (A)</label>
                <textarea
                  style={{ ...textareaStyle, minHeight: '75px' }}
                  value={faq.a || ''}
                  onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                  placeholder="Provide a clear, detailed answer..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
