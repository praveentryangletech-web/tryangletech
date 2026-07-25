"use client";
import React from 'react';

export default function Testimonials() {
  return (
    <section className="rt-testimonial-v1">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-heading-bottom-gap rt-desktop-text-center">
          <div className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">TESTIMONIALS</div>
          </div>
          <h2 className="rt-gap-off">
            Loved by fast-growing teams <span className="rt-color-periwinkle-gray">worldwide</span>
          </h2>
        </div>
        <div className="w-layout-grid rt-testimonial-grid">
          <div className="rt-testimonial-card">
            <div className="rt-testimonial-quote">"Taskopia completely transformed how our team manages daily deliverables and client tasks."</div>
            <div className="w-layout-hflex rt-testimonial-author">
              <img src="/Taskopia_files/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp" alt="Sarah J." className="rt-author-img" />
              <div>
                <div className="rt-author-name">Sarah Jenkins</div>
                <div className="rt-author-role">Product Lead at TechFlow</div>
              </div>
            </div>
          </div>
          <div className="rt-testimonial-card">
            <div className="rt-testimonial-quote">"The real-time collaboration and intuitive dashboard saved us over 10 hours every week."</div>
            <div className="w-layout-hflex rt-testimonial-author">
              <img src="/Taskopia_files/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp" alt="Michael R." className="rt-author-img" />
              <div>
                <div className="rt-author-name">Michael Reed</div>
                <div className="rt-author-role">Operations Manager at Soltio</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
