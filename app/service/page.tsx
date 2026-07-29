import React from "react";

import HomeTwoHero from '../home-two/components/HomeTwoHero';
import HomeTwoMarquee from '../home-two/components/HomeTwoMarquee';
import HomeTwoAIAgents from '../home-two/components/HomeTwoAIAgents';
import HomeTwoAbout from '../home-two/components/HomeTwoAbout';
import HomeTwoChoose from '../home-two/components/HomeTwoChoose';
import HomeTwoBenefits from '../home-two/components/HomeTwoBenefits';
import HomeTwoToolsIcon from '../home-two/components/HomeTwoToolsIcon';
import HomeThrToolsIcon from '../home-three/components/ToolsIntegration';
import HomeTwoFAQ from '../home-two/components/HomeTwoFAQ';
import HomeTwoTestimonial from '../home-two/components/HomeTwoTestimonial';
import WebflowInit from "../common/WebflowInit";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

export default function ServicePage() {


  return (
    <>
      <WebflowInit pageId="68eddb21f14a8338ce862110" />
      <Navbar />
      <main>
        <HomeTwoHero />
        <HomeTwoMarquee />
        <HomeTwoAIAgents />
        <HomeTwoAbout />
        <HomeTwoChoose />
        <HomeTwoBenefits />
        <HomeThrToolsIcon />
        <HomeTwoFAQ />
        <HomeTwoTestimonial />
      </main>
      <Footer />
    </>
  );
}
