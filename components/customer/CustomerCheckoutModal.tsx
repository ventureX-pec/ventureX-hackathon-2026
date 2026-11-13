"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  X,
  CheckCircle2,
  Clock,
  UtensilsCrossed,
  ShoppingBag,
  CreditCard,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react"

interface CustomerCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onOrderSuccess: () => void
}

export default function CustomerCheckoutModal({
  isOpen,
  onClose,
  onOrderSuccess,
}: CustomerCheckoutModalProps) {
  const router = useRouter()
  const { cart, cartTotal, pickupSlots, placeNewOrder, currentRestaurant, kitchenWorkload } = useDineFlow()

  const [customerName, setCustomerName] = useState("Eleanor Vance")
  const [customerPhone, setCustomerPhone] = useState("+1 (555) 019-2834")
  const [diningOption, setDiningOption] = useState<"dine-in" | "takeaway">("takeaway")
  const [tableNumber, setTableNumber] = useState("Table 04")
  const [selectedSlot, setSelectedSlot] = useState(
    pickupSlots.find((s) => s.status !== "full")?.time || "7:30 PM – 7:45 PM"
  )
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null)
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName.trim() || !customerPhone.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newOrder = placeNewOrder({
        customerName,
        customerPhone,
        items: cart,
        diningOption,
        tableNumber: diningOption === "dine-in" ? tableNumber : undefined,
        pickupSlot: selectedSlot,
        specialInstructions,
      })

      setPlacedOrderId(newOrder.id)
      setPlacedOrderNumber(newOrder.orderNumber)
      setIsSubmitting(false)
    }, 600)
  }

  const handleGoToTracking = () => {
    onOrderSuccess()
    if (placedOrderId) {
      router.push(`/orders/${placedOrderId}`)
    } else {
      router.push("/orders")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => !placedOrderId && onClose()}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl border border-[#e7dfd5] shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-8">
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-[#c96342]/10 blur-2xl pointer-events-none" />

        {/* Close button */}
        {!placedOrderId && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f4ede4] text-[#57534e] hover:text-[#1c1917] hover:bg-[#e7dfd5] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {placedOrderId ? (
          /* Confirmation View */
          <div className="py-6 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#2e7d32]/10 text-[#2e7d32] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#f4ede4] text-xs font-semibold text-[#c96342] uppercase tracking-wider mb-2">
                Order Confirmed • #{placedOrderNumber}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
                Order Sent to Kitchen!
              </h3>
              <p className="text-xs sm:text-sm text-[#57534e] max-w-sm mx-auto mt-1.5 leading-relaxed">
                Thank you, <span className="font-semibold text-[#1c1917]">{customerName}</span>. Your ticket has been fired to the kitchen brigade at <span className="font-semibold text-[#1c1917]">{currentRestaurant.name}</span>.
              </p>
            </div>

            {/* Timing Ticket Card */}
            <div className="bg-white rounded-2xl border border-[#e7dfd5] p-4 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#e7dfd5]/70">
                <span className="text-[#78716c]">Order Type</span>
                <span className="font-semibold text-[#1c1917] capitalize">
                  {diningOption === "dine-in" ? `Dine-in (${tableNumber})` : "Express Takeaway"}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#e7dfd5]/70">
                <span className="text-[#78716c]">Target Pickup Slot</span>
                <span className="font-semibold text-[#c96342]">{selectedSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#78716c]">Total Paid (Demo)</span>
                <span className="font-bold text-[#1c1917] text-sm">₹{cartTotal}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleGoToTracking}
                className="w-full sm:flex-1 py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <span>Track Live Order Status</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOrderSuccess}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white border border-[#e7dfd5] text-[#57534e] hover:text-[#1c1917] text-xs font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4ede4] text-[10px] font-semibold text-[#c96342] uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>{currentRestaurant.name}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1c1917]">
                Quick Checkout
              </h3>
              <p className="text-xs text-[#78716c]">
                Zero aggregator markup. Timed directly to kitchen preparation.
              </p>
            </div>

            {/* Dining Option Toggle */}
            <div>
              <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1.5">
                Dining Option
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#f4ede4] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setDiningOption("takeaway")}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    diningOption === "takeaway"
                      ? "bg-white text-[#c96342] shadow-xs"
                      : "text-[#78716c] hover:text-[#1c1917]"
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Express Takeaway</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDiningOption("dine-in")}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    diningOption === "dine-in"
                      ? "bg-white text-[#c96342] shadow-xs"
                      : "text-[#78716c] hover:text-[#1c1917]"
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Table Dine-in</span>
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>
            </div>

            {/* Dynamic Slot or Table Selection */}
            {diningOption === "takeaway" ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c96342]" /> Available Kitchen Pickup Slots
                    </span>
                  </label>
                  {kitchenWorkload.isNearCapacity && (
                    <span className="text-[10px] text-amber-700 font-medium">
                      High Load: Earliest slots full
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1 bg-white rounded-xl border border-[#e7dfd5]">
                  {pickupSlots.map((slot) => {
                    const isFull = slot.status === "full"
                    const isSelected = selectedSlot === slot.time
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={isFull}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`p-2 rounded-lg text-left text-xs transition-all border ${
                          isSelected
                            ? "bg-[#c96342] text-white border-[#c96342] shadow-2xs"
                            : isFull
                            ? "bg-[#f4ede4]/50 border-transparent text-[#a8a29e] cursor-not-allowed"
                            : "bg-white border-[#e7dfd5] text-[#1c1917] hover:border-[#c96342]"
                        }`}
                      >
                        <div className="font-medium truncate">{slot.time}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isSelected
                              ? "text-white/80"
                              : isFull
                              ? "text-rose-600 font-semibold"
                              : slot.status === "filling"
                              ? "text-amber-600"
                              : "text-[#2e7d32]"
                          }`}
                        >
                          {isFull ? "Capacity Full" : `${slot.maxCapacity - slot.bookedCount} slots left`}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1">
                  Table Number
                </label>
                <div className="flex items-center gap-2">
                  {["Table 02", "Table 04", "Table 07", "Table 11", "Bar Seating"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setTableNumber(tab)}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all border ${
                        tableNumber === tab
                          ? "bg-[#1c1917] text-white border-[#1c1917]"
                          : "bg-white border-[#e7dfd5] text-[#57534e] hover:bg-[#f4ede4]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-[11px] font-medium text-[#57534e] uppercase tracking-wider mb-1">
                Kitchen Notes (Optional)
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Dietary notes, extra napkins, allergy alerts..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#e7dfd5] text-xs text-[#1c1917] focus:outline-none focus:border-[#c96342]"
              />
            </div>

            {/* Demo Payment Notice */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex items-start gap-2.5">
              <CreditCard className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Demo Instant Checkout</span>
                <span className="text-[11px] text-amber-800">
                  No real card required. Clicking below places this order live directly onto the Restaurant Owner&apos;s KDS Kanban board.
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow active:scale-[0.99] cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Firing Ticket to Kitchen...</span>
                ) : (
                  <>
                    <span>Confirm Order • ₹{cartTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
