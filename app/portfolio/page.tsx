import React from "react";
import WebflowInit from "../common/WebflowInit";

import { portfolioService } from '@/backend/services/portfolio';
import { portfolioCategoryService } from '@/backend/services/portfolio/category.service';
import PortfolioHero from "./components/PortfolioHero";
import PortfolioGrid from "./components/PortfolioGrid";
import HomeThreeFaq from "../home-three/components/Faq";
import HomeTwoTestimonial from "../home-two/components/HomeTwoTestimonial";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
