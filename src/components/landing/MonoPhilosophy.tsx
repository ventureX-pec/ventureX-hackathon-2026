"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, AlertCircle, CheckCircle2, TrendingUp, DollarSign, Clock, PhoneCall } from "lucide-react";

export const MonoPhilosophy = () => {
  return (
    <section id="philosophy" className="py-24 border-t border-white/10 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow & Headline */}
        <div className="max-w-3xl">
          <span className="mono-tag text-neutral-400">[ 04 // THE CASE STUDY PHILOSOPHY ]</span>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-3 leading-tight">
            Great Food. Fair Prices.
            <br />
            <span className="text-neutral-400">Crippled by the Ordering Experience.</span>
          </h2>
          <p className="mt-6 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Consider the family-owned Corner Café in a bustling college neighborhood. Five years of loyal 
            student and worker patrons began slipping away during peak hours—not because the recipe changed, 
            but because a single counter took 15 minutes to take an order, phones rang continuously, 
            and lunch breaks ran out before food arrived.
          </p>
        </div>

        {/* Side-by-Side Architectural Contrast (Before vs DineFlow) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Box 1: The Failing Model (Red/Dark) */}
          <div className="rounded-3xl p-8 sm:p-10 bg-[#121214] border border-rose-500/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <span className="mono-tag text-rose-400 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                01 // THE STRUGGLING CORNER CAFÉ (BEFORE)
              </span>
              <AlertCircle className="w-5 h-5 text-rose-400" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">10–15 Minute Counter Line</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Single physical counter bottleneck. Students with short lunch breaks walk away.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Staff Distracted by Phone Calls</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Kitchen staff answering repeated queries about item prices and takeaway readiness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <DollarSign className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Exorbitant 30% Platform Cuts</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Delivery aggregator commissions bleed family profit margins dry.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-rose-500/10">
              <p className="text-xs text-rose-300 font-mono">
                OUTCOME: Declining revenue, customer frustration, burnt-out counter staff.
              </p>
            </div>
          </div>

          {/* Box 2: The DineFlow Operating System (Emerald/Gold) */}
          <div className="rounded-3xl p-8 sm:p-10 bg-[#121214] border border-emerald-500/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <span className="mono-tag text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                02 // DINEFLOW DIGITAL EMPOWERMENT (AFTER)
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Table QR & Scheduled Pre-Orders</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Zero counter line. Guests order at table or schedule pickup from the campus library.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Live Kitchen Display System (KDS)</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Digital cooking tickets with countdown timers. Zero misplaced slips or mixups.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">0% Commission, 100% Direct Profit</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Instant UPI QR scan to owner's bank account or pay-at-counter. No middlemen.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/10 flex items-center justify-between">
              <p className="text-xs text-emerald-300 font-mono">
                OUTCOME: 3.4x peak lunch capacity, happy students, thriving local business.
              </p>
              <Link
                href="/menu?table=4"
                className="mono-tag text-xs text-white hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <span>TEST IT NOW</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
