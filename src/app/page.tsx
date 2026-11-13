import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { CulinaryShowcaseSection } from "@/components/landing/CulinaryShowcaseSection";
import { ScrollStorytelling } from "@/components/landing/ScrollStorytelling";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-[#FAF8F3] text-[#252522]">
        <Navbar />
        <HeroSection />
        <CulinaryShowcaseSection />
        <ScrollStorytelling />
        <CtaSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
