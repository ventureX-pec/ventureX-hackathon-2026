"use client"

import React, { useState, useMemo } from "react"
import Image from "next/image"
import { MENU_ITEMS, MenuItem } from "@/data/menuData"
import { useCart } from "@/context/CartContext"
import { Search, Plus, Minus, Check, Clock, Star, Flame, Sparkles, Filter, Leaf } from "lucide-react"

export default function MenuSection() {
  const { addItem, updateQuantity, getItemQuantity, setIsCartOpen } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [vegOnly, setVegOnly] = useState(false)
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false)
  const [addedPopupId, setAddedPopupId] = useState<string | null>(null)

  const categories = [
    { id: "all", label: "All Creations" },
    { id: "specials", label: "Chef's Specials" },
    { id: "mains", label: "Main Course" },
    { id: "starters", label: "Starters & Plates" },
    { id: "desserts", label: "Artisanal Desserts" },
    { id: "beverages", label: "Signature Beverages" },
  ]

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false
      }
      // Veg filter
      if (vegOnly && !item.isVeg) {
        return false
      }
      // Gluten free filter
      if (glutenFreeOnly && !item.isGlutenFree) {
        return false
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesDesc = item.description.toLowerCase().includes(query)
        const matchesIngredients = item.ingredients.some((ing) =>
          ing.toLowerCase().includes(query)
        )
        return matchesName || matchesDesc || matchesIngredients
      }
      return true
    })
  }, [selectedCategory, searchQuery, vegOnly, glutenFreeOnly])

  const handleAddItem = (item: MenuItem) => {
    addItem(item, 1)
    setAddedPopupId(item.id)
    setTimeout(() => {
      setAddedPopupId(null)
    }, 1500)
  }

  return (
    <section id="menu" className="py-24 bg-[#faf7f2] border-t border-[#e7dfd5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3ede4] border border-[#e7dfd5] text-xs font-semibold text-[#c25e3e] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seasonal Kitchen Menu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight">
              Curated for the Table
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#57534e] max-w-xl">
              Freshly prepped ingredients, zero pre-frozen shortcuts. Filter by craving or dietary preference and order in one click.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[#78716c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#e7dfd5] text-sm text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#c25e3e]/30 focus:border-[#c25e3e] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#78716c] hover:text-[#1c1917]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills & Dietary Switches */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#e7dfd5]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const count =
                cat.id === "all"
                  ? MENU_ITEMS.length
                  : MENU_ITEMS.filter((i) => i.category === cat.id).length
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#1c1917] text-white shadow-xs"
                      : "bg-white text-[#57534e] hover:bg-[#f3ede4] border border-[#e7dfd5]"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                      selectedCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-[#f3ede4] text-[#78716c]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                vegOnly
                  ? "bg-[#2e7d32]/10 border-[#2e7d32] text-[#2e7d32]"
                  : "bg-white border-[#e7dfd5] text-[#78716c] hover:border-[#2e7d32]"
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Veg Only</span>
            </button>

            <button
              onClick={() => setGlutenFreeOnly(!glutenFreeOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                glutenFreeOnly
                  ? "bg-[#c25e3e]/10 border-[#c25e3e] text-[#c25e3e]"
                  : "bg-white border-[#e7dfd5] text-[#78716c] hover:border-[#c25e3e]"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Gluten-Free</span>
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-[#78716c] mb-6 flex items-center justify-between">
          <span>Showing {filteredItems.length} dishes</span>
          {searchQuery && (
            <span>Filtering for &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#e7dfd5]">
            <UtensilsIcon className="w-10 h-10 text-[#a8a29e] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-[#1c1917]">No dishes found</h3>
            <p className="text-sm text-[#78716c] mt-1 max-w-sm mx-auto">
              We couldn&apos;t find anything matching your filters. Try clearing your search or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all")
                setSearchQuery("")
                setVegOnly(false)
                setGlutenFreeOnly(false)
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#f3ede4] text-xs font-semibold text-[#1c1917] hover:bg-[#e7dfd5]"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const quantity = getItemQuantity(item.id)
            const isAdded = addedPopupId === item.id

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#e7dfd5] overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
              >
                {/* Food Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f3ede4]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5">
                      {item.isVeg ? (
                        <span className="px-2 py-0.5 rounded-md bg-[#2e7d32] text-white text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          VEG
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-[#b91c1c] text-white text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          NON-VEG
                        </span>
                      )}

                      {item.isChefSpecial && (
                        <span className="px-2 py-0.5 rounded-md bg-[#c25e3e] text-white text-[10px] font-bold tracking-wider shadow-xs flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          SPECIAL
                        </span>
                      )}
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#d6cbbe]" />
                      {item.prepTime}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white text-xs font-semibold">
                    <div className="flex items-center gap-0.5 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{item.rating.toFixed(1)}</span>
                      <span className="text-white/60 text-[10px]">({item.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-medium text-[#1c1917] leading-snug group-hover:text-[#c25e3e] transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    {item.subtitle && (
                      <p className="text-xs font-medium text-[#c25e3e] mt-0.5">
                        {item.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-[#57534e] mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Ingredients preview */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.ingredients.slice(0, 3).map((ing) => (
                        <span
                          key={ing}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#f3ede4] text-[#78716c]"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-[#a8a29e]">
                          +{item.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Add to Cart Controls */}
                  <div className="mt-5 pt-4 border-t border-[#f3ede4] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#78716c] block">Price</span>
                      <span className="text-lg font-semibold text-[#1c1917]">
                        ₹{item.price}
                      </span>
                    </div>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-2 bg-[#f3ede4] rounded-full p-1 border border-[#e7dfd5]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1c1917] hover:bg-[#e7dfd5] transition-colors cursor-pointer shadow-2xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-[#1c1917]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-[#c25e3e] flex items-center justify-center text-white hover:bg-[#a84d31] transition-colors cursor-pointer shadow-2xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddItem(item)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          isAdded
                            ? "bg-[#2e7d32] text-white"
                            : "bg-[#1c1917] hover:bg-[#c25e3e] text-white shadow-2xs hover:shadow-xs active:scale-95"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function UtensilsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
      <path d="M12 2v20" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}
