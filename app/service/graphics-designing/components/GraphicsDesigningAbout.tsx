'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function GraphicsDesigningAbout() {
  return (
    <>
        <section className="rt-about-v2">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-about-v2-wrapper">
              <div
                data-w-id="daa11c44-29ce-1d77-876f-1f472850669b"
                className="rt-about-v2-left rt-overflow-hidden">
                <Image
                  src="/service-2-assets/6908aeda67bc5beddc6c96f6_taskopia-service-two-why-choos.png"
                  loading="lazy"
                  alt="taskopia-service-two-why-choos"
                 width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-about-v2-right">
                <div
                  data-w-id="daa11c44-29ce-1d77-876f-1f47285066a1"
                  className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">
                    Why choose us for design
                  </div>
                </div>
                <div className="rt-heading-para-gap">
                  <h2
                    data-w-id="daa11c44-29ce-1d77-876f-1f47285066a5"
                    className="rt-gap-off">
                    Design that speaks before your business{" "}
                    <span className="rt-color-periwinkle-gray">
                      says a word
                    </span>
                  </h2>
                </div>
                <p
                  data-w-id="daa11c44-29ce-1d77-876f-1f47285066a9"
                  className="rt-gap-off">
                  At Tryangletech, we pair sharp creative thinking with a deep understanding of your brand. Every pixel we place is intentional — designed to communicate your value and win your audience's trust at first glance.
                </p>
                <div className="rt-about-v1-right-inner">
                  <div
                    data-w-id="daa11c44-29ce-1d77-876f-1f47285066ac"
                    className="rt-about-v1-right-item">
                    <div className="rt-about-v1-right-item-icon">
                      <Image
                        src="/service-2-assets/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div>
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        100% Custom &amp; Original Designs
                      </div>
                      <p className="rt-gap-off">
                        We never use templates. Every logo, banner, and brand kit is built from scratch, tailored exclusively to your business identity.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="0721302a-3445-421f-ff2b-72516e3f56a6"
                    className="rt-about-v1-right-item rt-top-bottom-of">
                    <div className="rt-about-v1-right-item-icon">
                      <Image
                        src="/service-2-assets/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"
                        loading="lazy"
                        alt=""
                       width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div>
                      <div className="rt-text-style-h6 rt-small-heading-para-gap">
                        Timely Delivery &amp; Revisions
                      </div>
                      <p className="rt-gap-off">
                        Every design we create is unique, tailored specifically to your brand's personality and designed to stand out in a crowded market.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
                  <Link
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href="/contact"
                    className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Get started today</div>
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
