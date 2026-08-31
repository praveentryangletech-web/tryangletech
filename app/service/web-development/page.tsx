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

  return (
    <>
      <WebflowInit pageId="68eddb6fb6de895fcd6c3914" />

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
