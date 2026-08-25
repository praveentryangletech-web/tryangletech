import React from 'react';
import Script from 'next/script';
import { aboutService } from '@/backend/services/about';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';
import { AboutProvider } from '../context/AboutContext';

import AboutHero from './components/AboutHero';
import AboutFeatures from './components/AboutFeatures';
import WhyChooseUs from './components/WhyChooseUs';
import OurProcess from './components/OurProcess';
import AboutFAQ from './components/AboutFAQ';
import FooterCTA from '../components/FooterCTA';
import WebflowInit from '../common/WebflowInit';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  try {
    const content = await aboutService.getAboutContent();
    return aboutService.generateAboutMetadata(content);
  } catch (err) {
    return aboutService.generateAboutMetadata(DEFAULT_ABOUT_CONTENT);
  }
}

export default async function AboutPage() {
  let content;
  try {
    content = await aboutService.getAboutContent();
  } catch (err) {
    console.warn('[AboutPage] DB error, using default fallback:', err);
    content = DEFAULT_ABOUT_CONTENT;
  }

  const jsonLdSchema = aboutService.generateAboutSchema(content);

  return (
    <AboutProvider initialContent={content}>
      <WebflowInit pageId="68eddb57e406830358a1f29d" />

      {/* Dynamic Schema.org JSON-LD Structured Data for Google & AI Search (AEO) */}
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />

      {/* ══════════════════ MAIN ══════════════════ */}
      <main>
        <AboutHero hero={content.hero} speciality={content.speciality} />

        <AboutFeatures missionVision={content.missionVision} />

        <WhyChooseUs whyChooseUs={content.whyChooseUs} />

        <OurProcess process={content.process} />

        <FooterCTA ctaBanner={content.ctaBanner} />

        <AboutFAQ faqSection={content.faqSection} />
      </main>
    </AboutProvider>
  );
}
