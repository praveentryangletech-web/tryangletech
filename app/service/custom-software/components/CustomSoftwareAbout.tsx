'use client';
import Link from "next/link";
import React from 'react';
import Image from "next/image";
import ScrollTextReveal from "../../../common/ScrollTextReveal";

export default function CustomSoftwareAbout() {
  return (
    <section className="rt-about-v2">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-about-v2-wrapper">
          <div data-w-id="daa11c44-29ce-1d77-876f-1f472850669b" className="rt-about-v2-left rt-overflow-hidden">
            <Image src="/service-2-assets/6908aeda67bc5beddc6c96f6_taskopia-service-two-why-choos.png" loading="lazy" alt="taskopia-service-two-why-choos" width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="rt-about-v2-right">
            <div data-w-id="daa11c44-29ce-1d77-876f-1f47285066a1" className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">Why choose us for software</div>
            </div>
            <div className="rt-heading-para-gap">
              <ScrollTextReveal
                text="Software that solves real problems and keeps growing with you"
                align="left"
              />
            </div>
            <p data-w-id="daa11c44-29ce-1d77-876f-1f47285066a9" className="rt-gap-off">
              We take the time to understand your business properly before we start building anything. Our goal is always to make software that your team enjoys using and that helps your business run smoothly.
            </p>
            <div className="rt-about-v1-right-inner">
              <div data-w-id="daa11c44-29ce-1d77-876f-1f47285066ac" className="rt-about-v1-right-item">
                <div className="rt-about-v1-right-item-icon">
                  <Image src="/service-2-assets/6916f191d4b3b4e4b2cee5b2_Vector (35).svg" loading="lazy" alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div>
                  <div className="rt-text-style-h6 rt-small-heading-para-gap">Fully custom and built for you</div>
                  <p className="rt-gap-off">We build everything from scratch based on how your team works. There are no ready made shortcuts. You get something made specifically for your business.</p>
                </div>
              </div>
              <div data-w-id="0721302a-3445-421f-ff2b-72516e3f56a6" className="rt-about-v1-right-item rt-top-bottom-of">
                <div className="rt-about-v1-right-item-icon">
                  <Image src="/service-2-assets/6916f191d4b3b4e4b2cee5b2_Vector (35).svg" loading="lazy" alt="" width={800} height={800} style={{ width: "100%", height: "auto" }} />
                </div>
                <div>
                  <div className="rt-text-style-h6 rt-small-heading-para-gap">On-time delivery and full transparency</div>
                  <p className="rt-gap-off">We stick to deadlines and keep you in the loop at every stage. You will always know what is being worked on and when things will be ready.</p>
                </div>
              </div>
            </div>
            <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
              <Link data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8" href="/contact" className="rt-button-body w-inline-block">
                <div className="rt-button-text">Get started today</div>
                <div className="rt-button-body-overlay"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
