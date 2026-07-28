"use client";
import React, { useEffect } from 'react';
import Navbar from '@/app/common/Navbar';
import Footer from '@/app/common/Footer';
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

export default function HomeMain() {
  useEffect(() => {
    // Set the specific page ID for Webflow interactions on this page
    document.documentElement.setAttribute('data-wf-page', '68eddb146961691d5aa6086f');
    document.documentElement.classList.add('w-mod-ix');

    let attempts = 0;
    const initWebflow = () => {
      if (typeof window !== 'undefined' && (window as any).Webflow && (window as any).Webflow.require) {
        const Webflow = (window as any).Webflow;
        Webflow.destroy();
        Webflow.ready();
        const ix2 = Webflow.require('ix2');
        if (ix2) {
          try {
            ix2.init();
          } catch (e) {
            console.warn("Webflow ix2 init error (safe to ignore):", e);
          }
        }

        // Dispatch resize and scroll events to force Webflow to evaluate elements on load 
        // (This prevents the issue where animations only trigger after you start scrolling)
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('scroll'));
        }, 100);
      } else if (attempts < 50) {
        attempts++;
        setTimeout(initWebflow, 50);
      }
    };

    const timer = setTimeout(initWebflow, 50);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Benefits />
        <About />

        <WhyChooseUs />
        <Collaboration />
        {/* <Workflow /> */}
        <Integrations />
        <Testimonials />
        <Faq />
        {/* <Cta /> */}
      </main>
      <Footer />
    </>
  );
}
