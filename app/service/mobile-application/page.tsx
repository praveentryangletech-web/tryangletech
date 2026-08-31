import React from "react";
import { Metadata } from 'next';
import { servicesService } from '@/backend/services/services';
import MobileApplicationHero from './components/MobileApplicationHero';
import MobileApplicationSimplified from './components/MobileApplicationSimplified';
import MobileApplicationTypes from './components/MobileApplicationTypes';
import MobileApplicationOurServices from './components/MobileApplicationOurServices';
import MobileApplicationCases from './components/MobileApplicationCases';
import MobileApplicationFeatures from './components/MobileApplicationFeatures';
import ProjectsSection from "../../home/components/ProjectsSection";
import MobileApplicationTestimonial from './components/MobileApplicationTestimonial';
import MobileApplicationFAQ from './components/MobileApplicationFAQ';
import WebflowInit from "../../common/WebflowInit";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return await servicesService.generateMobileAppMetadata();
}

export default async function MobileApplicationPage() {
  const content = await servicesService.getMobileAppContent();

  const pageUrl = content.canonicalUrl || 'https://tryangletech.com/service/mobile-application';
  const siteUrl = 'https://tryangletech.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebPage Schema (SEO)
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metaTitle || 'Mobile App Development Company in Ahmedabad | Tryangle Tech',
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
            name: 'iOS & Android Mobile App Development',
            item: pageUrl,
          },
        ],
      },

      // 3. Service & LocalBusiness Schema (SEO & GEO)
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.hero?.headline || 'iOS & Android Mobile App Development Services',
        serviceType: 'Mobile App Development, React Native, Flutter, Swift, Kotlin, Enterprise Mobile Engineering',
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
          name: 'Mobile Application Engineering Offerings',
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
      <WebflowInit pageId="68eddba421ea11fa0687f4f0" />

      {/* Structured Data (SEO / AEO / GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ overflowX: "hidden" }}>
        <MobileApplicationHero data={content.hero} />
        <MobileApplicationSimplified data={content.process} />
        <MobileApplicationTypes data={content.types} />
        <MobileApplicationOurServices data={content.engineering} />
        <MobileApplicationCases data={content.advantage} />
        <MobileApplicationFeatures data={content.features} />
        <ProjectsSection hideFilter={true} categoryFilter={["App Development"]} />
        <MobileApplicationTestimonial data={content.testimonials} />
        <MobileApplicationFAQ faqs={content.faqs} />
      </main>
    </>
  );
}
