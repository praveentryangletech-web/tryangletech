'use client';

import React from 'react';
import Image from 'next/image';
import { ServiceTestimonialItem } from '@/backend/services/services/services.types';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';

interface ServiceDynamicTestimonialsProps {
  testimonials?: ServiceTestimonialItem[];
}

export default function ServiceDynamicTestimonials({ testimonials: propTestimonials }: ServiceDynamicTestimonialsProps) {
  const testimonials = propTestimonials && propTestimonials.length > 0 ? propTestimonials : DEFAULT_SERVICE_MAIN_CONTENT.testimonials;

  return (
    <div className="rt-position-relative">
      <section
        data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e67"
        className="rt-testimonial-v2"
      >
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-overflow-hidden">
            <div className="w-layout-hflex rt-our-benefits-heading">
              <div className="rt-testimonial-v2-heading-wrap rt-desktop-text-center rt-heading-bottom-gap">
                <div className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">
                    our testimonials
                  </div>
                </div>
                <h2
                  data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e6f"
                  className="rt-gap-off"
                >
                  Customer experiences that speak{' '}
                  <span className="rt-color-periwinkle-gray">
                    for themselves
                  </span>
                </h2>
              </div>
            </div>

            <div
              data-w-id="6284435a-2145-1d12-cc4a-dfa01c689e73"
              className="w-layout-hflex rt-testimonial-v2-card-main rt-overflow-hidden rt-position-relative"
            >
              {/* Marquee Train Track 1 */}
              <div className="rt-testimonial-v2-marquee-train">
                {testimonials.map((item, idx) => (
                  <div key={`track1-${item.id || idx}`} className="w-layout-vflex rt-testimonials-v2-item rt-overflow-hidden">
                    <div className="rt-testimonial-v2-author-main rt-position-relative">
                      <div className="rt-testimonial-v3-client-wrap">
                        <Image
                          width={55}
                          height={55}
                          alt={item.avatarAlt || item.name}
                          src={item.avatar || '/Home2_files/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp'}
                          loading="lazy"
                          className="rt-auto-fit rt-desktop-image-full-width"
                        />
                      </div>
                      <div className="w-layout-vflex rt-testimonial-v3-client-details">
                        <div className="rt-testimonial-star">
                          <Image
                            width={91}
                            height={18}
                            alt="5 Stars"
                            src="/Home2_files/6900857a13043eba725f30ee_kloudera-home-one-testimonial-star.svg"
                            loading="lazy"
                            className="rt-height-auto"
                            style={{ width: '91px', height: 'auto' }}
                          />
                        </div>
                        <div className="rt-text-style-h6">
                          <div>
                            <span className="rt-color-blue-yonder">By</span>{' '}
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-vflex rt-testimonial-v2-content-wrap rt-mobile-text-center rt-position-relative">
                      <div className="rt-text-style-h6">“{item.company || 'Client Review'}”</div>
                      <p className="rt-gap-off">
                        “{item.content}”
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Marquee Train Track 2 (Seamless loop duplicate) */}
              <div className="rt-testimonial-v2-marquee-train">
                {testimonials.map((item, idx) => (
                  <div key={`track2-${item.id || idx}`} className="w-layout-vflex rt-testimonials-v2-item rt-overflow-hidden">
                    <div className="rt-testimonial-v2-author-main rt-position-relative">
                      <div className="rt-testimonial-v3-client-wrap">
                        <Image
                          width={55}
                          height={55}
                          alt={item.avatarAlt || item.name}
                          src={item.avatar || '/Home2_files/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp'}
                          loading="lazy"
                          className="rt-auto-fit rt-desktop-image-full-width"
                        />
                      </div>
                      <div className="w-layout-vflex rt-testimonial-v3-client-details">
                        <div className="rt-testimonial-star">
                          <Image
                            width={91}
                            height={18}
                            alt="5 Stars"
                            src="/Home2_files/6900857a13043eba725f30ee_kloudera-home-one-testimonial-star.svg"
                            loading="lazy"
                            className="rt-height-auto"
                            style={{ width: '91px', height: 'auto' }}
                          />
                        </div>
                        <div className="rt-text-style-h6">
                          <div>
                            <span className="rt-color-blue-yonder">By</span>{' '}
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-vflex rt-testimonial-v2-content-wrap rt-mobile-text-center rt-position-relative">
                      <div className="rt-text-style-h6">“{item.company || 'Client Review'}”</div>
                      <p className="rt-gap-off">
                        “{item.content}”
                      </p>
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
