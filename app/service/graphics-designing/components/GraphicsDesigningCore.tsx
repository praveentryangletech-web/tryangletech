'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GraphicsDesigningCoreSection } from "@/backend/services/services/services.types";

interface GraphicsDesigningCoreProps {
  data?: GraphicsDesigningCoreSection;
}

export default function GraphicsDesigningCore({ data }: GraphicsDesigningCoreProps) {
  const subBadgeText = data?.subBadgeText || "creative excellence";
  const headline = data?.headline || "Great design is the silent ambassador of your brand";
  const description =
    data?.description ||
    "Your visuals are often the first impression a customer has of your business. At Tryangletech, we make sure that first impression counts — every design we produce is crafted to communicate trust, quality, and professionalism.";
  const buttonText = data?.buttonText || "Explore benefits";
  const buttonLink = data?.buttonLink || "/about";
  const rightImage = data?.rightImage || "/service-2-assets/69097f69015c484147186fc7_taskopia-service-two-core.webp";
  const points = data?.points || [];

  const point1 = points[0];
  const point2 = points[1];

  return (
    <>
      <section className="rt-core">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-core-wrapper">
            <div className="rt-core-left">
              <div className="rt-sub-gap">
                <div
                  data-w-id="0e5e56d6-5628-85cf-39de-3ef5d5049b64"
                  className="rt-sub-text rt-sub-gredient">
                  {subBadgeText}
                </div>
              </div>
              <div className="rt-heading-para-gap">
                <h2
                  data-w-id="0e5e56d6-5628-85cf-39de-3ef5d5049b66"
                  className="rt-gap-off">
                  {headline}
                </h2>
              </div>
              <div
                data-w-id="0e5e56d6-5628-85cf-39de-3ef5d5049b6a"
                className="rt-analytics-v2-para-wrap rt-gap-large">
                <p className="rt-gap-off">
                  {description}
                </p>
              </div>
              <div className="w-layout-grid rt-analytics-v2-box-wrap">
                <div
                  data-w-id="0e5e56d6-5628-85cf-39de-3ef5d5049b6e"
                  className="w-layout-vflex rt-analytics-v2-box">
                  <div>
                    <Image
                      width={45}
                      height={45}
                      alt=""
                      src={point1?.icon || "/service-2-assets/6916f00db3051e5aed09bd3f_Group 2085663576.svg"}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-layout-vflex rt-analytics-v2-text-wrap">
                    <div className="rt-text-style-h6">{point1?.title || "Purpose-Driven Design"}</div>
                    <p className="rt-no-margin">
                      {point1?.desc || "Every design choice — color, font, layout — is intentional and aligned with your brand strategy."}
                    </p>
                  </div>
                </div>
                <div
                  data-w-id="0e5e56d6-5628-85cf-39de-3ef5d5049b76"
                  className="w-layout-vflex rt-analytics-v2-box">
                  <div>
                    <Image
                      width={45}
                      height={45}
                      alt=""
                      src={point2?.icon || "/service-2-assets/6916ef876682eed2b2fd5911_Vector (34).svg"}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-layout-vflex rt-analytics-v2-text-wrap">
                    <div className="rt-text-style-h6">{point2?.title || "Pixel-Perfect Execution"}</div>
                    <p className="rt-no-margin">
                      {point2?.desc || "We sweat the small stuff. Clean lines, balanced compositions, and flawless finishes every time."}
                    </p>
                  </div>
                </div>
              </div>
              <div
                data-w-id="0e5e56d6-5628-85cf-39de-3ef5d5049b7e"
                className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                <Link
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href={buttonLink}
                  className="rt-button-body w-inline-block">
                  <div className="rt-button-text">{buttonText}</div>
                  <div className="rt-button-body-overlay"></div>
                </Link>
              </div>
            </div>
            <div className="rt-core-right rt-border-radius-medium">
              <Image
                src={rightImage}
                loading="lazy"
                data-w-id="e5d55f52-d279-25a4-74c1-f7183bd17df6"
                alt="taskopia-service-two-core"
                width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
