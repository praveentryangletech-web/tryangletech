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

  const pageUrl = content.canonicalUrl || 'https://tryangletech.com/service';
  const siteUrl = 'https://tryangletech.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metaTitle || 'Our Services | TryangleTech',
        description:
          content.metaDescription ||
          content.hero?.subheadline ||
          'Comprehensive digital solutions for your business growth.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          name: 'TryangleTech',
          url: siteUrl,
        },
        about: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'TryangleTech',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: content.hero?.subBadgeText || 'Services',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.hero?.headline || 'Digital Solutions & Custom Software Engineering',
        serviceType: content.hero?.subBadgeText || 'Digital Services',
        description:
          content.hero?.subheadline ||
          content.metaDescription ||
          'From custom software to data-driven marketing, we provide end-to-end services designed to scale your business.',
        provider: {
          '@type': 'Organization',
          name: 'TryangleTech',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Worldwide',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${content.hero?.subBadgeText || 'TryangleTech'} Offerings`,
          itemListElement: (content.servicesList || []).map((service, idx) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              position: idx + 1,
              name: service.title,
              description: service.description,
              url: service.link?.startsWith('http') ? service.link : `${siteUrl}${service.link}`,
              image: service.images?.[0] ? `${siteUrl}${service.images[0]}` : undefined,
            },
          })),
        },
        ...(content.testimonials && content.testimonials.length > 0
          ? {
              review: content.testimonials.map((test) => ({
                '@type': 'Review',
                author: {
                  '@type': 'Person',
                  name: test.name,
                  jobTitle: test.role,
                },
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: test.rating || 5,
                  bestRating: 5,
                },
                reviewBody: test.content,
              })),
            }
          : {}),
      },
    ],
  };

  return (
    <>
      <WebflowInit pageId="68eddb21f14a8338ce862110" />

      {/* LLM & Search Engine Structured Data Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
