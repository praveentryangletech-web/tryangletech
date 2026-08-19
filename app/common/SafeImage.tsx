"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = '/portfolio/vh-accounting.webp',
  alt,
  unoptimized = true,
  ...props
}: SafeImageProps) {
  const initial = src || fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(initial);
  const [triedApiMedia, setTriedApiMedia] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setTriedApiMedia(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt || ''}
      unoptimized={unoptimized}
      onError={() => {
        if (imgSrc && imgSrc.startsWith('/portfolio/') && !triedApiMedia) {
          const filename = imgSrc.replace('/portfolio/', '');
          setTriedApiMedia(true);
          setImgSrc(`/api/media/${encodeURIComponent(filename)}`);
        } else if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
