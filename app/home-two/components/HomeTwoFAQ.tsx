'use client';
import Link from "next/link";
import React, { useState, useRef } from 'react';

const faqData = [
  {
    question: "What types of services do you offer?",
    answer: "We offer a comprehensive suite of digital services including Custom Software Development, Web and Mobile App Development, UI/UX Graphics Designing, and full-scale Digital Marketing strategies to help businesses grow."
  },
  {
    question: "Do you provide custom software solutions?",
    answer: "Yes, we specialize in building custom software tailored exactly to your unique business needs, ensuring scalability, performance, and seamless integration with your existing workflows."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on the scope and complexity. A simple website might take a few weeks, while a complex mobile application or custom software platform can take several months. We provide detailed timelines during the discovery phase."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Absolutely. We provide ongoing maintenance and support for all our projects to ensure your software remains up-to-date, secure, and performs optimally as your business grows."
  },
  {
    question: "Can you help with digital marketing and SEO?",
    answer: "Yes! Our digital marketing team provides data-driven strategies including SEO, social media management, and paid advertising to boost your online visibility and drive measurable conversions."
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

export default function HomeTwoFAQ() {
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
