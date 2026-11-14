"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

interface LegalPageLayoutProps {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  badge,
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#252522] selection:bg-[#c96342]/20 selection:text-[#c96342] flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#c96342] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="ServeZa Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-serif font-bold text-base tracking-tight text-[#1c1917]">
              Serve<span className="text-[#c96342]">Za</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Hero Header */}
      <div className="border-b border-[#E7DFD5] bg-[#F4EDE4]/60 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#c96342] bg-[#c96342]/10 border border-[#c96342]/20 mb-4">
            {badge}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1917] tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
          <div className="mt-4 pt-4 border-t border-[#E7DFD5]/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#78716C]">
            <span><strong>Last updated:</strong> {lastUpdated}</span>
            <span>•</span>
            <span><strong>Location:</strong> Bengaluru, Karnataka, India</span>
            <span>•</span>
            <span><strong>FSSAI Lic. No.:</strong> 11224333000521</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-[#E7DFD5] p-6 sm:p-10 lg:p-12 shadow-xs space-y-10 prose prose-stone max-w-none text-[#252522]">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
