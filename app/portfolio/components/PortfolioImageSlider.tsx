"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PortfolioImageSliderProps {
  images: string[];
  title: string;
}

export default function PortfolioImageSlider({ images, title }: PortfolioImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes fadeInSlider {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }
      `}</style>
      <Image
        key={currentIndex}
        src={images[currentIndex]}
        loading="lazy"
        alt={`${title} - image ${currentIndex + 1}`}
        className="rt-image-scale"
        style={{ width: '100%', height: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '16px', animation: 'fadeInSlider 0.5s ease-in-out' }}
        width={800} height={800} 
      />
      
      {images.length > 1 && (
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

          {/* Dots Container */}
          <div style={{ position: 'absolute', bottom: '15px', display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
            {images.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                style={{ 
                  width: '10px', height: '10px', borderRadius: '50%', cursor: 'pointer',
                  backgroundColor: currentIndex === slideIndex ? '#1833fe' : 'rgba(24,51,254,0.3)',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                  transform: currentIndex === slideIndex ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
