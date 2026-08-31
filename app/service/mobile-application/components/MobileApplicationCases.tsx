'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { MobileAppAdvantageSection } from '@/backend/services/services/services.types';
import { DEFAULT_MOBILE_APP_CONTENT } from '@/backend/services/services/services.defaults';

interface MobileApplicationCasesProps {
  data?: MobileAppAdvantageSection;
}

export default function MobileApplicationCases({ data }: MobileApplicationCasesProps) {
  const advantage = data || DEFAULT_MOBILE_APP_CONTENT.advantage;
  const points = (advantage.points && advantage.points.length > 0 ? advantage.points : DEFAULT_MOBILE_APP_CONTENT.advantage.points) || [];


  return (
    <>
      <section className="rt-cases">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="w-layout-hflex rt-cases-main">
            <div className="w-layout-vflex rt-cases-right-part">
              <div className="w-layout-vflex rt-cases-heading-wrap rt-overflow-hidden">
                <div className="rt-sub-gap">
                  <div
                    data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401e1"
                    className="rt-sub-text rt-sub-gredient">
                    {advantage.subBadgeText || 'development advantage'}
                  </div>
                </div>
                <div className="rt-heading-para-gap">
                  <ScrollTextReveal
                    text={advantage.heading || 'High-performance apps delivered with zero stress'}
                    align="left"
                  />
                </div>
                <div
                  data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401e7"
                  className="rt-cases-para-wrap rt-gap-large">
                  <p className="rt-gap-off">
                    {advantage.description || 'We accelerate your time-to-market with agile development sprints, delivering robust, high-performance mobile applications without technical friction.'}
                  </p>
                </div>
                <div
                  data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401ea"
                  className="rt-button-para-gap">
                  <Link
                    data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                    href={advantage.primaryBtnLink || '/contact'}
                    className="rt-button-body w-inline-block">
                    <div className="rt-button-text">{advantage.primaryBtnText || 'Explore Benefits'}</div>
                    <div className="rt-button-body-overlay"></div>
                  </Link>
                </div>
              </div>
              <div
                data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401f0"
                className="w-layout-grid rt-cases-box-main rt-position-relative">
                {points.map((pt, idx) => (
                  <div
                    key={pt.id || idx}
                    id={idx === 0 ? "w-node-cd8e4bfe-5169-9342-1cbb-40d6510401f1-0687f4f0" : undefined}
                    data-w-id={idx === 0 ? "cd8e4bfe-5169-9342-1cbb-40d6510401f1" : "cd8e4bfe-5169-9342-1cbb-40d6510401f8"}
                    className={`w-layout-vflex rt-cases-box-wrap ${idx === 1 ? 'rt-left-padding' : ''}`}>
                    <div>
                      <Image
                        src={pt.icon || "/service-3-assets/6916ef876682eed2b2fd5911_Vector (34).svg"}
                        loading="lazy"
                        alt={pt.iconAlt || pt.title}
                        width={800} height={800} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className={`w-layout-vflex rt-cases-box-text-wrap ${idx === 1 ? 'rt-full-width' : ''}`}>
                      <div className="rt-text-style-h6">
                        {pt.title}
                      </div>
                      <p className="rt-gap-off">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="rt-cades-absolute-line"></div>
              </div>
            </div>
            <div
              data-w-id="cd8e4bfe-5169-9342-1cbb-40d6510401d6"
              className="rt-cases-left-part">
              <div
                data-w-id="8503912d-a933-f4c4-ce1c-498a3e0e7655"
                className="rt-cases-left-main">
                <Image
                  src={advantage.imageMain || "/service-3-assets/6904b11c6b4ad8773a03a11c_taskopia-service-three-why-choose (1).png"}
                  loading="lazy"
                  alt={advantage.imageMainAlt || "taskopia-service-three-why-choose (1)"}
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-cases-v2-left-overlay">
                <Image
                  src={advantage.imageOverlay || "/service-3-assets/6904b11c9c86bd80ff185a4b_Mask group (4).png"}
                  loading="lazy"
                  alt={advantage.imageOverlayAlt || "Mask group"}
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="004aed41-8599-003c-e25f-67cb5124ad03"
                className="rt-cases-left-overlay-2">
                <Image
                  src={advantage.imageOverlay2 || "/service-3-assets/6904b2880d8bf1cf10e7ab48_taskopia-service-three-why-choose-two.png"}
                  loading="lazy"
                  alt={advantage.imageOverlay2Alt || "taskopia-service-three-why-choose-two"}
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="b39041d9-95f1-3e94-cc77-0b326d8cf6d8"
                className="rt-small-btn-main rt-cases-small">
                <Image
                  src={advantage.imageBadge || "/service-3-assets/69087acd988708b2bfcb37de_Group 2085662995.webp"}
                  loading="lazy"
                  alt={advantage.imageBadgeAlt || "taskopia-workflow"}
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
