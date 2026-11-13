"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRestaurant } from "@/context/RestaurantContext";
import {
  TrendingUp,
  Clock,
  ShoppingBag,
  ChefHat,
  MonitorCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  DollarSign,
  UtensilsCrossed,
  Filter,
} from "lucide-react";

export const ProductShowcase = () => {
  const { orders, menuItems, restaurant } = useRestaurant();
  const [filterType, setFilterType] = useState<"all" | "dine-in" | "takeaway">("all");

  const filteredOrders = orders.filter((o) => {
    if (filterType === "all") return true;
    return o.orderType === filterType;
  });

  return (
    <section id="product-showcase" className="py-20 sm:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Unified Control Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#252522] mt-3">
            One Clear Dashboard for Your Whole Operation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            Everything happening in your dining room, at the front counter, and in the kitchen, 
            synchronized into a clean, intuitive command view.
          </p>
        </div>

        {/* Big Large Showcase Card */}
        <div className="rounded-3xl bg-white border border-[#ECE7DE] shadow-elevated overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="p-6 sm:p-8 bg-[#FAF8F3] border-b border-[#ECE7DE] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5F7A65]" />
                <h3 className="text-lg font-bold text-[#252522]">{restaurant.name}</h3>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#EBF1ED] text-[#5F7A65] border border-[#D5E1D8]">
                  Service Active
                </span>
              </div>
              <p className="text-xs text-[#6E6D66] mt-1">
                {restaurant.address} • 14 Dining Tables Online
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/menu?table=4"
                className="px-3.5 py-2 rounded-xl bg-white border border-[#ECE7DE] text-xs font-medium text-[#252522] hover:bg-[#F3EFE8] transition-colors"
              >
                Table 4 Guest Menu
              </Link>
              <Link
                href="/kitchen"
                className="px-3.5 py-2 rounded-xl bg-white border border-[#ECE7DE] text-xs font-medium text-[#252522] hover:bg-[#F3EFE8] transition-colors flex items-center gap-1.5"
              >
                <ChefHat className="w-3.5 h-3.5 text-[#D66B43]" />
                <span>Kitchen KDS</span>
              </Link>
              <Link
                href="/pos"
                className="px-3.5 py-2 rounded-xl bg-white border border-[#ECE7DE] text-xs font-medium text-[#252522] hover:bg-[#F3EFE8] transition-colors flex items-center gap-1.5"
              >
                <MonitorCheck className="w-3.5 h-3.5 text-[#5F7A65]" />
                <span>Cashier POS</span>
              </Link>
              <Link
                href="/admin"
                className="px-3.5 py-2 rounded-xl bg-[#D66B43] text-white text-xs font-semibold hover:bg-[#BF5832] transition-colors flex items-center gap-1.5"
              >
                <span>Full Admin Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Metric KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#ECE7DE] border-b border-[#ECE7DE] bg-white">
            <div className="p-6">
              <p className="text-xs text-[#6E6D66] font-medium">Today&apos;s Revenue</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#252522] mt-1">₹14,820</p>
              <p className="text-xs text-[#5F7A65] font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>100% Direct (0% Fees)</span>
              </p>
            </div>

            <div className="p-6">
              <p className="text-xs text-[#6E6D66] font-medium">Orders Handled</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#252522] mt-1">42 Tickets</p>
              <p className="text-xs text-[#6E6D66] mt-1">26 Dine-in • 16 Takeaway</p>
            </div>

            <div className="p-6">
              <p className="text-xs text-[#6E6D66] font-medium">Avg Prep Turnaround</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#252522] mt-1">8.2 mins</p>
              <p className="text-xs text-[#5F7A65] font-medium mt-1">-58% wait time reduction</p>
            </div>

            <div className="p-6">
              <p className="text-xs text-[#6E6D66] font-medium">Active Dining Tables</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#252522] mt-1">9 of 14</p>
              <p className="text-xs text-[#6E6D66] mt-1">64% Floor Occupancy</p>
            </div>
          </div>

          {/* Interactive Orders & Kitchen Status Split */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Live Order Tickets Stream */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-[#252522]">Live Order Feed</h4>
                  <p className="text-xs text-[#6E6D66]">Real-time orders originating from table QR and pickup</p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE]">
                  <button
                    onClick={() => setFilterType("all")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filterType === "all" ? "bg-white text-[#252522] shadow-xs" : "text-[#6E6D66]"
                    }`}
                  >
                    All Orders
                  </button>
                  <button
                    onClick={() => setFilterType("dine-in")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filterType === "dine-in" ? "bg-white text-[#252522] shadow-xs" : "text-[#6E6D66]"
                    }`}
                  >
                    Dine-In
                  </button>
                  <button
                    onClick={() => setFilterType("takeaway")}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filterType === "takeaway" ? "bg-white text-[#252522] shadow-xs" : "text-[#6E6D66]"
                    }`}
                  >
                    Takeaway
                  </button>
                </div>
              </div>

              {/* Orders List Table */}
              <div className="divide-y divide-[#F7F4EE] rounded-2xl border border-[#ECE7DE] overflow-hidden">
                {filteredOrders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className="p-4 sm:p-4.5 bg-white hover:bg-[#FAF8F3] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-center font-bold text-xs text-[#252522] shrink-0">
                        #{order.tokenNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#252522]">
                            {order.customerName}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              order.orderType === "dine-in"
                                ? "bg-[#FAF2EE] text-[#D66B43]"
                                : "bg-[#EBF1ED] text-[#5F7A65]"
                            }`}
                          >
                            {order.orderType === "dine-in"
                              ? `Table ${order.tableNumber}`
                              : `Takeaway • ${order.pickupTime || "Immediate"}`}
                          </span>
                        </div>
                        <p className="text-xs text-[#6E6D66] mt-0.5">
                          {order.items.map((it) => `${it.quantity}x ${it.name}`).join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pl-13 sm:pl-0">
                      <span className="text-sm font-bold text-[#252522]">
                        ₹{order.totalAmount}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                          order.status === "preparing"
                            ? "bg-[#FAF2EE] text-[#D66B43]"
                            : order.status === "ready"
                            ? "bg-[#EBF1ED] text-[#5F7A65]"
                            : "bg-[#F3EFE8] text-[#252522]"
                        }`}
                      >
                        {order.status === "preparing"
                          ? "Cooking (6m)"
                          : order.status === "ready"
                          ? "Ready"
                          : "Queued"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Kitchen Load & Real-Time Sync Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                  <span className="text-xs font-bold text-[#252522]">Kitchen Load Monitor</span>
                  <span className="text-xs font-semibold text-[#5F7A65]">Normal Pacing</span>
                </div>

                <div className="mt-4 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs text-[#6E6D66] mb-1">
                      <span>Grill & Burger Station</span>
                      <span className="font-semibold text-[#252522]">3 tickets active</span>
                    </div>
                    <div className="w-full bg-[#ECE7DE] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#D66B43] h-full rounded-full w-[45%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#6E6D66] mb-1">
                      <span>Curry & Bowl Line</span>
                      <span className="font-semibold text-[#252522]">2 tickets active</span>
                    </div>
                    <div className="w-full bg-[#ECE7DE] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#5F7A65] h-full rounded-full w-[30%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#6E6D66] mb-1">
                      <span>Beverage & Coffee Bar</span>
                      <span className="font-semibold text-[#252522]">1 ticket active</span>
                    </div>
                    <div className="w-full bg-[#ECE7DE] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#5F7A65] h-full rounded-full w-[15%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ECE7DE] flex items-center justify-between">
                  <span className="text-xs text-[#6E6D66]">KDS Sync Latency</span>
                  <span className="text-xs font-bold text-[#5F7A65]">0.12s Instant</span>
                </div>
              </div>

              {/* Quick Out-of-Stock Status Card */}
              <div className="rounded-2xl bg-white border border-[#ECE7DE] p-5 shadow-soft">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#252522]">1-Tap Stock Management</span>
                  <span className="text-[11px] text-[#6E6D66]">86&apos;d Disabling</span>
                </div>
                <p className="text-xs text-[#6E6D66] leading-relaxed">
                  Sold out of paneer during lunch? Toggle it off in one tap—the digital QR menu updates on every guest phone in real time.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
