'use client';

import React from 'react';
import SafeImage from '@/app/common/SafeImage';
import { AboutProcessSection } from '@/backend/services/about/about.types';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';

interface OurProcessProps {
  process?: AboutProcessSection;
}

export default function OurProcess({ process = DEFAULT_ABOUT_CONTENT.process }: OurProcessProps) {
  const steps = process.steps && process.steps.length > 0 ? process.steps : DEFAULT_ABOUT_CONTENT.process.steps;
  const classes = ['one', 'two', 'three', 'four', 'five'];

  return (
    <>
      <section className="rt-process-v1" style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
            <div data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdeb" className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">{process.subBadgeText || 'our process'}</div>
            </div>
            <h2 data-w-id="693eb16e-3bc6-8021-f4ba-24ac39d3bdee" className="rt-gap-off rt-desktop-text-center">
              {process.heading || 'Deliver projects on time through'}{' '}
              <span className="rt-color-periwinkle-gray">{process.headingHighlight || 'streamlined execution'}</span>
            </h2>
          </div>

          <div className="rt-process-main rt-position-relative">
            {/* Step tabs */}
            <div className="rt-process-wrapper">
              {steps.map((step, idx) => {
                const cls = classes[idx % classes.length];
                return (
                  <div key={step.id || idx} className="rt-process-item">
                    <div className="rt-process-text">
                      <div>{step.label || `Step ${idx + 1}`}</div>
                    </div>
                    <div className="rt-process-item-line-main">
                      <div className={`rt-process-item-line ${cls}`}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Process detail boxes */}
            <div className="rt-process-item-overlay rt-overflow-hidden">
              {steps.map((step, idx) => {
                // Card 1 (orange) & Card 3 (blue) have dark/vibrant backgrounds with white text. Card 2 (light lavender) has dark navy text.
                const isDarkCard = idx !== 1;
                return (
                  <div key={step.id || idx} className={`rt-process-box rt-${idx + 1}`}>
                    <div className="rt-icon-no" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SafeImage
                        src={step.icon}
                        loading="lazy"
                        alt={step.stepTitle}
                        width={44}
                        height={44}
                        style={{ width: '44px', height: '44px', objectFit: 'contain' }}
                      />
                    </div>
                    <div className="rt-process-text-gap">
                      <div
                        className={`rt-text-style-h6 ${isDarkCard ? 'rt-text-color-white' : ''}`}
                        style={!isDarkCard ? { color: 'var(--dark-indigo, #1a0b54)', fontWeight: 800 } : undefined}
                      >
                        {step.stepTitle}
                      </div>
                      <p
                        className={`rt-gap-off ${isDarkCard ? 'rt-text-color-white' : ''}`}
                        style={!isDarkCard ? { color: '#334155', fontWeight: 500 } : undefined}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
