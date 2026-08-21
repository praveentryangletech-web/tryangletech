'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption<T = string | number> {
  value: T;
  label?: string | number;
}

interface CustomDropdownProps<T = string | number> {
  value: T;
  options: (T | DropdownOption<T>)[];
  onChange: (val: T) => void;
  direction?: 'up' | 'down';
  placeholder?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'form';
  className?: string;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
}

/**
 * Custom Agency-Grade Dropdown Component
 * 
 * Replaces native OS <select> with a modern, branded flyout menu with:
 * - Click outside detection
 * - Upward / downward positioning
 * - Active checkmark indicator
 * - Smooth hover and focus states
 * - Standard form size (matching text inputs) or compact size (for table footers)
 */
export default function CustomDropdown<T extends string | number>({
  value,
  options,
  onChange,
  direction = 'up',
  placeholder,
  fullWidth = false,
  size = 'sm',
  className,
  style,
  buttonStyle,
}: CustomDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isFormSize = size === 'form' || fullWidth;

  // Normalize options array
  const formattedOptions: DropdownOption<T>[] = options.map((opt) =>
    typeof opt === 'object' && opt !== null && 'value' in opt
      ? (opt as DropdownOption<T>)
      : { value: opt as T, label: opt }
  );

  const selectedOption = formattedOptions.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={className}
      style={{
        position: 'relative',
        display: isFormSize ? 'block' : 'inline-block',
        width: isFormSize ? '100%' : 'auto',
        ...style,
      }}
    >
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          width: isFormSize ? '100%' : 'auto',
          minWidth: isFormSize ? '100%' : '58px',
          height: isFormSize ? '46px' : 'auto',
          padding: isFormSize ? '11px 16px' : '4px 10px',
          borderRadius: isFormSize ? '12px' : '6px',
          border: isFormSize ? '1.5px solid' : '1px solid',
          borderColor: isOpen ? 'var(--brand-blue, #1833fe)' : '#CBD5E1',
          backgroundColor: isFormSize ? '#F8FAFC' : '#FFFFFF',
          fontSize: isFormSize ? '0.9rem' : '0.775rem',
          fontWeight: isFormSize ? 500 : 700,
          color: '#0F172A',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen
            ? '0 0 0 3px rgba(24, 51, 254, 0.1)'
            : '0 1px 2px rgba(0, 0, 0, 0.02)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          ...buttonStyle,
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedOption ? (selectedOption.label ?? selectedOption.value) : placeholder ?? value}
        </span>
        <svg
          width={isFormSize ? '14' : '10'}
          height={isFormSize ? '14' : '10'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            color: '#64748B',
            transform: isOpen
              ? direction === 'up'
                ? 'rotate(0deg)'
                : 'rotate(180deg)'
              : direction === 'up'
              ? 'rotate(180deg)'
              : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Flyout Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            zIndex: 50,
            width: isFormSize ? '100%' : 'max-content',
            minWidth: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: isFormSize ? '14px' : '8px',
            border: isFormSize ? '1.5px solid #E2E8F0' : '1px solid #E2E8F0',
            boxShadow: isFormSize
              ? '0 12px 30px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0,0,0,0.03)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
            padding: isFormSize ? '6px' : '4px',
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease-out',
            maxHeight: '260px',
            overflowY: 'auto',
            ...(direction === 'up'
              ? { bottom: 'calc(100% + 5px)' }
              : { top: 'calc(100% + 5px)' }),
          }}
        >
          {formattedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: isFormSize ? '10px 14px' : '6px 10px',
                  borderRadius: isFormSize ? '8px' : '5px',
                  border: 'none',
                  backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                  color: isSelected ? 'var(--brand-blue, #1833fe)' : '#334155',
                  fontSize: isFormSize ? '0.875rem' : '0.775rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.12s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) (e.currentTarget.style.backgroundColor = '#F8FAFC');
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) (e.currentTarget.style.backgroundColor = 'transparent');
                }}
              >
                <span>{opt.label ?? opt.value}</span>
                {isSelected && (
                  <svg
                    width={isFormSize ? '14' : '12'}
                    height={isFormSize ? '14' : '12'}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--brand-blue, #1833fe)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
