'use client';

import React from 'react';
import { WebDevContentDTO, WebDevTechStackItem } from '@/backend/services/services/services.types';

interface SubServiceTechStackTabProps {
  formData: WebDevContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<WebDevContentDTO | null>>;
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

export default function SubServiceTechStackTab({ formData, setFormData }: SubServiceTechStackTabProps) {
  const handleHeadingChange = (val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, techStack: { ...prev.techStack, heading: val } };
    });
  };

  const handleTechItemChange = (index: number, field: keyof WebDevTechStackItem, val: string) => {
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
      return {
        ...prev,
        techStack: {
          ...prev.techStack,
          items: [
            ...prev.techStack.items,
            {
              id: `tech-${Date.now()}`,
              name: 'Technology Name',
              category: 'Category',
              icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
            },
          ],
        },
      };
    });
  };

  const handleRemoveTechItem = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const items = prev.techStack.items.filter((_, i) => i !== index);
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
            4. Tech Stack & Integrations
          </h3>
          <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
            Manage the frontend frameworks, backend technologies, databases, and cloud infrastructure displayed in the tech grid.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddTechItem}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#EFF6FF',
            color: 'var(--brand-blue, #1833fe)',
            border: '1px solid #BFDBFE',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          + Add Technology
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
        {formData.techStack.items.map((tech, idx) => (
          <div
            key={tech.id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
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
                  background: 'transparent',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ✕ Remove
              </button>
            </div>

            <div>
              <label style={labelStyle}>Tool / Framework Name</label>
              <input
                type="text"
                placeholder="e.g. Next.js"
                value={tech.name}
                onChange={(e) => handleTechItemChange(idx, 'name', e.target.value)}
                style={{ ...inputStyle, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Category Tag</label>
              <input
                type="text"
                placeholder="e.g. React Framework"
                value={tech.category}
                onChange={(e) => handleTechItemChange(idx, 'category', e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Icon SVG / Image URL</label>
              <input
                type="text"
                placeholder="Icon URL"
                value={tech.icon}
                onChange={(e) => handleTechItemChange(idx, 'icon', e.target.value)}
                style={{ ...inputStyle, fontSize: '0.775rem' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
