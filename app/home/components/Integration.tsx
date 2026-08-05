"use client";
import React, { useEffect, useRef, useState } from 'react';
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

export default function Integration() {
  const [isVisible, setIsVisible] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2 });

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rt-integration-v1 rt-overflow-hidden">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-our-benefits-heading rt-heading-bottom-gap">
          <div
            data-w-id="938155cb-3e23-0427-eb61-f0e0e334e534"
            style={{ "opacity": "0" }}
            className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">integration</div>
          </div>
          <h2
            data-w-id="938155cb-3e23-0427-eb61-f0e0e334e537"
            style={{ "opacity": "0" }}
            className="rt-gap-off rt-desktop-text-center">
            Seamless teamwork, smarter tasks,
            <span className="rt-color-periwinkle-gray">better outcomes</span>
          </h2>
        </div>
        <div
          data-w-id="9f1e9f9b-80b7-3274-d862-dfd856e9ef3b"
          className="rt-integration-v1-wrap">
          <div
            style={{ "transform": "translate3d(0px, 0px, 0px) scale3d(0.4, 0.4, 1)\n                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)", "transformStyle": "preserve-3d", "border": "none" }}
            className="rt-integration-v1-logo">
            <div className="rt-width-full">
              <Image
                src="/favicon.png"
                loading="lazy"
                width={100}
                height={100}
                alt="Company Logo"
                className="rt-height-auto" />
            </div>
          </div>
          <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-1">
            <div>
              <Image
                src="/tech-icons/react.svg"
                loading="lazy"
                width={19}
                alt="React logo" height={800} />
            </div>
          </div>
          <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-2">
            <div>
              <Image
                src="/tech-icons/nextdotjs.svg"
                loading="lazy"
                width={19}
                alt="Next.js logo" height={800} />
            </div>
          </div>
          <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-3">
            <div>
              <Image
                src="/tech-icons/wordpress.svg"
                loading="lazy"
                width={19}
                alt="WordPress logo" height={800} />
            </div>
          </div>
          <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-4">
            <div>
              <Image
                src="/tech-icons/laravel.svg"
                loading="lazy"
                width={19}
                alt="Laravel logo" height={800} />
            </div>
          </div>
          <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-5">
            <div>
              <Image
                src="/tech-icons/php.svg"
                loading="lazy"
                width={19}
                alt="PHP logo" height={800} />
            </div>
          </div>
          <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-6">
            <div>
              <Image
                src="/tech-icons/postgresql.svg"
                loading="lazy"
                width={19}
                alt="PostgreSQL logo" height={800} />
            </div>
          </div>
          <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-7">
            <div>
              <Image
                src="/tech-icons/mysql.svg"
                loading="lazy"
                width={19}
                alt="MySQL logo" height={800} />
            </div>
          </div>
          <div style={{ "opacity": "0" }} className="rt-integration-icon-wrap rt-8">
            <div>
              <Image
                src="/tech-icons/mongodb.svg"
                loading="lazy"
                width={19}
                alt="MongoDB logo" height={800} />
            </div>
          </div>

          {/* SVG Lines for the 4 New Icons (Vertical and Horizontal Cross) */}
          <svg
            ref={svgRef}
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              pointerEvents: "none",
              clipPath: isVisible ? 'inset(-20% -20% -20% -20%)' : 'inset(50% 50% 50% 50%)',
              WebkitClipPath: isVisible ? 'inset(-20% -20% -20% -20%)' : 'inset(50% 50% 50% 50%)',
              transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, -webkit-clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
            }}
          >
            <style>
              {`
                .flow-line {
                  stroke: #A7B0CB;
                  stroke-width: 1.5px;
                  stroke-dasharray: 5 5;
                  fill: none;
                  vector-effect: non-scaling-stroke;
                }
              `}
            </style>
            {/* Center to Top */}
            <path d="M 500 500 L 500 -200" className="flow-line" />
            {/* Center to Bottom */}
            <path d="M 500 500 L 500 1200" className="flow-line" />
            {/* Center to Far Left */}
            <path d="M 500 500 L -200 500" className="flow-line" />
            {/* Center to Far Right */}
            <path d="M 500 500 L 1200 500" className="flow-line" />
          </svg>

          {/* 4 New Icons positioned perfectly on the vertical and horizontal axes */}
          {/* Top Center Icon (Swift) */}
          <div style={{ opacity: isVisible ? "1" : "0", inset: "-15% 0% auto 0%", margin: "0 auto", transition: "opacity 0.8s ease-out 0.6s" }} className="rt-integration-icon-wrap">
            <div>
              <Image src="/tech-icons/swift.svg" loading="lazy" width={19} height={800} alt="Swift logo" />
            </div>
          </div>
          {/* Bottom Center Icon (Figma) */}
          <div style={{ opacity: isVisible ? "1" : "0", inset: "auto 0% -15% 0%", margin: "0 auto", transition: "opacity 0.8s ease-out 0.6s" }} className="rt-integration-icon-wrap">
            <div>
              <Image src="/tech-icons/figma.svg" loading="lazy" width={19} height={800} alt="Figma logo" />
            </div>
          </div>
          {/* Far Left Center Icon (Flutter) */}
          <div style={{ opacity: isVisible ? "1" : "0", inset: "0% auto 0% -15%", margin: "auto 0", transition: "opacity 0.8s ease-out 0.6s" }} className="rt-integration-icon-wrap">
            <div>
              <Image src="/tech-icons/flutter.svg" loading="lazy" width={19} height={800} alt="Flutter logo" />
            </div>
          </div>
          {/* Far Right Center Icon (Kotlin) */}
          <div style={{ opacity: isVisible ? "1" : "0", inset: "0% -15% 0% auto", margin: "auto 0", transition: "opacity 0.8s ease-out 0.6s" }} className="rt-integration-icon-wrap">
            <div>
              <Image src="/tech-icons/kotlin.svg" loading="lazy" width={19} height={800} alt="Kotlin logo" />
            </div>
          </div>
          <div
            className="rt-integration-v1-line-1 rt-overflow-hidden"
            style={{ "width": "0%" }}>
            <div className="rt-right">
              <Image
                src="/Taskopia_files/68f23486e9eb825f40892060_taskopia-integration-line-left.png"
                loading="lazy"
                width={455}
                sizes="(max-width: 479px) 100vw, 455px"
                alt="taskopia-integration-line-left"
                srcSet="
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486e9eb825f40892060_taskopia-integration-line-left-p-500.png 500w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486e9eb825f40892060_taskopia-integration-line-left-p-800.png 800w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486e9eb825f40892060_taskopia-integration-line-left.png       910w
                  "
                className="rt-integration-v1-line-right" height={800} />
            </div>
          </div>
          <div
            className="w-layout-hflex rt-integration-v1-line-2 rt-overflow-hidden"
            style={{ "width": "0%" }}>
            <div className="rt-left rt-overflow-hidden">
              <Image
                src="/Taskopia_files/68f23486248de9bce386d338_taskopia-integration-line-right.png"
                loading="lazy"
                width={456}
                sizes="(max-width: 479px) 100vw, 456px"
                alt="taskopia-integration-line-right"
                srcSet="
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486248de9bce386d338_taskopia-integration-line-right-p-500.png 500w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486248de9bce386d338_taskopia-integration-line-right-p-800.png 800w,
                    https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/68f23486248de9bce386d338_taskopia-integration-line-right.png       911w
                  "
                className="rt-integration-v1-line-right" height={800} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
