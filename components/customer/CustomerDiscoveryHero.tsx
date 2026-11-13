"use client"

import React from "react"
import { Search, MapPin, Sparkles, Filter } from "lucide-react"

interface CustomerDiscoveryHeroProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedLocation: string
  setSelectedLocation: (loc: string) => void
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
}

const CATEGORIES = [
  { id: "all", label: "All Cuisines" },
  { id: "Hearth", label: "Artisanal & Hearth" },
  { id: "Indian", label: "Indian & Tandoor" },
  { id: "Italian", label: "Italian & Pasta" },
  { id: "Japanese", label: "Japanese & Grill" },
  { id: "Cafes", label: "Cafes & Brunch" },
]

const LOCATIONS = [
  "All Metro Districts",
  "Culinary District (Downtown)",
  "Spice Market (Old Quarter)",
  "North Campus Hub",
  "Heritage Arts Precinct",
]

export default function CustomerDiscoveryHero({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedCategory,
  setSelectedCategory,
}: CustomerDiscoveryHeroProps) {
  return (
    <section className="relative pt-12 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f4ede4]/60 to-[#faf7f2] border-b border-[#e7dfd5]">
      {/* Decorative ambient blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#c96342]/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#b45309]/8 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e7dfd5] text-xs font-semibold text-[#c96342] uppercase tracking-wider shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ZERO-COMMISSION INDEPENDENT DINING</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1c1917] tracking-tight leading-[1.12]">
          Good Food. <span className="italic font-light text-[#c96342]">Great Local Places.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#57534e] max-w-2xl mx-auto leading-relaxed font-light">
          Skip 30% aggregator markups. Order directly from curated independent kitchens, scheduled table-side or ready for express pickup.
        </p>

        {/* Search Bar & Location Selector Box */}
        <div className="pt-2 max-w-3xl mx-auto">
          <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-[#e7dfd5] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Location selector */}
            <div className="flex items-center gap-2 px-3 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-[#e7dfd5] flex-shrink-0">
              <MapPin className="w-4 h-4 text-[#c96342] flex-shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-medium text-[#1c1917] focus:outline-none cursor-pointer pr-4"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Search */}
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 sm:py-0">
              <Search className="w-4 h-4 text-[#a8a29e] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, dishes (Ribeye, Wild Salmon, Naan)..."
                className="w-full text-xs sm:text-sm text-[#1c1917] placeholder-[#a8a29e] bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#a8a29e] hover:text-[#1c1917]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search Submit button */}
            <button
              type="button"
              className="px-6 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-medium transition-all shadow-2xs hover:shadow-xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
            >
              <span>Explore</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#1c1917] text-white shadow-xs"
                  : "bg-white border border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4] hover:text-[#1c1917]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
