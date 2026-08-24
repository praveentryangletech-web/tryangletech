'use client';

import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from '@/app/superadmin/utils/apiClient';

export interface MediaAssetItem {
  filename: string;
  url: string;
  size: number;
  updatedAt?: string;
  altText?: string;
}

interface HomeMediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentValue?: string;
  title?: string;
}

export default function HomeMediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  currentValue = '',
  title = 'Select Asset from Library',
}: HomeMediaPickerModalProps) {
  const [mediaList, setMediaList] = useState<MediaAssetItem[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const modalFileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchMedia = async () => {
    setIsLoading(true);
    setUploadError(null);
    try {
      const res = await apiClient.get<MediaAssetItem[]>('/api/superadmin/media', { useCache: false });
      if (res.success && Array.isArray(res.data)) {
        setMediaList(res.data);
      }
    } catch (err: any) {
      console.warn('Failed to load media assets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchMedia();
  }, [isOpen]);

  const handleModalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploading(true);
    setUploadError(null);

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

    try {
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
      // Immediately select the newly uploaded image and close
      onSelect(data.url);
      onClose();
    } catch (err: any) {
      console.error('[Modal Upload Error]:', err);
      setUploadError(err?.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
      if (modalFileInputRef.current) modalFileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  const filteredAssets = mediaList.filter((m) =>
    m.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '880px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          border: '1px solid #E2E8F0',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
              {title}
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>
              Pick existing images from the media asset repository.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '6px',
            }}
            aria-label="Close asset picker"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Search Filter Toolbar */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderBottom: '1px solid #F1F5F9',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search assets by name (e.g. taskopia, banner, logo)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '0.85rem',
                outline: 'none',
                color: '#0F172A',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              ref={modalFileInputRef}
              type="file"
              accept="image/webp,image/png,image/jpeg,image/svg+xml,image/gif,image/avif"
              style={{ display: 'none' }}
              onChange={handleModalUpload}
            />
            <button
              type="button"
              onClick={() => modalFileInputRef.current?.click()}
              disabled={isUploading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1.5px solid #BFDBFE',
                backgroundColor: '#EFF6FF',
                color: '#1833FE',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: isUploading ? 'not-allowed' : 'pointer',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>{isUploading ? 'Uploading...' : 'Upload New'}</span>
            </button>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>
              {filteredAssets.length} Assets Found
            </span>
          </div>
        </div>

        {uploadError && (
          <div style={{ padding: '8px 1.75rem', backgroundColor: '#FEF2F2', borderBottom: '1px solid #FCA5A5', color: '#DC2626', fontSize: '0.8rem', fontWeight: 600 }}>
            ⚠ {uploadError}
          </div>
        )}

        {/* Assets Grid */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            overflowY: 'auto',
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1.25rem',
            minHeight: '260px',
          }}
        >
          {isLoading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
              Loading media assets...
            </div>
          ) : filteredAssets.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
              No assets found matching &quot;{search}&quot;.
            </div>
          ) : (
            filteredAssets.map((asset) => {
              const isSelected = currentValue === asset.url;

              return (
                <div
                  key={asset.filename}
                  onClick={() => {
                    onSelect(asset.url);
                    onClose();
                  }}
                  style={{
                    border: isSelected ? '2px solid #1833FE' : '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '8px',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    position: 'relative',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected
                      ? '0 4px 12px rgba(24, 51, 254, 0.15)'
                      : '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '110px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#F1F5F9',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.url}
                      alt={asset.filename}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        if (asset.filename && !img.src.includes('/api/media/')) {
                          img.src = `/api/media/${encodeURIComponent(asset.filename)}`;
                        }
                      }}
                    />
                    {isSelected && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          backgroundColor: '#1833FE',
                          color: '#FFFFFF',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        Current Selection
                      </span>
                    )}
                  </div>

                  <div style={{ overflow: 'hidden' }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.775rem',
                        fontWeight: 700,
                        color: '#0F172A',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={asset.filename}
                    >
                      {asset.filename}
                    </p>
                    <span style={{ fontSize: '0.675rem', color: '#64748B' }}>
                      {asset.size ? `${(asset.size / 1024).toFixed(0)} KB` : 'Asset'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(asset.url);
                      onClose();
                    }}
                    style={{
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: isSelected ? '#EFF6FF' : '#1833FE',
                      color: isSelected ? '#1833FE' : '#FFFFFF',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {isSelected ? '✓ Selected' : 'Select Image'}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: '#F8FAFC',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
