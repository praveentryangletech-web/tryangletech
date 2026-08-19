"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
  showShimmer?: boolean;
}

export default function SafeImage({
  src,
  fallbackSrc = '/portfolio/vh-accounting.webp',
  alt,
  unoptimized = true,
  showShimmer = true,
  style,
  className,
  ...props
}: SafeImageProps) {
  const initial = src || fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(initial);
  const [triedApiMedia, setTriedApiMedia] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setTriedApiMedia(false);
    setIsLoaded(false);
  }, [src, fallbackSrc]);

  return (
    <>
      <style>{`
        @keyframes safeImgShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      {showShimmer && !isLoaded && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #F1F5F9 0%, #E2E8F0 25%, #FFFFFF 50%, #E2E8F0 75%, #F1F5F9 100%)',
            backgroundSize: '200% 100%',
            animation: 'safeImgShimmer 1.5s infinite linear',
            borderRadius: 'inherit',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}
      <Image
        {...props}
        src={imgSrc || fallbackSrc}
        alt={alt || ''}
        unoptimized={unoptimized}
        className={className}
        onLoad={() => setIsLoaded(true)}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
        onError={() => {
          if (imgSrc && !triedApiMedia && !imgSrc.startsWith('/api/media/')) {
            const clean = imgSrc.split('?')[0];
            const filename = clean.split('/').pop();
            if (filename) {
              setTriedApiMedia(true);
              setImgSrc(`/api/media/${encodeURIComponent(filename)}`);
              return;
            }
          }
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
          setIsLoaded(true);
        }}
      />
    </>
  );
}
