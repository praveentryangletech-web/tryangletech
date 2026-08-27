'use client';

import React, { useEffect, useRef } from 'react';
import { ServiceToolsSection } from '@/backend/services/services/services.types';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';

interface ServiceToolsIntegrationProps {
  tools?: ServiceToolsSection;
}

export default function ServiceToolsIntegration({ tools: propTools }: ServiceToolsIntegrationProps) {
  const tools = propTools || DEFAULT_SERVICE_MAIN_CONTENT.tools;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toolList = tools.tools && tools.tools.length > 0 ? tools.tools : DEFAULT_SERVICE_MAIN_CONTENT.tools.tools;
  const topRow = toolList.slice(0, 7);
  const bottomRow = toolList.slice(7);

  return (
    <section className="rt-tools-icon-v1" ref={sectionRef}>
      <style>{`
        .rt-integration-top > div:nth-child(1) .reveal-on-scroll { transition-delay: 0.1s; }
        .rt-integration-top > div:nth-child(2) .reveal-on-scroll { transition-delay: 0.2s; }
        .rt-integration-top > div:nth-child(3) .reveal-on-scroll { transition-delay: 0.3s; }
        .rt-integration-top > div:nth-child(4) .reveal-on-scroll { transition-delay: 0.4s; }
        .rt-integration-top > div:nth-child(5) .reveal-on-scroll { transition-delay: 0.5s; }
        .rt-integration-top > div:nth-child(6) .reveal-on-scroll { transition-delay: 0.6s; }
        .rt-integration-top > div:nth-child(7) .reveal-on-scroll { transition-delay: 0.7s; }

        .rt-tools-icon-main {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
      <div className="w-layout-blockcontainer rt-container-extra-large w-container mt-[5rem]">
        <div className="rt-tools-icon-main rt-overflow-hidden rt-position-relative">
          <div className="rt-tools-icon-container rt-change">
            <div
              data-w-id="94ab69a2-10a8-48fd-4bee-648edaa97316"
              className="rt-tools-iconheading rt-heading-bottom-gap reveal-on-scroll"
            >
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">
                  {tools.subBadgeText || 'integration'}
                </div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                {tools.heading || 'Streamline workflows, save time,'}{' '}
                <span className="rt-color-periwinkle-gray">
                  {tools.headingHighlight || 'enhance performance'}
                </span>
              </h2>
            </div>
            <div className="w-layout-vflex rt-integration-main-v2 rt-margin-auto">
              <div className="rt-integration-top">
                {topRow.map((item, idx) => (
                  <div key={item.id || idx}>
                    <img
                      alt={item.iconAlt || item.name}
                      src={item.icon}
                      loading="lazy"
                      className={`rt-itegration-logo reveal-on-scroll ${idx === topRow.length - 1 ? 'rt-last' : ''}`}
                      style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
              </div>
              {bottomRow.length > 0 && (
                <div className="rt-integration-top rt-bottom">
                  {bottomRow.map((item, idx) => (
                    <div key={item.id || idx}>
                      <img
                        alt={item.iconAlt || item.name}
                        src={item.icon}
                        loading="lazy"
                        className="rt-itegration-logo reveal-on-scroll"
                        style={{ width: '129px', height: '132px', objectFit: 'contain', padding: '25px', boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
