"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const CA = "/contact-assets";

const faqs = [
  {
    q: "What is AI automation, and how does it work?",
    a: "AI automation uses artificial intelligence to perform repetitive tasks, analyze data, and optimize processes, enabling businesses to save time, reduce errors, and make smarter, faster decisions efficiently.",
  },
  {
    q: "What types of tasks can be automated with AI?",
    a: "AI can automate repetitive tasks like data entry, customer support, report generation, inventory management, and workflow optimization, allowing teams to focus on strategic, high-value activities and business growth.",
  },
  {
    q: "Is AI automation suitable for small businesses?",
    a: "Yes, AI automation is ideal for small businesses. It streamlines operations, reduces manual work, improves efficiency, and provides actionable insights, helping smaller teams compete and grow effectively.",
  },
  {
    q: "What industries benefit the most from AI automation?",
    a: "Industries like finance, healthcare, retail, manufacturing, and logistics benefit greatly from AI automation. It streamlines operations, reduces errors, enhances customer service, and drives efficiency across diverse business sectors.",
  },
  {
    q: "Can AI automation integrate with my existing tools?",
    a: "Absolutely. AI automation seamlessly integrates with your existing tools and platforms, allowing workflows to connect effortlessly, enhancing productivity, reducing manual effort, and ensuring a smooth transition without disrupting current operations.",
  },
];

