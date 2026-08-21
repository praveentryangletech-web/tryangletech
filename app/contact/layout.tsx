import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Tryangle Tech | Ahmedabad IT & Software Company",
  description: "Get in touch with Tryangle Tech for your website, app, or software project. Call +91 90338 78806 or email info.tryangletech@gmail.com.",
  alternates: {
    canonical: "https://tryangletech.com/contact",
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
                "@type": "ContactPage",
                "@id": "https://tryangletech.com/contact#webpage",
                "url": "https://tryangletech.com/contact",
                "name": "Contact TryangleTech",
                "description": "Contact our engineering and sales teams for custom software, web apps, mobile apps, or digital marketing inquiries.",
                "mainEntity": {
                  "@type": "Organization",
                  "name": "TryangleTech",
                  "telephone": "+91-90338-78806",
                  "email": "info.tryangletech@gmail.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "1st Floor-29/Vitthal Plaza, Opp. GEB, Nava Naroda",
                    "addressLocality": "Ahmedabad",
                    "addressRegion": "Gujarat",
                    "postalCode": "382330",
                    "addressCountry": "IN"
                  }
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How quickly will you respond to my inquiry?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We typically respond within 24 hours. For urgent requests, you can call us directly at +91 90338 78806."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What information should I include when I reach out?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A brief description of what you need - a website, app, or software - and any timeline or budget you have in mind. We'll ask follow-up questions if we need more detail."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer a free consultation?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we offer a free initial consultation to understand your project and give you an honest assessment of scope and timeline before any commitment."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I visit your office in person?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Absolutely. Our office is in Naroda, Ahmedabad. Reach out beforehand so we can make sure the right person is available to meet with you."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What happens after I submit the contact form?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "One of our team members will review your message and reach out to schedule a call or discuss next steps, usually within 24 hours."
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

