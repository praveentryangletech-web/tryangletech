import { geoService } from '@/backend/services/geo';
import prisma from '@/backend/db/client';
import { getBaseUrl } from '@/backend/utils/siteUrl';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();

  // 1. Fetch live published location hubs from database
  let locations: Array<{ city: string; country: string; slug: string }> = [];
  try {
    const dbLocations = await geoService.getAllLocations(false);
    locations = dbLocations.map((loc) => ({
      city: loc.city,
      country: loc.country,
      slug: loc.slug,
    }));
  } catch (err) {
    locations = [];
  }

  // 2. Fetch live published portfolio case studies
  let caseStudies: Array<{ title: string; slug: string; category?: string }> = [];
  try {
    const dbProjects = await prisma.portfolioProject.findMany({
      select: { title: true, slug: true, category: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });
    if (dbProjects && dbProjects.length > 0) {
      caseStudies = dbProjects;
    }
  } catch (err) {
    caseStudies = [];
  }

  // 3. Format Dynamic Markdown Output
  const locationList = locations.length > 0
    ? locations
        .map((loc) => `- [${loc.city}, ${loc.country}](${baseUrl}/${loc.slug}): Dedicated web development, mobile apps, and custom software engineering for businesses across ${loc.city}.`)
        .join('\n')
    : `- [Global Delivery](${baseUrl}): Dedicated remote software engineering worldwide.`;

  const caseStudyList = caseStudies
    .map((proj) => `- [${proj.title}](${baseUrl}/portfolio/${proj.slug})${proj.category ? ` (${proj.category})` : ''}`)
    .join('\n');

  const content = `# TryangleTech

> High-performance Web Development, Custom Software, Mobile Apps & Digital Growth Solutions.

TryangleTech (legal name: TryangleTech Solutions) is a premier digital technology and custom software engineering agency headquartered in Ahmedabad, Gujarat, India, delivering enterprise-grade digital systems, high-converting Next.js web applications, mobile apps, and custom software for clients globally, including active commercial hubs in **Dubai (United Arab Emirates)**, the United States, the United Kingdom, and India.

With over 7+ years of industry experience and 350+ successfully delivered projects, TryangleTech provides dedicated remote engineering teams, full timezone alignment (including Gulf Standard Time - GST for UAE & Middle East clients), bilingual English and Arabic web interface capabilities, and end-to-end product architecture.

## Core Capabilities & Services

- [Web Development](${baseUrl}/service/web-development): Custom Next.js & React web applications, headless CMS, e-commerce platforms, performance optimization, responsive business portals.
- [Custom Software Engineering](${baseUrl}/service/custom-software): Bespoke enterprise CRM, ERP systems, internal management tools, workflow automation, cloud backend systems, AI agent integrations.
- [Mobile Application Development](${baseUrl}/service/mobile-application): Cross-platform and native iOS & Android applications using Flutter and React Native.
- [Digital Marketing & SEO](${baseUrl}/service/digital-marketing): Technical SEO, performance marketing, conversion rate optimization (CRO), Google Ads, data-driven organic growth.
- [Graphics & UI/UX Design](${baseUrl}/service/graphics-designing): Modern brand identity, UI/UX systems, product design, conversion-focused design systems.

## Commercial Service Hubs & Regional Delivery

${locationList}
- [Global Technology Delivery](${baseUrl}): Remote IT staff augmentation, dedicated agile squads, and turn-key digital solutions worldwide.

## Portfolio & Case Studies

${caseStudyList}
- [Full Portfolio Directory](${baseUrl}/portfolio): 350+ case studies across healthcare, fintech, e-commerce, real estate, and manufacturing.

## Key Facts & Company Details

- **Company Name:** TryangleTech / TryangleTech Solutions
- **Headquarters:** 1st Floor-29/Vitthal Plaza, Opp. GEB, Nava Naroda, Ahmedabad, Gujarat 382330, India
- **Experience:** 7+ Years
- **Delivered Projects:** 350+ Projects
- **Primary Tech Stack:** Next.js, React, TypeScript, Node.js, Python, Flutter, React Native, PostgreSQL, AWS, TailwindCSS, Figma
- **Direct Phone:** +91 90338 78806
- **Email:** info.tryangletech@gmail.com / admin@tryangletech.com
- **Website:** ${baseUrl}
- **Consultation & Quotes:** ${baseUrl}/contact

## Full Documentation for AI Scraping

- [Full LLM Knowledge Base](${baseUrl}/llms-full.txt): Detailed service specifications, tech stack architectures, FAQ corpus, and programmatic location data.
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
