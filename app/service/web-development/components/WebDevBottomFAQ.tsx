'use client';

import Link from "next/link";
import Script from "next/script";
import React, { useState, useRef } from 'react';
import { WebDevFaqItem } from '@/backend/services/services/services.types';
import { DEFAULT_WEB_DEV_CONTENT } from '@/backend/services/services/services.defaults';

function FAQItem({ question, answer }: { question: string, answer: string }) {
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
          height: isOpen ? (contentRef.current?.scrollHeight || 'auto') : 0,
          opacity: isOpen ? 1 : 0,
          transition: 'height 0.3s ease, opacity 0.3s ease',
          overflow: 'hidden'
        }}
      >
        <div ref={contentRef} className="rt-faq-para-wrap rt-faq-v2">
          <p className="rt-gap-off">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WebDevBottomFAQ({ faqs }: { faqs?: WebDevFaqItem[] }) {
  const list = faqs && faqs.length > 0 ? faqs : DEFAULT_WEB_DEV_CONTENT.faqs;

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
                  Everything you want to know{" "}
                  <span className="rt-color-periwinkle-gray">
                    explained clearly
                  </span>
                </h2>
                <div className="rt-button-para-gap">
                  <Link
                    href="/contact"
                    className="rt-button-body w-inline-block">
                    <div className="rt-button-text">Contact us today</div>
                    <div className="rt-button-body-overlay"></div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="rt-faq-main rt-margin-auto rt-faq-2-main">
              {list.map((faq, index) => (
                <FAQItem key={faq.id || index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Script
        id="webdev-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": list.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </>
  );
}

