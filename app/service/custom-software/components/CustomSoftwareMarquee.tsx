'use client';
import React from 'react';
import Image from "next/image";
import { CustomSoftwareMarqueeLogo } from '@/backend/services/services/services.types';

interface CustomSoftwareMarqueeProps {
  logos?: CustomSoftwareMarqueeLogo[];
}

const DEFAULT_LOGOS: CustomSoftwareMarqueeLogo[] = [
  { src: '/service-2-assets/68ef27127d946b9cb9fdcbce_logo.svg', alt: 'Partner 1', width: 100, height: 40 },
  { src: '/service-2-assets/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg', alt: 'Partner 2', width: 200, height: 80 },
  { src: '/service-2-assets/68ef2712f0df798d907c8c07_Group 1597884747.svg', alt: 'Partner 3', width: 200, height: 80 },
  { src: '/service-2-assets/68ef27122b527a12c7a225a7_Group 1597883493.svg', alt: 'Partner 4', width: 200, height: 80 },
  { src: '/service-2-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg', alt: 'Partner 5', width: 200, height: 80 },
  { src: '/service-2-assets/68ef271276a33d103013fa46_Group 1597884750.svg', alt: 'Partner 6', width: 200, height: 80 },
];

export default function CustomSoftwareMarquee({ logos = DEFAULT_LOGOS }: CustomSoftwareMarqueeProps) {
  const activeLogos = logos && logos.length > 0 ? logos : DEFAULT_LOGOS;

  return (
    <div
      data-w-id="924a3615-fd4e-4a46-9185-b144b8427f84"
      className="rt-marquee-v2">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-text-marquee-wrapper rt-overflow-hidden">
          <div className="rt-text-marquee-train">
            {activeLogos.map((logo, idx) => (
              <div key={`t1-${idx}`} className="rt-text-marquee-iteme">
                <Image
                  src={logo.src}
                  loading="lazy"
                  width={logo.width || 150}
                  alt={logo.alt || `Client Logo ${idx + 1}`}
                  height={logo.height || 60}
                  style={{ height: "30px", width: "auto" }}
                />
              </div>
            ))}
          </div>
          <div className="rt-text-marquee-train">
            {activeLogos.map((logo, idx) => (
              <div key={`t2-${idx}`} className="rt-text-marquee-iteme">
                <Image
                  src={logo.src}
                  loading="lazy"
                  width={logo.width || 150}
                  alt={logo.alt || `Client Logo ${idx + 1}`}
                  height={logo.height || 60}
                  style={{ height: "30px", width: "auto" }}
                />
              </div>
            ))}
          </div>
          <div className="rt-text-marquee-train">
            {activeLogos.map((logo, idx) => (
              <div key={`t3-${idx}`} className="rt-text-marquee-iteme">
                <Image
                  src={logo.src}
                  loading="lazy"
                  width={logo.width || 150}
                  alt={logo.alt || `Client Logo ${idx + 1}`}
                  height={logo.height || 60}
                  style={{ height: "30px", width: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rt-marquee-bottom-line"></div>
    </div>
  );
}
