"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";


import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';
import ContactFAQ from './components/ContactFAQ';

const CA = "/contact-assets";


import WebflowInit from "../common/WebflowInit";

export default function ContactPage() {

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
          <ContactHero />

          {/* ── CONTACT FORM ── */}
          <ContactForm />
        </div>

        {/* ── CONTACT DETAILS ── */}
          <ContactDetails />

        {/* ── FAQ ── */}
          <ContactFAQ />
      </main>

      <Footer />
    </>
  );
}
