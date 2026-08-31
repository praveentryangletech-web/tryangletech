'use client';

import React from 'react';
import { WebDevContentDTO, WebDevTechStackItem } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface SubServiceTechStackTabProps {
  formData: WebDevContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<WebDevContentDTO | null>>;
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#334155',
  marginBottom: '6px',
};

export default function SubServiceTechStackTab({ formData, setFormData, onOpenAssetPicker }: SubServiceTechStackTabProps) {
  const handleHeadingChange = (val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, techStack: { ...prev.techStack, heading: val } };
    });
  };

  const handleTechItemChange = (index: number, field: string, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const items = [...prev.techStack.items];
      items[index] = { ...items[index], [field]: val };
      return { ...prev, techStack: { ...prev.techStack, items } };
    });
  };

  const handleAddTechItem = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const newItem: WebDevTechStackItem = {
        id: `tech-${Date.now()}`,
        name: 'New Technology',
        category: 'Development Tool',
        icon: '',
        iconAlt: 'Technology icon',
      };
      return {
        ...prev,
        techStack: {
          ...prev.techStack,
          items: [...prev.techStack.items, newItem],
        },
      };
    });
  };

  const handleRemoveTechItem = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const items = prev.techStack.items.filter((_, idx) => idx !== index);
      return { ...prev, techStack: { ...prev.techStack, items } };
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
            4. Tech Stack & Integration Tools
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Showcase the core frameworks, backend architectures, CMS platforms, and databases used to engineer this service.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddTechItem}
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
          <span>Add Technology</span>
        </button>
      </div>

      {/* Section Heading */}
      <div>
        <label style={labelStyle}>Section Heading *</label>
        <input
          type="text"
          value={formData.techStack.heading || ''}
          onChange={(e) => handleHeadingChange(e.target.value)}
          placeholder="We build with industry-leading modern technologies"
          style={{ ...inputStyle, fontWeight: 600 }}
        />
      </div>

      {/* Technology Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {(formData.techStack.items || []).map((tech, idx) => (
          <div
            key={tech.id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                Tech #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveTechItem(idx)}
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

            <div>
              <label style={labelStyle}>Tool / Framework Name</label>
              <input
                type="text"
                placeholder="e.g. Next.js"
                value={tech.name || ''}
                onChange={(e) => handleTechItemChange(idx, 'name', e.target.value)}
                style={{ ...inputStyle, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Category Tag</label>
              <input
                type="text"
                placeholder="e.g. React Framework"
                value={tech.category || ''}
                onChange={(e) => handleTechItemChange(idx, 'category', e.target.value)}
                style={inputStyle}
              />
            </div>

            <ImageFieldWithUpload
              label="Tech Brand Icon"
              recommendedDimensions="64 × 64 px (SVG / Logo)"
              value={tech.icon || ''}
              onChange={(url) => handleTechItemChange(idx, 'icon', url)}
              altValue={tech.iconAlt || ''}
              onAltChange={(alt) => handleTechItemChange(idx, 'iconAlt', alt)}
              onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`subService.techStack.${idx}.icon`) : undefined}
              uploadPrefix={`tech-${idx + 1}-icon`}
              previewHeight={75}
              placeholder="/service-1-assets/...svg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
