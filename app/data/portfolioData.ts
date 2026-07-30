export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  duration: string;
  role: string;
  content: string;
}

export const projects: PortfolioProject[] = [
  { 
    id: "1",
    slug: "fintech-dashboard",
    title: "Fintech Dashboard", 
    category: "Web App", 
    image: "/Home3_files/690dad3581daca3524776a8e_Taskopia-features-home-v3-1.webp",
    description: "A comprehensive financial dashboard that empowers users to track their expenses, investments, and overall financial health in real-time.",
    client: "FinServe Inc.",
    duration: "4 Months",
    role: "Full Stack Development & UI/UX",
    content: "Our team developed a robust fintech dashboard designed to simplify complex financial data. The platform integrates securely with multiple banking APIs to provide real-time updates. We focused heavily on data visualization, ensuring that users can easily understand their spending habits and investment growth at a glance. The backend was built for high scalability and top-tier security compliance."
  },
  { 
    id: "2",
    slug: "ecommerce-mobile",
    title: "E-Commerce Mobile", 
    category: "Mobile App", 
    image: "/Home3_files/690dad35a7b833185701eb5a_Taskopia-features-home-v3-2.webp",
    description: "A seamless and intuitive mobile shopping experience with advanced filtering, personalized recommendations, and instant checkout.",
    client: "RetailHub",
    duration: "6 Months",
    role: "Mobile App Development",
    content: "We partnered with RetailHub to revamp their mobile e-commerce presence. The new app features a lightning-fast native experience, augmented reality (AR) product previews, and a machine-learning-driven recommendation engine. By optimizing the checkout flow, we helped increase their conversion rate by over 25% within the first month of launch."
  },
  { 
    id: "3",
    slug: "healthtech-portal",
    title: "HealthTech Portal", 
    category: "Web Platform", 
    image: "/Home3_files/690dad35827ba1e2631d6c09_Taskopia-features-home-v3-3.webp",
    description: "A secure patient-doctor portal facilitating remote consultations, medical record management, and prescription tracking.",
    client: "MediCare Solutions",
    duration: "8 Months",
    role: "Platform Engineering",
    content: "The HealthTech Portal bridges the gap between healthcare providers and patients. It features end-to-end encrypted video consultations, secure messaging, and a highly accessible medical records dashboard. Strict adherence to HIPAA compliance was maintained throughout the development lifecycle, ensuring patient data privacy."
  },
  { 
    id: "4",
    slug: "ai-marketing-tool",
    title: "AI Marketing Tool", 
    category: "SaaS", 
    image: "/Home3_files/690dad35e28b189c556cc11e_Taskopia-features-home-v3-right.webp",
    description: "An AI-powered SaaS platform that automates digital marketing campaigns, generates copy, and optimizes ad spend.",
    client: "MarketGenius",
    duration: "5 Months",
    role: "Product Design & Development",
    content: "MarketGenius approached us to build a SaaS tool that leverages generative AI for marketing agencies. The platform automates A/B testing, generates high-converting ad copy, and automatically adjusts ad budgets based on performance metrics. The intuitive interface allows marketers to manage complex campaigns with minimal effort."
  },
  { 
    id: "5",
    slug: "smart-crm",
    title: "Smart CRM", 
    category: "Enterprise App", 
    image: "/Home3_files/690dad35e3ae72cf7cacc7f0_Taskopia-features-home-v3-5.webp",
    description: "A customized Customer Relationship Management tool designed for large sales teams to track leads and close deals efficiently.",
    client: "Global Sales Corp",
    duration: "7 Months",
    role: "Enterprise Solutions",
    content: "This Smart CRM was built from the ground up to handle massive datasets for enterprise sales teams. It includes automated lead scoring, deep email integration, and customizable sales pipelines. The system also generates comprehensive sales forecasts and reports, giving management clear visibility into team performance."
  },
  { 
    id: "6",
    slug: "logistics-tracker",
    title: "Logistics Tracker", 
    category: "Mobile App", 
    image: "/Home2_files/69254371136c64c2548fd85e_taskopiya-home-two-project-over.webp",
    description: "A real-time fleet management and delivery tracking application for enterprise logistics companies.",
    client: "Swift Logistics",
    duration: "4 Months",
    role: "Mobile App Development",
    content: "The Logistics Tracker app provides drivers with optimized routing and real-time traffic updates while giving dispatchers a bird's-eye view of the entire fleet. Features include proof of delivery via signature and photo, barcode scanning, and offline mode capabilities for drivers in remote areas."
  },
];
