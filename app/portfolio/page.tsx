import React from "react";
import { Metadata } from "next";
import WebflowInit from "../common/WebflowInit";

import { portfolioService } from '@/backend/services/portfolio';
import { portfolioCategoryService } from '@/backend/services/portfolio/category.service';
import PortfolioHero from "./components/PortfolioHero";
import PortfolioGrid from "./components/PortfolioGrid";
import HomeThreeFaq from "../home-three/components/Faq";
import HomeTwoTestimonial from "../home-two/components/HomeTwoTestimonial";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Client Case Studies & Software Portfolio | TryangleTech',
  description: 'Explore verified client case studies, custom web applications, mobile apps, and enterprise software engineered by TryangleTech.',
  alternates: {
    canonical: 'https://tryangletech.com/portfolio',
  },
  openGraph: {
    title: 'Client Case Studies & Software Portfolio | TryangleTech',
    description: 'Explore verified client case studies, custom web applications, and digital solutions delivered by TryangleTech.',
    url: 'https://tryangletech.com/portfolio',
    type: 'website',
    images: [{ url: '/portfolio/vh-accounting.webp', width: 1200, height: 630, alt: 'TryangleTech Portfolio' }],
  },
};

export default async function PortfolioPage() {
  let initialProjects: any[] = [];
  let initialCategories: string[] = ['All'];

  try {
    const [projectsResult, catsResult] = await Promise.allSettled([
      portfolioService.getPaginatedProjects({
        limit: 100,
        sortBy: 'order',
        sortOrder: 'asc',
      }),
      portfolioCategoryService.getAllCategories('PORTFOLIO'),
    ]);

    if (projectsResult.status === 'fulfilled' && projectsResult.value && Array.isArray(projectsResult.value.items)) {
      initialProjects = projectsResult.value.items;
    }

    if (catsResult.status === 'fulfilled' && catsResult.value && Array.isArray(catsResult.value) && catsResult.value.length > 0) {
      initialCategories = ['All', ...catsResult.value.map((c) => c.name)];
    }
  } catch (err) {
    console.warn('Failed to prefetch SSR portfolio:', err);
  }

  return (
    <>
      <WebflowInit pageId="68eddb21f14a8338ce862110" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "TryangleTech Client Case Studies & Software Portfolio",
            "url": "https://tryangletech.com/portfolio",
            "description": "Showcase of web development, mobile applications, and custom enterprise software delivered by TryangleTech.",
            "publisher": {
              "@type": "Organization",
              "name": "TryangleTech",
              "url": "https://tryangletech.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tryangletech.com/icon.png"
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": initialProjects.slice(0, 20).map((proj, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "url": `https://tryangletech.com/portfolio/${proj.slug}`,
                "name": proj.title,
                "image": proj.image || "https://tryangletech.com/portfolio/vh-accounting.webp",
                "description": proj.description || proj.metaDescription || `Case study for ${proj.title}`
              }))
            }
          })
        }}
      />

      <main>
        <section className="rt-hero-12">
          <PortfolioHero />
          <PortfolioGrid initialProjects={initialProjects} initialCategories={initialCategories} />
        </section>
        <HomeThreeFaq />
        <HomeTwoTestimonial />
      </main>
    </>
  );
}

