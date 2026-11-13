"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, QrCode, ChefHat, MonitorCheck, Sparkles, Clock, CheckCircle2 } from "lucide-react";

export const MonoHero = () => {
  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-32 overflow-hidden bg-[#09090b]">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-white/[0.03] blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Pill */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 text-xs mono-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>VENTUREX 2026 • PS 1: RESTAURANT EMPOWERMENT</span>
          </div>
        </div>

        {/* Main Giant Headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-white leading-[1.08] sm:leading-[1.05]">
            Empower Local Food.
            <br />
            <span className="text-neutral-400">Zero Queues. Zero Cut.</span>
          </h1>

          {/* Subtitle / Editorial Manifesto */}
          <p className="mt-8 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
            A high-speed digital operating system engineered for corner cafes and family eateries. 
            Eliminating 15-minute counter bottlenecks, automating lunch rush pre-orders, and syncing 
            real-time kitchen tickets — without 30% aggregator commissions.
          </p>

          {/* Dual Pill Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu?table=4"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all active:scale-95 shadow-xl shadow-white/5"
            >
              <QrCode className="w-4 h-4 text-black" />
              <span>Experience Table QR Order</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/kitchen"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.05] border border-white/15 text-white font-semibold text-sm hover:bg-white/[0.1] hover:border-white/30 transition-all active:scale-95"
            >
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>Launch Kitchen Display (KDS)</span>
            </Link>
          </div>
        </div>

        {/* Architectural Showcase Visual Card (MONO Style) */}
        <div className="mt-16 sm:mt-24 max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/10 shadow-2xl overflow-hidden">
            <div className="rounded-[22px] bg-[#101012] p-6 sm:p-10 border border-white/5">
              
              {/* Card Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="mono-tag text-neutral-400 text-xs ml-2">
                    DINEFLOW ARCHITECTURE // LIVE KITCHEN SYNC
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="mono-tag text-emerald-400 font-bold">STATION ONLINE</span>
                  <span className="text-neutral-600">|</span>
                  <span>The Corner Café (Sector 4)</span>
                </div>
              </div>

              {/* Three Interactive Ticket Previews */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Ticket 1: Dine-in Table 4 */}
                <div className="rounded-2xl p-5 bg-[#18181b]/80 border border-white/10 hover:border-amber-500/40 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="mono-tag px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px]">
                      TABLE 04 • DINE-IN
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>4m ago</span>
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">#TK-41 • Aarav S.</h4>
                  <p className="text-xs text-neutral-400 mt-1">1x Crispy Paneer Makhani Bowl</p>
                  <p className="text-xs text-neutral-400">1x Iced Hazelnut Cold Coffee</p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400">₹320.25 (UPI)</span>
                    <span className="text-[10px] mono-tag px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                      PREPARING
                    </span>
                  </div>
                </div>

                {/* Ticket 2: Takeaway Pre-order */}
                <div className="rounded-2xl p-5 bg-[#18181b]/80 border border-white/10 hover:border-sky-500/40 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="mono-tag px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[10px]">
                      LUNCH PRE-ORDER • PICKUP
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-400" />
                      <span>1:20 PM Slot</span>
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">#TK-42 • Priya (Hostel 4)</h4>
                  <p className="text-xs text-neutral-400 mt-1">2x Veg Crunch Burger Combo</p>
                  <p className="text-xs text-neutral-400">1x Loaded Truffle Fries</p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-sky-400">₹554.40 (Paid)</span>
                    <span className="text-[10px] mono-tag px-2 py-0.5 rounded bg-sky-400/20 text-sky-300">
                      QUEUED
                    </span>
                  </div>
                </div>

                {/* Ticket 3: Ready for Table 7 */}
                <div className="rounded-2xl p-5 bg-[#18181b]/80 border border-white/10 hover:border-emerald-500/40 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="mono-tag px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
                      TABLE 07 • DINE-IN
                    </span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Ready</span>
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">#TK-40 • Rohan & Kabir</h4>
                  <p className="text-xs text-neutral-400 mt-1">2x Peri-Peri Chicken Burger</p>
                  <p className="text-xs text-neutral-400">2x Mint Mojito Fizz</p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400">₹546.00</span>
                    <span className="text-[10px] mono-tag px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300">
                      SERVED
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Launch Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Real-time bidirectional synchronization between Guest, Kitchen & Cashier</span>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/pos"
                    className="text-xs mono-tag text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>COUNTER POS</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                  <span className="text-neutral-700">•</span>
                  <Link
                    href="/admin"
                    className="text-xs mono-tag text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>OWNER HUB & AI</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
