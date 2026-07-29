import React from "react";
import WebflowInit from "../common/WebflowInit";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import PortfolioHero from "./components/PortfolioHero";
import PortfolioGrid from "./components/PortfolioGrid";
import HomeThreeFaq from "../home-three/components/Faq";
import HomeTwoTestimonial from "../home-two/components/HomeTwoTestimonial";

export default function PortfolioPage() {
  return (
    <>
      <WebflowInit pageId="68eddb21f14a8338ce862110" />
      <Navbar />
      <main>
        <section className="rt-hero-12">
          <PortfolioHero />
          <PortfolioGrid />
        </section>
        <HomeThreeFaq />
        <HomeTwoTestimonial />
      </main>
      <Footer />
    </>
  );
}
