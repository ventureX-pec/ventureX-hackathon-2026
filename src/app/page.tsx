import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { CulinaryShowcaseSection } from "@/components/landing/CulinaryShowcaseSection";
import { ScrollStorytelling } from "@/components/landing/ScrollStorytelling";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ForRestaurantsSection } from "@/components/landing/ForRestaurantsSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#FAF8F3] text-[#252522]">
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <CulinaryShowcaseSection />
        <ScrollStorytelling />
        <HowItWorks />
        <ForRestaurantsSection />
        <CtaSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
