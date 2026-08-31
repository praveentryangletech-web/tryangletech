'use client';
import React from "react";
import Image from "next/image";
import { GraphicsDesigningCapabilitiesSection } from "@/backend/services/services/services.types";

interface GraphicsDesigningServicesProps {
  data?: GraphicsDesigningCapabilitiesSection;
}

export default function GraphicsDesigningServices({ data }: GraphicsDesigningServicesProps) {
  const subBadgeText = data?.subBadgeText || "our services";
  const headline = data?.headline || "Everything you need to build a powerful visual brand";
  const description =
    data?.description ||
    "From high-impact social media creatives and video editing to complete brand identities and large-scale exhibition banners, our design team delivers visuals that captivate and convert.";
  const items = data?.items || [];
  const previewImages = data?.previewImages || [];

  const item1 = items[0];
  const item2 = items[1];
  const item3 = items[2];
  const item4 = items[3];

  const img1 = previewImages[0] || "/service-2-assets/69132a3fea5303d0e305dc91_service v3.webp";
  const img2 = previewImages[1] || "/service-2-assets/691d87288f25a14bb8d7352e_taskopiya-service-two-task.webp";
  const img3 = previewImages[2] || "/service-2-assets/69132a3fea5303d0e305dc91_service v3.webp";
  const img4 = previewImages[3] || "/service-2-assets/69132a3f107f32facf60e873_service v4.webp";

  return (
    <>
      <section className="rt-services-v2">
        <div className="w-layout-blockcontainer rt-container-extra-large w-container">
          <div className="rt-services-v2-contanner rt-overflow-hidden">
            <div className="rt-services-v2-wrapper">
              <div className="rt-services-v2-wrap">
                <div
                  id="w-node-f74def95-767b-a89b-08a5-953ba5c723f4-20952722"
                  className="rt-service-v2-top">
                  <div className="rt-services-v2-top-left">
                    <div
                      data-w-id="f74def95-767b-a89b-08a5-953ba5c723f5"
                      className="rt-sub-gap">
                      <div className="rt-sub-text">{subBadgeText}</div>
                    </div>
                    <h2
                      data-w-id="f74def95-767b-a89b-08a5-953ba5c723f8"
                      className="rt-gap-off rt-text-color-white">
                      {headline}
                    </h2>
                  </div>
                  <p
                    data-w-id="03f01ed3-f9d4-a771-a9d5-5fac199e2fda"
                    className="rt-service-v2-para rt-color-pale-periwinkle">
                    {description}
                  </p>
                </div>
                <div
                  data-w-id="c0c4a8e7-880b-9538-1fa6-397d2055142c"
                  className="rt-services-v2-left">
                  {/* Item 1 */}
                  <div
                    data-w-id="1a8d5714-24ea-0413-c567-0c28706d6e08"
                    className="rt-services-v2-left-inner">
                    <div className="rt-services-v2-left-top">
                      <div className="rt-services-v2-left-inner-icon">
                        <Image
                          src={item1?.icon || "/service-2-assets/69099fe756beabe4238c7528_clipboard (1) 1.svg"}
                          loading="lazy"
                          alt=""
                          width={800}
                          height={800}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div className="rt-services-v2-text">
                        <div>
                          <div className="rt-text-style-h6 rt-text-color-white">
                            {item1?.title || "Social Media Creation"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rt-services-v2-left-bottom rt-one">
                      <div className="rt-services-v2-left-bottom-inner rt-one">
                        <p className="rt-color-pale-periwinkle rt-gap-off">
                          {item1?.desc || "We design high-converting, scroll-stopping social media posts, carousel decks, story templates, and ad creatives tailored to grow your followers and drive engagement."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div
                    data-w-id="f95f31c2-b898-fd53-d3d3-42195bc71a02"
                    className="rt-services-v2-left-inner">
                    <div className="rt-services-v2-left-top">
                      <div className="rt-services-v2-left-inner-icon">
                        <Image
                          src={item2?.icon || "/service-2-assets/69099fe7ba9794ca9c0b34c5_database (1) 2.svg"}
                          loading="lazy"
                          alt=""
                          width={800}
                          height={800}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div className="rt-services-v2-text">
                        <div>
                          <div className="rt-text-style-h6 rt-text-color-white">
                            {item2?.title || "Video Editing"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rt-services-v2-left-bottom rt-active">
                      <div className="rt-services-v2-left-bottom-inner rt-active">
                        <p className="rt-color-pale-periwinkle rt-gap-off">
                          {item2?.desc || "From cinematic brand films and viral short-form reels to corporate explainers and event highlights, our video editors craft polished visual stories that captivate."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div
                    data-w-id="929b6238-8258-e672-50f9-8fbd2adf3cae"
                    className="rt-services-v2-left-inner">
                    <div className="rt-services-v2-left-top">
                      <div className="rt-services-v2-left-inner-icon">
                        <Image
                          src={item3?.icon || "/service-2-assets/69099fe7cf95879c6cb6f865_lock (2) 1.svg"}
                          loading="lazy"
                          alt=""
                          width={800}
                          height={800}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div className="rt-services-v2-text">
                        <div>
                          <div className="rt-text-style-h6 rt-text-color-white">
                            {item3?.title || "Branding"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rt-services-v2-left-bottom rt-two">
                      <div className="rt-services-v2-left-bottom-inner rt-two">
                        <p className="rt-color-pale-periwinkle rt-gap-off">
                          {item3?.desc || "We build cohesive brand identities from the ground up — including memorable logo design, custom typography palettes, tone-of-voice guidelines, and comprehensive brand books."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div
                    data-w-id="284fe48d-b27f-0da9-2df2-0d2682d30174"
                    className="rt-services-v2-left-inner">
                    <div className="rt-services-v2-left-top">
                      <div className="rt-services-v2-left-inner-icon">
                        <Image
                          src={item4?.icon || "/service-2-assets/69099fe7e885083e2015cd2c_activity 2.svg"}
                          loading="lazy"
                          alt=""
                          width={800}
                          height={800}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div className="rt-services-v2-text">
                        <div>
                          <div className="rt-text-style-h6 rt-text-color-white">
                            {item4?.title || "Exhibition Banner"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rt-services-v2-left-bottom rt-three">
                      <div className="rt-services-v2-left-bottom-inner rt-three">
                        <p className="rt-color-pale-periwinkle rt-gap-off">
                          {item4?.desc || "High-impact exhibition banners, roll-up standees, trade show backdrop displays, and large-format promotional signage engineered to draw crowds and maximize event visibility."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  data-w-id="efc1e74b-43a5-b6db-7cd1-10d908e9d225"
                  className="rt-services-v2-right">
                  <Image
                    src={img1}
                    loading="eager"
                    alt="service v3"
                    className="rt-services-v2-one"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Image
                    src={img2}
                    loading="lazy"
                    width={847}
                    alt="taskopiya-service-two-task"
                    className="rt-services-v2-two"
                    height={800}
                  />
                  <Image
                    src={img3}
                    loading="eager"
                    alt="service v3"
                    className="rt-services-v2-three"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Image
                    src={img4}
                    loading="eager"
                    alt="service v4"
                    className="rt-services-v2-four"
                    width={800}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
