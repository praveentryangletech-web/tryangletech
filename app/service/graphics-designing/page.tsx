import React from "react";
import { servicesService } from "@/backend/services/services";
import WebflowInit from "../../common/WebflowInit";
import ProjectsSection from "../../home/components/ProjectsSection";

import GraphicsDesigningHero from './components/GraphicsDesigningHero';
import GraphicsDesigningFeatures from './components/GraphicsDesigningFeatures';
import GraphicsDesigningAbout from './components/GraphicsDesigningAbout';
import GraphicsDesigningServices from './components/GraphicsDesigningServices';
import GraphicsDesigningCore from './components/GraphicsDesigningCore';
import GraphicsDesigningTestimonial from './components/GraphicsDesigningTestimonial';
import GraphicsDesigningAIAgents from './components/GraphicsDesigningAIAgents';
import GraphicsDesigningFAQ from './components/GraphicsDesigningFAQ';

export const dynamic = 'force-dynamic';

export default async function GraphicsDesigningPage() {
  const content = await servicesService.getGraphicsDesigningContent();

  const pageUrl = content.canonicalUrl || 'https://tryangletech.com/service/graphics-designing';
  const siteUrl = 'https://tryangletech.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebPage Schema (SEO)
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: content.metaTitle || 'Graphic Design Studio in Ahmedabad | Branding & UI/UX | Tryangle Tech',
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
            name: 'Graphics Designing & UI/UX Experience',
            item: pageUrl,
          },
        ],
      },

      // 3. Service & LocalBusiness Schema (SEO & GEO)
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: content.hero?.headline || 'Graphic Design & Branding Services',
        serviceType: 'Logo Design, Corporate Stationery, Brochure Design, Packaging & Label Design, Outdoor Billboards, Visual Brand Identity, UI/UX Design',
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
          name: 'Graphic Design Services Catalog',
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
      <WebflowInit pageId="68eddb96ee2e53b120952722" />

      {/* Schema.org Structured Data Graph (SEO/AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <GraphicsDesigningHero data={content.hero} />
        <GraphicsDesigningFeatures data={content.offerings} />
        <GraphicsDesigningAbout data={content.about} />
        <GraphicsDesigningServices data={content.capabilities} />
        <GraphicsDesigningCore data={content.core} />
        <ProjectsSection hideFilter={true} categoryFilter={["Graphic Design"]} />
        <GraphicsDesigningTestimonial data={content.testimonials} />
        <GraphicsDesigningAIAgents data={content.stats} />
        <GraphicsDesigningFAQ faqs={content.faqs} />
      </main>
    </>
  );
}
