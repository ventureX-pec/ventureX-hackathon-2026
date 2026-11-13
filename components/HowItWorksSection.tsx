"use client"

import React from "react"
import { Compass, Sliders, CalendarClock, Heart, ArrowRight, ShieldCheck, Activity } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      name: "Discover",
      description: "Browse our chef-curated dishes with honest ingredient lists and live kitchen availability.",
      icon: <Compass className="w-5 h-5 text-[#c96342]" />,
    },
    {
      number: "02",
      name: "Customize",
      description: "Tailor any dish to your taste, dietary preferences or spice tolerance in a couple of clicks.",
      icon: <Sliders className="w-5 h-5 text-[#c96342]" />,
    },
    {
      number: "03",
      name: "Schedule",
      description: "Choose between quick table-side dine-in or precision pickup timed to the minute.",
      icon: <CalendarClock className="w-5 h-5 text-[#c96342]" />,
    },
    {
      number: "04",
      name: "Enjoy",
      description: "Savor your meal fresh from the pass, prepared with care by our dedicated kitchen brigade.",
      icon: <Heart className="w-5 h-5 text-[#c96342]" />,
    },
  ]

  const features = [
    {
      title: "Smart Pickup Scheduling",
      description: "Select an exact pickup slot down to 10-minute intervals so your hot meal is never left sweating under heat lamps.",
      icon: <CalendarClock className="w-4 h-4 text-[#c96342]" />,
    },
    {
      title: "Ingredient-Aware Availability",
      description: "Live inventory tracking from our kitchen line ensures sold-out items update instantly, avoiding order disappointments.",
      icon: <ShieldCheck className="w-4 h-4 text-[#c96342]" />,
    },
    {
      title: "Personalized Ordering",
      description: "Filter effortlessly by vegan, vegetarian, or gluten-free preferences, or specify exact seasonings with a single tap.",
      icon: <Sliders className="w-4 h-4 text-[#c96342]" />,
    },
    {
      title: "Live Order Updates",
      description: "Watch your ticket move transparently through our brigade from ticket fire to plating and ready-for-pass.",
      icon: <Activity className="w-4 h-4 text-[#c96342]" />,
    },
  ]

  const handleContactClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:navigating"))
    }
    const el = document.querySelector("#contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="how-it-works" className="py-24 bg-[#faf7f2] border-t border-[#e7dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Exact Heading & Supporting Text */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4ede4] border border-[#e7dfd5] text-xs font-semibold text-[#c96342] uppercase tracking-wider mb-3">
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight">
            Your Favourite Food, A Simpler Way.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534e]">
            Discover the menu, make it yours and know when your order will be ready.
          </p>
        </div>

        {/* 4 Connected Timeline Steps */}
        <div className="relative mb-20">
          {/* Subtle connecting line for desktop timeline */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-[#e7dfd5] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl border border-[#e7dfd5] p-7 flex flex-col justify-between hover:border-[#c96342]/40 hover:shadow-xs transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#f4ede4] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {step.icon}
                    </div>
                    <span className="font-serif text-3xl font-light text-[#d6cbbe] group-hover:text-[#c96342] transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#1c1917] mb-2.5">
                    {step.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Special Capabilities Grid */}
        <div className="mt-12 pt-12 border-t border-[#e7dfd5]/80">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-medium text-[#1c1917]">
              More Than Just Online Ordering
            </h3>
            <p className="text-xs sm:text-sm text-[#57534e] mt-1">
              Thoughtfully engineered hospitality from the first tap to the final bite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="bg-white rounded-xl border border-[#e7dfd5] p-6 hover:shadow-2xs transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f4ede4] flex items-center justify-center mb-3">
                  {feat.icon}
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#1c1917] mb-1.5">
                  {feat.title}
                </h4>
                <p className="text-xs text-[#57534e] leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Get in Touch / Reserve */}
        <div className="mt-16 text-center">
          <button
            onClick={handleContactClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white font-medium text-sm transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
          >
            <span>Plan Your Visit or Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
