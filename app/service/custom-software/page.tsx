'use client';

import React from "react";
import WebflowInit from "../../common/WebflowInit";

// Reused directly
import WebDevSpeciality from '../web-development/components/WebDevSpeciality';
import GraphicsDesigningTestimonial from '../graphics-designing/components/GraphicsDesigningTestimonial';

// Custom for this page
import CustomSoftwareHero from './components/CustomSoftwareHero';
import CustomSoftwareFeatures from './components/CustomSoftwareFeatures';
import CustomSoftwareServices from './components/CustomSoftwareServices';
import CustomSoftwareFAQ from './components/CustomSoftwareFAQ';

export default function CustomSoftwarePage() {
  return (
    <>
      {/* We use the web-dev page ID to reuse its identical CSS interactions */}
      <WebflowInit pageId="68eddb6fb6de895fcd6c3914" />

      <main>
        {/* Custom Hero */}
        <CustomSoftwareHero />

        {/* Reused Logo Marquee */}
        <WebDevSpeciality />

        {/* Custom Features */}
        <CustomSoftwareFeatures />

        {/* Custom Services Accordion */}
        <CustomSoftwareServices />

        {/* Reused Testimonials */}
        <GraphicsDesigningTestimonial />

        {/* Custom FAQ */}
        <CustomSoftwareFAQ />
      </main>
    </>
  );
}
