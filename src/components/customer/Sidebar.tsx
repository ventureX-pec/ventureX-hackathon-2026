"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Home,
  UtensilsCrossed,
  LayoutGrid,
  ClipboardList,
  Heart,
  Tag,
  HelpCircle,
  Settings,
  LogOut,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  favoritesCount = 0,
}) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
    { id: "categories", label: "Categories", icon: LayoutGrid },
    { id: "orders", label: "My Orders", icon: ClipboardList },
    { id: "favorites", label: "Favorites", icon: Heart, badge: favoritesCount > 0 ? favoritesCount : undefined },
    { id: "offers", label: "Offers", icon: Tag },
    { id: "help", label: "Help Center", icon: HelpCircle },
  ];

  return (
    <aside className="hidden lg:flex w-64 fixed left-0 top-0 bottom-0 bg-white border-r border-[#ECE7DE] flex-col justify-between p-6 z-40 overflow-y-auto">
      {/* Brand Logo */}
      <div>
        <Link href="/" className="flex items-center gap-2.5 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-[#252522] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5 text-[#D66B43]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-bold tracking-tight text-[#252522]">
                DINEFLOW
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D66B43]" />
            </div>
            <span className="text-[10px] text-[#6E6D66] font-medium tracking-wide">
              Zero Wait Food Portal
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#D66B43]/10 text-[#D66B43] shadow-xs"
                    : "text-[#6E6D66] hover:text-[#252522] hover:bg-[#FAF8F3]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#D66B43]" : "text-[#6E6D66]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="w-5 h-5 rounded-full bg-[#D66B43] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card & User Section */}
      <div className="space-y-4 pt-6 border-t border-[#ECE7DE]">
        {/* Promotional Offer Card */}
        <div className="relative rounded-2xl bg-[#FAF4ED] border border-[#F0E4D8] p-4 text-center overflow-hidden">
          <div className="relative z-10 space-y-1.5">
            <span className="inline-block px-2 py-0.5 rounded-full bg-white text-[9px] font-bold text-[#D66B43] shadow-xs">
              EXCLUSIVE DEAL
            </span>
            <h4 className="font-serif font-bold text-xs text-[#252522]">
              Get 50% OFF on your first order
            </h4>
            <p className="text-[10px] text-[#6E6D66]">
              Use code: <strong className="text-[#D66B43]">DINE50</strong>
            </p>

            <div className="relative w-20 h-16 mx-auto my-2">
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80"
                alt="Promo Burger"
                fill
                className="object-cover rounded-xl shadow-xs"
                sizes="80px"
              />
            </div>

            <button
              onClick={() => onTabChange("offers")}
              className="w-full py-2 rounded-xl bg-[#D66B43] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#BF5832] transition-colors shadow-xs"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#ECE7DE]">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="User Profile"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#252522] leading-tight">
                Aarav Sharma
              </span>
              <span className="text-[10px] text-[#6E6D66]">Campus Diner</span>
            </div>
          </div>

          <Link
            href="/"
            className="p-1.5 rounded-lg text-[#6E6D66] hover:text-[#252522] hover:bg-white transition-colors"
            title="Return Home"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
