'use client';
import Link from "next/link";
import React, { useState } from 'react';
import Image from "next/image";

const SA = '/service3-assets';

export default function CustomSoftwareFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde34',
      q: 'How long does it take to build custom software?',
      a: 'It really depends on the complexity of what you need. A focused web application might take 6 to 10 weeks, while a larger enterprise system could take several months. We always give you a detailed timeline upfront before any work begins so you know exactly what to expect.',
      isTop: true,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde42',
      q: 'Do I need a technical background to work with your team?',
      a: 'Not at all. We are experienced at translating business goals into technical requirements. You just share your vision and challenges with us and we handle everything from architecture to deployment. We keep the conversation simple and always in plain language.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde50',
      q: 'Will I own the software and source code after the project?',
      a: 'Absolutely. Once the project is complete and the final payment is made, full ownership of the code and all related assets transfers to you. There are no licensing fees or ongoing ties to us unless you choose to keep us on for support.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde5e',
      q: 'What happens after the software is launched?',
      a: 'We do not just hand things over and disappear. We offer ongoing maintenance and support packages to keep your software running smoothly, handle any bugs that come up, and help you add new features as your business grows.',
      isTop: false,
    },
    {
      wid: '4dd3e22b-253f-3566-2cec-7767aa6cde6c',
      q: 'Can you work with our existing systems and tools?',
      a: 'Yes, and this is something we do all the time. Whether you need new software to connect with your CRM, ERP, or any third party platform, we make sure everything integrates cleanly so your team can keep working the way they already do.',
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