"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const MonoFooter = () => {
  return (
    <footer className="py-16 border-t border-white/10 bg-[#070709] text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white">DINEFLOW</span>
              <span className="mono-tag text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                SYS//v1.0
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              Zero-commission digital operating system empowering local cafes & family-run eateries. 
              Eliminating peak-hour counter queues with instant QR dine-in and scheduled rush pickups.
            </p>
            <p className="mono-tag text-[10px] text-amber-500">
              VENTUREX HACKATHON 2026 • PROBLEM STATEMENT 1
            </p>
          </div>

          <div>
            <p className="mono-tag text-white text-xs mb-3">SYSTEM SURFACES</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/menu?table=4" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Guest QR Menu</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/kitchen" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Kitchen KDS Display</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/pos" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Cashier Counter POS</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Owner Command Hub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mono-tag text-white text-xs mb-3">CASE STUDY SPEC</p>
            <ul className="space-y-2 text-xs">
              <li>Corner Café (Sector 4)</li>
              <li>14 Diners • 30m Lunch Break</li>
              <li>Direct UPI QR Settlement</li>
              <li>Zero Platform Commission</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
          <p className="mono-tag text-[10px]">
            © 2026 DINEFLOW ARCHITECTURE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-1 text-neutral-500 text-xs">
            <span>Built with precision for VentureX 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
