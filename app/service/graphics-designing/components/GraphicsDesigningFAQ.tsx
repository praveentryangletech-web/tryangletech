'use client';
import Link from "next/link";
import React, { useState } from 'react';
import Image from "next/image";
import ScrollTextReveal from "../../../common/ScrollTextReveal";

const SA = '/service3-assets';

export default function GraphicsDesigningFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'What types of graphic design services do you offer?',
      a: 'We offer a full spectrum of graphic design services, including logo design, brand identity packages, marketing materials (flyers, brochures, banners), social media graphics, UI/UX design, and custom illustrations.',
    },
    {
      q: 'How long does a typical design project take?',
      a: 'Timelines vary depending on the complexity of the project. A standard logo design may take 1-2 weeks, while a comprehensive brand identity package could take 3-4 weeks. We always provide a clear timeline before starting.',
    },
    {
      q: 'Do I get the source files for my designs?',
      a: 'Absolutely! Upon project completion and final payment, we provide all high-resolution files and the original source files (like .AI, .PSD, or .Figma) so you have full ownership of your assets.',
    },
    {
      q: "What is your revision process?",
      a: 'We believe in a collaborative approach. Most of our design packages include a set number of revision rounds. We present our concepts, gather your feedback, and make refinements until the design aligns perfectly with your vision.',
    },
    {
      q: 'Do you offer printing services as well?',
      a: 'While we specialize in the digital creation of print-ready designs, we partner with trusted local and online printers. We can either manage the printing process for you or provide you with the exact files you need to take to a printer of your choice.',
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
                <ScrollTextReveal
                  text="Everything you want to know explained clearly"
                  align="center"
                  className="rt-no-margin"
                />
              </div>
            </div>
            <div
              data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde33"
              className="rt-faq-main rt-margin-auto">
              {faqs.map(({ q, a }, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag${idx === 0 ? ' rt-top-gap-of' : ''}`}
                    style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="w-layout-hflex rt-faq-top-part">
                      <div className="w-layout-hflex r-faq-text-wrap">
                        <h3 className="rt-text-style-h6" style={{ marginTop: 0, marginBottom: 0 }}>{q}</h3>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
    </>
  );
}