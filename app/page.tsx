"use client"

import React from "react"
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import MenuSection from "@/components/MenuSection"
import AboutSection from "@/components/AboutSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import SpecialFeaturesSection from "@/components/SpecialFeaturesSection"
import ContactSection from "@/components/ContactSection"
import OrderingCTASection from "@/components/OrderingCTASection"
import Footer from "@/components/Footer"
import CartDrawer from "@/components/CartDrawer"
import FloatingCartButton from "@/components/FloatingCartButton"

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] selection:bg-[#c96342]/20 selection:text-[#c96342]">
        {/* Navigation Bar */}
        <Navbar />

        {/* 1. Preserved Animated Hero Section (Single Unified Hero) */}
        <HeroSection />

        {/* 2. Our Menu Section */}
        <MenuSection />

        {/* 3. Section A — Our Story */}
        <AboutSection />

        {/* 4. Section B — How It Works */}
        <HowItWorksSection />

        {/* 5. Section C — Our Special Features */}
        <SpecialFeaturesSection />

        {/* 6. Section D — Contact */}
        <ContactSection />

        {/* 7. Section E — Final CTA */}
        <OrderingCTASection />

        {/* 8. Section F — Footer */}
        <Footer />

        {/* Interactive Slide-over Cart Drawer */}
        <CartDrawer />

        {/* Persistent Floating Cart Button */}
        <FloatingCartButton />
      </div>
    </CartProvider>
  )
}
