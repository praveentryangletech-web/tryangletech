'use client';

import React from 'react';
import { WebDevContentDTO } from '@/backend/services/services/services.types';
import { PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface SubServiceFaqsTabProps {
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

export default function SubServiceFaqsTab({ formData, setFormData }: SubServiceFaqsTabProps) {
  const handleFaqChange = (index: number, field: 'question' | 'answer', val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [field]: val };
      return { ...prev, faqs };
    });
  };

  const handleAddFaq = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        faqs: [
          ...prev.faqs,
          {
            id: `faq-${Date.now()}`,
            question: 'New Question?',
            answer: 'Answer to the question goes here.',
          },
        ],
      };
    });
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const faqs = prev.faqs.filter((_, i) => i !== index);
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
            5. Frequently Asked Questions (FAQs) & AEO
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Interactive accordion questions with dynamic Schema.org FAQPage structured data for Google Search.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddFaq}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#EFF6FF',
            color: 'var(--brand-blue, #1833fe)',
            border: '1px solid #BFDBFE',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <PlusIcon size={14} color="var(--brand-blue, #1833fe)" />
          <span>Add FAQ Item</span>
        </button>
      </div>

      {/* FAQs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {formData.faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
                Question #{idx + 1}
              </span>
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
              <label style={labelStyle}>Question Text</label>
              <input
                type="text"
                placeholder="Question text"
                value={faq.question}
                onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                style={{ ...inputStyle, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Answer Text</label>
              <textarea
                rows={3}
                placeholder="Detailed answer text..."
                value={faq.answer}
                onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                style={textareaStyle}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
