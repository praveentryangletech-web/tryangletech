"use client";

import React, { useState, useEffect } from "react";


const SA = "/service3-assets";

const features = [
  {
    icon: `${SA}/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg`,
    title: "Responsive Design",
    desc: "We build websites that look stunning and perform flawlessly on any device, from desktops to smartphones.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a14",
  },
  {
    icon: `${SA}/6916ec6339f890a80905a69b_Vector (33).svg`,
    title: "SEO Optimized",
    desc: "Our web development process includes built-in SEO best practices so you rank higher on search engines.",
    wId: "31f55def-c002-725b-ac24-4fb3c902009b",
  },
  {
    icon: `${SA}/6916ef876682eed2b2fd5911_Vector (34).svg`,
    title: "High Performance",
    desc: "We prioritize speed and performance, ensuring your website loads quickly to maximize conversions.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a1a",
  },
  {
    icon: `${SA}/6916f00db3051e5aed09bd3f_Group 2085663576.svg`,
    title: "Secure Architecture",
    desc: "Your data is safe with our robust, enterprise-grade security protocols implemented in every build.",
    wId: "bf832279-7882-71e9-77f0-dfcaa36b2a20",
  },
];

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "The timeline depends on the complexity of the project, but a typical business website takes 4-6 weeks from design to launch.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes! We offer monthly maintenance packages to keep your website updated, secure, and running smoothly.",
  },
  {
    q: "Are the websites mobile-friendly?",
    a: "Absolutely. Every website we build is fully responsive and optimized for mobile devices and tablets.",
  },
  {
    q: "Can I update the content myself?",
    a: "Yes, we integrate easy-to-use Content Management Systems (CMS) so you can update text and images without any coding knowledge.",
  },
  {
    q: "Do you offer custom web applications?",
    a: "Yes, beyond standard websites, we build complex, custom web applications tailored to your specific business workflows.",
  },
];

import WebDevHero from './components/WebDevHero';

import WebDevSpeciality from './components/WebDevSpeciality';

import WebDevFeatures from './components/WebDevFeatures';
import WebDevServices from './components/WebDevServices';
import WebDevIntegration from './components/WebDevIntegration';
import WebDevPricing from './components/WebDevPricing';
import WebDevFAQ from './components/WebDevFAQ';
import WebDevCTA from './components/WebDevCTA';
import WebflowInit from "../../common/WebflowInit";

import HomeTwoFAQ from '../../home-two/components/HomeTwoFAQ';

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
        <WebDevFAQ />
        <HomeTwoFAQ/>
        {/* <WebDevCTA /> */}
      </main>


    </>
  );
}
