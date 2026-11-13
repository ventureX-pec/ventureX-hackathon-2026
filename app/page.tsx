"use client"

import React from "react"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import ContactSection from "@/components/ContactSection"
import OrderingCTASection from "@/components/OrderingCTASection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] selection:bg-[#c96342]/20 selection:text-[#c96342]">
      {/* Top Adaptive Navigation Bar */}
      <Navbar />

      {/* 1. Preserved Animated Hero Section (Cinematic Dark Stage) */}
      <HeroSection />

      {/* 2. Section A — Our Story */}
      <AboutSection />

      {/* 3. Section B — How It Works (4 Connected Steps & Special Capabilities) */}
      <HowItWorksSection />

      {/* 4. Section C — Contact & Reservations */}
      <ContactSection />

      {/* 5. Final CTA */}
      <OrderingCTASection />

      {/* 6. Footer */}
      <Footer />
    </div>
  )
}
