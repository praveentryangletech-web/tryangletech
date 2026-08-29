"use client";
import React from 'react';

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
import { LocationItem } from '@/backend/services/geo/geo.types';
import { HomeProvider, useHomeContent } from '@/app/context/HomeContext';

interface HomeMainProps {
  initialContent?: HomeContentDTO;
  geo?: LocationItem;
}

function HomeMainContent({ geo }: { geo?: LocationItem }) {
  const { content } = useHomeContent();

  // Compute Geo-localized section overrides
  const localizedHero = geo
    ? {
        ...content.hero,
        ...(geo.hero || {}),
        headline: geo.hero?.headline || `${geo.headlineTitle} ${geo.headlineHighlight}`,
        subheadline: geo.hero?.subheadline || geo.subheadline || content.hero.subheadline,
        subBadgeText: geo.hero?.subBadgeText || `SERVING ${geo.city.toUpperCase()}`,
        dashboardImage: geo.hero?.dashboardImage || content.hero.dashboardImage,
        dashboardImageAlt: geo.hero?.dashboardImageAlt || content.hero.dashboardImageAlt,
        avatars: geo.hero?.avatars || content.hero.avatars,
        ctaText: geo.hero?.ctaText || content.hero.ctaText,
        ctaLink: geo.hero?.ctaLink || content.hero.ctaLink,
      }
    : content.hero;

  const localizedAbout = geo
    ? {
        ...content.about,
        ...(geo.about || {}),
        description: geo.about?.description || geo.aboutText || content.about.description,
        headingHighlight: geo.about?.headingHighlight || `${geo.city} & Global Markets`,
        image1: geo.about?.image1 || content.about.image1,
        image1Alt: geo.about?.image1Alt || content.about.image1Alt,
        image2: geo.about?.image2 || content.about.image2,
        image2Alt: geo.about?.image2Alt || content.about.image2Alt,
      }
    : content.about;

  const localizedServices = (geo && geo.services && geo.services.length > 0) ? geo.services : content.services;
  const localizedWhyChooseUs = (geo && geo.whyChooseUs) ? { ...content.whyChooseUs, ...geo.whyChooseUs } : content.whyChooseUs;
  const localizedHowWeWork = (geo && geo.howWeWork) ? { ...content.howWeWork, ...geo.howWeWork } : content.howWeWork;
  const localizedTestimonials = (geo && geo.testimonials && geo.testimonials.length > 0) ? geo.testimonials : content.testimonials;
  const localizedCtaBanner = (geo && geo.ctaBanner) ? { ...content.ctaBanner, ...geo.ctaBanner } : content.ctaBanner;

  return (
    <>
      <WebflowInit pageId="68eddb146961691d5aa6086f" />

      <main>
        {/* Section 1: Hero */}
        <Hero hero={localizedHero} />

        {/* Section 2: Services / Benefits */}
        <Benefits services={localizedServices} />

        {/* Section 3: About / Who We Are */}
        <About about={localizedAbout} />

        {/* Section 4: Why Choose Us */}
        <WhyChooseUs whyChooseUs={localizedWhyChooseUs} />

        {/* Section 5: Collaboration / How We Work */}
        <Collaboration howWeWork={localizedHowWeWork} />

        {/* Section 6: Featured Projects (Live PortfolioProject DB) */}
        <ProjectsSection />
        
        {/* Section 7: Tech Stack & Integrations */}
        <Integrations />
        {/* Section 10: Latest Blog Articles (Live BlogPost DB) */}
        <HomeLatestBlog />
        {/* Section 8: Testimonials */}
        <Testimonials testimonials={localizedTestimonials} />

        {/* Section 9: FAQs (Live PageFAQ & Geo AEO Engine) */}
        <Faq initialFaqs={(geo && geo.faqs && geo.faqs.length > 0) ? geo.faqs : content.faqs} />
      </main>
    </>
  );
}

export default function HomeMain({ initialContent, geo }: HomeMainProps) {
  return (
    <HomeProvider initialContent={initialContent}>
      <HomeMainContent geo={geo} />
    </HomeProvider>
  );
}
