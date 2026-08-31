import { ServiceMainContentDTO, ServicePageSummaryItem, WebDevContentDTO } from './services.types';

export const DEFAULT_SERVICES_LIST: ServicePageSummaryItem[] = [
  {
    id: 'service-main',
    slug: 'main',
    name: 'Main Services Overview',
    route: '/service',
    category: 'Core Service Hub',
    isMainPage: true,
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'service-web-dev',
    slug: 'web-development',
    name: 'Website & Web Application Development',
    route: '/service/web-development',
    category: 'Engineering & Web',
    isMainPage: false,
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'service-custom-software',
    slug: 'custom-software',
    name: 'Custom Software & Enterprise Solutions',
    route: '/service/custom-software',
    category: 'Enterprise Engineering',
    isMainPage: false,
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'service-mobile-app',
    slug: 'mobile-application',
    name: 'iOS & Android Mobile App Development',
    route: '/service/mobile-application',
    category: 'Mobile Applications',
    isMainPage: false,
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'service-graphics',
    slug: 'graphics-designing',
    name: 'Graphics Designing & UI/UX Experience',
    route: '/service/graphics-designing',
    category: 'Design & Visuals',
    isMainPage: false,
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'service-marketing',
    slug: 'digital-marketing',
    name: 'Digital Marketing & Growth Engineering',
    route: '/service/digital-marketing',
    category: 'Marketing & SEO',
    isMainPage: false,
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
];

export const DEFAULT_SERVICE_MAIN_CONTENT: ServiceMainContentDTO = {
  id: 'service-main',
  hero: {
    subBadgeText: 'Our Services',
    headline: 'Comprehensive Digital Solutions for Your Business Growth',
    subheadline:
      'From custom software to data-driven marketing, we provide end-to-end services designed to scale your business and drive innovation.',
    primaryBtnText: 'Get started today',
    primaryBtnLink: '/contact',
    secondaryBtnText: 'View portfolio',
    secondaryBtnLink: '/portfolio',
    trustBadges: ['Innovative Solutions', 'Expert Engineering', 'Client-Centric'],
    avatars: ['#38bdf8', '#3b82f6', '#a855f7'],
  },
  servicesList: [
    {
      id: 'card-custom-software',
      slug: 'custom-software',
      title: 'Custom Software Development',
      description:
        'We create custom software that fits exactly what your business needs. Our solutions help your team work faster and make growing your company a whole lot easier.',
      link: '/service/custom-software',
      images: [
        '/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp',
        '/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp',
        '/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp',
      ],
      icon: '/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg',
      badge: 'Enterprise Architecture',
    },
    {
      id: 'card-web-dev',
      slug: 'web-development',
      title: 'Website Development',
      description:
        'Get a beautiful website that works perfectly on any device. We design and build online experiences that grab attention and turn your visitors into loyal customers.',
      link: '/service/web-development',
      images: [
        '/Home3_files/690dad35e28b189c556cc11e_Taskopia-features-home-v3-right.webp',
        '/Home3_files/690dad35e3ae72cf7cacc7f0_Taskopia-features-home-v3-5.webp',
        '/Home3_files/690dad3509f6f587288a12d7_Taskopia-features-home-v3-7.webp',
      ],
      icon: '/Home3_files/690dad352e3eaaf91d055fe5_Taskopia-features-home-v3-icon.webp',
      badge: 'Modern Next.js Stack',
    },
    {
      id: 'card-mobile-app',
      slug: 'mobile-application',
      title: 'Mobile Application',
      description:
        'Connect with your customers wherever they are through a custom mobile app. We take your app idea and build an amazing experience for both Apple and Android phones.',
      link: '/service/mobile-application',
      images: [
        '/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp',
        '/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp',
        '/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp',
      ],
      icon: '/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg',
      badge: 'iOS & Android Native',
    },
    {
      id: 'card-graphics',
      slug: 'graphics-designing',
      title: 'Graphics Designing & UI/UX',
      description:
        'Make your brand stand out with stunning visuals that capture your unique identity. From beautiful logos and marketing materials to amazing user interfaces, our creative team designs everything you need to leave a lasting impression. We focus on blending beautiful aesthetics with smart functionality.',
      link: '/service/graphics-designing',
      images: [
        '/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp',
        '/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp',
        '/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp',
      ],
      icon: '/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg',
      badge: 'Design Systems & 3D',
    },
    {
      id: 'card-marketing',
      slug: 'digital-marketing',
      title: 'Digital Marketing & Growth',
      description:
        'Grow your audience and increase your sales online. We put together complete marketing strategies that help your business get noticed by the right people at the right time.',
      link: '/service/digital-marketing',
      images: [
        '/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp',
        '/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp',
        '/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp',
      ],
      icon: '/Home3_files/690d9fbfe8207af12de2d5dd_Vector 1553.svg',
      badge: 'Performance & ROI',
    },
  ],
  highlights: {
    subBadgeText: 'Key Highlights',
    heading: 'Deliver excellence, drive innovation, achieve scale',
    imageMain: '/Home2_files/69254371136c64c2548fd85e_taskopiya-home-two-project-over.webp',
    imageSmall: '/Home2_files/6912cb4228402e3879fa5f10_taskopia-home-two-who.webp',
    pillars: [
      {
        id: 'pillar-1',
        title: 'Collaboration',
        description: 'Partner with our dedicated experts to turn your vision into scalable solutions.',
        icon: 'bar-chart',
      },
      {
        id: 'pillar-2',
        title: 'Innovation',
        description: 'Leverage cutting-edge technologies and creative strategies to stay ahead of the curve.',
        icon: 'zap',
      },
      {
        id: 'pillar-3',
        title: 'Efficiency',
        description: 'Optimize your digital presence with high-performance applications and platforms.',
        icon: 'clock',
      },
      {
        id: 'pillar-4',
        title: 'Security',
        description: 'Enterprise-grade protection, rigorous compliance, and secure data handling standards.',
        icon: 'shield',
      },
    ],
  },
  tools: {
    subBadgeText: 'integration',
    heading: 'Streamline workflows, save time,',
    headingHighlight: 'enhance performance',
    tools: [
      { id: 't-1', name: 'React', icon: '/tech-icons/react.svg', category: 'Frontend' },
      { id: 't-2', name: 'Next.js', icon: '/tech-icons/nextjs.svg', category: 'Framework' },
      { id: 't-3', name: 'PHP', icon: '/tech-icons/php.svg', category: 'Backend' },
      { id: 't-4', name: 'AWS', icon: '/tech-icons/aws.svg', category: 'Cloud' },
      { id: 't-5', name: 'Docker', icon: '/tech-icons/docker.svg', category: 'DevOps' },
      { id: 't-6', name: 'Laravel', icon: '/tech-icons/laravel.svg', category: 'Backend' },
      { id: 't-7', name: 'Tailwind CSS', icon: '/tech-icons/tailwind.svg', category: 'Styling' },
      { id: 't-8', name: 'Figma', icon: '/tech-icons/figma.svg', category: 'Design' },
      { id: 't-9', name: 'Google Ads', icon: '/tech-icons/google-ads.svg', category: 'Marketing' },
      { id: 't-10', name: 'Razorpay', icon: '/tech-icons/razorpay.svg', category: 'Fintech' },
      { id: 't-11', name: 'Meta', icon: '/tech-icons/meta.svg', category: 'Social' },
    ],
  },
  faqs: [
    {
      id: 'faq-1',
      q: 'What types of services do you offer?',
      a: 'We offer a comprehensive suite of digital services including Custom Software Development, Web and Mobile App Development, UI/UX Graphics Designing, and full-scale Digital Marketing strategies to help businesses grow.',
    },
    {
      id: 'faq-2',
      q: 'Do you provide custom software solutions?',
      a: 'Yes, we specialize in building custom software tailored exactly to your unique business needs, ensuring scalability, performance, and seamless integration with your existing workflows.',
    },
    {
      id: 'faq-3',
      q: 'How long does a typical project take?',
      a: 'Project timelines vary depending on the scope and complexity. A simple website might take a few weeks, while a complex mobile application or custom software platform can take several months. We provide detailed timelines during the discovery phase.',
    },
    {
      id: 'faq-4',
      q: 'Do you offer post-launch support?',
      a: 'Absolutely. We provide ongoing maintenance and support for all our projects to ensure your software remains up-to-date, secure, and performs optimally as your business grows.',
    },
    {
      id: 'faq-5',
      q: 'Can you help with digital marketing and SEO?',
      a: 'Yes! Our digital marketing team provides data-driven strategies including SEO, social media management, and paid advertising to boost your online visibility and drive measurable conversions.',
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Michael Vance',
      role: 'Chief Technology Officer',
      company: 'Apex Digital Global',
      avatar: '/Home2_files/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp',
      rating: 5,
      content:
        'TryangleTech transformed our digital workflow with seamless custom software development. Their engineering speed, attention to detail, and communication are second to none.',
    },
    {
      id: 'test-2',
      name: 'Sarah Jenkins',
      role: 'Head of Product',
      company: 'Nova Commerce',
      avatar: '/Home2_files/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp',
      rating: 5,
      content:
        'The mobile application they built exceeded all our user adoption targets in the first quarter. Clean codebase, prompt delivery, and highly responsive support.',
    },
    {
      id: 'test-3',
      name: 'David Patel',
      role: 'Founder & CEO',
      company: 'ScaleX Ventures',
      avatar: '/Home2_files/6900857a13043eba725f30f1_kloudera-home-one-testimonial-client-image.webp',
      rating: 5,
      content:
        'From brand identity design to high-converting Web development and SEO, TryangleTech provides an unmatched 360-degree tech partnership.',
    },
  ],
  metaTitle: 'Our Services | Web, Mobile, Custom Software & Marketing | TryangleTech',
  metaDescription:
    'Explore TryangleTech’s full spectrum of digital services: Web Development, Custom Software Engineering, iOS/Android Apps, UI/UX Graphics Designing, and Growth Marketing.',
  keywords: [
    'Digital Services',
    'Custom Software Development',
    'Web Development',
    'Mobile Application Development',
    'Graphics Design UI/UX',
    'Digital Marketing Agency',
    'TryangleTech Services',
  ],
  canonicalUrl: 'https://tryangletech.com/service',
  isPublished: true,
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_WEB_DEV_CONTENT: WebDevContentDTO = {
  id: 'service-web-development',
  slug: 'web-development',
  hero: {
    subBadgeText: 'Web Development',
    headline: 'Websites that bring in customers, not just look nice',
    subheadline:
      'We build custom websites, WordPress sites, e-commerce stores, and business websites for companies across Ahmedabad and beyond. Every site is planned around what you sell, built to load fast, and backed by real support after launch - not just handed over and forgotten.',
    bullets: [
      {
        id: 'bullet-1',
        iconType: 'performance',
        title: 'Fast and reliable',
        desc: "Your website loads quickly on any device, so visitors don't get frustrated and leave.",
      },
      {
        id: 'bullet-2',
        iconType: 'seo',
        title: 'Built to rank on Google',
        desc: 'Every page is structured so search engines understand your content and show it to the right people.',
      },
      {
        id: 'bullet-3',
        iconType: 'responsive',
        title: 'Works on every screen',
        desc: 'Phones, tablets, laptops - your website looks and works right on all of them.',
      },
    ],
    primaryBtnText: 'Get started today',
    primaryBtnLink: '/contact',
    smallBadgeText: 'Built for you',
    imageRightOne: '/service-1-assets/690acfecf91d77770201a6cb_taskopia-service-one-hero-1.webp',
    imageRightTwo: '/service-1-assets/6916b40c8e7ba2243876a27f_taskopiya-service-one-hero.avif',
    imageBanner: '/service-1-assets/6915cd620829878f7ea58178_taskopiya-about-banner.webp',
    imageDot: '/service-1-assets/690ad30ba7100eb0c23fba01_taskopia-service-2-dot.webp',
  },
  speciality: {
    subBadgeText: 'Speciality',
    heading: 'Simplify workflows, collaborate seamlessly, and manage tasks effectively for better business growth',
    cards: [
      {
        id: 'spec-1',
        title: 'Centralized task organization',
        desc: 'Keep all tasks, projects, and deadlines in one place for easy tracking and visibility.',
        icon: '/service-1-assets/6916ed30eddd8192431b095e_specialiti-icon-1 (1).svg',
        images: [
          '/service-1-assets/690af46ec3c652eb36481b92_taskopia-service-two-speclality-1.webp',
          '/service-1-assets/6916ee81d584787f4358140a_taskopiya-service-one-seamless-2.webp',
        ],
      },
      {
        id: 'spec-2',
        title: 'Seamless team collaboration',
        desc: 'Keep all tasks, projects, and deadlines in one place for easy tracking and visibility.',
        icon: '/service-1-assets/6916ed30605dc4748f8c24c3_specialiti-icon-2 (1).svg',
        images: [
          '/service-1-assets/690af46e49d21abec7c4c84e_taskopia-service-two-speclality-4.webp',
          '/service-1-assets/6916ee3d48e50837b4bef350_taskopiya-service-one-seamless.webp',
          '/service-1-assets/690af46eda7a2f8b2df0dffa_taskopia-service-two-speclality-6.webp',
        ],
      },
      {
        id: 'spec-3',
        title: 'Smart automation & reminders',
        desc: 'Keep all tasks, projects, and deadlines in one place for easy tracking and visibility.',
        icon: '/service-1-assets/6916ed30dcc91e4de385f200_specialiti-icon-3 (1).svg',
        images: [
          '/service-1-assets/690af46ec3c652eb36481b95_taskopia-service-two-speclality-7.webp',
          '/service-1-assets/6916edd50bad7d0bc178eb08_Group 2085663575.png',
        ],
      },
    ],
  },
  types: {
    subBadgeText: 'website types',
    heading: 'Unveiling the Variety in Website Types We Build',
    cards: [
      {
        id: 'type-1',
        title: 'Business & Corporate Websites',
        desc: 'Comprehensive web presences engineered for companies that establish market authority, showcase capabilities, and capture commercial leads.',
        badge: 'Corporate',
      },
      {
        id: 'type-2',
        title: 'E-Commerce & Online Stores',
        desc: 'Scalable digital storefronts with frictionless product catalogs, 1-click checkout, automated inventory sync, and multi-currency payments.',
        badge: 'E-Commerce',
      },
      {
        id: 'type-3',
        title: 'Landing Pages & Funnels',
        desc: 'High-impact, single-purpose web pages engineered to promote specific products or marketing campaigns with maximum conversion rates.',
        badge: 'Landing Page',
      },
      {
        id: 'type-4',
        title: 'SaaS Platforms & Web Applications',
        desc: 'Feature-rich cloud applications with real-time user authentication, interactive dashboards, database synchronization, and scalable API workflows.',
        badge: 'Web App',
      },
      {
        id: 'type-5',
        title: 'Personal Websites & Blogs',
        desc: 'Personal branding platforms and content hubs where creators, consultants, and professionals share insights, publish articles, and build an audience.',
        badge: 'Personal Brand',
      },
    ],
  },
  techStack: {
    subBadgeText: 'Tech Stack',
    heading: 'We build with industry-leading modern technologies',
    items: [
      { id: 'tech-1', name: 'React.js', category: 'Frontend', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
      { id: 'tech-2', name: 'Next.js', category: 'React Framework', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg' },
      { id: 'tech-3', name: 'PHP', category: 'Backend', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg' },
      { id: 'tech-4', name: 'Tailwind CSS', category: 'Styling Framework', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
      { id: 'tech-5', name: 'PostgreSQL', category: 'Database', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' },
      { id: 'tech-6', name: 'AWS', category: 'Cloud', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
      { id: 'tech-7', name: 'Docker', category: 'Containerization', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg' },
    ],
  },
  faqs: [
    {
      id: 'faq-1',
      question: 'How long does it take to build a website?',
      answer: 'It depends on what you need. A simple business website usually takes around 3 to 5 weeks. Larger projects with more pages or features take a bit longer. We will always give you a clear timeline before we start.',
    },
    {
      id: 'faq-2',
      question: 'Do you keep working on the site after it goes live?',
      answer: 'Yes, we do. We offer support packages to keep your website updated, secure, and working well. You will not be left on your own once the project is done.',
    },
    {
      id: 'faq-3',
      question: 'Will my website work on phones and tablets?',
      answer: 'Definitely. Every website we build works well on all screen sizes including phones, tablets, and desktop computers. Your visitors get a good experience no matter what device they use.',
    },
    {
      id: 'faq-4',
      question: 'Can I make changes to my website myself?',
      answer: 'Yes. We set up a simple content management system so you can update your text and images on your own without needing to know how to code.',
    },
    {
      id: 'faq-5',
      question: 'Do you build web applications as well?',
      answer: 'Yes, we do. We build everything from simple websites to more complex web apps with features like user logins, dashboards, bookings, and more. Just tell us what you need and we will figure out the best way to build it.',
    },
  ],
  metaTitle: 'Website Development Company in Ahmedabad | Tryangle Tech',
  metaDescription: 'Custom websites, WordPress, and e-commerce development in Ahmedabad. Fast, mobile-friendly sites built to bring in customers, not just look good.',
  keywords: ['Web Development Ahmedabad', 'Website Design Ahmedabad', 'Next.js Development', 'E-Commerce Website Development', 'Custom Web Application'],
  canonicalUrl: 'https://tryangletech.com/service/web-development',
  isPublished: true,
  updatedAt: new Date().toISOString(),
};

