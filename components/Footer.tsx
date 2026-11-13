"use client"

import React, { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface FooterProps {
  onOpenReservation?: () => void
}

export default function Footer({ onOpenReservation }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:navigating"))
    }
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setSubscribed(true)
      setNewsletterEmail("")
    }
  }

  return (
    <footer className="bg-[#f4ede4] text-[#57534e] border-t border-[#e7dfd5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#e7dfd5]">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#c96342] text-white flex items-center justify-center font-serif font-bold text-base shadow-xs">
                CT
              </div>
              <div>
                <span className="font-serif text-lg font-medium text-[#1c1917] tracking-tight">
                  The Corner Table
                </span>
                <span className="block text-[10px] tracking-widest uppercase font-medium text-[#78716c]">
                  Kitchen & Hearth
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed max-w-sm mb-6 font-light">
              An independent neighborhood restaurant bringing thoughtful cooking together with a simple, personal way to enjoy hospitality.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#e7dfd5] hover:bg-[#c96342] text-[#57534e] hover:text-white flex items-center justify-center transition-colors"
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
                className="w-9 h-9 rounded-full bg-white border border-[#e7dfd5] hover:bg-[#c96342] text-[#57534e] hover:text-white flex items-center justify-center transition-colors"
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
                className="w-9 h-9 rounded-full bg-white border border-[#e7dfd5] hover:bg-[#c96342] text-[#57534e] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (No detailed menu) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#57534e]">
              <li>
                <a href="#hero" onClick={(e) => scrollTo(e, "#hero")} className="hover:text-[#c96342] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#story" onClick={(e) => scrollTo(e, "#story")} className="hover:text-[#c96342] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => scrollTo(e, "#how-it-works")} className="hover:text-[#c96342] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenReservation) onOpenReservation()
                    else if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("app:open-reservation"))
                  }}
                  className="hover:text-[#c96342] transition-colors cursor-pointer text-left"
                >
                  Table Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Dining */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-4">
              Service Hours
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#57534e]">
              <li>
                <span className="block font-medium text-[#1c1917]">Monday – Thursday</span>
                <span className="text-xs">11:30 AM – 10:00 PM</span>
              </li>
              <li>
                <span className="block font-medium text-[#1c1917]">Friday – Sunday</span>
                <span className="text-xs">11:00 AM – 11:00 PM</span>
              </li>
              <li className="pt-2 text-xs text-[#78716c]">
                Kitchen fires last order 30 mins prior to close.
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1917] mb-4">
              Seasonal Notes
            </h4>
            <p className="text-xs text-[#57534e] mb-3 leading-relaxed font-light">
              Receive updates on seasonal menu arrivals, chef tastings and hearth specials.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-medium text-[#2e7d32]">
                <CheckCircle2 className="w-4 h-4" />
                <span>You&apos;re on the list! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#c96342]"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#c96342] text-white flex items-center justify-center hover:bg-[#a84d31] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="block text-[10px] text-[#78716c]">
                  Zero spam. Unsubscribe at any time.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <p>© 2026 The Corner Table. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1c1917] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#1c1917] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#1c1917] cursor-pointer">Allergen Guide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
