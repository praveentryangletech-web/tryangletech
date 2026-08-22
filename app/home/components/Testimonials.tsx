"use client";
import React from 'react';
import NextImage, { ImageProps } from "next/image";

const Image = ({ srcSet, ...props }: ImageProps & { srcSet?: string }) => {
  return <NextImage {...props} />;
};

import { HomeTestimonialItem } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';

interface TestimonialsProps {
  testimonials?: HomeTestimonialItem[];
}

export default function Testimonials({ testimonials: testimonialsProp }: TestimonialsProps) {
  const items = testimonialsProp && testimonialsProp.length > 0 ? testimonialsProp : DEFAULT_HOME_CONTENT.testimonials;

  return (
    <>
      <div className="rt-position-relative">
        <section className="rt-testimonials-v1">
          <div
            className="w-layout-blockcontainer rt-container-extra-large w-container">
            <div className="rt-testimonials-v1-contanner rt-overflow-hidden">
              <div className="rt-testimonials-v1-container rt-position-relative">
                <div className="rt-testimonials-v1-top rt-heading-bottom-gap">
                  <div
                    data-w-id="a23714eb-edfa-8381-582b-b2a0c38b7431"
                    style={{ "opacity": "0" }}
                    className="rt-sub-gap">
                    <div className="rt-sub-text">our testimonials</div>
                  </div>
                  <div className="rt-overflow-hidden">
                    <h2
                      data-w-id="a23714eb-edfa-8381-582b-b2a0c38b7434"
                      style={{ "opacity": "0" }}
                      className="rt-gap-off rt-text-color-white">
                      What our clients say about working with us
                    </h2>
                  </div>
                </div>
                <div
                  data-w-id="18db17a4-29e4-c882-80c4-267603e436cb"
                  className="rt-marquee-v1-animation rt-overflow-hidden">
                  
                  {/* Render the block twice for seamless marquee loop */}
                  {[1, 2].map((blockIdx) => (
                    <div className="rt-testimonials-v1-content" style={{}} key={blockIdx}>
                      {items.map((t, idx) => (
                        <div className="rt-testimonials-item-wrapper" key={idx}>
                          <div
                            style={{ "backgroundColor": "rgba(255, 255, 255, 0.098)" }}
                            className="rt-testimonials-v1-item">
                            <div className="rt-testimonials-v1-item-top">
                              <div className="rt-testimonials-author">
                                <Image
                                  src={t.image}
                                  loading="lazy"
                                  alt={t.name} width={800} height={800} style={{ width: "100%", height: "auto" }} />
                              </div>
                              <div className="rt-testimonials-v1-item-top-right">
                                <div>
                                  <div>
                                    <Image
                                      src="/Taskopia_files/68f1ff9d3485bfaf19e14f3e_star (2).svg"
                                      loading="lazy"
                                      alt="star"
                                      className="rt-star-test-v1" width={800} height={800} style={{ width: "100%", height: "auto" }} />
                                  </div>
                                </div>
                                <div>
                                  <div
                                    style={{ "color": "rgb(255, 255, 255)" }}
                                    className="rt-small-name rt-text-color-white">
                                    {t.name}<br />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rt-testimonials-v1-item-inner">
                              <div
                                className="rt-small-name rt-text-color-white rt-small-heading-para-gap"
                                style={{ "color": "rgb(255, 255, 255)" }}>
                                {t.title}
                              </div>
                              <p
                                style={{ "color": "rgb(178, 181, 187)" }}
                                className="rt-color-pale-periwinkle">
                                {t.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className="rt-testimonials-overlay"></div>
                </div>
              </div>
              <div className="rt-testimonials-v1-overlay"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

