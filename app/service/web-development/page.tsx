"use client";

import React, { useState, useEffect } from "react";


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
        <WebDevPricing />
        <WebDevTechStack />
        <WebDevBottomFAQ/>
        {/* <WebDevCTA /> */}
      </main>


    </>
  );
}
