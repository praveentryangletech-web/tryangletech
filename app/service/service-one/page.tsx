"use client";

import React, { useState, useEffect } from "react";


const SA = "/service3-assets";

const features = [
  {
    icon: `${SA}/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg`,
    title: "Smart task planning",
    desc: "Organize work with precision, assign tasks to the right people, and keep everyone on track with intelligent planning tools.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a14",
  },
  {
    icon: `${SA}/6916ec6339f890a80905a69b_Vector (33).svg`,
    title: "Real-time collaboration",
    desc: "Work together seamlessly across teams with live updates, shared workspaces, and instant notifications.",
    wId: "31f55def-c002-725b-ac24-4fb3c902009b",
  },
  {
    icon: `${SA}/6916ef876682eed2b2fd5911_Vector (34).svg`,
    title: "Workflow automation",
    desc: "Automate repetitive tasks, set triggers, and let your team focus on what matters most — delivering results.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a1a",
  },
  {
    icon: `${SA}/6916f00db3051e5aed09bd3f_Group 2085663576.svg`,
    title: "Advanced analytics",
    desc: "Get deep insights into team performance, project health, and productivity trends with powerful dashboards.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a20",
  },
];

const faqs = [
  {
    q: "How does the platform help with task management?",
    a: "Our platform provides intuitive task boards, priority settings, deadline tracking, and team assignments to keep every project organized and on time.",
  },
  {
    q: "Can I use it for remote teams?",
    a: "Absolutely. The platform is built for remote and distributed teams with real-time collaboration, async updates, and shared workspaces accessible from anywhere.",
  },
  {
    q: "What integrations are available?",
    a: "We integrate with Slack, GitHub, Google Workspace, Notion, Jira, and 50+ more tools your team already uses daily.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started.",
  },
  {
    q: "How secure is my data?",
    a: "Your data is encrypted at rest and in transit. We are SOC 2 Type II certified and follow industry best practices for data security.",
  },
];

import ServiceOneHero from './components/ServiceOneHero';
import ServiceOneMarquee from './components/ServiceOneMarquee';
import ServiceOneSpeciality from './components/ServiceOneSpeciality';
import ServiceOneWhyChoose from './components/ServiceOneWhyChoose';
import ServiceOneFeatures from './components/ServiceOneFeatures';
import ServiceOneServices from './components/ServiceOneServices';
import ServiceOneIntegration from './components/ServiceOneIntegration';
import ServiceOnePricing from './components/ServiceOnePricing';
import ServiceOneFAQ from './components/ServiceOneFAQ';
import ServiceOneCTA from './components/ServiceOneCTA';
import WebflowInit from "../../common/WebflowInit";

export default function ServiceOnePage() {


  useEffect(() => {
    document.documentElement.setAttribute(
      "data-wf-page",
      "68eddb6fb6de895fcd6c3914",
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
      <WebflowInit pageId="68eddb6fb6de895fcd6c3914" />


      <main>
        <ServiceOneHero />
        <ServiceOneMarquee />
        <ServiceOneSpeciality />
        <ServiceOneWhyChoose />
        <ServiceOneFeatures />
        <ServiceOneServices />
        <ServiceOneIntegration />
        <ServiceOnePricing />
        <ServiceOneFAQ />
        <ServiceOneCTA />
      </main>


    </>
  );
}
