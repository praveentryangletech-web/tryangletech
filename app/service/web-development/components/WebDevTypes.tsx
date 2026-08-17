'use client';

import React from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';

export default function WebDevTypes() {
  return (
    <section className="rt-benefits rt-overflow-hidden pt-16 pb-16" style={{ overflow: "hidden" }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-heading-bottom-gap">
          <div
            data-w-id="fdd1b4a0-f1c5-9612-358c-d33a132774a7"
            className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">website types</div>
          </div>
          <div className="rt-heading-para-gap" style={{ marginTop: "0.6rem" }}>
            <ScrollTextReveal
              text="Unveiling the Variety in Website Types We Build"
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
                  src="/Home2_files/6912f62c82b64389f32cf4f2_taskopia-benefits-home-two-1.webp"
                  loading="lazy"
                  alt="Business & Corporate Websites"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rt-benefits-small-image rt-1">
                  <Image
                    src="/Home2_files/6912f62cac10df5f2a6eba6b_Group 2085663570.webp"
                    loading="lazy"
                    alt="Corporate analytics badge"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6">Business &amp; Corporate Websites</div>
                <p>
                  Comprehensive web presences engineered for companies that establish market authority, showcase capabilities, and capture commercial leads.
                </p>
              </div>
            </div>

            {/* Card 2: E-Commerce */}
            <div
              data-w-id="71d233e7-17e3-e29f-6260-499af23458fb"
              className="rt-benefits-item">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src="/Home2_files/6912f62c1b2810c6c1ca5837_taskopia-benefits-home-two-2.webp"
                  loading="lazy"
                  alt="E-Commerce Websites"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rt-benefits-small-image rt-2">
                  <Image
                    src="/Home2_files/6912f62c37804ce44caffa0e_Group 2085663152.webp"
                    loading="lazy"
                    alt="E-commerce completed orders"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6">E-Commerce &amp; Online Stores</div>
                <p>
                  Scalable digital storefronts with frictionless product catalogs, 1-click checkout, automated inventory sync, and multi-currency payments.
                </p>
              </div>
            </div>

            {/* Card 3: Landing Pages */}
            <div
              data-w-id="c5ff7e0a-813a-bab5-0c99-87ff995a45e8"
              className="rt-benefits-item">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden">
                <Image
                  src="/Home2_files/6912f62ced71f28b5ad5a83d_taskopia-benefits-home-two-3.webp"
                  loading="lazy"
                  alt="Landing Page Websites"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6">Landing Pages &amp; Funnels</div>
                <p>
                  High-impact, single-purpose web pages engineered to promote specific products or marketing campaigns with maximum conversion rates.
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
                  src="/Home2_files/6912f62c90ad4e05a87a0932_taskopia-benefits-home-two-4.webp"
                  loading="lazy"
                  alt="SaaS & Custom Web Applications"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rt-benefits-small-image rt-3">
                  <Image
                    src="/Home2_files/6912f62c4093ef3c309029b2_Group 2085663571.webp"
                    loading="lazy"
                    alt="Web app metrics badge"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6">SaaS Platforms &amp; Web Applications</div>
                <p>
                  Feature-rich cloud applications with real-time user authentication, interactive dashboards, database synchronization, and scalable API workflows.
                </p>
              </div>
            </div>

            {/* Card 5: Personal Websites & Blogs */}
            <div className="rt-benefits-item rt-bottom">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden">
                <Image
                  src="/Home2_files/6912f62d672935141c7f8c81_taskopia-benefits-home-two-5.webp"
                  loading="lazy"
                  alt="Personal Websites & Blogs"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6">Personal Websites &amp; Blogs</div>
                <p>
                  Personal branding platforms and content hubs where creators, consultants, and professionals share insights, publish articles, and build an audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
