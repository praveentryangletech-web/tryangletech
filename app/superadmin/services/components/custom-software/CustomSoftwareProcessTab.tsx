'use client';

import React from 'react';
import { CustomSoftwareContentDTO, CustomSoftwareProcessStep } from '@/backend/services/services/services.types';
import { PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface CustomSoftwareProcessTabProps {
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

export default function CustomSoftwareProcessTab({
  formData,
  setFormData,
}: CustomSoftwareProcessTabProps) {
  const process = formData.process || ({} as any);
  const steps = process.steps || [];

  const handleProcessChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return { ...prev, process: { ...prev.process, [field]: val } };
    });
  };

  const handleAddStep = () => {
    const nextNum = (steps.length + 1).toString().padStart(2, '0');
    const newStep: CustomSoftwareProcessStep = {
      id: `step-${Date.now()}`,
      stepNum: nextNum,
      column: `Phase ${nextNum}`,
      title: 'New Milestone Stage',
      desc: 'Describe the key activities and deliverables of this development lifecycle phase.',
      bg: '#ffffff',
      color: '#0f172a',
      descColor: '#64748b',
      shadow: '0 10px 28px rgba(0, 0, 0, 0.06)',
    };
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        process: {
          ...prev.process,
          steps: [...(prev.process?.steps || []), newStep],
        },
      };
    });
  };

  const handleUpdateStep = (idx: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.process?.steps || [])];
      if (copy[idx]) {
        copy[idx] = { ...copy[idx], [field]: val };
      }
      return { ...prev, process: { ...prev.process, steps: copy } };
    });
  };

  const handleRemoveStep = (idx: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.process?.steps || [])];
      copy.splice(idx, 1);
      return { ...prev, process: { ...prev.process, steps: copy } };
    });
  };

  return (
    <div style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Section */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          Development Process Header
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Sub-Badge Text</label>
            <input
              type="text"
              style={inputStyle}
              value={process.subBadgeText || ''}
              onChange={(e) => handleProcessChange('subBadgeText', e.target.value)}
              placeholder="our development process"
            />
          </div>

          <div>
            <label style={labelStyle}>Section Heading</label>
            <input
              type="text"
              style={inputStyle}
              value={process.headline || ''}
              onChange={(e) => handleProcessChange('headline', e.target.value)}
              placeholder="Deliver projects on time through streamlined execution"
            />
          </div>

          <div>
            <label style={labelStyle}>Description Paragraph</label>
            <textarea
              rows={2}
              style={textareaStyle}
              value={process.description || ''}
              onChange={(e) => handleProcessChange('description', e.target.value)}
              placeholder="A disciplined 4-stage engineering lifecycle..."
            />
          </div>
        </div>
      </div>

      {/* 2. Process Cascade Steps */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Process Lifecycle Steps ({steps.length})</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748B' }}>Cascading stepped milestone cards with custom gradient themes</p>
          </div>
          <button
            type="button"
            onClick={handleAddStep}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
          >
            <PlusIcon /> Add Step
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {steps.map((step, idx) => (
            <div key={step.id || idx} style={{ padding: '18px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>Step {step.stepNum || idx + 1}: {step.column} — {step.title}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStep(idx)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}
                >
                  <TrashIcon />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '100px 180px 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Number</label>
                  <input
                    type="text"
                    style={{ ...inputStyle, textAlign: 'center', fontWeight: 800 }}
                    value={step.stepNum}
                    onChange={(e) => handleUpdateStep(idx, 'stepNum', e.target.value)}
                    placeholder="01"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Track Column</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={step.column}
                    onChange={(e) => handleUpdateStep(idx, 'column', e.target.value)}
                    placeholder="e.g. Discovery"
                  />
                </div>

                <div>
                  <label style={labelStyle}>Step Title</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={step.title}
                    onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                    placeholder="e.g. Requirement Gathering & Scoping"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Step Description</label>
                <textarea
                  rows={2}
                  style={textareaStyle}
                  value={step.desc}
                  onChange={(e) => handleUpdateStep(idx, 'desc', e.target.value)}
                  placeholder="Explain process details..."
                />
              </div>

              {/* Theme Styling */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
                <div>
                  <label style={labelStyle}>Background Gradient / Color</label>
                  <input
                    type="text"
                    style={{ ...inputStyle, fontSize: '0.8rem', fontFamily: 'monospace' }}
                    value={step.bg}
                    onChange={(e) => handleUpdateStep(idx, 'bg', e.target.value)}
                    placeholder="linear-gradient(...) or #ffffff"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Title Text Color</label>
                  <input
                    type="text"
                    style={{ ...inputStyle, fontSize: '0.8rem', fontFamily: 'monospace' }}
                    value={step.color}
                    onChange={(e) => handleUpdateStep(idx, 'color', e.target.value)}
                    placeholder="#ffffff or #0f172a"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Card Drop Shadow</label>
                  <input
                    type="text"
                    style={{ ...inputStyle, fontSize: '0.8rem', fontFamily: 'monospace' }}
                    value={step.shadow}
                    onChange={(e) => handleUpdateStep(idx, 'shadow', e.target.value)}
                    placeholder="0 10px 28px rgba(...)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
