import React from "react";
import { Metadata } from 'next';
import { servicesService } from '@/backend/services/services';
import WebDevHero from './components/WebDevHero';
import WebDevSpeciality from './components/WebDevSpeciality';
import WebDevTypes from './components/WebDevTypes';
import WebDevFeatures from './components/WebDevFeatures';
import WebDevServices from './components/WebDevServices';
import WebDevIntegration from './components/WebDevIntegration';
import WebDevPricing from './components/WebDevPricing';
import WebDevTechStack from './components/TechStack';
import WebDevCTA from './components/WebDevCTA';
import WebflowInit from "../../common/WebflowInit";
import ProjectsSection from "../../home/components/ProjectsSection";
import WebDevBottomFAQ from './components/WebDevBottomFAQ';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return await servicesService.generateWebDevMetadata();
}

export default async function WebDevelopmentPage() {
  const content = await servicesService.getWebDevContent();

  const pageUrl = content.canonicalUrl || 'https://tryangletech.com/service/web-development';
  const siteUrl = 'https://tryangletech.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebPage Schema (SEO)
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metaTitle || 'Website & Web Application Development | TryangleTech',
        description: content.metaDescription || content.hero?.subheadline,
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
        },
        inLanguage: 'en-US',
      },

      // 2. BreadcrumbList Schema (SEO)
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
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
            name: 'Services',
            item: `${siteUrl}/service`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Website & Web Application Development',
            item: pageUrl,
          },
        ],
      },

      // 3. Service & LocalBusiness Schema (SEO & GEO)
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.hero?.headline || 'Website & Web Application Development Services',
        serviceType: 'Web Development, Full-Stack Web Application Engineering, Next.js & React Development',
        description: content.hero?.subheadline || content.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${siteUrl}/#organization`,
          name: 'TryangleTech',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          image: `${siteUrl}/logo.png`,
          telephone: '+91-XXXXXXXXXX',
          email: 'contact@tryangletech.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ahmedabad',
            addressRegion: 'Gujarat',
            postalCode: '380015',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '23.0225',
            longitude: '72.5714',
          },
          priceRange: '$$',
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Ahmedabad',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Gujarat',
          },
          {
            '@type': 'Country',
            name: 'India',
          },
          {
            '@type': 'Country',
            name: 'United States',
          },
          {
            '@type': 'Country',
            name: 'United Kingdom',
          },
          {
            '@type': 'Country',
            name: 'Worldwide',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Website & Application Development Offerings',
          itemListElement: (content.types?.cards || []).map((card, idx) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              position: idx + 1,
              name: card.title,
              description: card.desc,
            },
          })),
        },
      },

      // 4. FAQPage Schema (AEO - Answer Engine Optimization for AI Search, Perplexity & Google SGE)
      ...(content.faqs && content.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${pageUrl}#faq`,
              mainEntity: content.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <WebflowInit pageId="68eddb6fb6de895fcd6c3914" />

      {/* Structured Data (SEO / AEO / GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ overflowX: "hidden" }}>
        <WebDevHero data={content.hero} />

        <WebDevSpeciality />

        <WebDevTypes data={content.types} />

        <WebDevFeatures data={content.speciality} />
        <WebDevServices />
        <WebDevIntegration />
        <ProjectsSection hideFilter={true} categoryFilter={["Business Website", "E-Commerce Website", "Landing Website"]} />
        <WebDevPricing />
        <WebDevTechStack data={content.techStack} />
        <WebDevBottomFAQ faqs={content.faqs} />
      </main>
    </>
  );
}
