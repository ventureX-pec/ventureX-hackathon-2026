"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ChevronDown,
  Search,
  ShoppingBag,
  Bell,
  UtensilsCrossed,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  cartTotal,
  onOpenCart,
  isSidebarOpen = true,
  onToggleSidebar,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("Main Food Court, Block A");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const locations = [
    "Main Food Court, Block A",
    "Academic Block B • Table #12",
    "Library Courtyard • Kiosk",
    "Sports Complex • Stall 04",
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F3]/60 backdrop-blur-md border-b border-[#ECE7DE]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left on Mobile: Logo; Left on Desktop: Sidebar Toggle & Location */}
          <div className="flex items-center gap-3">
            {/* Desktop Sidebar Toggle Button */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-[#ECE7DE] text-[#252522] hover:text-[#D66B43] hover:border-[#D66B43]/40 shadow-xs transition-colors"
                title={isSidebarOpen ? "Collapse Sidebar" : "Open Sidebar"}
                aria-label={isSidebarOpen ? "Collapse Sidebar" : "Open Sidebar"}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose className="w-4 h-4" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4 text-[#D66B43]" />
                )}
              </button>
            )}

            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden flex items-center gap-2">
              <img
                src="/logo.png"
                alt="ServeZa Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="font-serif text-lg font-bold text-[#252522]">
                Serve<span className="text-[#D66B43]">Za</span>
              </span>
            </Link>

            {/* Location Selector (matches reference "📍 New York, USA v") */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#252522] hover:text-[#D66B43] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D66B43]" />
                <span className="max-w-[170px] truncate">{selectedLocation}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6E6D66]" />
              </button>

              {isLocationOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-[#ECE7DE] shadow-card p-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#6E6D66] uppercase tracking-wider">
                    Choose Delivery / Table Spot
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
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#6E6D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for food, restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-full bg-white border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43] shadow-xs transition-all"
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

          {/* Right: Cart, Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Cart Icon with Orange Badge */}
            <button
              onClick={onOpenCart}
              className="relative w-9 h-9 rounded-full bg-white border border-[#ECE7DE] flex items-center justify-center text-[#252522] hover:border-[#D66B43] hover:text-[#D66B43] shadow-xs transition-all"
              title="Open Plate Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D66B43] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <button
              className="relative w-9 h-9 rounded-full bg-white border border-[#ECE7DE] flex items-center justify-center text-[#252522] hover:border-[#D66B43] shadow-xs transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#D66B43]" />
            </button>

            {/* User Profile Pill */}
            <Link
              href="/login"
              title="Signed in as Aarav • Click to switch or sign out"
              className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#ECE7DE] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#ECE7DE]">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Aarav Sharma"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className="text-xs font-bold text-[#252522]">
                Aarav Sharma
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#6E6D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for food, restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-full bg-white border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43] shadow-xs"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
