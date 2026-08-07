'use client';
import React, { useState } from 'react';

export default function DigitalMarketingFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde34',
      q: 'What digital marketing services do you specialize in?',
      a: 'We specialize in Search Engine Optimization (SEO), Pay-Per-Click (PPC) advertising, social media marketing, content creation, and conversion rate optimization (CRO) to maximize your online revenue.',
      isTop: true,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde42',
      q: 'How long does it take to see results from SEO?',
      a: 'While PPC can deliver immediate traffic, SEO is a long-term strategy. You can typically expect to see noticeable improvements in rankings and organic traffic within 3 to 6 months.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde50',
      q: 'How do you measure the success of a campaign?',
      a: "We track key performance indicators (KPIs) tailored to your goals, such as cost per acquisition (CPA), return on ad spend (ROAS), conversion rates, and overall organic traffic growth. You'll receive comprehensive monthly reports.",
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde5e',
      q: 'Do you handle both B2B and B2C digital marketing?',
      a: 'Absolutely. Our strategies are customized for your specific audience, whether that involves lead generation for B2B clients or direct e-commerce sales for B2C brands.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde6c',
      q: 'What makes your digital marketing approach different?',
      a: "We don't just chase traffic; we focus on revenue. Our data-driven approach ensures every dollar you spend is optimized for the highest possible return on investment.",
      isTop: false,
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
                        <div className="rt-text-style-h6">{q}</div>
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
    </>
  );
}