"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ChevronDown,
  Search,
  Bell,
  PanelLeftOpen,
  PanelLeftClose,
  ShoppingBag,
  ExternalLink,
  ChefHat,
  SlidersHorizontal,
} from "lucide-react";

interface AdminTopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  activeOrdersCount?: number;
  onOpenKitchen?: () => void;
}

export const AdminTopHeader: React.FC<AdminTopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  isSidebarOpen = true,
  onToggleSidebar,
  activeOrdersCount = 24,
  onOpenKitchen,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("Main Food Court, Block A");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const locations = [
    "Main Food Court, Block A",
    "Academic Block B • Kiosk Stall",
    "Library Courtyard • Café Stall",
    "Sports Complex • Stall 04",
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F3]/80 backdrop-blur-md border-b border-[#ECE5DA]/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Sidebar Toggle & Location Selector */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-[#ECE5DA] text-[#252522] hover:text-[#D66B43] hover:border-[#D66B43]/40 shadow-xs transition-colors"
                title={isSidebarOpen ? "Collapse Sidebar" : "Open Sidebar"}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose className="w-4 h-4" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4 text-[#D66B43]" />
                )}
              </button>
            )}

            {/* Location Selector (matches reference "📍 Main Food Court, Block A v") */}
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#252522] hover:text-[#D66B43] transition-colors bg-white/60 px-3 py-1.5 rounded-xl border border-[#EDE5DA]/80"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D66B43]" />
                <span className="max-w-[170px] truncate">{selectedLocation}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7A756D]" />
              </button>

              {isLocationOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-[#ECE5DA] shadow-[0_15px_30px_rgba(37,37,34,0.08)] p-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C877D] uppercase tracking-wider">
                    Select Kitchen Outlet
                  </div>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedLocation === loc
                          ? "bg-[#D66B43]/10 text-[#D66B43] font-semibold"
                          : "text-[#252522] hover:bg-[#F2ECE2]"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Search Bar (Rounded-full pill matching reference) */}
          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C877D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search orders, menu items, ingredients..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#EDE5DA] text-xs text-[#252522] placeholder:text-[#8C877D] shadow-[0_2px_8px_rgba(37,37,34,0.02)] focus:outline-none focus:border-[#D66B43] focus:ring-2 focus:ring-[#D66B43]/15 transition-all"
              />
            </div>
          </div>

          {/* Right: Actions, Notifications & Admin Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Kitchen Display Shortcut */}
            {onOpenKitchen && (
              <button
                onClick={onOpenKitchen}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDE5DA] text-xs font-medium text-[#252522] hover:border-[#D66B43]/40 shadow-xs transition-colors"
                title="Open KDS Screen"
              >
                <ChefHat className="w-3.5 h-3.5 text-[#D66B43]" />
                <span>KDS Live</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}

            {/* Notification Bell */}
            <button
              className="relative p-2 rounded-full bg-white border border-[#EDE5DA] text-[#252522] hover:text-[#D66B43] hover:border-[#D66B43]/40 shadow-xs transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D66B43] text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
            </button>

            {/* Customer Portal Link Pill */}
            <Link
              href="/customer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D66B43]/10 border border-[#D66B43]/20 text-[#D66B43] text-xs font-semibold hover:bg-[#D66B43]/15 transition-colors"
              title="View Customer Facing Storefront"
            >
              <span>Customer Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-white border border-[#EDE5DA] hover:border-[#D66B43]/40 shadow-xs transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D66B43] to-[#F4A261] text-white text-[11px] font-bold flex items-center justify-center">
                  AS
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-[#252522] leading-none">Aarav Sharma</div>
                  <div className="text-[10px] text-[#8C877D] leading-none mt-0.5">Admin</div>
                </div>
                <ChevronDown className="w-3 h-3 text-[#8C877D]" />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-white border border-[#ECE5DA] shadow-[0_15px_30px_rgba(37,37,34,0.08)] p-1.5 z-50">
                  <div className="px-3 py-2 border-b border-[#F2ECE2]">
                    <div className="text-xs font-bold text-[#252522]">Aarav Sharma</div>
                    <div className="text-[11px] text-[#8C877D]">admin@dineflow.kitchen</div>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/customer"
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-[#252522] hover:bg-[#F2ECE2] flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D66B43]" />
                      <span>Switch to Customer App</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
