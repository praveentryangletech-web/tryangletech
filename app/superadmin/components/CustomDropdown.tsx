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
}

/**
 * Custom Agency-Grade Dropdown Component
 * 
 * Replaces native OS <select> with a modern, branded flyout menu with:
 * - Click outside detection
 * - Upward / downward positioning
 * - Active checkmark indicator
 * - Smooth hover and focus states
 */
export default function CustomDropdown<T extends string | number>({
  value,
  options,
  onChange,
  direction = 'up',
  placeholder,
}: CustomDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          padding: '4px 10px',
          borderRadius: '6px',
          border: '1px solid',
          borderColor: isOpen ? 'var(--brand-blue, #1833fe)' : '#CBD5E1',
          backgroundColor: '#FFFFFF',
          fontSize: '0.775rem',
          fontWeight: 700,
          color: '#334155',
          cursor: 'pointer',
          boxShadow: isOpen ? '0 0 0 2px rgba(24, 51, 254, 0.12)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.15s ease',
          minWidth: '58px',
        }}
      >
        <span>{selectedOption ? (selectedOption.label ?? selectedOption.value) : placeholder ?? value}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            color: '#64748B',
            transform: isOpen ? (direction === 'up' ? 'rotate(0deg)' : 'rotate(180deg)') : (direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'),
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
            minWidth: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
            padding: '4px',
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease-out',
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
                  padding: '6px 10px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                  color: isSelected ? 'var(--brand-blue, #1833fe)' : '#334155',
                  fontSize: '0.775rem',
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
                    width="12"
                    height="12"
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
