"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useDineFlow, Order } from "@/context/DineFlowContext"
import {
  ShoppingBag,
  DollarSign,
  Clock,
  Flame,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  UtensilsCrossed,
  ChefHat,
  Boxes,
  Store,
  CheckCircle2,
  Plus,
  Eye,
  X,
  Sparkles,
} from "lucide-react"

export default function OwnerOverviewPage() {
  const {
    currentRestaurant,
    currentRestaurantOrders,
    currentRestaurantMenuItems,
    currentRestaurantIngredients,
    kitchenWorkload,
    updateOrderStatus,
    updateIngredientStock,
  } = useDineFlow()

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Computed metrics from real data
  const completedOrActiveOrders = currentRestaurantOrders.filter(
    (o) => o.status !== "cancelled"
  )
  const totalRevenue = completedOrActiveOrders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrdersCount = currentRestaurantOrders.filter(
    (o) => o.status === "new" || o.status === "preparing"
  ).length

  // Low stock ingredients
  const lowStockIngredients = currentRestaurantIngredients.filter(
    (i) => i.currentStock <= i.lowStockThreshold || !i.isAvailable
  )

  // Popular dishes
  const popularDishes = [...currentRestaurantMenuItems]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            New
          </span>
        )
      case "preparing":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            In Kitchen
          </span>
        )
      case "ready":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Ready
          </span>
        )
      case "completed":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-600 border border-stone-200">
            Completed
          </span>
        )
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Cancelled
          </span>
        )
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome & Restaurant Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Service Station Active • Lunch & Dinner</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Good evening, welcome back!
          </h1>
          <p className="text-sm text-[#78716c] mt-1">
            Managing <span className="font-semibold text-[#1c1917]">{currentRestaurant.name}</span> — {currentRestaurant.tagline}
          </p>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex items-center flex-wrap gap-2.5">
          <Link
            href="/owner/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-xs font-semibold transition-all shadow-xs"
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Manage Live Orders</span>
          </Link>
          <Link
            href="/owner/menu"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#faf7f2] hover:bg-[#f4ede4] text-[#1c1917] text-xs font-semibold border border-[#e7dfd5] transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#c96342]" />
            <span>Add Dish</span>
          </Link>
          <Link
            href="/owner/inventory"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#faf7f2] hover:bg-[#f4ede4] text-[#1c1917] text-xs font-semibold border border-[#e7dfd5] transition-all"
          >
            <Boxes className="w-3.5 h-3.5 text-[#c96342]" />
            <span>Inventory</span>
          </Link>
        </div>
      </div>

      {/* 4 Key Performance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Today's Orders */}
        <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
              Today&apos;s Orders
            </span>
            <div className="w-9 h-9 rounded-2xl bg-orange-50 text-[#c96342] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-serif text-3xl font-bold text-[#1c1917]">
              {currentRestaurantOrders.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-medium">+18.4%</span>
              <span className="text-[#78716c]">vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
              Today&apos;s Revenue
            </span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-serif text-3xl font-bold text-[#1c1917]">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-medium">+12.2%</span>
              <span className="text-[#78716c]">vs last week</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pending Orders */}
        <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
              Pending Orders
            </span>
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-serif text-3xl font-bold text-[#1c1917]">
              {pendingOrdersCount}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#78716c] mt-1">
              <span>{kitchenWorkload.activeOrders} tickets in active kitchen prep</span>
            </div>
          </div>
        </div>

        {/* Card 4: Avg Prep Time */}
        <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
              Avg. Prep Time
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-serif text-3xl font-bold text-[#1c1917]">
              {kitchenWorkload.avgPrepTimeMinutes} mins
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-1">
              <span className="font-medium">Normal Flow</span>
              <span className="text-[#78716c]">• On target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Orders Activity & Kitchen Workload Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Live Order Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1c1917]">
                Live Order Activity
              </h2>
              <p className="text-xs text-[#78716c]">
                Real-time tickets placed via QR dine-in & online pickup
              </p>
            </div>
            <Link
              href="/owner/orders"
              className="text-xs font-semibold text-[#c96342] hover:text-[#a84d31] inline-flex items-center gap-1"
            >
              <span>View Kanban Board</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-[#e7dfd5] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e7dfd5] bg-[#faf7f2]/60 text-[11px] font-semibold uppercase tracking-wider text-[#78716c]">
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Type & Slot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7dfd5] text-xs">
                  {currentRestaurantOrders.slice(0, 6).map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#faf7f2]/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-[#1c1917]">
                        #{order.orderNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#1c1917]">
                          {order.customerName}
                        </div>
                        <div className="text-[11px] text-[#78716c]">
                          {order.customerPhone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-[#1c1917] font-medium line-clamp-1">
                          {order.items.map((i) => `${i.quantity}x ${i.item.name}`).join(", ")}
                        </div>
                        <div className="text-[11px] text-[#78716c]">
                          ₹{order.total} • {order.items.reduce((s, i) => s + i.quantity, 0)} items
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="capitalize font-medium text-[#1c1917]">
                          {order.diningOption === "dine-in"
                            ? `Dine-in (T-${order.tableNumber})`
                            : "Takeaway"}
                        </div>
                        <div className="text-[11px] text-[#78716c] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#c96342]" />
                          <span>{order.pickupSlot}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">{getStatusBadge(order.status)}</td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status === "new" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "preparing")}
                              className="px-2.5 py-1 rounded-full bg-[#c96342] text-white text-[11px] font-semibold hover:bg-[#a84d31] transition-all"
                            >
                              Accept
                            </button>
                          )}
                          {order.status === "preparing" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "ready")}
                              className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-all"
                            >
                              Ready
                            </button>
                          )}
                          {order.status === "ready" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "completed")}
                              className="px-2.5 py-1 rounded-full bg-stone-700 text-white text-[11px] font-semibold hover:bg-black transition-all"
                            >
                              Collected
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1 rounded-lg text-[#78716c] hover:bg-[#f4ede4] hover:text-[#1c1917]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Kitchen Workload & Low Stock Alerts */}
        <div className="space-y-6">
          {/* Kitchen Workload Widget */}
          <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#c96342]" />
                <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                  Kitchen Workload
                </h3>
              </div>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  kitchenWorkload.loadPercentage > 80
                    ? "bg-rose-100 text-rose-700"
                    : kitchenWorkload.loadPercentage > 50
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {kitchenWorkload.loadPercentage}% Load
              </span>
            </div>

            {/* Load Capacity Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#78716c]">
                <span>Active tickets: {kitchenWorkload.activeOrders} / {kitchenWorkload.capacityMax}</span>
                <span>{kitchenWorkload.capacityMax - kitchenWorkload.activeOrders} slots available</span>
              </div>
              <div className="w-full bg-[#f4ede4] h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    kitchenWorkload.loadPercentage > 80
                      ? "bg-rose-500"
                      : kitchenWorkload.loadPercentage > 50
                      ? "bg-amber-500"
                      : "bg-[#c96342]"
                  }`}
                  style={{ width: `${kitchenWorkload.loadPercentage}%` }}
                />
              </div>
            </div>

            {/* Delay Warning Banner if near capacity */}
            {kitchenWorkload.isNearCapacity && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  High ticket volume. New pickup orders automatically receive an extra 10-minute prep buffer.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-[#e7dfd5] flex items-center justify-between">
              <span className="text-xs text-[#78716c]">Hearth prep station:</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Optimal
              </span>
            </div>

            <Link
              href="/owner/kitchen"
              className="block w-full text-center py-2 rounded-2xl bg-[#faf7f2] hover:bg-[#f4ede4] text-[#1c1917] text-xs font-semibold border border-[#e7dfd5] transition-all"
            >
              Open Kitchen Display (KDS)
            </Link>
          </div>

          {/* Low Stock Inventory Widget */}
          <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Boxes className="w-5 h-5 text-[#c96342]" />
                <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                  Inventory Alerts
                </h3>
              </div>
              <Link
                href="/owner/inventory"
                className="text-xs font-semibold text-[#c96342] hover:underline"
              >
                Manage
              </Link>
            </div>

            {lowStockIngredients.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#78716c]">
                All core ingredients are sufficiently stocked.
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockIngredients.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs text-[#1c1917]">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-rose-600 font-medium">
                        {item.currentStock} {item.unit} left (Threshold: {item.lowStockThreshold})
                      </div>
                    </div>
                    <button
                      onClick={() => updateIngredientStock(item.id, item.lowStockThreshold + 5)}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-[#f4ede4] text-[#1c1917] text-[11px] font-semibold border border-[#e7dfd5] transition-all"
                    >
                      + Quick Restock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Dishes Leaderboard */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1c1917]">
              Customer Favourites & Top Selling Dishes
            </h2>
            <p className="text-xs text-[#78716c]">
              Real customer engagement and high-margin dishes
            </p>
          </div>
          <Link
            href="/owner/menu"
            className="text-xs font-semibold text-[#c96342] hover:text-[#a84d31] inline-flex items-center gap-1"
          >
            <span>Full Menu Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="group p-4 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5] hover:border-[#c96342]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-full h-32 rounded-xl overflow-hidden bg-stone-100">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#c96342] uppercase tracking-wider">
                    {dish.category}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1c1917] line-clamp-1">
                    {dish.name}
                  </h4>
                  <p className="text-[11px] text-[#78716c] line-clamp-2 mt-0.5">
                    {dish.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e7dfd5] flex items-center justify-between">
                <span className="font-bold text-sm text-[#1c1917]">₹{dish.price}</span>
                <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                  ★ {dish.rating} ({dish.reviewCount})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#e7dfd5] p-6 sm:p-8 space-y-6 z-10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e7dfd5] pb-4">
              <div>
                <span className="text-xs font-semibold text-[#c96342] uppercase tracking-wider">
                  Order Details
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                  #{selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#78716c] hover:text-[#1c1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#78716c]">Customer:</span>
                <div className="font-bold text-[#1c1917]">{selectedOrder.customerName}</div>
                <div className="text-[#78716c]">{selectedOrder.customerPhone}</div>
              </div>
              <div>
                <span className="text-[#78716c]">Dining Method:</span>
                <div className="font-bold text-[#1c1917] capitalize">
                  {selectedOrder.diningOption === "dine-in"
                    ? `Table ${selectedOrder.tableNumber}`
                    : "Express Takeaway"}
                </div>
                <div className="text-[#c96342] font-semibold">{selectedOrder.pickupSlot}</div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#e7dfd5]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                Ordered Items
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items.map((ci, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs p-2.5 bg-[#faf7f2] rounded-xl"
                  >
                    <div>
                      <span className="font-semibold text-[#1c1917]">
                        {ci.quantity}x {ci.item.name}
                      </span>
                      {ci.instructions && (
                        <div className="text-[11px] text-[#c96342] italic">
                          &quot;{ci.instructions}&quot;
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-[#1c1917]">₹{ci.item.price * ci.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#e7dfd5] flex justify-between items-center">
              <div>
                <span className="text-xs text-[#78716c]">Total Bill:</span>
                <div className="font-bold text-lg text-[#1c1917]">₹{selectedOrder.total}</div>
              </div>
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
                    Mark Ready
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
                    Complete Handover
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
