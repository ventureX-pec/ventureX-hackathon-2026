"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Search,
  ShoppingBag,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  UtensilsCrossed,
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
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const locations = [
    "Main Food Court • Ground Floor",
    "Academic Block A • Table #14",
    "Library Courtyard • Kiosk",
    "Sports Arena • Counter B",
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left: Brand & Back to Home */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 p-2 -ml-2 rounded-xl text-[#6E6D66] hover:text-[#252522] hover:bg-[#F3EFE8] transition-all"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </Link>

            <Link href="/customer" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#252522] flex items-center justify-center text-[#FAF8F3] shadow-soft">
                <UtensilsCrossed className="w-5 h-5 text-[#D66B43]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl font-bold tracking-tight text-[#252522]">
                    DINEFLOW
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#D66B43]/10 text-[#D66B43] border border-[#D66B43]/20">
                    Live Menu
                  </span>
                </div>
                <span className="text-[11px] text-[#6E6D66] hidden sm:block">
                  Order Ahead • Zero Queue Dining
                </span>
              </div>
            </Link>
          </div>

          {/* Middle: Location Selector & Search */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-4">
            {/* Location dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#ECE7DE] text-xs font-medium text-[#252522] hover:border-[#D66B43]/40 transition-colors shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D66B43]" />
                <span className="max-w-[140px] truncate">{selectedLocation}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6E6D66]" />
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-[#FFFFFF] border border-[#ECE7DE] shadow-card p-1.5 z-50">
                  <div className="px-2.5 py-1.5 text-[11px] font-semibold text-[#6E6D66] uppercase tracking-wider">
                    Select Dining Location
                  </div>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedLocation === loc
                          ? "bg-[#D66B43]/10 text-[#D66B43] font-semibold"
                          : "text-[#252522] hover:bg-[#F3EFE8]"
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

            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6E6D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dishes, bowls, or cafes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43] focus:ring-1 focus:ring-[#D66B43] transition-all shadow-sm"
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

          {/* Right: Active Order Pill & Cart CTA */}
          <div className="flex items-center gap-2.5">
            {activeOrderToken && onOpenActiveOrder && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenActiveOrder}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#5F7A65]/10 border border-[#5F7A65]/30 text-xs font-semibold text-[#5F7A65] shadow-sm hover:bg-[#5F7A65]/20 transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F7A65] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5F7A65]"></span>
                </span>
                <span className="hidden sm:inline">Active:</span>
                <span>Token #{activeOrderToken}</span>
              </motion.button>
            )}

            {/* Cart Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#D66B43] text-[#FAF8F3] font-medium text-xs shadow-soft hover:bg-[#BF5832] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-semibold">
                {totalCartItems > 0 ? `₹${cartTotalAmount}` : "Cart"}
              </span>

              {totalCartItems > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FAF8F3] text-[#D66B43] text-[11px] font-bold shadow-sm">
                  {totalCartItems}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6E6D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, pizza, coffee..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43]"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
