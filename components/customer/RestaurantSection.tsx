"use client";

import React, { useState } from "react";
import Image from "next/image";
import SafeImage from "./SafeImage";
import { motion } from "motion/react";
import {
  Heart,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Store,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Restaurant } from "@/data/mockCustomerData";

interface RestaurantSectionProps {
  restaurants: Restaurant[];
  selectedFilter: string;
  onFilterChange: (f: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRestaurant: (id: string) => void;
  onViewAllClick?: () => void;
  isStoreLive?: boolean;
}

export const RestaurantSection: React.FC<RestaurantSectionProps> = ({
  restaurants,
  selectedFilter,
  onFilterChange,
  favorites,
  onToggleFavorite,
  onSelectRestaurant,
  onViewAllClick,
  isStoreLive = true,
}) => {
  const filters = [
    { id: "all", label: "All" },
    { id: "nearby", label: "Nearby" },
    { id: "fastest", label: "Fastest Prep" },
    { id: "dine-in", label: "Dine-In" },
    { id: "takeaway", label: "Takeaway" },
  ];

  return (
    <section className="space-y-4">
      {/* Header and Filter Tabs */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#252522] tracking-tight">
            Popular Near You
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6D66] font-medium">
            Campus partner kitchens & live counter prep speeds
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filters.map((f) => {
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onFilterChange(f.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#252522] text-[#FAF8F3] shadow-xs"
                      : "bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={onViewAllClick}
            className="text-xs font-semibold text-[#D66B43] hover:underline flex-shrink-0"
          >
            View All
          </button>
        </div>
      </div>

      {/* Restaurant Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {restaurants.map((restaurant) => {
          const isFav = favorites.includes(restaurant.id);
          // If it's the demo restaurant Burger House, synchronize with admin live toggle
          const isOffline =
            restaurant.isOpen === false ||
            (restaurant.id === "burger-house" && isStoreLive === false);

          return (
            <motion.div
              key={restaurant.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              onClick={() => onSelectRestaurant(restaurant.id)}
              className={`group bg-white rounded-2xl border overflow-hidden shadow-soft hover:shadow-card cursor-pointer transition-all flex flex-col justify-between relative ${
                isOffline ? "border-rose-300 ring-1 ring-rose-200" : "border-[#ECE7DE]"
              }`}
            >
              {/* TOP OF THE CARD: Offline Status Banner */}
              {isOffline && (
                <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white text-[11px] font-black py-1.5 px-3 flex items-center justify-center gap-1.5 uppercase tracking-wider text-center shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Kitchen Offline • Not Accepting Orders</span>
                </div>
              )}

              {/* Cover Photo */}
              <div className="relative h-44 w-full bg-[#ECE7DE] overflow-hidden">
                <SafeImage
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className={`object-cover group-hover:scale-105 transition-all duration-500 ${
                    isOffline ? "grayscale contrast-125 opacity-70" : ""
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Top Badge: Offline Pill right at the top center */}
                {isOffline && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 rounded-full bg-rose-600/95 backdrop-blur-md text-white text-[10px] font-black shadow-md flex items-center gap-1.5 uppercase tracking-wider border border-white/20 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>Offline</span>
                  </div>
                )}

                {/* Rating Badge on top right */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-[#252522] text-[10px] font-bold shadow-xs flex items-center gap-1 z-10">
                  <span className="text-[#D66B43]">★</span>
                  <span>{restaurant.rating}</span>
                </div>

                {/* Favorite Heart Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(restaurant.id);
                  }}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#252522] hover:scale-110 transition-transform shadow-xs z-10"
                  aria-label="Save to favorites"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFav ? "fill-[#D66B43] text-[#D66B43]" : "text-[#6E6D66]"
                    }`}
                  />
                </button>

                {/* Subtle dark overlay when offline */}
                {isOffline && (
                  <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px] flex items-center justify-center pointer-events-none z-[5]">
                    <div className="px-3 py-1 rounded-full bg-black/80 text-white/95 text-[11px] font-bold border border-white/20 shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span>Currently Closed</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-[#252522] group-hover:text-[#D66B43] transition-colors truncate">
                      {restaurant.name}
                    </h3>
                    {isOffline && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 flex-shrink-0">
                        Offline
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6E6D66] truncate mt-0.5">
                    {restaurant.cuisine}
                  </p>
                </div>

                {/* Bottom Meta Row */}
                <div className="pt-2 border-t border-[#ECE7DE] flex items-center justify-between text-[11px] text-[#6E6D66]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#D66B43]" />
                    <span>{restaurant.prepTime}</span>
                  </div>

                  {isOffline ? (
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      Orders Paused
                    </span>
                  ) : (
                    <span className="font-semibold text-[#5F7A65]">
                      {restaurant.deliveryFee}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
