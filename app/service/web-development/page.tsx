import React from "react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Website Development Company in Ahmedabad | Tryangle Tech",
  description: "Custom websites, WordPress, and e-commerce development in Ahmedabad. Fast, mobile-friendly sites built to bring in customers, not just look good.",
};

const SA = "/service3-assets";



import WebDevHero from './components/WebDevHero';

import WebDevSpeciality from './components/WebDevSpeciality';

import WebDevFeatures from './components/WebDevFeatures';
import WebDevServices from './components/WebDevServices';
import WebDevIntegration from './components/WebDevIntegration';
import WebDevPricing from './components/WebDevPricing';
import WebDevTechStack from './components/TechStack';
import WebDevCTA from './components/WebDevCTA';
import WebflowInit from "../../common/WebflowInit";
import ProjectsSection from "../../home/components/ProjectsSection";

import WebDevBottomFAQ from './components/WebDevBottomFAQ';

export default function WebDevelopmentPage() {

  return (
    <>
      <WebflowInit pageId="68eddb6fb6de895fcd6c3914" />


      <main>
        <WebDevHero />

        <WebDevSpeciality />

        <WebDevFeatures />
        <WebDevServices />
        <WebDevIntegration />
        <ProjectsSection hideFilter={true} categoryFilter={["Business Website", "E-Commerce Website", "Landing Website"]} />
        <WebDevPricing />
        <WebDevTechStack />
        <WebDevBottomFAQ/>
        {/* <WebDevCTA /> */}
      </main>


    </>
  );
}
