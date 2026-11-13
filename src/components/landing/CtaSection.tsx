"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, QrCode, ChefHat, Sparkles } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="relative rounded-3xl bg-[#252522] text-[#FAF8F3] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-elevated">
          
          {/* Subtle Warm Glow in Top Corner */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D66B43]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#FAF8F3] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#D66B43]" />
              <span>Simple, Zero-Commission Digital Hospitality</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Ready to Give Your Kitchen and Dining Room the Flow They Deserve?
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Set up your contactless QR menu, equip your kitchen with a live display system, 
              and take the chaos out of the lunch rush. Get started today in under ten minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/menu?table=4"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D66B43] text-white font-medium text-sm hover:bg-[#BF5832] transition-all shadow-card active:scale-98"
              >
                <QrCode className="w-4 h-4" />
                <span>Test Guest QR Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/kitchen"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-all active:scale-98"
              >
                <ChefHat className="w-4 h-4 text-[#D66B43]" />
                <span>Launch Live Kitchen Display</span>
              </Link>
            </div>

            {/* Reassurances */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7A65]" />
                <span>Zero platform commission</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7A65]" />
                <span>No proprietary hardware required</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7A65]" />
                <span>Direct UPI & counter settlement</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
