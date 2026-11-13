"use client"

import React, { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import OrderingCTASection from "@/components/OrderingCTASection"
import Footer from "@/components/Footer"
import ReservationModal from "@/components/ReservationModal"

export default function Home() {
  const [reservationOpen, setReservationOpen] = useState(false)

  useEffect(() => {
    const handleOpenReservation = () => setReservationOpen(true)
    window.addEventListener("app:open-reservation", handleOpenReservation)
    return () => window.removeEventListener("app:open-reservation", handleOpenReservation)
  }, [])

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] selection:bg-[#c96342]/20 selection:text-[#c96342]">
      {/* Top Adaptive Navigation Bar */}
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      {/* 1. Preserved Animated Hero Section (Cinematic Dark Stage) */}
      <HeroSection />

      {/* 2. Section A — Our Story */}
      <AboutSection />

      {/* 3. Section B — How It Works (4 Connected Steps & Special Capabilities) */}
      <HowItWorksSection />

      {/* 4. Section C — Final Call to Action */}
      <OrderingCTASection onOpenReservation={() => setReservationOpen(true)} />

      {/* 5. Footer */}
      <Footer onOpenReservation={() => setReservationOpen(true)} />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </div>
  )
}
