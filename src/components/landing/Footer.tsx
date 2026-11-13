"use client";

import React from "react";
import Link from "next/link";
import { Utensils, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#FAF8F3] border-t border-[#ECE7DE] text-[#6E6D66] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#ECE7DE]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-[#252522] flex items-center justify-center text-[#FAF8F3]">
                <Utensils className="w-4 h-4 text-[#D66B43]" />
              </div>
              <div className="flex items-baseline">
                <span className="font-semibold text-base text-[#252522]">DineFlow</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D66B43] ml-0.5" />
              </div>
            </Link>

            <p className="text-xs text-[#6E6D66] leading-relaxed max-w-sm">
              The modern restaurant management platform designed specifically for independent cafes, 
              local diners, and family-owned eateries. Zero commissions. Simple operations.
            </p>

            <div className="space-y-1.5 text-xs text-[#6E6D66]">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D66B43]" />
                <span>support@dineflow.hospitality</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D66B43]" />
                <span>+91 98765 43210 (Mon–Sun, 8 AM–11 PM)</span>
              </p>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <p className="text-xs font-semibold text-[#252522] uppercase tracking-wider mb-4">
              Platform
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/menu?table=4" className="hover:text-[#252522] transition-colors">
                  Contactless QR Menu
                </Link>
              </li>
              <li>
                <Link href="/kitchen" className="hover:text-[#252522] transition-colors">
                  Kitchen Display System
                </Link>
              </li>
              <li>
                <Link href="/pos" className="hover:text-[#252522] transition-colors">
                  Counter POS Terminal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#252522] transition-colors">
                  Restaurant Dashboard
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#252522] transition-colors">
                  Lunch Pre-Order Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Resources */}
          <div>
            <p className="text-xs font-semibold text-[#252522] uppercase tracking-wider mb-4">
              Hospitality
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#how-it-works" className="hover:text-[#252522] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#problem" className="hover:text-[#252522] transition-colors">
                  The Corner Café Story
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#252522] transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#252522] transition-colors">
                  Setup FAQ
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#252522] transition-colors">
                  Table QR Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-[#252522] uppercase tracking-wider mb-4">
              Company
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-[#252522] font-medium">Built for VentureX 2026</span>
              </li>
              <li>
                <span>Problem Statement 1: Local Restaurants</span>
              </li>
              <li>
                <span>Zero Commission Guarantee</span>
              </li>
              <li>
                <span>Privacy & Data Ownership</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E6D66] gap-4">
          <p>© 2026 DineFlow Platform. Empowering independent hospitality.</p>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-[#252522] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#252522] transition-colors">
              Pricing
            </a>
            <Link href="/menu" className="hover:text-[#252522] transition-colors">
              Launch Demo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
