'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Tooltip from '../components/Tooltip';

interface MediaAsset {
  filename: string;
  url: string;
  size: number;
  updatedAt: string;
}

export default function AssetManagementPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'size-desc' | 'size-asc' | 'name-asc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customFilename, setCustomFilename] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Rename States
  const [renamingAsset, setRenamingAsset] = useState<MediaAsset | null>(null);
  const [newFilenameInput, setNewFilenameInput] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameFeedback, setRenameFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Lightbox Modal
  const [lightboxImage, setLightboxImage] = useState<MediaAsset | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/superadmin/media');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMediaList(data.data);
      }
    } catch {
      // Handle error gracefully
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSelectFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setSelectedFile(file);

    const lastDot = file.name.lastIndexOf('.');
    const baseName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
    const cleanBase = baseName
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    setCustomFilename(cleanBase || 'portfolio-asset');
    setPreviewUrl(URL.createObjectURL(file));
    setUploadFeedback(null);
  };

  const handleExecuteUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadFeedback(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    if (customFilename.trim()) {
      formData.append('customName', customFilename.trim());
    }

    try {
      const res = await fetch('/api/superadmin/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to upload asset.');
      }

      setUploadFeedback({
        type: 'success',
        text: `Asset "${data.filename}" successfully uploaded and saved to public/portfolio!`,
      });

      setSelectedFile(null);
      setCustomFilename('');
      setPreviewUrl(null);
      fetchAssets();
    } catch (err: any) {
      setUploadFeedback({ type: 'error', text: err?.message || 'Upload failed.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setCustomFilename('');
    setPreviewUrl(null);
  };

  const handleStartRename = (asset: MediaAsset) => {
    setRenamingAsset(asset);
    const lastDot = asset.filename.lastIndexOf('.');
    const baseName = lastDot !== -1 ? asset.filename.substring(0, lastDot) : asset.filename;
    setNewFilenameInput(baseName);
    setRenameFeedback(null);
  };

  const handleExecuteRename = async () => {
    if (!renamingAsset || !newFilenameInput.trim()) return;
    setIsRenaming(true);
    setRenameFeedback(null);

    try {
      const res = await fetch('/api/superadmin/media', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldFilename: renamingAsset.filename,
          newFilename: newFilenameInput.trim(),
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to rename asset.');
      }

      setUploadFeedback({
        type: 'success',
        text: `Asset renamed to "${data.filename}" and updated across ${data.affectedProjects || 0} case study project(s) everywhere!`,
      });

      if (lightboxImage?.filename === renamingAsset.filename) {
        setLightboxImage({
          ...lightboxImage,
          filename: data.filename,
          url: data.newUrl,
        });
      }

      setRenamingAsset(null);
      fetchAssets();
    } catch (err: any) {
      setRenameFeedback({ type: 'error', text: err?.message || 'Rename failed.' });
    } finally {
      setIsRenaming(false);
    }
  };

  const handleDeleteAsset = async (filename: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${filename}" from public/portfolio? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch('/api/superadmin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to delete asset.');
      }

      setUploadFeedback({
        type: 'success',
        text: `Asset "${filename}" deleted from disk.`,
      });
      if (lightboxImage?.filename === filename) {
        setLightboxImage(null);
      }
      fetchAssets();
    } catch (err: any) {
      alert(`Delete failed: ${err?.message || 'Error deleting file.'}`);
    }
  };

  const handleCopyPath = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Filter and Sort
  const filteredAssets = mediaList
    .filter((asset) => asset.filename.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortBy === 'oldest') return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      if (sortBy === 'size-desc') return b.size - a.size;
      if (sortBy === 'size-asc') return a.size - b.size;
      if (sortBy === 'name-asc') return a.filename.localeCompare(b.filename);
      return 0;
    });

  const totalBytes = mediaList.reduce((acc, curr) => acc + curr.size, 0);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

  return (
    <div style={{ width: '100%', padding: '1.25rem 2rem 3rem 2rem' }}>
      {/* Top Header Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.25rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Asset Management
            </h1>
            <span
              style={{
                backgroundColor: '#EFF6FF',
                color: '#1833FE',
                border: '1px solid #BFDBFE',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 800,
              }}
            >
              /public/portfolio
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
            Manage physical image files on disk. Upload, rename everywhere, preview, copy URLs, or delete obsolete assets.
          </p>
        </div>

        {/* KPI Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Total Assets
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A' }}>
              {mediaList.length}
            </span>
          </div>
          <div style={{ height: '32px', width: '1px', backgroundColor: '#E2E8F0' }} />
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Disk Usage
            </span>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1833FE' }}>
              {totalMB} MB
            </span>
          </div>
          <button
            type="button"
            onClick={fetchAssets}
            disabled={isLoading}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Upload Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.25rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        }}
      >
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
          Upload New Asset to <code>public/portfolio/</code>
        </h2>
        <p style={{ fontSize: '0.825rem', color: '#64748B', margin: '0 0 1rem 0' }}>
          Upload images from your device. You can customize the destination filename before saving.
        </p>

        {!selectedFile ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleSelectFile(e.dataTransfer.files);
              }
            }}
            onClick={() => document.getElementById('asset-upload-input')?.click()}
            style={{
              border: '2px dashed #CBD5E1',
              borderRadius: '12px',
              padding: '1.5rem 1rem',
              textAlign: 'center',
              backgroundColor: '#F8FAFC',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              id="asset-upload-input"
              type="file"
              accept="image/webp,image/png,image/jpeg,image/svg+xml,image/gif,image/avif"
              style={{ display: 'none' }}
              onChange={(e) => handleSelectFile(e.target.files)}
            />
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem',
                color: '#1833FE',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 700, color: '#1E293B' }}>
              Click to Browse or Drag & Drop Image Here
            </p>
            <p style={{ margin: 0, fontSize: '0.775rem', color: '#64748B' }}>
              Supports WebP, PNG, JPG, SVG, GIF (Up to 10MB)
            </p>
          </div>
        ) : (
          <div
            style={{
              border: '1.5px solid #BFDBFE',
              borderRadius: '14px',
              padding: '1.25rem',
              backgroundColor: '#F0F9FF',
              display: 'grid',
              gridTemplateColumns: 'minmax(120px, 160px) 1fr',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '115px',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
              }}
            >
              {previewUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={previewUrl}
                  alt="Upload Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
              <span
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '4px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '2px 5px',
                  borderRadius: '4px',
                }}
              >
                {(selectedFile.size / 1024).toFixed(0)} KB
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>
                  Modify Destination Filename:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="text"
                    value={customFilename}
                    onChange={(e) => setCustomFilename(e.target.value)}
                    placeholder="e.g. client-project-hero"
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #3B82F6',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      outline: 'none',
                    }}
                  />
                  <span
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#E0F2FE',
                      color: '#0369A1',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                    }}
                  >
                    {selectedFile.name.substring(selectedFile.name.lastIndexOf('.')) || '.webp'}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.725rem', color: '#0369A1' }}>
                  Target Path: <strong>/portfolio/{customFilename || 'asset'}{selectedFile.name.substring(selectedFile.name.lastIndexOf('.')) || '.webp'}</strong>
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={handleExecuteUpload}
                  disabled={isUploading}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#1833FE',
                    color: '#FFFFFF',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(24, 51, 254, 0.25)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span>{isUploading ? 'Uploading...' : 'Upload & Store on Disk'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCancelUpload}
                  disabled={isUploading}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#475569',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {uploadFeedback && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              backgroundColor: uploadFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
              color: uploadFeedback.type === 'success' ? '#047857' : '#B91C1C',
              border: `1px solid ${uploadFeedback.type === 'success' ? '#A7F3D0' : '#FECACA'}`,
              fontSize: '0.825rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>{uploadFeedback.text}</span>
            <button
              type="button"
              onClick={() => setUploadFeedback(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 800 }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Assets Filter & Gallery Section */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        }}
      >
        {/* Controls Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <div style={{ flex: 1, minWidth: '240px', maxWidth: '420px', position: 'relative' }}>
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
              placeholder="Search assets by filename (e.g. 7d, vh, devrshree)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 34px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                fontSize: '0.85rem',
                outline: 'none',
                color: '#0F172A',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="size-desc">Sort: Largest Size</option>
              <option value="size-asc">Sort: Smallest Size</option>
              <option value="name-asc">Sort: Filename (A-Z)</option>
            </select>

            {/* View Mode Toggle */}
            <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '8px', padding: '3px' }}>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'grid' ? '#1833FE' : '#64748B',
                  fontWeight: 700,
                  fontSize: '0.775rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'table' ? '#1833FE' : '#64748B',
                  fontWeight: 700,
                  fontSize: '0.775rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span>Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {filteredAssets.map((asset) => (
              <div
                key={asset.filename}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '10px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'all 0.15s ease',
                }}
              >
                {/* Thumbnail */}
                <div
                  onClick={() => setLightboxImage(asset)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '145px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#F1F5F9',
                    cursor: 'zoom-in',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset.url}
                    alt={asset.filename}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/portfolio/vh-accounting.webp';
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      right: '6px',
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '6px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {(asset.size / 1024).toFixed(0)} KB
                  </span>
                </div>

                {/* Filename & Path */}
                <div style={{ overflow: 'hidden' }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.825rem',
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
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>
                    {asset.url}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid #F1F5F9' }}>
                  <Tooltip text="Copy public image path to clipboard" position="top">
                    <button
                      type="button"
                      onClick={() => handleCopyPath(asset.url)}
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: copiedUrl === asset.url ? '#ECFDF5' : '#FFFFFF',
                        color: copiedUrl === asset.url ? '#047857' : '#334155',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {copiedUrl === asset.url ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </Tooltip>

                  <Tooltip text="Rename filename and cascade everywhere" position="top">
                    <button
                      type="button"
                      onClick={() => handleStartRename(asset)}
                      style={{
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: '1px solid #BFDBFE',
                        backgroundColor: '#EFF6FF',
                        color: '#1833FE',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </Tooltip>

                  <Tooltip text="Preview full image" position="top">
                    <button
                      type="button"
                      onClick={() => setLightboxImage(asset)}
                      style={{
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        color: '#334155',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </Tooltip>

                  <Tooltip text="Permanently delete from disk" position="top">
                    <button
                      type="button"
                      onClick={() => handleDeleteAsset(asset.filename)}
                      style={{
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: '1px solid #FECACA',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #E2E8F0' }}>
                  <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Preview</th>
                  <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Filename</th>
                  <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Public Path</th>
                  <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Size</th>
                  <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.filename} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div
                        onClick={() => setLightboxImage(asset)}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '#F1F5F9',
                          cursor: 'zoom-in',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset.url}
                          alt={asset.filename}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>
                      {asset.filename}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', fontFamily: 'monospace', color: '#64748B' }}>
                      {asset.url}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.825rem', color: '#334155', fontWeight: 600 }}>
                      {(asset.size / 1024).toFixed(0)} KB
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <button
                          type="button"
                          onClick={() => handleCopyPath(asset.url)}
                          style={{
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: copiedUrl === asset.url ? '#ECFDF5' : '#FFFFFF',
                            color: copiedUrl === asset.url ? '#047857' : '#334155',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {copiedUrl === asset.url ? (
                            <>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStartRename(asset)}
                          style={{
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: '1px solid #BFDBFE',
                            backgroundColor: '#EFF6FF',
                            color: '#1833FE',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span>Rename</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLightboxImage(asset)}
                          style={{
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#334155',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <span>Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAsset(asset.filename)}
                          style={{
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: '1px solid #FECACA',
                            backgroundColor: '#FEF2F2',
                            color: '#DC2626',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rename Modal with Global Cascade Notification */}
      {renamingAsset && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem',
          }}
          onClick={() => {
            if (!isRenaming) setRenamingAsset(null);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '540px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              border: '1px solid #E2E8F0',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#1833FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                  Rename Asset Everywhere
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!isRenaming) setRenamingAsset(null);
                }}
                disabled={isRenaming}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  cursor: isRenaming ? 'not-allowed' : 'pointer',
                  color: '#64748B',
                }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Asset Preview Mini Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#E2E8F0', flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={renamingAsset.url}
                    alt={renamingAsset.filename}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                    Current Filename
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    {renamingAsset.filename}
                  </span>
                </div>
              </div>

              {/* Input field */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                  New Filename:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="text"
                    value={newFilenameInput}
                    onChange={(e) => setNewFilenameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleExecuteRename();
                      }
                    }}
                    placeholder="e.g. accounting-hero-dashboard"
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #3B82F6',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      outline: 'none',
                    }}
                  />
                  <span
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      backgroundColor: '#EFF6FF',
                      color: '#1833FE',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                    }}
                  >
                    {renamingAsset.filename.substring(renamingAsset.filename.lastIndexOf('.')) || '.webp'}
                  </span>
                </div>
                <p style={{ margin: '6px 0 0 0', fontSize: '0.75rem', color: '#0369A1' }}>
                  Target Path: <strong>/portfolio/{newFilenameInput.toLowerCase().replace(/[^a-z0-9_-]/g, '-') || 'asset'}{renamingAsset.filename.substring(renamingAsset.filename.lastIndexOf('.')) || '.webp'}</strong>
                </p>
              </div>

              {/* Cascade Notification Banner */}
              <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF', fontSize: '0.8rem', lineHeight: '1.4', display: 'flex', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>
                  <strong>Automatic Global Cascade</strong>: Renaming this asset will instantly update all Portfolio project cover images and slider showcases across the database and live website.
                </span>
              </div>

              {/* Feedback Error */}
              {renameFeedback && (
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: renameFeedback.type === 'success' ? '#ECFDF5' : '#FEF2F2',
                    color: renameFeedback.type === 'success' ? '#047857' : '#B91C1C',
                    border: `1px solid ${renameFeedback.type === 'success' ? '#A7F3D0' : '#FECACA'}`,
                    fontSize: '0.825rem',
                    fontWeight: 600,
                  }}
                >
                  {renameFeedback.text}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#F8FAFC' }}>
              <button
                type="button"
                onClick={() => setRenamingAsset(null)}
                disabled={isRenaming}
                style={{
                  padding: '9px 16px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: isRenaming ? 'not-allowed' : 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleExecuteRename}
                disabled={isRenaming || !newFilenameInput.trim()}
                style={{
                  padding: '9px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#1833FE',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: isRenaming || !newFilenameInput.trim() ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(24, 51, 254, 0.25)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>{isRenaming ? 'Renaming everywhere...' : 'Save & Cascade Everywhere'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Lightbox Modal */}
      {lightboxImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem',
          }}
          onClick={() => setLightboxImage(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '850px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                  {lightboxImage.filename}
                </h3>
                <span style={{ fontSize: '0.775rem', color: '#64748B', fontFamily: 'monospace' }}>
                  {lightboxImage.url} • {(lightboxImage.size / 1024).toFixed(0)} KB
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Image Area */}
            <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '550px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImage.url}
                alt={lightboxImage.filename}
                style={{ maxWidth: '100%', maxHeight: '480px', objectFit: 'contain', borderRadius: '12px' }}
              />
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleCopyPath(lightboxImage.url)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: copiedUrl === lightboxImage.url ? '#ECFDF5' : '#FFFFFF',
                    color: copiedUrl === lightboxImage.url ? '#047857' : '#1833FE',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {copiedUrl === lightboxImage.url ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Path Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy Path</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleStartRename(lightboxImage)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: '1px solid #BFDBFE',
                    backgroundColor: '#EFF6FF',
                    color: '#1833FE',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Rename Asset</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteAsset(lightboxImage.filename)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid #FECACA',
                  backgroundColor: '#FEF2F2',
                  color: '#DC2626',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
                <span>Delete File from Disk</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
