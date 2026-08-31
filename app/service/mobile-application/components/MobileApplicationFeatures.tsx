'use client';

import React from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { MobileAppFeaturesSection } from '@/backend/services/services/services.types';
import { DEFAULT_MOBILE_APP_CONTENT } from '@/backend/services/services/services.defaults';

interface MobileApplicationFeaturesProps {
  data?: MobileAppFeaturesSection;
}

export default function MobileApplicationFeatures({ data }: MobileApplicationFeaturesProps) {
  const features = data || DEFAULT_MOBILE_APP_CONTENT.features;
  const items = (features.items && features.items.length > 0 ? features.items : DEFAULT_MOBILE_APP_CONTENT.features.items) || [];


  return (
    <>
      <section className="rt-feaures-v1 rt-position-relative rt-overflow-hidden" style={{ paddingBottom: 0 }}>
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-feaures-top rt-desktop-text-center rt-heading-bottom-gap">
            <div
              data-w-id="90bc93a4-7453-cf99-b117-5b196d3d4337"
              className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">
                {features.subBadgeText || 'what you get'}
              </div>
            </div>
            <ScrollTextReveal
              text={features.heading || 'Make work easier and help your business run better'}
              align="center"
            />
          </div>
          <div
            data-w-id="8e33e015-0098-3931-b15d-9ef7d71eaaea"
            className="rt-feaures-v1-main">
            <Image
              src={features.imageMain || "/service-3-assets/6915c70b7c1f18f1e46e5094_taskopiya-home-two.avif"}
              loading="lazy"
              alt={features.imageMainAlt || "taskopiya-home-two"}
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="w-layout-grid rt-benefits-v2-card-wrap">
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                data-w-id={idx === 0 ? "6c812f82-28ff-1528-5a4b-fce6814a7d9e" : idx === 1 ? "6c812f82-28ff-1528-5a4b-fce6814a7da6" : "6c812f82-28ff-1528-5a4b-fce6814a7dae"}
                className="w-layout-vflex rt-benefits-v2-card">
                <div className="rt-benefits-icon">
                  <Image
                    width={38}
                    height={38}
                    alt={item.iconAlt || item.title}
                    src={item.icon || "/service-3-assets/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg"}
                    loading="lazy"
                  />
                </div>
                <div className="w-layout-vflex rt-benefits-v2-card-text-wrap rt-mobile-text-center">
                  <div className="rt-text-style-h6">{item.title}</div>
                  <p className="rt-gap-off">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          data-w-id="e31b2892-b856-bf93-8f9c-f3a209ae4130"
          className="rt-feaures-v1-top-icon rt-1">
          <div className="rt-feaures-v1-icon rt-shadow rt-1">
            <Image
              src="/service-3-assets/68f2348699aef274cbcbee3e_taskopia-integration-icon-2.svg"
              loading="lazy"
              alt="taskopia-integration-icon-2"
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="rt-feaures-v1-icon-line">
            <Image
              src="/service-3-assets/690888a0007751b90f4a140a_Vector 1587.svg"
              loading="lazy"
              alt=""
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="rt-feaures-v1-icon rt-shadow rt-2">
            <Image
              src="/service-3-assets/68f23486208c840a16db162e_taskopia-integration-icon-1.svg"
              loading="lazy"
              alt="taskopia-integration-icon-1"
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
        <div className="rt-feaures-v1-top-icon rt-2">
          <div
            data-w-id="87693453-cb6f-15d8-f9b9-6e8d41dc38fa"
            className="rt-feaures-v1-icon rt-shadow rt-1">
            <Image
              src="/service-3-assets/68f2348662af5d1784a5246b_taskopia-integration-icon-7.svg"
              loading="lazy"
              alt="taskopia-integration-icon-7"
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="rt-feaures-v1-icon-line rt-overflow-hidden">
            <Image
              src="/service-3-assets/690888a0007751b90f4a140a_Vector 1587.svg"
              loading="lazy"
              data-w-id="87693453-cb6f-15d8-f9b9-6e8d41dc38fd"
              alt=""
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
          <div
            data-w-id="87693453-cb6f-15d8-f9b9-6e8d41dc38fe"
            className="rt-feaures-v1-icon rt-shadow rt-2">
            <Image
              src="/service-3-assets/68f234867a335089a7a018ec_taskopia-integration-icon-6.svg"
              loading="lazy"
              alt="taskopia-integration-icon-6"
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
        <div
          data-w-id="d52146fe-cbab-c032-4bd3-c4ce5802bc7b"
          className="rt-small-btn-main rt-feaures-v1-icon-animatiom">
          <div className="rt-feaures-v1-icon rt-shadow rt-5">
            <Image
              src="/service-3-assets/68f234862949c40075dc6633_taskopia-integration-icon-5.svg"
              loading="lazy"
              alt="taskopia-integration-icon-5"
              width={800} height={800} style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
      </section>
    </>
  );
}
