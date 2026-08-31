'use client';
import React from 'react';
import Image from "next/image";
import ScrollTextReveal from "../../../common/ScrollTextReveal";
import { GraphicsDesigningTestimonialsSection } from "@/backend/services/services/services.types";

interface GraphicsDesigningTestimonialProps {
  data?: GraphicsDesigningTestimonialsSection;
}

export default function GraphicsDesigningTestimonial({ data }: GraphicsDesigningTestimonialProps) {
  const subBadgeText = data?.subBadgeText || "our testimonials";
  const headline = data?.headline || "Customer experiences that speak for themselves";
  const testimonials = data?.testimonials && data.testimonials.length > 0 ? data.testimonials : [
    {
      id: '1',
      authorName: 'Rebecca Lin',
      authorRole: '',
      clientImage: '/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp',
      rating: 5,
      comment: '“This tool transformed how our team works! Tasks are organized, deadlines are clear, and collaboration is smoother than ever. Productivity has never been this high.”',
    },
    {
      id: '2',
      authorName: 'Jonathan Keller',
      authorRole: '',
      clientImage: '/service-2-assets/6900857a13043eba725f30ef_kloudera-home-one-testimonial-client-image.webp',
      rating: 5,
      comment: '“An absolute game-changer for project management. We can track progress in real-time, avoid delays, and deliver projects on schedule with less stress.”',
    },
    {
      id: '3',
      authorName: 'Mark Wilson',
      authorRole: '',
      clientImage: '/service-2-assets/6900857a13043eba725f30f0_kloudera-home-one-testimonila-client-image.webp',
      rating: 5,
      comment: '“Simple, intuitive, and powerful—our team now manages tasks without confusion. It keeps everyone aligned and helps us achieve more in less time.”',
    },
  ];

  return (
    <>
      <div className="rt-position-relative">
        <section
          data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e67"
          className="rt-testimonial-v2">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-overflow-hidden">
              <div className="w-layout-hflex rt-our-benefits-heading">
                <div className="rt-testimonial-v2-heading-wrap rt-desktop-text-center rt-heading-bottom-gap">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e6d"
                      className="rt-sub-text rt-sub-gredient">
                      {subBadgeText}
                    </div>
                  </div>
                  <ScrollTextReveal
                    text={headline}
                    align="center"
                  />
                </div>
              </div>
              <div
                data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e73"
                className="w-layout-hflex rt-testimonial-v2-card-main rt-overflow-hidden rt-position-relative">
                {[1, 2, 3].map((train) => (
                  <div key={train} className="rt-testimonial-v2-marquee-train">
                    {testimonials.map((t, idx) => (
                      <div
                        key={`${train}-${t.id || idx}`}
                        className={`w-layout-vflex rt-testimonials-v2-item rt-overflow-hidden`}>
                        <div className={`rt-testimonial-v2-author-main ${idx > 0 ? 'rt-agp-20 rt-padding-40' : 'rt-position-relative'}`}>
                          <div className="rt-testimonial-v3-client-wrap">
                            <Image
                              width={55}
                              height={55}
                              alt={t.authorName || "testimonial-client"}
                              src={t.clientImage || "/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp"}
                              loading="lazy"
                              className="rt-auto-fit rt-desktop-image-full-width"
                            />
                          </div>
                          <div className={`w-layout-vflex rt-testimonial-v3-client-details`}>
                            <div className="rt-testimonial-star">
                              <Image
                                width={91}
                                height={91}
                                alt=""
                                src="/service-2-assets/6900857a13043eba725f30ee_kloudera-home-one-testimonial-star.svg"
                                loading="lazy"
                                className="rt-height-auto"
                              />
                            </div>
                            <div className="rt-text-style-h6">
                              <div>
                                <span className="rt-color-blue-yonder">By</span>{" "}
                                {t.authorName}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-layout-vflex rt-testimonial-v2-content-wrap rt-mobile-text-center rt-position-relative">
                          {t.authorRole && <div className="rt-text-style-h6">{t.authorRole}</div>}
                          <p className="rt-gap-off">
                            {t.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="rt-testimonial-overlay-v2"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
