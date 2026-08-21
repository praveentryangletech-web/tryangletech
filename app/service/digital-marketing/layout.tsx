import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Services Ahmedabad | SEO & Performance Ads | Tryangle Tech",
  description: "SEO engineering, social media marketing, and paid Google & Meta ad management for businesses in Ahmedabad, India, and internationally.",
  alternates: {
    canonical: "https://tryangletech.com/service/digital-marketing",
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
                "name": "Digital Marketing & SEO Services",
                "serviceType": "Performance Marketing, SEO, and Paid Ad Management",
                "description": "Results-driven digital marketing solutions including technical SEO, Google Search Ads, Meta performance marketing, and conversion rate optimization.",
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
                  "name": "Marketing Offerings",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Search Engine Optimization (SEO)" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google Ads & PPC Management" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Growth & Meta Ads" } }
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What digital marketing services do you offer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "SEO, social media management, and paid ad campaigns (Google & Meta) - built around what makes sense for your business and budget."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How soon will I see results from SEO?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "SEO takes time. Most businesses start seeing real movement in rankings and traffic within 3 to 6 months, though we'll flag early wins as they come."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do you report on performance?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You get regular updates on what's working - rankings, traffic, leads - so you always know where things stand."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you work with businesses outside Ahmedabad?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We're based in Ahmedabad and primarily serve local and India-wide clients. If you're outside India, reach out and we'll let you know if it's a fit."
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

