'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GraphicsDesigningHeroSection } from "@/backend/services/services/services.types";

interface GraphicsDesigningHeroProps {
  data?: GraphicsDesigningHeroSection;
}

export default function GraphicsDesigningHero({ data }: GraphicsDesigningHeroProps) {
  const badgePillText = data?.badgePillText || "Creative Studio · Ahmedabad";
  const subBadgeText = data?.subBadgeText || "Graphic Design Services";
  const headline = data?.headline || "Designs that make your brand";
  const headlineHighlight = data?.headlineHighlight || "impossible to ignore";
  const subheadline =
    data?.subheadline ||
    "Tryangletech's design team crafts stunning logos, brand identities, marketing materials, and digital visuals — helping Ahmedabad businesses stand out, build trust, and convert more customers.";
  const primaryBtnText = data?.primaryBtnText || "Start your project";
  const primaryBtnLink = data?.primaryBtnLink || "/contact";
  const secondaryBtnText = data?.secondaryBtnText || "View our work";
  const secondaryBtnLink = data?.secondaryBtnLink || "/portfolio";

  const stats = data?.stats || [
    { value: '500+', label: 'Projects Delivered' },
    { value: '200+', label: 'Brands Elevated' },
    { value: '99.9%', label: 'Client Satisfaction' },
  ];

  const col1Img1 = data?.images?.col1Img1 || "/portfolio/tattvam-arts.webp";
  const col1Img2 = data?.images?.col1Img2 || "/portfolio/graphic-eoffice.webp";
  const col2Img1 = data?.images?.col2Img1 || "/portfolio/graphic-sasa.webp";
  const col2Img2 = data?.images?.col2Img2 || "/portfolio/makewell-elevators.webp";
  const col3Img1 = data?.images?.col3Img1 || "/portfolio/graphic-greenpackwell.gif";
  const col3Img2 = data?.images?.col3Img2 || "/portfolio/graphic-1.webp";
  const col4Img1 = data?.images?.col4Img1 || "/portfolio/graphic-uttarayan.gif";
  const col4Img2 = data?.images?.col4Img2 || "/portfolio/7d-design-studios.webp";
  const col4Badge = data?.images?.col4Badge || "/service-2-assets/6909cabfeee3a35808ad7eb7_Group 2147225566.webp";
  const col5Img1 = data?.images?.col5Img1 || "/portfolio/graphic-shrahav.webp";
  const col5Img2 = data?.images?.col5Img2 || "/portfolio/varnet-enterprise.webp";
  const bgImage = data?.images?.bgImage || "/service-2-assets/69142d3301921d8eace15477_home three hero.webp";

  const marqueeLogos = data?.marqueeLogos && data.marqueeLogos.length > 0 ? data.marqueeLogos : [
    { id: '1', name: '', src: '/service-2-assets/68ef27127d946b9cb9fdcbce_logo.svg' },
    { id: '2', name: '', src: '/service-2-assets/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg' },
    { id: '3', name: '', src: '/service-2-assets/68ef2712f0df798d907c8c07_Group 1597884747.svg' },
    { id: '4', name: '', src: '/service-2-assets/68ef27122b527a12c7a225a7_Group 1597883493.svg' },
    { id: '5', name: '', src: '/service-2-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg' },
    { id: '6', name: '', src: '/service-2-assets/68ef271276a33d103013fa46_Group 1597884750.svg' },
  ];

  return (
    <>
      <section
        className="rt-hero-v6 rt-position-relative"
        style={{
          position: "relative",
          overflow: "hidden",
          paddingLeft: "clamp(1.25rem, 3.5vw, 3rem)",
          paddingRight: "clamp(1.25rem, 3.5vw, 3rem)",
          paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
          background: "linear-gradient(180deg, rgba(238, 242, 255, 0.7) 0%, rgba(245, 248, 255, 0.85) 45%, rgba(249, 251, 255, 1) 80%, rgba(247, 250, 255, 0.8) 100%)",
        }}>
        <div className="w-layout-blockcontainer rt-container-extra-large rt-position-relative w-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="rt-hero-v6-top rt-desktop-text-center">
            {/* Live badge pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4f46e5', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{badgePillText}</span>
            </div>
            <div
              data-w-id="5f8f0865-2834-ece3-646d-4bbca5ea2ed1"
              className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">{subBadgeText}</div>
            </div>
            <div className="rt-hero-heading-gap">
              <h1
                data-w-id="5f8f0865-2834-ece3-646d-4bbca5ea2ed4"
                className="rt-gap-off">
                {headline}{" "}
                <span style={{ background: 'linear-gradient(90deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{headlineHighlight}</span>
              </h1>
            </div>
            <p
              data-w-id="e2966c08-e2ab-594a-a52e-ff609081dee0"
              className="rt-padding-hero-v6 rt-gap-off">
              {subheadline}
            </p>
            <div
              data-w-id="ff501147-2773-073a-9913-6a1e6a9362a7"
              className="w-layout-hflex rt-hero-v7-button-wrap">
              <Link
                data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                href={primaryBtnLink}
                className="rt-button-body w-inline-block">
                <div className="rt-button-text">{primaryBtnText}</div>
                <div className="rt-button-body-overlay"></div>
              </Link>
              <Link
                data-wf--rt-border-button--variant="base"
                data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                href={secondaryBtnLink}
                className="rt-button-body rt-nav-btn w-inline-block">
                <div className="rt-button-text rt-btn-color-nav">
                  {secondaryBtnText}
                </div>
                <div className="rt-button-body-overlay rt-nav-overlay"></div>
              </Link>
            </div>
            {/* Stats row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              {stats.map((stat, sIdx) => (
                <React.Fragment key={sIdx}>
                  {sIdx > 0 && <div style={{ width: '1px', background: '#e5e7eb', alignSelf: 'stretch' }}></div>}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a0b54' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Animated image grid — uses original Webflow rt-hero-v6-main structure */}
          <div className="rt-hero-v6-main">
            {/* Col 1 — two stacked */}
            <div className="rt-hero-v6-item rt-two">
              <div
                data-w-id="bd3b7318-15d0-e2b5-9880-c5981ed75446"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col1Img1}
                  loading="lazy"
                  alt="Graphic Design - Tattvam Arts"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col1Img2}
                  loading="lazy"
                  alt="Graphic Design - eOffice"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>

            {/* Col 2 — two stacked */}
            <div className="rt-hero-v6-item rt-two">
              <div
                data-w-id="8a73aa12-aaae-22a9-3807-2177d3e35b77"
                className="rt-hero-v6-iteminner-blue">
                <Image
                  src={col2Img1}
                  loading="lazy"
                  data-w-id="502bd2f6-e7d7-3b1c-3d3c-6b704526a51e"
                  alt="Graphic Design - SASA Brand"
                  className="rt-shadow rt-border-radius-medium rt-roted"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="b420372a-e374-20ab-e360-50783cf6b4e2"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col2Img2}
                  loading="lazy"
                  alt="Graphic Design - Makewell Elevators"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>

            {/* Col 3 — two stacked */}
            <div className="rt-hero-v6-item rt-two">
              <div
                data-w-id="d180a0b5-6463-e458-42bb-33822b1d9d64"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col3Img1}
                  loading="lazy"
                  alt="Graphic Design - Greenpackwell"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="13027e95-e993-2169-a200-5ecf19604de4"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col3Img2}
                  loading="lazy"
                  alt="Graphic Design Portfolio Work"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>

            {/* Col 4 — two stacked + floating round badge */}
            <div className="rt-hero-v6-item rt-two rt-position-relative">
              <div
                data-w-id="90837caa-3eb0-4fd9-23ef-fb0932652d00"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col4Img1}
                  loading="lazy"
                  alt="Graphic Design - Uttarayan"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="328df24a-1ed6-afc3-bcce-1b0c86d62c01"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col4Img2}
                  loading="lazy"
                  alt="7D Design Studios"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="d4fa10a8-991b-7efd-da13-e37ad20b1b7f"
                className="rt-hero-v6-item-inner">
                <Image
                  src={col4Badge}
                  loading="lazy"
                  alt="Design badge"
                  width={200} height={200} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>

            {/* Col 5 — two new cards */}
            <div className="rt-hero-v6-item rt-two">
              <div className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col5Img1}
                  loading="lazy"
                  alt="Graphic Design - Shrahav Brand"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div className="rt-shadow rt-border-radius-medium">
                <Image
                  src={col5Img2}
                  loading="lazy"
                  alt="Graphic Design - Varnet Enterprise"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Marquee — brand logos ticker seamlessly integrated inside the hero canvas */}
        <div
          data-w-id="924a3615-fd4e-4a46-9185-b144b8427f84"
          className="rt-marquee-v2"
          style={{
            width: "100%",
            marginTop: "clamp(3rem, 6vw, 5rem)",
            marginBottom: 0,
            background: "transparent",
            position: "relative",
            zIndex: 3,
            overflow: "hidden",
          }}>
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-text-marquee-wrapper rt-overflow-hidden">
              {[1, 2, 3].map((train) => (
                <div key={train} className="rt-text-marquee-train">
                  {marqueeLogos.map((logo, lIdx) => (
                    <div key={`${train}-${logo.id || lIdx}`} className="rt-text-marquee-iteme">
                      <Image
                        src={logo.src}
                        loading="lazy"
                        alt={logo.name || ""}
                        width={200}
                        height={80}
                        style={{ height: "30px", width: "auto" }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero background image with multiply blend mode to eliminate white corners */}
        <div
          className="rt-hero-v6-bg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
            mixBlendMode: "multiply",
            pointerEvents: "none",
            zIndex: 0,
          }}>
          <Image
            src={bgImage}
            loading="lazy"
            alt="hero background"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "top center", mixBlendMode: "multiply" }} />
        </div>
      </section>
    </>
  );
}
