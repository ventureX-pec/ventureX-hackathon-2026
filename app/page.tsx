"use client"

import React, { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import HowItWorksStacked from "@/components/HowItWorksStacked"
import OrderingCTASection from "@/components/OrderingCTASection"
import Footer from "@/components/Footer"
import ReservationModal from "@/components/ReservationModal"
import PolicyModal, { PolicyType } from "@/components/PolicyModal"

export default function Home() {
  const [reservationOpen, setReservationOpen] = useState(false)
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null)

  useEffect(() => {
    const handleOpenReservation = () => setReservationOpen(true)
    const handleOpenPolicy = (e: CustomEvent<PolicyType>) => setActivePolicy(e.detail)
    window.addEventListener("app:open-reservation", handleOpenReservation)
    window.addEventListener("app:open-policy" as any, handleOpenPolicy)
    return () => {
      window.removeEventListener("app:open-reservation", handleOpenReservation)
      window.removeEventListener("app:open-policy" as any, handleOpenPolicy)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] selection:bg-[#c96342]/20 selection:text-[#c96342]">
      {/* Top Adaptive Navigation Bar */}
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      {/* 1. Preserved Animated Hero Section (Cinematic Dark Stage) */}
      <HeroSection onOpenReservation={() => setReservationOpen(true)} />

      {/* 2. Interactive How It Works Stacked Cards Section */}
      <HowItWorksStacked />

      {/* 3. Final Call to Action */}
      <OrderingCTASection onOpenReservation={() => setReservationOpen(true)} />

      {/* 4. Footer */}
      <Footer
        onOpenReservation={() => setReservationOpen(true)}
        onOpenPolicy={(policy: PolicyType) => setActivePolicy(policy)}
      />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />

      {/* Interactive Legal Policy & Allergen Modal */}
      <PolicyModal
        isOpen={activePolicy !== null}
        activePolicy={activePolicy || "privacy"}
        onClose={() => setActivePolicy(null)}
        onSelectPolicy={(policy) => setActivePolicy(policy)}
      />
    </div>
  )
}
