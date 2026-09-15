'use client';

import React, { useRef, useState } from 'react';
import { convertFileToWebp } from '@/app/superadmin/utils/imageOptimizer';

interface HomeImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onOpenAssetPicker: () => void;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  placeholder?: string;
  previewHeight?: number | string;
  previewWidth?: number | string;
  shape?: 'square' | 'round' | 'rect';
  helperText?: string;
  recommendedDimensions?: string;
}

export default function HomeImageUploadField({
  label,
  value,
  onChange,
  onOpenAssetPicker,
  altValue,
  onAltChange,
  placeholder = '/Taskopia_files/... or https://...',
  previewHeight = 64,
  previewWidth = 96,
  shape = 'rect',
  helperText,
  recommendedDimensions,
}: HomeImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [hasLoadError, setHasLoadError] = useState(false);

  React.useEffect(() => {
    setHasLoadError(false);
  }, [value]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const rawFile = files[0];

    setIsUploading(true);
    setUploadError(null);

    // Automatically convert any PNG, JPG, JPEG, BMP to lightweight WebP format
    const file = await convertFileToWebp(rawFile);

    const formData = new FormData();
    formData.append('file', file);

    const lastDot = file.name.lastIndexOf('.');
    const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
    const cleanBase = baseName
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    formData.append('customName', cleanBase || 'home-media');

    // Auto-suggest initial Alt text if currently empty
    if (onAltChange && !altValue && cleanBase) {
      const suggestedAlt = cleanBase
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      onAltChange(suggestedAlt);
    }

    const headers: Record<string, string> = {};
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
    if (adminKey) {
      headers['x-admin-key'] = adminKey;
    }
    if (typeof window !== 'undefined') {
      try {
        const user = localStorage.getItem('superadmin_user');
        if (user) {
          const parsed = JSON.parse(user);
          if (parsed.token) {
            headers['Authorization'] = `Bearer ${parsed.token}`;
          }
        }
      } catch {}
    }

    try {
      const res = await fetch('/api/superadmin/media', {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.success || !data.url) {
        throw new Error(data.error || 'Failed to upload asset.');
      }
      onChange(data.url);
    } catch (err: any) {
      console.error('[HomeImageUploadField] Upload error:', err);
      setUploadError(err?.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const isImg = Boolean(value && (value.startsWith('/') || value.startsWith('http') || value.startsWith('data:')));

  const borderRadius = shape === 'round' ? '50%' : '8px';
  const defaultDim = shape === 'square' ? 52 : (shape === 'round' ? 52 : 64);
  const parsedHeight = typeof previewHeight === 'number' ? `${previewHeight}px` : (previewHeight ? String(previewHeight) : `${defaultDim}px`);
  const parsedWidth = typeof previewWidth === 'number' ? `${previewWidth}px` : (previewWidth ? String(previewWidth) : (shape === 'square' || shape === 'round' ? parsedHeight : '80px'));
  const displayWidth = shape === 'round' ? parsedHeight : parsedWidth;
  const displayHeight = parsedHeight;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
          {label}
        </label>
        {recommendedDimensions && (
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
              backgroundColor: '#EFF6FF',
              color: '#1833FE',
              border: '1px solid #BFDBFE',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              letterSpacing: '0.01em',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            Recommended: {recommendedDimensions}
          </span>
        )}
      </div>

      {helperText && (
        <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '-2px' }}>
          {helperText}
        </span>
      )}

      {/* Main Image Control Row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', width: '100%' }}>
        {/* Preview Thumbnail */}
        <div
          style={{
            width: displayWidth,
            height: displayHeight,
            minWidth: displayWidth,
            minHeight: displayHeight,
            borderRadius: borderRadius,
            border: '1px solid #CBD5E1',
            backgroundColor: '#F8FAFC',
            overflow: 'hidden',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            padding: '4px',
            boxSizing: 'border-box',
          }}
        >
          {isImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                if (value.includes('/portfolio/') && !img.src.includes('/api/media/')) {
                  const filename = value.split('/').pop() || '';
                  img.src = `/api/media/${encodeURIComponent(filename)}`;
                }
              }}
            />
          ) : (
            <span style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 600, textAlign: 'center', padding: '2px' }}>
              No image
            </span>
          )}

          {isUploading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid #1833FE',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
            </div>
          )}
        </div>

        {/* Input & Action Buttons */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              placeholder={placeholder}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              style={{
                flex: 1,
                padding: '0.6rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 500,
                outline: 'none',
                color: '#0F172A',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                title="Clear image URL"
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#64748B',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* SEO Image Alt Text Input Field */}
          {onAltChange && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#475569',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                🏷️ Alt Text:
              </span>
              <input
                type="text"
                placeholder="SEO image description (e.g. TryangleTech Cloud Dashboard Overview)"
                value={altValue || ''}
                onChange={(e) => onAltChange(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '0.78rem',
                  color: '#1E293B',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/webp,image/png,image/jpeg,image/svg+xml,image/gif,image/avif"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />

            {/* Upload from Device Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1.5px solid #BFDBFE',
                backgroundColor: '#EFF6FF',
                color: '#1833FE',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: isUploading ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>{isUploading ? 'Uploading...' : 'Upload from Device'}</span>
            </button>

            {/* Select from Existing Assets Button */}
            <button
              type="button"
              onClick={onOpenAssetPicker}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1.5px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Select Existing Asset</span>
            </button>
          </div>
        </div>
      </div>

      {uploadError && (
        <span style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>
          ⚠ {uploadError}
        </span>
      )}
    </div>
  );
}
