"use client"

import React, { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { ShoppingBag, Search, Menu as MenuIcon, X } from "lucide-react"

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart()
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
    { label: "Our Story", href: "#story" },
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

  const handleOrderNow = () => {
    const menuEl = document.querySelector("#menu")
    if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#faf7f2]/95 backdrop-blur-md shadow-xs border-b border-[#e7dfd5]"
          : "bg-[#faf7f2]/85 backdrop-blur-sm border-b border-[#e7dfd5]/60"
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
            CT
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-medium text-lg tracking-tight text-[#1c1917] group-hover:text-[#c96342] transition-colors">
              The Corner Table
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-[#78716c]">
              Kitchen & Hearth
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
              className="text-sm font-medium text-[#44403c] hover:text-[#c96342] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#c96342] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
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
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#57534e] hover:text-[#1c1917] hover:bg-[#f4ede4] transition-colors"
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
                handleOrderNow()
              }
            }}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Now</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#c96342] text-[11px] font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-[#f4ede4] border border-[#e7dfd5] flex items-center justify-center text-[#1c1917] hover:bg-[#eae2d7] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e7dfd5] bg-[#faf7f2] px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-2 text-base font-medium text-[#1c1917] hover:text-[#c96342] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#e7dfd5]">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                handleOrderNow()
              }}
              className="w-full py-3 rounded-full bg-[#c96342] text-white font-medium text-sm text-center"
            >
              Explore Full Menu & Order
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
