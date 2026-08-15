'use client';
import Link from "next/link";
import React, { useState } from 'react';
import Image from "next/image";
import ScrollTextReveal from "../../../common/ScrollTextReveal";

const SA = '/service3-assets';

const faqs = [
  {
    q: "Do you build apps for both iPhone and Android?",
    a: "Yes, we can build apps that work on every type of phone so you can reach all your customers.",
  },
  {
    q: "How long does it take to build an app?",
    a: "It depends on what you need, but most apps take about three to six months to finish from start to launch.",
  },
  {
    q: "Do you keep working on the app after it launches?",
    a: "Yes we do. We offer support packages to make sure your app stays updated and secure as phone software changes.",
  },
  {
    q: "Can the app connect to my current systems?",
    a: "Yes, we can easily connect your new app to the databases and software your business already uses.",
  },
  {
    q: "Do you help put the app on the app stores?",
    a: "Yes, we take care of the whole process of getting your app approved and published so people can download it.",
  },
];

export default function MobileApplicationFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
        <section className="rt-faq">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-faq-content-main-v2">
              <div className="w-layout-hflex rt-faq-heading-main rt-faq-2-main-left">
                <div className="w-layout-vflex rt-faq-heading-wrap rt-faq-v2">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb877"
                      className="rt-sub-text rt-sub-gredient">
                      questions and answers
                    </div>
                  </div>
                  <ScrollTextReveal
                    text="All your questions answered clearly"
                    align="left"
                    className="rt-no-margin"
                  />
                  <div
                    data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb87d"
                    className="rt-button-para-gap">
                    <Link
                      data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                      href="/contact"
                      className="rt-button-body w-inline-block">
                      <div className="rt-button-text">Contact us today</div>
                      <div className="rt-button-body-overlay"></div>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb880"
                className="rt-faq-main rt-margin-auto rt-faq-2-main">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag"
                      style={{ cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0)' }}
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
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
