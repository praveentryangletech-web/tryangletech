import React from "react";
import { Metadata } from "next";
import WebflowInit from "../common/WebflowInit";
import PortfolioHero from "./components/PortfolioHero";
import PortfolioGrid from "./components/PortfolioGrid";
import HomeThreeFaq from "../home-three/components/Faq";
import HomeTwoTestimonial from "../home-two/components/HomeTwoTestimonial";
import { portfolioCategoryService, portfolioService } from "@/backend/services/portfolio";

const DEFAULT_CATEGORIES = [
  "All",
  "Business Website",
  "E-Commerce",
  "Landing Website",
  "Mobile Application",
  "Custom Software",
  "Graphic Design",
];

export const revalidate = 300; // 5-minute Edge ISR Cache

export const metadata: Metadata = {
  title: 'Client Case Studies & Software Portfolio | TryangleTech',
  description: 'Explore verified client case studies, custom web applications, mobile apps, and enterprise software engineered by TryangleTech.',
  alternates: {
    canonical: 'https://tryangletech.com/portfolio',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Client Case Studies & Software Portfolio | TryangleTech',
    description: 'Explore verified client case studies, custom web applications, and digital solutions delivered by TryangleTech.',
    url: 'https://tryangletech.com/portfolio',
    siteName: 'TryangleTech',
    type: 'website',
    images: [{ url: '/portfolio/vh-accounting.webp', width: 1200, height: 630, alt: 'TryangleTech Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Case Studies & Software Portfolio | TryangleTech',
    description: 'Explore verified client case studies, custom web applications, and digital solutions delivered by TryangleTech.',
    images: ['/portfolio/vh-accounting.webp'],
  },
};

export default async function PortfolioPage() {
  let initialCategories = DEFAULT_CATEGORIES;
  let initialProjects: any[] = [];

  try {
    const [cats, projs] = await Promise.all([
      portfolioCategoryService.getAllCategories('PORTFOLIO').catch(() => []),
      portfolioService.getPaginatedProjects({ page: 1, limit: 9 }).catch(() => ({ items: [] } as any)),
    ]);

    if (cats && Array.isArray(cats) && cats.length > 0) {
      const fetchedNames = cats.map((c: any) => c.name).filter(Boolean);
      const defaultNames = DEFAULT_CATEGORIES.filter((c) => c !== 'All');
      initialCategories = Array.from(new Set(['All', ...defaultNames, ...fetchedNames]));
    }

    if (projs && Array.isArray(projs.items) && projs.items.length > 0) {
      initialProjects = projs.items;
    }
  } catch (err) {
    console.warn('[PortfolioPage] SSR preload notice:', err);
  }

  const portfolioJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://tryangletech.com/portfolio#collection',
        url: 'https://tryangletech.com/portfolio',
        name: 'TryangleTech Client Case Studies & Software Portfolio',
        description:
          'Showcase of web development, mobile applications, and custom enterprise software delivered by TryangleTech.',
        publisher: {
          '@type': 'Organization',
          name: 'TryangleTech',
          url: 'https://tryangletech.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://tryangletech.com/logo.png',
          },
        },
        hasPart: initialProjects.slice(0, 12).map((proj) => ({
          '@type': 'CreativeWork',
          name: proj.title,
          headline: proj.title,
          url: `https://tryangletech.com/portfolio/${proj.slug}`,
          description: proj.description || proj.metaDescription || proj.title,
          genre: proj.category,
          image: proj.image || 'https://tryangletech.com/portfolio/vh-accounting.webp',
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://tryangletech.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Portfolio',
            item: 'https://tryangletech.com/portfolio',
          },
        ],
      },
    ],
  };

  return (
    <>
      <WebflowInit pageId="68eddb21f14a8338ce862110" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd),
        }}
      />

      <main>
        <section className="rt-hero-12">
          <PortfolioHero />
          <PortfolioGrid initialCategories={initialCategories} initialProjects={initialProjects.length > 0 ? initialProjects : undefined} />
        </section>
        <HomeThreeFaq />
        <HomeTwoTestimonial />
      </main>
    </>
  );
}
