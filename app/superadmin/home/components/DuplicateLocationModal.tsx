'use client';

import React from 'react';
import { LocationRegion } from '@/backend/services/geo/geo.types';

const REGION_OPTIONS: LocationRegion[] = [
  'Gujarat',
  'India Metros',
  'Middle East',
  'USA & Canada',
  'Europe & UK',
  'Global Hubs',
];

interface DuplicateLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  duplicateSource: { name: string; slug: string };
  duplicateTargetCity: string;
  setDuplicateTargetCity: (val: string) => void;
  duplicateTargetSlug: string;
  setDuplicateTargetSlug: (val: string) => void;
  duplicateTargetRegion: LocationRegion;
  setDuplicateTargetRegion: (val: LocationRegion) => void;
  duplicateTargetCountry: string;
  setDuplicateTargetCountry: (val: string) => void;
  isDuplicating: boolean;
  onExecuteDuplicate: (e: React.FormEvent) => void;
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

export default function DuplicateLocationModal({
  isOpen,
  onClose,
  duplicateSource,
  duplicateTargetCity,
  setDuplicateTargetCity,
  duplicateTargetSlug,
  setDuplicateTargetSlug,
  duplicateTargetRegion,
  setDuplicateTargetRegion,
  duplicateTargetCountry,
  setDuplicateTargetCountry,
  isDuplicating,
  onExecuteDuplicate,
}: DuplicateLocationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          maxWidth: '480px',
          width: '100%',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
            Duplicate Page Clone
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '8px 12px', backgroundColor: '#EFF6FF', borderRadius: '8px', marginBottom: '16px', fontSize: '0.825rem', color: '#1E40AF', border: '1px solid #BFDBFE' }}>
          Source: <strong>{duplicateSource.name}</strong>
        </div>

        <form onSubmit={onExecuteDuplicate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Target City Name *</label>
            <input
              type="text"
              placeholder="e.g. Pune, Jaipur, Berlin"
              value={duplicateTargetCity}
              onChange={(e) => {
                setDuplicateTargetCity(e.target.value);
                setDuplicateTargetSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
              }}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Target URL Slug *</label>
            <input
              type="text"
              placeholder="e.g. pune"
              value={duplicateTargetSlug}
              onChange={(e) => setDuplicateTargetSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Region</label>
              <select
                value={duplicateTargetRegion}
                onChange={(e) => setDuplicateTargetRegion(e.target.value as any)}
                style={{ ...inputStyle, backgroundColor: '#FFFFFF' }}
              >
                {REGION_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Country</label>
              <input
                type="text"
                value={duplicateTargetCountry}
                onChange={(e) => setDuplicateTargetCountry(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#64748B',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDuplicating}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: isDuplicating ? 'not-allowed' : 'pointer',
                opacity: isDuplicating ? 0.7 : 1,
              }}
            >
              {isDuplicating ? 'Cloning...' : 'Duplicate & Edit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
