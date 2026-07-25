"use client";
import React from 'react';

export default function Faq() {
  return (
    <section className="rt-faq-v1">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-heading-bottom-gap rt-desktop-text-center">
          <div className="rt-sub-gap">
            <div className="rt-sub-text rt-sub-gredient">FREQUENTLY ASKED QUESTIONS</div>
          </div>
          <h2 className="rt-gap-off">
            Got questions? <span className="rt-color-periwinkle-gray">We've got answers</span>
          </h2>
        </div>
        <div className="rt-faq-list">
          <div className="rt-faq-item">
            <div className="rt-text-style-h5">How does the 14-day free trial work?</div>
            <p className="rt-no-margin rt-color-pale-periwinkle">You get full access to all Pro features for 14 days without entering a credit card.</p>
          </div>
          <div className="rt-faq-item">
            <div className="rt-text-style-h5">Can I invite my entire team?</div>
            <p className="rt-no-margin rt-color-pale-periwinkle">Yes, you can invite unlimited team members and assign granular permissions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
