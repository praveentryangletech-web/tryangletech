import React from 'react';
import { Metadata } from 'next';
import { servicesService } from '@/backend/services/services';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';

import ServiceMarquee from './components/ServiceMarquee';
import ServiceAbout from './components/ServiceAbout';
import ServiceToolsIntegration from './components/ServiceToolsIntegration';
import ServiceDynamicFaq from './components/ServiceDynamicFaq';
import ServiceDynamicTestimonials from './components/ServiceDynamicTestimonials';
import WebflowInit from '../common/WebflowInit';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return await servicesService.generateMetadata();
  } catch (err) {
    console.warn('[ServicePage] Error generating metadata:', err);
    return {
      title: DEFAULT_SERVICE_MAIN_CONTENT.metaTitle,
      description: DEFAULT_SERVICE_MAIN_CONTENT.metaDescription,
    };
  }
}

export default async function ServicePage() {
  let content;
  try {
    content = await servicesService.getServiceMainContent();
  } catch (err) {
    console.warn('[ServicePage] Falling back to default service content:', err);
    content = DEFAULT_SERVICE_MAIN_CONTENT;
  }

  return (
    <>
      <WebflowInit pageId="68eddb21f14a8338ce862110" />

      <main>
        {/* 1. Hero & 5 Interactive Service Cards */}
        <ServiceMarquee
          hero={content.hero}
          servicesList={content.servicesList}
        />

        {/* 2. Key Highlights & 4 Value Pillars */}
        <ServiceAbout
          highlights={content.highlights}
        />

        {/* 3. Technology Integrations & Frameworks */}
        <ServiceToolsIntegration
          tools={content.tools}
        />

        {/* 4. Dynamic FAQs & AEO */}
        <ServiceDynamicFaq
          faqs={content.faqs}
        />

        {/* 5. Client Reviews & Marquee Testimonials */}
        <ServiceDynamicTestimonials
          testimonials={content.testimonials}
        />
      </main>
    </>
  );
}
