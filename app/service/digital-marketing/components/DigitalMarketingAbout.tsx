import React from "react";
import Image from "next/image";
import ScrollTextReveal from "../../../common/ScrollTextReveal";
import { DigitalMarketingApproachSection } from "@/backend/services/services/services.types";

interface DigitalMarketingAboutProps {
  data?: DigitalMarketingApproachSection;
}

export default function DigitalMarketingAbout({ data }: DigitalMarketingAboutProps) {
  const subBadgeText = data?.subBadgeText || "Our Approach";
  const headline = data?.headline || "Marketing built around your business, not a template";
  const description =
    data?.description ||
    "We start by understanding what you actually sell and who buys it. Then we build a plan around SEO, social media, and paid ads that fits your budget - not a one-size-fits-all package.";
  const image = data?.image || "/Home3_files/690dc69fa56b486d2211f9af_taskopia-highlights-1.webp";
  const buttonText = data?.buttonText || "Book a Free Consultation";
  const buttonLink = data?.buttonLink || "/contact";
  const features = data?.features || [];

  const feat1 = features[0];
  const feat2 = features[1];

  return (
    <section className="rt-about-v3">
      <div className="w-layout-blockcontainer rt-container-extra-large w-container">
        <div className="rt-about-v3-contanner">
          <div className="rt-about-v3-main">
            <div className="rt-about-v3-left rt-position-relative">
              <div
                data-w-id="b12d1ee9-ffac-edce-015f-660b4ffe542b"
                style={{
                  opacity: "1",
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
                className="rt-position-relative rt-4"
              >
                <Image
                  src={image}
                  loading="lazy"
                  alt="taskopia-highlights-1"
                  width={800}
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div
                data-w-id="79ad1220-598b-55cd-ca82-f17a6b7bf086"
                style={{
                  opacity: "1",
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(4.70701deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                className="rt-about-v3-left-overlay"
              ></div>
            </div>
            <div className="rt-about-v3-right">
              <div className="rt-sub-gap">
                <div
                  data-w-id="b6b5152d-8f29-2a32-eff3-608643168c4f"
                  style={{
                    opacity: "1",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d",
                  }}
                  className="rt-sub-text"
                >
                  {subBadgeText}
                </div>
              </div>
              <div className="rt-heading-para-gap">
                <ScrollTextReveal
                  text={headline}
                  align="left"
                  textColor="#ffffff"
                  fadedColor="#94a3b8"
                />
              </div>
              <div
                data-w-id="b6b5152d-8f29-2a32-eff3-608643168c54"
                style={{
                  opacity: "0.99955",
                  transform:
                    "translate3d(0px, 0.045px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                  willChange: "opacity, transform",
                }}
              >
                <p className="rt-gap-off rt-color-pale-periwinkle">
                  {description}
                </p>
              </div>
              <div
                data-w-id="c68901ca-d499-eba7-0e6d-664e308abf1e"
                style={{
                  opacity: "0.99909",
                  transform:
                    "translate3d(0px, 0.091px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                  willChange: "opacity, transform",
                }}
                className="w-layout-grid rt-analytics-v2-box-wrap"
              >
                <div className="w-layout-vflex rt-analytics-v2-box">
                  <div>
                    <Image
                      width={45}
                      height={45}
                      alt={feat1?.title || "specialiti-icon-2"}
                      src={feat1?.icon || "/Home3_files/6916b33016cea6a92e3f8264_specialiti-icon-2.svg"}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-layout-vflex rt-analytics-v2-text-wrap">
                    <div className="rt-text-style-h6 rt-text-color-white">
                      {feat1?.title || "SEO"}
                    </div>
                    <p className="rt-gap-off rt-color-pale-periwinkle">
                      {feat1?.desc || "We optimize your site's content and structure so it ranks on Google for the searches that actually bring you customers."}
                    </p>
                  </div>
                </div>
                <div className="w-layout-vflex rt-analytics-v2-box">
                  <div>
                    <Image
                      width={45}
                      height={45}
                      alt={feat2?.title || "specialiti-icon-1"}
                      src={feat2?.icon || "/Home3_files/6916b330bfe76dda628cf5ac_specialiti-icon-1.svg"}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-layout-vflex rt-analytics-v2-text-wrap">
                    <div className="rt-text-style-h6 rt-text-color-white">
                      {feat2?.title || "Social Media & Ads"}
                    </div>
                    <p className="rt-gap-off rt-color-pale-periwinkle">
                      {feat2?.desc || "We run and manage your social presence and paid campaigns, so you get in front of people who are actually looking for what you offer."}
                    </p>
                  </div>
                </div>
              </div>
              <div
                data-w-id="b6b5152d-8f29-2a32-eff3-608643168c68"
                style={{
                  opacity: "0.69508",
                  transform:
                    "translate3d(0px, 30.492px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                  willChange: "opacity, transform",
                }}
                className="rt-button-para-gap rt-overflow-hidden rt-button-left"
              >
                <a
                  data-wf--rt-white-button--variant="base"
                  data-w-id="0405d357-f0f5-aac8-4042-22ceb6fb3cbf"
                  href={buttonLink}
                  className="rt-button-body rt-bg-color w-inline-block"
                >
                  <div
                    className="rt-button-text rt-btn-color"
                    style={{ color: "rgb(26, 11, 84)" }}
                  >
                    &nbsp;{buttonText}
                  </div>
                  <div
                    className="rt-button-body-overlay rt-color-blue rt-color-change"
                    style={{
                      transform:
                        "translate3d(0px, 100%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d",
                    }}
                  ></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
