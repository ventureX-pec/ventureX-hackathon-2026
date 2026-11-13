"use client"

import React, { useState } from "react"
import { useCart } from "@/context/CartContext"
import { X, Plus, Minus, Trash2, ArrowRight, UtensilsCrossed, PackageCheck, Clock, CheckCircle2, QrCode } from "lucide-react"

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
    tax,
    totalPrice,
    diningOption,
    setDiningOption,
    tableNumber,
    setTableNumber,
    pickupTime,
    setPickupTime,
    placeOrder,
    placedOrder,
    resetOrder,
  } = useCart()

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isCartOpen) return null

  const handleCheckout = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      placeOrder()
      setIsSubmitting(false)
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] shadow-2xl flex flex-col justify-between border-l border-[#e7dfd5]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e7dfd5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#c25e3e] text-white flex items-center justify-center font-bold text-sm">
                SZ
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1c1917]">
                  {placedOrder ? "Order Receipt" : "Your Kitchen Order"}
                </h3>
                <span className="text-[11px] text-[#78716c]">
                  {placedOrder
                    ? `Order Confirmed: ${placedOrder.orderId}`
                    : `${totalItems} item${totalItems === 1 ? "" : "s"} selected`}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false)
                if (placedOrder) resetOrder()
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716c] hover:text-[#1c1917] hover:bg-[#f3ede4] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {placedOrder ? (
              /* Success / Kitchen Ticket View */
              <div className="space-y-6 py-4 animate-in zoom-in-95 duration-300">
                <div className="text-center p-6 bg-white rounded-2xl border border-[#e7dfd5] shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#2e7d32]/10 text-[#2e7d32] flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-medium text-[#1c1917]">
                    Order Sent to Kitchen!
                  </h4>
                  <p className="text-xs text-[#57534e] mt-1">
                    Your ticket has printed on the station display.
                  </p>

                  <div className="mt-4 p-3 bg-[#f3ede4] rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#78716c] block">
                      Order Token
                    </span>
                    <span className="font-mono text-2xl font-bold text-[#c25e3e]">
                      {placedOrder.orderId}
                    </span>
                    <span className="block text-xs font-semibold text-[#1c1917] mt-1">
                      {placedOrder.diningOption === "dine-in"
                        ? `Table: ${placedOrder.tableNumber}`
                        : `Takeaway Slot: ${placedOrder.pickupTime}`}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#78716c]">
                    <Clock className="w-3.5 h-3.5 text-[#c25e3e]" />
                    <span>Estimated Prep Time: ~{placedOrder.estimatedMinutes} minutes</span>
                  </div>
                </div>

                {/* Items Summary in Receipt */}
                <div className="bg-white rounded-2xl border border-[#e7dfd5] p-5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#78716c] mb-3">
                    Items Plated
                  </h5>
                  <div className="divide-y divide-[#f3ede4] text-xs">
                    {placedOrder.items.map((ci) => (
                      <div key={ci.item.id} className="py-2.5 flex justify-between items-center">
                        <div>
                          <span className="font-medium text-[#1c1917]">{ci.item.name}</span>
                          <span className="text-stone-400 block text-[11px]">Qty: {ci.quantity}</span>
                        </div>
                        <span className="font-semibold text-[#1c1917]">₹{ci.item.price * ci.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#e7dfd5] flex justify-between text-sm font-bold text-[#1c1917]">
                    <span>Total Amount</span>
                    <span className="text-[#c25e3e]">₹{placedOrder.total}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    resetOrder()
                    setIsCartOpen(false)
                  }}
                  className="w-full py-3 rounded-full bg-[#1c1917] hover:bg-[#c25e3e] text-white text-xs font-semibold transition-colors"
                >
                  Order More Dishes
                </button>
              </div>
            ) : items.length === 0 ? (
              /* Empty Cart State */
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#f3ede4] flex items-center justify-center mx-auto mb-4 text-[#78716c]">
                  <UtensilsCrossed className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#1c1917]">Your Order is Empty</h4>
                <p className="text-xs text-[#57534e] mt-1 max-w-xs mx-auto">
                  Explore our seasonal creations from the menu and add items to your table order.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false)
                    const menuEl = document.querySelector("#menu")
                    if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="mt-6 px-5 py-2.5 rounded-full bg-[#c25e3e] hover:bg-[#a84d31] text-white text-xs font-semibold shadow-xs"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              /* Active Cart Items */
              <>
                {/* Dining Option Toggle */}
                <div className="bg-white p-3 rounded-2xl border border-[#e7dfd5]">
                  <label className="text-xs font-semibold text-[#78716c] uppercase tracking-wider block mb-2">
                    Dining Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDiningOption("dine-in")}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        diningOption === "dine-in"
                          ? "bg-[#1c1917] text-white shadow-xs"
                          : "bg-[#f3ede4] text-[#57534e] hover:bg-[#e7dfd5]"
                      }`}
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>Dine-In</span>
                    </button>

                    <button
                      onClick={() => setDiningOption("takeaway")}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        diningOption === "takeaway"
                          ? "bg-[#1c1917] text-white shadow-xs"
                          : "bg-[#f3ede4] text-[#57534e] hover:bg-[#e7dfd5]"
                      }`}
                    >
                      <PackageCheck className="w-3.5 h-3.5" />
                      <span>Express Takeaway</span>
                    </button>
                  </div>

                  {/* Mode Config */}
                  <div className="mt-3 pt-3 border-t border-[#f3ede4]">
                    {diningOption === "dine-in" ? (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#57534e]">Seated at:</span>
                        <select
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-[#f3ede4] border border-[#e7dfd5] text-xs font-semibold text-[#1c1917] focus:outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                            <option key={num} value={`Table ${num}`}>
                              Table #{num}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#57534e]">Pickup Time:</span>
                        <select
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-[#f3ede4] border border-[#e7dfd5] text-xs font-semibold text-[#1c1917] focus:outline-none"
                        >
                          <option value="In 15 Mins (Fastest)">In 15 Mins (Fastest)</option>
                          <option value="In 30 Mins">In 30 Mins</option>
                          <option value="In 45 Mins">In 45 Mins</option>
                          <option value="In 1 Hour">In 1 Hour</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#78716c]">
                    <span>Items</span>
                    <button
                      onClick={clearCart}
                      className="text-[#a84d31] hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  {items.map((ci) => (
                    <div
                      key={ci.item.id}
                      className="bg-white p-3.5 rounded-xl border border-[#e7dfd5] flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <img
                        src={ci.item.image}
                        alt={ci.item.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#1c1917] truncate">
                          {ci.item.name}
                        </h4>
                        <span className="text-xs font-bold text-[#c25e3e]">
                          ₹{ci.item.price * ci.quantity}
                        </span>
                        <span className="text-[10px] text-[#78716c] block">
                          (₹{ci.item.price} each)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-[#f3ede4] rounded-full p-1 border border-[#e7dfd5]">
                        <button
                          onClick={() => updateQuantity(ci.item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#1c1917] hover:bg-[#e7dfd5] shadow-2xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center text-xs font-bold text-[#1c1917]">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(ci.item.id, 1)}
                          className="w-6 h-6 rounded-full bg-[#c25e3e] flex items-center justify-center text-white hover:bg-[#a84d31] shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Controls */}
          {!placedOrder && items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#e7dfd5] space-y-3">
              <div className="space-y-1.5 text-xs text-[#57534e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1c1917]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Restaurant GST & Service (5%)</span>
                  <span className="font-medium text-[#1c1917]">₹{tax}</span>
                </div>
                <div className="pt-2 border-t border-[#f3ede4] flex justify-between text-base font-bold text-[#1c1917]">
                  <span>Total Amount</span>
                  <span className="text-[#c25e3e]">₹{totalPrice}</span>
                </div>
              </div>

              <button
                disabled={isSubmitting}
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#c25e3e] hover:bg-[#a84d31] text-white font-semibold text-sm transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending to Kitchen...</span>
                ) : (
                  <>
                    <span>Confirm & Send to Kitchen</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#78716c]">
                Zero aggregator markup · Instant kitchen dispatch
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
