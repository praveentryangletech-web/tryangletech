'use client';
import Link from "next/link";

import React, { useState } from 'react';

import Image from "next/image";

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
                  <h2
                    data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb879"
                    className="rt-no-margin">
                    All your questions answered{" "}
                    <span className="rt-color-periwinkle-gray">
                      clearly
                    </span>
                  </h2>
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
                <div
                  data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb881"
                  className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag rt-top-gap-of">
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                      <div className="rt-text-style-h6">
                        Do you build apps for both iPhone and Android?
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
                        Yes, we can build apps that work on every type of phone so you can reach all your customers.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb88f"
                  className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag">
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                      <div className="rt-text-style-h6">
                        How long does it take to build an app?
                      </div>
                    </div>
                    <div className="rt-faq-right-part">
                      <div className="rt-faq-minus"></div>
                      <div className="rt-faq-plus"></div>
                    </div>
                  </div>
                  <div className="rt-faq-bottom-part rt-overflow-hidden">
                    <div className="rt-faq-para-wrap rt-faq-v2">
                      <p className="rt-gap-off">
                        It depends on what you need, but most apps take about three to six months to finish from start to launch.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb89d"
                  className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag">
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                      <div className="rt-text-style-h6">
                        Do you keep working on the app after it launches?
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
                        Yes we do. We offer support packages to make sure your app stays updated and secure as phone software changes.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb8ab"
                  className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag">
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                      <div className="rt-text-style-h6">
                        Can the app connect to my current systems?
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
                        Yes, we can easily connect your new app to the databases and software your business already uses.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="b2a480e3-6f74-2e20-f3b4-35e4eb0fb8b9"
                  className="w-layout-vflex rt-faq-dropdown-wrap rt-faq-pag">
                  <div className="w-layout-hflex rt-faq-top-part">
                    <div className="w-layout-hflex r-faq-text-wrap rt-faq-v2">
                      <div className="rt-text-style-h6">
                        Do you help put the app on the app stores?
                      </div>
                    </div>
                    <div className="rt-faq-right-part">
                      <div className="rt-faq-minus"></div>
                      <div className="rt-faq-plus"></div>
                    </div>
                  </div>
                  <div className="rt-faq-bottom-part rt-overflow-hidden">
                    <div className="rt-faq-para-wrap rt-faq-v2">
                      <p className="rt-gap-off">
                        Yes, we take care of the whole process of getting your app approved and published so people can download it.
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
