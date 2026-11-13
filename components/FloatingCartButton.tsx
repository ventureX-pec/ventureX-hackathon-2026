"use client"

import React from "react"
import { useCart } from "@/context/CartContext"
import { ShoppingBag, ArrowRight } from "lucide-react"

export default function FloatingCartButton() {
  const { totalItems, totalPrice, setIsCartOpen, isCartOpen } = useCart()

  if (totalItems === 0 || isCartOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#1c1917] hover:bg-[#c25e3e] text-white shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer border border-stone-800"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-white" />
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#c25e3e] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#1c1917]">
            {totalItems}
          </span>
        </div>

        <div className="text-left text-xs">
          <span className="block text-stone-300 text-[10px] uppercase font-bold tracking-wider">
            View Order
          </span>
          <span className="font-semibold text-white">₹{totalPrice}</span>
        </div>

        <ArrowRight className="w-4 h-4 text-stone-300 ml-1" />
      </button>
    </div>
  )
}
