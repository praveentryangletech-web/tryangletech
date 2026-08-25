'use client';

import React from 'react';
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

  const handleUpdateFaq = (idx: number, field: 'q' | 'a', val: string) => {
    const updated = [...faqs];
    updated[idx] = { ...updated[idx], [field]: val };
    setFaqSection({ ...faqSection, faqs: updated });
  };

  const handleAddFaq = () => {
    const newFaq: AboutFaqItem = {
      id: `faq-${Date.now()}`,
      q: '',
      a: '',
    };
    setFaqSection({ ...faqSection, faqs: [...faqs, newFaq] });
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      {/* Header Banner */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h3
            style={{
              margin: '0 0 4px 0',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--dark-indigo, #1a0b54)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>❓ Dynamic Frequently Asked Questions</span>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#EFF6FF',
                color: 'var(--brand-blue, #1833fe)',
                fontWeight: 800,
                border: '1px solid #BFDBFE',
              }}
            >
              {faqs.length} FAQs
            </span>
          </h3>
          <p style={{ margin: 0, fontSize: '0.825rem', color: '#64748B' }}>
            Add and manage frequently asked questions for the About page, automatically generating structured JSON-LD FAQPage Schema for AI search engines.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddFaq}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #BFDBFE',
            backgroundColor: '#EFF6FF',
            color: 'var(--brand-blue, #1833fe)',
            fontSize: '0.825rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <span>+ Add Question</span>
        </button>
      </div>

      {/* Section Sub-Badge & Heading Controls */}
      <div
        style={{
          padding: '18px 20px',
          borderRadius: '12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B' }}>
          🏷️ Section Heading & Call-to-Action
        </span>

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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

      {/* FAQ Cards Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Card Top Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#EFF6FF',
                    color: 'var(--brand-blue, #1833fe)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    border: '1px solid #BFDBFE',
                  }}
                >
                  Question #{idx + 1}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                  Item {idx + 1} of {faqs.length}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveUp(idx)}
                  title="Move Up"
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: idx === 0 ? '#CBD5E1' : '#475569',
                    cursor: idx === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  ▲
                </button>
                <button
                  type="button"
                  disabled={idx === faqs.length - 1}
                  onClick={() => handleMoveDown(idx)}
                  title="Move Down"
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: idx === faqs.length - 1 ? '#CBD5E1' : '#475569',
                    cursor: idx === faqs.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #FECDD3',
                    backgroundColor: '#FFF1F2',
                    color: '#E11D48',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginLeft: '4px',
                  }}
                >
                  <span>🗑️ Remove</span>
                </button>
              </div>
            </div>

            {/* Question Heading Input */}
            <div>
              <label style={labelStyle}>Question Heading</label>
              <input
                type="text"
                value={faq.q}
                onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                style={{ ...inputStyle, fontWeight: 700 }}
                placeholder="e.g. Which industries do you serve?"
              />
            </div>

            {/* Answer Explanation Textarea */}
            <div>
              <label style={labelStyle}>Answer Explanation</label>
              <textarea
                rows={3}
                value={faq.a}
                onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="e.g. We serve businesses across healthcare, finance, e-commerce, education, retail, real estate, and more..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
