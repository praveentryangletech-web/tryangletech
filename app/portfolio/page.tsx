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
      <div style={{ backgroundColor: '#f9fbff', backgroundImage: 'linear-gradient(#1833fe1a 12%, #812efd1a 34%, #ef56450d 56%, #ffaf5e00 72%, #ffaf5e00 85%)', minHeight: '100vh' }}>
        <Navbar />
        <main>
          <PortfolioHero />
          <PortfolioGrid />
          <HomeThreeFaq />
          <HomeTwoTestimonial />
        </main>
      </div>
      <Footer />
    </>
  );
}
