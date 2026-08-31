import React from "react";
import { servicesService } from "@/backend/services/services";
import WebflowInit from "../../common/WebflowInit";
import ProjectsSection from "../../home/components/ProjectsSection";

import DigitalMarketingHero from "./components/DigitalMarketingHero";
import DigitalMarketingMarquee from "./components/DigitalMarketingMarquee";
import DigitalMarketingAgent from "./components/DigitalMarketingAgent";
import DigitalMarketingAbout from "./components/DigitalMarketingAbout";
import DigitalMarketingFeatures from "./components/DigitalMarketingFeatures";
import DigitalMarketingChooseUs from "./components/DigitalMarketingChooseUs";
import DigitalMarketingToolsIntegration from "./components/DigitalMarketingToolsIntegration";
import DigitalMarketingFaq from "./components/DigitalMarketingFaq";

export const dynamic = 'force-dynamic';

export default async function DigitalMarketingPage() {
  const content = await servicesService.getDigitalMarketingContent();

  const pageUrl = content.canonicalUrl || 'https://tryangletech.com/service/digital-marketing';
  const siteUrl = 'https://tryangletech.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebPage Schema (SEO)
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metaTitle || 'Digital Marketing Company in Ahmedabad | SEO & Ads | Tryangle Tech',
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
            name: 'Digital Marketing & Growth Strategy',
            item: pageUrl,
          },
        ],
      },

      // 3. Service & LocalBusiness Schema (SEO & GEO)
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.hero?.headline || 'Digital Marketing & Growth Services',
        serviceType: 'Search Engine Optimization, Google Ads (PPC), Meta Ads, Social Media Marketing, Performance Marketing',
        description: content.hero?.subheadline || content.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${siteUrl}/#organization`,
          name: 'TryangleTech',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          image: `${siteUrl}/logo.png`,
          telephone: '+91 9033878806',
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
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '09:00',
              closes: '19:00',
            },
          ],
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Ahmedabad',
          },
          {
            '@type': 'State',
            name: 'Gujarat',
          },
          {
            '@type': 'Country',
            name: 'India',
          },
          {
            '@type': 'Place',
            name: 'Global',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital Marketing Services Catalog',
          itemListElement: (content.offerings?.cards || []).map((card, idx) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: card.title,
              description: card.desc,
            },
            position: idx + 1,
          })),
        },
      },

      // 4. FAQPage Schema (AEO)
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: (content.faqs || []).map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <WebflowInit pageId="68eddb2fff5c773ab7afbc89" />

      {/* Schema.org Structured Data Graph (SEO/AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <DigitalMarketingHero data={content.hero} />
        <DigitalMarketingMarquee logos={content.hero?.marqueeLogos} />
        <DigitalMarketingFeatures data={content.offerings} />
        <DigitalMarketingAgent data={content.statement} />
        <DigitalMarketingAbout data={content.approach} />
        <DigitalMarketingChooseUs data={content.whyUs} />
        <DigitalMarketingToolsIntegration data={content.stack} />
        <ProjectsSection hideFilter={true} categoryFilter={["Business Website", "Landing Website"]} />
        <DigitalMarketingFaq faqs={content.faqs} />
      </main>
    </>
  );
}
