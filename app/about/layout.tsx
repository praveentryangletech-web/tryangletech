import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tryangle Tech | IT & Software Engineering Company in Ahmedabad",
  description: "Learn about Tryangle Tech, a premier IT company based in Ahmedabad delivering 350+ web, app, and custom software projects with transparent execution.",
  alternates: {
    canonical: "https://tryangletech.com/about",
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
                "@type": "AboutPage",
                "@id": "https://tryangletech.com/about#webpage",
                "url": "https://tryangletech.com/about",
                "name": "About TryangleTech",
                "description": "TryangleTech is an Ahmedabad-based digital product engineering agency delivering websites, mobile apps, enterprise software, and growth marketing.",
                "mainEntity": {
                  "@type": "Organization",
                  "name": "TryangleTech",
                  "url": "https://tryangletech.com",
                  "foundingDate": "2018",
                  "numberOfEmployees": "15-50",
                  "knowsAbout": [
                    "Full Stack Web Development",
                    "Next.js & React Frameworks",
                    "Mobile App Engineering",
                    "Enterprise Software",
                    "UI/UX Design Systems",
                    "Search Engine Optimization"
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What services does Tryangletech offer?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We offer website design & development, digital marketing, SEO, graphics designing, mobile app development, and custom software development, all under one roof."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Which industries do you serve?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We serve a wide range of industries including healthcare, finance, e-commerce, education, retail, and more, both in India and internationally."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you provide support after project completion?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we provide ongoing maintenance and support after every project to ensure your website or app continues to perform at its best."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does it take to complete a project?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Project timelines vary based on complexity and requirements. A standard website typically takes 2–4 weeks, while larger projects may take longer. We'll give you a clear timeline before we start."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer free hosting?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we offer 1 year of free hosting with our website development packages. Domain registration is handled separately by the client."
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

