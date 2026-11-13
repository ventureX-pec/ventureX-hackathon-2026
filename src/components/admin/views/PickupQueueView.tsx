"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Package,
  QrCode,
  CheckCircle2,
  Clock,
  Phone,
  Search,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { AdminOrder } from "@/data/mockAdminData";

interface PickupQueueViewProps {
  orders: AdminOrder[];
  onCompleteOrder: (orderId: string) => void;
  onOpenQrScanner: () => void;
}

export const PickupQueueView: React.FC<PickupQueueViewProps> = ({
  orders,
  onCompleteOrder,
  onOpenQrScanner,
}) => {
  const [tokenSearch, setTokenSearch] = useState("");

  const readyOrders = orders.filter((o) => o.status === "ready");

  const filtered = readyOrders.filter((o) => {
    if (!tokenSearch.trim()) return true;
    const q = tokenSearch.toLowerCase();
    return (
      o.tokenNumber.includes(q) ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
              Pickup & Shelf Queue
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {readyOrders.length} Ready for Collection
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#736E65]">
            Express counter slots, shelf management & student QR verification
          </p>
        </div>

        <button
          onClick={onOpenQrScanner}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <QrCode className="w-4 h-4" />
          <span>Scan Pickup Pass</span>
        </button>
      </div>

      {/* Large Live Pickup Board (Visualizes live token board like in high-tech food courts) */}
      <div className="bg-gradient-to-br from-[#252522] to-[#1A1816] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-5 border border-[#3E3A35]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E87A48]">
            <Sparkles className="w-4 h-4 text-[#E87A48]" />
            <span>Campus Live Ready Display</span>
          </div>
          <span className="text-xs text-white/60">Auto-updating every 3s</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {readyOrders.length === 0 ? (
            <div className="col-span-full py-6 text-center text-white/50 text-xs">
              No orders ready right now
            </div>
          ) : (
            readyOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl text-center space-y-1 hover:border-[#E87A48] transition-colors"
              >
                <div className="font-serif text-3xl font-bold text-white">
                  #{ord.tokenNumber}
                </div>
                <div className="text-[10px] text-white/70 truncate font-medium">
                  {ord.tableOrShelf}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Search Bar for Tokens */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C877D]" />
        <input
          type="text"
          value={tokenSearch}
          onChange={(e) => setTokenSearch(e.target.value)}
          placeholder="Filter by token number, customer or phone..."
          className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
        />
      </div>

      {/* Ready Orders Shelf Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((order) => (
          <motion.div
            key={order.id}
            layout
            className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#EDE4D8] p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE2]">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-3xl font-bold text-[#D66B43]">
                    #{order.tokenNumber}
                  </span>
                  <span className="text-xs text-[#8C877D] font-medium block">
                    {order.orderNumber}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  Ready at Shelf
                </span>
              </div>

              {/* Shelf Location Box */}
              <div className="mt-4 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EDE5DA] space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C877D]">
                  Assigned Pickup Spot
                </div>
                <div className="font-serif text-lg font-bold text-[#252522]">
                  {order.tableOrShelf}
                </div>
              </div>

              {/* Customer Info */}
              <div className="mt-3 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#736E65]">Customer:</span>
                  <span className="font-bold text-[#252522]">{order.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#736E65]">Phone:</span>
                  <span className="font-mono text-[#5C574F]">{order.customerPhone}</span>
                </div>
              </div>

              {/* Items */}
              <div className="mt-3 pt-3 border-t border-[#F2ECE2] text-xs text-[#736E65]">
                {order.items.map((i) => `${i.quantity}x ${i.dishName}`).join(", ")}
              </div>
            </div>

            <button
              onClick={() => onCompleteOrder(order.id)}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Complete Handover</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
