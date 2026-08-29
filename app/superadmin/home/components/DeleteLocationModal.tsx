'use client';

import React from 'react';
import { LocationItem, LocationSummaryItem } from '@/backend/services/geo/geo.types';

interface DeleteLocationModalProps {
  deletingLocation: LocationItem | LocationSummaryItem | null;
  onClose: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
}

export default function DeleteLocationModal({
  deletingLocation,
  onClose,
  onConfirmDelete,
  isDeleting,
}: DeleteLocationModalProps) {
  if (!deletingLocation) return null;

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
          maxWidth: '440px',
          width: '100%',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
          Delete Location &quot;{deletingLocation.city}&quot;?
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 20px 0' }}>
          Are you sure you want to delete <strong>/{deletingLocation.slug}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
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
            type="button"
            onClick={onConfirmDelete}
            disabled={isDeleting}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
            }}
          >
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
