"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChefHat,
  PackageCheck,
  Eye,
  QrCode,
  MapPin,
} from "lucide-react";
import { AdminOrder } from "@/data/mockAdminData";

interface OrdersViewProps {
  orders: AdminOrder[];
  onUpdateStatus: (orderId: string, newStatus: AdminOrder["status"]) => void;
  onOpenOrder: (order: AdminOrder) => void;
  searchQuery?: string;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onUpdateStatus,
  onOpenOrder,
  searchQuery = "",
}) => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "new" | "accepted" | "preparing" | "ready" | "completed"
  >("all");
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filterTabs = [
    { id: "all", label: "All Orders", count: orders.length },
    {
      id: "new",
      label: "New",
      count: orders.filter((o) => o.status === "new").length,
    },
    {
      id: "accepted",
      label: "In Kitchen",
      count: orders.filter((o) => o.status === "accepted").length,
    },
    {
      id: "preparing",
      label: "Preparing",
      count: orders.filter((o) => o.status === "preparing").length,
    },
    {
      id: "ready",
      label: "Ready for Pickup",
      count: orders.filter((o) => o.status === "ready").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: orders.filter((o) => o.status === "completed").length,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    if (activeFilter !== "all" && order.status !== activeFilter) {
      return false;
    }
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      const matchesId = order.orderNumber.toLowerCase().includes(q);
      const matchesCustomer = order.customerName.toLowerCase().includes(q);
      const matchesDish = order.items.some((i) => i.dishName.toLowerCase().includes(q));
      if (!matchesId && !matchesCustomer && !matchesDish) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
            Order Management
          </h1>
          <p className="text-xs sm:text-sm text-[#736E65]">
            Track, filter, and advance live student and faculty kitchen tickets
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C877D]" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search order ID, token, item..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
              activeFilter === tab.id
                ? "bg-[#D66B43] text-white shadow-sm"
                : "bg-white/90 border border-[#EDE5DA] text-[#5C574F] hover:bg-white hover:text-[#252522]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === tab.id ? "bg-white/20 text-white" : "bg-[#F2ECE2] text-[#736E65]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full bg-white/90 p-12 text-center rounded-3xl border border-[#EDE5DA] space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center mx-auto text-[#8C877D]">
              <ChefHat className="w-6 h-6" />
            </div>
            <div className="font-serif text-lg font-bold text-[#252522]">No orders found</div>
            <div className="text-xs text-[#736E65]">Try switching the filter tab or clearing search</div>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              layout
              className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#EDE4D8] p-5 shadow-[0_10px_25px_rgba(37,37,34,0.04)] flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
            >
              {/* Order Header */}
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F2ECE2]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-bold text-[#252522]">
                        {order.orderNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#D66B43]/10 text-[#D66B43]">
                        Token #{order.tokenNumber}
                      </span>
                    </div>
                    {order.restaurantName && (
                      <div className="text-[11px] font-bold text-[#c96342] uppercase tracking-wide mt-0.5">
                        {order.restaurantName}
                      </div>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      order.status === "preparing"
                        ? "bg-[#D66B43]/15 text-[#D66B43]"
                        : order.status === "accepted"
                        ? "bg-amber-100 text-amber-800"
                        : order.status === "ready"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-[#F2ECE2] text-[#5C574F]"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Customer & Location */}
                <div className="mt-3 text-xs text-[#736E65] flex items-center justify-between">
                  <span className="font-semibold text-[#252522]">{order.customerName}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#ECE5DA] text-[11px] font-bold text-[#252522] shadow-xs">
                    <QrCode className="w-3.5 h-3.5 text-[#c96342]" />
                    <span>{order.tableNumber ? `Table ${order.tableNumber}` : order.tableOrShelf}</span>
                  </span>
                </div>

                {/* Ordered Items */}
                <div className="mt-3 space-y-1.5">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-[#383531]">
                        <span className="font-bold text-[#D66B43] mr-1.5">{item.quantity}x</span>
                        {item.dishName}
                      </span>
                      <span className="text-[#736E65] font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Action Buttons */}
              <div className="pt-3 border-t border-[#F2ECE2] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#736E65]">Total Paid</span>
                  <span className="font-serif font-bold text-base text-[#252522]">
                    ₹{order.totalAmount}
                  </span>
                </div>

                {/* Status Advancement Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenOrder(order)}
                    className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EDE5DA] text-[#5C574F] hover:text-[#D66B43] hover:bg-white transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {order.status === "new" && (
                    <button
                      onClick={() => onUpdateStatus(order.id, "accepted")}
                      className="flex-1 py-2 rounded-xl bg-[#D66B43] text-white text-xs font-bold hover:brightness-105 transition-all shadow-xs"
                    >
                      Accept Order
                    </button>
                  )}

                  {order.status === "accepted" && (
                    <button
                      onClick={() => onUpdateStatus(order.id, "preparing")}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs font-bold hover:brightness-105 transition-all shadow-xs"
                    >
                      Start Preparing
                    </button>
                  )}

                  {order.status === "preparing" && (
                    <button
                      onClick={() => onUpdateStatus(order.id, "ready")}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-xs"
                    >
                      Mark as Ready
                    </button>
                  )}

                  {order.status === "ready" && (
                    <button
                      onClick={() => onUpdateStatus(order.id, "completed")}
                      className="flex-1 py-2 rounded-xl bg-[#252522] text-white text-xs font-bold hover:bg-black transition-all shadow-xs"
                    >
                      Handover Complete
                    </button>
                  )}

                  {order.status === "completed" && (
                    <span className="flex-1 py-1.5 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
