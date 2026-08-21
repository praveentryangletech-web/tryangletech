import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software Development Ahmedabad | Tryangle Tech",
  description: "We build custom software around how your business actually works, not off-the-shelf templates. Based in Ahmedabad, serving clients across India and globally.",
  alternates: {
    canonical: "https://tryangletech.com/service/custom-software",
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
                "name": "Custom Software Development",
                "serviceType": "Enterprise Software Engineering & Cloud Solutions",
                "description": "Tailored software development, cloud infrastructure, AI integrations, and workflow automation systems built for business scalability.",
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
                  "name": "Software Engineering Services",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise SaaS Platforms" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom ERP & CRM Systems" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "API Architecture & Integrations" } }
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How do I get started with the platform?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Simply sign up for a free trial, create your workspace, and invite your team. No credit card required and setup takes less than 5 minutes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can multiple teams use the platform simultaneously?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our platform supports unlimited teams and workspaces, allowing multiple teams to collaborate in parallel without any overlap or confusion."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does it support mobile access?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Absolutely. Our platform is fully responsive and we offer dedicated iOS and Android apps so your team can stay productive on the go."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does billing work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We offer monthly and annual billing. Annual plans come with a 20% discount. You can upgrade, downgrade, or cancel at any time from your account settings."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is customer support available?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we provide 24/7 live chat and email support for all plans, with dedicated account managers for enterprise customers."
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

