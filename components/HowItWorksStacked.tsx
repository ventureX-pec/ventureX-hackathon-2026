"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface StepCard {
  id: string
  stepNum: string
  badge: string
  title: string
  tagline: string
  description: string
  image: string
}

const steps: StepCard[] = [
  {
    id: "step-1",
    stepNum: "01",
    badge: "DISCOVER",
    title: "Find Local Kitchens",
    tagline: "Live Preparation Times",
    description:
      "Open ServeZa to explore nearby campus cafes and compare live kitchen preparation queues before stepping out.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "step-2",
    stepNum: "02",
    badge: "EXPLORE MENU",
    title: "Browse Visual Menus",
    tagline: "Dietary Verified",
    description:
      "Browse high-res dish photos with 100% pure veg filters, custom spice options, and live counter availability.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "step-3",
    stepNum: "03",
    badge: "ORDER AHEAD",
    title: "Schedule & Pay with UPI",
    tagline: "1-Tap Instant Checkout",
    description:
      "Choose takeaway or dine-in, pick your exact lunch break pickup slot, and pay seamlessly via Google Pay or PhonePe.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "step-4",
    stepNum: "04",
    badge: "KITCHEN SYNC",
    title: "Track Live Cooking",
    tagline: "Synchronized Chef KDS",
    description:
      "Your order routes directly to the kitchen display screen. Watch live preparation updates with minute-by-minute countdowns.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "step-5",
    stepNum: "05",
    badge: "ZERO QUEUE",
    title: "Collect & Enjoy Fresh",
    tagline: "Express Shelf Pickup",
    description:
      "Arrive just as your food is packed hot. Skip the 15-minute ordering counter queue and spend your break savoring your meal.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  },
]

export default function HowItWorksStacked() {
  const [activeIndex, setActiveIndex] = useState(2) // Start with center card (Step 3: Order Ahead)
  const total = steps.length

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  }, [total])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1))
  }, [total])

  // Support keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handlePrev, handleNext])

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 bg-[#faf7f2] border-t border-[#e7dfd5] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#c96342]">
            SIMPLE & EFFORTLESS
          </span>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1c1917] mt-3"
            style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
          >
            How Serve<span className="text-[#c96342]">Za</span> Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#57534e] leading-relaxed max-w-xl mx-auto">
            From discovering nearby eateries to collecting your hot meal without waiting in line.
          </p>
        </motion.div>

        {/* Stacked Card Carousel Stage */}
        <div className="relative w-full max-w-5xl mx-auto h-[480px] sm:h-[540px] flex items-center justify-center">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous step"
            className="absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-[#1c1917] border border-[#e7dfd5] shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#1c1917]" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next step"
            className="absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-[#1c1917] border border-[#e7dfd5] shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#1c1917]" />
          </button>

          {/* Fanned-out Cards Deck */}
          <div className="relative w-full h-full flex items-center justify-center">
            {steps.map((card, i) => {
              // Calculate relative offset from active center card (-2, -1, 0, 1, 2)
              let diff = i - activeIndex

              // Wrap-around for infinite feeling
              if (diff < -2) diff += total
              if (diff > 2) diff -= total

              const isCenter = diff === 0

              // Layout parameters matching the exact Stacked Card Carousel reference
              let xOffset = 0
              let yOffset = 0
              let rotate = 0
              let scale = 1
              let zIndex = 10
              let opacity = 1

              if (diff === 0) {
                xOffset = 0
                yOffset = 0
                rotate = 0
                scale = 1.04
                zIndex = 30
                opacity = 1
              } else if (diff === -1) {
                xOffset = -180
                yOffset = 12
                rotate = -9
                scale = 0.92
                zIndex = 20
                opacity = 0.88
              } else if (diff === 1) {
                xOffset = 180
                yOffset = 12
                rotate = 9
                scale = 0.92
                zIndex = 20
                opacity = 0.88
              } else if (diff === -2) {
                xOffset = -330
                yOffset = 28
                rotate = -18
                scale = 0.82
                zIndex = 10
                opacity = 0.65
              } else if (diff === 2) {
                xOffset = 330
                yOffset = 28
                rotate = 18
                scale = 0.82
                zIndex = 10
                opacity = 0.65
              } else {
                opacity = 0
                scale = 0.7
                zIndex = 0
              }

              return (
                <motion.div
                  key={card.id}
                  onClick={() => setActiveIndex(i)}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) handleNext()
                    if (info.offset.x > 50) handlePrev()
                  }}
                  animate={{
                    x: xOffset,
                    y: yOffset,
                    rotate,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 26,
                    mass: 0.8,
                  }}
                  className={`absolute w-[260px] sm:w-[310px] h-[380px] sm:h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-lg border transition-colors ${
                    isCenter
                      ? "ring-2 ring-[#c96342]/70 border-[#c96342]/40 shadow-2xl cursor-grab active:cursor-grabbing"
                      : "border-[#e7dfd5] hover:border-[#c96342]/40"
                  }`}
                  style={{
                    transformOrigin: "bottom center",
                  }}
                >
                  {/* Full-bleed Photo */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    loading="eager"
                  />

                  {/* Gradient Vignette & Card Metadata */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-between p-5 sm:p-6 text-white pointer-events-none">
                    {/* Top Pill Badge */}
                    <div className="flex justify-center">
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-white text-[#1c1917] shadow-sm">
                        {card.badge}
                      </span>
                    </div>

                    {/* Bottom Editorial Content */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-[#faf7f2]/80 uppercase tracking-wider block">
                        Step {card.stepNum} • {card.tagline}
                      </span>
                      <h3
                        className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight"
                        style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed pt-0.5 line-clamp-3">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Minimalist Step Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Jump to step ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "w-8 bg-[#c96342]"
                  : "w-2.5 bg-[#e7dfd5] hover:bg-[#c96342]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
