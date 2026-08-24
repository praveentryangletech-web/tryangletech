'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AboutFaqSection } from '@/backend/services/about/about.types';
import { DEFAULT_ABOUT_CONTENT } from '@/backend/services/about/about.defaults';

interface AboutFAQProps {
  faqSection?: AboutFaqSection;
}

export default function AboutFAQ({ faqSection = DEFAULT_ABOUT_CONTENT.faqSection }: AboutFAQProps) {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    if (openFaqs.includes(idx)) {
      setOpenFaqs(openFaqs.filter((i) => i !== idx));
    } else {
      setOpenFaqs([...openFaqs, idx]);
    }
  };

  const faqs = faqSection.faqs && faqSection.faqs.length > 0 ? faqSection.faqs : DEFAULT_ABOUT_CONTENT.faqSection.faqs;

  return (
    <>
      {/* ── FAQ ── */}
      <div className="rt-position-relative">
        <section className="rt-faq">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-faq-content-main-v2">
              <div className="w-layout-hflex rt-faq-heading-main rt-faq-2-main-left">
                <div className="w-layout-vflex rt-faq-heading-wrap rt-faq-v2">
                  <div className="rt-sub-gap">
                    <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb877" className="rt-sub-text rt-sub-gredient">
                      {faqSection.subBadgeText || 'Frequently asked questions'}
                    </div>
                  </div>
                  <h2 data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb879" className="rt-no-margin">
                    {faqSection.heading || 'Your common questions'}{' '}
                    <span className="rt-color-periwinkle-gray">{faqSection.headingHighlight || 'answered'}</span>
                  </h2>
                  <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb87d" className="rt-button-para-gap">
                    <Link
                      data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                      href={faqSection.ctaButtonLink || '/contact'}
                      className="rt-button-body w-inline-block"
                    >
                      <div className="rt-button-text">{faqSection.ctaButtonText || 'Contact us today'}</div>
                      <div className="rt-button-body-overlay"></div>
                    </Link>
                  </div>
                </div>
              </div>
              <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb880" className="rt-faq-main rt-margin-auto rt-faq-2-main">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqs.includes(idx);
                  return (
                    <div
                      key={faq.id || idx}
                      className={`w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag${idx === 0 ? ' rt-top-gap-of' : ''}`}
                      style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      onClick={() => toggleFaq(idx)}
                    >
                      <div className="w-layout-hflex rt-faq-top-part">
                        <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                          <h3 className="rt-text-style-h6" style={{ marginTop: 0, marginBottom: 0 }}>
                            {faq.q}
                          </h3>
                        </div>
                        <div className="rt-faq-right-part">
                          <div className="rt-faq-minus"></div>
                          <div
                            className="rt-faq-plus"
                            style={{
                              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                              opacity: isOpen ? 0 : 1,
                              transition: 'all 0.3s ease',
                            }}
                          ></div>
                        </div>
                      </div>
                      <div
                        className="rt-faq-bottom-part rt-overflow-hidden"
                        style={{
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                          paddingTop: isOpen ? '20px' : 0,
                        }}
                      >
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
        <div data-w-id="ff1e6d5c-f1a0-634b-694b-32e3986fb09b" className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
          <div className="rt-section-overlay"></div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </>
  );
}
