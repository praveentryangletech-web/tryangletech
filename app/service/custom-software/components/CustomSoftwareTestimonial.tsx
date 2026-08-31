'use client';
import React from 'react';
import Image from "next/image";
import ScrollTextReveal from '../../../common/ScrollTextReveal';
import { CustomSoftwareTestimonialsSection } from '@/backend/services/services/services.types';

interface CustomSoftwareTestimonialProps {
  data?: CustomSoftwareTestimonialsSection;
}

export default function CustomSoftwareTestimonial({ data }: CustomSoftwareTestimonialProps) {
  const subBadgeText = data?.subBadgeText || 'our testimonials';
  const headline = data?.headline || 'Customer experiences that speak for themselves';
  const items = data?.items || [];

  return (
    <div className="rt-position-relative">
      <section
        data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e67"
        className="rt-testimonial-v2">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-overflow-hidden">
            <div className="w-layout-hflex rt-our-benefits-heading">
              <div className="rt-testimonial-v2-heading-wrap rt-desktop-text-center rt-heading-bottom-gap">
                <div className="rt-sub-gap">
                  <div data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e6d" className="rt-sub-text rt-sub-gredient">
                    {subBadgeText}
                  </div>
                </div>
                <ScrollTextReveal
                  text={headline}
                  align="center"
                />
              </div>
            </div>
            <div data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e73" className="w-layout-hflex rt-testimonial-v2-card-main rt-overflow-hidden rt-position-relative">
              {/* Train 1 */}
              <div className="rt-testimonial-v2-marquee-train">
                {items.map((item, idx) => (
                  <div key={`t1-${item.id || idx}`} className="w-layout-vflex rt-testimonials-v2-item rt-overflow-hidden">
                    <div className="rt-testimonial-v2-author-main rt-position-relative">
                      <div className="rt-testimonial-v3-client-wrap">
                        <Image
                          width={55}
                          height={55}
                          alt={item.name}
                          src={item.avatar || "/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp"}
                          loading="lazy"
                          className="rt-auto-fit rt-desktop-image-full-width"
                        />
                      </div>
                      <div className="w-layout-vflex rt-testimonial-v3-client-details">
                        <div className="rt-testimonial-star">
                          <Image width={91} height={91} alt="5-star rating" src="/service-2-assets/6900857a13043eba725f30ee_kloudera-home-one-testimonial-star.svg" loading="lazy" className="rt-height-auto" />
                        </div>
                        <div className="rt-text-style-h6"><div><span className="rt-color-blue-yonder">By</span>{" "}{item.name}</div></div>
                        {item.role && <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.role}{item.company ? `, ${item.company}` : ''}</div>}
                      </div>
                    </div>
                    <div className="w-layout-vflex rt-testimonial-v2-content-wrap rt-mobile-text-center rt-position-relative">
                      <div className="rt-text-style-h6">&ldquo;{item.quoteTitle}&rdquo;</div>
                      <p className="rt-gap-off">&ldquo;{item.quote}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Train 2 */}
              <div className="rt-testimonial-v2-marquee-train">
                {items.map((item, idx) => (
                  <div key={`t2-${item.id || idx}`} className="w-layout-vflex rt-testimonials-v2-item rt-overflow-hidden">
                    <div className="rt-testimonial-v2-author-main rt-position-relative">
                      <div className="rt-testimonial-v3-client-wrap">
                        <Image
                          width={55}
                          height={55}
                          alt={item.name}
                          src={item.avatar || "/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp"}
                          loading="lazy"
                          className="rt-auto-fit rt-desktop-image-full-width"
                        />
                      </div>
                      <div className="w-layout-vflex rt-testimonial-v3-client-details">
                        <div className="rt-testimonial-star">
                          <Image width={91} height={91} alt="5-star rating" src="/service-2-assets/6900857a13043eba725f30ee_kloudera-home-one-testimonial-star.svg" loading="lazy" className="rt-height-auto" />
                        </div>
                        <div className="rt-text-style-h6"><div><span className="rt-color-blue-yonder">By</span>{" "}{item.name}</div></div>
                        {item.role && <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.role}{item.company ? `, ${item.company}` : ''}</div>}
                      </div>
                    </div>
                    <div className="w-layout-vflex rt-testimonial-v2-content-wrap rt-mobile-text-center rt-position-relative">
                      <div className="rt-text-style-h6">&ldquo;{item.quoteTitle}&rdquo;</div>
                      <p className="rt-gap-off">&ldquo;{item.quote}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Train 3 */}
              <div className="rt-testimonial-v2-marquee-train">
                {items.map((item, idx) => (
                  <div key={`t3-${item.id || idx}`} className="w-layout-vflex rt-testimonials-v2-item rt-overflow-hidden">
                    <div className="rt-testimonial-v2-author-main rt-position-relative">
                      <div className="rt-testimonial-v3-client-wrap">
                        <Image
                          width={55}
                          height={55}
                          alt={item.name}
                          src={item.avatar || "/service-2-assets/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp"}
                          loading="lazy"
                          className="rt-auto-fit rt-desktop-image-full-width"
                        />
                      </div>
                      <div className="w-layout-vflex rt-testimonial-v3-client-details">
                        <div className="rt-testimonial-star">
                          <Image width={91} height={91} alt="5-star rating" src="/service-2-assets/6900857a13043eba725f30ee_kloudera-home-one-testimonial-star.svg" loading="lazy" className="rt-height-auto" />
                        </div>
                        <div className="rt-text-style-h6"><div><span className="rt-color-blue-yonder">By</span>{" "}{item.name}</div></div>
                        {item.role && <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.role}{item.company ? `, ${item.company}` : ''}</div>}
                      </div>
                    </div>
                    <div className="w-layout-vflex rt-testimonial-v2-content-wrap rt-mobile-text-center rt-position-relative">
                      <div className="rt-text-style-h6">&ldquo;{item.quoteTitle}&rdquo;</div>
                      <p className="rt-gap-off">&ldquo;{item.quote}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
