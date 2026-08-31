'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { MobileAppHeroSection } from '@/backend/services/services/services.types';
import { DEFAULT_MOBILE_APP_CONTENT } from '@/backend/services/services/services.defaults';

interface MobileApplicationHeroProps {
  data?: MobileAppHeroSection;
}

export default function MobileApplicationHero({ data }: MobileApplicationHeroProps) {
  const hero = data || DEFAULT_MOBILE_APP_CONTENT.hero;
  const logos = (hero.logos && hero.logos.length > 0 ? hero.logos : DEFAULT_MOBILE_APP_CONTENT.hero.logos) || [];


  return (
    <>
      <section className="rt-hero-v7 rt-position-relative rt-overflow-hidden">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-hero-v7-main">
            <div className="w-layout-vflex rt-hero-v7-heading-wrap">
              <div className="rt-sub-gap">
                <div
                  data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80b6"
                  className="rt-sub-text rt-sub-gredient">
                  {hero.subBadgeText || 'Mobile Application Development'}
                </div>
              </div>
              <div className="rt-hero-heading-gap rt-herding-v7-main">
                <h1
                  data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80b8"
                  className="rt-gap-off">
                  {hero.headline || 'We build mobile apps that work great and help your business grow'}
                </h1>
              </div>
              <div
                data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80bc"
                className="rt-hero-v7-para-wrap">
                <p className="rt-gap-off">
                  {hero.subheadline || 'We turn your ideas into mobile apps for both iPhone and Android. Based in Ahmedabad, we build apps that are easy to use and designed to keep your customers coming back.'}
                </p>
              </div>
              <div
                data-w-id="37c94178-77e1-7d98-94e1-aeaba36c80bf"
                className="w-layout-hflex rt-hero-v7-button-wrap">
                <Link
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href={hero.primaryBtnLink || '/contact'}
                  className="rt-button-body w-inline-block">
                  <div className="rt-button-text">{hero.primaryBtnText || 'Start your app project'}</div>
                  <div className="rt-button-body-overlay"></div>
                </Link>
              </div>
              <div
                data-w-id="71a4d9bb-ed12-fffa-7ded-0324d6f48125"
                className="rt-hero-v7-left-bottom rt-overflow-hidden rt-tab-display-none">
                <div className="rt-text-style-h6 rt-hero-v7-left-text">
                  {hero.trustText || 'Trusted by 350+ businesses'}
                </div>
                <div className="rt-text-marquee-wrapper rt-overflow-hidden">
                  <div className="rt-text-marquee-train">
                    {logos.map((logo, idx) => (
                      <div key={`train1-${idx}`} className="rt-text-marquee-iteme">
                        <Image
                          src={logo.src}
                          loading="lazy"
                          width={logo.width || 200}
                          height={logo.height || 80}
                          alt={logo.alt || 'Client logo'}
                          style={{ height: "30px", width: "auto" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="rt-text-marquee-train">
                    {logos.map((logo, idx) => (
                      <div key={`train2-${idx}`} className="rt-text-marquee-iteme">
                        <Image
                          src={logo.src}
                          loading="lazy"
                          width={logo.width || 200}
                          height={logo.height || 80}
                          alt={logo.alt || 'Client logo'}
                          style={{ height: "30px", width: "auto" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="rt-text-marquee-train">
                    {logos.map((logo, idx) => (
                      <div key={`train3-${idx}`} className="rt-text-marquee-iteme">
                        <Image
                          src={logo.src}
                          loading="lazy"
                          width={logo.width || 200}
                          height={logo.height || 80}
                          alt={logo.alt || 'Client logo'}
                          style={{ height: "30px", width: "auto" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="rt-hero-v7-right rt-overflow-hidden rt-mobile-l-display-none">
              <div
                data-w-id="821b55b3-a8cd-3cff-b821-5c6fb716e28e"
                className="rt-hero-v7-right-one rt-overflow-hidden">
                <Image
                  src={hero.imageRightOne || "/service-3-assets/69170015f37d357acf91bec7_taskopiya-service-3 (1).webp"}
                  loading="lazy"
                  alt={hero.imageRightOneAlt || "taskopiya-service-3 (1)"}
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="5ff5999f-0cd2-c9e1-fdc1-ac73c3d8a152"
                className="rt-hero-v7-right-two">
                <Image
                  src={hero.imageRightTwo || "/service-3-assets/69203729550f7640007a1251_taskopia-service-three.webp"}
                  loading="lazy"
                  alt={hero.imageRightTwoAlt || "taskopia-service-three"}
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="rt-hero-v7-image">
          <Image
            src={hero.imageBanner || "/service-3-assets/6915d5eb6bd730eb6b764f99_taskopiya-service- two.webp"}
            loading="lazy"
            alt={hero.imageBannerAlt || "taskopiya-service- two"}
            width={800} height={800} style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="rt-hero-v7-over-lay-one"></div>
        <div className="rt-hero-v7-over-lay-two"></div>
        <div className="rt-overlay"></div>
      </section>
    </>
  );
}
