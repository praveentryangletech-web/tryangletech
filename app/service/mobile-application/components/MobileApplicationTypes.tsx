'use client';

import React from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';

export default function MobileApplicationTypes() {
  return (
    <section className="rt-benefits rt-overflow-hidden pt-16 pb-16" style={{ overflow: "hidden" }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        {/* Section Header */}
        <div className="rt-tools-iconheading rt-heading-bottom-gap">
          <div
            data-w-id="fdd1b4a0-f1c5-9612-358c-d33a132774a7"
            className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">mobile app types</div>
          </div>
          <div className="rt-heading-para-gap" style={{ marginTop: "0.6rem" }}>
            <ScrollTextReveal
              text="Unveiling the Variety in Mobile App Types We Build"
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
            From high-performance native iOS &amp; Android flagships to cross-platform frameworks, enterprise workflows, and e-commerce apps.
          </p>
        </div>

        {/* Benefits Style Cards Grid (Identical to Website Types Component) */}
        <div
          data-w-id="fa309af7-4c74-82d9-d77a-6bc987988f62"
          className="rt-benefits-wrapper">
          {/* Top Row: 3 Cards */}
          <div className="w-layout-grid rt-benefits-content-one">
            {/* Card 1: Native iOS & Android Apps */}
            <div
              data-w-id="2c971d5c-ac96-ff1c-d7cf-032f3df14684"
              className="rt-benefits-item">
              <div
                data-w-id="b11a6bba-0fb6-b2a9-72b2-ecde0332d0e1"
                className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src="/Home2_files/6912f62c82b64389f32cf4f2_taskopia-benefits-home-two-1.webp"
                  loading="lazy"
                  alt="Native iOS & Android Apps"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rt-benefits-small-image rt-1">
                  <Image
                    src="/Home2_files/6912f62cac10df5f2a6eba6b_Group 2085663570.webp"
                    loading="lazy"
                    alt="iOS and Android performance badge"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">Native iOS &amp; Android Apps</div>
                <p>
                  High-performance platform-exclusive apps engineered in Swift and Kotlin for maximum frame rates, 120Hz fluid animations, and deep device hardware integration.
                </p>
              </div>
            </div>

            {/* Card 2: Cross-Platform Mobile Apps */}
            <div
              data-w-id="71d233e7-17e3-e29f-6260-499af23458fb"
              className="rt-benefits-item">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src="/Home2_files/6912f62c1b2810c6c1ca5837_taskopia-benefits-home-two-2.webp"
                  loading="lazy"
                  alt="Cross-Platform Mobile Apps"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rt-benefits-small-image rt-2">
                  <Image
                    src="/Home2_files/6912f62c37804ce44caffa0e_Group 2085663152.webp"
                    loading="lazy"
                    alt="Cross-platform sync badge"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">Cross-Platform Mobile Apps</div>
                <p>
                  Single-codebase efficiency with Flutter and React Native, delivering native-grade responsiveness across both iOS and Android with reduced time-to-market.
                </p>
              </div>
            </div>

            {/* Card 3: E-Commerce & On-Demand Apps */}
            <div
              data-w-id="c5ff7e0a-813a-bab5-0c99-87ff995a45e8"
              className="rt-benefits-item">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden">
                <Image
                  src="/Home2_files/6912f62ced71f28b5ad5a83d_taskopia-benefits-home-two-3.webp"
                  loading="lazy"
                  alt="E-Commerce & On-Demand Apps"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">E-Commerce &amp; On-Demand Apps</div>
                <p>
                  Frictionless shopping and delivery experiences with 1-tap Apple Pay and Google Pay checkouts, live GPS order tracking, and push engagement.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Wide Cards */}
          <div
            data-w-id="aa7bae47-4e38-6bed-00a4-c7402dde4e24"
            className="w-layout-grid rt-benefits-content-two">
            {/* Card 4: Enterprise & Field Operations Apps */}
            <div className="rt-benefits-item rt-bottom">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden rt-position-relative">
                <Image
                  src="/Home2_files/6912f62c90ad4e05a87a0932_taskopia-benefits-home-two-4.webp"
                  loading="lazy"
                  alt="Enterprise & Business Apps"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rt-benefits-small-image rt-3">
                  <Image
                    src="/Home2_files/6912f62c4093ef3c309029b2_Group 2085663571.webp"
                    loading="lazy"
                    alt="Enterprise security badge"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">Enterprise &amp; Field Operations Apps</div>
                <p>
                  Mission-critical mobile solutions for enterprise field teams, CRM/ERP workflows, offline-first data synchronization, biometric authentication, and role-based security access.
                </p>
              </div>
            </div>

            {/* Card 5: AI & Workflow Automation Apps */}
            <div className="rt-benefits-item rt-bottom">
              <div className="rt-blorder-color rt-border-radius-medium rt-overflow-hidden">
                <Image
                  src="/Home2_files/6912f62d672935141c7f8c81_taskopia-benefits-home-two-5.webp"
                  loading="lazy"
                  alt="AI & Workflow Automation Apps"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="rt-benefits-item-text">
                <div className="rt-text-style-h6 rt-text-gradient">AI &amp; Workflow Automation Apps</div>
                <p>
                  Smart mobile applications engineered to eliminate repetitive manual work with camera OCR scanning, automated data entry, intelligent task routing, and autonomous AI assistants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
