"use client"

import React, { useState } from "react"
import { useDineFlow, Order } from "@/context/DineFlowContext"
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Printer,
  ChevronRight,
  X,
  Phone,
  Flame,
  UtensilsCrossed,
  PackageCheck,
  ShoppingBag,
} from "lucide-react"

export default function LiveOrdersPage() {
  const { currentRestaurantOrders, updateOrderStatus, placeNewOrder, currentRestaurantMenuItems } = useDineFlow()

  const [searchQuery, setSearchQuery] = useState("")
  const [diningFilter, setDiningFilter] = useState<"all" | "dine-in" | "takeaway">("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [quickOrderModalOpen, setQuickOrderModalOpen] = useState(false)

  // Quick order state
  const [walkinName, setWalkinName] = useState("")
  const [walkinTable, setWalkinTable] = useState("4")
  const [walkinItemId, setWalkinItemId] = useState(currentRestaurantMenuItems[0]?.id || "")

  // Filter orders
  const filteredOrders = currentRestaurantOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery)
    const matchesFilter =
      diningFilter === "all" || order.diningOption === diningFilter
    return matchesSearch && matchesFilter
  })

  // Buckets
  const newOrders = filteredOrders.filter((o) => o.status === "new")
  const preparingOrders = filteredOrders.filter((o) => o.status === "preparing")
  const readyOrders = filteredOrders.filter((o) => o.status === "ready")
  const completedOrders = filteredOrders.filter((o) => o.status === "completed")

  const handleCreateWalkinOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const item = currentRestaurantMenuItems.find((m) => m.id === walkinItemId)
    if (!item) return

    placeNewOrder({
      customerName: walkinName.trim() || "Walk-in Guest",
      customerPhone: "+1 (555) 000-0000",
      diningOption: "dine-in",
      tableNumber: walkinTable,
      pickupSlot: "Immediate",
      specialInstructions: "Direct kitchen walk-in ticket",
      items: [
        {
          item,
          quantity: 1,
        },
      ],
    })

    setWalkinName("")
    setQuickOrderModalOpen(false)
  }

  const renderKanbanCard = (order: Order) => (
    <div
      key={order.id}
      onClick={() => setSelectedOrder(order)}
      className="bg-white rounded-2xl p-4 border border-[#e7dfd5] hover:border-[#c96342]/50 transition-all shadow-xs space-y-3 cursor-pointer group"
    >
      {/* Header: Order ID & Dining badge */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-[#1c1917] group-hover:text-[#c96342] transition-colors">
          #{order.orderNumber}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
            order.diningOption === "dine-in"
              ? "bg-amber-100 text-amber-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {order.diningOption === "dine-in" ? `Table ${order.tableNumber}` : "Takeaway"}
        </span>
      </div>

      {/* Customer Info */}
      <div>
        <h4 className="font-semibold text-xs text-[#1c1917]">
          {order.customerName}
        </h4>
        <div className="text-[11px] text-[#78716c] flex items-center gap-1 mt-0.5">
          <Clock className="w-3 h-3 text-[#c96342]" />
          <span>Slot: {order.pickupSlot}</span>
        </div>
      </div>

      {/* Items list */}
      <div className="pt-2 border-t border-[#f4ede4] space-y-1">
        {order.items.map((ci, idx) => (
          <div key={idx} className="flex justify-between text-xs text-[#57534e]">
            <span className="line-clamp-1">
              <span className="font-bold text-[#1c1917]">{ci.quantity}x</span> {ci.item.name}
            </span>
          </div>
        ))}
      </div>

      {order.specialInstructions && (
        <div className="text-[11px] leading-relaxed text-[#c96342] bg-[#f4ede4]/60 p-2.5 rounded-xl italic">
          Note: &quot;{order.specialInstructions}&quot;
        </div>
      )}

      {/* Card Action footer */}
      <div
        className="pt-2 border-t border-[#f4ede4] flex items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-bold text-xs text-[#1c1917]">₹{order.total}</span>

        <div className="flex items-center gap-1.5">
          {order.status === "new" && (
            <>
              <button
                onClick={() => updateOrderStatus(order.id, "cancelled")}
                className="px-2 py-1 rounded-lg text-[11px] font-medium text-rose-600 hover:bg-rose-50"
              >
                Reject
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, "preparing")}
                className="px-3 py-1 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-[11px] font-semibold transition-all shadow-xs"
              >
                Accept & Prep
              </button>
            </>
          )}

          {order.status === "preparing" && (
            <button
              onClick={() => updateOrderStatus(order.id, "ready")}
              className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-all shadow-xs"
            >
              Mark Ready
            </button>
          )}

          {order.status === "ready" && (
            <button
              onClick={() => updateOrderStatus(order.id, "completed")}
              className="px-3 py-1 rounded-full bg-stone-800 hover:bg-black text-white text-[11px] font-semibold transition-all shadow-xs"
            >
              Handover
            </button>
          )}

          {order.status === "completed" && (
            <span className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-stone-400" />
              Done
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1917]">
            Live Orders Pipeline
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Active kitchen queue & dining service tracker
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716c]" />
            <input
              type="text"
              placeholder="Search order, customer, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-full bg-[#faf7f2] border border-[#e7dfd5] text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c96342] w-52 sm:w-64"
            />
          </div>

          {/* Dining Filter */}
          <div className="flex items-center bg-[#faf7f2] rounded-full p-1 border border-[#e7dfd5] text-xs">
            <button
              onClick={() => setDiningFilter("all")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                diningFilter === "all"
                  ? "bg-[#c96342] text-white shadow-2xs"
                  : "text-[#78716c] hover:text-[#1c1917]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDiningFilter("dine-in")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                diningFilter === "dine-in"
                  ? "bg-[#c96342] text-white shadow-2xs"
                  : "text-[#78716c] hover:text-[#1c1917]"
              }`}
            >
              Dine-In
            </button>
            <button
              onClick={() => setDiningFilter("takeaway")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                diningFilter === "takeaway"
                  ? "bg-[#c96342] text-white shadow-2xs"
                  : "text-[#78716c] hover:text-[#1c1917]"
              }`}
            >
              Takeaway
            </button>
          </div>

          {/* Quick Walkin Ticket */}
          <button
            onClick={() => setQuickOrderModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1c1917] hover:bg-black text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#c96342]" />
            <span>Walk-In Order</span>
          </button>
        </div>
      </div>

      {/* 4-Column Kanban Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Column 1: New Orders */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-[#1c1917]">
                New Orders
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              {newOrders.length}
            </span>
          </div>

          <div className="bg-[#f7f3ee] rounded-3xl p-3 min-h-[500px] space-y-3 border border-[#e7dfd5]">
            {newOrders.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-xs text-[#78716c]">
                <UtensilsCrossed className="w-6 h-6 text-[#d6cbbe] mb-2" />
                <p>No new orders pending acceptance.</p>
              </div>
            ) : (
              newOrders.map(renderKanbanCard)
            )}
          </div>
        </div>

        {/* Column 2: In Kitchen / Preparing */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-[#1c1917]">
                Preparing
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {preparingOrders.length}
            </span>
          </div>

          <div className="bg-[#f7f3ee] rounded-3xl p-3 min-h-[500px] space-y-3 border border-[#e7dfd5]">
            {preparingOrders.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-xs text-[#78716c]">
                <Flame className="w-6 h-6 text-[#d6cbbe] mb-2" />
                <p>No active kitchen tickets being fired.</p>
              </div>
            ) : (
              preparingOrders.map(renderKanbanCard)
            )}
          </div>
        </div>

        {/* Column 3: Ready for Pickup */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-[#1c1917]">
                Ready for Pickup
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {readyOrders.length}
            </span>
          </div>

          <div className="bg-[#f7f3ee] rounded-3xl p-3 min-h-[500px] space-y-3 border border-[#e7dfd5]">
            {readyOrders.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-xs text-[#78716c]">
                <PackageCheck className="w-6 h-6 text-[#d6cbbe] mb-2" />
                <p>No dishes currently awaiting collection.</p>
              </div>
            ) : (
              readyOrders.map(renderKanbanCard)
            )}
          </div>
        </div>

        {/* Column 4: Completed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-stone-500" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-[#1c1917]">
                Completed
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-stone-200 text-stone-700">
              {completedOrders.length}
            </span>
          </div>

          <div className="bg-[#f7f3ee] rounded-3xl p-3 min-h-[500px] space-y-3 border border-[#e7dfd5]">
            {completedOrders.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-xs text-[#78716c]">
                <CheckCircle2 className="w-6 h-6 text-[#d6cbbe] mb-2" />
                <p>No completed orders yet today.</p>
              </div>
            ) : (
              completedOrders.map(renderKanbanCard)
            )}
          </div>
        </div>
      </div>

      {/* Quick Walk-In Order Modal */}
      {quickOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setQuickOrderModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#e7dfd5] p-6 space-y-5 z-10 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                Create Walk-In Ticket
              </h3>
              <button
                onClick={() => setQuickOrderModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#78716c]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWalkinOrder} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Customer / Table Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Table 4 Guest or Alexander"
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Table Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4"
                  value={walkinTable}
                  onChange={(e) => setWalkinTable(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1c1917] mb-1">
                  Select Dish to Fire
                </label>
                <select
                  value={walkinItemId}
                  onChange={(e) => setWalkinItemId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-[#1c1917] focus:outline-none focus:border-[#c96342]"
                >
                  {currentRestaurantMenuItems.map((dish) => (
                    <option key={dish.id} value={dish.id}>
                      {dish.name} (₹{dish.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickOrderModalOpen(false)}
                  className="px-4 py-2 rounded-full text-[#78716c] hover:bg-[#faf7f2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white font-semibold shadow-xs"
                >
                  Send to Kitchen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Full Detail & Receipt Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#e7dfd5] p-6 sm:p-8 space-y-6 z-10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e7dfd5] pb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#c96342]">
                  Order Slip #{selectedOrder.orderNumber}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                  {selectedOrder.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#78716c]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#faf7f2] p-4 rounded-2xl border border-[#e7dfd5]">
              <div>
                <span className="text-[#78716c]">Order Type:</span>
                <div className="font-bold text-[#1c1917] capitalize">
                  {selectedOrder.diningOption === "dine-in"
                    ? `Dine-In • Table ${selectedOrder.tableNumber}`
                    : "Express Takeaway"}
                </div>
                <div className="text-[11px] text-[#78716c] mt-1">
                  Ordered at: {selectedOrder.orderTime}
                </div>
              </div>
              <div>
                <span className="text-[#78716c]">Target Pickup Slot:</span>
                <div className="font-bold text-[#c96342]">{selectedOrder.pickupSlot}</div>
                <div className="text-[11px] text-[#78716c] mt-1">
                  Phone: {selectedOrder.customerPhone}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                Ticket Items
              </span>
              <div className="space-y-2">
                {selectedOrder.items.map((ci, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#faf7f2] rounded-xl flex items-start justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#1c1917]">
                        {ci.quantity}x {ci.item.name}
                      </div>
                      <div className="text-[11px] text-[#78716c]">
                        Prep time: ~{ci.item.prepTimeMinutes} mins
                      </div>
                      {ci.instructions && (
                        <div className="text-[11px] text-[#c96342] italic mt-0.5">
                          Chef note: &quot;{ci.instructions}&quot;
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-[#1c1917]">
                      ₹{ci.item.price * ci.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#e7dfd5] flex items-center justify-between text-xs">
              <span className="text-[#78716c]">Total Order Value:</span>
              <span className="font-bold text-lg text-[#1c1917]">₹{selectedOrder.total}</span>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#faf7f2] hover:bg-[#f4ede4] text-[#1c1917] text-xs font-semibold border border-[#e7dfd5]"
              >
                <Printer className="w-3.5 h-3.5 text-[#78716c]" />
                <span>Print Kitchen KOT</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedOrder.status === "new" && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, "preparing")
                      setSelectedOrder(null)
                    }}
                    className="px-4 py-2 rounded-full bg-[#c96342] text-white text-xs font-semibold hover:bg-[#a84d31]"
                  >
                    Accept to Kitchen
                  </button>
                )}
                {selectedOrder.status === "preparing" && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, "ready")
                      setSelectedOrder(null)
                    }}
                    className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                  >
                    Mark Dish Ready
                  </button>
                )}
                {selectedOrder.status === "ready" && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, "completed")
                      setSelectedOrder(null)
                    }}
                    className="px-4 py-2 rounded-full bg-stone-800 text-white text-xs font-semibold hover:bg-black"
                  >
                    Handover Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
