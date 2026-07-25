"use client";
import React from 'react';

export default function Cta() {
  return (
    <section className="rt-cta-v1">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-cta-wrap rt-overflow-hidden rt-position-relative">
          <div className="rt-heading-bottom-gap rt-desktop-text-center">
            <h2 className="rt-gap-off">
              Ready to elevate your team's productivity?
            </h2>
            <p className="rt-color-pale-periwinkle">Start your 14-day free trial today. No credit card required.</p>
          </div>
          <div className="rt-desktop-text-center">
            <a href="/contact" className="rt-button-body w-inline-block"><div className="rt-button-text">Get Started Free</div></a>
          </div>
        </div>
      </div>
    </section>
  );
}
