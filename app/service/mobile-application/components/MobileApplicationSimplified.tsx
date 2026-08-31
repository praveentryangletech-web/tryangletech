'use client';

import React from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { MobileAppProcessSection } from '@/backend/services/services/services.types';
import { DEFAULT_MOBILE_APP_CONTENT } from '@/backend/services/services/services.defaults';

interface MobileApplicationSimplifiedProps {
  data?: MobileAppProcessSection;
}

export default function MobileApplicationSimplified({ data }: MobileApplicationSimplifiedProps) {
  const process = data || DEFAULT_MOBILE_APP_CONTENT.process;
  const cards = (process.cards && process.cards.length > 0 ? process.cards : DEFAULT_MOBILE_APP_CONTENT.process.cards) || [];


  return (
    <>
      <section className="rt-simplified" style={{ paddingBottom: "3.5rem" }}>
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-simplified-top rt-desktop-text-center rt-heading-bottom-gap">
            <div
              data-w-id="d32a2ace-49d2-24b0-6caf-89ca61419702"
              className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">
                {process.subBadgeText || 'development process'}
              </div>
            </div>
            <ScrollTextReveal
              text={process.heading || 'How we build your mobile app from start to finish'}
              align="center"
            />
          </div>
          <div className="w-layout-grid rt-simplified-wrapper">
            {cards.map((card, idx) => (
              <div
                key={card.id || idx}
                data-w-id={idx === 0 ? "06b87898-4f2c-d6fb-f75a-492f3e7822fe" : idx === 1 ? "210cc947-d79f-f5d0-ef5e-ac7987d3db20" : "210cc947-d79f-f5d0-ef5e-ac7987d3dad5"}
                className="w-layout-vflex rt-simplified-card">
                <div className="rt-simplified-card-top-part rt-border-radius-medium rt-shadow">
                  <Image
                    className="rt-image-scale"
                    src={card.image}
                    width={370}
                    height={209}
                    alt={card.imageAlt || card.title}
                    data-w-id={idx === 0 ? "06b87898-4f2c-d6fb-f75a-492f3e782300" : idx === 1 ? "210cc947-d79f-f5d0-ef5e-ac7987d3db22" : "31f55def-c002-725b-ac24-4fb3c902009b"}
                    loading="lazy"
                  />
                  {card.smallImage && (
                    <div
                      data-w-id="35a3418c-007f-e286-2fac-1448d7ccf163"
                      className="rt-simplified-card-top-innar">
                      <Image
                        src={card.smallImage}
                        loading="lazy"
                        data-w-id="bf832279-7882-71e9-77f0-dfcaa36b2a14"
                        alt={card.smallImageAlt || "Overlay graphic"}
                        className="rt-image-scale"
                        width={800} height={800} style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  )}
                </div>
                <div className={`w-layout-vflex rt-simplified-card-bottom-part ${idx === 1 ? 'rt-3' : idx === 2 ? 'rt-2' : ''}`}>
                  <div className="rt-text-style-h6">
                    {card.title}
                  </div>
                  <p className="rt-gap-off">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
