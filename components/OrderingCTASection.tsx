"use client"

import React from "react"
import { useCart } from "@/context/CartContext"
import { ArrowRight, ShoppingBag, UtensilsCrossed, Clock, Sparkles } from "lucide-react"

export default function OrderingCTASection() {
  const { setIsCartOpen, totalItems } = useCart()

  const handleStartOrder = () => {
    if (totalItems > 0) {
      setIsCartOpen(true)
    } else {
      const menuEl = document.querySelector("#menu")
      if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-[#faf7f2] border-t border-[#e7dfd5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#1c1917] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xl">
          {/* Subtle warm background glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#c25e3e]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#d97706]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15 text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#e07a5f]" />
              <span>Direct Kitchen Access</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight leading-[1.15]">
              Good food. Less waiting.
              <br />
              <span className="italic font-light text-[#e07a5f]">More enjoying.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed max-w-lg">
              Explore our menu, customize your favourites and place your order with ease. Dine at your table or pick up in minutes without queuing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleStartOrder}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#c25e3e] hover:bg-[#a84d31] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Start Your Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#menu"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-sm transition-all shadow-xs"
              >
                Browse Today&apos;s Specials
              </a>
            </div>

            {/* Quick meta indicators */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e07a5f]" />
                <span>Average Prep: 8–12 mins</span>
              </div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-[#e07a5f]" />
                <span>Table QR Dine-In & Express Pickup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
