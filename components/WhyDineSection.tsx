"use client"

import React from "react"
import { Sparkles, DollarSign, SlidersHorizontal, PackageCheck, Activity, CheckCircle2 } from "lucide-react"

export default function WhyDineSection() {
  const highlights = [
    {
      title: "Freshly Prepared Food",
      description:
        "Every sauce, pasta dough, and marinade is prepped from scratch daily in our kitchen. We cook to order in small batches.",
      icon: <Sparkles className="w-5 h-5 text-[#c25e3e]" />,
    },
    {
      title: "Transparent Menu & Pricing",
      description:
        "What you see is what you pay. No hidden platform markups, surge fees, or unexpected service add-ons at checkout.",
      icon: <DollarSign className="w-5 h-5 text-[#c25e3e]" />,
    },
    {
      title: "Customizable Dishes",
      description:
        "Easily swap ingredients, specify dietary needs, or adjust seasonings right from your phone without miscommunication.",
      icon: <SlidersHorizontal className="w-5 h-5 text-[#c25e3e]" />,
    },
    {
      title: "Convenient Takeaway Ordering",
      description:
        "Limited lunch break? Place your takeaway order ahead of time, select your pickup slot, and grab your food without waiting.",
      icon: <PackageCheck className="w-5 h-5 text-[#c25e3e]" />,
    },
    {
      title: "Clear Order Status Updates",
      description:
        "Real-time countdown and status cards keep you informed at every step: from the moment the kitchen accepts to plating.",
      icon: <Activity className="w-5 h-5 text-[#c25e3e]" />,
    },
  ]

  return (
    <section className="py-24 bg-[#faf7f2] border-t border-[#e7dfd5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3ede4] border border-[#e7dfd5] text-xs font-semibold text-[#c25e3e] uppercase tracking-wider mb-3">
              <span>The Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight leading-tight">
              Why Dine With Us?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#57534e] leading-relaxed">
              We started as a family-run corner eatery with a simple belief: dining out should be warm, nourishing, and completely devoid of unnecessary friction.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-white border border-[#e7dfd5] shadow-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2e7d32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1c1917]">Direct Kitchen Connection</h4>
                  <p className="text-xs text-[#57534e] mt-1 leading-relaxed">
                    By eliminating paper order slips and aggregator friction, orders go straight from your screen to our cooks' station with zero errors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Pillars Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item, idx) => (
              <div
                key={item.title}
                className={`bg-white p-6 rounded-2xl border border-[#e7dfd5] hover:border-[#c25e3e]/40 hover:shadow-xs transition-all ${
                  idx === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#f3ede4] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-serif text-base font-semibold text-[#1c1917] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#57534e] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
