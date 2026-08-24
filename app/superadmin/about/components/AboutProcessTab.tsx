'use client';

import React from 'react';
import { AboutProcessSection, AboutProcessStep } from '@/backend/services/about/about.types';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';

interface AboutProcessTabProps {
  process: AboutProcessSection;
  setProcess: React.Dispatch<React.SetStateAction<AboutProcessSection>>;
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

export default function AboutProcessTab({ process, setProcess, onOpenAssetPicker }: AboutProcessTabProps) {
  const steps = process.steps || [];

  const handleUpdateStep = (idx: number, field: keyof AboutProcessStep, val: string) => {
    const updated = [...steps];
    updated[idx] = { ...updated[idx], [field]: val };
    setProcess({ ...process, steps: updated });
  };

  const handleAddStep = () => {
    const newStep: AboutProcessStep = {
      id: `step-${Date.now()}`,
      label: `Step ${steps.length + 1}`,
      stepTitle: 'New Process Milestone',
      description: 'Explain what happens during this milestone stage.',
      icon: '/about-assets/690c7b256a26b771ea0562fb_Vector (27).svg',
    };
    setProcess({ ...process, steps: [...steps, newStep] });
  };

  const handleRemoveStep = (idx: number) => {
    const updated = steps.filter((_, i) => i !== idx);
    setProcess({ ...process, steps: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', backgroundColor: 'transparent' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 5: Execution Process & Delivery Workflow
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          3-Step Timeline
        </span>
      </div>

      {/* Main Section Header */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Section Badge / Subtitle</label>
            <input
              type="text"
              value={process.subBadgeText || ''}
              onChange={(e) => setProcess({ ...process, subBadgeText: e.target.value })}
              style={inputStyle}
              placeholder="e.g. our process"
            />
          </div>
          <div>
            <label style={labelStyle}>Heading Prefix</label>
            <input
              type="text"
              value={process.heading || ''}
              onChange={(e) => setProcess({ ...process, heading: e.target.value })}
              style={inputStyle}
              placeholder="e.g. Deliver projects on time through"
            />
          </div>
          <div>
            <label style={labelStyle}>Highlighted Heading</label>
            <input
              type="text"
              value={process.headingHighlight || ''}
              onChange={(e) => setProcess({ ...process, headingHighlight: e.target.value })}
              style={inputStyle}
              placeholder="e.g. streamlined execution"
            />
          </div>
        </div>
      </div>

      {/* 3 Step Timeline Cards */}
      <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>⚙️ Step-by-Step Delivery Stages</strong>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748B' }}>
              Displayed in the interactive step progress line on the About page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddStep}
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
            + Add Step
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {steps.map((step, idx) => (
            <div
              key={step.id || idx}
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
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue, #1833fe)' }}>
                  STAGE #{idx + 1}: {step.label || 'Step'} — {step.stepTitle || 'Untitled'}
                </span>
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    style={{ border: 'none', background: 'transparent', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}
                  >
                    ✕ Delete Step
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Tab Step Label (e.g. Discover)</label>
                  <input
                    type="text"
                    value={step.label}
                    onChange={(e) => handleUpdateStep(idx, 'label', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. Discover"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Stage Title *</label>
                  <input
                    type="text"
                    value={step.stepTitle}
                    onChange={(e) => handleUpdateStep(idx, 'stepTitle', e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. Requirement gathering"
                  />
                </div>
              </div>

              <HomeImageUploadField
                label="Step Icon / SVG Asset"
                value={step.icon}
                onChange={(val) => handleUpdateStep(idx, 'icon', val)}
                onOpenAssetPicker={() => onOpenAssetPicker(`aboutProcessIcon_${idx}`)}
                previewHeight={48}
                previewWidth={48}
                shape="square"
                recommendedDimensions="48 x 48 (SVG/PNG)"
              />

              <div>
                <label style={labelStyle}>Stage Description</label>
                <textarea
                  rows={2}
                  value={step.description}
                  onChange={(e) => handleUpdateStep(idx, 'description', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="We understand your business goals, target audience..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
