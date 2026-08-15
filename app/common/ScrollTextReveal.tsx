'use client';
import React, { useEffect, useRef, useState } from 'react';

interface ScrollTextRevealProps {
  as?: 'h1' | 'h2' | 'h3' | 'div';
  text: string;
  className?: string;
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
}

export default function ScrollTextReveal({
  as: Component = 'h2',
  text,
  className = 'rt-gap-off',
  style,
  align = 'left',
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start reveal when element enters 88% of screen height, complete by 38%
      const start = windowHeight * 0.88;
      const end = windowHeight * 0.38;
      const totalDist = start - end;
      const current = start - rect.top;
      const p = Math.min(Math.max(current / totalDist, 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      className={`rt-position-relative ${align === 'center' ? 'rt-desktop-text-center' : ''}`}
      style={{ width: '100%', textAlign: align }}>
      <Component className={className} style={{ ...style, margin: 0 }}>
        {words.map((word, idx) => {
          const wordStart = (idx / words.length) * 0.7;
          const wordEnd = wordStart + 0.3;
          const wordProgress = Math.min(Math.max((progress - wordStart) / (wordEnd - wordStart), 0), 1);

          return (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                marginRight: '0.28em',
                color: wordProgress > 0.45 ? '#0e0725' : '#94a3b8',
                transition: 'color 0.22s ease-out',
                willChange: 'color',
              }}>
              {word}
            </span>
          );
        })}
      </Component>
    </div>
  );
}
