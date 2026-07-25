"use client";
import React, { useEffect } from 'react';
import Navbar from '@/app/common/Navbar';
import Footer from '@/app/common/Footer';
import Hero from '@/app/home/components/Hero';
import FeatureIntro from '@/app/home/components/about';
import Brands from '@/app/home/components/Brands';
import Benefits from '@/app/home/components/Benefits';
import Workflow from '@/app/home/components/Workflow';
import Integrations from '@/app/home/components/Integration';
import Testimonials from '@/app/home/components/Testimonials';
import Pricing from '@/app/home/components/Pricing';
import Faq from '@/app/home/components/Faq';
import Cta from '@/app/home/components/Cta';

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
