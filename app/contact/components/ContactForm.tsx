'use client';

import React from 'react';

const CA = '/contact-assets';

export default function ContactForm() {
  return (
    <>
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
    </>
  );
}
