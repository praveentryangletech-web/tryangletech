'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: "What is AI automation, and how does it work?",
    a: "AI automation uses artificial intelligence to perform repetitive tasks, analyze data, and optimize processes, enabling businesses to save time, reduce errors, and make smarter, faster decisions efficiently.",
  },
  {
    q: "What types of tasks can be automated with AI?",
    a: "AI can automate repetitive tasks like data entry, customer support, report generation, inventory management, and workflow optimization, allowing teams to focus on strategic, high-value activities and business growth.",
  },
  {
    q: "Is AI automation suitable for small businesses?",
    a: "Yes, AI automation is ideal for small businesses. It streamlines operations, reduces manual work, improves efficiency, and provides actionable insights, helping smaller teams compete and grow effectively.",
  },
  {
    q: "What industries benefit the most from AI automation?",
    a: "Industries like finance, healthcare, retail, manufacturing, and logistics benefit greatly from AI automation. It streamlines operations, reduces errors, enhances customer service, and drives efficiency across diverse business sectors.",
  },
  {
    q: "Can AI automation integrate with my existing tools?",
    a: "Absolutely. AI automation seamlessly integrates with your existing tools and platforms, allowing workflows to connect effortlessly, enhancing productivity, reducing manual effort, and ensuring a smooth transition without disrupting current operations.",
  },
];

export default function ContactFAQ() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const toggleFaq = (idx: number) => {
    if (openFaqs.includes(idx)) {
      setOpenFaqs(openFaqs.filter((i) => i !== idx));
    } else {
      setOpenFaqs([...openFaqs, idx]);
    }
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
                  const isOpen = openFaqs.includes(i);
                  return (
                    <div
                      key={i}
                      className="w-layout-vflex rt-faq-dropdown-wrap"
                      style={{
                        backgroundColor: isOpen ? "rgba(0, 0, 0, 0.03)" : "rgba(0, 0, 0, 0)",
                      }}>
                      <div
                        className="w-layout-hflex rt-faq-top-part"
                        onClick={() => toggleFaq(i)}
                        style={{ cursor: "pointer" }}>
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
