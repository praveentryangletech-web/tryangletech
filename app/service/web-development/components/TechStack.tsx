'use client';

import React from 'react';
import Image from "next/image";
import { WebDevTechStackSection } from '@/backend/services/services/services.types';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';

export default function WebDevTechStack({ data }: { data?: WebDevTechStackSection }) {
  const techData = data || DEFAULT_WEB_DEV_CONTENT.techStack;
  const items = techData.items || DEFAULT_WEB_DEV_CONTENT.techStack.items;

  return (
    <>
      <style>{`.rt-tag { white-space: nowrap; }`}</style>
      <section className="rt-tools-icon-v1">
        <div className="w-layout-blockcontainer rt-container-extra-large w-container">
          <div className="rt-tools-icon-main rt-overflow-hidden rt-position-relative" >
            <div className="rt-tools-icon-container">
              <div className="rt-tools-iconheading rt-heading-bottom-gap">
                <div
                  data-w-id="129f78ad-f271-7836-05de-3984f045f43c"
                  className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">
                    {techData.subBadgeText || 'Tech Stack'}
                  </div>
                </div>
                <h2
                  data-w-id="129f78ad-f271-7836-05de-3984f045f43f"
                  className="rt-gap-off rt-desktop-text-center">
                  {techData.heading || 'We build with industry-leading modern technologies'}
                </h2>
              </div>
              <div
                data-w-id="129f78ad-f271-7836-05de-3984f045f443"
                className="w-layout-hflex rt-tools-icon-wrapper">
                {items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`w-layout-vflex rt-tools-icon ${idx % 2 === 0 ? 'one' : 'two'}`}
                    style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                  >
                    <div className="rt-tools-icon-image">
                      <img
                        src={item.icon}
                        loading="lazy"
                        alt={item.name}
                        style={{ width: "90px", height: "90px", objectFit: "contain", padding: "12px", boxSizing: "border-box" }}
                      />
                    </div>
                    <div className="w-layout-vflex rt-tools-icon-text">
                      <div className="rt-small-name">{item.name}</div>
                      <div className="rt-tools-icon-text-box">
                        <div className="rt-tag">{item.category}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rt-tools-icon-overlay">
              <Image
                src="/Home3_files/690adbc5bfed3c0fa7e49213_Vector 1530.webp"
                loading="lazy"
                alt="taskopia-home-two-overlay-integration"
                width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

