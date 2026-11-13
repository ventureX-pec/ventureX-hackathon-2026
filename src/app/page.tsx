import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksStacked } from "@/components/landing/HowItWorksStacked";
import { CulinaryShowcaseSection } from "@/components/landing/CulinaryShowcaseSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";
import { PointerFollower } from "@/components/motion/PointerFollower";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <PointerFollower />
      <main className="min-h-screen bg-[#FAF8F3] text-[#252522]">
        <Navbar />
        <HeroSection />
        <HowItWorksStacked />
        <CulinaryShowcaseSection />
        <CtaSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
