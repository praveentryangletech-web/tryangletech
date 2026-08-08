"use client";
import React from 'react';
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Jonathan Keller",
    title: `"Great experience working together"`,
    text: `“We hired Tryangletech to rebuild our company website and the result was amazing. The team understood exactly what we needed and delivered a site that our customers love. Highly recommended.”`,
    image: "/Taskopia_files/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp"
  },
  {
    name: "Rebecca Lin",
    title: `"Professional and reliable"`,
    text: `“Their digital marketing work helped us grow our online traffic significantly. They are easy to communicate with and always deliver on their promises. A solid team you can count on.”`,
    image: "/Taskopia_files/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp"
  },
  {
    name: "Mark Wilson",
    title: `"Excellent app development"`,
    text: `“They built a mobile app for our business that works beautifully on both Android and iOS. The whole process was smooth and the team was always available when we had questions.”`,
    image: "/Taskopia_files/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp"
  },
  {
    name: "Sarah Jenkins",
    title: `"Exceeded our expectations"`,
    text: `“The custom software they developed for us streamlined our entire workflow. The TryangleTech team was communicative, fast, and delivered an outstanding product.”`,
    image: "/Taskopia_files/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp"
  },
  {
    name: "David Wright",
    title: `"A true technology partner"`,
    text: `“From UI/UX design to final deployment, their graphics and development teams were fantastic. They didn't just build what we asked for—they helped us improve our initial idea.”`,
    image: "/Taskopia_files/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp"
  },
  {
    name: "Emily Davis",
    title: `"Unmatched support and quality"`,
    text: `“We've worked with several agencies before, but TryangleTech stands out. Their attention to detail and ongoing support is exactly what our growing startup needed.”`,
    image: "/Taskopia_files/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp"
  }
];

export default function Testimonials() {
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
                      {TESTIMONIALS.map((t, idx) => (
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

