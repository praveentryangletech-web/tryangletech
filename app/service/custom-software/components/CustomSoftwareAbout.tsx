'use client';
import Link from "next/link";
import React from 'react';
import Image from "next/image";
import ScrollTextReveal from "../../../common/ScrollTextReveal";
import { CustomSoftwareAboutSection } from '@/backend/services/services/services.types';

interface CustomSoftwareAboutProps {
  data?: CustomSoftwareAboutSection;
}

export default function CustomSoftwareAbout({ data }: CustomSoftwareAboutProps) {
  const subBadgeText = data?.subBadgeText || 'Why choose us for software';
  const headline = data?.headline || 'Software that solves real problems and keeps growing with you';
  const description =
    data?.description ||
    'We take the time to understand your business properly before we start building anything. Our goal is always to make software that your team enjoys using and that helps your business run smoothly.';
  const image = data?.image || '/service-2-assets/6908aeda67bc5beddc6c96f6_taskopia-service-two-why-choos.png';
  const imageAlt = data?.imageAlt || 'Why Choose TryangleTech Custom Software Development';
  const features = data?.features || [];
  const buttonText = data?.buttonText || 'Get started today';
  const buttonLink = data?.buttonLink || '/contact';

  return (
    <section className="rt-about-v2" style={{ paddingBottom: '40px' }}>
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-about-v2-wrapper">
          <div data-w-id="daa11c44-29ce-1d77-876f-1f472850669b" className="rt-about-v2-left rt-overflow-hidden">
            <Image
              src={image}
              loading="lazy"
              alt={imageAlt}
              width={800}
              height={800}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="rt-about-v2-right">
            <div data-w-id="daa11c44-29ce-1d77-876f-1f47285066a1" className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">{subBadgeText}</div>
            </div>
            <div className="rt-heading-para-gap">
              <ScrollTextReveal
                text={headline}
                align="left"
              />
            </div>
            <p data-w-id="daa11c44-29ce-1d77-876f-1f47285066a9" className="rt-gap-off">
              {description}
            </p>
            <div className="rt-about-v1-right-inner">
              {features.map((feat, idx) => (
                <div
                  key={feat.id || idx}
                  data-w-id={`about-feat-${idx}`}
                  className={`rt-about-v1-right-item${idx > 0 ? ' rt-top-bottom-of' : ''}`}
                >
                  <div className="rt-about-v1-right-item-icon">
                    <Image
                      src={feat.icon || "/service-2-assets/6916f191d4b3b4e4b2cee5b2_Vector (35).svg"}
                      loading="lazy"
                      alt={feat.title}
                      width={800}
                      height={800}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <div>
                    <div className="rt-text-style-h6 rt-small-heading-para-gap">{feat.title}</div>
                    <p className="rt-gap-off">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rt-button-para-gap rt-overflow-hidden rt-button-left">
              <Link data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8" href={buttonLink} className="rt-button-body w-inline-block">
                <div className="rt-button-text">{buttonText}</div>
                <div className="rt-button-body-overlay"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
