'use client';
import Link from "next/link";

import React from 'react';

import Image from "next/image";

const CA = '/contact-assets';

export default function ContactDetails() {
  return (
    <>
        <section
          data-w-id="06ad75e2-33a0-a6ed-6982-3475e3c38499"
          className="rt-contact-v3-details rt-position-relative">
          <div className="w-layout-blockcontainer rt-container w-container">
            <div
              data-w-id="06ad75e2-33a0-a6ed-6982-3475e3c3849b"
              className="w-layout-hflex rt-contact-details-heading-wrap rt-heading-bottom-gap">
              <div className="rt-contact-details-heading rt-tab-text-center">
                <div className="rt-sub-gap">
                  <div className="rt-sub-text rt-sub-gredient">
                    Contact with us
                  </div>
                </div>
                <h2 className="rt-no-margin">
                  Stay connected with reliable task{" "}
                  <span className="rt-color-periwinkle-gray">
                    management assistance
                  </span>
                </h2>
              </div>
              <div className="rt-contact-v3-utton-wrap">
                <Link
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href="/about"
                  className="rt-button-body w-inline-block">
                  <div className="rt-button-text">Talk to a task expert</div>
                  <div className="rt-button-body-overlay"></div>
                </Link>
              </div>
            </div>
            <div className="w-layout-grid rt-contact-details-v3-card">
              {/* Card 1 – Address */}
              <div
                data-w-id="f2b19bb8-906f-ca69-02ba-9cc3e69620ed"
                className="rt-contact-details-v3-card-main">
                <div className="rt-contact-details-card">
                  <div className="w-layout-vflex rt-contact-details-cad-top-part">
                    <div>
                      <Image
                        width={47}
                        height={34}
                        alt=""
                        src={`${CA}/68ff6f486c1e1aea191e71fa_location.svg`}
                        loading="lazy"
                        className="rt-contact-icon"
                       />
                    </div>
                    <div className="rt-text-style-h6">Office address</div>
                  </div>
                  <div className="rt-contact-details-para-wrap">
                    <p className="rt-no-margin">
                      Visit our office at the address below for consultations,
                      support, or to connect with our team directly.
                    </p>
                  </div>
                  <div className="rt-contact-v3-details-text-wrap">
                    <div className="rt-text-style-h6">
                      1st Floor-29/Vithal Plaza, New Naroda, Ahmedabad
                    </div>
                  </div>
                </div>
                <div className="rt-contact-details-v3-card-overlay rt-one"></div>
              </div>
              {/* Card 2 – Email */}
              <div
                data-w-id="7863ef52-b266-c000-ad95-61b1a7761619"
                className="rt-contact-details-v3-card-main">
                <div className="rt-contact-details-card">
                  <div className="w-layout-vflex rt-contact-details-cad-top-part">
                    <div className="rt-contact-icon">
                      <Image
                        width={43}
                        height={34}
                        alt=""
                        src={`${CA}/68ff6f534f70c35617e6462c_email.svg`}
                        loading="lazy"
                       />
                    </div>
                    <div className="rt-text-style-h6">Email address</div>
                  </div>
                  <div className="rt-contact-details-para-wrap">
                    <p className="rt-no-margin">
                      Contact us at the email address below for inquiries,
                      support, or to discuss how we can assist efficiently.
                    </p>
                  </div>
                  <div className="rt-contact-v3-details-text-wrap">
                    <a
                      href="mailto:info.tryangletech@gmail.com"
                      className="rt-text-style-h6">
                      info.tryangletech@gmail.com
                    </a>
                  </div>
                </div>
                <div className="rt-contact-details-v3-card-overlay rt-two"></div>
              </div>
              {/* Card 3 – Phone */}
              <div
                data-w-id="321b38ae-f340-8e4b-7baa-62dcff3408d3"
                className="rt-contact-details-v3-card-main">
                <div className="rt-contact-details-card">
                  <div className="w-layout-vflex rt-contact-details-cad-top-part">
                    <div>
                      <Image
                        width={29}
                        height={34}
                        alt=""
                        src={`${CA}/68ff6f48a3b994823c7de81d_call.svg`}
                        loading="lazy"
                        className="rt-contact-icon"
                       />
                    </div>
                    <div className="rt-text-style-h6">Phone number</div>
                  </div>
                  <div className="rt-contact-details-para-wrap">
                    <p className="rt-no-margin">
                      Call us at the phone number below for inquiries, support,
                      or to discuss solutions tailored to your needs.
                    </p>
                  </div>
                  <div className="rt-contact-v3-details-text-wrap">
                    <a href="tel:+919033878806" className="rt-text-style-h6">
                      +91 90338 78806
                    </a>
                  </div>
                </div>
                <div className="rt-contact-details-v3-card-overlay rt-three"></div>
              </div>
            </div>
          </div>
          <div className="w-layout-hflex rt-section-line-wrap rt-margin-auto rt-bottom">
            <div className="rt-section-overlay"></div>
          </div>
        </section>
    </>
  );
}
