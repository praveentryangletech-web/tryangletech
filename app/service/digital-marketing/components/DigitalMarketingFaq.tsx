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
      q: 'What digital marketing services does Tryangletech offer?',
      a: 'We offer a complete suite of digital marketing services including SEO, Google & Meta Ads (PPC), social media marketing, content marketing, email campaigns, and conversion rate optimization — all managed by certified specialists.',
      isTop: true,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde42',
      q: 'How soon will I see results from SEO?',
      a: 'SEO is a long-term investment. Most of our clients begin to see meaningful improvements in rankings and organic traffic within 3–6 months. However, we set up quick wins early on to show progress while the long-term strategy builds momentum.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde50',
      q: 'What is your minimum budget for paid ads (PPC)?',
      a: 'We work with businesses of all sizes. Our PPC management typically starts with a minimum ad spend of ₹50,000/month. This ensures enough data for optimization and meaningful results. We’ll recommend the right budget based on your goals.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde5e',
      q: 'How do you measure and report on campaign performance?',
      a: 'You get a dedicated dashboard with real-time campaign data plus a detailed monthly report. We track KPIs like cost-per-lead, ROAS, conversion rates, and revenue attribution — so you always know exactly what’s working.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde6c',
      q: 'Do you work with businesses outside India?',
      a: 'Yes! We serve clients across India, the US, UK, UAE, and Australia. Our team is experienced in running multi-market campaigns and we adapt our strategies to the cultural and competitive nuances of each market.',
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