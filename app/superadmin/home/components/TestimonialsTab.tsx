'use client';

import React from 'react';
import { HomeTestimonialItem } from '@/backend/services/home/home.types';
import HomeImageUploadField from './HomeImageUploadField';

interface TestimonialsTabProps {
  testimonials: HomeTestimonialItem[];
  setTestimonials: React.Dispatch<React.SetStateAction<HomeTestimonialItem[]>>;
  onOpenAssetPicker: (target: string) => void;
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

export default function TestimonialsTab({
  testimonials,
  setTestimonials,
  onOpenAssetPicker,
}: TestimonialsTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 6: Client Testimonials
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          {testimonials.length} Client Reviews
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {testimonials.map((t, tIdx) => (
          <div
            key={t.id || tIdx}
            style={{
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ fontWeight: 800, color: 'var(--brand-blue, #1833fe)', fontSize: '0.875rem' }}>
              Testimonial #{tIdx + 1}: {t.name || 'Anonymous Client'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Client Name</label>
                <input
                  type="text"
                  value={t.name || ''}
                  onChange={(e) => {
                    const copy = [...testimonials];
                    copy[tIdx] = { ...copy[tIdx], name: e.target.value };
                    setTestimonials(copy);
                  }}
                  style={inputStyle}
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <div>
                <label style={labelStyle}>Company / Role</label>
                <input
                  type="text"
                  value={t.company || t.title || ''}
                  onChange={(e) => {
                    const copy = [...testimonials];
                    copy[tIdx] = { ...copy[tIdx], company: e.target.value, title: e.target.value };
                    setTestimonials(copy);
                  }}
                  style={inputStyle}
                  placeholder="e.g. Founder, FinTech Global"
                />
              </div>
            </div>

            {/* Client Avatar / Photo with Device Upload & Asset Picker */}
            <HomeImageUploadField
              label="Client Photo / Avatar"
              value={t.image || ''}
              onChange={(url) => {
                const copy = [...testimonials];
                copy[tIdx] = { ...copy[tIdx], image: url };
                setTestimonials(copy);
              }}
              onOpenAssetPicker={() => onOpenAssetPicker(`testimonials.${tIdx}.image`)}
              altValue={t.imageAlt || ''}
              onAltChange={(alt) => {
                const copy = [...testimonials];
                copy[tIdx] = { ...copy[tIdx], imageAlt: alt };
                setTestimonials(copy);
              }}
              placeholder="Photo URL (e.g. /Taskopia_files/690db2077e68fa707530663f_test-1.webp)"
              previewWidth={50}
              previewHeight={50}
              shape="round"
              recommendedDimensions="150 × 150 px (1:1 square)"
            />

            <div>
              <label style={labelStyle}>Client Review Text</label>
              <textarea
                rows={3}
                value={t.text || t.review || ''}
                onChange={(e) => {
                  const copy = [...testimonials];
                  copy[tIdx] = { ...copy[tIdx], text: e.target.value, review: e.target.value };
                  setTestimonials(copy);
                }}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Client feedback and testimonial quote..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
