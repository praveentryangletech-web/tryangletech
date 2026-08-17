'use client';

import React, { useState } from 'react';
import { Project } from '../../../data/portfolioData';

interface PortfolioDeleteModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onConfirm: (projectIdOrSlug: string) => Promise<void>;
}

export default function PortfolioDeleteModal({
  isOpen,
  project,
  onClose,
  onConfirm,
}: PortfolioDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !project) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage('');
    try {
      // Pass ID or slug
      const idOrSlug = (project as any).id || project.slug;
      await onConfirm(idOrSlug);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to delete project.');
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
          Delete Project?
        </h3>

        <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5 }}>
          Are you sure you want to permanently delete <strong style={{ color: '#1E293B' }}>{project.title}</strong>? This action cannot be undone.
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
              marginBottom: '1rem',
            }}
          >
            {errorMessage}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '0.875rem',
              fontWeight: 600,
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
              flex: 1,
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
            }}
          >
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
