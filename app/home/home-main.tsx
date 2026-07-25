"use client";
import React, { useEffect } from 'react';
import Navbar from '@/app/common/Navbar';
import Footer from '@/app/common/Footer';
import Hero from './components/Hero';
import FeatureIntro from './components/about';
import Brands from './components/Brands';
import Benefits from './components/Benefits';
import Workflow from './components/Workflow';
import Integrations from './components/Integrations';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Cta from './components/Cta';

export default function HomeMain() {
  useEffect(() => {
    const triggerWebflow = () => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.add('w-mod-ix');
        
        if ((window as any).Webflow) {
          const w = (window as any).Webflow;
          try {
            w.ready();
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
          } catch (e) {
            console.error("Webflow ready trigger error:", e);
          }
        }
      }
    };

    const timer = setTimeout(triggerWebflow, 300);

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
          target.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    });

    const animatedElements = document.querySelectorAll('[data-w-id]');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureIntro />
        <Brands />
        <Benefits />
        <Workflow />
        <Integrations />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
