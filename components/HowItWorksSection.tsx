"use client"

import React from "react"
import { Compass, Sliders, BellRing, QrCode, Timer, ShoppingBag } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Explore the Live Menu",
      description:
        "Scan the QR code at your table or open our web menu on your phone. See live ingredient availability, real-time prep times, and dietary highlights with zero app downloads.",
      icon: <Compass className="w-6 h-6 text-[#c25e3e]" />,
      badge: "No App Install Needed",
    },
    {
      number: "02",
      title: "Customize & Choose Mode",
      description:
        "Select your dining mode: Dine-In with table service or Skip-the-Line Takeaway with an exact pickup window. Adjust spice levels, dietary preferences, or add extra toppings with a tap.",
      icon: <Sliders className="w-6 h-6 text-[#c25e3e]" />,
      badge: "Dine-In or Takeaway",
    },
    {
      number: "03",
      title: "Instant Kitchen Order & Live Track",
      description:
        "Your order beams straight to the kitchen display screen. Watch live prep milestones from 'Received' to 'Ready for Service', eliminating long counter queues completely.",
      icon: <BellRing className="w-6 h-6 text-[#c25e3e]" />,
      badge: "Real-Time ETA",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-[#fbf9f5] border-t border-[#e7dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3ede4] border border-[#e7dfd5] text-xs font-semibold text-[#c25e3e] uppercase tracking-wider mb-3">
            <span>Seamless Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight">
            How Ordering Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534e]">
            We designed our dining and pickup experience to respect your time. Zero counter bottlenecks, total transparency.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl border border-[#e7dfd5] p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Step indicator top */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#f3ede4] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="font-serif text-3xl font-light text-[#d6cbbe] group-hover:text-[#c25e3e] transition-colors">
                    {step.number}
                  </span>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#f3ede4] text-[11px] font-semibold text-[#78716c] mb-3">
                  {step.badge}
                </span>

                <h3 className="font-serif text-xl font-medium text-[#1c1917] mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress Line on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-[#e7dfd5] z-10 pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* Visual Callout Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#f3ede4] border border-[#e7dfd5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#c25e3e] shadow-2xs">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#1c1917]">Visiting in person?</h4>
              <p className="text-xs text-[#57534e]">Every table features a discreet scan card. Settle in and order at your own pace.</p>
            </div>
          </div>

          <a
            href="#menu"
            className="px-5 py-2.5 rounded-full bg-[#1c1917] hover:bg-[#c25e3e] text-white text-xs font-semibold whitespace-nowrap transition-colors shadow-2xs"
          >
            Try It Now
          </a>
        </div>
      </div>
    </section>
  )
}
