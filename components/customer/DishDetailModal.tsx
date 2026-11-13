"use client"

import React, { useState } from "react"
import { MenuItem, useDineFlow } from "@/context/DineFlowContext"
import {
  X,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Clock,
  Flame,
  Check,
  AlertTriangle,
} from "lucide-react"

interface DishDetailModalProps {
  dish: MenuItem | null
  onClose: () => void
}

export default function DishDetailModal({ dish, onClose }: DishDetailModalProps) {
  const { addToCart } = useDineFlow()
  const [quantity, setQuantity] = useState(1)
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([])
  const [addedAnimation, setAddedAnimation] = useState(false)

  if (!dish) return null

  const isAvailable = dish.isAvailable

  // Sample customizations tailored to dish category
  const customizationOptions = dish.category === "specials"
    ? ["Medium Rare Prep", "Garlic Butter on Side", "Extra Sea Salt Flakes"]
    : dish.category === "starters"
    ? ["Dressing on the Side", "Extra Sheep's Feta (+₹50)", "Gluten-Free Crisp Bread"]
    : dish.category === "mains"
    ? ["Extra Wild Salmon Crispy Skin", "Less Oil / Hearth Steamed", "Extra Lemon Herb Emulsion"]
    : ["Less Sweet", "Extra Warm Hearth Serve"]

  const toggleCustomization = (option: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    )
  }

  const handleAddToCart = () => {
    if (!isAvailable) return
    addToCart(dish, quantity, specialInstructions, selectedCustomizations)
    setAddedAnimation(true)
    setTimeout(() => {
      setAddedAnimation(false)
      onClose()
    }, 450)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl border border-[#e7dfd5] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Large Food Image */}
        <div className="relative h-60 sm:h-72 w-full bg-[#f4ede4] overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full border-2 border-white shadow-xs ${
                dish.isVeg ? "bg-[#2e7d32]" : "bg-red-600"
              }`}
              title={dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            />
            {dish.isChefSpecial && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#c96342] text-white text-[10px] font-bold shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>Chef&apos;s Signature</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-white/80 text-xs uppercase tracking-wider font-semibold">
                {dish.subtitle || dish.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {dish.name}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl">
                ₹{dish.price}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Availability Status Alert */}
          {!isAvailable ? (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-900 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <div>
                <span className="font-bold">Currently Unavailable</span>
                <span className="block text-[11px] text-rose-800">
                  Key kitchen ingredients are depleted for tonight&apos;s service. Firing resumes tomorrow.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-xs text-[#57534e]">
              <div className="flex items-center gap-1.5 bg-[#f4ede4] px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-[#c96342]" />
                <span>{dish.prepTimeMinutes} min cook time</span>
              </div>
              {dish.calories && (
                <div className="flex items-center gap-1.5 bg-[#f4ede4] px-2.5 py-1 rounded-lg">
                  <Flame className="w-3.5 h-3.5 text-[#b45309]" />
                  <span>{dish.calories} kcal</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Ingredients Breakdown */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div>
              <span className="block text-[11px] font-semibold text-[#1c1917] uppercase tracking-wider mb-2">
                Curated Ingredients
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#e7dfd5] text-[11px] text-[#57534e]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customization Options */}
          {isAvailable && (
            <div className="space-y-2">
              <span className="block text-[11px] font-semibold text-[#1c1917] uppercase tracking-wider">
                Kitchen Preferences & Add-ons
              </span>
              <div className="space-y-1.5">
                {customizationOptions.map((opt) => {
                  const isChecked = selectedCustomizations.includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleCustomization(opt)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? "bg-[#c96342]/10 border-[#c96342] text-[#1c1917]"
                          : "bg-white border-[#e7dfd5] text-[#57534e] hover:border-[#a8a29e]"
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isChecked
                            ? "bg-[#c96342] border-[#c96342] text-white"
                            : "border-[#d6cbbe]"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {isAvailable && (
            <div>
              <label className="block text-[11px] font-semibold text-[#1c1917] uppercase tracking-wider mb-1">
                Special Kitchen Instructions
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Allergies, extra sauce, mild spice..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#c96342]"
              />
            </div>
          )}

          {/* Quantity and Add to Cart Button */}
          {isAvailable ? (
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#f4ede4] rounded-full p-1 border border-[#e7dfd5]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full bg-white text-[#57534e] hover:text-[#1c1917] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#1c1917] w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full bg-white text-[#57534e] hover:text-[#1c1917] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:shadow active:scale-[0.99] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedAnimation ? "Added to Cart!" : `Add to Order • ₹${dish.price * quantity}`}
                </span>
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <button
                disabled
                className="w-full py-3.5 rounded-full bg-[#e7dfd5] text-[#78716c] text-xs sm:text-sm font-medium cursor-not-allowed"
              >
                Item Sold Out for Service
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
