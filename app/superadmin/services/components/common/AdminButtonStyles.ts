import React from 'react';

/**
 * Standardized Superadmin Action Button Styles
 * Ensures 100% pixel-perfect consistency across all tabs & sections
 */

export const standardAddButtonStyle: React.CSSProperties = {
  height: '36px',
  padding: '0 16px',
  backgroundColor: '#EFF6FF',
  color: 'var(--brand-blue, #1833fe)',
  border: '1.5px solid #BFDBFE',
  borderRadius: '8px',
  fontSize: '0.825rem',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  userSelect: 'none',
  boxSizing: 'border-box',
};

export const standardAddButtonHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#DBEAFE';
    e.currentTarget.style.borderColor = '#93C5FD';
    e.currentTarget.style.transform = 'translateY(-1px)';
    e.currentTarget.style.boxShadow = '0 3px 8px rgba(24, 51, 254, 0.12)';
  },
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#EFF6FF';
    e.currentTarget.style.borderColor = '#BFDBFE';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  },
  onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(0.96)';
  },
  onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-1px)';
  },
};

export const standardDeleteButtonStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: '#EF4444',
  fontSize: '0.75rem',
  fontWeight: 700,
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  transition: 'all 0.15s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
};

export const standardDeleteButtonHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#DC2626';
    e.currentTarget.style.backgroundColor = '#FEE2E2';
  },
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#EF4444';
    e.currentTarget.style.backgroundColor = 'transparent';
  },
};

export const standardPrimaryButtonStyle: React.CSSProperties = {
  height: '38px',
  padding: '0 20px',
  backgroundColor: 'var(--brand-blue, #1833fe)',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: 700,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  boxShadow: '0 2px 6px rgba(24, 51, 254, 0.25)',
  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  userSelect: 'none',
  boxSizing: 'border-box',
};
