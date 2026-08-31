'use client';

import React from 'react';
import { MobileAppContentDTO, MobileAppTestimonialItem } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { PlusIcon, TrashIcon, StarIcon } from '../common/StandardSvgIcons';

interface MobileAppTestimonialsTabProps {
  formData: MobileAppContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<MobileAppContentDTO | null>>;
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

export default function MobileAppTestimonialsTab({ formData, setFormData, onOpenAssetPicker }: MobileAppTestimonialsTabProps) {
  const handleHeadingChange = (field: string, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, testimonials: { ...prev.testimonials, [field]: val } };
    });
  };

  const handleTestimonialChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const items = [...(prev.testimonials?.items || [])];
      items[index] = { ...items[index], [field]: val };
      return { ...prev, testimonials: { ...prev.testimonials, items } };
    });
  };

  const handleAddTestimonial = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const newItem: MobileAppTestimonialItem = {
        id: `test-${Date.now()}`,
        name: 'New Client',
        role: 'Founder',
        company: 'Tech Brand',
        avatar: '/service-3-assets/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp',
        avatarAlt: 'Client avatar',
        rating: 5,
        highlight: '“Incredible app development”',
        content: '“They delivered our mobile application on time and with exceptional UI quality.”',
      };
      return {
        ...prev,
        testimonials: {
          ...prev.testimonials,
          items: [...(prev.testimonials?.items || []), newItem],
        },
      };
    });
  };

  const handleRemoveTestimonial = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const items = (prev.testimonials?.items || []).filter((_, idx) => idx !== index);
      return { ...prev, testimonials: { ...prev.testimonials, items } };
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
            6. Client Testimonials & Social Proof
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Manage client reviews, client avatar headshots, star ratings, and company roles.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddTestimonial}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            backgroundColor: '#EFF6FF',
            color: 'var(--brand-blue, #1833fe)',
            border: '1px solid #BFDBFE',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <PlusIcon size={14} color="var(--brand-blue, #1833fe)" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Sub Badge & Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Section Sub-Badge</label>
          <input
            type="text"
            value={formData.testimonials?.subBadgeText || ''}
            onChange={(e) => handleHeadingChange('subBadgeText', e.target.value)}
            placeholder="what people say"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Section Main Heading *</label>
          <input
            type="text"
            value={formData.testimonials?.heading || ''}
            onChange={(e) => handleHeadingChange('heading', e.target.value)}
            placeholder="See what our clients think about us"
            style={{ ...inputStyle, fontWeight: 600 }}
          />
        </div>
      </div>

      {/* Testimonials List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(formData.testimonials?.items || []).map((test, idx) => (
          <div
            key={test.id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                  Testimonial #{idx + 1}: {test.name || 'Anonymous'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>({test.company || 'Client'})</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveTestimonial(idx)}
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Client Name</label>
                <input
                  type="text"
                  value={test.name || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'name', e.target.value)}
                  style={{ ...inputStyle, fontWeight: 700 }}
                />
              </div>
              <div>
                <label style={labelStyle}>Short Quote Highlight</label>
                <input
                  type="text"
                  placeholder="e.g. “Great experience”"
                  value={test.highlight || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'highlight', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Client Role / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Head of Operations"
                  value={test.role || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'role', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Keller Logistics"
                  value={test.company || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'company', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Testimonial Review Message *</label>
              <textarea
                rows={3}
                value={test.content || ''}
                onChange={(e) => handleTestimonialChange(idx, 'content', e.target.value)}
                style={textareaStyle}
              />
            </div>

            {/* Avatar Upload */}
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '12px' }}>
              <ImageFieldWithUpload
                label="Client Avatar Headshot"
                recommendedDimensions="120 × 120 px (1:1 Circle / Square)"
                value={test.avatar || ''}
                onChange={(url) => handleTestimonialChange(idx, 'avatar', url)}
                altValue={test.avatarAlt || ''}
                onAltChange={(alt) => handleTestimonialChange(idx, 'avatarAlt', alt)}
                onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`mobileApp.testimonials.${idx}.avatar`) : undefined}
                uploadPrefix={`client-avatar-${idx + 1}`}
                previewHeight={60}
                placeholder="/service-3-assets/...webp"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
