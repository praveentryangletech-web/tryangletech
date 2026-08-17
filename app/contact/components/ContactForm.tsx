'use client';

import React from 'react';
import { ContactProvider, useContact } from '@/app/context/ContactContext';

const SUBJECT_OPTIONS = [
  { id: 'General inquiry', label: 'General inquiry' },
  { id: 'Pricing, technical support', label: 'Pricing, technical support' },
  { id: 'Feedback', label: 'Feedback' },
  { id: 'Other', label: 'Other' },
];

function ContactFormInner() {
  // Using React Context for clean state management
  const {
    formData,
    status,
    errorMessage,
    setFormField,
    toggleSubject,
    submitForm,
  } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <section className="rt-contact-v1">
      {/* Inline animation keyframes for rotating circle spinner */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spinCircle {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />

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
                onSubmit={handleSubmit}
                className="rt-contact-three-form"
                aria-label="Contact Form V3">
                
                {/* First Name & Last Name Row */}
                <div className="rt-contact-three-wrapper">
                  <div className="w-layout-vflex rt-contact-v1-field-wrap">
                    <div className="rt-color-dark-indigo rt-font-width">
                      First&nbsp;&nbsp;name
                    </div>
                    <input
                      className="rt-contact-v1-field w-input"
                      maxLength={256}
                      name="firstName"
                      placeholder="Enter your first name*"
                      type="text"
                      id="Contact-Form-V3-First-Name"
                      value={formData.firstName}
                      onChange={(e) => setFormField('firstName', e.target.value)}
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div className="w-layout-vflex rt-contact-v1-field-wrap">
                    <div className="rt-color-dark-indigo rt-font-width">
                      Last name
                    </div>
                    <input
                      className="rt-contact-v1-field w-input"
                      maxLength={256}
                      name="lastName"
                      placeholder="Enter your last name*"
                      type="text"
                      id="Contact-Form-V3-Last-Name"
                      value={formData.lastName}
                      onChange={(e) => setFormField('lastName', e.target.value)}
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                {/* Phone & Email Row */}
                <div className="rt-contact-three-wrapper">
                  <div className="w-layout-vflex rt-contact-v1-field-wrap">
                    <div className="rt-color-dark-indigo rt-font-width">
                      Phone number
                    </div>
                    <input
                      className="rt-contact-v1-field w-input"
                      maxLength={256}
                      name="phone"
                      placeholder="Phone number*"
                      type="tel"
                      id="Contact-Form-V3-Phone-Number"
                      value={formData.phone}
                      onChange={(e) => setFormField('phone', e.target.value)}
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <div className="w-layout-vflex rt-contact-v1-field-wrap">
                    <div className="rt-color-dark-indigo rt-font-width">
                      Email address
                    </div>
                    <input
                      className="rt-contact-v1-field w-input"
                      maxLength={256}
                      name="email"
                      placeholder="Email address*"
                      type="email"
                      id="Contact-Form-V3-Email"
                      value={formData.email}
                      onChange={(e) => setFormField('email', e.target.value)}
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="w-layout-vflex rt-contact-v1-field-wrap">
                  <div className="rt-color-dark-indigo rt-font-width">
                    Your message
                  </div>
                  <textarea
                    id="Contact-Form-V3-Message"
                    name="message"
                    maxLength={5000}
                    placeholder="Your message*"
                    required
                    value={formData.message}
                    onChange={(e) => setFormField('message', e.target.value)}
                    disabled={status === 'submitting'}
                    className="rt-contact-v1-field rt-text-area w-input"></textarea>
                </div>

                {/* Subject Options Checkboxes */}
                <div className="w-layout-vflex rt-contact-v1-checkbox-main">
                  <div className="rt-small-name">Subject</div>
                  <div className="rt-contact-v1-checkbox-wrap">
                    {SUBJECT_OPTIONS.map((opt) => (
                      <label key={opt.id} className="w-checkbox rt-contact-three-checkbox">
                        <input
                          type="checkbox"
                          name={opt.id}
                          checked={formData.subjects.includes(opt.id)}
                          onChange={() => toggleSubject(opt.id)}
                          disabled={status === 'submitting'}
                          className="w-checkbox-input rt-contact-v1-checkbox"
                        />
                        <span className="w-form-label">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="w-layout-vflex rt-contact-v1-button-main" style={{ marginTop: '2rem', display: 'flex', alignItems: 'flex-start' }}>
                  <div className="rt-contact-v1-button-wrap rt-position-relative" style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="rt-button-body w-inline-block"
                      style={{
                        border: 'none',
                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                        backgroundColor: 'var(--vivid-blue, #4f46e5)',
                        color: '#ffffff',
                        padding: '1rem 2.25rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '180px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.35)',
                        opacity: status === 'submitting' ? 0.8 : 1,
                      }}>
                      <span className="rt-button-text" style={{ color: '#ffffff', zIndex: 2, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {status === 'submitting' ? (
                          <>
                            {/* Smooth Circular Loading Spinner */}
                            <svg
                              style={{
                                width: '18px',
                                height: '18px',
                                animation: 'spinCircle 0.8s linear infinite',
                                display: 'inline-block',
                                flexShrink: 0,
                              }}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeOpacity="0.25"
                              />
                              <path
                                d="M12 3a9 9 0 0 1 9 9"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit here</span>
                            <span style={{ fontSize: '1.1rem' }}>→</span>
                          </>
                        )}
                      </span>
                      <div className="rt-button-body-overlay"></div>
                    </button>
                  </div>
                </div>
              </form>

              {/* Success Feedback Box */}
              {status === 'success' && (
                <div
                  className="rt-success-massage w-form-done"
                  style={{ display: 'block', marginTop: '1.5rem', padding: '1rem', backgroundColor: '#ecfdf5', borderRadius: '8px', border: '1px solid #10b981' }}
                  tabIndex={-1}
                  role="region"
                  aria-label="Contact Form V3 success">
                  <div style={{ color: '#065f46', fontWeight: 600, textAlign: 'center' }}>
                    🎉 Thank you! Your message has been received and saved successfully!
                  </div>
                </div>
              )}

              {/* Error Feedback Box */}
              {status === 'error' && (
                <div
                  className="rt-error-massage w-form-fail"
                  style={{ display: 'block', marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #ef4444' }}
                  tabIndex={-1}
                  role="region"
                  aria-label="Contact Form V3 failure">
                  <div className="rt-desktop-text-center" style={{ color: '#991b1b', fontWeight: 500, textAlign: 'center' }}>
                    ⚠️ {errorMessage || 'Sorry! Your submission could not be processed. Please check your database connection!'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactForm() {
  return (
    <ContactProvider>
      <ContactFormInner />
    </ContactProvider>
  );
}
