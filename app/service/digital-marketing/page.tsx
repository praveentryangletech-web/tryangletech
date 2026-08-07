"use client";
import React from "react";
import WebflowInit from "../../common/WebflowInit";

import DigitalMarketingHero from "./components/DigitalMarketingHero";
import DigitalMarketingMarquee from "./components/DigitalMarketingMarquee";
import DigitalMarketingAgent from "./components/DigitalMarketingAgent";
import DigitalMarketingAbout from "./components/DigitalMarketingAbout";
import DigitalMarketingFeatures from "./components/DigitalMarketingFeatures";
import DigitalMarketingChooseUs from "./components/DigitalMarketingChooseUs";
import DigitalMarketingSolution from "./components/DigitalMarketingSolution";
import DigitalMarketingToolsIntegration from "./components/DigitalMarketingToolsIntegration";
import DigitalMarketingFaq from "./components/DigitalMarketingFaq";

export default function DigitalMarketing() {
  return (
    <>
      <WebflowInit pageId="68eddb2fff5c773ab7afbc89" />

      <main>
        <DigitalMarketingHero />
        <DigitalMarketingMarquee />
        <DigitalMarketingAgent />
        <DigitalMarketingAbout />
        <DigitalMarketingFeatures />
        <DigitalMarketingChooseUs />
        <DigitalMarketingSolution />
        <DigitalMarketingToolsIntegration />
        <DigitalMarketingFaq />
      </main>

    </>
  );
}
