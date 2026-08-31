'use client';

import React from 'react';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';
import { ServiceTestimonialItem } from '@/backend/services/services/services.types';

interface ServiceTestimonialsTabProps {
  testimonials: ServiceTestimonialItem[];
  setTestimonials: React.Dispatch<React.SetStateAction<ServiceTestimonialItem[]>>;
  onOpenAssetPicker: (target: string) => void;
}

export default function ServiceTestimonialsTab({ testimonials, setTestimonials, onOpenAssetPicker }: ServiceTestimonialsTabProps) {
  const handleTestimonialChange = (idx: number, field: keyof ServiceTestimonialItem, val: any) => {
    setTestimonials((prev) => {
      const copy = [...prev];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return copy;
    });
  };

  const handleAddTestimonial = () => {
    setTestimonials((prev) => [
      ...prev,
      {
        id: `test-${Date.now()}`,
        name: 'Client Name',
        role: 'Founder & CEO',
        company: 'Global Enterprises',
        avatar: '/Home2_files/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp',
        rating: 5,
        content: 'Exceptional engineering quality, punctual milestone delivery, and world-class communication.',
      },
    ]);
  };

  const handleRemoveTestimonial = (idx: number) => {
    setTestimonials((prev) => prev.filter((_, i) => i !== idx));
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
            6. Client Reviews & Testimonials
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.785rem', color: '#64748B' }}>
            Manage client testimonials displayed in the marquee slider on /service.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddTestimonial}
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
          + Add Testimonial
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {testimonials.map((test, idx) => (
          <div
            key={test.id || idx}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>
                Review #{idx + 1} — {test.name || 'Client'}
              </strong>
              <button
                type="button"
                onClick={() => handleRemoveTestimonial(idx)}
                style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
              >
                ✕ Delete
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                  Client Name
                </label>
                <input
                  type="text"
                  value={test.name || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'name', e.target.value)}
                  style={{ width: '100%', height: '32px', padding: '0 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.775rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                  Job Role
                </label>
                <input
                  type="text"
                  value={test.role || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'role', e.target.value)}
                  style={{ width: '100%', height: '32px', padding: '0 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.775rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                  Company Name
                </label>
                <input
                  type="text"
                  value={test.company || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'company', e.target.value)}
                  style={{ width: '100%', height: '32px', padding: '0 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.775rem' }}
                />
              </div>

              <div>
                <HomeImageUploadField
                  label="Client Avatar"
                  value={test.avatar || ''}
                  onChange={(val) => handleTestimonialChange(idx, 'avatar', val)}
                  onOpenAssetPicker={() => onOpenAssetPicker(`testimonials.${idx}.avatar`)}
                  altValue={test.avatarAlt || ''}
                  onAltChange={(alt) => handleTestimonialChange(idx, 'avatarAlt', alt)}
                  recommendedDimensions="80 × 80 px (WebP)"
                  previewHeight={40}
                  previewWidth={40}
                  shape="round"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                Review Quote / Feedback
              </label>
              <textarea
                rows={2}
                value={test.content || ''}
                onChange={(e) => handleTestimonialChange(idx, 'content', e.target.value)}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.775rem', color: '#334155', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
