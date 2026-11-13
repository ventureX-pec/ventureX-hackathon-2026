"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

export const MonoNavbar = () => {
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
    { label: "Philosophy", href: "#philosophy" },
    { label: "Models", href: "#models" },
    { label: "Metrics", href: "#metrics" },
    { label: "Case Study", href: "#case-study" },
    { label: "Live Preview", href: "#interactive-demo" },
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl transition-all duration-300">
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#121214]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80"
              : "bg-[#121214]/70 backdrop-blur-md border border-white/10"
          }`}
        >
          {/* Logo & System Indicator */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              DINEFLOW
            </span>
            <span className="mono-tag text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 group-hover:border-white/20 transition-colors">
              SYS//01
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/menu"
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all active:scale-95 shadow-sm"
            >
              <span>Launch App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-[#121214] border border-white/10 shadow-2xl backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="mono-tag text-neutral-500 mb-4">[ NAVIGATION // SYSTEM ]</div>
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Launch Customer Menu (QR)
            </Link>
            <Link
              href="/kitchen"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              Open Kitchen KDS
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
