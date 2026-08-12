'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: "How quickly will you respond to my inquiry?",
    a: "We typically respond within 24 hours. For urgent requests, you can call us directly at +91 90338 78806.",
  },
  {
    q: "What information should I include when I reach out?",
    a: "A brief description of what you need - a website, app, or software - and any timeline or budget you have in mind. We'll ask follow-up questions if we need more detail.",
  },
  {
    q: "Do you offer a free consultation?",
    a: "Yes, we offer a free initial consultation to understand your project and give you an honest assessment of scope and timeline before any commitment.",
  },
  {
    q: "Can I visit your office in person?",
    a: "Absolutely. Our office is in Naroda, Ahmedabad. Reach out beforehand so we can make sure the right person is available to meet with you.",
  },
  {
    q: "What happens after I submit the contact form?",
    a: "One of our team members will review your message and reach out to schedule a call or discuss next steps, usually within 24 hours.",
  },
];

export default function ContactFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };
  return (
    <>
        <section className="rt-faq">
          <div className="w-layout-blockcontainer rt-faq-container w-container">
            <div className="rt-faq-content-main">
              <div className="w-layout-hflex rt-faq-heading-main">
                <div className="w-layout-vflex rt-faq-heading-wrap rt-desktop-text-center">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2d"
                      className="rt-sub-text rt-sub-gredient">
                      Frequently asked questions
                    </div>
                  </div>
                  <h2
                    data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2f"
                    className="rt-no-margin">
                    Everything you want to know{" "}
                    <span className="rt-color-periwinkle-gray">
                      explained clearly
                    </span>
                  </h2>
                </div>
              </div>
              <div
                data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde33"
                className="rt-faq-main rt-margin-auto">
                {faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className={`w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag${i === 0 ? ' rt-top-gap-of' : ''}`}
                      style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      onClick={() => toggleFaq(i)}
                    >
                      <div className="w-layout-hflex rt-faq-top-part">
                        <div className="w-layout-hflex r-faq-text-wrap">
                          <h3 className="rt-text-style-h6" style={{ marginTop: 0, marginBottom: 0 }}>{faq.q}</h3>
                        </div>
                        <div className="rt-faq-right-part">
                          <div className="rt-faq-minus"></div>
                          <div
                            className="rt-faq-plus"
                            style={{
                              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                              opacity: isOpen ? 0 : 1,
                              transition: "all 0.3s ease",
                            }}></div>
                        </div>
                      </div>
                      <div
                        className="rt-faq-bottom-part rt-overflow-hidden"
                        style={{ 
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                          transition: "opacity 0.3s ease",
                          paddingTop: isOpen ? "20px" : 0
                        }}>
                        <div className="rt-faq-para-wrap">
                          <p className="rt-gap-off">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            })
          }}
        />
    </>
  );
}
