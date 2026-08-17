'use client';

import React, { useState } from 'react';

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
  delay = 100,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const show = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hide = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-6px)',
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(6px)',
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(-6px)',
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(6px)',
        };
    }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {isVisible && text && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 99999,
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            fontSize: '0.725rem',
            fontWeight: 600,
            padding: '4px 9px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
            letterSpacing: '0.02em',
            animation: 'fadeInTooltip 0.15s ease-out',
            ...getPositionStyles(),
          }}
        >
          {text}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes fadeInTooltip {
                  from { opacity: 0; transform: scale(0.95) ${getPositionStyles().transform || ''}; }
                  to { opacity: 1; transform: scale(1) ${getPositionStyles().transform || ''}; }
                }
              `,
            }}
          />
        </div>
      )}
    </div>
  );
}
