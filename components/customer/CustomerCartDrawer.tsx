"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  UtensilsCrossed,
  Clock,
  ShieldCheck,
} from "lucide-react"
import CustomerCheckoutModal from "./CustomerCheckoutModal"

export default function CustomerCartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTotal,
    currentRestaurant,
  } = useDineFlow()

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)

  if (!isCartDrawerOpen) return null

  const tax = Math.round(cartSubtotal * 0.05)
  const serviceFee = cart.length > 0 ? 30 : 0

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf7f2] shadow-2xl border-l border-[#e7dfd5] flex flex-col z-10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#e7dfd5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f4ede4] text-[#c96342] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#1c1917] leading-none">
                  Your Order
                </h2>
                <span className="text-[11px] text-[#78716c] font-medium">
                  {currentRestaurant.name}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-[#f4ede4] text-[#57534e] hover:text-[#1c1917] hover:bg-[#e7dfd5] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f4ede4] flex items-center justify-center text-[#a8a29e]">
                  <UtensilsCrossed className="w-8 h-8 text-[#c96342]/60" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#1c1917]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#78716c] mt-1 max-w-xs leading-relaxed">
                    Explore our seasonal menu and add handcrafted dishes fired fresh from the kitchen hearth.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#c96342] text-white text-xs font-medium shadow-xs hover:bg-[#a84d31] transition-all"
                >
                  Browse Menu Dishes
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#e7dfd5]/60 text-xs text-[#78716c]">
                  <span>{cart.length} item{cart.length > 1 ? "s" : ""} selected</span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#a8a29e] hover:text-[#c96342] transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="bg-white rounded-2xl border border-[#e7dfd5] p-3.5 shadow-2xs space-y-2.5 transition-all hover:border-[#c96342]/40"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#f4ede4] flex-shrink-0">
                        {cartItem.item.image ? (
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#c96342]">
                            <UtensilsCrossed className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#1c1917] truncate">
                            {cartItem.item.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#1c1917] flex-shrink-0">
                            ₹{cartItem.item.price * cartItem.quantity}
                          </span>
                        </div>

                        {cartItem.item.subtitle && (
                          <p className="text-[11px] text-[#78716c] truncate mt-0.5">
                            {cartItem.item.subtitle}
                          </p>
                        )}

                        {cartItem.instructions && (
                          <p className="text-[10px] text-[#c96342] italic mt-1 line-clamp-1">
                            Note: {cartItem.instructions}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 bg-[#f4ede4] rounded-lg p-1">
                        <button
                          onClick={() => updateCartQuantity(cartItem.item.id, -1)}
                          className="w-6 h-6 rounded-md bg-white text-[#57534e] hover:text-[#1c1917] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-[#1c1917] w-5 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(cartItem.item.id, 1)}
                          className="w-6 h-6 rounded-md bg-white text-[#57534e] hover:text-[#1c1917] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(cartItem.item.id)}
                        className="text-xs text-[#a8a29e] hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#e7dfd5] bg-white space-y-3.5">
              <div className="space-y-1.5 text-xs text-[#57534e]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1c1917]">₹{cartSubtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Taxes (GST 5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hearth Kitchen Packaging</span>
                  <span>₹{serviceFee}</span>
                </div>
                <div className="pt-2 border-t border-[#e7dfd5] flex items-center justify-between text-sm font-bold text-[#1c1917]">
                  <span>Total Amount</span>
                  <span className="text-[#c96342] text-base">₹{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow active:scale-[0.99] cursor-pointer"
              >
                <span>Proceed to Quick Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10.5px] text-[#78716c]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2e7d32]" />
                <span>Zero Aggregator Markup • Fired Fresh on Arrival</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <CustomerCheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          onOrderSuccess={() => {
            setCheckoutModalOpen(false)
            setIsCartDrawerOpen(false)
          }}
        />
      )}
    </div>
  )
}
