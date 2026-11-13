"use client"

import React from "react"
import { ArrowRight, CalendarClock, UtensilsCrossed } from "lucide-react"

export default function OrderingCTASection() {
  const handleReserveClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:navigating"))
    }
    const contactEl = document.querySelector("#contact")
    if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-20 bg-[#faf7f2] border-t border-[#e7dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#f4ede4] border border-[#e7dfd5] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xs text-center">
          {/* Subtle warm glow accents */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#c96342]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#b45309]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Small label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e7dfd5] text-xs font-semibold text-[#c96342] uppercase tracking-wider mb-4">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>FRESH FROM THE HEARTH</span>
            </div>

            {/* Prescribed Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1c1917] tracking-tight leading-[1.15]">
              Something Delicious Is Just a Few Clicks Away.
            </h2>

            {/* Prescribed Supporting Text */}
            <p className="mt-4 text-sm sm:text-base text-[#57534e] leading-relaxed max-w-lg mx-auto">
              Join us at The Corner Table for an exceptional dining experience, or get in touch for reservations and private gatherings.
            </p>

            {/* Action Button */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleReserveClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white font-medium text-sm transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
              >
                <CalendarClock className="w-4 h-4" />
                <span>Reserve a Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
