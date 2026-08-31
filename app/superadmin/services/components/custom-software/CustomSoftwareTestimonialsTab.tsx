'use client';

import React from 'react';
import { CustomSoftwareContentDTO, CustomSoftwareTestimonialItem } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { PlusIcon, TrashIcon, StarIcon } from '../common/StandardSvgIcons';

interface CustomSoftwareTestimonialsTabProps {
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

export default function CustomSoftwareTestimonialsTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: CustomSoftwareTestimonialsTabProps) {
  const testimonials = formData.testimonials || ({} as any);
  const items = testimonials.items || [];

  const handleSectionChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, testimonials: { ...prev.testimonials, [field]: val } };
    });
  };

  const handleAddTestimonial = () => {
    const newItem: CustomSoftwareTestimonialItem = {
      id: `test-${Date.now()}`,
      name: 'Client Name',
      role: 'Chief Technology Officer',
      company: 'Enterprise Client',
      avatar: '/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp',
      rating: 5,
      quoteTitle: 'Delivered exactly what we needed',
      quote: 'Describe the client experience and performance outcomes delivered by Tryangletech.',
    };
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        testimonials: {
          ...prev.testimonials,
          items: [...(prev.testimonials?.items || []), newItem],
        },
      };
    });
  };

  const handleUpdateItem = (idx: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.testimonials?.items || [])];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, testimonials: { ...prev.testimonials, items: copy } };
    });
  };

  const handleRemoveItem = (idx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.testimonials?.items || [])];
      copy.splice(idx, 1);
      return { ...prev, testimonials: { ...prev.testimonials, items: copy } };
    });
  };

  return (
    <div style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Section Header */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          Testimonials Section Header
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Sub-Badge Text</label>
            <input
              type="text"
              style={inputStyle}
              value={testimonials.subBadgeText || ''}
              onChange={(e) => handleSectionChange('subBadgeText', e.target.value)}
              placeholder="our testimonials"
            />
          </div>

          <div>
            <label style={labelStyle}>Section Heading</label>
            <input
              type="text"
              style={inputStyle}
              value={testimonials.headline || ''}
              onChange={(e) => handleSectionChange('headline', e.target.value)}
              placeholder="Customer experiences that speak for themselves"
            />
          </div>
        </div>
      </div>

      {/* 2. Testimonial Items List */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Client Reviews ({items.length})</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748B' }}>Testimonial cards rendered in animated 3-train marquee carousel</p>
          </div>
          <button
            type="button"
            onClick={handleAddTestimonial}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <PlusIcon /> Add Testimonial
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item, idx) => (
            <div key={item.id || idx} style={{ padding: '18px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>Review #{idx + 1} — {item.name || 'Anonymous'}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                >
                  <TrashIcon />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '16px' }}>
                <ImageFieldWithUpload
                  label="Avatar Photo"
                  value={item.avatar}
                  onChange={(url) => handleUpdateItem(idx, 'avatar', url)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`customSoftware.testimonials.items.${idx}.avatar`) : undefined}
                />

                <div>
                  <label style={labelStyle}>Client Name</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={item.name}
                    onChange={(e) => handleUpdateItem(idx, 'name', e.target.value)}
                    placeholder="e.g. Rebecca Lin"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Role / Company</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={item.role || ''}
                    onChange={(e) => handleUpdateItem(idx, 'role', e.target.value)}
                    placeholder="e.g. Operations Director, LogiFlow"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Review Headline / Catchphrase</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={item.quoteTitle}
                    onChange={(e) => handleUpdateItem(idx, 'quoteTitle', e.target.value)}
                    placeholder="e.g. Delivered exactly what we needed"
                  />
                </div>
                <div>
                  <label style={labelStyle}><StarIcon /> Star Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    style={inputStyle}
                    value={item.rating || 5}
                    onChange={(e) => handleUpdateItem(idx, 'rating', parseInt(e.target.value, 10) || 5)}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Review Content</label>
                <textarea
                  rows={3}
                  style={textareaStyle}
                  value={item.quote}
                  onChange={(e) => handleUpdateItem(idx, 'quote', e.target.value)}
                  placeholder="Detailed client testimonial feedback..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
