'use client';
import React, { useState } from 'react';
import ScrollTextReveal from '../../../common/ScrollTextReveal';

export default function DigitalMarketingFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'What digital marketing services do you offer?',
      a: 'SEO, social media management, and paid ad campaigns (Google & Meta) - built around what makes sense for your business and budget.',
    },
    {
      q: 'How soon will I see results from SEO?',
      a: "SEO takes time. Most businesses start seeing real movement in rankings and traffic within 3 to 6 months, though we'll flag early wins as they come.",
    },
    {
      q: 'How do you report on performance?',
      a: "You get regular updates on what's working - rankings, traffic, leads - so you always know where things stand.",
    },
    {
      q: 'Do you work with businesses outside Ahmedabad?',
      a: "We're based in Ahmedabad and primarily serve local and India-wide clients. If you're outside India, reach out and we'll let you know if it's a fit.",
    },
  ];

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
                <ScrollTextReveal
                  text="Everything you want to know explained clearly"
                  align="center"
                  className="rt-no-margin"
                />
              </div>
            </div>
            <div
              data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde33"
              className="rt-faq-main rt-margin-auto">
              {faqs.map(({ q, a }, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag${idx === 0 ? ' rt-top-gap-of' : ''}`}
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
        data-w-id="057c02a2-bb7b-c40a-8204-1de280b49bef"
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