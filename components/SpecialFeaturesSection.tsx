"use client"

import React from "react"
import { CalendarClock, ShieldCheck, SlidersHorizontal, Activity } from "lucide-react"

export default function SpecialFeaturesSection() {
  const features = [
    {
      title: "Smart Pickup Scheduling",
      description:
        "Select an exact pickup slot down to 10-minute intervals so your hot meal is freshly plated and never left sweating under heat lamps.",
      icon: <CalendarClock className="w-5 h-5 text-[#c96342]" />,
    },
    {
      title: "Ingredient-Aware Availability",
      description:
        "Live inventory synchronization from our prep stations ensures sold-out items update instantly, eliminating disappointing order cancellations.",
      icon: <ShieldCheck className="w-5 h-5 text-[#c96342]" />,
    },
    {
      title: "Personalized Ordering",
      description:
        "Easily filter by vegan, vegetarian, or gluten-free preferences, or specify exact sauce, seasoning, and allergy preferences with a tap.",
      icon: <SlidersHorizontal className="w-5 h-5 text-[#c96342]" />,
    },
    {
      title: "Live Order Updates",
      description:
        "Watch your order progress transparently from ticket received, to kitchen fire, plating, and ready-for-pass notifications.",
      icon: <Activity className="w-5 h-5 text-[#c96342]" />,
    },
  ]

  return (
    <section id="features" className="py-24 bg-[#faf7f2] border-t border-[#e7dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4ede4] border border-[#e7dfd5] text-xs font-semibold text-[#c96342] uppercase tracking-wider mb-3">
            <span>SPECIAL FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight">
            More Than Just Online Ordering.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534e]">
            Thoughtfully built for hospitality—ensuring every order is timed with precision and tailored to your exact tastes.
          </p>
        </div>

        {/* 4 Distinct Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-white rounded-2xl border border-[#e7dfd5] p-8 hover:border-[#c96342]/40 hover:shadow-xs transition-all duration-300 flex items-start gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f4ede4] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1c1917] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
