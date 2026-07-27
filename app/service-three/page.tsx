"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const SA = "/service3-assets";

const faqs = [
  {
    q: "Does it integrate with other tools?",
    a: "AI automation uses artificial intelligence to perform repetitive tasks, analyze data, and optimize processes, enabling businesses to save time, reduce errors, and make smarter, faster decisions efficiently.",
  },
  {
    q: "How can task management software improve productivity?",
    a: "AI can automate repetitive tasks like data entry, customer support, report generation, inventory management, and workflow optimization, allowing teams to focus on strategic, high-value activities and business growth.",
  },
  {
    q: "Can I collaborate with my team using this platform?",
    a: "Yes, AI automation is ideal for small businesses. It streamlines operations, reduces manual work, improves efficiency, and provides actionable insights, helping smaller teams compete and grow effectively.",
  },
  {
    q: "Is this suitable for small teams and enterprises?",
    a: "Industries like finance, healthcare, retail, manufacturing, and logistics benefit greatly from AI automation. It streamlines operations, reduces errors, enhances customer service, and drives efficiency across diverse business sectors.",
  },
  {
    q: "Can I track project deadlines?",
    a: "Absolutely. AI automation seamlessly integrates with your existing tools and platforms, allowing workflows to connect effortlessly, enhancing productivity, reducing manual effort, and ensuring a smooth transition without disrupting current operations.",
  },
];

const testimonials = [
  {
    img: `${SA}/68f20568d8c28959fddbf700_taskopia-testimonials-author-v1.webp`,
    name: "Jonathan Keller",
    title: '"Good sales growth"',
    text: '"This tool transformed how our team works! Tasks are organized, deadlines are clear, and collaboration is smoother than ever. Productivity has never been this high."',
  },
  {
    img: `${SA}/68f20568de5d5f47117e47e5_taskopia-testimonials-author-v2.webp`,
    name: "Rebecca Lin",
    title: '"Faster support"',
    text: '"An absolute game-changer for project management. We can track progress in real-time, avoid delays, and deliver projects on schedule with less stress."',
  },
  {
    img: `${SA}/68f2056835f743b2678916ad_taskopia-testimonials-author-v3.webp`,
    name: "Mark Wilson",
    title: '"Smooth workflow"',
    text: '"Simple, intuitive, and powerful—our team now manages tasks without confusion. It keeps everyone aligned and helps us achieve more in less time."',
  },
];

import ServiceThreeHero from './components/ServiceThreeHero';
import ServiceThreeSimplified from './components/ServiceThreeSimplified';
import ServiceThreeOurServices from './components/ServiceThreeOurServices';
import ServiceThreeCases from './components/ServiceThreeCases';
import ServiceThreeFeatures from './components/ServiceThreeFeatures';
import ServiceThreeCollaboration from './components/ServiceThreeCollaboration';
import ServiceThreeTestimonial from './components/ServiceThreeTestimonial';
import ServiceThreeFAQ from './components/ServiceThreeFAQ';
import WebflowInit from "../common/WebflowInit";

export default function ServiceThreePage() {
  

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
      <Navbar />

      <main>
        <ServiceThreeHero />
        <ServiceThreeSimplified />
        <ServiceThreeOurServices />
        <ServiceThreeCases />
        <ServiceThreeFeatures />
        <ServiceThreeCollaboration />
        <ServiceThreeTestimonial />
        <ServiceThreeFAQ />
      </main>

      <Footer />
    </>
  );
}
