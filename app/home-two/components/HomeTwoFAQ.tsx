'use client';
import Link from "next/link";
import React, { useState, useRef } from 'react';

const faqData = [
  {
    question: "Does it integrate with other tools?",
    answer: "AI automation uses artificial intelligence to perform repetitive tasks, analyze data, and optimize processes, enabling businesses to save time, reduce errors, and make smarter, faster decisions efficiently."
  },
  {
    question: "How can task management software improve productivity?",
    answer: "AI can automate repetitive tasks like data entry, customer support, report generation, inventory management, and workflow optimization, allowing teams to focus on strategic, high-value activities and business growth."
  },
  {
    question: "Can I collaborate with my team using this platform?",
    answer: "Yes, AI automation is ideal for small businesses. It streamlines operations, reduces manual work, improves efficiency, and provides actionable insights, helping smaller teams compete and grow effectively."
  },
  {
    question: "Is this suitable for small teams and enterprises?",
    answer: "Industries like finance, healthcare, retail, manufacturing, and logistics benefit greatly from AI automation. It streamlines operations, reduces errors, enhances customer service, and drives efficiency across diverse business sectors."
  },
  {
    question: "Can I track project deadlines?",
    answer: "Absolutely. AI automation seamlessly integrates with your existing tools and platforms, allowing workflows to connect effortlessly, enhancing productivity, reducing manual effort, and ensuring a smooth transition without disrupting current operations."
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
