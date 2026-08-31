'use client';

import React from 'react';
import Image from "next/image";
import { MobileAppTestimonialsSection } from '@/backend/services/services/services.types';
import { DEFAULT_MOBILE_APP_CONTENT } from '@/backend/services/services/services.defaults';

interface MobileApplicationTestimonialProps {
  data?: MobileAppTestimonialsSection;
}

export default function MobileApplicationTestimonial({ data }: MobileApplicationTestimonialProps) {
  const testimonials = data || DEFAULT_MOBILE_APP_CONTENT.testimonials;
  const items = (testimonials.items && testimonials.items.length > 0 ? testimonials.items : DEFAULT_MOBILE_APP_CONTENT.testimonials.items) || [];


  return (
    <>
      <section className="rt-testimonials-v1">
        <div className="w-layout-blockcontainer rt-container-extra-large w-container">
          <div className="rt-testimonials-v1-contanner rt-overflow-hidden">
            <div className="rt-testimonials-v1-container rt-position-relative">
              <div className="rt-testimonials-v1-top rt-heading-bottom-gap">
                <div
                  data-w-id="584d018b-8d6e-8292-34fe-7f2c572f8489"
                  className="rt-sub-gap">
                  <div className="rt-sub-text">{testimonials.subBadgeText || 'what people say'}</div>
                </div>
                <h2
                  data-w-id="584d018b-8d6e-8292-34fe-7f2c572f848c"
                  className="rt-gap-off rt-text-color-white">
                  {testimonials.heading || 'See what our clients think about us'}
                </h2>
              </div>
              <div
                data-w-id="47b98db0-d75d-b458-7027-7553e5020911"
                className="rt-marquee-v1-animation rt-overflow-hidden">
                {/* Train 1 */}
                <div className="rt-testimonials-v1-content">
                  {items.map((item, idx) => (
                    <div key={`item1-${item.id || idx}`} className="rt-testimonials-item-wrapper">
                      <div className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src={item.avatar}
                              loading="lazy"
                              alt={item.avatarAlt || item.name}
                              width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star rating"
                                  className="rt-star-test-v1"
                                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                {item.name}
                                {item.company && <span style={{ opacity: 0.8, fontSize: '0.8em', marginLeft: '4px' }}>({item.company})</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          {item.highlight && (
                            <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                              {item.highlight}
                            </div>
                          )}
                          <p className="rt-color-pale-periwinkle">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Train 2 Duplicate for Seamless Marquee */}
                <div className="rt-testimonials-v1-content">
                  {items.map((item, idx) => (
                    <div key={`item2-${item.id || idx}`} className="rt-testimonials-item-wrapper">
                      <div className="rt-testimonials-v1-item">
                        <div className="rt-testimonials-v1-item-top">
                          <div className="rt-testimonials-author">
                            <Image
                              src={item.avatar}
                              loading="lazy"
                              alt={item.avatarAlt || item.name}
                              width={800} height={800} style={{ width: "100%", height: "auto" }} />
                          </div>
                          <div className="rt-testimonials-v1-item-top-right">
                            <div>
                              <div>
                                <Image
                                  src="/service-3-assets/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                  loading="lazy"
                                  alt="star rating"
                                  className="rt-star-test-v1"
                                  width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                            </div>
                            <div>
                              <div className="rt-small-name rt-text-color-white">
                                {item.name}
                                {item.company && <span style={{ opacity: 0.8, fontSize: '0.8em', marginLeft: '4px' }}>({item.company})</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rt-testimonials-v1-item-inner">
                          {item.highlight && (
                            <div className="rt-small-name rt-text-color-white rt-small-heading-para-gap">
                              {item.highlight}
                            </div>
                          )}
                          <p className="rt-color-pale-periwinkle">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rt-testimonials-overlay"></div>
              </div>
            </div>
            <div className="rt-testimonials-v1-overlay"></div>
          </div>
        </div>
      </section>
    </>
  );
}
