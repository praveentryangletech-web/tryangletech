'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollTextReveal from "../../../common/ScrollTextReveal";
import { GraphicsDesigningAboutSection } from "@/backend/services/services/services.types";

interface GraphicsDesigningAboutProps {
  data?: GraphicsDesigningAboutSection;
}

export default function GraphicsDesigningAbout({ data }: GraphicsDesigningAboutProps) {
  const subBadgeText = data?.subBadgeText || "Why choose us for design";
  const headline = data?.headline || "Design that speaks before your business says a word";
  const description =
    data?.description ||
    "At Tryangletech, we pair sharp creative thinking with a deep understanding of your brand. Every pixel we place is intentional — designed to communicate your value and win your audience's trust at first glance.";
  const image = data?.image || "/service-2-assets/6908aeda67bc5beddc6c96f6_taskopia-service-two-why-choos.png";
  const buttonText = data?.buttonText || "Get started today";
  const buttonLink = data?.buttonLink || "/contact";
  const features = data?.features || [];

  const feat1 = features[0];
  const feat2 = features[1];

  return (
    <>
      <section className="rt-about-v2">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-about-v2-wrapper">
            <div
              data-w-id="daa11c44-29ce-1d77-876f-1f472850669b"
              className="rt-about-v2-left rt-overflow-hidden">
              <Image
                src={image}
                loading="lazy"
                alt="Graphic Design Experience"
                width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="rt-about-v2-right">
              <div
                data-w-id="daa11c44-29ce-1d77-876f-1f47285066a1"
                className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">
                  {subBadgeText}
                </div>
              </div>
              <div className="rt-heading-para-gap">
                <ScrollTextReveal
                  text={headline}
                  align="left"
                />
              </div>
              <p
                data-w-id="daa11c44-29ce-1d77-876f-1f47285066a9"
                className="rt-gap-off">
                {description}
              </p>
              <div className="rt-about-v1-right-inner" style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "20px" }}>
                <div
                  data-w-id="daa11c44-29ce-1d77-876f-1f47285066ac"
                  className="rt-about-v1-right-item">
                  <div className="rt-about-v1-right-item-icon">
                    <Image
                      src={feat1?.icon || "/service-2-assets/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"}
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="rt-text-style-h6" style={{ marginBottom: "6px" }}>
                      {feat1?.title || "100% Custom & Original Designs"}
                    </div>
                    <p className="rt-gap-off">
                      {feat1?.desc || "We never use templates. Every logo, banner, and brand kit is built from scratch, tailored exclusively to your business identity."}
                    </p>
                  </div>
                </div>
                <div
                  data-w-id="0721302a-3445-421f-ff2b-72516e3f56a6"
                  className="rt-about-v1-right-item rt-top-bottom-of">
                  <div className="rt-about-v1-right-item-icon">
                    <Image
                      src={feat2?.icon || "/service-2-assets/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"}
                      loading="lazy"
                      alt=""
                      width={800} height={800} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="rt-text-style-h6" style={{ marginBottom: "6px" }}>
                      {feat2?.title || "Timely Delivery & Revisions"}
                    </div>
                    <p className="rt-gap-off">
                      {feat2?.desc || "Every design we create is unique, tailored specifically to your brand's personality and designed to stand out in a crowded market."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                <Link
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href={buttonLink}
                  className="rt-button-body w-inline-block">
                  <div className="rt-button-text">{buttonText}</div>
                  <div className="rt-button-body-overlay"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
