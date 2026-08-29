'use client';

import React from 'react';
import { HomeServiceItem } from '@/backend/services/home/home.types';
import HomeImageUploadField from './HomeImageUploadField';

interface ServicesTabProps {
  services: HomeServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<HomeServiceItem[]>>;
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

export default function ServicesTab({ services, setServices, onOpenAssetPicker }: ServicesTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Section 2: Services Matrix
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue, #1833fe)', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
          {services.length} Service Offerings
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {services.map((srv, idx) => (
          <div
            key={srv.id || idx}
            style={{
              border: 'none',
              padding: '0 0 18px 0',
              borderBottom: idx < services.length - 1 ? '1px solid #E2E8F0' : 'none',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800, color: 'var(--brand-blue, #1833fe)', fontSize: '0.9rem' }}>
                Service #{idx + 1}: {srv.title || 'Untitled Service'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Service Title</label>
                <input
                  type="text"
                  value={srv.title || ''}
                  onChange={(e) => {
                    const copy = [...services];
                    copy[idx] = { ...copy[idx], title: e.target.value };
                    setServices(copy);
                  }}
                  style={inputStyle}
                  placeholder="e.g. Website Development"
                />
              </div>
              <div>
                <label style={labelStyle}>Target Link URL</label>
                <input
                  type="text"
                  value={srv.link || srv.slug || ''}
                  onChange={(e) => {
                    const copy = [...services];
                    copy[idx] = { ...copy[idx], link: e.target.value, slug: e.target.value };
                    setServices(copy);
                  }}
                  style={inputStyle}
                  placeholder="e.g. /service/website-development"
                />
              </div>
            </div>

            {/* Service Icon with Device Upload & Asset Picker */}
            <HomeImageUploadField
              label="Service Icon / Graphic"
              value={srv.icon || ''}
              onChange={(url) => {
                const copy = [...services];
                copy[idx] = { ...copy[idx], icon: url };
                setServices(copy);
              }}
              onOpenAssetPicker={() => onOpenAssetPicker(`services.${idx}.icon`)}
              placeholder="Icon URL (e.g. /Taskopia_files/... or https://...)"
              previewWidth={50}
              previewHeight={50}
              shape="square"
              recommendedDimensions="128 × 128 px (SVG or PNG)"
            />

            <div>
              <label style={labelStyle}>Service Description</label>
              <textarea
                rows={2}
                value={srv.description || ''}
                onChange={(e) => {
                  const copy = [...services];
                  copy[idx] = { ...copy[idx], description: e.target.value };
                  setServices(copy);
                }}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Short value proposition of this service offering..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
