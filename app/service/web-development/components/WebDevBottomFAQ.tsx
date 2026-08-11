'use client';
import Link from "next/link";
import React, { useState, useRef } from 'react';

const faqData = [
  {
    question: "How long does it take to build a website?",
    answer: "It depends on what you need. A simple business website usually takes around 3 to 5 weeks. Larger projects with more pages or features take a bit longer. We will always give you a clear timeline before we start."
  },
  {
    question: "Do you keep working on the site after it goes live?",
    answer: "Yes, we do. We offer support packages to keep your website updated, secure, and working well. You will not be left on your own once the project is done."
  },
  {
    question: "Will my website work on phones and tablets?",
    answer: "Definitely. Every website we build works well on all screen sizes including phones, tablets, and desktop computers. Your visitors get a good experience no matter what device they use."
  },
  {
    question: "Can I make changes to my website myself?",
    answer: "Yes. We set up a simple content management system so you can update your text and images on your own without needing to know how to code."
  },
  {
    question: "Do you build web applications as well?",
    answer: "Yes, we do. We build everything from simple websites to more complex web apps with features like user logins, dashboards, bookings, and more. Just tell us what you need and we will figure out the best way to build it."
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
