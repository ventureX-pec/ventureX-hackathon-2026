"use client"

import React from "react"
import { Quote, Heart, Users, Sparkles } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#fbf9f5] border-t border-[#e7dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#e7dfd5] shadow-md aspect-[4/5] max-h-[560px] w-full bg-[#f3ede4]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80"
                alt="Chefs in The Corner Table kitchen"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-[#1c1917]">
                <Quote className="w-5 h-5 text-[#c25e3e] mb-2" />
                <p className="text-xs sm:text-sm font-serif italic text-[#292524] leading-relaxed">
                  &ldquo;A great neighborhood café is not defined by complicated tablecloths, but by food that makes you feel taken care of.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#78716c]">
                  <span>Chef Marcus & Elena Vance</span>
                  <span className="text-[#c25e3e]">Co-Founders</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative stamp */}
            <div className="hidden sm:flex absolute -top-5 -left-5 w-24 h-24 rounded-full bg-[#c25e3e] text-white flex-col items-center justify-center text-center p-2 shadow-md rotate-[-8deg] pointer-events-none">
              <span className="text-[10px] uppercase font-bold tracking-widest">Est.</span>
              <span className="text-base font-serif font-bold">2021</span>
              <span className="text-[9px] text-white/80">Neighborhood</span>
            </div>
          </div>

          {/* Right: Story & Philosophy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3ede4] border border-[#e7dfd5] text-xs font-semibold text-[#c25e3e] uppercase tracking-wider mb-4">
              <Heart className="w-3.5 h-3.5 text-[#c25e3e]" />
              <span>Our Story & Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight leading-[1.15]">
              Built on Honest Flavor and Warm Hospitality
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#57534e] leading-relaxed">
              <p>
                The Corner Table opened its doors on University Boulevard five years ago as a humble, family-run corner café. In a bustling neighborhood full of students on short lunch breaks and residents looking for a tranquil evening meal, we set out to prove that fast service doesn&apos;t require compromising on culinary care.
              </p>
              <p>
                Every morning at 6:30 AM, our bakers fire up the hearth for fresh sourdough loaves, and our sauce pans begin simmering heirloom tomatoes with garlic and rosemary. We source our produce locally, buy our grains unbleached, and keep our ingredient lists clean and pronounceable.
              </p>
              <p>
                When rush hour queues started stretching out the door, we refused to become an impersonal factory. Instead, we built direct digital ordering so our guests could order from their phones without standing in 15-minute lines—leaving our team free to focus on what matters: great cooking and welcoming every face that walks through the door.
              </p>
            </div>

            {/* Micro Stats */}
            <div className="mt-8 pt-6 border-t border-[#e7dfd5] grid grid-cols-3 gap-4">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#1c1917]">5+</span>
                <span className="text-xs text-[#78716c]">Years Serving Neighborhood</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#1c1917]">100%</span>
                <span className="text-xs text-[#78716c]">Made From Scratch</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-normal text-[#1c1917]">0%</span>
                <span className="text-xs text-[#78716c]">Aggregator Commissions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
