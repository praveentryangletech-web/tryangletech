import React from "react";
import { servicesService } from "@/backend/services/services";
import CustomSoftwareHero from './components/CustomSoftwareHero';
import CustomSoftwareServices from './components/CustomSoftwareServices';
import CustomSoftwareAIAgents from './components/CustomSoftwareAIAgents';
import CustomSoftwareAbout from './components/CustomSoftwareAbout';
import CustomSoftwareFeatures from './components/CustomSoftwareFeatures';
import CustomSoftwareCore from './components/CustomSoftwareCore';
import CustomSoftwareTestimonial from './components/CustomSoftwareTestimonial';
import CustomSoftwareFAQ from './components/CustomSoftwareFAQ';
import WebflowInit from "../../common/WebflowInit";
import ProjectsSection from "../../home/components/ProjectsSection";

export const dynamic = 'force-dynamic';

export default async function CustomSoftwarePage() {
  const content = await servicesService.getCustomSoftwareContent();

  const pageUrl = content.canonicalUrl || 'https://tryangletech.com/service/custom-software';
  const siteUrl = 'https://tryangletech.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebPage Schema (SEO)
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metaTitle || 'Custom Software Development Ahmedabad | Tryangle Tech',
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
            name: 'Custom Software Development',
            item: pageUrl,
          },
        ],
      },

      // 3. Service & LocalBusiness Schema (SEO & GEO)
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.hero?.headline || 'Custom Software Development Services',
        serviceType: 'Custom Software Engineering, Enterprise ERP, CRM Systems, SaaS Platforms, Cloud Architecture',
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
          name: 'Custom Software Offerings',
          itemListElement: (content.services?.cards || []).map((card, idx) => ({
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
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <WebflowInit pageId="68eddb96ee2e53b120952722" />

      {/* Structured Data (SEO / AEO / GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ overflowX: "hidden" }}>
        <CustomSoftwareHero data={content.hero} />
        <CustomSoftwareServices data={content.services} />
        <CustomSoftwareAIAgents data={content.stats} />
        <CustomSoftwareAbout data={content.about} />
        <CustomSoftwareFeatures data={content.process} />
        <CustomSoftwareCore />
        <ProjectsSection hideFilter={true} categoryFilter={["Software Development"]} />
        <CustomSoftwareTestimonial data={content.testimonials} />
        <CustomSoftwareFAQ faqs={content.faqs} />
      </main>
    </>
  );
}
