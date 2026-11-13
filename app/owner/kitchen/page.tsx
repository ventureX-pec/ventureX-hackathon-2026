"use client"

import React, { useState } from "react"
import { useDineFlow, Order } from "@/context/DineFlowContext"
import {
  ChefHat,
  Flame,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Volume2,
  VolumeX,
  CheckSquare,
  Square,
  ArrowRight,
  Filter,
} from "lucide-react"

export default function SmartKitchenPage() {
  const { currentRestaurantOrders, updateOrderStatus, kitchenWorkload } = useDineFlow()

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [stationFilter, setStationFilter] = useState<string>("all")
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({})

  // Only active kitchen tickets
  const activeKitchenOrders = currentRestaurantOrders.filter(
    (o) => o.status === "preparing" || o.status === "new"
  )

  const toggleItemDone = (key: string) => {
    setCompletedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top KDS Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Kitchen Display System (KDS) • Station Lead</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Smart Kitchen & Order Flow
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Real-time ticket pacing, prep timers, and capacity load balancing
          </p>
        </div>

        {/* Workload Status & Sound Alert Toggle */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-3 bg-[#faf7f2] p-2.5 px-4 rounded-2xl border border-[#e7dfd5]">
            <div className="text-right">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                Kitchen Load
              </div>
              <div className="font-bold text-sm text-[#1c1917]">
                {kitchenWorkload.loadPercentage}% ({kitchenWorkload.activeOrders}/{kitchenWorkload.capacityMax} tickets)
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-[#e7dfd5] flex items-center justify-center">
              <Flame
                className={`w-5 h-5 ${
                  kitchenWorkload.loadPercentage > 80
                    ? "text-rose-500 animate-bounce"
                    : kitchenWorkload.loadPercentage > 50
                    ? "text-amber-500"
                    : "text-[#c96342]"
                }`}
              />
            </div>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 rounded-2xl bg-[#faf7f2] hover:bg-[#f4ede4] text-[#1c1917] border border-[#e7dfd5] transition-all"
            title={soundEnabled ? "Mute kitchen bell" : "Enable kitchen bell"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#c96342]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#78716c]" />
            )}
          </button>
        </div>
      </div>

      {/* Delay Warning Alert if load is heavy */}
      {kitchenWorkload.isNearCapacity && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-3xl flex items-center justify-between text-amber-900 text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Heavy Kitchen Volume Detected:</span> Customer pickup
              slots are automatically extended to prevent order backups.
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-semibold text-[11px]">
            +10 min buffer active
          </span>
        </div>
      )}

      {/* Timeline Forecast: Next 15m, 30m, 45m */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-[#e7dfd5] shadow-xs flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
              Next 15 Mins
            </div>
            <div className="font-serif text-xl font-bold text-[#1c1917]">
              {Math.min(activeKitchenOrders.length, 3)} Pickups
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold shrink-0 whitespace-nowrap">
            On Track
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#e7dfd5] shadow-xs flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
              Next 30 Mins
            </div>
            <div className="font-serif text-xl font-bold text-[#1c1917]">
              4 Scheduled
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold shrink-0 whitespace-nowrap">
            Balanced
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#e7dfd5] shadow-xs flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
              Next 45 Mins
            </div>
            <div className="font-serif text-xl font-bold text-[#1c1917]">
              2 Scheduled
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold shrink-0 whitespace-nowrap">
            Low Volume
          </span>
        </div>
      </div>

      {/* Active Kitchen Tickets Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[#1c1917]">
            Active Preparation Tickets ({activeKitchenOrders.length})
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#78716c]">Station:</span>
            <select
              value={stationFilter}
              onChange={(e) => setStationFilter(e.target.value)}
              className="px-3 py-1 rounded-full bg-white border border-[#e7dfd5] text-[#1c1917] focus:outline-none"
            >
              <option value="all">All Stations</option>
              <option value="hearth">Hearth & Grill</option>
              <option value="garde">Garde Manger / Cold</option>
              <option value="saute">Sauté & Pastry</option>
            </select>
          </div>
        </div>

        {activeKitchenOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e7dfd5] space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#1c1917]">
              Kitchen Board is Clear!
            </h3>
            <p className="text-xs text-[#78716c] max-w-sm mx-auto">
              No pending tickets right now. When customers place orders via their table QR or takeaway portal, tickets appear here instantly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeKitchenOrders.map((order, orderIdx) => {
              const isUrgent = orderIdx === 0
              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-3xl p-6 border transition-all shadow-xs flex flex-col justify-between ${
                    isUrgent
                      ? "border-[#c96342] ring-2 ring-[#c96342]/10"
                      : "border-[#e7dfd5]"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Ticket Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#e7dfd5]">
                      <div>
                        <div className="font-mono text-base font-bold text-[#1c1917]">
                          #{order.orderNumber}
                        </div>
                        <div className="text-xs text-[#78716c]">
                          {order.diningOption === "dine-in"
                            ? `Table ${order.tableNumber}`
                            : "Takeaway"}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-[#c96342]">
                          <Clock className="w-3 h-3" />
                          <span>{order.pickupSlot}</span>
                        </span>
                        <div className="text-[11px] text-[#78716c] mt-0.5">
                          Ordered: {order.orderTime}
                        </div>
                      </div>
                    </div>

                    {/* Customer & Notes */}
                    <div className="text-xs">
                      <div className="font-bold text-[#1c1917]">
                        Guest: {order.customerName}
                      </div>
                      {order.specialInstructions && (
                        <div className="mt-1 p-2 bg-amber-50 rounded-xl text-amber-900 text-[11px] font-medium border border-amber-200">
                          Special Note: &quot;{order.specialInstructions}&quot;
                        </div>
                      )}
                    </div>

                    {/* Checkable Item Plating List */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                        Items to Fire & Plate
                      </span>
                      <div className="space-y-2">
                        {order.items.map((ci, itemIdx) => {
                          const itemKey = `${order.id}-${itemIdx}`
                          const isDone = !!completedItems[itemKey]
                          return (
                            <div
                              key={itemIdx}
                              onClick={() => toggleItemDone(itemKey)}
                              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                                isDone
                                  ? "bg-stone-50 border-stone-200 text-stone-400 line-through"
                                  : "bg-[#faf7f2] border-[#e7dfd5] text-[#1c1917] hover:border-[#c96342]/40"
                              }`}
                            >
                              <button
                                type="button"
                                className="mt-0.5 text-[#c96342] shrink-0"
                              >
                                {isDone ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Square className="w-4 h-4 text-[#78716c]" />
                                )}
                              </button>
                              <div className="flex-1">
                                <div className="font-bold">
                                  {ci.quantity}x {ci.item.name}
                                </div>
                                <div className="text-[11px] text-[#78716c]">
                                  Ingredients: {ci.item.ingredients.slice(0, 3).join(", ")}
                                </div>
                                {ci.instructions && (
                                  <div className="text-[11px] text-[#c96342] italic mt-0.5">
                                    {ci.instructions}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Advance Action */}
                  <div className="pt-5 border-t border-[#e7dfd5] mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#78716c]">
                      Status: {order.status === "new" ? "Pending Accept" : "Firing"}
                    </span>

                    {order.status === "new" ? (
                      <button
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                        className="px-4 py-2 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-semibold transition-all shadow-xs"
                      >
                        Start Firing Ticket
                      </button>
                    ) : (
                      <button
                        onClick={() => updateOrderStatus(order.id, "ready")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs"
                      >
                        <span>Bump to Ready</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
