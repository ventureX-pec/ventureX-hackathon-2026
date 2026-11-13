"use client"

import React from "react"
import { ArrowRight } from "lucide-react"

export default function AboutSection() {
  const scrollToMenu = () => {
    const el = document.querySelector("#menu")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="story" className="py-24 bg-[#faf7f2] border-t border-[#e7dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Restaurant/Food Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#e7dfd5] shadow-sm aspect-[4/5] max-h-[540px] w-full bg-[#f4ede4]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80"
                alt="Chef plating food in the kitchen"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Editorial Text alongside Image */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Small "OUR STORY" label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] border border-[#e7dfd5] text-xs font-semibold text-[#c96342] uppercase tracking-wider mb-4">
              <span>OUR STORY</span>
            </div>

            {/* Exact Prescribed Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight leading-[1.15]">
              Every Dish Has a Story.
            </h2>

            {/* Exact Prescribed Content */}
            <div className="mt-6 space-y-5 text-base sm:text-lg text-[#57534e] leading-relaxed font-light">
              <p>
                Good food is more than what&apos;s served on a plate. It&apos;s about the ingredients, the preparation and the people behind the kitchen.
              </p>
              <p>
                We believe every guest deserves food prepared with care, an experience that feels personal and a simple way to enjoy their favourites.
              </p>
              <p>
                From discovering something new to enjoying a familiar favourite, we want every visit to feel special.
              </p>
            </div>

            {/* Explore Our Menu button */}
            <div className="mt-8">
              <button
                onClick={scrollToMenu}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white font-medium text-sm transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
