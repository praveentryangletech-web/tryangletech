"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = '/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png';

export default function SafeImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  unoptimized = true,
  style,
  className,
  ...props
}: SafeImageProps) {
  const getCleanSrc = (s?: string | null, fb: string = DEFAULT_FALLBACK) => {
    if (!s || typeof s !== 'string' || !s.trim()) return fb;
    return s.trim();
  };

  const [imgSrc, setImgSrc] = useState<string>(() => getCleanSrc(src, fallbackSrc));
  const [triedApiMedia, setTriedApiMedia] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(getCleanSrc(src, fallbackSrc));
    setTriedApiMedia(false);
    setHasError(false);
    setIsLoaded(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : (imgSrc || fallbackSrc)}
      alt={alt || ''}
      unoptimized={unoptimized}
      className={className}
      onLoad={() => setIsLoaded(true)}
      style={{
        backgroundColor: isLoaded ? 'transparent' : '#F8FAFC',
        backgroundImage: !isLoaded
          ? 'linear-gradient(90deg, #F8FAFC 0%, #EEF2F6 25%, #FFFFFF 50%, #EEF2F6 75%, #F8FAFC 100%)'
          : 'none',
        backgroundSize: '200% 100%',
        animation: !isLoaded ? 'safeImgShimmer 1.8s infinite linear' : 'none',
        opacity: isLoaded ? 1 : 0.85,
        transition: 'opacity 0.3s ease-in-out',
        ...style,
      }}
      onError={() => {
        // 1. If static file doesn't exist on disk, check if it's stored in database /api/media/
        if (imgSrc && !triedApiMedia && !imgSrc.startsWith('/api/media/')) {
          const clean = imgSrc.split('?')[0];
          const filename = clean.split('/').pop();
          if (filename) {
            setTriedApiMedia(true);
            setImgSrc(`/api/media/${encodeURIComponent(filename)}`);
            return;
          }
        }

        // 2. Otherwise switch to fallback illustration
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
        setIsLoaded(true);
      }}
    />
  );
}
