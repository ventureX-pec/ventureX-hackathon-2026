"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Utensils } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Product", href: "#product-showcase" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#ECE7DE] shadow-xs"
            : "bg-[#FAF8F3] border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#252522] flex items-center justify-center text-[#FAF8F3] shadow-xs transition-transform group-hover:scale-105">
                <Utensils className="w-4 h-4 text-[#D66B43]" />
              </div>
              <div className="flex items-baseline">
                <span className="font-semibold text-lg tracking-tight text-[#252522]">
                  DineFlow
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D66B43] ml-0.5" />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#6E6D66] hover:text-[#252522] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/menu"
                className="text-sm font-medium text-[#252522] hover:text-[#D66B43] transition-colors px-2"
              >
                Guest View
              </Link>
              <Link
                href="/kitchen"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#252522] text-[#FAF8F3] text-sm font-medium hover:bg-[#383834] transition-all shadow-xs active:scale-98"
              >
                <span>Live Kitchen</span>
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D66B43] text-white text-sm font-medium hover:bg-[#BF5832] transition-all shadow-xs active:scale-98"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#252522] hover:bg-[#EFECE6] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-18 z-40 bg-[#FAF8F3] border-b border-[#ECE7DE] px-6 py-6 shadow-xl md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#252522] hover:text-[#D66B43] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 mt-6 border-t border-[#ECE7DE] flex flex-col gap-3">
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium rounded-xl border border-[#ECE7DE] bg-white text-[#252522]"
            >
              Open Guest QR Menu
            </Link>
            <Link
              href="/kitchen"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium rounded-xl bg-[#252522] text-[#FAF8F3]"
            >
              Open Kitchen Display (KDS)
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium rounded-xl bg-[#D66B43] text-white"
            >
              Open Restaurant Dashboard
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
