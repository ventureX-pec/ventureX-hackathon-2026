"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import {
  Smartphone,
  ChefHat,
  MonitorCheck,
  LayoutDashboard,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export const MonoLivePreview = () => {
  const [activeTab, setActiveTab] = useState<"guest" | "kitchen" | "pos" | "admin">("guest");
  const { menuItems, orders, addToCart, getCartTotal, updateOrderStatus } = useRestaurant();
  const { count, total } = getCartTotal();

  const activeKitchenOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "preparing" || o.status === "ready"
  );

  return (
    <section id="interactive-demo" className="py-24 border-t border-white/10 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="mono-tag text-neutral-400">[ 05 // INTERACTIVE DEMO SANDBOX ]</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-2">
              Test Drive the Live Architecture.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="mono-tag text-emerald-400 text-xs">LOCAL PERSISTENCE ACTIVE</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between flex-wrap gap-4 p-2 rounded-2xl bg-[#141417] border border-white/10 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab("guest")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === "guest"
                  ? "bg-white text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>1. Guest Menu (Table 4)</span>
            </button>

            <button
              onClick={() => setActiveTab("kitchen")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === "kitchen"
                  ? "bg-white text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>2. Kitchen KDS ({activeKitchenOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("pos")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === "pos"
                  ? "bg-white text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <MonitorCheck className="w-3.5 h-3.5" />
              <span>3. Cashier Terminal</span>
            </button>

            <button
              onClick={() => setActiveTab("admin")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === "admin"
                  ? "bg-white text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>4. Owner Command</span>
            </button>
          </div>

          {/* Full Screen Link Button */}
          <Link
            href={
              activeTab === "guest"
                ? "/menu?table=4"
                : activeTab === "kitchen"
                ? "/kitchen"
                : activeTab === "pos"
                ? "/pos"
                : "/admin"
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs mono-tag text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>FULLSCREEN VIEW</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Live Canvas Viewport */}
        <div className="rounded-3xl bg-[#121214] border border-white/10 p-6 sm:p-8 min-h-[460px] shadow-2xl relative">
          
          {/* TAB 1: GUEST MENU */}
          {activeTab === "guest" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span>The Corner Café — Table #4</span>
                    <span className="mono-tag text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      QR SCANNED
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Tap &quot;Add&quot; to test instant reactive ordering into the kitchen.
                  </p>
                </div>

                <Link
                  href="/menu?table=4"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold self-start sm:self-auto cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Cart ({count} items • ₹{total})</span>
                </Link>
              </div>

              {/* Sample Food Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex gap-3.5 items-center group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.dietary === "veg"
                              ? "bg-emerald-500"
                              : item.dietary === "vegan"
                              ? "bg-teal-500"
                              : "bg-rose-500"
                          }`}
                        />
                        <span className="text-[10px] text-neutral-400 mono-tag">
                          {item.prepTimeMins}m prep
                        </span>
                      </div>
                      <h4 className="text-xs font-medium text-white truncate group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs font-mono text-neutral-300 mt-1">₹{item.price}</p>
                    </div>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white text-neutral-300 hover:text-black transition-all shrink-0 cursor-pointer"
                      title="Add to order"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: KITCHEN DISPLAY */}
          {activeTab === "kitchen" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-semibold text-white">Live Kitchen Display System (KDS)</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Click status badges to advance orders from Preparing to Ready!
                  </p>
                </div>
                <span className="mono-tag text-xs text-amber-400">
                  {activeKitchenOrders.length} TICKETS IN QUEUE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeKitchenOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="mono-tag text-xs font-bold text-white">
                        #{order.tokenNumber} • {order.orderType === "dine-in" ? `TABLE ${order.tableNumber}` : "TAKEAWAY"}
                      </span>
                      <span className="text-[10px] mono-tag px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                        {order.status}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300 space-y-1">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{it.quantity}x {it.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-neutral-400">₹{order.totalAmount}</span>
                      <button
                        onClick={() => {
                          const nextStatus =
                            order.status === "pending"
                              ? "preparing"
                              : order.status === "preparing"
                              ? "ready"
                              : "completed";
                          updateOrderStatus(order.id, nextStatus);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[10px] mono-tag font-bold bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        {order.status === "pending"
                          ? "START PREP"
                          : order.status === "preparing"
                          ? "MARK READY"
                          : "SERVE"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: POS CASHIER */}
          {activeTab === "pos" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-semibold text-white">Counter Cashier Register</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Fast walk-in billing and physical table occupancy map.
                  </p>
                </div>
                <Link
                  href="/pos"
                  className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200"
                >
                  Open Full POS
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((tbl) => {
                  const isOccupied = tbl === 3 || tbl === 4 || tbl === 7;
                  return (
                    <div
                      key={tbl}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between h-24 ${
                        isOccupied
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                          : "bg-white/[0.02] border-white/5 text-neutral-400"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="mono-tag text-xs font-bold">TABLE {tbl}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isOccupied ? "bg-amber-400" : "bg-neutral-600"
                          }`}
                        />
                      </div>
                      <span className="text-[10px] mono-tag">
                        {isOccupied ? "DINING (BILL OPEN)" : "AVAILABLE"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: OWNER ADMIN */}
          {activeTab === "admin" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-semibold text-white">Owner Command & AI Digitizer</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Live revenue, 1-click stock 86&apos;ing, and AI menu generator.
                  </p>
                </div>
                <Link
                  href="/admin"
                  className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200"
                >
                  Open Admin Hub
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="mono-tag text-[9px] text-neutral-400">TODAY&apos;S NET REVENUE</p>
                  <p className="text-3xl font-medium text-white mt-1">₹14,820</p>
                  <p className="text-[10px] text-emerald-400 mt-1">0% commission deducted</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="mono-tag text-[9px] text-neutral-400">AVG TICKET TURNAROUND</p>
                  <p className="text-3xl font-medium text-white mt-1">9.2 mins</p>
                  <p className="text-[10px] text-sky-400 mt-1">-68% vs manual counter</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="mono-tag text-[9px] text-neutral-400">AI MENU DIGITIZER</p>
                  <p className="text-sm font-medium text-white mt-2">Ready to parse photo / PDF</p>
                  <p className="text-[10px] text-amber-400 mt-1">Extracts dishes, tags & prices</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
