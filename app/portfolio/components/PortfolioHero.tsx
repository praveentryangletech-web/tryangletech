"use client";
import React, { useEffect, useRef } from 'react';

export default function PortfolioHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .reveal-on-scroll.animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-hero-11-heading rt-desktop-text-center rt-heading-bottom-gap">
          <div className="rt-sub-gap reveal-on-scroll" style={{ justifyContent: 'center' }}>
            <div className="rt-sub-text rt-sub-gredient">OUR PORTFOLIO</div>
          </div>
          <h1 className="rt-gap-off reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            Explore our recent success stories
          </h1>
        </div>
      </div>
    </div>
  );
}
