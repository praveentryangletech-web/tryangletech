'use client';

import React from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { WebDevTypesSection } from '@/backend/services/services/services.types';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';

export default function WebDevTypes({ data }: { data?: WebDevTypesSection }) {
  const typesData = data || DEFAULT_WEB_DEV_CONTENT.types;
  const cards = typesData.cards || DEFAULT_WEB_DEV_CONTENT.types.cards;

  const card1 = cards[0] || DEFAULT_WEB_DEV_CONTENT.types.cards[0];
  const card2 = cards[1] || DEFAULT_WEB_DEV_CONTENT.types.cards[1];
  const card3 = cards[2] || DEFAULT_WEB_DEV_CONTENT.types.cards[2];
  const card4 = cards[3] || DEFAULT_WEB_DEV_CONTENT.types.cards[3];
  const card5 = cards[4] || DEFAULT_WEB_DEV_CONTENT.types.cards[4];

  return (
    <section className="rt-benefits rt-overflow-hidden pt-16 pb-16" style={{ overflow: "hidden" }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-heading-bottom-gap">
          <div
            data-w-id="fdd1b4a0-f1c5-9612-358c-d33a132774a7"
            className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">{typesData.subBadgeText || 'website types'}</div>
          </div>
          <div className="rt-heading-para-gap" style={{ marginTop: "0.6rem" }}>
            <ScrollTextReveal
              text={typesData.heading || 'Unveiling the Variety in Website Types We Build'}
              align="center"
              className="rt-gap-off rt-desktop-text-center"
            />
          </div>
          <p
            className="rt-gap-off rt-desktop-text-center"
            style={{
              maxWidth: "680px",
              margin: "12px auto 0 auto",
              color: "#64748b",
              fontSize: "15px",
              lineHeight: "1.6",
            }}>
            From high-conversion landing pages to full-scale corporate platforms, custom web portals, and e-commerce stores, we engineer digital solutions tailored to your business goals.
          </p>
        </div>

        {/* Benefits Style Cards Grid */}
        <div
          data-w-id="fa309af7-4c74-82d9-d77a-6bc987988f62"
          className="rt-benefits-wrapper">
          {/* Top Row: 3 Cards */}
          <div className="w-layout-grid rt-benefits-content-one">
            {/* Card 1: Business & Corporate */}
            <div
              data-w-id="2c971d5c-ac96-ff1c-d7cf-032f3df14684"
              className="rt-benefits-item">
              <div
                data-w-id="b11a6bba-0fb6-b2a9-72b2-ecde0332d0e1"
                className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src={card1.image || "/Home2_files/6912f62c82b64389f32cf4f2_taskopia-benefits-home-two-1.webp"}
                  loading="lazy"
                  alt={card1.imageAlt || card1.title || "Business & Corporate Websites"}
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rt-benefits-small-image rt-1">
                  <Image
                    src={card1.smallImage || "/Home2_files/6912f62cac10df5f2a6eba6b_Group 2085663570.webp"}
                    loading="lazy"
                    alt={card1.smallImageAlt || "Corporate analytics badge"}
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">{card1.title}</div>
                <p>
                  {card1.desc}
                </p>
              </div>
            </div>

            {/* Card 2: E-Commerce */}
            <div
              data-w-id="71d233e7-17e3-e29f-6260-499af23458fb"
              className="rt-benefits-item">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src={card2.image || "/Home2_files/6912f62c1b2810c6c1ca5837_taskopia-benefits-home-two-2.webp"}
                  loading="lazy"
                  alt={card2.imageAlt || card2.title || "E-Commerce Websites"}
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rt-benefits-small-image rt-2">
                  <Image
                    src={card2.smallImage || "/Home2_files/6912f62c4093ef3c309029b2_Group 2085663571.webp"}
                    loading="lazy"
                    alt={card2.smallImageAlt || "E-commerce sales conversion metric badge"}
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">{card2.title}</div>
                <p>
                  {card2.desc}
                </p>
              </div>
            </div>

            {/* Card 3: Landing Pages */}
            <div
              data-w-id="c5ff7e0a-813a-bab5-0c99-87ff995a45e8"
              className="rt-benefits-item">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src={card3.image || "/Home2_files/6912f62ced71f28b5ad5a83d_taskopia-benefits-home-two-3.webp"}
                  loading="lazy"
                  alt={card3.imageAlt || card3.title || "Landing Page Websites"}
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                {card3.smallImage && (
                  <div className="rt-benefits-small-image rt-1">
                    <Image
                      src={card3.smallImage}
                      loading="lazy"
                      alt={card3.smallImageAlt || "Landing page metric badge"}
                      width={800}
                      height={800}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">{card3.title}</div>
                <p>
                  {card3.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Wide Cards */}
          <div
            data-w-id="aa7bae47-4e38-6bed-00a4-c7402dde4e24"
            className="w-layout-grid rt-benefits-content-two">
            {/* Card 4: SaaS & Web Apps */}
            <div className="rt-benefits-item rt-bottom">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src={card4.image || "/Home2_files/6912f62c90ad4e05a87a0932_taskopia-benefits-home-two-4.webp"}
                  loading="lazy"
                  alt={card4.imageAlt || card4.title || "SaaS & Custom Web Applications"}
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                {card4.smallImage ? (
                  <div className="rt-benefits-small-image rt-3">
                    <Image
                      src={card4.smallImage}
                      loading="lazy"
                      alt={card4.smallImageAlt || "Web app metrics badge"}
                      width={800}
                      height={800}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                ) : (
                  <div className="rt-benefits-small-image rt-3">
                    <Image
                      src="/Home2_files/6912f62c37804ce44caffa0e_Group 2085663152.webp"
                      loading="lazy"
                      alt={card4.smallImageAlt || "Web app metrics badge"}
                      width={800}
                      height={800}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">{card4.title}</div>
                <p>
                  {card4.desc}
                </p>
              </div>
            </div>

            {/* Card 5: Personal Websites & Blogs */}
            <div className="rt-benefits-item rt-bottom">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src={card5.image || "/Home2_files/6912f62d672935141c7f8c81_taskopia-benefits-home-two-5.webp"}
                  loading="lazy"
                  alt={card5.imageAlt || card5.title || "Personal Websites & Blogs"}
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                {card5.smallImage && (
                  <div className="rt-benefits-small-image rt-1">
                    <Image
                      src={card5.smallImage}
                      loading="lazy"
                      alt={card5.smallImageAlt || "Personal brand badge"}
                      width={800}
                      height={800}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">{card5.title}</div>
                <p>
                  {card5.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

