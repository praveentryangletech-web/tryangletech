'use client';

import React from 'react';
import { CustomSoftwareContentDTO, CustomSoftwareFaqItem } from '@/backend/services/services/services.types';
import { PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface CustomSoftwareFaqsTabProps {
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

export default function CustomSoftwareFaqsTab({
  formData,
  setFormData,
}: CustomSoftwareFaqsTabProps) {
  const faqs = formData.faqs || [];

  const handleAddFaq = () => {
    const newFaq: CustomSoftwareFaqItem = {
      id: `faq-${Date.now()}`,
      q: 'Frequently asked question about custom software?',
      a: 'Provide a transparent, direct response answering client inquiries and concerns.',
    };
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        faqs: [...(prev.faqs || []), newFaq],
      };
    });
  };

  const handleUpdateFaq = (idx: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.faqs || [])];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, faqs: copy };
    });
  };

  const handleRemoveFaq = (idx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.faqs || [])];
      copy.splice(idx, 1);
      return { ...prev, faqs: copy };
    });
  };

  return (
    <div style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Frequently Asked Questions ({faqs.length})</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748B' }}>Interactive accordions and structured JSON-LD FAQ Schema</p>
          </div>
          <button
            type="button"
            onClick={handleAddFaq}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <PlusIcon /> Add Question
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqs.map((faq, idx) => (
            <div key={faq.id || idx} style={{ padding: '0', borderRadius: '0', border: 'none', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>Question #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(idx)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                >
                  <TrashIcon />
                </button>
              </div>

              <div>
                <label style={labelStyle}>Question Text</label>
                <input
                  type="text"
                  style={inputStyle}
                  value={faq.q}
                  onChange={(e) => handleUpdateFaq(idx, 'q', e.target.value)}
                  placeholder="e.g. How long does it take to build custom software?"
                />
              </div>

              <div>
                <label style={labelStyle}>Answer Text</label>
                <textarea
                  rows={3}
                  style={textareaStyle}
                  value={faq.a}
                  onChange={(e) => handleUpdateFaq(idx, 'a', e.target.value)}
                  placeholder="Provide comprehensive details and timelines..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
