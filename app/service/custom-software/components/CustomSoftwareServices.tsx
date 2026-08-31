'use client';
import React from 'react';
import Image from "next/image";
import { CustomSoftwareServicesSection } from '@/backend/services/services/services.types';

interface CustomSoftwareServicesProps {
  data?: CustomSoftwareServicesSection;
}

const DEFAULT_RIGHT_IMAGES = [
  '/service-2-assets/69132a3fea5303d0e305dc91_service v3.webp',
  '/service-2-assets/691d87288f25a14bb8d7352e_taskopiya-service-two-task.webp',
  '/service-2-assets/69132a3fea5303d0e305dc91_service v3.webp',
  '/service-2-assets/69132a3f107f32facf60e873_service v4.webp',
];

const RIGHT_IMAGE_CLASSES = ['rt-services-v2-one', 'rt-services-v2-two', 'rt-services-v2-three', 'rt-services-v2-four'];
const BOTTOM_CLASSES = ['rt-one', 'rt-active', 'rt-two', 'rt-three'];

export default function CustomSoftwareServices({ data }: CustomSoftwareServicesProps) {
  const subBadgeText = data?.subBadgeText || 'our services';
  const headline = data?.headline || 'Custom software solutions built to fit your business';
  const description =
    data?.description ||
    'From enterprise ERP and CRM systems to automated HRMS and scalable SaaS products, we build mission-critical software.';
  const cards = data?.cards || [];
  const images = data?.images && data.images.length > 0 ? data.images : DEFAULT_RIGHT_IMAGES;

  return (
    <section className="rt-services-v2">
      <div className="w-layout-blockcontainer rt-container-extra-large w-container">
        <div className="rt-services-v2-contanner rt-overflow-hidden">
          <div className="rt-services-v2-wrapper">
            <div className="rt-services-v2-wrap">
              <div id="w-node-f74def95-767b-a89b-08a5-953ba5c723f4-20952722" className="rt-service-v2-top">
                <div className="rt-services-v2-top-left">
                  <div data-w-id="f74def95-767b-a89b-08a5-953ba5c723f5" className="rt-sub-gap">
                    <div className="rt-sub-text">{subBadgeText}</div>
                  </div>
                  <h2 data-w-id="f74def95-767b-a89b-08a5-953ba5c723f8" className="rt-gap-off rt-text-color-white">
                    {headline}
                  </h2>
                </div>
                <p data-w-id="03f01ed3-f9d4-a771-a9d5-5fac199e2fda" className="rt-service-v2-para rt-color-pale-periwinkle">
                  {description}
                </p>
              </div>
              <div data-w-id="c0c4a8e7-880b-9538-1fa6-397d2055142c" className="rt-services-v2-left">
                {cards.map((card, idx) => {
                  const bottomClass = BOTTOM_CLASSES[idx % BOTTOM_CLASSES.length];
                  return (
                    <div key={card.id || idx} data-w-id={`service-card-${idx}`} className="rt-services-v2-left-inner">
                      <div className="rt-services-v2-left-top">
                        <div className="rt-services-v2-left-inner-icon">
                          <Image
                            src={card.icon || "/service-2-assets/69099fe756beabe4238c7528_clipboard (1) 1.svg"}
                            loading="lazy"
                            alt={card.title}
                            width={48}
                            height={48}
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                        <div className="rt-services-v2-text">
                          <div><div className="rt-text-style-h6 rt-text-color-white">{card.title}</div></div>
                        </div>
                      </div>
                      <div className={`rt-services-v2-left-bottom ${bottomClass}`}>
                        <div className={`rt-services-v2-left-bottom-inner ${bottomClass}`}>
                          <p className="rt-color-pale-periwinkle rt-gap-off">{card.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div data-w-id="efc1e74b-43a5-b6db-7cd1-10d908e9d225" className="rt-services-v2-right">
                {images.map((imgUrl, idx) => {
                  const className = RIGHT_IMAGE_CLASSES[idx] || `rt-services-v2-four`;
                  const cardTitle = cards[idx]?.title || `Service Layer ${idx + 1}`;
                  return (
                    <Image
                      key={idx}
                      src={imgUrl || DEFAULT_RIGHT_IMAGES[idx] || DEFAULT_RIGHT_IMAGES[0]}
                      loading={idx === 0 || idx === 2 ? "eager" : "lazy"}
                      alt={`${cardTitle} showcase graphic`}
                      className={className}
                      width={idx === 1 ? 847 : 800}
                      height={800}
                      style={{ width: "100%", height: "auto" }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
