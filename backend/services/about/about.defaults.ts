import { AboutContentDTO } from './about.types';

export const DEFAULT_ABOUT_CONTENT: AboutContentDTO = {
  id: 'about_main_v1',
  hero: {
    subBadgeText: 'about Tryangletech',
    headline: 'Your Trusted IT & Digital Partner',
    introParagraph1:
      'Tryangletech is a full-service IT company in Ahmedabad, helping businesses design, build, and grow with expert website development, mobile apps, digital marketing, and custom software solutions, all under one roof.',
    introParagraph2:
      "We don't just write code, we partner with you to solve real business challenges. No confusing jargon or hidden costs, just a dedicated local team that actually cares about your success.",
    stats: [
      { id: 'stat-1', value: '7+', label: 'Years of Experience' },
      { id: 'stat-2', value: '350+', label: 'Websites Developed' },
      { id: 'stat-3', value: '750+', label: 'Happy Clients' },
      { id: 'stat-4', value: '5+', label: 'Countries Served' },
    ],
    heroImage1: '/about-assets/690c2237c3412540538c8db2_taskopiya-about-hero-Hand.webp',
    heroImage1Alt: 'TryangleTech Software Engineering Excellence',
    heroImage2: '/about-assets/6915cf130e64f93cbd9e83bc_Mobile about.webp',
    heroImage2Alt: 'TryangleTech Mobile App Preview',
    bannerImage: '/about-assets/6915cd620829878f7ea58178_taskopiya-about-banner.webp',
    bannerImageAlt: 'TryangleTech Digital Product Engineering Team Banner',
    avatars: ['#38bdf8', '#3b82f6', '#a855f7'],
  },
  speciality: {
    subBadgeText: 'our speciality',
    heading: 'Building digital solutions that drive real business growth',
    description:
      'Our dedicated team works closely with you at every stage, turning complex challenges into streamlined, high-performing digital products that scale with your business.',
    benefits: [
      {
        id: 'benefit-1',
        icon: '/about-assets/6904af5ad9ca1a4322df6d9e_databaseicon-1.svg',
        title: 'Time Savings',
        description:
          "In our IT company with efficient and streamlined processes, you'll have more time to focus on what's important, whether that's growing your business or enjoying your personal pursuits.",
      },
      {
        id: 'benefit-2',
        icon: '/about-assets/6916ec6339f890a80905a69b_Vector (33).svg',
        title: 'Enhanced Productivity',
        description:
          'Experience a boost in productivity as our IT company solutions eliminate inefficiencies, enabling you and your team to accomplish more in less time.',
      },
      {
        id: 'benefit-3',
        icon: '/about-assets/6916ef876682eed2b2fd5911_Vector (34).svg',
        title: 'User-Friendly Solutions',
        description:
          'Our user-centric approach means our IT company solutions are designed with simplicity in mind, allowing you to benefit from technology without the learning curve.',
      },
    ],
  },
  missionVision: {
    subBadgeText: 'our core purpose',
    heading: 'Driven by a clear',
    headingHighlight: 'mission and vision',
    missionBadge: 'OUR MISSION',
    missionHeading: 'Empowering your digital transformation',
    missionParagraph1:
      'Our mission is to bridge the gap between complex business challenges and intuitive digital solutions. We strive to provide Ahmedabad and the world with top-tier IT services.',
    missionParagraph2:
      'We focus on delivering high-quality, scalable web and mobile applications that drive real growth, prioritizing clean code, user-centric design, and measurable results.',
    missionBullets: [
      'Delivering user-centric software solutions',
      'Maintaining 100% transparency in our processes',
      'Driving measurable, long-term business growth',
    ],
    missionImage: '/about-assets/690c408d17e948acfd9dd61a_taskopia-%20about-features-1.webp',
    missionImageAlt: 'TryangleTech Mission & Innovation',
    visionBadge: 'OUR VISION',
    visionHeading: 'Shaping the future of technology',
    visionParagraph1:
      'We envision a future where businesses of all sizes have access to enterprise-grade technology without the overwhelming complexity or hidden costs.',
    visionParagraph2:
      "Tryangletech aims to be the leading IT partner recognized for innovation, transparency, and an unwavering commitment to our clients' long-term success.",
    visionBullets: [
      'Pioneering innovative digital ecosystems',
      'Democratizing enterprise-grade technologies',
      'Fostering lasting partnerships built on trust',
    ],
    visionImage: '/about-assets/690c408c3798540bf3f8932b_taskopia-%20about-features-3.webp',
    visionImageAlt: 'TryangleTech Vision for Digital Engineering',
  },
  whyChooseUs: {
    subBadgeText: 'Why choose us',
    heading: 'Your trusted partner for digital',
    headingHighlight: 'growth and innovation',
    items: [
      {
        id: 'wcu-1',
        icon: '/about-assets/6916f56a114dfcf4637d80a2_Vector (36).svg',
        title: '7+ Years of Experience',
        description:
          'Over 7 years of delivering high-quality web, app, and software solutions to businesses across 5+ countries.',
      },
      {
        id: 'wcu-2',
        icon: '/about-assets/6916f56a80d627cd0ce40bd7_690091602dd7aa7a0c1228ed_kloudera-pricing-icon.svg',
        title: '750+ Happy Clients',
        description:
          'Trusted by 750+ happy clients worldwide from startups to established businesses across multiple industries.',
      },
      {
        id: 'wcu-3',
        icon: '/about-assets/6916f56ad8ac594c1debbb97_Vector (37).svg',
        title: '350+ Websites Delivered',
        description:
          'From business websites to e-commerce stores and custom web apps, 350+ successful projects and counting.',
      },
      {
        id: 'wcu-4',
        icon: '/about-assets/6916ef876682eed2b2fd5911_Vector (34).svg',
        title: 'Full-Service IT Company',
        description:
          'Website development, mobile apps, digital marketing, SEO, graphics, and custom software, everything your business needs under one roof.',
      },
    ],
  },
  process: {
    subBadgeText: 'our process',
    heading: 'Deliver projects on time through',
    headingHighlight: 'streamlined execution',
    steps: [
      {
        id: 'step-1',
        label: 'Discover',
        stepTitle: 'Requirement gathering',
        description:
          'We understand your business goals, target audience, and project scope to build the right solution.',
        icon: '/about-assets/690c7b256a26b771ea0562fb_Vector (27).svg',
      },
      {
        id: 'step-2',
        label: 'Design & Develop',
        stepTitle: 'Design & development',
        description:
          'Our team crafts stunning designs and builds robust, scalable solutions tailored to your needs.',
        icon: '/about-assets/690c7b2508ab483ef4047387_Vector (28).svg',
      },
      {
        id: 'step-3',
        label: 'Launch & Support',
        stepTitle: 'Launch & support',
        description:
          'We deploy your project, ensure everything runs smoothly, and provide ongoing support after launch.',
        icon: '/about-assets/6914525ddeeb169b19ad1aa4_Vector (29).svg',
      },
    ],
  },
  ctaBanner: {
    subBadgeText: 'GROW YOUR BUSINESS ONLINE',
    heading: 'Build smarter, launch faster, grow your business online',
    description:
      'Partner with Tryangletech for expert website development, digital marketing, and custom software solutions, all under one roof.',
    buttonText: 'Get started today',
    buttonLink: '/contact',
  },
  faqSection: {
    subBadgeText: 'Frequently asked questions',
    heading: 'Your common questions',
    headingHighlight: 'answered',
    ctaButtonText: 'Contact us today',
    ctaButtonLink: '/contact',
    faqs: [
      {
        id: 'faq-1',
        q: 'What services does Tryangletech offer?',
        a: 'We offer website design & development, digital marketing, SEO, graphics designing, mobile app development, and custom software development, all under one roof.',
      },
      {
        id: 'faq-2',
        q: 'Which industries do you serve?',
        a: 'We serve a wide range of industries including healthcare, finance, e-commerce, education, retail, and more, both in India and internationally.',
      },
      {
        id: 'faq-3',
        q: 'Do you provide support after project completion?',
        a: 'Yes, we provide ongoing maintenance and support after every project to ensure your website or app continues to perform at its best.',
      },
      {
        id: 'faq-4',
        q: 'How long does it take to complete a project?',
        a: "Project timelines vary based on complexity and requirements. A standard website typically takes 2–4 weeks, while larger projects may take longer. We'll give you a clear timeline before we start.",
      },
      {
        id: 'faq-5',
        q: 'Do you offer free hosting?',
        a: 'Yes, we offer 1 year of free hosting with our website development packages. Domain registration is handled separately by the client.',
      },
    ],
  },
  metaTitle: 'About Tryangle Tech | IT & Software Engineering Company in Ahmedabad',
  metaDescription:
    'Learn about Tryangle Tech, a premier IT company based in Ahmedabad delivering 350+ web, app, and custom software projects with transparent execution.',
  keywords: [
    'About TryangleTech',
    'IT Company in Ahmedabad',
    'Software Development Agency',
    'Web Development Company',
    'Mobile App Developers India',
  ],
  canonicalUrl: 'https://tryangletech.com/about',
  isPublished: true,
};
