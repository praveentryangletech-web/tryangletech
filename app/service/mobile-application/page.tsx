'use client';

import React, { useState, useEffect } from "react";

import MobileApplicationHero from './components/MobileApplicationHero';
import MobileApplicationSimplified from './components/MobileApplicationSimplified';
import MobileApplicationTypes from './components/MobileApplicationTypes';
import MobileApplicationOurServices from './components/MobileApplicationOurServices';
import MobileApplicationCases from './components/MobileApplicationCases';
import MobileApplicationFeatures from './components/MobileApplicationFeatures';
import MobileApplicationCollaboration from './components/MobileApplicationCollaboration';
import MobileApplicationTestimonial from './components/MobileApplicationTestimonial';
import MobileApplicationFAQ from './components/MobileApplicationFAQ';
import WebflowInit from "../../common/WebflowInit";
import ProjectsSection from "../../home/components/ProjectsSection";

export default function MobileApplicationPage() {


  useEffect(() => {
    document.documentElement.setAttribute(
      "data-wf-page",
      "68eddba421ea11fa0687f4f0",
    );
    document.documentElement.setAttribute(
      "data-wf-site",
      "68c3feed3b3e541e7d5c098a",
    );

    const initWebflow = setInterval(() => {
      const Webflow = (window as any).Webflow;
      if (typeof window !== "undefined" && Webflow && Webflow.require) {
        const ix2 = Webflow.require("ix2");
        if (ix2) {
          clearInterval(initWebflow);
          Webflow.destroy();
          Webflow.ready();
          ix2.init();
          document.dispatchEvent(new Event("readystatechange"));
        }
      }
    }, 100);
    return () => clearInterval(initWebflow);
  }, []);

  return (
    <>
      <WebflowInit pageId="68eddba421ea11fa0687f4f0" />


      <main>
        <MobileApplicationHero />
        <MobileApplicationSimplified />
        <MobileApplicationTypes />
        <MobileApplicationOurServices />
        <MobileApplicationCases />
        <MobileApplicationFeatures />
        {/* <MobileApplicationCollaboration /> */}
        <ProjectsSection hideFilter={true} categoryFilter={["App Development"]} />
        <MobileApplicationTestimonial />
        <MobileApplicationFAQ />
      </main>


    </>
  );
}
