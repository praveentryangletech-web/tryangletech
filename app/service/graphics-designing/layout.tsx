import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graphic Design, UI/UX & Branding Services Ahmedabad | Tryangle Tech",
  description: "Logo design, UI/UX interfaces, brand identity systems, and marketing graphics for businesses in Ahmedabad, India, and internationally.",
  alternates: {
    canonical: "https://tryangletech.com/service/graphics-designing",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "name": "Graphics Designing & UI/UX Services",
                "serviceType": "UI/UX Interface Design & Brand Identity",
                "description": "Comprehensive graphic design, brand identity creation, 3D visual assets, and conversion-focused web/mobile UI/UX design.",
                "provider": {
                  "@type": "Organization",
                  "name": "TryangleTech",
                  "url": "https://tryangletech.com"
                },
                "areaServed": [
                  { "@type": "City", "name": "Ahmedabad" },
                  { "@type": "Country", "name": "India" },
                  { "@type": "Country", "name": "United States" }
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Design Offerings",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Product Design" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand Identity & Logo Systems" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "3D Visual Assets & Marketing Creatives" } }
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What design services do you provide?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We provide end-to-end design solutions including UI/UX for web and mobile apps, brand identity, logo design, 3D product visuals, and digital marketing creatives."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you provide editable source files?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we deliver complete Figma design systems, vector SVG assets, and source files for all design deliverables."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How many revisions are included?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We work closely in iterative sprint cycles with unlimited refinements during the active design phase until you are completely satisfied."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}

