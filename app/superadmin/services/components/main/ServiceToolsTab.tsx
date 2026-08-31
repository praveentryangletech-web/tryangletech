'use client';

import React from 'react';
import HomeImageUploadField from '@/app/superadmin/home/components/HomeImageUploadField';
import { ServiceToolsSection, ServiceToolItem } from '@/backend/services/services/services.types';
import {
  standardAddButtonStyle,
  standardAddButtonHover,
  standardDeleteButtonStyle,
  standardDeleteButtonHover,
} from '../common/AdminButtonStyles';

interface ServiceToolsTabProps {
  tools: ServiceToolsSection;
  setTools: React.Dispatch<React.SetStateAction<ServiceToolsSection>>;
  onOpenAssetPicker: (target: string) => void;
}

export default function ServiceToolsTab({ tools, setTools, onOpenAssetPicker }: ServiceToolsTabProps) {
  const handleToolChange = (idx: number, field: keyof ServiceToolItem, val: string) => {
    setTools((prev) => {
      const toolList = [...(prev.tools || [])];
      if (toolList[idx]) {
        toolList[idx] = { ...toolList[idx], [field]: val };
      }
      return { ...prev, tools: toolList };
    });
  };

  const handleAddTool = () => {
    setTools((prev) => ({
      ...prev,
      tools: [
        {
          id: `t-${Date.now()}`,
          name: '',
          icon: '',
          category: 'Engineering',
        },
        ...(prev.tools || []),
      ],
    }));
  };

  const handleRemoveTool = (idx: number) => {
    setTools((prev) => ({
      ...prev,
      tools: (prev.tools || []).filter((_, i) => i !== idx),
    }));
  };

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0',
        borderRadius: '0',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Technology Stack & Integrations ({tools.tools?.length || 0})
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0 0' }}>
            Manage the dynamic tools and frameworks powering your engineering deliverables.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddTool}
          style={standardAddButtonStyle}
          {...standardAddButtonHover}
        >
          <span style={{ fontSize: '1rem', lineHeight: '1', fontWeight: 800 }}>+</span>
          <span>Add Technology</span>
        </button>
      </div>

      {/* Headings */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
            Section Overtitle
          </label>
          <input
            type="text"
            value={tools.subBadgeText || ''}
            onChange={(e) => setTools((prev) => ({ ...prev, subBadgeText: e.target.value }))}
            placeholder="integration"
            style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
            Heading Prefix
          </label>
          <input
            type="text"
            value={tools.heading || ''}
            onChange={(e) => setTools((prev) => ({ ...prev, heading: e.target.value }))}
            placeholder="Streamline workflows, save time,"
            style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', fontWeight: 600 }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
            Heading Highlight Text
          </label>
          <input
            type="text"
            value={tools.headingHighlight || ''}
            onChange={(e) => setTools((prev) => ({ ...prev, headingHighlight: e.target.value }))}
            placeholder="enhance performance"
            style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', fontWeight: 600, color: 'var(--brand-blue, #1833fe)' }}
          />
        </div>
      </div>

      {/* Tools List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
        {(tools.tools || []).map((tool, idx) => (
          <div
            key={tool.id || idx}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0F172A' }}>
                #{idx + 1} {tool.name}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveTool(idx)}
                style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
              >
                ✕ Remove
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                  Tech Name
                </label>
                <input
                  type="text"
                  value={tool.name || ''}
                  onChange={(e) => handleToolChange(idx, 'name', e.target.value)}
                  style={{ width: '100%', height: '32px', padding: '0 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.775rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>
                  Category
                </label>
                <input
                  type="text"
                  value={tool.category || ''}
                  onChange={(e) => handleToolChange(idx, 'category', e.target.value)}
                  style={{ width: '100%', height: '32px', padding: '0 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.775rem' }}
                />
              </div>
            </div>

            <HomeImageUploadField
              label="Tech Icon / SVG"
              value={tool.icon || ''}
              onChange={(val) => handleToolChange(idx, 'icon', val)}
              onOpenAssetPicker={() => onOpenAssetPicker(`tools.${idx}.icon`)}
              altValue={tool.iconAlt || ''}
              onAltChange={(alt) => handleToolChange(idx, 'iconAlt', alt)}
              recommendedDimensions="40 × 40 px (SVG/PNG)"
              previewHeight={40}
              previewWidth={40}
              shape="square"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
