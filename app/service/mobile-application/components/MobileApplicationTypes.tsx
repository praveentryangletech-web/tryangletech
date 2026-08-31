'use client';

import React from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { MobileAppTypesSection } from '@/backend/services/services/services.types';
import { DEFAULT_MOBILE_APP_CONTENT } from '@/backend/services/services/services.defaults';

interface MobileApplicationTypesProps {
  data?: MobileAppTypesSection;
}

export default function MobileApplicationTypes({ data }: MobileApplicationTypesProps) {
  const types = data || DEFAULT_MOBILE_APP_CONTENT.types;
  const cards = (types.cards && types.cards.length > 0 ? types.cards : DEFAULT_MOBILE_APP_CONTENT.types.cards) || [];


  const topRowCards = cards.slice(0, 3);
  const bottomRowCards = cards.slice(3, 5);

  return (
    <section className="rt-benefits rt-overflow-hidden pt-16 pb-16" style={{ overflow: "hidden" }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-heading-bottom-gap">
          <div
            data-w-id="fdd1b4a0-f1c5-9612-358c-d33a132774a7"
            className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">
              {types.subBadgeText || 'mobile app types'}
            </div>
          </div>
          <div className="rt-heading-para-gap" style={{ marginTop: "0.6rem" }}>
            <ScrollTextReveal
              text={types.heading || 'Unveiling the Variety in Mobile App Types We Build'}
              align="center"
              className="rt-gap-off rt-desktop-text-center"
            />
          </div>
          {types.description && (
            <p
              className="rt-gap-off rt-desktop-text-center"
              style={{
                maxWidth: "680px",
                margin: "12px auto 0 auto",
                color: "#64748b",
                fontSize: "15px",
                lineHeight: "1.6",
              }}>
              {types.description}
            </p>
          )}
        </div>

        {/* Benefits Style Cards Grid */}
        <div
          data-w-id="fa309af7-4c74-82d9-d77a-6bc987988f62"
          className="rt-benefits-wrapper">
          {/* Top Row: First 3 Cards */}
          <div className="w-layout-grid rt-benefits-content-one">
            {topRowCards.map((card, idx) => (
              <div
                key={card.id || `top-${idx}`}
                data-w-id={idx === 0 ? "2c971d5c-ac96-ff1c-d7cf-032f3df14684" : idx === 1 ? "71d233e7-17e3-e29f-6260-499af23458fb" : "c5ff7e0a-813a-bab5-0c99-87ff995a45e8"}
                className="rt-benefits-item">
                <div
                  className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                  <Image
                    src={card.image}
                    loading="lazy"
                    alt={card.imageAlt || card.title}
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                  {card.smallImage && (
                    <div className={`rt-benefits-small-image ${idx === 0 ? 'rt-1' : idx === 1 ? 'rt-2' : ''}`}>
                      <Image
                        src={card.smallImage}
                        loading="lazy"
                        alt={card.smallImageAlt || "Badge"}
                        width={800}
                        height={800}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  )}
                </div>
                <div className="rt-benefits-item-text">
                  <div className="rt-text-style-h6 rt-text-gradient">{card.title}</div>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: Next 2 Cards */}
          {bottomRowCards.length > 0 && (
            <div
              data-w-id="aa7bae47-4e38-6bed-00a4-c7402dde4e24"
              className="w-layout-grid rt-benefits-content-two">
              {bottomRowCards.map((card, idx) => (
                <div key={card.id || `bot-${idx}`} className="rt-benefits-item rt-bottom">
                  <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                    <Image
                      src={card.image}
                      loading="lazy"
                      alt={card.imageAlt || card.title}
                      width={800}
                      height={800}
                      style={{ width: "100%", height: "auto" }}
                    />
                    {card.smallImage && (
                      <div className="rt-benefits-small-image rt-3">
                        <Image
                          src={card.smallImage}
                          loading="lazy"
                          alt={card.smallImageAlt || "Badge"}
                          width={800}
                          height={800}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="rt-benefits-item-text">
                    <div className="rt-text-style-h6 rt-text-gradient">{card.title}</div>
                    <p>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
