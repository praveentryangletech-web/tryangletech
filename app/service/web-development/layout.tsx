import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development Company in Ahmedabad | Tryangle Tech",
  description: "Custom websites, Next.js web applications, and e-commerce development in Ahmedabad. Fast, mobile-friendly sites built for measurable business growth.",
  alternates: {
    canonical: "https://tryangletech.com/service/web-development",
  },
};

export default function WebDevLayout({ children }: { children: React.ReactNode }) {
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
                "name": "Web Development Services",
                "serviceType": "Website & Web Application Development",
                "description": "Custom Next.js, React, WordPress, and e-commerce web applications designed for speed, SEO performance, and maximum conversions.",
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
                  "name": "Web Development Offerings",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Next.js & React Web Apps" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce Web Solutions" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate & Business Portals" } }
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How long does it take to build a website?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It depends on what you need. A simple business website usually takes around 3 to 5 weeks. Larger projects with more pages or features take a bit longer. We will always give you a clear timeline before we start."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you keep working on the site after it goes live?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we do. We offer support packages to keep your website updated, secure, and working well. You will not be left on your own once the project is done."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Will my website work on phones and tablets?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Definitely. Every website we build works well on all screen sizes including phones, tablets, and desktop computers. Your visitors get a good experience no matter what device they use."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I make changes to my website myself?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. We set up a simple content management system so you can update your text and images on your own without needing to know how to code."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you build web applications as well?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we do. We build everything from simple websites to more complex web apps with features like user logins, dashboards, bookings, and more. Just tell us what you need and we will figure out the best way to build it."
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
