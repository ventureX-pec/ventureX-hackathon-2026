"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarClock, LogIn, Menu as MenuIcon, X } from "lucide-react"

interface NavbarProps {
  onOpenReservation?: () => void
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolledToLight, setIsScrolledToLight] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the dark hero section (hero track is ~250vh)
      const heroThreshold = window.innerHeight * 1.5
      setIsScrolledToLight(window.scrollY > heroThreshold)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Featured Dishes", href: "#hero" },
    { label: "How It Works", href: "#how-it-works" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:navigating"))
    }
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleReserve = () => {
    setMobileMenuOpen(false)
    if (onOpenReservation) {
      onOpenReservation()
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:open-reservation"))
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolledToLight
          ? "bg-[#faf7f2]/95 backdrop-blur-md shadow-xs border-b border-[#e7dfd5]"
          : "bg-[#0f0e0d]/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#c96342] text-white flex items-center justify-center font-serif font-bold text-lg shadow-xs transition-transform group-hover:scale-105">
            SZ
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif font-medium text-lg tracking-tight transition-colors ${
                isScrolledToLight
                  ? "text-[#1c1917] group-hover:text-[#c96342]"
                  : "text-white group-hover:text-[#e07a5f]"
              }`}
            >
              ServeZa
            </span>
            <span
              className={`text-[10px] tracking-widest uppercase font-medium ${
                isScrolledToLight ? "text-[#78716c]" : "text-[#a8a29e]"
              }`}
            >
              Kitchen & Hearth
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#c96342] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200 ${
                isScrolledToLight
                  ? "text-[#44403c] hover:text-[#c96342]"
                  : "text-[#d6cbbe] hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button: Reserve / Contact */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              isScrolledToLight
                ? "text-[#44403c] hover:text-[#1c1917] hover:bg-[#f4ede4] border border-[#e7dfd5]"
                : "text-[#d6cbbe] hover:text-white hover:bg-white/10 border border-white/15"
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-[#c96342]" />
            <span>Sign In</span>
          </Link>

          <button
            onClick={handleReserve}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
          >
            <CalendarClock className="w-4 h-4" />
            <span>Reserve Table</span>
          </button>

          {/* Mobile Menu Toggle */}
          {navLinks.length > 0 && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isScrolledToLight
                  ? "bg-[#f4ede4] border border-[#e7dfd5] text-[#1c1917] hover:bg-[#eae2d7]"
                  : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-4 pb-6 space-y-3 ${
            isScrolledToLight
              ? "bg-[#faf7f2] border-[#e7dfd5] text-[#1c1917]"
              : "bg-[#0f0e0d] border-white/10 text-white"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-2 text-base font-medium hover:text-[#c96342] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full border border-[#e7dfd5] text-[#1c1917] bg-[#f4ede4] font-medium text-sm flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-[#c96342]" />
              <span>Sign In (Customer / Admin)</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                handleReserve()
              }}
              className="w-full py-3 rounded-full bg-[#c96342] text-white font-medium text-sm text-center"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
