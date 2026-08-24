'use client';

import React from 'react';
import SafeImage from '@/app/common/SafeImage';
import { AboutWhyChooseUsSection } from '@/backend/services/about/about.types';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';

interface WhyChooseUsProps {
  whyChooseUs?: AboutWhyChooseUsSection;
}

export default function WhyChooseUs({ whyChooseUs = DEFAULT_ABOUT_CONTENT.whyChooseUs }: WhyChooseUsProps) {
  const items = whyChooseUs.items && whyChooseUs.items.length > 0
    ? whyChooseUs.items
    : DEFAULT_ABOUT_CONTENT.whyChooseUs.items;

  return (
    <>
      {/* ── WHY CHOOSE US ── */}
      <section className="rt-choose-v3">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-tools-iconheading rt-features-v1-top rt-heading-bottom-gap">
            <div className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">{whyChooseUs.subBadgeText || 'Why choose us'}</div>
            </div>
            <h2 className="rt-gap-off rt-desktop-text-center">
              {whyChooseUs.heading || 'Your trusted partner for digital'}{' '}
              <span className="rt-color-periwinkle-gray">{whyChooseUs.headingHighlight || 'growth and innovation'}</span>
            </h2>
          </div>

          <div data-w-id="7755f54e-a063-7fd1-4011-b0bcae52ff74" className="rt-choose-v3-wrap">
            {items.map((item, idx) => (
              <div key={item.id || idx} className="rt-choose-v3-item">
                <div className="rt-choose-v3-item-icon">
                  <SafeImage src={item.icon} loading="lazy" alt={item.title} width={800} height={800} style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className="rt-choose-v3-item-line"></div>
                <div className="rt-choose-v3-item-text-wrap">
                  <div className="rt-text-style-h6">{item.title}</div>
                  <p className="rt-gap-off">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
