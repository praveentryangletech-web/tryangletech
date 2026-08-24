'use client';

import React, { useState } from 'react';
import { AboutFaqSection, AboutFaqItem } from '@/backend/services/about/about.types';

interface AboutFaqsTabProps {
  faqSection: AboutFaqSection;
  setFaqSection: React.Dispatch<React.SetStateAction<AboutFaqSection>>;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.65rem 1rem',
  borderRadius: '8px',
  border: '1px solid #CBD5E1',
  backgroundColor: '#FFFFFF',
  fontSize: '0.875rem',
  fontWeight: 500,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '5px',
};

export default function AboutFaqsTab({ faqSection, setFaqSection }: AboutFaqsTabProps) {
  const faqs = faqSection.faqs || [];
  const [previewOpenIdx, setPreviewOpenIdx] = useState<number | null>(0);

  const handleUpdateFaq = (idx: number, field: 'q' | 'a', val: string) => {
    const updated = [...faqs];
    updated[idx] = { ...updated[idx], [field]: val };
    setFaqSection({ ...faqSection, faqs: updated });
  };

  const handleAddFaq = () => {
    const newFaq: AboutFaqItem = {
      id: `faq-${Date.now()}`,
      q: 'New Frequently Asked Question?',
      a: 'Provide a clear, direct, and transparent answer.',
    };
    setFaqSection({ ...faqSection, faqs: [newFaq, ...faqs] });
  };

  const handleRemoveFaq = (idx: number) => {
    const updated = faqs.filter((_, i) => i !== idx);
    setFaqSection({ ...faqSection, faqs: updated });
  };

  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    const updated = [...faqs];
    const temp = updated[idx];
    updated[idx] = updated[idx - 1];
    updated[idx - 1] = temp;
    setFaqSection({ ...faqSection, faqs: updated });
  };

  const handleMoveDown = (idx: number) => {
    if (idx === faqs.length - 1) return;
    const updated = [...faqs];
    const temp = updated[idx];
    updated[idx] = updated[idx + 1];
    updated[idx + 1] = temp;
    setFaqSection({ ...faqSection, faqs: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', backgroundColor: 'transparent' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 7: Frequently Asked Questions & AEO Schema
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          Interactive Accordion
        </span>
      </div>

      {/* Main Section Header */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Section Badge / Subtitle</label>
            <input
              type="text"
              value={faqSection.subBadgeText || ''}
              onChange={(e) => setFaqSection({ ...faqSection, subBadgeText: e.target.value })}
              style={inputStyle}
              placeholder="e.g. Frequently asked questions"
            />
          </div>
          <div>
            <label style={labelStyle}>Heading Prefix</label>
            <input
              type="text"
              value={faqSection.heading || ''}
              onChange={(e) => setFaqSection({ ...faqSection, heading: e.target.value })}
              style={inputStyle}
              placeholder="e.g. Your common questions"
            />
          </div>
          <div>
            <label style={labelStyle}>Highlighted Heading</label>
            <input
              type="text"
              value={faqSection.headingHighlight || ''}
              onChange={(e) => setFaqSection({ ...faqSection, headingHighlight: e.target.value })}
              style={inputStyle}
              placeholder="e.g. answered"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '12px' }}>
          <div>
            <label style={labelStyle}>FAQ CTA Button Text</label>
            <input
              type="text"
              value={faqSection.ctaButtonText || ''}
              onChange={(e) => setFaqSection({ ...faqSection, ctaButtonText: e.target.value })}
              style={inputStyle}
              placeholder="e.g. Contact us today"
            />
          </div>
          <div>
            <label style={labelStyle}>FAQ CTA Button Link</label>
            <input
              type="text"
              value={faqSection.ctaButtonLink || ''}
              onChange={(e) => setFaqSection({ ...faqSection, ctaButtonLink: e.target.value })}
              style={inputStyle}
              placeholder="e.g. /contact"
            />
          </div>
        </div>
      </div>

      {/* FAQ Item List */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>❓ Questions & Answers ({faqs.length})</strong>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748B' }}>
              These FAQs automatically generate structured JSON-LD FAQPage Schema for Google & AI search bots.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddFaq}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'var(--brand-blue, #1833fe)',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Add FAQ
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={faq.id || idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                  QUESTION #{idx + 1}
                </span>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveUp(idx)}
                    style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: idx === 0 ? 'not-allowed' : 'pointer', fontSize: '0.75rem' }}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    disabled={idx === faqs.length - 1}
                    onClick={() => handleMoveDown(idx)}
                    style={{ padding: '2px 6px', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#F8FAFC', cursor: idx === faqs.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.75rem' }}
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    style={{ border: 'none', background: 'transparent', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700, marginLeft: '6px' }}
                  >
                    ✕ Delete
                  </button>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Question Title *</label>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                  style={{ ...inputStyle, fontWeight: 700 }}
                  placeholder="e.g. What services does Tryangletech offer?"
                />
              </div>

              <div>
                <label style={labelStyle}>Answer Body *</label>
                <textarea
                  rows={2}
                  value={faq.a}
                  onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Provide an informative, direct explanation..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
