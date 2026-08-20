'use client';

import React from 'react';
import { Inquiry } from '../../data/mockData';

interface InquiryModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onStatusChange: (id: string, status: Inquiry['status']) => void;
}

export default function InquiryDetailsModal({ inquiry, onClose, onStatusChange }: InquiryModalProps) {
  if (!inquiry) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1.5rem',
      }}
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 25px 50px -12px rgba(24, 72, 212, 0.25)',
          border: '1px solid #E2E8F0',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
              {inquiry.firstName} {inquiry.lastName}
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--vivid-blue, #4f46e5)', marginTop: '4px', fontWeight: 700 }}>
              {inquiry.email} • {inquiry.phone}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F1F5F9',
              border: 'none',
              color: '#64748B',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close modal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Subjects */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 800, marginBottom: '6px' }}>
            Inquiry Category / Subjects
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {inquiry.subjects.map((sub: string) => (
              <span
                key={sub}
                style={{
                  fontSize: '0.8rem',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  backgroundColor: '#EEF2FF',
                  color: '#4338CA',
                  fontWeight: 700,
                }}>
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Message */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 800, marginBottom: '6px' }}>
            Client Message
          </div>
          <div
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #EDF2F7',
              borderRadius: '14px',
              padding: '1.25rem',
              color: '#334155',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              maxHeight: '200px',
              overflowY: 'auto',
            }}>
            {inquiry.message}
          </div>
        </div>

        {/* Actions & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid #EDF2F7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B' }}>Status:</span>
            <select
              value={inquiry.status}
              onChange={(e) => onStatusChange(inquiry.id, e.target.value as Inquiry['status'])}
              style={{
                padding: '6px 12px',
                borderRadius: '100px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}>
              <option value="NEW">NEW</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={`tel:${inquiry.phone}`}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#F1F5F9',
                color: '#334155',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call</span>
            </a>
            <a
              href={`mailto:${inquiry.email}?subject=Re: Your Inquiry with TryangleTech`}
              style={{
                backgroundColor: 'var(--vivid-blue, #4f46e5)',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Reply</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
