import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#252522]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <ProductShowcase />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
