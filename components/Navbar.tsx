"use client"

import React, { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { ShoppingBag, Search, Menu as MenuIcon, X, Clock, MapPin, Sparkles } from "lucide-react"

export default function Navbar() {
  const { totalItems, totalPrice, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#fbf9f5]/95 backdrop-blur-md shadow-sm border-b border-[#e7dfd5]"
          : "bg-[#fbf9f5]/80 backdrop-blur-sm border-b border-[#e7dfd5]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#c25e3e] text-white flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
            CT
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg tracking-tight text-[#1c1917] group-hover:text-[#c25e3e] transition-colors">
              The Corner Table
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-[#78716c]">
              Kitchen & Café · Est. 2021
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-[#44403c] hover:text-[#c25e3e] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#c25e3e] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Search + Order Now / Cart */}
        <div className="flex items-center gap-3">
          {/* Quick Search Shortcut */}
          <a
            href="#menu"
            onClick={(e) => handleNavClick(e, "#menu")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#57534e] hover:text-[#1c1917] hover:bg-[#f3ede4] transition-colors"
            title="Search Menu"
            aria-label="Search Menu"
          >
            <Search className="w-4 h-4" />
          </a>

          {/* Order Now / Cart Button */}
          <button
            onClick={() => {
              if (totalItems > 0) {
                setIsCartOpen(true)
              } else {
                const menuEl = document.querySelector("#menu")
                if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#c25e3e] hover:bg-[#a84d31] text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow active:scale-95"
            aria-label="Open Order Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">
              {totalItems > 0 ? "My Order" : "Order Now"}
            </span>
            {totalItems > 0 ? (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-white text-[#c25e3e] font-bold text-xs shadow-xs">
                {totalItems}
              </span>
            ) : (
              <span className="sm:hidden text-xs font-semibold">Order</span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#1c1917] hover:bg-[#f3ede4] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbf9f5] border-b border-[#e7dfd5] px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-[#292524] hover:text-[#c25e3e] py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-[#e7dfd5] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-[#78716c]">
                <Clock className="w-3.5 h-3.5 text-[#c25e3e]" />
                <span>Open Today: 8:00 AM – 10:30 PM (Kitchen Active)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#78716c]">
                <MapPin className="w-3.5 h-3.5 text-[#c25e3e]" />
                <span>142 University Boulevard, Corner Block</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
