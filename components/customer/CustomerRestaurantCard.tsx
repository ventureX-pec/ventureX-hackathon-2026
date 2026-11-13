"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Restaurant, useDineFlow } from "@/context/DineFlowContext"
import {
  Star,
  Clock,
  MapPin,
  ChevronRight,
  Flame,
  Heart,
  UtensilsCrossed,
} from "lucide-react"

export default function CustomerRestaurantCard({
  restaurant,
  featured = false,
}: {
  restaurant: Restaurant
  featured?: boolean
}) {
  const { favouriteRestaurantIds, toggleFavouriteRestaurant } = useDineFlow()
  const isFav = favouriteRestaurantIds.includes(restaurant.id)

  return (
    <div
      className={`group bg-white rounded-3xl border border-[#e7dfd5] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col ${
        featured ? "md:grid md:grid-cols-12 md:gap-0" : ""
      }`}
    >
      {/* Image Area */}
      <div
        className={`relative overflow-hidden bg-[#f4ede4] ${
          featured ? "md:col-span-7 h-60 sm:h-72 md:h-full min-h-[240px]" : "h-48 sm:h-52 w-full"
        }`}
      >
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient shade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs text-xs font-semibold">
          <span
            className={`w-2 h-2 rounded-full ${
              restaurant.status === "open" ? "bg-[#2e7d32] animate-pulse" : "bg-[#78716c]"
            }`}
          />
          <span className={restaurant.status === "open" ? "text-[#1c1917]" : "text-[#78716c]"}>
            {restaurant.status === "open" ? "Open for Service" : "Closed"}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavouriteRestaurant(restaurant.id)
          }}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
            isFav
              ? "bg-[#c96342] text-white"
              : "bg-white/90 text-[#57534e] hover:text-[#c96342] hover:bg-white"
          }`}
          aria-label="Save to favourites"
        >
          <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
        </button>

        {/* Prep Time pill at bottom of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-medium">
          <Clock className="w-3 h-3 text-[#e07a5f]" />
          <span>{restaurant.avgPrepTime} prep</span>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`p-5 sm:p-6 flex flex-col justify-between flex-1 ${
          featured ? "md:col-span-5 md:p-8" : ""
        }`}
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c96342]">
              {restaurant.cuisine}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#1c1917] bg-[#f4ede4] px-2 py-0.5 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-[#d97706] text-[#d97706]" />
              <span>{restaurant.rating}</span>
              <span className="text-[10px] text-[#78716c] font-normal">
                ({restaurant.reviewCount})
              </span>
            </div>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] tracking-tight group-hover:text-[#c96342] transition-colors">
            {restaurant.name}
          </h3>

          <p className="text-xs text-[#57534e] line-clamp-2 mt-2 leading-relaxed">
            {restaurant.description}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-[#78716c] mt-3 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#a8a29e] flex-shrink-0" />
            <span className="truncate">{restaurant.address}</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-5 pt-4 border-t border-[#e7dfd5]/80 flex items-center justify-between">
          <span className="text-[11px] text-[#78716c] font-medium">
            Express Zero-Wait Pickup
          </span>
          <Link
            href={`/r/${restaurant.slug}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#1c1917] hover:bg-[#c96342] text-white text-xs font-medium transition-all group-hover:bg-[#c96342] shadow-2xs"
          >
            <span>View Menu</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
