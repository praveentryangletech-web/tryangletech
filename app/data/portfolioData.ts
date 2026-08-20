export const PORTFOLIO_CATEGORIES = [
  'Business Website',
  'E-Commerce',
  'Mobile Application',
  'Custom Software',
  'Graphic Design',
  'Landing Website',
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number] | (string & {});

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  description: string;
  client?: string;
  duration?: string;
  role?: string;
  liveUrl?: string;
  content?: string;
  hasLiveUrl?: boolean;
  images?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  technologies?: string[];
  metaTitle?: string;
  metaDescription?: string;
  aeoSummary?: string;
  keywords?: string[];
  geoRegion?: string;
  canonicalUrl?: string;
  order?: number;
}

export const projects: Project[] = [
  // Business Websites
  {
    slug: "vh-accounting",
    title: "VH Accounting",
    category: "Business Website",
    image: "/portfolio/vh-accounting.webp",
    description: "A professional business website for an accounting firm, built for credibility and lead generation.",
    client: "VH Accounting",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://vh-accounting.com",
    images: ["/portfolio/vh-accounting.webp", "/portfolio/software-eoffice.webp", "/portfolio/devrshree.webp"],
    content: "VH Accounting required a modern digital presence to reflect their expertise and attract high-value corporate clients. We developed a clean, professional platform focused on user experience and lead generation. By implementing clear service breakdowns, trust-building testimonials, and a streamlined contact flow, the new website successfully increased their monthly client inquiries and improved their overall brand authority.",
    challenges: [
      "Outdated digital presence that didn't reflect their professional standing",
      "Low conversion rate from website visitors to lead inquiries",
      "Difficulty in clearly presenting their complex service offerings"
    ],
    solutions: [
      "Designed a highly professional, modern UI with clear navigation paths",
      "Implemented a strategic lead-generation funnel with prominent CTAs",
      "Restructured service pages to clearly communicate value propositions"
    ],
    results: [
      "40% increase in monthly qualified client inquiries",
      "Significantly reduced bounce rate across service pages",
      "Enhanced brand authority and credibility in the local market"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    slug: "evon-ceramics",
    title: "Evon Ceramics",
    category: "Business Website",
    image: "/portfolio/evon-ceramics.webp",
    description: "A product showcase website for a ceramics manufacturer, focused on B2B enquiry generation.",
    client: "Evon Ceramics",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://evonceramics.com",
    content: "Evon Ceramics needed a robust platform to showcase their extensive product catalog to B2B distributors worldwide. We designed an interactive, highly visual website that allows users to easily filter and explore ceramic collections. The seamless user journey and optimized product pages led to a significant boost in wholesale inquiries and expanded their global digital footprint.",
    challenges: [
      "Managing and displaying a massive catalog of ceramic products",
      "Providing a seamless browsing experience for B2B wholesale buyers",
      "Creating an immersive visual experience that highlights product quality"
    ],
    solutions: [
      "Developed a custom dynamic catalog with advanced filtering and search",
      "Integrated high-resolution image galleries and 3D product viewers",
      "Built a seamless B2B inquiry system for bulk orders"
    ],
    results: [
      "Expanded digital reach to over 15 new international markets",
      "300% increase in B2B wholesale catalog downloads",
      "Dramatically improved user engagement and time-on-site metrics"
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "AWS S3"],
  },
  {
    slug: "7d-design-studios",
    title: "7D Design Studios",
    category: "Business Website",
    image: "/portfolio/7d-design-studios.webp",
    description: "A portfolio and service website for an interior design studio, showcasing their work and expertise.",
    client: "7D Design Studios",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://7ddesignstudios.in",
    content: "For 7D Design Studios, the website itself had to be a masterpiece of design. We created a visually stunning, minimalist portfolio platform that puts their architectural and interior design projects center stage. High-resolution galleries, smooth animations, and an intuitive layout perfectly communicate their aesthetic sensibilities to prospective high-end clients.",
    challenges: [
      "Translating premium architectural design aesthetics into a digital format",
      "Showcasing high-resolution images without sacrificing page load speeds",
      "Standing out in a highly competitive luxury interior design market"
    ],
    solutions: [
      "Engineered a minimalist, highly immersive masonry layout portfolio",
      "Implemented advanced image optimization and lazy-loading techniques",
      "Added smooth, cinematic page transitions and micro-animations"
    ],
    results: [
      "Perfect 100/100 Google Lighthouse performance score despite heavy media",
      "Successfully attracted several high-net-worth individual (HNWI) clients",
      "Recognized by multiple digital design inspiration galleries"
    ],
    technologies: ["React", "GSAP", "Three.js", "Styled Components"],
  },
  {
    slug: "ansh-exports",
    title: "Ansh Exports",
    category: "Business Website",
    image: "/portfolio/ansh-exports.webp",
    description: "A comprehensive business website built for an export company with product showcases.",
    client: "Ansh Exports",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://anshexports.in",
    content: "Ansh Exports approached us to build a comprehensive corporate website to facilitate international trade. We structured the site to highlight their diverse product range, quality certifications, and global logistics capabilities. The result is a highly professional, fast-loading platform that instills trust in international buyers and streamlines the quotation request process.",
    challenges: [
      "Communicating logistical complexities and quality standards clearly",
      "Catering to a diverse, multi-lingual international audience",
      "Streamlining the complex quotation request process for bulk goods"
    ],
    solutions: [
      "Built a robust, multi-regional corporate platform with clear messaging",
      "Designed an intuitive, multi-step quotation request system",
      "Integrated prominent trust signals, certifications, and compliance metrics"
    ],
    results: [
      "Reduced quotation processing time by over 50%",
      "Increased international leads from emerging markets by 25%",
      "Established a dominant, trustworthy digital presence in their sector"
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Vercel"],
  },

  {
    slug: "stonils",
    title: "Stonils",
    category: "Business Website",
    image: "/portfolio/stonils.webp",
    description: "A modern business website for a stone and marble supplier, with product catalogue and contact integration.",
    client: "Stonils",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://stonils.com",
    content: "Stonils approached us to elevate their digital presence in the competitive stone and marble supplier market. We designed a modern, visually compelling website that acts as a digital showroom. By integrating high-quality galleries and intuitive product categorization, we made it easier for architects and builders to explore their catalog, leading to a substantial increase in B2B inquiries.",
    challenges: [
      "Showcasing a large variety of natural stones with accurate color representation",
      "Organizing the product catalog for both B2B and B2C audiences",
      "Standing out from local competitors with outdated digital presences"
    ],
    solutions: [
      "Built a custom digital showroom with high-resolution, optimized imagery",
      "Implemented a dual-navigation structure to cater to different audience types",
      "Integrated a quick-quote system for bulk material orders"
    ],
    results: [
      "45% increase in online quotation requests",
      "Improved brand perception among high-end interior designers",
      "Decreased bounce rate by streamlining catalog navigation"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    slug: "sahjanand-test-lab",
    title: "Sahjanand Test Lab",
    category: "Business Website",
    image: "/portfolio/sahjanand-test-lab.webp",
    description: "A professional website for a diagnostic lab, designed for trust-building and appointment enquiries.",
    client: "Sahjanand Test Lab",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://sahjanandtestlab.com",
    content: "Sahjanand Test Lab needed a professional platform to build trust with patients and streamline their appointment booking process. We delivered a clean, accessible website that prioritizes user experience and mobile responsiveness. The clear presentation of services and easy-to-use booking features have significantly reduced administrative overhead.",
    challenges: [
      "Building patient trust through a professional digital presence",
      "Simplifying the process of booking diagnostic tests online",
      "Ensuring the website is accessible to elderly and non-tech-savvy users"
    ],
    solutions: [
      "Designed a highly legible, clean medical UI with clear typography",
      "Developed a streamlined, one-click appointment booking form",
      "Organized test packages and pricing into easy-to-compare tables"
    ],
    results: [
      "60% increase in online appointment bookings",
      "30% reduction in phone inquiries for basic test information",
      "Established as a highly trusted local healthcare provider"
    ],
    technologies: ["Next.js", "TypeScript", "Vercel"],
  },
  {
    slug: "nira-energy",
    title: "Nira Energy",
    category: "Business Website",
    image: "/portfolio/nira-energy.webp",
    description: "A clean corporate website for an energy solutions company with service listings and contact forms.",
    client: "Nira Energy",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://niraenergy.in",
    content: "Nira Energy required a robust corporate website to highlight their sustainable energy solutions. We crafted a professional, authoritative platform that effectively communicates their mission and technical expertise. Strategic calls-to-action and clear service listings have successfully driven more qualified leads to their sales team.",
    challenges: [
      "Explaining complex energy solutions in an easy-to-understand format",
      "Generating qualified B2B leads for large-scale energy projects",
      "Establishing authority in the rapidly growing renewable energy sector"
    ],
    solutions: [
      "Created educational content sections with clear infographics",
      "Implemented strategic lead-capture forms across all service pages",
      "Designed a sleek, eco-friendly visual identity and color palette"
    ],
    results: [
      "Doubled the number of monthly B2B project inquiries",
      "Improved search visibility for key energy-related terms",
      "Enhanced credibility during corporate sales pitches"
    ],
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
  },
  {
    slug: "paperwork-llp",
    title: "Paperwork LLP",
    category: "Business Website",
    image: "/portfolio/paperwork-llp.webp",
    description: "A professional business website for a legal and compliance firm, designed for client trust.",
    client: "Paperwork LLP",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://paperworkllp.com",
    content: "Paperwork LLP, a legal and compliance firm, needed a digital platform that exudes professionalism, trust, and confidentiality. We designed a highly secure, clean, and corporate website that clearly details their compliance services and expertise, making it effortless for prospective clients to request consultations.",
    challenges: [
      "Conveying absolute trust, security, and professionalism online",
      "Organizing a wide array of legal and compliance services",
      "Generating high-value leads while maintaining confidentiality"
    ],
    solutions: [
      "Designed a highly corporate, authoritative UI using strong typography",
      "Structured services into intuitive categories with detailed descriptions",
      "Implemented secure, encrypted contact forms for client inquiries"
    ],
    results: [
      "Significant increase in inquiries for premium compliance services",
      "Established a commanding online presence in the legal sector",
      "Improved client onboarding efficiency through digital forms"
    ],
    technologies: ["Next.js", "Node.js", "React Hook Form"],
  },
  {
    slug: "ramashray",
    title: "Ramashray",
    category: "Business Website",
    image: "/portfolio/ramashray.webp",
    description: "A business website designed to build online presence and drive local customer enquiries.",
    client: "Ramashray",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://ramashray.in",
    content: "Ramashray sought to build a strong online presence to drive local customer engagement. We developed a user-friendly, responsive business website that clearly showcases their offerings and core values. By optimizing for local search and streamlining the contact process, the website has become a key driver for their regional growth.",
    challenges: [
      "Creating a digital footprint for a traditionally offline business",
      "Driving local foot traffic and regional inquiries",
      "Ensuring the website is fast and usable on low-end mobile devices"
    ],
    solutions: [
      "Built a highly optimized, lightweight mobile-first website",
      "Implemented strong Local SEO practices and structured data",
      "Added prominent click-to-call buttons and location maps"
    ],
    results: [
      "Boosted local search visibility and map pack rankings",
      "Increased daily mobile inquiries by over 50%",
      "Successfully transitioned the business to a digital-first marketing approach"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "patel-associates",
    title: "Patel Associates",
    category: "Business Website",
    image: "/portfolio/patel-associates.webp",
    description: "A professional website for a business consulting firm, focused on credibility and lead generation.",
    client: "Patel Associates",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://patelassociates.in",
    content: "Patel Associates required a dignified and professional website to support their business consulting services. We delivered a clean, corporate platform focused on establishing credibility and generating leads. The new site highlights their successful track record and makes it simple for potential clients to get in touch.",
    challenges: [
      "Differentiating the firm from other local consulting agencies",
      "Showcasing past success stories without violating client confidentiality",
      "Converting website visitors into scheduled consultation calls"
    ],
    solutions: [
      "Designed a modern, authoritative layout with a focus on typography",
      "Created anonymous case study formats to highlight expertise",
      "Integrated an automated consultation scheduling system"
    ],
    results: [
      "35% increase in booked initial consultations",
      "Elevated brand perception among enterprise clients",
      "Streamlined the lead qualification process"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    slug: "sundaram-corpo",
    title: "Sundaram Corpo",
    category: "Business Website",
    image: "/portfolio/sundaram-corpo.webp",
    description: "A corporate website built for a business services company with a clean, modern aesthetic.",
    client: "Sundaram Corpo",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://sundaramcorpo.com",
    content: "Sundaram Corpo wanted to refresh their corporate identity and provide a centralized hub for their diverse business services. We designed a highly structured, scalable website that allows users to easily navigate their corporate offerings. The modernized UI significantly boosted their credibility during client pitches.",
    challenges: [
      "Organizing multiple distinct business services into a unified structure",
      "Modernizing an outdated corporate visual identity",
      "Improving the speed and responsiveness of their digital platform"
    ],
    solutions: [
      "Created a mega-menu navigation system for seamless browsing",
      "Implemented a fresh, corporate-focused color palette and typography",
      "Optimized the entire site architecture for faster load times"
    ],
    results: [
      "Significantly improved user navigation paths and session duration",
      "Positive feedback from enterprise clients on the new design",
      "Increased overall site speed by 60%"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "makewell-elevators",
    title: "Makewell Elevators",
    category: "Business Website",
    image: "/portfolio/makewell-elevators.webp",
    description: "A product catalogue website for an elevator manufacturing and installation company.",
    client: "Makewell Elevators",
    duration: "3 Weeks",
    role: "Website Design & Development",
    hasLiveUrl: false,
    content: "Makewell Elevators required a digital product catalog to showcase their range of elevator systems to architects and builders. We built a robust, image-rich platform that details technical specifications clearly and intuitively. The website now serves as their primary digital sales brochure.",
    challenges: [
      "Displaying complex technical specifications in an easy-to-read format",
      "Providing a fast, image-heavy digital catalog",
      "Facilitating quick inquiries for custom elevator installations"
    ],
    solutions: [
      "Designed structured product pages with clear technical spec tables",
      "Optimized high-resolution images for fast rendering",
      "Added specific inquiry forms linked to each product model"
    ],
    results: [
      "Empowered the sales team with a reliable digital brochure",
      "Increased the volume of targeted B2B inquiries",
      "Streamlined the quotation process for custom installations"
    ],
    technologies: ["React", "Next.js", "Framer Motion"],
  },
  {
    slug: "pious-events",
    title: "Pious Events",
    category: "Business Website",
    image: "/portfolio/pious-events.webp",
    description: "An event management company website with gallery, services, and inquiry form.",
    client: "Pious Events",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://piousevents.com",
    content: "Pious Events wanted a vibrant, highly visual website to showcase their successful event management portfolio. We delivered a stunning gallery-focused platform that highlights their creativity and organizational excellence. The new site makes it easy for potential clients to envision their own events and request quotes.",
    challenges: [
      "Showcasing high-quality event photography without slowing down the site",
      "Differentiating from competitors with a unique visual aesthetic",
      "Capturing leads for diverse event types (weddings, corporate, etc.)"
    ],
    solutions: [
      "Built a visually striking, masonry-style gallery with lazy loading",
      "Designed a vibrant, celebratory UI that aligns with their brand",
      "Created tailored inquiry forms for different event categories"
    ],
    results: [
      "Massive increase in user engagement on the portfolio pages",
      "Higher quality lead generation for premium corporate events",
      "Stronger brand positioning in the event management sector"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "marckit-analysts",
    title: "Marckit Analysts",
    category: "Business Website",
    image: "/portfolio/marckit-analysts.webp",
    description: "A business website for a market analysis and consulting firm, built for authority and trust.",
    client: "Marckit Analysts",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://marckitanalysts.com",
    content: "Marckit Analysts approached us to build an authoritative platform for their market research and consulting services. We designed a clean, corporate website that emphasizes data, insights, and professional credibility. The site allows them to securely publish industry reports and attract high-end enterprise clients.",
    challenges: [
      "Presenting complex market data and insights clearly",
      "Establishing absolute trust and authority in the consulting space",
      "Providing a secure portal for premium report access"
    ],
    solutions: [
      "Designed a highly corporate, data-centric UI with clear typography",
      "Integrated dynamic charting and data visualization components",
      "Built a secure lead-capture system for accessing premium reports"
    ],
    results: [
      "Increased downloads of industry reports by 40%",
      "Elevated brand authority among corporate executives",
      "Streamlined the distribution of market insights"
    ],
    technologies: ["React", "Next.js", "Chart.js"],
  },
  {
    slug: "sevenam",
    title: "Sevenam Architects",
    category: "Business Website",
    image: "/portfolio/sevenam.webp",
    description: "A portfolio website for an architecture firm showcasing their projects and design philosophy.",
    client: "Sevenam",
    duration: "3 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://sevenam.in",
    content: "Sevenam Architects needed a digital space as meticulously designed as their physical structures. We crafted a minimalist, immersive portfolio that lets their architectural projects take center stage. The website's smooth transitions and high-resolution imagery perfectly reflect their premium design philosophy.",
    challenges: [
      "Creating a digital experience that mirrors their architectural philosophy",
      "Displaying large architectural renderings with fast load times",
      "Standing out in a highly competitive luxury architecture market"
    ],
    solutions: [
      "Developed a bespoke, minimalist UI with cinematic page transitions",
      "Implemented advanced image optimization and WebP delivery",
      "Structured the portfolio to tell a story for each architectural project"
    ],
    results: [
      "Recognized for design excellence in several digital galleries",
      "Successfully attracted high-net-worth individual (HNWI) clients",
      "Maintained a perfect 100/100 performance score on Google Lighthouse"
    ],
    technologies: ["React", "GSAP", "Three.js"],
  },
  {
    slug: "shivganga-marbles",
    title: "Shivganga Marbles",
    category: "Business Website",
    image: "/portfolio/shivganga-marbles.webp",
    description: "A product catalogue website for a marble and stone supplier with enquiry and contact features.",
    client: "Shivganga Marbles",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://shivgangamarbles.com",
    content: "Shivganga Marbles required a comprehensive digital catalog to display their vast inventory of premium stones and marbles. We developed a highly visual, easy-to-navigate platform that allows builders and architects to filter products efficiently. The new website has significantly increased their inbound B2B inquiries.",
    challenges: [
      "Organizing a massive inventory of stone varieties and finishes",
      "Ensuring accurate color and texture representation in digital format",
      "Generating high-volume wholesale inquiries"
    ],
    solutions: [
      "Built a dynamic product catalog with advanced filtering (color, origin, finish)",
      "Integrated high-resolution zooming capabilities for product images",
      "Added prominent bulk-order inquiry forms to product pages"
    ],
    results: [
      "Significant increase in B2B inquiries from architects and contractors",
      "Reduced time spent by sales teams explaining product varieties",
      "Expanded their market reach beyond their local region"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Prisma"],
  },
  {
    slug: "someshwar-tmt",
    title: "Someshwar TMT",
    category: "Business Website",
    image: "/portfolio/someshwar-tmt.webp",
    description: "A business website for a TMT steel manufacturer, built for B2B lead generation.",
    client: "Someshwar TMT",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://someshwartmt.in",
    content: "Someshwar TMT needed a robust corporate platform to highlight their manufacturing capabilities and product quality. We designed an authoritative, industrial-themed website that builds trust with construction firms. The site effectively communicates their certifications, processes, and structural reliability.",
    challenges: [
      "Conveying industrial scale and manufacturing quality digitally",
      "Educating potential clients on technical specifications and certifications",
      "Driving B2B lead generation from large construction firms"
    ],
    solutions: [
      "Designed an industrial, trustworthy UI using strong branding elements",
      "Created detailed technical specification tables and downloadable PDFs",
      "Highlighted industry certifications and quality assurance processes prominently"
    ],
    results: [
      "Increased digital inquiries from large-scale construction contractors",
      "Improved brand perception as a top-tier TMT manufacturer",
      "Streamlined the distribution of technical spec sheets"
    ],
    technologies: ["React", "Next.js", "Node.js"],
  },
  {
    slug: "akshar-industry",
    title: "Akshar Industry",
    category: "Business Website",
    image: "/portfolio/akshar-industry.webp",
    description: "A manufacturing company website with product listings, company profile, and contact integration.",
    client: "Akshar Industry",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://aksharindustry.in",
    content: "Akshar Industry sought a modern, professional platform to showcase their manufacturing capabilities and extensive product range. We designed a clear, industrial-themed website that allows potential B2B clients to easily browse their catalog and make targeted inquiries. The site emphasizes their commitment to quality and efficient production processes.",
    challenges: [
      "Presenting technical manufacturing capabilities in an accessible way",
      "Organizing diverse industrial products into an intuitive digital catalog",
      "Generating high-quality B2B leads from industrial buyers"
    ],
    solutions: [
      "Designed a robust, structured UI focusing on technical clarity",
      "Developed a categorized product showcase with detailed specification sheets",
      "Integrated clear lead-generation forms on every product page"
    ],
    results: [
      "Increased monthly B2B inquiries by 40%",
      "Reduced the sales cycle length by providing comprehensive digital information",
      "Established a stronger, more professional online footprint in their industry"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    slug: "krupashree",
    title: "Krupashree",
    category: "Business Website",
    image: "/portfolio/krupashree.webp",
    description: "A clean business website built for a local service company to establish online credibility.",
    client: "Krupashree",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://krupashree.in",
    content: "Krupashree needed a strong local digital presence to establish credibility and trust for their service-oriented business. We built a clean, fast, and highly responsive website focused on clear communication and easy contact methods. The platform effectively showcases their services and local authority.",
    challenges: [
      "Building digital trust for a primarily offline, local service business",
      "Ensuring maximum performance and accessibility on mobile devices",
      "Driving local inquiries through search visibility"
    ],
    solutions: [
      "Created a fast, mobile-first design with prominent contact buttons",
      "Implemented local SEO best practices and optimized service descriptions",
      "Integrated customer testimonials to build immediate trust"
    ],
    results: [
      "Boosted local search visibility significantly",
      "Increased daily mobile inquiries and phone calls",
      "Successfully established their brand authority online"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "hrk-air-compressor",
    title: "HRK Air Compressor",
    category: "Business Website",
    image: "/portfolio/hrk-air-compressor.webp",
    description: "A product and service website for an air compressor supplier with B2B enquiry support.",
    client: "HRK Air Compressor",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "https://hrkaircompressor.in",
    content: "HRK Air Compressor required a technical yet user-friendly digital catalog for their industrial equipment. We developed a highly structured website that clearly details their machinery specifications, capabilities, and service offerings. This allows industrial buyers to quickly find the equipment they need and request accurate quotations.",
    challenges: [
      "Organizing complex industrial equipment data logically",
      "Simplifying the quotation request process for heavy machinery",
      "Showcasing after-sales service and maintenance capabilities"
    ],
    solutions: [
      "Designed a technical, specifications-first product catalog",
      "Built multi-step quotation forms for precise customer requests",
      "Created dedicated sections highlighting their robust service network"
    ],
    results: [
      "Streamlined the quotation process, saving hours for the sales team",
      "Increased inbound leads from larger industrial clients",
      "Improved overall user engagement on product spec pages"
    ],
    technologies: ["React", "Next.js", "Node.js"],
  },
  {
    slug: "anubhuti-power",
    title: "Anubhuti Power System",
    category: "Business Website",
    image: "/portfolio/anubhuti-power.webp",
    description: "A corporate website for a power systems company with service listings and contact forms.",
    client: "Anubhuti Power System",
    duration: "2 Weeks",
    role: "Website Design & Development",
    liveUrl: "http://anubhutipowersystem.com",
    content: "Anubhuti Power System wanted a corporate website to reflect their expertise in the energy and power sector. We delivered an authoritative, highly professional platform that clearly communicates their technical proficiency and broad service range. The site serves as a vital tool for their corporate sales pitches.",
    challenges: [
      "Conveying technical authority in the competitive power systems sector",
      "Organizing diverse energy solutions and case studies effectively",
      "Generating qualified corporate leads"
    ],
    solutions: [
      "Developed a clean, corporate UI with strong, trustworthy branding",
      "Structured their complex services into an easily navigable menu",
      "Integrated secure lead capture forms tailored to corporate clients"
    ],
    results: [
      "Enhanced brand credibility during high-stakes client meetings",
      "Increased digital inquiries from corporate facility managers",
      "Improved search visibility for specialized power system keywords"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  // E-Commerce Websites
  {
    slug: "varnet-enterprise",
    title: "Varnet Enterprise",
    category: "E-Commerce",
    image: "/portfolio/varnet-enterprise.webp",
    description: "A full-featured e-commerce platform built for product listing, ordering, and online sales.",
    client: "Varnet Enterprise",
    duration: "4 Weeks",
    role: "E-Commerce Development",
    liveUrl: "https://varnetenterprise.com",
    content: "Varnet Enterprise required a robust, scalable e-commerce platform to manage their growing online sales. We built a high-performance storefront with an intuitive shopping experience and secure checkout. The seamless user journey and optimized product pages have significantly boosted their online revenue.",
    challenges: [
      "Managing a growing catalog while maintaining fast page loads",
      "Reducing cart abandonment rates through a smoother checkout",
      "Providing an intuitive mobile shopping experience"
    ],
    solutions: [
      "Developed a highly optimized, mobile-first e-commerce frontend",
      "Implemented a seamless, one-page secure checkout process",
      "Integrated advanced search and filtering for easy product discovery"
    ],
    results: [
      "Increased online sales conversions by 35%",
      "Reduced cart abandonment by streamlining the checkout flow",
      "Improved mobile user retention and repeat purchase rates"
    ],
    technologies: ["Next.js", "React", "Stripe", "Tailwind CSS"],
  },
  {
    slug: "tattvam-arts",
    title: "Tattvam Arts",
    category: "E-Commerce",
    image: "/portfolio/tattvam-arts.webp",
    description: "An e-commerce store for artisanal products with a clean, visually rich shopping experience.",
    client: "Tattvam Arts",
    duration: "4 Weeks",
    role: "E-Commerce Development",
    liveUrl: "https://tattvamarts.com",
    content: "Tattvam Arts needed an elegant e-commerce store to reflect the artisanal quality of their products. We designed a visually rich, immersive shopping experience that highlights the craftsmanship behind each item. The platform beautifully balances aesthetic appeal with high-performance e-commerce functionality.",
    challenges: [
      "Conveying the artisanal, premium quality of products digitally",
      "Ensuring high-resolution imagery didn't compromise site speed",
      "Creating an intuitive, frictionless purchasing journey"
    ],
    solutions: [
      "Designed a minimalist, elegant UI to let the product photography shine",
      "Utilized advanced image optimization and lazy loading techniques",
      "Implemented a seamless, visually cohesive checkout process"
    ],
    results: [
      "Elevated the brand's premium positioning online",
      "Increased average order value due to enhanced product presentation",
      "Achieved excellent performance metrics despite heavy visual content"
    ],
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Prisma"],
  },
  {
    slug: "devrshree",
    title: "Devrshree",
    category: "E-Commerce",
    image: "/portfolio/devrshree.webp",
    description: "A robust e-commerce platform built for high-volume sales and seamless product discovery.",
    client: "Devrshree",
    duration: "4 Weeks",
    role: "E-Commerce Development",
    liveUrl: "https://devrshree.com",
    content: "Devrshree approached us to develop a high-capacity e-commerce platform capable of handling significant traffic and transaction volumes. We engineered a scalable, robust architecture with a focus on fast product discovery and secure, rapid checkout, preparing them for exponential growth.",
    challenges: [
      "Building a scalable architecture to handle traffic spikes",
      "Ensuring lightning-fast product search and filtering",
      "Providing a highly secure and reliable payment gateway integration"
    ],
    solutions: [
      "Architected a scalable, headless e-commerce solution",
      "Integrated advanced, instant search functionalities",
      "Implemented a highly secure, multi-layered checkout architecture"
    ],
    results: [
      "Successfully handled major sales events with zero downtime",
      "Increased overall conversion rates by optimizing search to purchase flow",
      "Built a future-proof foundation for continuous business growth"
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    slug: "toestrand",
    title: "Toestrand",
    category: "E-Commerce",
    image: "/portfolio/toestrand.webp",
    description: "A modern e-commerce website for a fashion and lifestyle brand with a smooth shopping experience.",
    client: "Toestrand",
    duration: "4 Weeks",
    role: "E-Commerce Development",
    liveUrl: "https://toestrand.com",
    content: "Toestrand sought a modern, sleek e-commerce platform to establish their fashion and lifestyle brand online. We designed a visually appealing, highly interactive storefront that seamlessly blends editorial content with product commerce. The new platform significantly elevated their brand perception and improved online sales metrics.",
    challenges: [
      "Blending high-quality editorial imagery with a seamless shopping experience",
      "Ensuring fast page load times despite heavy visual assets",
      "Creating an intuitive mobile shopping experience for fashion consumers"
    ],
    solutions: [
      "Developed a custom, minimalist UI that highlights fashion photography",
      "Implemented advanced lazy loading and optimized image delivery",
      "Designed a frictionless, one-page mobile checkout flow"
    ],
    results: [
      "Increased mobile conversion rates by over 40%",
      "Achieved a sub-2 second load time across all product pages",
      "Successfully launched the brand into a highly competitive digital market"
    ],
    technologies: ["Next.js", "Framer Motion", "Stripe", "Vercel"],
  },
  // Landing Websites
  {
    slug: "secure-edge-life",
    title: "Secure Edge Life",
    category: "Landing Website",
    image: "/portfolio/secure-edge-life.webp",
    description: "A high-converting landing page designed to drive leads and build trust for a security brand.",
    client: "Secure Edge Life",
    duration: "1 Week",
    role: "Landing Page Design & Development",
    liveUrl: "https://secureedgelife.in",
    content: "Secure Edge Life required a highly focused, conversion-optimized landing page to generate leads for their security services. We built a fast, authoritative, and trust-building page with clear value propositions and strong calls to action, resulting in a significant decrease in cost-per-acquisition.",
    challenges: [
      "Distilling complex security service offerings into a single, digestible page",
      "Building immediate trust with visitors looking for security solutions",
      "Maximizing the conversion rate of paid traffic campaigns"
    ],
    solutions: [
      "Designed a highly structured, authoritative landing page layout",
      "Integrated strong social proof, client logos, and trust badges",
      "Implemented a sticky, frictionless lead capture form"
    ],
    results: [
      "Decreased cost-per-acquisition (CPA) on paid campaigns by 30%",
      "Achieved an exceptional 15% conversion rate for targeted traffic",
      "Streamlined the lead generation process for their sales team"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },

  // App Development (6 projects shown on old site)
  {
    slug: "app-dev-edms",
    title: "My eDMS",
    category: "Mobile Application",
    image: "/portfolio/software-edms.webp",
    description: "A mobile application for efficient document storage, retrieval, and workflow automation.",
    client: "Tryangletech Client",
    duration: "6 Weeks",
    role: "Mobile App Development",
    hasLiveUrl: false,
    content: "My eDMS is a comprehensive document management mobile application designed to streamline enterprise workflows. We developed a highly secure, intuitive app that allows field workers and executives to easily store, retrieve, and approve documents on the go. This solution significantly reduced manual paperwork and improved operational efficiency.",
    challenges: [
      "Ensuring enterprise-grade security for sensitive corporate documents",
      "Creating an intuitive interface for users with varying technical expertise",
      "Implementing fast, reliable offline access and synchronization"
    ],
    solutions: [
      "Built a secure, encrypted mobile architecture with role-based access",
      "Designed a simplified, gesture-driven UI for quick document retrieval",
      "Developed a robust offline mode with automatic background syncing"
    ],
    results: [
      "Reduced document retrieval time by 80% for field agents",
      "Successfully completely digitized previously paper-heavy workflows",
      "Achieved a 95% user adoption rate within the first month of deployment"
    ],
    technologies: ["React Native", "Node.js", "AWS S3", "PostgreSQL"],
  },
  {
    slug: "app-dev-sparrow",
    title: "Sparrow Education",
    category: "Mobile Application",
    image: "/portfolio/app-dev-1.webp",
    description: "An educational mobile application built to streamline learning and course management.",
    client: "Tryangletech Client",
    duration: "6 Weeks",
    role: "Mobile App Development",
    hasLiveUrl: false,
    content: "Sparrow Education is a feature-rich mobile learning platform designed to streamline course management and student engagement. We built an interactive, scalable application that facilitates video lectures, assessments, and real-time student-teacher communication, transforming the educational experience for thousands of users.",
    challenges: [
      "Delivering high-quality video content reliably on varying network speeds",
      "Keeping students engaged with interactive learning tools",
      "Providing real-time communication channels between students and teachers"
    ],
    solutions: [
      "Implemented adaptive bitrate video streaming for smooth playback",
      "Integrated interactive quizzes and gamified progress tracking",
      "Built a real-time chat and notification system for announcements"
    ],
    results: [
      "Successfully supported over 10,000 active students concurrently",
      "Increased student course completion rates by 25%",
      "Drastically improved parent-teacher communication efficiency"
    ],
    technologies: ["Flutter", "Firebase", "Node.js", "WebRTC"],
  },
  {
    slug: "app-dev-symbiot",
    title: "Symbiot (UGVCL)",
    category: "Mobile Application",
    image: "/portfolio/app-dev-2.webp",
    description: "A utility management mobile app focused on service automation and client communication.",
    client: "Tryangletech Client",
    duration: "6 Weeks",
    role: "Mobile App Development",
    hasLiveUrl: false,
    content: "Symbiot (UGVCL) is a specialized utility management application focused on service automation and client communication. We engineered a highly reliable, data-driven mobile solution that empowers utility workers and informs consumers. The app streamlined service requests, outage reporting, and billing inquiries.",
    challenges: [
      "Integrating seamlessly with legacy utility management systems",
      "Processing and displaying real-time data securely to consumers",
      "Ensuring high availability during peak usage and service outages"
    ],
    solutions: [
      "Developed secure API gateways to interface with legacy backend systems",
      "Designed a clear, real-time dashboard for service and billing data",
      "Implemented a highly scalable cloud architecture to handle traffic spikes"
    ],
    results: [
      "Reduced call center volume by 40% due to self-service features",
      "Significantly improved the speed of resolving customer service requests",
      "Enhanced overall customer satisfaction and transparency"
    ],
    technologies: ["React Native", "Java Spring Boot", "Oracle", "AWS"],
  },
  {
    slug: "app-dev-brilliant",
    title: "Brilliant Lifescience",
    category: "Mobile Application",
    image: "/portfolio/app-dev-3.webp",
    description: "A healthcare and lifescience mobile application designed for secure data management.",
    client: "Tryangletech Client",
    duration: "6 Weeks",
    role: "Mobile App Development",
    hasLiveUrl: false,
  },
  {
    slug: "app-dev-seller",
    title: "Vepar Vruddhi Seller",
    category: "Mobile Application",
    image: "/portfolio/app-dev-seller.webp",
    description: "A seller-side mobile application with inventory management, order tracking, and real-time dashboard.",
    client: "Tryangletech Client",
    duration: "6 Weeks",
    role: "Mobile App Development",
    hasLiveUrl: false,
  },
  {
    slug: "app-dev-user",
    title: "Vepar Vruddhi User",
    category: "Mobile Application",
    image: "/portfolio/app-dev-user.webp",
    description: "A user-facing mobile application with seamless UI, product browsing, and order management.",
    client: "Tryangletech Client",
    duration: "6 Weeks",
    role: "Mobile App Development",
    hasLiveUrl: false,
  },

  // Software Development (3 projects shown on old site)
  {
    slug: "software-sevabridge",
    title: "Seva Bridge",
    category: "Custom Software",
    image: "/portfolio/software-sevabridge.webp",
    description: "A service bridge platform connecting service providers with customers through a streamlined digital workflow.",
    client: "Tryangletech Client",
    duration: "8 Weeks",
    role: "Custom Software Development",
    hasLiveUrl: false,
  },
  {
    slug: "software-edms",
    title: "My eDMS",
    category: "Custom Software",
    image: "/portfolio/software-edms.webp",
    description: "A Document Management System built for efficient document storage, retrieval, and workflow automation.",
    client: "Tryangletech Client",
    duration: "10 Weeks",
    role: "Custom Software Development",
    hasLiveUrl: false,
  },
  {
    slug: "software-eoffice",
    title: "My eOffice",
    category: "Custom Software",
    image: "/portfolio/software-eoffice.webp",
    description: "A digital office management platform for streamlining internal operations and document workflows.",
    client: "Tryangletech Client",
    duration: "10 Weeks",
    role: "Custom Software Development",
    hasLiveUrl: false,
  },

  // Graphic Design (6 projects shown on old site)
  {
    slug: "graphic-ansh",
    title: "ANSH Exports",
    category: "Graphic Design",
    image: "/portfolio/graphic-1.webp",
    description: "Complete visual branding and graphic design materials for an export business.",
    client: "ANSH Exports",
    duration: "2 Weeks",
    role: "Graphic Design & Branding",
    hasLiveUrl: false,
  },
  {
    slug: "graphic-moon",
    title: "Moon Series",
    category: "Graphic Design",
    image: "/portfolio/graphic-shrahav.webp",
    description: "Creative concept design and graphic series for a new product launch campaign.",
    client: "Tryangletech Client",
    duration: "2 Weeks",
    role: "Graphic Design",
    hasLiveUrl: false,
  },
  {
    slug: "graphic-shrahav",
    title: "Shrahav Mobile App Design",
    category: "Graphic Design",
    image: "/portfolio/graphic-sasa.webp",
    description: "Complete UI/UX and graphic design for a mobile application including screens, icons, and brand identity.",
    client: "Tryangletech Client",
    duration: "3 Weeks",
    role: "Graphic Design & UI/UX",
    hasLiveUrl: false,
  },
  {
    slug: "graphic-sasa",
    title: "SASA Energy",
    category: "Graphic Design",
    image: "/portfolio/graphic-greenpackwell.gif",
    description: "Brand identity and graphic design including logo, social media posts, and marketing collateral.",
    client: "Tryangletech Client",
    duration: "2 Weeks",
    role: "Graphic Design & Branding",
    hasLiveUrl: false,
  },
  {
    slug: "graphic-greenpackwell",
    title: "Green Packwell",
    category: "Graphic Design",
    image: "/portfolio/graphic-uttarayan.gif",
    description: "Social media campaign design and marketing post creation for a packaging brand.",
    client: "Tryangletech Client",
    duration: "2 Weeks",
    role: "Graphic Design",
    hasLiveUrl: false,
  },
  {
    slug: "graphic-uttarayan",
    title: "eOffice (Uttarayan)",
    category: "Graphic Design",
    image: "/portfolio/graphic-eoffice.webp",
    description: "Festival-themed graphic design and video production for a corporate brand campaign.",
    client: "Tryangletech Client",
    duration: "1 Week",
    role: "Graphic Design & Video",
    hasLiveUrl: false,
  },

  // Landing Website — add this one missing from old site
  {
    slug: "varnet-landing",
    title: "Varnet Enterprise Landing",
    category: "Landing Website",
    image: "/portfolio/varnet-enterprise.webp",
    description: "A high-converting landing page for Varnet Enterprise to drive product enquiries and online sales.",
    client: "Varnet Enterprise",
    duration: "1 Week",
    role: "Landing Page Design & Development",
    liveUrl: "https://varnetenterprise.com",
    hasLiveUrl: true,
  },
];
