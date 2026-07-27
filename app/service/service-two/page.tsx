"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";

const SA = "/service3-assets";

const steps = [
  {
    num: "01",
    title: "Define your goals",
    desc: "Start by mapping out your project objectives and key deliverables in a unified workspace.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a14",
  },
  {
    num: "02",
    title: "Assign and organize",
    desc: "Break work down into manageable tasks and assign them to the right team members.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a1a",
  },
  {
    num: "03",
    title: "Track progress",
    desc: "Monitor real-time updates and spot potential roadblocks before they impact your timeline.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a20",
  },
  {
    num: "04",
    title: "Deliver and review",
    desc: "Complete projects successfully and use our analytics tools to optimize your next workflow.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a26",
  },
];

const faqs = [
  {
    q: "How do I get started with the platform?",
    a: "Simply sign up for a free trial, create your workspace, and invite your team. No credit card required and setup takes less than 5 minutes.",
  },
  {
    q: "Can multiple teams use the platform simultaneously?",
    a: "Yes, our platform supports unlimited teams and workspaces, allowing multiple teams to collaborate in parallel without any overlap or confusion.",
  },
  {
    q: "Does it support mobile access?",
    a: "Absolutely. Our platform is fully responsive and we offer dedicated iOS and Android apps so your team can stay productive on the go.",
  },
  {
    q: "How does billing work?",
    a: "We offer monthly and annual billing. Annual plans come with a 20% discount. You can upgrade, downgrade, or cancel at any time from your account settings.",
  },
  {
    q: "Is customer support available?",
    a: "Yes, we provide 24/7 live chat and email support for all plans, with dedicated account managers for enterprise customers.",
  },
];

import ServiceTwoHero from './components/ServiceTwoHero';
import ServiceTwoAIAgents from './components/ServiceTwoAIAgents';
import ServiceTwoAbout from './components/ServiceTwoAbout';
import ServiceTwoFeatures from './components/ServiceTwoFeatures';
import ServiceTwoServices from './components/ServiceTwoServices';
import ServiceTwoCore from './components/ServiceTwoCore';
import ServiceTwoTestimonial from './components/ServiceTwoTestimonial';
import ServiceTwoCTA from './components/ServiceTwoCTA';
import ServiceTwoFAQ from './components/ServiceTwoFAQ';
import WebflowInit from "../../common/WebflowInit";

export default function ServiceTwoPage() {
  

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-wf-page",
      "68eddb96ee2e53b120952722",
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
      <WebflowInit pageId="68eddb96ee2e53b120952722" />
      <Navbar />

      <main>
        <ServiceTwoHero />
        <ServiceTwoAIAgents />
        <ServiceTwoAbout />
        <ServiceTwoFeatures />
        <ServiceTwoServices />
        <ServiceTwoCore />
        <ServiceTwoTestimonial />
        <ServiceTwoCTA />
        <ServiceTwoFAQ />
      </main>

      <Footer />
    </>
  );
}
