'use client';

import React, { useRef, useState } from 'react';
import { convertFileToWebp } from '@/app/superadmin/utils/imageOptimizer';
import { UploadIcon, LibraryIcon, CameraPlaceholderIcon, CloseIcon } from './StandardSvgIcons';

interface ImageFieldWithUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  altLabel?: string;
  onOpenLibrary?: () => void;
  recommendedDimensions?: string;
  previewHeight?: number | string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover';
  uploadPrefix?: string;
  placeholder?: string;
}

export default function ImageFieldWithUpload({
  label,
  value,
  onChange,
  altValue = '',
  onAltChange,
  altLabel = 'Alt Text (Accessibility & SEO)',
  onOpenLibrary,
  recommendedDimensions = '800 × 800 px',
  previewHeight,
  aspectRatio = '16 / 9',
  objectFit = 'contain',
  uploadPrefix = 'service-asset',
  placeholder = '/service-1-assets/...webp',
}: ImageFieldWithUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const rawFile = files[0];

    setIsUploading(true);
    setUploadError(null);

    try {
      // 1. Optimize / convert file to WebP client-side
      const file = await convertFileToWebp(rawFile);

      // 2. Prepare FormData
      const formData = new FormData();
      formData.append('file', file);

      const lastDot = file.name.lastIndexOf('.');
      const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
      const cleanBase = baseName
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      formData.append('customName', `${uploadPrefix}-${cleanBase || 'asset'}`);
      if (altValue) formData.append('altText', altValue);

      // 3. Headers
      const headers: Record<string, string> = {};
      const adminKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
      if (adminKey) headers['x-admin-key'] = adminKey;
      try {
        const user = localStorage.getItem('superadmin_user');
        if (user) {
          const parsed = JSON.parse(user);
          if (parsed.token) headers['Authorization'] = `Bearer ${parsed.token}`;
        }
      } catch {}

      // 4. Send upload request
      const res = await fetch('/api/superadmin/media', {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();

      if (!data.success || !data.url) {
        throw new Error(data.error || 'Failed to upload image.');
      }

      // 5. Update state
      onChange(data.url);
      if (!altValue && onAltChange && cleanBase) {
        const autoAlt = cleanBase.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        onAltChange(autoAlt);
      }
    } catch (err: any) {
      console.error('[Device Upload Error]:', err);
      setUploadError(err?.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div
      style={{
        border: 'none',
        borderRadius: '0',
        padding: '0',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Label & Recommended Dimensions Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', margin: 0 }}>
            {label}
          </label>
          {recommendedDimensions && (
            <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
              Fix Size: <strong style={{ color: 'var(--brand-blue, #1833fe)' }}>{recommendedDimensions}</strong>
            </span>
          )}
        </div>

        {/* Action Buttons: Upload from Device & Choose from Library */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleDeviceUpload}
            style={{ display: 'none' }}
          />

          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#334155',
              border: '1px solid #CBD5E1',
              borderRadius: '6px',
              padding: '4px 9px',
              fontSize: '0.725rem',
              fontWeight: 700,
              cursor: isUploading ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease',
            }}
            title="Upload directly from your computer"
          >
            <UploadIcon size={12} color="#1833FE" />
            <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
          </button>

          {onOpenLibrary && (
            <button
              type="button"
              onClick={onOpenLibrary}
              style={{
                backgroundColor: '#EFF6FF',
                color: 'var(--brand-blue, #1833fe)',
                border: '1px solid #BFDBFE',
                borderRadius: '6px',
                padding: '4px 9px',
                fontSize: '0.725rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease',
              }}
              title="Pick an existing image from media library"
            >
              <LibraryIcon size={12} color="#1833FE" />
              <span>Library</span>
            </button>
          )}
        </div>
      </div>

      {uploadError && (
        <div style={{ fontSize: '0.725rem', color: '#DC2626', fontWeight: 600 }}>
          {uploadError}
        </div>
      )}

      {/* Image URL Input */}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: '36px',
          padding: '0 10px',
          borderRadius: '6px',
          border: '1px solid #CBD5E1',
          backgroundColor: '#FFFFFF',
          fontSize: '0.8rem',
          color: '#0F172A',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Alt Text Input */}
      {onAltChange && (
        <>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', marginTop: '2px' }}>
            {altLabel}
          </label>
          <input
            type="text"
            value={altValue || ''}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Descriptive image caption for SEO & screen readers"
            style={{
              width: '100%',
              height: '36px',
              padding: '0 10px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '0.8rem',
              color: '#0F172A',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </>
      )}

      {/* Fixed Aspect Ratio Image Preview Box */}
      <div
        style={{
          marginTop: '4px',
          width: '100%',
          aspectRatio: aspectRatio || '16 / 9',
          height: previewHeight ? (typeof previewHeight === 'number' ? `${previewHeight}px` : previewHeight) : 'auto',
          maxHeight: '260px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #CBD5E1',
          backgroundColor: '#FFFFFF',
          backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
          backgroundSize: '12px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {value ? (
          <>
            <img
              src={value}
              alt={altValue || 'Preview'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: objectFit || 'contain',
                display: 'block',
              }}
            />
            <button
              type="button"
              onClick={() => onChange('')}
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.15s ease',
              }}
              title="Clear Image"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#DC2626')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)')}
            >
              <CloseIcon size={12} color="#FFFFFF" />
            </button>
          </>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#94A3B8',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              padding: '8px',
              textAlign: 'center',
            }}
          >
            <CameraPlaceholderIcon size={24} color="#94A3B8" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>
              No image selected
            </span>
            <span style={{ fontSize: '0.675rem', color: 'var(--brand-blue, #1833fe)', textDecoration: 'underline' }}>
              Click to upload from device
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
