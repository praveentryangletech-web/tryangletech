'use client';

import React from 'react';
import { GraphicsDesigningContentDTO } from '@/backend/services/services/services.types';
import { ImageFieldWithUpload } from '../common';

interface GraphicsDesigningTestimonialsTabProps {
  formData: GraphicsDesigningContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<GraphicsDesigningContentDTO>>;
  onOpenAssetPicker?: (target: string) => void;
}

export default function GraphicsDesigningTestimonialsTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: GraphicsDesigningTestimonialsTabProps) {
  const testimonialsSection = formData?.testimonials || ({} as any);

  const updateHeader = (field: 'subBadgeText' | 'headline', value: string) => {
    setFormData((prev) => ({
      ...prev,
      testimonials: {
        ...prev?.testimonials,
        [field]: value,
      },
    }));
  };

  const addTestimonial = () => {
    const list = [...(testimonialsSection?.testimonials || [])];
    list.push({
      id: `test-${Date.now()}`,
      authorName: 'New Client',
      authorRole: 'Founder / CEO',
      clientImage: '/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp',
      rating: 5,
      comment: 'Exceptional visual identity and high-impact design deliverables that accelerated our growth.',
    });
    setFormData((prev) => ({
      ...prev,
      testimonials: {
        ...prev?.testimonials,
        testimonials: list,
      },
    }));
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    const list = [...(testimonialsSection?.testimonials || [])];
    if (list[index]) {
      list[index] = { ...list[index], [field]: value };
      setFormData((prev) => ({
        ...prev,
        testimonials: {
          ...prev?.testimonials,
          testimonials: list,
        },
      }));
    }
  };

  const removeTestimonial = (index: number) => {
    const list = [...(testimonialsSection?.testimonials || [])].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      testimonials: {
        ...prev?.testimonials,
        testimonials: list,
      },
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Typography */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
          1. Testimonials Header
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Category Sub-Badge</label>
            <input
              type="text"
              value={testimonialsSection.subBadgeText || ''}
              onChange={(e) => updateHeader('subBadgeText', e.target.value)}
              placeholder="e.g. our testimonials"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              type="text"
              value={testimonialsSection.headline || ''}
              onChange={(e) => updateHeader('headline', e.target.value)}
              placeholder="Customer experiences that speak for themselves"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* 2. Testimonial Reviews List */}
      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              2. Client Testimonials ({testimonialsSection.testimonials?.length || 0})
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0 0' }}>
              Add, modify, and curate client reviews displayed on the design service landing page.
            </p>
          </div>
          <button
            type="button"
            onClick={addTestimonial}
            style={{
              padding: '6px 14px',
              backgroundColor: '#EFF6FF',
              color: 'var(--brand-blue, #1833fe)',
              border: '1px solid #BFDBFE',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Add Testimonial
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {(testimonialsSection.testimonials || []).map((t: any, idx: number) => (
            <div
              key={t.id || idx}
              style={{
                padding: '0',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>Review #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeTestimonial(idx)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#EF4444',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={labelStyle}>Author Name</label>
                  <input
                    type="text"
                    value={t.authorName || ''}
                    onChange={(e) => updateTestimonial(idx, 'authorName', e.target.value)}
                    placeholder="e.g. Rohan Mehta"
                    style={{ ...inputStyle, fontWeight: 700 }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Role / Company</label>
                  <input
                    type="text"
                    value={t.authorRole || ''}
                    onChange={(e) => updateTestimonial(idx, 'authorRole', e.target.value)}
                    placeholder="e.g. Founder, Tattvam Arts"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Rating (Stars)</label>
                <select
                  value={t.rating || 5}
                  onChange={(e) => updateTestimonial(idx, 'rating', parseInt(e.target.value, 10))}
                  style={inputStyle}
                >
                  <option value={5}>★★★★★ (5 Stars)</option>
                  <option value={4}>★★★★☆ (4 Stars)</option>
                  <option value={3}>★★★☆☆ (3 Stars)</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Client Feedback / Quote</label>
                <textarea
                  rows={3}
                  value={t.comment || ''}
                  onChange={(e) => updateTestimonial(idx, 'comment', e.target.value)}
                  placeholder="Enter client testimonial quote..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <ImageFieldWithUpload
                label="Client Avatar Photo"
                value={t.clientImage || ''}
                onChange={(val) => updateTestimonial(idx, 'clientImage', val)}
                onOpenLibrary={
                  onOpenAssetPicker ? () => onOpenAssetPicker(`graphicsDesigning.testimonials.items.${idx}`) : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
