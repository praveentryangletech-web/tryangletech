'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LocationRegion } from '@/backend/services/geo/geo.types';
import { CitySearchResult } from '@/app/api/geo/cities/route';

interface CitySearchSelectProps {
  value: string;
  onChange: (city: string) => void;
  onSelectCity?: (cityData: CitySearchResult) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  helperText?: string;
  disabled?: boolean;
}

const REGION_COLORS: Record<LocationRegion, { bg: string; text: string; border: string }> = {
  Gujarat: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
  'India Metros': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  'Middle East': { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
  'USA & Canada': { bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' },
  'Europe & UK': { bg: '#EEF2FF', text: '#4338CA', border: '#C7D2FE' },
  'Global Hubs': { bg: '#F0FDFA', text: '#0F766E', border: '#99F6E4' },
};

const POPULAR_CHIPS = ['Ahmedabad', 'Surat', 'Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Varanasi', 'Dubai', 'London', 'New York'];

export default function CitySearchSelect({
  value,
  onChange,
  onSelectCity,
  placeholder = 'Search city (e.g. Varanasi, Mumbai, Dubai, London)...',
  required = false,
  label,
  helperText,
  disabled = false,
}: CitySearchSelectProps) {
  const [inputValue, setInputValue] = useState(value || '');
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch search suggestions
  const fetchCities = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/geo/cities?q=${encodeURIComponent(query.trim())}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setResults(json.data);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);
    setHighlightedIndex(-1);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!val.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchCities(val);
      setIsOpen(true);
    }, 220);
  };

  const handleSelect = (cityItem: CitySearchResult) => {
    setInputValue(cityItem.city);
    onChange(cityItem.city);
    setIsOpen(false);
    setResults([]);
    if (onSelectCity) {
      onSelectCity(cityItem);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'ArrowDown' && inputValue.trim()) {
        fetchCities(inputValue);
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < results.length) {
        e.preventDefault();
        handleSelect(results[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleQuickChipClick = (cityName: string) => {
    setInputValue(cityName);
    onChange(cityName);
    fetchCities(cityName).then(() => {
      setIsOpen(true);
    });
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {label && (
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#334155',
            marginBottom: '5px',
          }}
        >
          <span>{label}</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#1833FE', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Global Search
          </span>
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Search Icon */}
        <span
          style={{
            position: 'absolute',
            left: '12px',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        {/* City Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (inputValue.trim()) {
              if (results.length === 0) fetchCities(inputValue);
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete="off"
          style={{
            width: '100%',
            padding: '0.65rem 2.4rem 0.65rem 2.2rem',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            backgroundColor: disabled ? '#F8FAFC' : '#FFFFFF',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#0F172A',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
        />

        {/* Right actions: Loading spinner or Clear button */}
        <div style={{ position: 'absolute', right: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isLoading && (
            <span
              style={{
                width: '14px',
                height: '14px',
                border: '2px solid #E2E8F0',
                borderTopColor: '#1833FE',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
                display: 'inline-block',
              }}
            />
          )}

          {inputValue && !isLoading && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear input"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {helperText && (
        <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
          {helperText}
        </span>
      )}

      {/* Quick Suggestion Chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4px',
          marginTop: '6px',
        }}
      >
        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94A3B8', marginRight: '2px' }}>
          Quick:
        </span>
        {POPULAR_CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => handleQuickChipClick(c)}
            style={{
              padding: '2px 7px',
              borderRadius: '5px',
              fontSize: '0.7rem',
              fontWeight: 600,
              backgroundColor: inputValue.toLowerCase() === c.toLowerCase() ? '#EFF6FF' : '#F1F5F9',
              color: inputValue.toLowerCase() === c.toLowerCase() ? '#1833FE' : '#475569',
              border: inputValue.toLowerCase() === c.toLowerCase() ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.15), 0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #E2E8F0',
            maxHeight: '270px',
            overflowY: 'auto',
            zIndex: 99999,
            padding: '6px',
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8' }}>
              {isLoading ? 'Searching global cities...' : `No matching cities found. You can still use "${inputValue}".`}
            </div>
          ) : (
            results.map((item, index) => {
              const isHighlighted = index === highlightedIndex;
              const regionStyle = REGION_COLORS[item.region] || REGION_COLORS['Global Hubs'];

              return (
                <div
                  key={`${item.city}-${item.state}-${item.country}-${index}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: isHighlighted ? '#EFF6FF' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    transition: 'background-color 0.1s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: '#F1F5F9',
                        color: '#64748B',
                        flexShrink: 0,
                      }}
                    >
                      🏙️
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--dark-indigo, #1a0b54)' }}>
                        {item.city}
                      </span>
                      <span
                        style={{
                          fontSize: '0.725rem',
                          color: '#64748B',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.state && item.state !== item.city ? `${item.state}, ` : ''}
                        {item.country}
                        {item.latitude && item.longitude ? ` • (${item.latitude.toFixed(2)}°, ${item.longitude.toFixed(2)}°)` : ''}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: regionStyle.bg,
                      color: regionStyle.text,
                      border: `1px solid ${regionStyle.border}`,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {item.region}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
