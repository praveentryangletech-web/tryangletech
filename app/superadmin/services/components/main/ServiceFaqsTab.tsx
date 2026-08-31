'use client';

import React from 'react';
import { ServiceFaqItem } from '@/backend/services/services/services.types';

interface ServiceFaqsTabProps {
  faqs: ServiceFaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<ServiceFaqItem[]>>;
}

export default function ServiceFaqsTab({ faqs, setFaqs }: ServiceFaqsTabProps) {
  const handleFaqChange = (idx: number, field: keyof ServiceFaqItem, val: string) => {
    setFaqs((prev) => {
      const copy = [...prev];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return copy;
    });
  };

  const handleAddFaq = () => {
    setFaqs((prev) => [
      ...prev,
      {
        id: `faq-${Date.now()}`,
        q: 'New Frequently Asked Question?',
        a: 'Detailed answer explaining the service capability and process.',
      },
    ]);
  };

  const handleRemoveFaq = (idx: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== idx));
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
            5. Frequently Asked Questions (FAQs) & AEO
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.785rem', color: '#64748B' }}>
            Interactive accordion questions displayed at the bottom of the Services Overview page.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddFaq}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid #C7D2FE',
            backgroundColor: '#EEF2FF',
            color: '#4338CA',
            fontSize: '0.785rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          + Add FAQ
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-blue, #1833fe)',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                  Question #{idx + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFaq(idx)}
                style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
              >
                ✕ Delete
              </button>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                Question *
              </label>
              <input
                type="text"
                value={faq.q || ''}
                onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                placeholder="e.g. What types of services do you offer?"
                style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', fontWeight: 600, color: '#1E293B' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.725rem', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                Answer Content *
              </label>
              <textarea
                rows={3}
                value={faq.a || ''}
                onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                placeholder="Detailed answer content..."
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', color: '#334155', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
