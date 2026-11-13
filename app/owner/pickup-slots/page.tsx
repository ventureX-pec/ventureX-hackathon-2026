"use client"

import React, { useState } from "react"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  Clock,
  Users,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react"

export default function PickupSlotsPage() {
  const { pickupSlots, updateSlotCapacity, kitchenWorkload } = useDineFlow()
  const [autoPacingEnabled, setAutoPacingEnabled] = useState(true)

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Pacing & Capacity Management</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Pickup Slot Capacities
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Throttle orders per 15-minute interval so the hearth kitchen never gets overwhelmed
          </p>
        </div>

        {/* Dynamic Kitchen Status Badge */}
        <div className="flex items-center gap-3 bg-[#faf7f2] p-3 px-5 rounded-2xl border border-[#e7dfd5]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
              Smart Pacing Algorithm
            </div>
            <div className="font-bold text-xs text-[#1c1917]">
              {autoPacingEnabled ? "Active • Dynamically Throttled" : "Manual Override"}
            </div>
          </div>
          <button
            onClick={() => setAutoPacingEnabled(!autoPacingEnabled)}
            className={`w-10 h-6 rounded-full transition-colors relative ${
              autoPacingEnabled ? "bg-[#c96342]" : "bg-stone-300"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                autoPacingEnabled ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Info Callout */}
      <div className="p-4 bg-white rounded-3xl border border-[#e7dfd5] flex items-center justify-between gap-4 shadow-xs text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0 text-[#c96342]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-[#1c1917]">Customer Checkout Sync:</span> When a customer selects takeaway or dine-in, our checkout modal displays these exact slots. Full slots are automatically greyed out to prevent queue overruns.
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="font-bold text-[#1c1917]">
            {pickupSlots.filter((s) => s.status === "full").length}
          </span>
          <span className="text-[#78716c]"> / {pickupSlots.length} slots capped</span>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {pickupSlots.map((slot) => {
          const occupancy = Math.round((slot.bookedCount / slot.maxCapacity) * 100)
          const isFull = slot.bookedCount >= slot.maxCapacity

          return (
            <div
              key={slot.time}
              className={`bg-white rounded-3xl p-6 border transition-all shadow-xs space-y-4 ${
                isFull
                  ? "border-rose-300 bg-rose-50/20"
                  : occupancy >= 70
                  ? "border-amber-300"
                  : "border-[#e7dfd5]"
              }`}
            >
              {/* Slot Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c96342]" />
                  <span className="font-serif text-lg font-bold text-[#1c1917]">
                    {slot.time}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isFull
                      ? "bg-rose-100 text-rose-700"
                      : occupancy >= 70
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {isFull ? "Full" : occupancy >= 70 ? "Filling Fast" : "Available"}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#78716c]">
                  <span>Booked: {slot.bookedCount} tickets</span>
                  <span>Cap: {slot.maxCapacity}</span>
                </div>
                <div className="w-full bg-[#f4ede4] h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isFull
                        ? "bg-rose-500"
                        : occupancy >= 70
                        ? "bg-amber-500"
                        : "bg-[#c96342]"
                    }`}
                    style={{ width: `${Math.min(100, occupancy)}%` }}
                  />
                </div>
              </div>

              {/* Slot Capacity Stepper */}
              <div className="pt-3 border-t border-[#f4ede4] flex items-center justify-between">
                <span className="text-xs text-[#78716c]">Max Order Limit:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateSlotCapacity(slot.time, Math.max(1, slot.maxCapacity - 1))
                    }
                    className="w-7 h-7 rounded-lg bg-[#faf7f2] hover:bg-[#f4ede4] border border-[#e7dfd5] flex items-center justify-center text-[#1c1917] transition-all"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono font-bold text-xs w-6 text-center text-[#1c1917]">
                    {slot.maxCapacity}
                  </span>
                  <button
                    onClick={() =>
                      updateSlotCapacity(slot.time, slot.maxCapacity + 1)
                    }
                    className="w-7 h-7 rounded-lg bg-[#faf7f2] hover:bg-[#f4ede4] border border-[#e7dfd5] flex items-center justify-center text-[#1c1917] transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
