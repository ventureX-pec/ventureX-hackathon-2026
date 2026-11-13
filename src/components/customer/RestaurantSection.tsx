"use client";

import React, { useState } from "react";
import Image from "next/image";
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
}

export const RestaurantSection: React.FC<RestaurantSectionProps> = ({
  restaurants,
  selectedFilter,
  onFilterChange,
  favorites,
  onToggleFavorite,
  onSelectRestaurant,
  onViewAllClick,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252522]">
            Popular Near You
          </h2>
          <p className="text-xs text-[#6E6D66]">
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

      {/* Restaurant Cards Grid (exact match to reference card aesthetic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {restaurants.map((restaurant) => {
          const isFav = favorites.includes(restaurant.id);
          return (
            <motion.div
              key={restaurant.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              onClick={() => onSelectRestaurant(restaurant.id)}
              className="group bg-white rounded-2xl border border-[#ECE7DE] overflow-hidden shadow-soft hover:shadow-card cursor-pointer transition-all flex flex-col justify-between"
            >
              {/* Cover Photo */}
              <div className="relative h-44 w-full bg-[#ECE7DE] overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Rating Badge on top right (matches reference ⭐ 4.6) */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-[#252522] text-[10px] font-bold shadow-xs flex items-center gap-1">
                  <span className="text-[#D66B43]">★</span>
                  <span>{restaurant.rating}</span>
                </div>

                {/* Favorite Heart Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(restaurant.id);
                  }}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#252522] hover:scale-110 transition-transform shadow-xs"
                  aria-label="Save to favorites"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFav ? "fill-[#D66B43] text-[#D66B43]" : "text-[#6E6D66]"
                    }`}
                  />
                </button>
              </div>

              {/* Details (matches reference layout) */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#252522] group-hover:text-[#D66B43] transition-colors truncate">
                    {restaurant.name}
                  </h3>
                  <p className="text-[11px] text-[#6E6D66] truncate mt-0.5">
                    {restaurant.cuisine}
                  </p>
                </div>

                {/* Bottom Meta Row (matches reference: prep time & delivery fee) */}
                <div className="pt-2 border-t border-[#ECE7DE] flex items-center justify-between text-[11px] text-[#6E6D66]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#D66B43]" />
                    <span>{restaurant.prepTime}</span>
                  </div>

                  <span className="font-semibold text-[#5F7A65]">
                    {restaurant.deliveryFee}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
