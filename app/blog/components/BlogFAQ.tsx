'use client';
import React, { useState } from 'react';

export default function BlogFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      wid: 'faq-1',
      q: 'What services does Tryangletech provide?',
      a: 'We offer a comprehensive suite of IT services, including Web Development, Mobile App Development, Custom Software Solutions, UI/UX Design, and full-scale Digital Marketing. Our goal is to be your end-to-end technology partner.',
      isTop: true,
    },
    {
      wid: 'faq-2',
      q: 'How do you approach a new software project?',
      a: 'Our approach begins with a deep discovery phase to understand your business goals. From there, we move to architecture planning, UI/UX design, agile development, rigorous testing, and finally, deployment with ongoing support.',
      isTop: false,
    },
    {
      wid: 'faq-3',
      q: 'How long does a typical project take to complete?',
      a: 'Project timelines vary based on complexity. A standard business website might take 3–6 weeks, while a complex custom web application or mobile app could take 3–6 months. We provide clear, accurate timelines during the initial estimation phase.',
      isTop: false,
    },
    {
      wid: 'faq-4',
      q: 'Do you offer ongoing maintenance and support after launch?',
      a: 'Absolutely. We believe our partnership doesn\'t end at launch. We offer tailored maintenance packages to ensure your software remains secure, up-to-date, and continues to perform optimally as your business scales.',
      isTop: false,
    },
    {
      wid: 'faq-5',
      q: 'How can I request a quote or consultation?',
      a: 'You can easily reach out to us via the Contact page on our website. Just fill out the form with a brief description of your project, and one of our experts will get back to you within 24 hours to schedule a free consultation.',
      isTop: false,
    },
  ];

  return (
    <>
      <section className="rt-faq" style={{ padding: '80px 0' }}>
        <div className="w-layout-blockcontainer rt-faq-container w-container">
          <div className="rt-faq-content-main">
            <div className="w-layout-hflex rt-faq-heading-main">
              <div className="w-layout-vflex rt-faq-heading-wrap rt-desktop-text-center">
                <div className="rt-sub-gap">
                  <div
                    data-w-id="faq-sub-text"
                    className="rt-sub-text rt-sub-gredient"
                    >
                    Frequently asked questions
                  </div>
                </div>
                <h2
                  data-w-id="faq-heading"
                  className="rt-no-margin"
                  >
                  Everything you want to know{' '}
                  <span className="rt-color-periwinkle-gray">
                    explained clearly
                  </span>
                </h2>
              </div>
            </div>
            <div
              data-w-id="faq-main-wrapper"
              className="rt-faq-main rt-margin-auto"
              >
              {faqs.map(({ wid, q, a, isTop }, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={wid}
                    data-w-id={wid}
                    className={`w-layout-vflex rt-faq-dropdown-wrap${isTop ? ' rt-faq-pag rt-top-gap-of' : ''}`}
                    style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="w-layout-hflex rt-faq-top-part">
                      <div className="w-layout-hflex r-faq-text-wrap">
                        <h3 className="rt-text-style-h6" style={{ marginTop: 0, marginBottom: 0 }}>{q}</h3>
                      </div>
                      <div className="rt-faq-right-part">
                        <div className="rt-faq-minus"></div>
                        <div
                          className="rt-faq-plus"
                          style={{
                            transform: isOpen
                              ? 'rotate(90deg)'
                              : 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
                            transformStyle: 'preserve-3d',
                            opacity: isOpen ? 0 : 1,
                            transition: 'all 0.3s ease',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="rt-faq-bottom-part rt-overflow-hidden"
                      style={{
                        height: isOpen ? 'auto' : '0px',
                        opacity: isOpen ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        paddingTop: isOpen ? '20px' : 0,
                      }}
                    >
                      <div className="rt-faq-para-wrap">
                        <p className="rt-gap-off">{a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <div
        data-w-id="faq-bottom-line"
        className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
        <div style={{ width: '0%' }} className="rt-section-overlay"></div>
      </div>
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
