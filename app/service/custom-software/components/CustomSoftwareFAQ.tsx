'use client';
import React, { useState } from 'react';

export default function CustomSoftwareFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde34',
      q: 'Do you build both web and mobile custom applications?',
      a: 'Yes, we are a full-stack development agency. We build responsive web applications, native mobile apps (iOS and Android), and cross-platform solutions tailored to your business needs.',
      isTop: true,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde42',
      q: 'Will I own the source code?',
      a: 'Absolutely. Once the project is completed and fully paid for, all intellectual property rights and the complete source code are transferred to you.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde50',
      q: 'How do you ensure the software is secure?',
      a: 'Security is baked into our development lifecycle from day one. We follow OWASP best practices, perform regular vulnerability scanning, encrypt data at rest and in transit, and implement role-based access controls.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde5e',
      q: "Can you rescue an existing software project that is failing?",
      a: 'Yes. We frequently conduct code audits and rescue missions for legacy systems or stalled projects. We will assess your current codebase, identify the bottlenecks, and provide a clear roadmap to stabilize and complete the software.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde6c',
      q: 'How do we communicate during the project?',
      a: 'We use agile methodologies and maintain transparent communication. You will have a dedicated project manager, access to our project tracking tools (like Jira or Asana), and scheduled weekly sprint reviews to see working software.',
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
                    className="rt-sub-text rt-sub-gredient">
                    Frequently asked questions
                  </div>
                </div>
                <h2
                  data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde2f"
                  className="rt-no-margin">
                  Everything you want to know{" "}
                  <span className="rt-color-periwinkle-gray">
                    explained clearly
                  </span>
                </h2>
              </div>
            </div>
            <div
              data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde33"
              className="rt-faq-main rt-margin-auto">
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
                              : 'rotate(0deg)',
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
    </>
  );
}
