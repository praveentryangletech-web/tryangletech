'use client';
import React from 'react';
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { CustomSoftwareStatsSection } from '@/backend/services/services/services.types';

interface CustomSoftwareAIAgentsProps {
  data?: CustomSoftwareStatsSection;
}

export default function CustomSoftwareAIAgents({ data }: CustomSoftwareAIAgentsProps) {
  const subBadgeText = data?.subBadgeText || 'our numbers';
  const headline = data?.headline || 'Businesses across India trust us to build software that actually works';
  const items = data?.items || [];

  const lineClasses = ['rt-one', 'rt-two', 'rt-three', 'rt-line'];
  const cardClasses = ['rt-one', 'rt-two', 'rt-three', 'rt-four'];

  return (
    <section className="rt-ai-agents-v1 rt-overflow-hidden">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-simplified-top rt-desktop-text-center">
          <div data-w-id="d34d7029-6b0e-655f-892b-4c57bb0aa55d" className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">{subBadgeText}</div>
          </div>
          <ScrollTextReveal
            text={headline}
            align="center"
          />
        </div>
        <div data-w-id="815f59ed-ca55-1d01-2fde-6345deaaa739" className="w-layout-grid rt-ai-agents-v1-card-main rt-position-relative rt-overflow-hidden">
          {items.map((item, idx) => {
            const cardClass = cardClasses[idx % cardClasses.length];
            const lineClass = lineClasses[idx % lineClasses.length];
            return (
              <div
                key={item.id || idx}
                data-w-id={`stat-card-${idx}`}
                className={`w-layout-vflex rt-ai-agents-v1card rt-position-relative ${cardClass}`}
              >
                <div className="rt-text-style-h1 rt-color-vivid-blue">{item.value}</div>
                <div className="w-layout-hflex rt-ai-agents-text-wrap">
                  <div className="rt-text-style-h6">{item.label}</div>
                </div>
                <div data-w-id={`stat-line-${idx}`} className={`rt-vision-card-box-line ${lineClass}`}></div>
              </div>
            );
          })}
          <div className="rt-vision-card-line rt-landscape-display-none"></div>
        </div>
      </div>
    </section>
  );
}
