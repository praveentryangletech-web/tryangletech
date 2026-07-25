"use client";
import React from 'react';

export default function Pricing() {
  return (
    <section className="rt-pricing-v1">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-heading-bottom-gap rt-desktop-text-center">
          <div className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">PRICING</div>
          </div>
          <h2 className="rt-gap-off">
            Simple, transparent plans for <span className="rt-color-periwinkle-gray">every stage</span>
          </h2>
        </div>
        <div className="w-layout-grid rt-pricing-grid">
          <div className="rt-pricing-card">
            <div className="rt-pricing-title">Starter</div>
            <div className="rt-pricing-amount">$19<span>/mo</span></div>
            <p className="rt-no-margin rt-color-pale-periwinkle">Perfect for small teams and startups getting started.</p>
            <a href="/contact" className="rt-button-body w-inline-block"><div className="rt-button-text">Get Started</div></a>
          </div>
          <div className="rt-pricing-card rt-popular">
            <div className="rt-pricing-title">Pro Plan</div>
            <div className="rt-pricing-amount">$49<span>/mo</span></div>
            <p className="rt-no-margin rt-color-pale-periwinkle">Advanced tools and analytics for growing organizations.</p>
            <a href="/contact" className="rt-button-body w-inline-block"><div className="rt-button-text">Start Free Trial</div></a>
          </div>
        </div>
      </div>
    </section>
  );
}
