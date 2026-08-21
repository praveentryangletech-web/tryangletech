'use client';
import React, { useState } from 'react';

export interface FaqItem {
  wid?: string;
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
  isTop?: boolean;
}

interface FaqProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
  hideJsonLd?: boolean;
}

export default function Faq({ items, title, subtitle, hideJsonLd = false }: FaqProps = {}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const defaultFaqs: FaqItem[] = [
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde34',
      q: 'What services does Tryangletech offer?',
      a: 'We offer web design & development, digital marketing, SEO, graphics designing, mobile app development, and custom software development — all under one roof.',
      isTop: true,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde42',
      q: 'Which industries do you serve?',
      a: 'We serve businesses across healthcare, finance, e-commerce, education, retail, and more — both in India and internationally.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde50',
      q: 'Do you provide support after project completion?',
      a: 'Yes, we provide ongoing maintenance and support after every project to ensure your website or app continues to perform at its best.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde5e',
      q: "What's a typical project timeline?",
      a: "Timelines vary by scope, but most websites take 2–4 weeks and custom software or app projects typically take 4–8 weeks. We'll give you a clear estimate after understanding your requirements.",
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde6c',
      q: 'What technologies do you build with?',
      a: 'We build using HTML, CSS, WordPress, and PHP, along with modern frameworks like React, Next.js, and Laravel — choosing the right stack based on what your project actually needs.',
      isTop: false,
    },
  ];

  const rawList = items && items.length > 0 ? items : defaultFaqs;
  const faqs = rawList.map((item, idx) => ({
    wid: item.wid || `faq-item-${idx}`,
    q: item.q || item.question || '',
    a: item.a || item.answer || '',
    isTop: idx === 0,
  }));

  return (
    <>
      <section className="rt-faq"style={{marginTop:'-6rem'}}>
        <div className="w-layout-blockcontainer rt-faq-container w-container">
          <div className="rt-faq-content-main">
            <div className="w-layout-hflex rt-faq-heading-main">
              <div className="w-layout-vflex rt-faq-heading-wrap rt-desktop-text-center">
                <div className="rt-sub-gap">
                  <div
                    data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2d"
                    className="rt-sub-text rt-sub-gredient"
                    style={{ opacity: '0' }}>
                    Frequently asked questions
                  </div>
                </div>
                <h2
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2f"
                  className="rt-no-margin"
                  style={{ opacity: '0' }}>
                  Everything you want to know{' '}
                  <span className="rt-color-periwinkle-gray">
                    explained clearly
                  </span>
                </h2>
              </div>
            </div>
            <div
              data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde33"
              className="rt-faq-main rt-margin-auto"
              style={{ opacity: '0' }}>
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