"use client";
import React, { useEffect, useState } from 'react';

import Hero from './components/Hero';
import About from './components/about';
import Benefits from './components/Benefits';
import Integrations from './components/Integration';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Collaboration from './components/Collaboration';
import ProjectsSection from './components/ProjectsSection';
import HomeLatestBlog from './components/HomeLatestBlog';
import WebflowInit from '@/app/common/WebflowInit';
import { HomeContentDTO } from '@/backend/services/home/home.types';
import { DEFAULT_HOME_CONTENT } from '@/backend/services/home/home.defaults';
import { LocationItem } from '@/backend/services/geo/geo.types';

// Global client memory cache for 0ms transitions
let cachedHomeContent: HomeContentDTO | null = null;

interface HomeMainProps {
  initialContent?: HomeContentDTO;
  geo?: LocationItem;
}

export default function HomeMain({ initialContent, geo }: HomeMainProps) {
  const [content, setContent] = useState<HomeContentDTO>(() => {
    if (initialContent) {
      cachedHomeContent = initialContent;
      return initialContent;
    }
    if (cachedHomeContent) return cachedHomeContent;
    return DEFAULT_HOME_CONTENT;
  });

  useEffect(() => {
    let isMounted = true;

    // If initialContent was already pre-rendered by server, avoid redundant network round-trip
    if (initialContent) {
      cachedHomeContent = initialContent;
      return;
    }

    async function loadDynamicHomeContent() {
      try {
        const res = await fetch('/api/home', {
          headers: { 'Accept': 'application/json' },
        });

        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.success && json.data) {
            setContent(json.data);
            cachedHomeContent = json.data;
          }
        }
      } catch (err) {
        console.warn('Home content API notice:', err);
      }
    }

    loadDynamicHomeContent();

    return () => {
      isMounted = false;
    };
  }, [initialContent]);

  // Compute Geo-localized section overrides
  const localizedHero = geo
    ? {
        ...content.hero,
        headline: `${geo.headlineTitle} ${geo.headlineHighlight}`,
        subheadline: geo.subheadline || content.hero.subheadline,
        subBadgeText: `SERVING ${geo.city.toUpperCase()}`,
      }
    : content.hero;

  const localizedAbout = geo
    ? {
        ...content.about,
        description: geo.aboutText || content.about.description,
        headingHighlight: `${geo.city} & Global Markets`,
      }
    : content.about;

  return (
    <>
      <WebflowInit pageId="68eddb146961691d5aa6086f" />

      <main>
        {/* Section 1: Hero */}
        <Hero hero={localizedHero} />

        {/* Section 2: Services / Benefits */}
        <Benefits services={content.services} />

        {/* Section 3: About / Who We Are */}
        <About about={localizedAbout} />

        {/* Section 4: Why Choose Us */}
        <WhyChooseUs whyChooseUs={content.whyChooseUs} />

        {/* Section 5: Collaboration / How We Work */}
        <Collaboration howWeWork={content.howWeWork} />

        {/* Section 6: Featured Projects (Live PortfolioProject DB) */}
        <ProjectsSection />
        
        {/* Section 7: Tech Stack & Integrations */}
        <Integrations />

        {/* Section 8: Testimonials */}
        <Testimonials testimonials={content.testimonials} />

        {/* Section 9: FAQs (Live PageFAQ & Geo AEO Engine) */}
        <Faq initialFaqs={(geo && geo.faqs && geo.faqs.length > 0) ? geo.faqs : content.faqs} />

        {/* Section 10: Latest Blog Articles (Live BlogPost DB) */}
        <HomeLatestBlog />

        {/* Section 11: Call to Action Banner */}
        <Cta ctaBanner={content.ctaBanner} />
      </main>
    </>
  );
}
