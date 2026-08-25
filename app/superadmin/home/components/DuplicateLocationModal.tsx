'use client';

import React, { useState, useMemo } from 'react';
import { LocationRegion, DEFAULT_LOCATION_REGIONS } from '@/backend/services/geo/geo.types';
import CustomDropdown from '@/app/superadmin/components/CustomDropdown';
import CitySearchSelect from './CitySearchSelect';
import { CitySearchResult } from '@/app/api/geo/cities/route';

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
  availableRegions?: string[];
  onSelectCity?: (cityData: CitySearchResult) => void;
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
  color: '#0F172A',
  outline: 'none',
  boxSizing: 'border-box',
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
  availableRegions = [],
  onSelectCity,
  isDuplicating,
  onExecuteDuplicate,
}: DuplicateLocationModalProps) {
  const [isCustomRegion, setIsCustomRegion] = useState(false);

  const regionList = useMemo(() => {
    const set = new Set<string>(DEFAULT_LOCATION_REGIONS);
    availableRegions.forEach((r) => {
      if (r && r.trim()) set.add(r.trim());
    });
    if (duplicateTargetRegion && duplicateTargetRegion.trim()) {
      set.add(duplicateTargetRegion.trim());
    }
    return Array.from(set);
  }, [availableRegions, duplicateTargetRegion]);

  if (!isOpen) return null;

  const handleCitySelect = (cityData: CitySearchResult) => {
    setDuplicateTargetCity(cityData.city);
    setDuplicateTargetSlug(cityData.slug);
    if (cityData.country) setDuplicateTargetCountry(cityData.country);
    if (cityData.region) setDuplicateTargetRegion(cityData.region);
    if (onSelectCity) onSelectCity(cityData);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.18)',
          border: '1px solid #E2E8F0',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              Duplicate Page Clone
            </h3>
            <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Create an AI & SEO optimized local clone for a new target city.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.35rem',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: '4px 6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Source Page Info Pill */}
        <div
          style={{
            padding: '10px 14px',
            backgroundColor: '#EFF6FF',
            borderRadius: '10px',
            border: '1px solid #BFDBFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.05rem' }}>📄</span>
            <div style={{ fontSize: '0.825rem', color: '#1E40AF' }}>
              Source: <strong style={{ color: '#1E3A8A' }}>{duplicateSource.name}</strong>
              <span style={{ color: '#3B82F6', fontSize: '0.75rem', marginLeft: '4px' }}>
                ({duplicateSource.slug === 'main' ? '/' : `/location/${duplicateSource.slug}`})
              </span>
            </div>
          </div>
          <span
            style={{
              fontSize: '0.675rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: '#DBEAFE',
              color: '#1D4ED8',
              letterSpacing: '0.04em',
            }}
          >
            ORIGINAL
          </span>
        </div>

        <form onSubmit={onExecuteDuplicate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* 1. Target City Search */}
          <div>
            <CitySearchSelect
              label="Target City Name *"
              value={duplicateTargetCity}
              onChange={(val) => {
                setDuplicateTargetCity(val);
                if (!duplicateTargetSlug || duplicateTargetSlug === 'new-city') {
                  setDuplicateTargetSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
                }
              }}
              onSelectCity={handleCitySelect}
              placeholder="Search city (e.g. Varanasi, Mumbai, Dubai, London)..."
              required
            />
          </div>

          {/* 2. Target URL Slug with Prefix Box */}
          <div>
            <label style={labelStyle}>Target URL Slug *</label>
            <div
              style={{
                display: 'flex',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
              }}
            >
              <span
                style={{
                  padding: '0 12px',
                  backgroundColor: '#F8FAFC',
                  color: '#64748B',
                  borderRight: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  userSelect: 'none',
                }}
              >
                /location/
              </span>
              <input
                type="text"
                placeholder="e.g. varanasi"
                value={duplicateTargetSlug}
                onChange={(e) => setDuplicateTargetSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.85rem',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  backgroundColor: 'transparent',
                }}
                required
              />
            </div>
          </div>

          {/* 3. Region & Country Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Region</label>
                <button
                  type="button"
                  onClick={() => setIsCustomRegion(!isCustomRegion)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--brand-blue, #1833fe)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {isCustomRegion ? '← Choose existing' : '+ Custom Region'}
                </button>
              </div>

              {isCustomRegion ? (
                <input
                  type="text"
                  placeholder="e.g. Southeast Asia"
                  value={duplicateTargetRegion}
                  onChange={(e) => setDuplicateTargetRegion(e.target.value as LocationRegion)}
                  style={inputStyle}
                  required
                />
              ) : (
                <CustomDropdown
                  value={duplicateTargetRegion || 'Gujarat'}
                  options={[
                    ...regionList.map((r) => ({ value: r, label: r })),
                    { value: '__custom__', label: '+ Add New Custom Region...' },
                  ]}
                  onChange={(val) => {
                    if (val === '__custom__') {
                      setIsCustomRegion(true);
                      setDuplicateTargetRegion('' as LocationRegion);
                    } else {
                      setDuplicateTargetRegion(val as LocationRegion);
                    }
                  }}
                  direction="down"
                  fullWidth
                  size="form"
                  buttonStyle={{
                    height: '42px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    padding: '0.65rem 0.85rem',
                  }}
                />
              )}
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

          {/* 4. Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                height: '38px',
                padding: '0 18px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#64748B',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDuplicating}
              style={{
                height: '38px',
                padding: '0 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isDuplicating ? '#94A3B8' : 'var(--brand-blue, #1833fe)',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: isDuplicating ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(24, 51, 254, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
            >
              {isDuplicating ? (
                <>
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#FFFFFF',
                      borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                      display: 'inline-block',
                    }}
                  />
                  <span>Cloning...</span>
                </>
              ) : (
                <>
                  <span>Duplicate & Edit</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
