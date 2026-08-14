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
import ProjectsSection from "../../home/components/ProjectsSection";

export default function DigitalMarketing() {
  return (
    <>
      <WebflowInit pageId="68eddb2fff5c773ab7afbc89" />

      <main>
        <DigitalMarketingHero />
        <DigitalMarketingMarquee />
        <DigitalMarketingFeatures />
        <DigitalMarketingAgent />
        <DigitalMarketingAbout />
        <DigitalMarketingChooseUs />
        {/* <DigitalMarketingSolution /> */}
        <DigitalMarketingToolsIntegration />
        <ProjectsSection hideFilter={true} categoryFilter={["Business Website", "Landing Website"]} />
        <DigitalMarketingFaq />
      </main>

    </>
  );
}
