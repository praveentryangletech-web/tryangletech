'use client';
import Link from "next/link";
import React, { useState, useRef } from 'react';

const faqData = [
  {
    question: "How long does it take to build a website?",
    answer: "The timeline depends on the complexity of the project, but a typical business website takes 4-6 weeks from design to launch."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes! We offer monthly maintenance packages to keep your website updated, secure, and running smoothly."
  },
  {
    question: "Are the websites mobile-friendly?",
    answer: "Absolutely. Every website we build is fully responsive and optimized for mobile devices and tablets."
  },
  {
    question: "Can I update the content myself?",
    answer: "Yes, we integrate easy-to-use Content Management Systems (CMS) so you can update text and images without any coding knowledge."
  },
  {
    question: "Do you offer custom web applications?",
    answer: "Yes, beyond standard websites, we build complex, custom web applications tailored to your specific business workflows."
  }
];

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
          <div className="rt-text-style-h6">
            {question}
          </div>
        </div>
        <div className="rt-faq-right-part" style={{ position: 'relative' }}>
          <div className="rt-faq-minus"></div>
          <div className="rt-faq-plus" style={{ 
            opacity: isOpen ? 0 : 1, 
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'all 0.3s ease',
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%'
          }}></div>
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

export default function WebDevBottomFAQ() {
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
                {faqData.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
