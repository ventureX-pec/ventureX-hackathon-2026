"use client"

import React from "react"
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import MenuSection from "@/components/MenuSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import WhyDineSection from "@/components/WhyDineSection"
import AboutSection from "@/components/AboutSection"
import OrderingCTASection from "@/components/OrderingCTASection"
import Footer from "@/components/Footer"
import CartDrawer from "@/components/CartDrawer"
import FloatingCartButton from "@/components/FloatingCartButton"

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#fbf9f5] text-[#1c1917] selection:bg-[#c25e3e]/20 selection:text-[#c25e3e]">
        {/* Top Sticky Navigation */}
        <Navbar />

        {/* Section A: Preserved Animated Hero Section with DishOrbitCarousel */}
        <HeroSection />

        {/* Section B: Interactive Seasonal Menu with Category Filters & Search */}
        <MenuSection />

        {/* Section C: How Ordering Works in 3 Steps */}
        <HowItWorksSection />

        {/* Section D: Why Dine With Us (5 Pillars) */}
        <WhyDineSection />

        {/* Section E: Editorial About & Food Philosophy */}
        <AboutSection />

        {/* Section F: Ordering CTA */}
        <OrderingCTASection />

        {/* Section G: Footer with Restaurant Information & Hours */}
        <Footer />

        {/* Slide-over Cart & Order Confirmation Modal */}
        <CartDrawer />

        {/* Persistent Floating Order Indicator */}
        <FloatingCartButton />
      </div>
    </CartProvider>
  )
}
