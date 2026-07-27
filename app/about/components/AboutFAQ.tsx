'use client';

import { useState } from 'react';

const A = '/about-assets';

export default function AboutFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
        {/* ── FAQ ── */}
        <div className="rt-position-relative">
          <section className="rt-faq">
            <div className="w-layout-blockcontainer rt-container-main w-container">
              <div className="rt-faq-content-main-v2">
                <div className="w-layout-hflex rt-faq-heading-main rt-faq-2-main-left">
                  <div className="w-layout-vflex rt-faq-heading-wrap rt-faq-v2">
                    <div className="rt-sub-gap">
                      <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb877" className="rt-sub-text rt-sub-gredient">Frequently asked questions</div>
                    </div>
                    <h2 data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb879" className="rt-no-margin">
                      Everything you want to know <span className="rt-color-periwinkle-gray">explained clearly</span>
                    </h2>
                    <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb87d" className="rt-button-para-gap">
                      <a data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8" href="/contact" className="rt-button-body w-inline-block">
                        <div className="rt-button-text">Contact us today</div>
                        <div className="rt-button-body-overlay"></div>
                      </a>
                    </div>
                  </div>
                </div>
                <div data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb880" className="rt-faq-main rt-margin-auto rt-faq-2-main">
                  {[
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb881', q: 'Does it integrate with other tools?', a: 'AI automation uses artificial intelligence to perform repetitive tasks, analyze data, and optimize processes, enabling businesses to save time, reduce errors, and make smarter, faster decisions efficiently.', isTop: true, paraClass: '' },
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb88f', q: 'How can task management software improve productivity?', a: 'AI can automate repetitive tasks like data entry, customer support, report generation, inventory management, and workflow optimization, allowing teams to focus on strategic, high-value activities and business growth.', paraClass: ' rt-faq-v2' },
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb89d', q: 'Can I collaborate with my team using this platform?', a: 'Yes, AI automation is ideal for small businesses. It streamlines operations, reduces manual work, improves efficiency, and provides actionable insights, helping smaller teams compete and grow effectively.', paraClass: '' },
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb8ab', q: 'Is this suitable for small teams and enterprises?', a: 'Industries like finance, healthcare, retail, manufacturing, and logistics benefit greatly from AI automation. It streamlines operations, reduces errors, enhances customer service, and drives efficiency across diverse business sectors.', paraClass: '' },
                    { wid: 'b2a480e3-6f74-2e20-f3b4-35e4eb0fb8b9', q: 'Can I track project deadlines?', a: 'Absolutely. AI automation seamlessly integrates with your existing tools and platforms, allowing workflows to connect effortlessly, enhancing productivity, reducing manual effort, and ensuring a smooth transition without disrupting current operations.', paraClass: ' rt-faq-v2' },
                  ].map(({ wid, q, a, isTop, paraClass }, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={wid}
                        data-w-id={wid}
                        className={`w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag${isTop ? ' rt-top-gap-of' : ''}`}
                        style={{ cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0)' }}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                      >
                        <div className="w-layout-hflex rt-faq-top-part">
                          <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                            <div className="rt-text-style-h6">{q}</div>
                          </div>
                          <div className="rt-faq-right-part">
                            <div className="rt-faq-minus"></div>
                            <div className="rt-faq-plus" style={isOpen ? { transform: 'rotate(45deg)' } : {}}></div>
                          </div>
                        </div>
                        {isOpen && (
                          <div className="rt-faq-bottom-part rt-overflow-hidden" style={{ height: 'auto', display: 'block' }}>
                            <div className={`rt-faq-para-wrap${paraClass}`}>
                              <p className="rt-gap-off">{a}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <div data-w-id="ff1e6d5c-f1a0-634b-694b-32e3986fb09b" className="w-layout-hflex rt-section-line-wrap rt-margin-auto">
            <div className="rt-section-overlay"></div>
          </div>
        </div>
    </>
  );
}
