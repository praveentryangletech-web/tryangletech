'use client';

import React from 'react';
import { DigitalMarketingContentDTO } from '@/backend/services/services/services.types';
import ImageFieldWithUpload from '../common/ImageFieldWithUpload';
import { PlusIcon, TrashIcon } from '../common/StandardSvgIcons';

interface DigitalMarketingStackTabProps {
  formData: DigitalMarketingContentDTO;
  setFormData: React.Dispatch<React.SetStateAction<DigitalMarketingContentDTO | null>>;
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

export default function DigitalMarketingStackTab({
  formData,
  setFormData,
  onOpenAssetPicker,
}: DigitalMarketingStackTabProps) {
  const stack = formData.stack || ({} as any);
  const tools = stack.tools || [];

  const handleHeaderChange = (field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        stack: { ...prev.stack, [field]: val },
      };
    });
  };

  const handleToolChange = (index: number, field: string, val: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.stack?.tools || [])];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: val };
      }
      return {
        ...prev,
        stack: { ...prev.stack, tools: copy },
      };
    });
  };

  const addTool = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.stack?.tools || [])];
      copy.push({
        id: `tool-${Date.now()}`,
        name: 'New Marketing Tool',
        icon: 'tool-icon',
        category: 'Analytics',
      });
      return {
        ...prev,
        stack: { ...prev.stack, tools: copy },
      };
    });
  };

  const removeTool = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const copy = [...(prev.stack?.tools || [])];
      copy.splice(index, 1);
      return {
        ...prev,
        stack: { ...prev.stack, tools: copy },
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 16px 0',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '12px',
          }}
        >
          Marketing Stack &amp; Tool Integrations Header
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Pill Badge Text</label>
            <input
              style={inputStyle}
              value={stack.subBadgeText || ''}
              onChange={(e) => handleHeaderChange('subBadgeText', e.target.value)}
              placeholder="e.g. marketing stack"
            />
          </div>
          <div>
            <label style={labelStyle}>Section Headline</label>
            <input
              style={inputStyle}
              value={stack.headline || ''}
              onChange={(e) => handleHeaderChange('headline', e.target.value)}
              placeholder="e.g. We work with the tools your business already uses"
            />
          </div>
        </div>
      </div>

      {/* 2. Tool Items List */}
      <div
        style={{
          backgroundColor: 'transparent',
          borderRadius: '0',
          border: 'none',
          padding: '0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Integrated Marketing Tools ({tools.length})
          </h3>
          <button
            type="button"
            onClick={addTool}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #6366F1',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <PlusIcon style={{ width: '14px', height: '14px' }} />
            Add Tool
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {tools.map((tool, idx) => (
            <div
              key={tool.id || idx}
              style={{
                backgroundColor: 'transparent',
                padding: '0',
                borderRadius: '0',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5' }}>Tool #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeTool(idx)}
                  style={{
                    padding: '4px',
                    borderRadius: '4px',
                    border: '1px solid #FCA5A5',
                    backgroundColor: '#FEF2F2',
                    color: '#EF4444',
                    cursor: 'pointer',
                  }}
                  title="Remove Tool"
                >
                  <TrashIcon style={{ width: '14px', height: '14px' }} />
                </button>
              </div>

              <div>
                <label style={labelStyle}>Tool Name</label>
                <input
                  style={{ ...inputStyle, height: '36px' }}
                  value={tool.name || ''}
                  onChange={(e) => handleToolChange(idx, 'name', e.target.value)}
                  placeholder="e.g. Google Ads"
                />
              </div>

              <div>
                <label style={labelStyle}>Category / Function</label>
                <input
                  style={{ ...inputStyle, height: '36px' }}
                  value={tool.category || ''}
                  onChange={(e) => handleToolChange(idx, 'category', e.target.value)}
                  placeholder="e.g. Advertising"
                />
              </div>

              <div>
                <ImageFieldWithUpload
                  label="Custom Icon / Logo"
                  value={tool.icon || ''}
                  onChange={(url) => handleToolChange(idx, 'icon', url)}
                  onOpenLibrary={onOpenAssetPicker ? () => onOpenAssetPicker(`digitalMarketing.stack.tools.${idx}`) : undefined}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
