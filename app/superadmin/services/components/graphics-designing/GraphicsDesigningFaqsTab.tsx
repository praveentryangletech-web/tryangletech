'use client';

import React from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';

interface GraphicsDesigningFaqsTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
}

export default function GraphicsDesigningFaqsTab({
  formData,
  setFormData,
}: GraphicsDesigningFaqsTabProps) {
  const faqs = formData?.faqs || [];

  const addFaq = () => {
    const list = [...faqs];
    list.push({
      id: `faq-${Date.now()}`,
      q: 'New Question?',
      a: 'Detailed answer explaining your graphic design deliverables and workflow.',
    });
    setFormData((prev) => ({
      ...prev,
      faqs: list,
    }));
  };

  const updateFaq = (index: number, field: 'q' | 'a', value: string) => {
    const list = [...faqs];
    if (list[index]) {
      list[index] = { ...list[index], [field]: value };
      setFormData((prev) => ({
        ...prev,
        faqs: list,
      }));
    }
  };

  const removeFaq = (index: number) => {
    const list = faqs.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      faqs: list,
    }));
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Frequently Asked Questions ({faqs.length})
          </h3>
          <p style={{ fontSize: '0.825rem', color: '#64748B', margin: '4px 0 0 0' }}>
            Interactive accordion questions displayed on the landing page and indexed in Google FAQPage structured data.
          </p>
        </div>
        <button
          type="button"
          onClick={addFaq}
          style={{
            padding: '8px 16px',
            backgroundColor: '#EFF6FF',
            color: 'var(--brand-blue, #1833fe)',
            border: '1px solid #BFDBFE',
            borderRadius: '6px',
            fontSize: '0.825rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          + Add FAQ Item
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            style={{
              padding: '20px',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#0F172A' }}>
                Question #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeFaq(idx)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#EF4444',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Question</label>
              <input
                type="text"
                value={faq.q || ''}
                onChange={(e) => updateFaq(idx, 'q', e.target.value)}
                placeholder="e.g. Do I get the source files for my designs?"
                style={{ ...inputStyle, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Answer</label>
              <textarea
                rows={3}
                value={faq.a || ''}
                onChange={(e) => updateFaq(idx, 'a', e.target.value)}
                placeholder="Provide a clear, detailed answer..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
