"use client"

import React, { useState } from "react"
import Link from "next/link"
import CustomerNavbar from "@/components/customer/CustomerNavbar"
import CustomerCartDrawer from "@/components/customer/CustomerCartDrawer"
import Footer from "@/components/Footer"
import { useDineFlow, Order } from "@/context/DineFlowContext"
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  UtensilsCrossed,
  MapPin,
  ChevronRight,
  Flame,
} from "lucide-react"

export default function MyOrdersPage() {
  const { orders, addToCart, setIsCartDrawerOpen } = useDineFlow()
  const [filterTab, setFilterTab] = useState<"all" | "active" | "past">("all")

  const activeOrders = orders.filter(
    (o) => o.status === "new" || o.status === "preparing" || o.status === "ready"
  )
  const pastOrders = orders.filter(
    (o) => o.status === "completed" || o.status === "cancelled"
  )

  const displayedOrders =
    filterTab === "active" ? activeOrders : filterTab === "past" ? pastOrders : orders

  const handleReorder = (order: Order) => {
    order.items.forEach((ci) => {
      if (ci.item.isAvailable) {
        addToCart(ci.item, ci.quantity, ci.instructions)
      }
    })
    setIsCartDrawerOpen(true)
  }

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 text-xs font-bold border border-blue-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Ticket Received</span>
          </span>
        )
      case "preparing":
        return (
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold border border-amber-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span>Firing in Kitchen</span>
          </span>
        )
      case "ready":
        return (
          <span className="px-3 py-1 rounded-full bg-[#2e7d32]/10 text-[#2e7d32] text-xs font-bold border border-[#2e7d32]/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready for Pickup</span>
          </span>
        )
      case "completed":
        return (
          <span className="px-3 py-1 rounded-full bg-[#f4ede4] text-[#57534e] text-xs font-medium">
            Completed
          </span>
        )
      case "cancelled":
        return (
          <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 text-xs font-medium">
            Cancelled
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col">
      <CustomerNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c96342]">
              ORDER HISTORY & LIVE TRACKING
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917] tracking-tight mt-1">
              My Dining Orders
            </h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#e7dfd5] shadow-2xs">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterTab === "all"
                  ? "bg-[#1c1917] text-white shadow-xs"
                  : "text-[#57534e] hover:text-[#1c1917]"
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setFilterTab("active")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterTab === "active"
                  ? "bg-[#c96342] text-white shadow-xs"
                  : "text-[#57534e] hover:text-[#1c1917]"
              }`}
            >
              Active ({activeOrders.length})
            </button>
            <button
              onClick={() => setFilterTab("past")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterTab === "past"
                  ? "bg-[#1c1917] text-white shadow-xs"
                  : "text-[#57534e] hover:text-[#1c1917]"
              }`}
            >
              Past ({pastOrders.length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        {displayedOrders.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#e7dfd5] p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#f4ede4] flex items-center justify-center mx-auto text-[#c96342]">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                No orders in this view
              </h3>
              <p className="text-xs text-[#78716c] max-w-sm mx-auto mt-1">
                Explore our partner restaurants and order freshly prepared meals with live kitchen tracking.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#c96342] text-white text-xs font-semibold shadow-xs"
            >
              <span>Explore Restaurants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {displayedOrders.map((order) => {
              const isActive =
                order.status === "new" || order.status === "preparing" || order.status === "ready"
              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-3xl border border-[#e7dfd5] p-6 shadow-xs transition-all hover:border-[#c96342]/40 ${
                    isActive ? "ring-2 ring-[#c96342]/20" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e7dfd5]/80">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg font-bold text-[#1c1917]">
                          {order.restaurantName}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#f4ede4] text-[11px] font-mono font-semibold text-[#57534e]">
                          #{order.orderNumber}
                        </span>
                      </div>
                      <span className="text-xs text-[#78716c] mt-0.5 block">
                        Ordered at {order.orderTime} • {order.diningOption === "dine-in" ? `Dine-in (${order.tableNumber})` : `Takeaway Slot: ${order.pickupSlot}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="py-4 space-y-2">
                    {order.items.map((ci, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-[#57534e]">
                        <span className="flex items-center gap-2">
                          <span className="font-bold text-[#1c1917]">{ci.quantity}x</span>
                          <span>{ci.item.name}</span>
                          {ci.instructions && (
                            <span className="text-[10px] text-[#c96342] italic">
                              ({ci.instructions})
                            </span>
                          )}
                        </span>
                        <span className="font-medium text-[#1c1917]">
                          ₹{ci.item.price * ci.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-4 border-t border-[#e7dfd5]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-[#78716c]">
                      <span>Total Paid: </span>
                      <span className="font-bold text-sm text-[#1c1917]">₹{order.total}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {isActive ? (
                        <Link
                          href={`/orders/${order.id}`}
                          className="px-5 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Track Live Preparation</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleReorder(order)}
                          className="px-4 py-2 rounded-full bg-[#f4ede4] hover:bg-[#c96342] text-[#1c1917] hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reorder Dishes</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
      <CustomerCartDrawer />
    </div>
  )
}
