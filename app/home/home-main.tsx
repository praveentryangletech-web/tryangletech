"use client";
import React, { useEffect } from 'react';

import Hero from './components/Hero';
import About from './components/about';
import Benefits from './components/Benefits';
import Workflow from './components/Workflow';
import Integrations from './components/Integration';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Collaboration from './components/Collaboration';
import ProjectsSection from './components/ProjectsSection';
import WebflowInit from '@/app/common/WebflowInit';

export default function HomeMain() {
  return (
    <>
      <WebflowInit pageId="68eddb146961691d5aa6086f" />


      <main>
        <Hero />

        <Benefits />
        <About />

        <WhyChooseUs />
        <Collaboration />
        {/* <Workflow /> */}
        <ProjectsSection />
        
        <Integrations />
        <Testimonials />
        <Faq />
        {/* <Cta /> */}
      </main>

    </>
  );
}
