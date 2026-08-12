"use client";
import React from 'react';
import PortfolioHero from '@/app/portfolio/components/PortfolioHero';
import PortfolioGrid from '@/app/portfolio/components/PortfolioGrid';

interface ProjectsSectionProps {
  hideFilter?: boolean;
  categoryFilter?: string[];
}

export default function ProjectsSection({ hideFilter, categoryFilter }: ProjectsSectionProps) {
  return (
    <section className="rt-hero-12">
      <PortfolioHero />
      <PortfolioGrid limit={6} hideFilter={hideFilter} categoryFilter={categoryFilter} />
    </section>
  );
}