import WebflowInit from "../common/WebflowInit";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-wf-page",
      "68eddcfa0d76f97cdbb8c1e5",
    );
    document.documentElement.setAttribute(
      "data-wf-site",
      "68c3feed3b3e541e7d5c098a",
    );
    const initWebflow = setInterval(() => {
      const Webflow = (window as any).Webflow;
      if (typeof window !== "undefined" && Webflow && Webflow.require) {
        const ix2 = Webflow.require("ix2");
        if (ix2) {
          clearInterval(initWebflow);
          Webflow.destroy();
          Webflow.ready();
          ix2.init();
          document.dispatchEvent(new Event("readystatechange"));
        }
      }
    }, 100);
    return () => clearInterval(initWebflow);
  }, []);

  return (
    <>
      <WebflowInit pageId="68eddcfa0d76f97cdbb8c1e5" />
      <Navbar />

      <main>
        <div>
          {/* ── HERO ── */}
          <section
            data-w-id="bfaf7311-da51-950a-1d57-7a0beac913ae"
            className="rt-hero-v9">
            <div className="w-layout-blockcontainer rt-container w-container">
              <div className="w-layout-hflex rt-hero-v9-heading-main">
                <div className="w-layout-vflex rt-hero-v9-heading-wrap rt-desktop-text-center rt-position-relative">
                  <div className="rt-sub-gap">
                    <div
                      data-w-id="bfaf7311-da51-950a-1d57-7a0beac913b2"
                      className="rt-sub-text rt-sub-gredient">
                      Contact with us
                    </div>
                  </div>
                  <div className="rt-hero-heading-gap">
                    <h1
                      data-w-id="bfaf7311-da51-950a-1d57-7a0beac913b4"
                      className="rt-gap-off">
                      Stay connected with seamless task management support
                    </h1>
                  </div>
                  <div
                    data-w-id="bfaf7311-da51-950a-1d57-7a0beac913b8"
                    className="rt-hero-v9-para-wrap">
                    <p className="rt-gap-off">
                      Stay connected with seamless task management support
                      ensures your team never feels stuck. With real-time
                      communication, quick response assistance.
                    </p>
                  </div>
                  <div
                    data-w-id="298ba08c-7cb0-240a-1ae7-4aa7d990a6d3"
                    className="rt-small-btn-wrap rt-hero-v1-small rt-blog-2">
                    <div className="rt-small-btn-main rt-color-change">
                      <div className="rt-small-btn-text">Workflow</div>
                      <div className="rt-btn-arrow-v2 rt-hero-v1-small">
                        <img
                          src={`${CA}/69203b6151156495054eacd7_Vector 503 (2).svg`}
                          loading="lazy"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CONTACT FORM ── */}
          <section className="rt-contact-v1">
            <div className="w-layout-blockcontainer rt-container w-container">
              <div
                data-w-id="9df9fe8a-0b70-4512-b304-09c24df4eb77"
                className="rt-contact-v1-main rt-shadow">
                <div className="rt-contact-three-main rt-border-radius-large">
                  <div className="rt-contact-v1-form w-form">
                    <form
                      id="wf-form-Contact-Form-V3"
                      name="wf-form-Contact-Form-V3"
                      data-name="Contact Form V3"
                      method="get"
                      className="rt-contact-three-form"
                      aria-label="Contact Form V3">
                      <div className="rt-contact-three-wrapper">
                        <div className="w-layout-vflex rt-contact-v1-field-wrap">
                          <div className="rt-color-dark-indigo rt-font-width">
                            First&nbsp;&nbsp;name
                          </div>
                          <input
                            className="rt-contact-v1-field w-input"
                            maxLength={256}
                            name="Contact-Form-V3-First-Name"
                            data-name="Contact Form V3 First Name"
                            placeholder="Enter your first name*"
                            type="text"
                            id="Contact-Form-V3-First-Name"
                            required
                          />
                        </div>
                        <div className="w-layout-vflex rt-contact-v1-field-wrap">
                          <div className="rt-color-dark-indigo rt-font-width">
                            Last name
                          </div>
                          <input
                            className="rt-contact-v1-field w-input"
                            maxLength={256}
                            name="Contact-Form-V3-Last-Name"
                            data-name="Contact Form V3 Last Name"
                            placeholder="Enter your last name*"
                            type="text"
                            id="Contact-Form-V3-Last-Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="rt-contact-three-wrapper">
                        <div className="w-layout-vflex rt-contact-v1-field-wrap">
                          <div className="rt-color-dark-indigo rt-font-width">
                            Phone number
                          </div>
                          <input
                            className="rt-contact-v1-field w-input"
                            maxLength={256}
                            name="Contact-Form-V3-Phone-Number"
                            data-name="Contact Form V3 Phone Number"
                            placeholder="Phone number*"
                            type="tel"
                            id="Contact-Form-V3-Phone-Number"
                            required
                          />
                        </div>
                        <div className="w-layout-vflex rt-contact-v1-field-wrap">
                          <div className="rt-color-dark-indigo rt-font-width">
                            Email address
                          </div>
                          <input
                            className="rt-contact-v1-field w-input"
                            maxLength={256}
                            name="Contact-Form-V3-Email"
                            data-name="Contact Form V3 Email"
                            placeholder="Email address*"
                            type="email"
                            id="Contact-Form-V3-Email"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-layout-vflex rt-contact-v1-field-wrap">
                        <div className="rt-color-dark-indigo rt-font-width">
                          Your message
                        </div>
                        <textarea
                          id="Contact-Form-V3-Message"
                          name="Contact-Form-V3-Message"
                          maxLength={5000}
                          data-name="Contact Form V3 Message"
                          placeholder="Your message"
                          required
                          className="rt-contact-v1-field rt-text-area w-input"></textarea>
                      </div>
                      <div className="w-layout-vflex rt-contact-v1-checkbox-main">
                        <div className="rt-small-name">Subject</div>
                        <div className="rt-contact-v1-checkbox-wrap">
                          <label className="w-checkbox rt-contact-three-checkbox">
                            <input
                              type="checkbox"
                              name="Contact-Form-V3-Checkbox-One"
                              id="Contact-Form-V3-Checkbox-One"
                              data-name="Contact Form V3 Checkbox One"
                              className="w-checkbox-input rt-contact-v1-checkbox"
                            />
                            <span className="w-form-label">
                              General inquiry
                            </span>
                          </label>
                          <label className="w-checkbox rt-contact-three-checkbox">
                            <input
                              type="checkbox"
                              name="Contact-Form-V3-Checkbox-Two"
                              id="Contact-Form-V3-Checkbox-Two"
                              data-name="Contact Form V3 Checkbox Two"
                              className="w-checkbox-input rt-contact-v1-checkbox"
                            />
                            <span className="w-form-label">
                              Pricing, technical support
                            </span>
                          </label>
                          <label className="w-checkbox rt-contact-three-checkbox">
                            <input
                              type="checkbox"
                              name="Contact-Form-V3-Checkbox-Three"
                              id="Contact-Form-V3-Checkbox-Three"
                              data-name="Contact Form V3 Checkbox Three"
                              className="w-checkbox-input rt-contact-v1-checkbox"
                            />
                            <span className="w-form-label">Feedback</span>
                          </label>
                          <label className="w-checkbox rt-contact-three-checkbox">
                            <input
                              type="checkbox"
                              name="Contact-Form-V3-Checkbox-Four"
                              id="Contact-Form-V3-Checkbox-Four"
                              data-name="Contact Form V3 Checkbox Four"
                              className="w-checkbox-input rt-contact-v1-checkbox"
                            />
                            <span className="w-form-label">Other</span>
                          </label>
                        </div>
                      </div>
                      <div className="w-layout-vflex rt-contact-v1-button-main">
                        <div
                          data-w-id="9df9fe8a-0b70-4512-b304-09c24df4eba2"
                          className="rt-contact-v1-button-wrap rt-position-relative">
                          <input
                            type="submit"
                            data-wait="Please wait..."
                            className="rt-submit-button w-button"
                            value="Submit"
                          />
                          <a
                            data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                            href="/contact"
                            className="rt-button-body w-inline-block">
                            <div className="rt-button-text">Submit here</div>
                            <div className="rt-button-body-overlay"></div>
                          </a>
                        </div>
                      </div>
                    </form>
                    <div
                      className="rt-success-massage w-form-done"
                      tabIndex={-1}
                      role="region"
                      aria-label="Contact Form V3 success">
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div
                      className="rt-error-massage w-form-fail"
                      tabIndex={-1}
                      role="region"
                      aria-label="Contact Form V3 failure">
                      <div className="rt-desktop-text-center">
                        Sorry! Your submission has been denied!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── CONTACT DETAILS ── */}
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
                <a
                  data-w-id="7f842da5-19d8-bbc8-1376-5a4231000dc8"
                  href="/about"
                  className="rt-button-body w-inline-block">
                  <div className="rt-button-text">Talk to a task expert</div>
                  <div className="rt-button-body-overlay"></div>
                </a>
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
                      <img
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
                      410 Sandtown, California 94001, USA
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
                      <img
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
                      href="mailto:info@example.com"
                      className="rt-text-style-h6">
                      info@example.com
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
                      <img
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
                    <a href="tel:8881234567" className="rt-text-style-h6">
                      (888) 123 4567
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

        {/* ── FAQ ── */}
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
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    data-w-id={`faq-item-${i}`}
                    className="w-layout-vflex rt-faq-dropdown-wrap"
                    style={{
                      backgroundColor:
                        openFaq === i
                          ? "rgba(0, 0, 0, 0.03)"
                          : "rgba(0, 0, 0, 0)",
                    }}>
                    <div
                      className="w-layout-hflex rt-faq-top-part"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ cursor: "pointer" }}>
                      <div className="w-layout-hflex r-faq-text-wrap">
                        <div className="rt-text-style-h6">{faq.q}</div>
                      </div>
                      <div className="rt-faq-right-part">
                        <div
                          className="rt-faq-minus"
                          style={{
                            display: openFaq === i ? "block" : "none",
                          }}></div>
                        <div
                          className="rt-faq-plus"
                          style={{
                            display: openFaq === i ? "none" : "block",
                          }}></div>
                      </div>
                    </div>
                    <div
                      className="rt-faq-bottom-part rt-overflow-hidden"
                      style={{ height: openFaq === i ? "auto" : "0px" }}>
                      <div className="rt-faq-para-wrap">
                        <p className="rt-gap-off">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
