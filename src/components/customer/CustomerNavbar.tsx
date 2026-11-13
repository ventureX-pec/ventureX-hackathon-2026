"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Search,
  ShoppingBag,
  MapPin,
  ChevronDown,
  UtensilsCrossed,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface CustomerNavbarProps {
  totalCartItems: number;
  cartTotalAmount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeOrderToken?: string | null;
  onOpenActiveOrder?: () => void;
}

export const CustomerNavbar: React.FC<CustomerNavbarProps> = ({
  totalCartItems,
  cartTotalAmount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  activeOrderToken,
  onOpenActiveOrder,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("Main Food Court • Ground Floor");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locations = [
    "Main Food Court • Ground Floor",
    "Academic Block A • Table #14",
    "Library Courtyard • Kiosk B",
    "Sports Arena • Counter C",
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center justify-center w-9 h-9 rounded-xl border border-[#ECE7DE] bg-white text-[#6E6D66] hover:text-[#252522] hover:border-[#D66B43]/40 transition-all shadow-xs"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </Link>

            <Link href="/customer" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#252522] flex items-center justify-center text-[#FAF8F3] shadow-xs">
                <UtensilsCrossed className="w-5 h-5 text-[#D66B43]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl font-bold tracking-tight text-[#252522]">
                    DINEFLOW
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#D66B43]/10 text-[#D66B43] border border-[#D66B43]/20">
                    Customer Hub
                  </span>
                </div>
                <span className="text-[11px] text-[#6E6D66] hidden sm:block">
                  Live Campus Kitchen Windows
                </span>
              </div>
            </Link>
          </div>

          {/* Middle: Location Dropdown & Search Bar */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-4">
            {/* Location selector */}
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#ECE7DE] text-xs font-medium text-[#252522] hover:border-[#D66B43]/40 transition-all shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D66B43]" />
                <span className="max-w-[130px] truncate">{selectedLocation}</span>
                <ChevronDown className="w-3 h-3 text-[#6E6D66]" />
              </button>

              {isLocationOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 rounded-2xl bg-white border border-[#ECE7DE] shadow-card p-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#6E6D66] uppercase tracking-wider">
                    Select Campus Location
                  </div>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                        selectedLocation === loc
                          ? "bg-[#D66B43]/10 text-[#D66B43] font-semibold"
                          : "text-[#252522] hover:bg-[#FAF8F3]"
                      }`}
                    >
                      <span>{loc}</span>
                      {selectedLocation === loc && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D66B43]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Editorial Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6E6D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sourdough pizza, cold brew, biryani..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43] transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6E6D66] hover:text-[#252522]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right: Active Order Pill & Plate CTA */}
          <div className="flex items-center gap-3">
            {activeOrderToken && onOpenActiveOrder && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenActiveOrder}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5F7A65]/10 border border-[#5F7A65]/30 text-xs font-semibold text-[#5F7A65] shadow-xs hover:bg-[#5F7A65]/20 transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F7A65] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5F7A65]"></span>
                </span>
                <span>Pass #{activeOrderToken}</span>
              </motion.button>
            )}

            {/* Cart Trigger */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#D66B43] text-[#FAF8F3] font-semibold text-xs shadow-soft hover:bg-[#BF5832] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{totalCartItems > 0 ? `₹${cartTotalAmount}` : "Plate"}</span>

              {totalCartItems > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#D66B43] text-[11px] font-bold shadow-xs">
                  {totalCartItems}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search Field */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6E6D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, pizza, coffee..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43]"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
