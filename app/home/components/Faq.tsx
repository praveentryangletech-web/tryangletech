"use client";
import React, { useState, useEffect } from 'react';

const DEFAULT_HOME_FAQS = [
  {
    q: "What industries do you work with?",
    a: "We have worked with businesses in healthcare, education, real estate, ecommerce, finance, and many other industries. Whatever your field, we know how to build technology that fits."
  },
  {
    q: "Do you provide ongoing support after the project is delivered?",
    a: "Yes, we do. After your website or app goes live, we are still here to help with updates, bug fixes, and any changes you need. We do not just build and disappear."
  },
  {
    q: "How does the process work from start to finish?",
    a: "It is pretty simple. First we sit down and understand what you need. Then we create a plan, design the look and feel, build it out, test everything, and launch. You are involved at every stage so nothing catches you off guard."
  },
  {
    q: "How long does a project usually take?",
    a: "It depends on the project. A website usually takes about 2 to 4 weeks. Custom software or a mobile app can take 4 to 8 weeks. We will give you a proper timeline once we understand exactly what you are looking for."
  },
  {
    q: "What technologies do you build with?",
    a: "We work with PHP, Laravel, WordPress, React, Next.js, and many other modern tools. We pick the right technology based on what makes sense for your project, not just what is trendy."
  }
];

interface FAQProps {
  initialFaqs?: Array<{ q?: string; a?: string; question?: string; answer?: string }>;
}

export default function FAQ({ initialFaqs }: FAQProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqsList, setFaqsList] = useState(() => {
    if (initialFaqs && initialFaqs.length > 0) {
      return initialFaqs.map(f => ({ q: f.q || f.question || '', a: f.a || f.answer || '' }));
    }
    return DEFAULT_HOME_FAQS;
  });

  useEffect(() => {
    if (initialFaqs && initialFaqs.length > 0) {
      setFaqsList(initialFaqs.map(f => ({ q: f.q || f.question || '', a: f.a || f.answer || '' })));
      return;
    }

    async function loadFaqs() {
      try {
        const res = await fetch('/api/faqs?pageType=HOME_MAIN');
        const json = await res.json();
        const items = json.faqs || json.data;
        if (json.success && Array.isArray(items) && items.length > 0) {
          setFaqsList(items.map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '' })));
        }
      } catch {
        // Fallback to DEFAULT_HOME_FAQS
      }
    }
    loadFaqs();
  }, [initialFaqs]);

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
                    className="rt-sub-text rt-sub-gredient"
                  >
                    Frequently asked questions
                  </div>
                </div>
                <h2
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2f"
                  className="rt-no-margin"
                >
                  Frequently Asked Questions
                  <span className="rt-color-periwinkle-gray">explained clearly</span>
                </h2>
              </div>
            </div>
            <div
              data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde33"
              className="rt-faq-main rt-margin-auto"
            >
              {faqsList.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`w-layout-vflex rt-faq-dropdown-wrap ${idx === 0 ? 'rt-faq-pag rt-top-gap-of' : ''}`}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)", cursor: 'pointer' }}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <div className="w-layout-hflex rt-faq-top-part">
                      <div className="w-layout-hflex r-faq-text-wrap">
                        <h3 className="rt-text-style-h6" style={{ marginTop: 0, marginBottom: 0 }}>
                          {faq.q}
                        </h3>
                      </div>
                      <div className="rt-faq-right-part">
                        <div className="rt-faq-minus"></div>
                        <div
                          className="rt-faq-plus"
                          style={{
                            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                            opacity: isOpen ? 0 : 1,
                            transition: "all 0.3s ease",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="rt-faq-bottom-part rt-overflow-hidden"
                      style={{
                        height: isOpen ? "auto" : "0px",
                        opacity: isOpen ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        paddingTop: isOpen ? "20px" : 0,
                      }}
                    >
                      <div className="rt-faq-para-wrap">
                        <p className={idx === 1 ? "rt-no-margin" : "rt-gap-off"}>
                          {faq.a}
                        </p>
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
            "mainEntity": faqsList.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
              },
            })),
          }),
        }}
      />
    </>
  );
}
