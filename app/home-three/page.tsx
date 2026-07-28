"use client";
import React from "react";
import WebflowInit from "../common/WebflowInit";
import Navbar from "@/app/common/Navbar";
import Footer from "@/app/common/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Agent from "./components/Agent";
import About from "./components/About";
import Features from "./components/Features";
import ChooseUs from "./components/ChooseUs";
import Solution from "./components/Solution";
import ToolsIntegration from "./components/ToolsIntegration";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";

export default function HomeThree() {
  return (
    <>
      <WebflowInit pageId="68eddb2fff5c773ab7afbc89" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Agent />
        <About />
        <Features />
        <ChooseUs />
        <Solution />
        <ToolsIntegration />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
