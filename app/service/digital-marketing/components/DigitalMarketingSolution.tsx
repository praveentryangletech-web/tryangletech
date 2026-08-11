import React from "react";

import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

export default function DigitalMarketingSolution() {
  return (
    <section className="rt-solution-v1">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div
          data-w-id="3ce20e46-417b-fa95-bf8e-f7cd9e56a913"
          className="rt-solution-v1-main"
        >
          <div className="rt-solution-left-part rt-position-relative">
            <div className="rt-solution-image-wrap">
              <Image
                width={526}
                height={585}
                alt="taskopia-home-three-seamless-0ne"
                src="/Home3_files/690d7d05f6aafef905b4e347_taskopia-home-three-seamless-0ne.webp"
                loading="lazy"
                srcSet="https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/690d7d05f6aafef905b4e347_taskopia-home-three-seamless-0ne-p-500.webp 500w, https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/690d7d05f6aafef905b4e347_taskopia-home-three-seamless-0ne-p-800.png 800w, https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/690d7d05f6aafef905b4e347_taskopia-home-three-seamless-0ne.webp 1052w"
                sizes="(max-width: 767px) 100vw, 526px"
                className="rt-mobile-l-display-none"
               />
              <Image
                width={526}
                height={585}
                alt="taskopia-home-three-seamless-main"
                src="/Home3_files/690d89a519fa0ba69a76c452_taskopia-home-three-seamless-main.webp"
                loading="lazy"
                srcSet="https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/690d89a519fa0ba69a76c452_taskopia-home-three-seamless-main-p-500.webp 500w, https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/690d89a519fa0ba69a76c452_taskopia-home-three-seamless-main-p-800.webp 800w, https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/690d89a519fa0ba69a76c452_taskopia-home-three-seamless-main-p-1080.webp 1080w, https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/690d89a519fa0ba69a76c452_taskopia-home-three-seamless-main.webp 1190w"
                sizes="(max-width: 767px) 100vw, 526px"
                className="rt-solution-image-wrap-image-1"
               />
            </div>
            <div
              data-w-id="c11f2ea4-3459-1ded-feb7-55c656b24220"
              style={{ opacity: "0" }}
              className="rt-solution-absolute-image-one rt-mobile-l-display-none"
            >
              <Image
                width={296}
                height={212}
                alt="taskopiya-home-three-se amvess-image"
                src="/Home3_files/6915600f2b490dae5ce6d2f1_taskopiya-home-three-se amvess-image.webp"
                loading="lazy"
               />
            </div>
            <div className="rt-solution-absolute-image-two">
              <Image
                width={151}
                height={122}
                alt=""
                src="/Home3_files/690d7cf2ee9d3a0bdde6c218_kloudera-service-one-solution-micro.svg"
                loading="lazy"
                className="rt-auto-fit rt-desktop-image-full-width"
               />
            </div>
          </div>
          <div className="rt-solution-right-part">
            <div
              data-w-id="e5e84ad6-ed2a-30a1-8124-ce342a03652d"
              style={{ opacity: "0" }}
              className="rt-sub-gap"
            >
              <div className="rt-sub-text rt-sub-gredient">
                Our Approach
              </div>
            </div>
            <div className="rt-heading-para-gap">
              <h2
                data-w-id="e5e84ad6-ed2a-30a1-8124-ce342a036531"
                style={{ opacity: "0" }}
                className="rt-gap-off"
              >
                Marketing built around your business, not a template
              </h2>
            </div>
            <p
              data-w-id="e5e84ad6-ed2a-30a1-8124-ce342a036535"
              style={{ opacity: "0" }}
              className="rt-gap-off"
            >
              We start by understanding what you actually sell and who buys it. Then we build a plan around SEO, social media, and paid ads that fits your budget - not a one-size-fits-all package.
            </p>
            <div className="rt-about-v1-right-inner">
              <div
                data-w-id="e5e84ad6-ed2a-30a1-8124-ce342a036538"
                style={{ opacity: "0" }}
                className="rt-about-v1-right-item"
              >
                <div className="rt-about-v1-right-item-icon">
                  <Image
                    src="/Home3_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div>
                  <div className="rt-text-style-h6 rt-small-heading-para-gap">
                    SEO
                  </div>
                  <p className="rt-gap-off">
                    We optimize your site's content and structure so it ranks on Google for the searches that actually bring you customers.
                  </p>
                </div>
              </div>
              <div
                data-w-id="e5e84ad6-ed2a-30a1-8124-ce342a036540"
                style={{ opacity: "0" }}
                className="rt-about-v1-right-item rt-top-bottom-of"
              >
                <div className="rt-about-v1-right-item-icon">
                  <Image
                    src="/Home3_files/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                    loading="lazy"
                    alt=""
                   width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div>
                  <div className="rt-text-style-h6 rt-small-heading-para-gap">
                    Social Media & Ads
                  </div>
                  <p className="rt-gap-off">
                    We run and manage your social presence and paid campaigns, so you get in front of people who are actually looking for what you offer.
                  </p>
                </div>
              </div>
            </div>
            <div className="rt-overflow-hidden">
              <div
                data-w-id="e5e84ad6-ed2a-30a1-8124-ce342a036548"
                style={{ opacity: "0" }}
                className="rt-button-para-gap rt-overflow-hidden rt-button-left"
              >
                <a
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href="/contact"
                  className="rt-button-body w-inline-block"
                >
                  <div className="rt-button-text">See all services</div>
                  <div
                    className="rt-button-body-overlay"
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
