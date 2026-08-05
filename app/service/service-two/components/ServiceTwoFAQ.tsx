'use client';
import Link from "next/link";

import React, { useState } from 'react';

import Image from "next/image";

const SA = '/service3-assets';

const faqs = [
  {
    q: "How do I get started with the platform?",
    a: "Simply sign up for a free trial, create your workspace, and invite your team. No credit card required and setup takes less than 5 minutes.",
  },
  {
    q: "Can multiple teams use the platform simultaneously?",
    a: "Yes, our platform supports unlimited teams and workspaces, allowing multiple teams to collaborate in parallel without any overlap or confusion.",
  },
  {
    q: "Does it support mobile access?",
    a: "Absolutely. Our platform is fully responsive and we offer dedicated iOS and Android apps so your team can stay productive on the go.",
  },
  {
    q: "How does billing work?",
    a: "We offer monthly and annual billing. Annual plans come with a 20% discount. You can upgrade, downgrade, or cancel at any time from your account settings.",
  },
  {
    q: "Is customer support available?",
    a: "Yes, we provide 24/7 live chat and email support for all plans, with dedicated account managers for enterprise customers.",
  },
];

export default function ServiceTwoFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
              <div
                data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde34"
                className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag rt-top-gap-of">
                <div className="w-layout-hflex rt-faq-top-part">
                  <div className="w-layout-hflex r-faq-text-wrap">
                    <div className="rt-text-style-h6">
                      What is AI automation, and how does it work ?{" "}
                    </div>
                  </div>
                  <div className="rt-faq-right-part">
                    <div className="rt-faq-minus"></div>
                    <div className="rt-faq-plus"></div>
                  </div>
                </div>
                <div className="rt-faq-bottom-part rt-overflow-hidden">
                  <div className="rt-faq-para-wrap">
                    <p className="rt-gap-off">
                      AI automation uses artificial intelligence to perform
                      repetitive tasks, analyze data, and optimize processes,
                      enabling businesses to save time, reduce errors, and
                      make smarter, faster decisions efficiently.
                    </p>
                  </div>
                </div>
              </div>
              <div
                data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde42"
                className="w-layout-vflex rt-faq-dropdown-wrap">
                <div className="w-layout-hflex rt-faq-top-part">
                  <div className="w-layout-hflex r-faq-text-wrap">
                    <div className="rt-text-style-h6">
                      What types of tasks can be automated with AI ?
                    </div>
                  </div>
                  <div className="rt-faq-right-part">
                    <div className="rt-faq-minus"></div>
                    <div className="rt-faq-plus"></div>
                  </div>
                </div>
                <div className="rt-faq-bottom-part rt-overflow-hidden">
                  <div className="rt-faq-para-wrap">
                    <p className="rt-no-margin">
                      AI can automate repetitive tasks like data entry,
                      customer support, report generation, inventory
                      management, and workflow optimization, allowing teams to
                      focus on strategic, high-value activities and business
                      growth.
                    </p>
                  </div>
                </div>
              </div>
              <div
                data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde50"
                className="w-layout-vflex rt-faq-dropdown-wrap">
                <div className="w-layout-hflex rt-faq-top-part">
                  <div className="w-layout-hflex r-faq-text-wrap">
                    <div className="rt-text-style-h6">
                      Is AI automation suitable for small businesses ?
                    </div>
                  </div>
                  <div className="rt-faq-right-part">
                    <div className="rt-faq-minus"></div>
                    <div className="rt-faq-plus"></div>
                  </div>
                </div>
                <div className="rt-faq-bottom-part rt-overflow-hidden">
                  <div className="rt-faq-para-wrap">
                    <p className="rt-gap-off">
                      Yes, AI automation is ideal for small businesses. It
                      streamlines operations, reduces manual work, improves
                      efficiency, and provides actionable insights, helping
                      smaller teams compete and grow effectively.
                    </p>
                  </div>
                </div>
              </div>
              <div
                data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde5e"
                className="w-layout-vflex rt-faq-dropdown-wrap">
                <div className="w-layout-hflex rt-faq-top-part">
                  <div className="w-layout-hflex r-faq-text-wrap">
                    <div className="rt-text-style-h6">
                      What industries benefit the most from AI
                      automation?{" "}
                    </div>
                  </div>
                  <div className="rt-faq-right-part">
                    <div className="rt-faq-minus"></div>
                    <div className="rt-faq-plus"></div>
                  </div>
                </div>
                <div className="rt-faq-bottom-part rt-overflow-hidden">
                  <div className="rt-faq-para-wrap">
                    <p className="rt-gap-off">
                      Industries like finance, healthcare, retail,
                      manufacturing, and logistics benefit greatly from AI
                      automation. It streamlines operations, reduces errors,
                      enhances customer service, and drives efficiency across
                      diverse business sectors.
                    </p>
                  </div>
                </div>
              </div>
              <div
                data-w-id="4dd3e22b-253f-3566-2cec-7767aa6cde6c"
                className="w-layout-vflex rt-faq-dropdown-wrap">
                <div className="w-layout-hflex rt-faq-top-part">
                  <div className="w-layout-hflex r-faq-text-wrap">
                    <div className="rt-text-style-h6">
                      Can AI automation integrate with my existing tools?{" "}
                    </div>
                  </div>
                  <div className="rt-faq-right-part">
                    <div className="rt-faq-minus"></div>
                    <div className="rt-faq-plus"></div>
                  </div>
                </div>
                <div className="rt-faq-bottom-part rt-overflow-hidden">
                  <div className="rt-faq-para-wrap">
                    <p className="rt-gap-off">
                      Absolutely. AI automation seamlessly integrates with
                      your existing tools and platforms, allowing workflows to
                      connect effortlessly, enhancing productivity, reducing
                      manual effort, and ensuring a smooth transition without
                      disrupting current operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
