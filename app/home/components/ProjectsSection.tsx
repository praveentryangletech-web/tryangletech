"use client";
import React from 'react';
import PortfolioHero from '@/app/portfolio/components/PortfolioHero';
import PortfolioGrid from '@/app/portfolio/components/PortfolioGrid';

export default function ProjectsSection() {
  return (
    <section className="rt-hero-12">
      <PortfolioHero />
      <PortfolioGrid />
    </section>
  );
}
