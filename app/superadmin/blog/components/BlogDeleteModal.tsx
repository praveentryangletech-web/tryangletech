'use client';

import React, { useState } from 'react';
import { BlogPostItem } from '@/backend/services/blog';

interface BlogDeleteModalProps {
  isOpen: boolean;
  post: BlogPostItem | null;
  onClose: () => void;
  onConfirm: (postIdOrSlug: string) => Promise<void>;
}

export default function BlogDeleteModal({
  isOpen,
  post,
  onClose,
  onConfirm,
}: BlogDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !post) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage('');
    try {
      const postId = post.id || post.slug;
      await onConfirm(postId);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to delete article.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '460px',
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          textAlign: 'center',
          animation: 'fadeInScale 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.75rem',
          }}
        >
          🗑️
        </div>

        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Delete Article?
        </h3>

        <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5 }}>
          Are you sure you want to permanently delete <strong style={{ color: '#1E293B' }}>{post.title}</strong>? This action cannot be undone.
        </p>

        {errorMessage && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              padding: '0.6rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.825rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              padding: '0.65rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}
