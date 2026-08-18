'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({
  text,
  children,
  position = 'top',
  delay = 60,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = rect.top - 6;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + 6;
        left = rect.left + rect.width / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - 6;
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + 6;
        break;
    }

    setCoords({ top, left });
  };

  const show = () => {
    updatePosition();
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const getTransform = () => {
    switch (position) {
      case 'top':
        return 'translate(-50%, -100%)';
      case 'bottom':
        return 'translate(-50%, 0)';
      case 'left':
        return 'translate(-100%, -50%)';
      case 'right':
        return 'translate(0, -50%)';
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: 'inline-flex', alignItems: 'center' }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </div>

      {mounted &&
        isVisible &&
        text &&
        createPortal(
          <div
            role="tooltip"
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              transform: getTransform(),
              zIndex: 9999999,
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              fontSize: '0.725rem',
              fontWeight: 600,
              padding: '5px 10px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
              letterSpacing: '0.02em',
              lineHeight: 1.2,
              animation: 'tooltipFadeIn 0.12s cubic-bezier(0, 0, 0.2, 1)',
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
}
