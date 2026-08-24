'use client';

import React from 'react';
import { AboutSpecialitySection, AboutBenefitItem } from '@/backend/services/about/about.types';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';

interface AboutSpecialityTabProps {
  speciality: AboutSpecialitySection;
  setSpeciality: React.Dispatch<React.SetStateAction<AboutSpecialitySection>>;
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

export default function AboutSpecialityTab({ speciality, setSpeciality, onOpenAssetPicker }: AboutSpecialityTabProps) {
  const benefits = speciality.benefits || [];

  const handleUpdateBenefit = (idx: number, field: keyof AboutBenefitItem, val: string) => {
    const updated = [...benefits];
    updated[idx] = { ...updated[idx], [field]: val };
    setSpeciality({ ...speciality, benefits: updated });
  };

  const handleAddBenefit = () => {
    const newBenefit: AboutBenefitItem = {
      id: `benefit-${Date.now()}`,
      icon: '/about-assets/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg',
      title: 'New Value Proposition',
      description: 'Describe the key benefit and transformation provided to clients.',
    };
    setSpeciality({ ...speciality, benefits: [...benefits, newBenefit] });
  };

  const handleRemoveBenefit = (idx: number) => {
    const updated = benefits.filter((_, i) => i !== idx);
    setSpeciality({ ...speciality, benefits: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', backgroundColor: 'transparent' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 2: Speciality & Core Value Pillars
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          3-Card Bar
        </span>
      </div>

      {/* Sub Badge & Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Section Subtitle / Badge</label>
          <input
            type="text"
            value={speciality.subBadgeText || ''}
            onChange={(e) => setSpeciality({ ...speciality, subBadgeText: e.target.value })}
            style={inputStyle}
            placeholder="e.g. our speciality"
          />
        </div>
        <div>
          <label style={labelStyle}>Main Speciality Heading *</label>
          <input
            type="text"
            value={speciality.heading || ''}
            onChange={(e) => setSpeciality({ ...speciality, heading: e.target.value })}
            style={inputStyle}
            placeholder="e.g. Building digital solutions that drive real business growth"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Speciality Overview Narrative</label>
        <textarea
          rows={2}
          value={speciality.description || ''}
          onChange={(e) => setSpeciality({ ...speciality, description: e.target.value })}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Our dedicated team works closely with you at every stage..."
        />
      </div>

      {/* Benefits Card Grid */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>✨ Benefit & Speciality Cards</strong>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748B' }}>
              Displayed inside the floating speciality card bar on the About page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddBenefit}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              border: '1px solid #C7D2FE',
              backgroundColor: '#EEF2FF',
              color: '#4338CA',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Add Card
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {benefits.map((benefit, idx) => (
            <div
              key={benefit.id || idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                  CARD #{idx + 1}: {benefit.title || 'Untitled'}
                </span>
                {benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(idx)}
                    style={{ border: 'none', background: 'transparent', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}
                  >
                    ✕ Delete Card
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Card Title *</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => handleUpdateBenefit(idx, 'title', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. Time Savings"
                  />
                </div>
                <div>
                  <HomeImageUploadField
                    label="Icon Image / SVG"
                    value={benefit.icon}
                    onChange={(val) => handleUpdateBenefit(idx, 'icon', val)}
                    onOpenAssetPicker={() => onOpenAssetPicker(`aboutSpecialityIcon_${idx}`)}
                    recommendedDimensions="38 × 38 px (SVG/PNG)"
                    previewHeight={50}
                    previewWidth={50}
                    shape="square"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Card Description</label>
                <textarea
                  rows={2}
                  value={benefit.description}
                  onChange={(e) => handleUpdateBenefit(idx, 'description', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Describe how this benefit impacts the client's business..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
