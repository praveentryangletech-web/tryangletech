"use client";
import React, { useEffect, useRef } from 'react';
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

export default function Integration() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let rafId: number;

    const syncToWebflow = () => {
      // Watch the Webflow-animated PNG line to get progress (0% -> 100%)
      const lineEl = document.querySelector('.rt-integration-v1-line-1') as HTMLElement;
      const svg = svgRef.current;
      const clipRect = svg?.getElementById('reveal-rect') as SVGRectElement | null;
      if (!lineEl || !svg || !clipRect) {
        rafId = requestAnimationFrame(syncToWebflow);
        return;
      }

      const widthStr = lineEl.style.width || '0%';
      // progress: 0 = hidden, 1 = fully drawn
      let progress = 0;
      if (widthStr.endsWith('%')) {
        progress = parseFloat(widthStr) / 100;
      } else if (widthStr.endsWith('px')) {
        progress = parseFloat(widthStr) / 455;
      }
      progress = Math.min(Math.max(progress, 0), 1);

      // Animate clipPath rect: starts as 0-width rect at center (500),
      // expands symmetrically outward to cover the full viewBox (-200 to 1200)
      const halfWidth = progress * 700; // 700 = half of total span 1400
      clipRect.setAttribute('x', String(500 - halfWidth));
      clipRect.setAttribute('width', String(halfWidth * 2));

      // Fade in the 4 new icons
      document.querySelectorAll('.new-icon-anim').forEach(el => {
        (el as HTMLElement).style.opacity = String(progress);
      });

      rafId = requestAnimationFrame(syncToWebflow);
    };

    rafId = requestAnimationFrame(syncToWebflow);
    return () => cancelAnimationFrame(rafId);
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

          {/* SVG Lines for 4 new icons — dashed lines, drawn from center outward, synced with Webflow */}
          <svg
            ref={svgRef}
            viewBox="-200 -200 1400 1400"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none", overflow: "visible" }}
          >
            <defs>
              {/* clipPath rect starts at center width=0, animated via JS to expand outward */}
              <clipPath id="center-reveal">
                <rect id="reveal-rect" x="500" y="-200" width="0" height="1400" />
              </clipPath>
            </defs>
            {/* All 4 lines share the same clipPath — reveals symmetrically from center */}
            <g clipPath="url(#center-reveal)">
              {/* Top: straight up from center */}
              <line x1="500" y1="530" x2="500" y2="-100"
                stroke="#A7B0CB" strokeWidth="1.5" strokeDasharray="6 6" fill="none"
                style={{ vectorEffect: 'non-scaling-stroke' }} />
              {/* Bottom: straight down from center */}
              <line x1="500" y1="530" x2="500" y2="1100"
                stroke="#A7B0CB" strokeWidth="1.5" strokeDasharray="6 6" fill="none"
                style={{ vectorEffect: 'non-scaling-stroke' }} />
              {/* Left: straight left from center */}
              <line x1="500" y1="530" x2="-100" y2="530"
                stroke="#A7B0CB" strokeWidth="1.5" strokeDasharray="6 6" fill="none"
                style={{ vectorEffect: 'non-scaling-stroke' }} />
              {/* Right: straight right from center */}
              <line x1="500" y1="530" x2="1100" y2="530"
                stroke="#A7B0CB" strokeWidth="1.5" strokeDasharray="6 6" fill="none"
                style={{ vectorEffect: 'non-scaling-stroke' }} />
            </g>
          </svg>

          {/* 4 New Icons — fade in synced with Webflow animation via .new-icon-anim */}
          {/* Top Center: Swift — centered horizontally, above section */}
          <div
            className="rt-integration-icon-wrap new-icon-anim"
            style={{ opacity: 0, position: "absolute", top: "-14%", left: "50%", transform: "translateX(-50%)" }}
          >
            <div><Image src="/tech-icons/swift.svg" loading="lazy" width={19} height={800} alt="Swift logo" /></div>
          </div>
          {/* Bottom Center: Figma — centered horizontally, below section */}
          <div
            className="rt-integration-icon-wrap new-icon-anim"
            style={{ opacity: 0, position: "absolute", bottom: "-14%", left: "50%", transform: "translateX(-50%)" }}
          >
            <div><Image src="/tech-icons/figma.svg" loading="lazy" width={19} height={800} alt="Figma logo" /></div>
          </div>
          {/* Far Left: Flutter — aligned to horizontal line at ~53% top */}
          <div
            className="rt-integration-icon-wrap new-icon-anim"
            style={{ opacity: 0, position: "absolute", top: "53%", left: "-14%", transform: "translateY(-50%)" }}
          >
            <div><Image src="/tech-icons/flutter.svg" loading="lazy" width={19} height={800} alt="Flutter logo" /></div>
          </div>
          {/* Far Right: Kotlin — aligned to horizontal line at ~53% top */}
          <div
            className="rt-integration-icon-wrap new-icon-anim"
            style={{ opacity: 0, position: "absolute", top: "53%", right: "-14%", transform: "translateY(-50%)" }}
          >
            <div><Image src="/tech-icons/kotlin.svg" loading="lazy" width={19} height={800} alt="Kotlin logo" /></div>
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
