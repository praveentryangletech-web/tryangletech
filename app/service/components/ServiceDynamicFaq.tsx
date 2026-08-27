'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ServiceFaqItem } from '@/backend/services/services/services.types';
import { DEFAULT_SERVICE_MAIN_CONTENT } from '@/backend/services/services/services.defaults';

interface ServiceDynamicFaqProps {
  faqs?: ServiceFaqItem[];
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag"
      style={{ cursor: 'pointer' }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="w-layout-hflex rt-faq-top-part" style={{ alignItems: 'center' }}>
        <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
          <h3 className="rt-text-style-h6" style={{ marginTop: 0, marginBottom: 0 }}>
            {question}
          </h3>
        </div>
        <div className="rt-faq-right-part" style={{ position: 'relative', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0C2451' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0C2451' }}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          )}
        </div>
      </div>
      <div
        className="rt-faq-bottom-part rt-overflow-hidden"
        style={{
          height: isOpen ? (contentRef.current?.scrollHeight || 'auto') : 0,
          opacity: isOpen ? 1 : 0,
          transition: 'height 0.3s ease, opacity 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <div ref={contentRef} className="rt-faq-para-wrap rt-faq-v2">
          <p className="rt-gap-off">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDynamicFaq({ faqs: propFaqs }: ServiceDynamicFaqProps) {
  const faqs = propFaqs && propFaqs.length > 0 ? propFaqs : DEFAULT_SERVICE_MAIN_CONTENT.faqs;

  return (
    <>
      <section className="rt-faq">
        <div className="w-layout-blockcontainer rt-container-main w-container">
          <div className="rt-faq-content-main-v2">
            <div className="w-layout-hflex rt-faq-heading-main rt-faq-2-main-left">
              <div className="w-layout-vflex rt-faq-heading-wrap rt-faq-v2">
                <div className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">
                    Frequently asked questions
                  </div>
                </div>
                <h2 className="rt-no-margin">
                  Everything you want to know{' '}
                  <span className="rt-color-periwinkle-gray">
                    explained clearly
                  </span>
                </h2>
                <div className="rt-button-para-gap">
                  <Link href="/contact" className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Contact us today</div>
                    <div className="rt-button-body-overlay"></div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="rt-faq-main rt-margin-auto rt-faq-2-main">
              {faqs.map((faq, index) => (
                <FAQItem key={faq.id || index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

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
