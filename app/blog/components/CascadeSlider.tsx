"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function CascadeSlider({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length;

  const nextSlide = useCallback(() => setCurrentIndex((prev) => (prev + 1) % length), [length]);
  const prevSlide = useCallback(() => setCurrentIndex((prev) => (prev - 1 + length) % length), [length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden group mb-10">
      {images.map((src, i) => {
        let position = "hidden";
        let zIndex = 0;
        let transform = "translateX(0) scale(0.8)";
        let opacity = 0;

        const diff = (i - currentIndex + length) % length;

        if (diff === 0) {
          position = "active";
          zIndex = 30;
          transform = "translateX(0) scale(1)";
          opacity = 1;
        } else if (diff === 1 || diff === -(length - 1)) {
          position = "next";
          zIndex = 20;
          transform = "translateX(35%) scale(0.85)";
          opacity = 0.4;
        } else if (diff === length - 1 || diff === -1) {
          position = "prev";
          zIndex = 20;
          transform = "translateX(-35%) scale(0.85)";
          opacity = 0.4;
        } else {
          zIndex = 10;
          transform = diff > 1 && diff <= length / 2 ? "translateX(60%) scale(0.7)" : "translateX(-60%) scale(0.7)";
          opacity = 0;
        }

        return (
          <div
            key={i}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            style={{ zIndex, transform, opacity, pointerEvents: position === 'active' ? 'auto' : 'none' }}
            onClick={() => {
              if (position === "prev") prevSlide();
              if (position === "next") nextSlide();
            }}
          >
            <div className="relative w-[85%] md:w-[75%] max-w-[850px] h-[90%] md:h-[100%] rounded-3xl overflow-hidden border border-gray-200/60 bg-gray-50">
              <Image
                src={src}
                alt={`${title} - image ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 850px"
                priority={position === "active"}
              />
            </div>
          </div>
        );
      })}

      <button 
        onClick={prevSlide} 
        className="absolute left-4 md:left-8 z-40 p-3.5 bg-white/30 hover:bg-white/90 backdrop-blur-md rounded-full text-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/40" 
        aria-label="Previous image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-4 md:right-8 z-40 p-3.5 bg-white/30 hover:bg-white/90 backdrop-blur-md rounded-full text-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/40" 
        aria-label="Next image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="absolute bottom-4 z-40 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === currentIndex ? 'w-8 bg-[#1833fe]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
