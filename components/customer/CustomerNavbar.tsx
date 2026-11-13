"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  Compass,
  ShoppingBag,
  Heart,
  Clock,
  User,
  LayoutDashboard,
  Menu as MenuIcon,
  X,
  Flame,
  ArrowRight,
} from "lucide-react"

export default function CustomerNavbar() {
  const pathname = usePathname()
  const { cartCount, setIsCartDrawerOpen, orders, favouriteRestaurantIds, favouriteDishIds } = useDineFlow()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const activeOrdersCount = orders.filter(
    (o) => o.status === "new" || o.status === "preparing" || o.status === "ready"
  ).length

  const totalFavourites = favouriteRestaurantIds.length + favouriteDishIds.length

  const navLinks = [
    { label: "Explore Restaurants", href: "/", icon: <Compass className="w-4 h-4" /> },
    {
      label: "My Orders",
      href: "/orders",
      icon: <Clock className="w-4 h-4" />,
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
    {
      label: "Favourites",
      href: "/favourites",
      icon: <Heart className="w-4 h-4" />,
      badge: totalFavourites > 0 ? totalFavourites : undefined,
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e7dfd5] transition-all">
      {/* Top Demo Bar / Quick Persona Switcher */}
      <div className="bg-[#1c1917] text-[#e7dfd5] text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2e7d32] animate-pulse" />
          <span className="text-[11px] font-medium text-[#d6cbbe]">
            DineFlow Multi-Restaurant Ecosystem Active
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[11px] text-[#a8a29e]">
            Reviewing as Customer
          </span>
          <Link
            href="/owner"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-[11px] font-medium transition-all shadow-2xs"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Switch to Owner Dashboard</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#c96342] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold text-[#1c1917] tracking-tight flex items-center gap-1">
              DineFlow
              <span className="text-[#c96342] text-lg leading-none">.</span>
            </span>
            <span className="block text-[9.5px] uppercase tracking-widest font-semibold text-[#78716c] -mt-1">
              Artisanal Network
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Customer Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors flex items-center gap-2 py-1 relative ${
                  isActive
                    ? "text-[#c96342]"
                    : "text-[#57534e] hover:text-[#1c1917]"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#c96342] text-white text-[10px] font-bold">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c96342] rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Actions: Cart & Profile */}
        <div className="flex items-center gap-3">
          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-[#f4ede4] border border-[#e7dfd5] text-[#1c1917] text-xs sm:text-sm font-medium transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#c96342]" />
            <span className="hidden sm:inline font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#c96342] text-white text-[11px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Shortcut */}
          <Link
            href="/profile"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              pathname === "/profile"
                ? "bg-[#c96342] text-white"
                : "bg-white hover:bg-[#f4ede4] border border-[#e7dfd5] text-[#57534e] hover:text-[#1c1917]"
            }`}
            title="Customer Profile"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-white border border-[#e7dfd5] text-[#1c1917] flex items-center justify-center"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e7dfd5] bg-[#faf7f2] px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-xl text-sm font-medium text-[#1c1917] hover:bg-[#f4ede4]"
            >
              <div className="flex items-center gap-2.5">
                {link.icon}
                <span>{link.label}</span>
              </div>
              {link.badge !== undefined && (
                <span className="px-2 py-0.5 rounded-full bg-[#c96342] text-white text-xs font-bold">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#e7dfd5]">
            <Link
              href="/owner"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#c96342] text-white text-xs font-medium"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Switch to Restaurant Owner Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
