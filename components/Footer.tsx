"use client"

import React from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer id="contact" className="bg-[#1c1917] text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#c25e3e] text-white flex items-center justify-center font-bold text-base shadow-sm">
                CT
              </div>
              <div>
                <span className="font-serif text-lg font-medium text-white tracking-tight">
                  The Corner Table
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-stone-400">
                  Kitchen & Café · Est. 2021
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm mb-6">
              A cozy, independent neighborhood restaurant bringing slow scratch cooking together with fast, seamless digital ordering.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#c25e3e] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#c25e3e] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-[#c25e3e] text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#hero" onClick={(e) => scrollTo(e, "#hero")} className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => scrollTo(e, "#menu")} className="hover:text-white transition-colors">
                  Our Menu
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, "#about")} className="hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => scrollTo(e, "#how-it-works")} className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, "#contact")} className="hover:text-white transition-colors">
                  Contact & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Menu Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Menu Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#menu" onClick={(e) => scrollTo(e, "#menu")} className="hover:text-white transition-colors">
                  Chef&apos;s Specials
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => scrollTo(e, "#menu")} className="hover:text-white transition-colors">
                  Main Course
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => scrollTo(e, "#menu")} className="hover:text-white transition-colors">
                  Starters & Plates
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => scrollTo(e, "#menu")} className="hover:text-white transition-colors">
                  Artisanal Desserts
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => scrollTo(e, "#menu")} className="hover:text-white transition-colors">
                  Signature Beverages
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Opening Hours */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Hours & Location
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#e07a5f] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-stone-200">Mon – Fri</span>
                  <span className="text-xs text-stone-400">8:00 AM – 10:30 PM</span>
                  <span className="block font-medium text-stone-200 mt-1">Sat – Sun</span>
                  <span className="text-xs text-stone-400">8:30 AM – 11:30 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <MapPin className="w-4 h-4 text-[#e07a5f] shrink-0 mt-0.5" />
                <span className="text-xs">
                  142 University Boulevard, Corner Block, Sector 4
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e07a5f] shrink-0" />
                <span className="text-xs">+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e07a5f] shrink-0" />
                <span className="text-xs">hello@thecornertable.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 The Corner Table Kitchen. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built for VentureX Hackathon 2026</span>
            <span className="w-1 h-1 rounded-full bg-stone-700" />
            <span>Digital Empowerment for Local Restaurants</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
