import React from "react";
import Image from "next/image";
import { DigitalMarketingMarqueeLogo } from "@/backend/services/services/services.types";

interface DigitalMarketingMarqueeProps {
  logos?: DigitalMarketingMarqueeLogo[];
}

const DEFAULT_LOGOS: DigitalMarketingMarqueeLogo[] = [
  { id: "m-1", name: "Logo 1", src: "/Home3_files/68ef27127d946b9cb9fdcbce_logo.svg" },
  { id: "m-2", name: "Logo 2", src: "/Home3_files/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg" },
  { id: "m-3", name: "Logo 3", src: "/Home3_files/68ef2712f0df798d907c8c07_Group 1597884747.svg" },
  { id: "m-4", name: "Logo 4", src: "/Home3_files/68ef27122b527a12c7a225a7_Group 1597883493.svg" },
  { id: "m-5", name: "REZOTA", src: "/Home3_files/68ef2712bdcf3d7a4fee2f43_REZOTA.svg" },
  { id: "m-6", name: "Logo 6", src: "/Home3_files/68ef271276a33d103013fa46_Group 1597884750.svg" },
];

export default function DigitalMarketingMarquee({ logos }: DigitalMarketingMarqueeProps) {
  const activeLogos = logos && logos.length > 0 ? logos : DEFAULT_LOGOS;

  return (
    <div
      data-w-id="0e685500-af9e-bf3f-3f92-da43ea983520"
      className="rt-marquee-v2 rt-hero-v3-marquee"
    >
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-text-marquee-wrapper rt-overflow-hidden">
          {[0, 1, 2].map((trainIdx) => (
            <div
              key={trainIdx}
              className="rt-text-marquee-train"
              style={{
                transform:
                  "translate3d(-8.221%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {activeLogos.map((logo, lIdx) => (
                <div key={`${trainIdx}-${logo.id || lIdx}`} className="rt-text-marquee-iteme">
                  <Image
                    src={logo.src}
                    loading="lazy"
                    alt={logo.name || ""}
                    width={800}
                    height={30}
                    style={{ width: "auto", height: "30px" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="rt-marquee-bottom-line"></div>
    </div>
  );
}
