"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Utensils, Menu, X, ArrowRight } from "lucide-react";

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
    { label: "Home", href: "#" },
    { label: "Curated Dishes", href: "#showcase" },
    { label: "Get Started", href: "#cta" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#ECE7DE] shadow-xs"
            : "bg-[#FAF8F3] border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#252522] flex items-center justify-center text-[#FAF8F3] shadow-xs transition-transform duration-200 group-hover:scale-105">
                <Utensils className="w-5 h-5 text-[#D66B43]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="font-bold text-xl tracking-tight text-[#252522]">
                    DINEFLOW
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D66B43] ml-1" />
                </div>
                <span className="text-[10px] text-[#6E6D66] font-medium tracking-wide -mt-0.5 hidden sm:block">
                  Less Waiting. More Enjoying.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#6E6D66] hover:text-[#252522] transition-colors relative py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.a
                href="#cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D66B43] text-white text-sm font-medium hover:bg-[#BF5832] transition-colors shadow-soft"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#252522] hover:bg-[#EFECE6] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-[#FAF8F3] border-b border-[#ECE7DE] px-6 py-6 shadow-xl md:hidden"
          >
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
              <a
                href="#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-medium rounded-xl bg-[#D66B43] text-white shadow-soft"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
