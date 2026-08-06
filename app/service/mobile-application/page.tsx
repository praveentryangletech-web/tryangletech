"use client";
import React from "react";
import WebflowInit from "../../common/WebflowInit";

import MobileAppHero from "./components/MobileAppHero";
import MobileAppMarquee from "./components/MobileAppMarquee";
import MobileAppAgent from "./components/MobileAppAgent";
import MobileAppAbout from "./components/MobileAppAbout";
import MobileAppFeatures from "./components/MobileAppFeatures";
import MobileAppChooseUs from "./components/MobileAppChooseUs";
import MobileAppSolution from "./components/MobileAppSolution";
import MobileAppToolsIntegration from "./components/MobileAppToolsIntegration";
import MobileAppPricing from "./components/MobileAppPricing";
import MobileAppFaq from "./components/MobileAppFaq";

export default function MobileApplicationPage() {
  return (
    <>
      <WebflowInit pageId="68eddb2fff5c773ab7afbc89" />

      <main>
        <MobileAppHero />
        <MobileAppMarquee />
        <MobileAppAgent />
        <MobileAppAbout />
        <MobileAppFeatures />
        <MobileAppChooseUs />
        <MobileAppSolution />
        <MobileAppToolsIntegration />
        <MobileAppPricing />
        <MobileAppFaq />
      </main>

    </>
  );
}
