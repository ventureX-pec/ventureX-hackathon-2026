"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Clock, ChefHat, QrCode, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 overflow-hidden bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            {/* Subtle Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF1ED] border border-[#D5E1D8] text-[#5F7A65] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#5F7A65]" />
              <span>Independent Restaurant & Café Operating System</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#252522] leading-[1.12]">
              Your Restaurant Deserves a Smarter Way to Run.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#6E6D66] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              From QR-based ordering to kitchen management, manage your restaurant operations from one simple platform.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D66B43] text-white text-base font-medium hover:bg-[#BF5832] transition-all shadow-card hover:shadow-elevated active:scale-98"
              >
                <span>Explore DineFlow</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#ECE7DE] text-[#252522] text-base font-medium hover:bg-[#F7F4EE] hover:border-[#DDD8CE] transition-all shadow-soft active:scale-98"
              >
                <Play className="w-4 h-4 text-[#D66B43] fill-[#D66B43]" />
                <span>See How It Works</span>
              </a>
            </div>

            {/* Key Value Propositions */}
            <div className="pt-6 border-t border-[#ECE7DE] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs text-[#6E6D66] font-medium">Ordering</p>
                <p className="text-sm font-semibold text-[#252522] mt-0.5">Contactless QR</p>
              </div>
              <div>
                <p className="text-xs text-[#6E6D66] font-medium">Kitchen Display</p>
                <p className="text-sm font-semibold text-[#252522] mt-0.5">Real-Time KDS</p>
              </div>
              <div>
                <p className="text-xs text-[#6E6D66] font-medium">Commissions</p>
                <p className="text-sm font-semibold text-[#252522] mt-0.5">Zero Percent</p>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md sm:max-w-xl lg:max-w-none">
              
              {/* Main Background Image Card (Atmospheric Café) */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-[#ECE7DE] aspect-4/3 sm:aspect-16/11 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                  alt="Cozy modern independent café interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                
                {/* Café Identity Tag */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs text-white/80 font-medium">Live Partner Location</p>
                    <p className="text-base font-semibold">The Corner Café & Bakery</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium border border-white/30">
                    14 Tables Connected
                  </span>
                </div>
              </div>

              {/* Floating Realistic Restaurant Dashboard Card (Left Overlap) */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 sm:-bottom-10 w-[88%] sm:w-[320px] rounded-2xl bg-white p-4 sm:p-5 shadow-elevated border border-[#ECE7DE]">
                <div className="flex items-center justify-between pb-3 border-b border-[#F3EFE8]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5F7A65] animate-pulse" />
                    <span className="text-xs font-semibold text-[#252522]">Active Order Flow</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#D66B43] bg-[#FAF2EE] px-2 py-0.5 rounded-md">
                    Kitchen Sync
                  </span>
                </div>

                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-[#252522]">Table 4 • Dine-in</p>
                      <p className="text-[11px] text-[#6E6D66]">2 items • Paneer Bowl, Cold Brew</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EBF1ED] text-[#5F7A65]">
                      Preparing (6m)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F7F4EE]">
                    <div>
                      <p className="font-semibold text-[#252522]">Takeaway #42 • Pickup 1:15 PM</p>
                      <p className="text-[11px] text-[#6E6D66]">Lunch Combo • Packed</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FAF2EE] text-[#D66B43]">
                      Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Metric Card (Top Right Overlap) */}
              <div className="hidden sm:flex absolute -top-6 -right-6 rounded-2xl bg-white p-4 shadow-elevated border border-[#ECE7DE] items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF2EE] flex items-center justify-center text-[#D66B43]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#6E6D66]">Average Order Time</p>
                  <p className="text-base font-bold text-[#252522]">8.4 mins <span className="text-xs font-normal text-[#5F7A65]">(-65%)</span></p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
