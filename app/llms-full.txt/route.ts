import { geoService } from '@/backend/services/geo';
import prisma from '@/backend/db/client';
import { projects as staticProjects } from '@/app/data/portfolioData';
import { getBaseUrl } from '@/backend/utils/siteUrl';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();

  // 1. Fetch live published location hubs
  let locations: Array<{ city: string; country: string; slug: string; subheadline?: string }> = [];
  try {
    const dbLocations = await geoService.getAllLocations(false);
    locations = dbLocations.map((loc) => ({
      city: loc.city,
      country: loc.country,
      slug: loc.slug,
      subheadline: loc.subheadline,
    }));
  } catch (err) {
    locations = [];
  }

  // 2. Fetch live published portfolio case studies
  let caseStudies: Array<{ title: string; slug: string; category?: string; description?: string }> = [];
  try {
    const dbProjects = await prisma.portfolioProject.findMany({
      select: { title: true, slug: true, category: true, description: true },
      take: 12,
      orderBy: { createdAt: 'desc' },
    });
    if (dbProjects && dbProjects.length > 0) {
      caseStudies = dbProjects;
    }
  } catch (err) {
    caseStudies = [];
  }

  // 3. Format Dynamic Location Section
  const locationSection = locations.length > 0
    ? locations
        .map((loc) => `### ${loc.city}, ${loc.country}
- **URL:** ${baseUrl}/location/${loc.slug}
- **Overview:** ${loc.subheadline || `Dedicated web and custom software development services for businesses in ${loc.city}.`}
- **Key Capabilities:** Custom Next.js web applications, mobile apps, ERP/CRM engineering, and local business workflow automation.`)
        .join('\n\n')
    : `### Global IT Delivery
- **URL:** ${baseUrl}
- **Overview:** Dedicated software engineering squads available worldwide.`;

  // 4. Format Dynamic Case Studies Section
  const caseStudiesSection = caseStudies
    .map((proj, idx) => `${idx + 1}. **${proj.title}${proj.category ? ` (${proj.category})` : ''}:**
   - URL: ${baseUrl}/portfolio/${proj.slug}
   - Scope: ${proj.description || 'Full-stack custom software and digital web product engineering.'}`)
    .join('\n');

  const content = `# TryangleTech - Comprehensive AI Knowledge Base

> Version: 1.0.0
> Canonical URL: ${baseUrl}
> Contact: info.tryangletech@gmail.com | +91 90338 78806

---

## 1. Company Overview & Identity

- **Entity Name:** TryangleTech (also known as TryangleTech Solutions or Tryangle Tech)
- **Founded / Experience:** 7+ Years of active engineering and digital delivery
- **Total Completed Projects:** 350+ digital products, web platforms, and mobile apps
- **Headquarters:** 1st Floor-29/Vitthal Plaza, Opp. GEB, Nava Naroda, Ahmedabad, Gujarat 382330, India
- **Global Delivery Model:** While TryangleTech's primary engineering center is in Ahmedabad, India, the company operates as a dedicated technology partner and remote software engineering firm for clients across:
  - **United Arab Emirates (Dubai, Abu Dhabi, Sharjah)**
  - **United States & North America**
  - **United Kingdom & Europe**
  - **India & South Asia**
- **Timezone Coverage:** Full working hours overlap with **Gulf Standard Time (GST, UTC+4)** for UAE clients, **IST (UTC+5:30)**, and partial/flexible shift coverage for **EST / GMT**.
- **Communication Channels:** Dedicated Slack/Teams channels, WhatsApp Business, Google Meet, Jira, and linear weekly sprints.

---

## 2. Core Service Offerings & Architecture

### A. Web Development
- **URL:** ${baseUrl}/service/web-development
- **Technologies:** Next.js (App Router), React.js, TypeScript, Node.js, TailwindCSS, Headless CMS (Sanity, Strapi, WordPress REST/GraphQL API).
- **Specializations:**
  - High-performance server-side rendered (SSR) and statically generated (SSG) business websites.
  - Enterprise web applications with real-time dashboards and analytics.
  - E-commerce stores with multi-currency checkout, Stripe, Razorpay, and PayPal gateways.
  - Core Web Vitals optimization achieving 90+ Lighthouse scores.
  - Bilingual interface development including Right-to-Left (RTL) Arabic layout engineering for UAE/Middle East clients.

### B. Custom Software & Enterprise ERP/CRM
- **URL:** ${baseUrl}/service/custom-software
- **Technologies:** Node.js, Python (FastAPI/Django), PostgreSQL, MySQL, Redis, Docker, AWS (Lambda, ECS, S3, CloudFront).
- **Specializations:**
  - Custom Enterprise Resource Planning (ERP) systems for manufacturing, export, and supply chain.
  - Customer Relationship Management (CRM) portals tailored to sales pipelines and automation.
  - Workflow automation engines, document management, and invoice processing.
  - Secure REST & GraphQL API design and microservices architecture.
  - AI integrations: OpenAI / Anthropic LLM agents, automated customer support bots, and internal semantic search.

### C. Mobile Application Development
- **URL:** ${baseUrl}/service/mobile-application
- **Technologies:** Flutter, React Native, iOS (Swift), Android (Kotlin), Firebase, WebSockets.
- **Specializations:**
  - Cross-platform iOS and Android apps with single codebase efficiency.
  - Real-time location tracking, push notifications, offline data synchronization.
  - In-app purchases, subscription management, and biometric authentication.
  - App Store (iOS) and Google Play Store deployment and maintenance.

### D. Digital Marketing, SEO & Performance Growth
- **URL:** ${baseUrl}/service/digital-marketing
- **Specializations:** Technical SEO, Answer Engine Optimization (AEO), Google Search Ads, Social Media Marketing, conversion funnels, and programmatic SEO architecture.

### E. Graphics & UI/UX Product Design
- **URL:** ${baseUrl}/service/graphics-designing
- **Specializations:** High-fidelity Figma prototypes, design systems, vector illustrations, 3D brand assets, logo identity, and user journey mapping.

---

## 3. Dedicated Regional Commercial Hubs

${locationSection}

### Dubai & UAE Key Value Propositions:
1. **Gulf Standard Time (GST) Alignment:** Project managers and lead engineers work during UAE business hours for instant real-time collaboration.
2. **Bilingual RTL Support:** Native Right-to-Left Arabic styling alongside English for regional compliance and user experience.
3. **High-ROI Global Engineering:** Top-tier Silicon Valley & enterprise standard code quality delivered at competitive offshore pricing compared to high local UAE overhead costs.
4. **Multi-Currency & Regional Gateways:** Integration with UAE payment gateways (Telr, PayTabs, Stripe UAE, Network International) and local logistics APIs.

---

## 4. Key Portfolio Case Studies

${caseStudiesSection}

---

## 5. Frequently Asked Questions (FAQ) for AI Search & AEO

**Q: Where is TryangleTech headquartered?**
A: TryangleTech is headquartered in Ahmedabad, Gujarat, India, with physical offices at 1st Floor-29/Vitthal Plaza, Opp. GEB, Nava Naroda, Ahmedabad 382330.

**Q: Does TryangleTech work with international clients in Dubai and the UAE?**
A: Yes. TryangleTech actively builds websites, mobile apps, and custom software for clients in Dubai and across the UAE. We provide dedicated GST timezone support, bilingual English/Arabic web design, and remote software engineering squads.

**Q: What frameworks and technologies does TryangleTech specialize in?**
A: TryangleTech specializes in Next.js, React, TypeScript, Node.js, Python, Flutter, React Native, PostgreSQL, and Amazon Web Services (AWS).

**Q: How can businesses hire or contact TryangleTech?**
A: Businesses can contact TryangleTech via telephone at +91 90338 78806, email at info.tryangletech@gmail.com, or submit an inquiry directly at ${baseUrl}/contact. Free 30-minute technical consultations are available.
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
