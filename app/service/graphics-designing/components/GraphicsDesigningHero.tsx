'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function GraphicsDesigningHero() {
  return (
    <>
      <section className="rt-hero-v6 rt-position-relative">
        <div className="w-layout-blockcontainer rt-container-extra-large rt-position-relative w-container">
          <div className="rt-hero-v6-top rt-desktop-text-center">
            {/* Live badge pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4f46e5', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Creative Studio · Ahmedabad</span>
            </div>
            <div
              data-w-id="5f8f0865-2834-ece3-646d-4bbca5ea2ed1"
              className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">Graphic Design Services</div>
            </div>
            <div className="rt-hero-heading-gap">
              <h1
                data-w-id="5f8f0865-2834-ece3-646d-4bbca5ea2ed4"
                className="rt-gap-off">
                Designs that make your brand{" "}
                <span style={{ background: 'linear-gradient(90deg, #4f46e5, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>impossible to ignore</span>
              </h1>
            </div>
            <p
              data-w-id="e2966c08-e2ab-594a-a52e-ff609081dee0"
              className="rt-padding-hero-v6 rt-gap-off">
              Tryangletech's design team crafts stunning logos, brand identities, marketing materials, and digital visuals — helping Ahmedabad businesses stand out, build trust, and convert more customers.
            </p>
            <div
              data-w-id="ff501147-2773-073a-9913-6a1e6a9362a7"
              className="w-layout-hflex rt-hero-v7-button-wrap">
              <Link
                data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                href="/contact"
                className="rt-button-body w-inline-block">
                <div className="rt-button-text">Start your project</div>
                <div className="rt-button-body-overlay"></div>
              </Link>
              <Link
                data-wf--rt-border-button--variant="base"
                data-w-id="9067a903-cf07-9614-de57-af0aba677203"
                href="/portfolio"
                className="rt-button-body rt-nav-btn w-inline-block">
                <div className="rt-button-text rt-btn-color-nav">
                  View our work
                </div>
                <div className="rt-button-body-overlay rt-nav-overlay"></div>
              </Link>
            </div>
            {/* Stats row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a0b54' }}>500+</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>Projects Delivered</div>
              </div>
              <div style={{ width: '1px', background: '#e5e7eb', alignSelf: 'stretch' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a0b54' }}>200+</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>Brands Elevated</div>
              </div>
              <div style={{ width: '1px', background: '#e5e7eb', alignSelf: 'stretch' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a0b54' }}>99.9%</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="rt-hero-v6-main">
            <div
              data-w-id="bd3b7318-15d0-e2b5-9880-c5981ed75446"
              className="rt-hero-v6-item rt-shadow rt-border-radius-medium">
              <Image
                src="/portfolio/graphic-shrahav.webp"
                loading="lazy"
                alt="Graphic Design - Brand Identity Work"
                width={800} height={800} style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="rt-hero-v6-item rt-two">
              <div
                data-w-id="8a73aa12-aaae-22a9-3807-2177d3e35b77"
                className="rt-hero-v6-iteminner-blue">
                <Image
                  src="/portfolio/graphic-eoffice.webp"
                  loading="lazy"
                  data-w-id="502bd2f6-e7d7-3b1c-3d3c-6b704526a51e"
                  alt="Graphic Design - eOffice Branding"
                  className="rt-shadow rt-border-radius-medium rt-roted"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="b420372a-e374-20ab-e360-50783cf6b4e2"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src="/portfolio/graphic-sasa.webp"
                  loading="lazy"
                  alt="Graphic Design - SASA Brand"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
            <div className="rt-hero-v6-item rt-two">
              <div
                data-w-id="d180a0b5-6463-e458-42bb-33822b1d9d64"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src="/portfolio/graphic-greenpackwell.gif"
                  loading="lazy"
                  alt="Graphic Design - Greenpackwell"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="13027e95-e993-2169-a200-5ecf19604de4"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src="/portfolio/graphic-1.webp"
                  loading="lazy"
                  alt="Graphic Design Portfolio Work"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
            <div className="rt-hero-v6-item rt-two rt-position-relative">
              <div
                data-w-id="90837caa-3eb0-4fd9-23ef-fb0932652d00"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src="/portfolio/graphic-uttarayan.gif"
                  loading="lazy"
                  alt="Graphic Design - Uttarayan"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="328df24a-1ed6-afc3-bcce-1b0c86d62c01"
                className="rt-shadow rt-border-radius-medium">
                <Image
                  src="/portfolio/7d-design-studios.webp"
                  loading="lazy"
                  alt="7D Design Studios"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
              <div
                data-w-id="d4fa10a8-991b-7efd-da13-e37ad20b1b7f"
                className="rt-hero-v6-item-inner">
                <Image
                  src="/portfolio/tattvam-arts.webp"
                  loading="lazy"
                  alt="Tattvam Arts - Graphic Design"
                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
        <div
          data-w-id="924a3615-fd4e-4a46-9185-b144b8427f84"
          className="rt-marquee-v2">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-text-marquee-wrapper rt-overflow-hidden">
              <div className="rt-text-marquee-train">
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef27127d946b9cb9fdcbce_logo.svg"
                    loading="lazy"
                    width={100}
                    alt=""
                    height={40} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef271276a33d103013fa46_Group 1597884750.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
              </div>
              <div className="rt-text-marquee-train">
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef27127d946b9cb9fdcbce_logo.svg"
                    loading="lazy"
                    width={100}
                    alt=""
                    height={40} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef271276a33d103013fa46_Group 1597884750.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
              </div>
              <div className="rt-text-marquee-train">
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef27127d946b9cb9fdcbce_logo.svg"
                    loading="lazy"
                    width={100}
                    alt=""
                    height={40} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712221f1b7f58cfd9fe_Group 1597884746.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712f0df798d907c8c07_Group 1597884747.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef27122b527a12c7a225a7_Group 1597883493.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef2712bdcf3d7a4fee2f43_REZOTA.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
                <div className="rt-text-marquee-iteme">
                  <Image
                    src="/service-2-assets/68ef271276a33d103013fa46_Group 1597884750.svg"
                    loading="lazy"
                    alt=""
                    width={200} height={80} style={{ height: "30px", width: "auto" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="rt-marquee-bottom-line"></div>
        </div>
        <div className="rt-hero-v6-bg">
          <Image
            src="/service-2-assets/69142d3301921d8eace15477_home three hero.webp"
            loading="lazy"
            alt="home three hero"
            width={800} height={800} style={{ width: "100%", height: "auto" }} />
        </div>
      </section>
    </>
  );
}
