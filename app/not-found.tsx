"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/common/Navbar';
import Footer from '@/app/common/Footer';
import WebflowInit from '@/app/common/WebflowInit';

export default function NotFound() {
  return (
    <>
      <WebflowInit pageId="68eddb146961691d5aa6086f" />
      <Navbar />
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8f9ff" }}>
        {/* We use flex-grow to push the footer to the bottom organically */}
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 20px" }}>
          
          <div className="rt-sub-text rt-sub-gredient" style={{ marginBottom: "20px", display: "inline-block" }}>
            404 Error
          </div>

          <h1 className="rt-gap-off" style={{ fontSize: "3rem", fontWeight: "bold", color: "#171717", marginBottom: "24px", textAlign: "center" }}>
            Page not found
          </h1>

          <p className="rt-hero-v1-top-padding rt-gap-off" style={{ maxWidth: "600px", textAlign: "center", color: "#666", marginBottom: "40px" }}>
            Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or did not exist in the first place.
          </p>

          <Link href="/" className="rt-button-body w-inline-block">
            <div className="rt-button-text">Go back home</div>
            <div className="rt-button-body-overlay"></div>
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
}
