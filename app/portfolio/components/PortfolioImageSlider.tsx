"use client";

import React, { useState, useEffect } from 'react';
import SafeImage from '@/app/common/SafeImage';

interface PortfolioImageSliderProps {
  images: string[];
  title: string;
  coverImage?: string;
  coverAlt?: string;
  imageAlts?: string[];
}

export default function PortfolioImageSlider({ images, title, coverImage, coverAlt, imageAlts }: PortfolioImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallback = (coverImage && coverImage.trim()) || '/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png';

  const validImages = images && images.length > 0 ? images.filter(img => img && typeof img === 'string' && img.trim()) : [];
  const displayImages = validImages.length > 0 ? validImages : [fallback];

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? displayImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === displayImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    if (displayImages.length <= 1) return;
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, displayImages.length]);

  const currentSrc = displayImages[currentIndex] || fallback;
  const currentAlt = (imageAlts && imageAlts[currentIndex] && imageAlts[currentIndex].trim())
    || (currentIndex === 0 && coverAlt && coverAlt.trim())
    || (coverAlt && coverAlt.trim())
    || `${title} - slide ${currentIndex + 1}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
      <SafeImage
        key={currentIndex}
        src={currentSrc}
        fallbackSrc="/blog-assets/69033374f7bdbaecce80e7c9_blog-two-I.png"
        loading="lazy"
        alt={currentAlt}
        className="rt-image-scale"
        style={{ width: '100%', height: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '16px', animation: 'fadeInSlider 0.5s ease-in-out', backgroundColor: 'transparent' }}
        width={800}
        height={800}
        unoptimized
      />
      
      {displayImages.length > 1 && (
        <>
          {/* Left Arrow */}
          <button 
            onClick={goToPrevious} 
            style={{ 
              position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', 
              backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', 
              width: '40px', height: '40px', cursor: 'pointer', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 10, color: '#1a0b54', fontSize: '20px', fontWeight: 'bold', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'; }}
            aria-label="Previous image"
          >
            &#10094;
          </button>

          {/* Right Arrow */}
          <button 
            onClick={goToNext} 
            style={{ 
              position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', 
              backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', 
              width: '40px', height: '40px', cursor: 'pointer', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 10, color: '#1a0b54', fontSize: '20px', fontWeight: 'bold', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.backgroundColor = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'; }}
            aria-label="Next image"
          >
            &#10095;
          </button>

          {/* Dots Indicator */}
          <div style={{ position: 'absolute', bottom: '15px', display: 'flex', gap: '8px', zIndex: 10 }}>
            {displayImages.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => goToSlide(dotIndex)}
                style={{
                  width: currentIndex === dotIndex ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentIndex === dotIndex ? 'var(--brand-blue, #1833fe)' : 'rgba(24, 51, 254, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
