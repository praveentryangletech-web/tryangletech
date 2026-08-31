'use client';
import React from 'react';
import Image from "next/image";
import { CustomSoftwareServicesSection } from '@/backend/services/services/services.types';

interface CustomSoftwareServicesProps {
  data?: CustomSoftwareServicesSection;
}

export default function CustomSoftwareServices({ data }: CustomSoftwareServicesProps) {
  const subBadgeText = data?.subBadgeText || 'our services';
  const headline = data?.headline || 'Custom software solutions built to fit your business';
  const description =
    data?.description ||
    'From enterprise ERP and CRM systems to automated HRMS and scalable SaaS products, we build mission-critical software.';
  const cards = data?.cards || [];
  const images = data?.images || [];

  const c1 = cards[0] || {
    title: 'Enterprise ERP Systems',
    desc: 'Unified management software connecting inventory, supply chain, automated invoicing, departmental accounting, and real-time operational reporting.',
    icon: '/service-2-assets/69099fe756beabe4238c7528_clipboard (1) 1.svg',
  };
  const c2 = cards[1] || {
    title: 'CRM & Sales Platforms',
    desc: 'Custom CRM portals engineered to streamline sales pipelines, automate lead capture, track customer interactions, and provide revenue forecasting.',
    icon: '/service-2-assets/69099fe7ba9794ca9c0b34c5_database (1) 2.svg',
  };
  const c3 = cards[2] || {
    title: 'HRMS & Payroll Software',
    desc: 'Automated payroll calculation, biometric attendance sync, employee leave tracking, appraisal workflows, and self-service portals.',
    icon: '/service-2-assets/69099fe7cf95879c6cb6f865_lock (2) 1.svg',
  };
  const c4 = cards[3] || {
    title: 'SaaS & Custom Web Apps',
    desc: 'Multi-tenant cloud applications with automated subscription billing, role-based access control, secure REST/GraphQL APIs, and real-time dashboards.',
    icon: '/service-2-assets/69099fe7e885083e2015cd2c_activity 2.svg',
  };

  const img1 = images[0] || '/service-2-assets/69132a3fea5303d0e305dc91_service v3.webp';
  const img2 = images[1] || '/service-2-assets/691d87288f25a14bb8d7352e_taskopiya-service-two-task.webp';
  const img3 = images[2] || '/service-2-assets/69132a3fea5303d0e305dc91_service v3.webp';
  const img4 = images[3] || '/service-2-assets/69132a3f107f32facf60e873_service v4.webp';

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
                {/* 1. ERP */}
                <div data-w-id="1a8d5714-24ea-0413-c567-0c28706d6e08" className="rt-services-v2-left-inner">
                  <div className="rt-services-v2-left-top">
                    <div className="rt-services-v2-left-inner-icon">
                      <Image
                        src={c1.icon || "/service-2-assets/69099fe756beabe4238c7528_clipboard (1) 1.svg"}
                        loading="lazy"
                        alt=""
                        width={800}
                        height={800}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="rt-services-v2-text">
                      <div><div className="rt-text-style-h6 rt-text-color-white">{c1.title}</div></div>
                    </div>
                  </div>
                  <div className="rt-services-v2-left-bottom rt-one">
                    <div className="rt-services-v2-left-bottom-inner rt-one">
                      <p className="rt-color-pale-periwinkle rt-gap-off">{c1.desc}</p>
                    </div>
                  </div>
                </div>

                {/* 2. CRM */}
                <div data-w-id="f95f31c2-b898-fd53-d3d3-42195bc71a02" className="rt-services-v2-left-inner">
                  <div className="rt-services-v2-left-top">
                    <div className="rt-services-v2-left-inner-icon">
                      <Image
                        src={c2.icon || "/service-2-assets/69099fe7ba9794ca9c0b34c5_database (1) 2.svg"}
                        loading="lazy"
                        alt=""
                        width={800}
                        height={800}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="rt-services-v2-text">
                      <div><div className="rt-text-style-h6 rt-text-color-white">{c2.title}</div></div>
                    </div>
                  </div>
                  <div className="rt-services-v2-left-bottom rt-active">
                    <div className="rt-services-v2-left-bottom-inner rt-active">
                      <p className="rt-color-pale-periwinkle rt-gap-off">{c2.desc}</p>
                    </div>
                  </div>
                </div>

                {/* 3. HRMS */}
                <div data-w-id="929b6238-8258-e672-50f9-8fbd2adf3cae" className="rt-services-v2-left-inner">
                  <div className="rt-services-v2-left-top">
                    <div className="rt-services-v2-left-inner-icon">
                      <Image
                        src={c3.icon || "/service-2-assets/69099fe7cf95879c6cb6f865_lock (2) 1.svg"}
                        loading="lazy"
                        alt=""
                        width={800}
                        height={800}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="rt-services-v2-text">
                      <div><div className="rt-text-style-h6 rt-text-color-white">{c3.title}</div></div>
                    </div>
                  </div>
                  <div className="rt-services-v2-left-bottom rt-two">
                    <div className="rt-services-v2-left-bottom-inner rt-two">
                      <p className="rt-color-pale-periwinkle rt-gap-off">{c3.desc}</p>
                    </div>
                  </div>
                </div>

                {/* 4. SaaS */}
                <div data-w-id="284fe48d-b27f-0da9-2df2-0d2682d30174" className="rt-services-v2-left-inner">
                  <div className="rt-services-v2-left-top">
                    <div className="rt-services-v2-left-inner-icon">
                      <Image
                        src={c4.icon || "/service-2-assets/69099fe7e885083e2015cd2c_activity 2.svg"}
                        loading="lazy"
                        alt=""
                        width={800}
                        height={800}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="rt-services-v2-text">
                      <div><div className="rt-text-style-h6 rt-text-color-white">{c4.title}</div></div>
                    </div>
                  </div>
                  <div className="rt-services-v2-left-bottom rt-three">
                    <div className="rt-services-v2-left-bottom-inner rt-three">
                      <p className="rt-color-pale-periwinkle rt-gap-off">{c4.desc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div data-w-id="efc1e74b-43a5-b6db-7cd1-10d908e9d225" className="rt-services-v2-right">
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
                  height={800}
                  alt="taskopiya-service-two-task"
                  className="rt-services-v2-two"
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
  );
}
