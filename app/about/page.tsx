'use client';

import { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';


import AboutHero from './components/AboutHero';
import AboutFeatures from './components/AboutFeatures';
import WhyChooseUs from './components/WhyChooseUs';
import OurGoal from './components/OurGoal';
import OurProcess from './components/OurProcess';
import AboutFAQ from './components/AboutFAQ';
import FooterCTA from '../components/FooterCTA';
import AboutBlog from './components/AboutBlog';

const A = '/about-assets';

import WebflowInit from "../common/WebflowInit";

export default function AboutPage() {

  useEffect(() => {
    document.documentElement.setAttribute('data-wf-page', '68eddb57e406830358a1f29d');
    document.documentElement.setAttribute('data-wf-site', '68c3feed3b3e541e7d5c098a');

    const initWebflow = setInterval(() => {
      const Webflow = (window as any).Webflow;
      if (typeof window !== 'undefined' && Webflow && Webflow.require) {
        const ix2 = Webflow.require('ix2');
        if (ix2) {
          clearInterval(initWebflow);
          Webflow.destroy();
          Webflow.ready();
          ix2.init();
          document.dispatchEvent(new Event('readystatechange'));
        }
      }
    }, 100);

    return () => clearInterval(initWebflow);
  }, []);

  return (
    <>
      <WebflowInit pageId="68eddb57e406830358a1f29d" />
      <Navbar />

      {/* ══════════════════ MAIN ══════════════════ */}
      <main>

        <AboutHero />

        <AboutFeatures />

        <WhyChooseUs />

        <OurGoal />

        <OurProcess />

        <AboutFAQ />

        <FooterCTA />

        <AboutBlog />

      </main>

      <Footer />
    </>
  );
}
