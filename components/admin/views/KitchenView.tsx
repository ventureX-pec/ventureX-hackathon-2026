"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ChefHat,
  Clock,
  Check,
  CheckCircle2,
  Flame,
  AlertCircle,
  PackageCheck,
  BellRing,
  QrCode,
} from "lucide-react";
import { AdminOrder } from "@/data/mockAdminData";

interface KitchenViewProps {
  orders: AdminOrder[];
  onUpdateStatus: (orderId: string, newStatus: AdminOrder["status"]) => void;
}

export const KitchenView: React.FC<KitchenViewProps> = ({ orders, onUpdateStatus }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItemCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const incomingOrders = orders.filter((o) => o.status === "new" || o.status === "accepted");
  const preparingOrders = orders.filter((o) => o.status === "preparing");
  const readyOrders = orders.filter((o) => o.status === "ready");

  return (
    <div className="space-y-6">
      {/* KDS Header with Live Pulse */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#EDE4D8] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D66B43]/15 flex items-center justify-center text-[#D66B43]">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#252522]">
                Kitchen Display System (KDS)
              </h1>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-[#736E65]">
              Touch-optimized for tablet and kitchen expediter stations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#EDE5DA] text-[#5C574F] font-semibold">
            Avg Prep: <span className="text-[#D66B43] font-bold">9.4 min</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#EDE5DA] text-[#5C574F] font-semibold">
            Active Tickets: <span className="text-[#252522] font-bold">{orders.filter((o) => o.status !== "completed").length}</span>
          </div>
        </div>
      </div>

      {/* 3 Columns Kanban Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ============================================================ */}
        {/* COLUMN 1: INCOMING / NEW TICKETS                              */}
        {/* ============================================================ */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-amber-50 border border-amber-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <BellRing className="w-4 h-4 text-amber-700" />
              <span>Incoming Queue</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-amber-800 shadow-xs">
              {incomingOrders.length}
            </span>
          </div>

          <div className="space-y-3.5">
            {incomingOrders.length === 0 ? (
              <div className="p-8 text-center bg-white/80 rounded-2xl border border-dashed border-[#EDE5DA] text-xs text-[#8C877D]">
                No incoming orders right now
              </div>
            ) : (
              incomingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE2]">
                    <div>
                      <span className="font-serif text-xl font-bold text-[#252522]">
                        Token #{order.tokenNumber}
                      </span>
                      <span className="text-xs text-[#8C877D] block font-medium">
                        {order.orderNumber} • {order.customerName}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold">
                      {order.timeAgo}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-1.5 py-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm font-semibold text-[#252522]">
                        <span>
                          <span className="text-[#D66B43] font-bold mr-2 text-base">{it.quantity}x</span>
                          {it.dishName}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#736E65] font-medium bg-[#FAF8F5] p-2.5 rounded-xl flex items-center justify-between">
                    <div>
                      {order.restaurantName && (
                        <span className="text-[10px] font-bold text-[#c96342] uppercase tracking-wider block">
                          {order.restaurantName}
                        </span>
                      )}
                      <span>Destination: </span>
                      <span className="font-bold text-[#252522]">
                        {order.tableNumber ? `Table ${order.tableNumber}` : order.tableOrShelf}
                      </span>
                    </div>
                    {order.tableNumber && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#c96342]/10 text-[#c96342] text-[10px] font-bold">
                        <QrCode className="w-3 h-3" />
                        <span>T#{order.tableNumber}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onUpdateStatus(order.id, "preparing")}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Start Cooking</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 2: IN PREPARATION (ACTIVE COOKING)                     */}
        {/* ============================================================ */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[#D66B43]/15 border border-[#D66B43]/30">
            <div className="flex items-center gap-2 text-xs font-bold text-[#9C3F1B]">
              <Flame className="w-4 h-4 text-[#D66B43]" />
              <span>In Preparation</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-[#D66B43] shadow-xs">
              {preparingOrders.length}
            </span>
          </div>

          <div className="space-y-3.5">
            {preparingOrders.length === 0 ? (
              <div className="p-8 text-center bg-white/80 rounded-2xl border border-dashed border-[#EDE5DA] text-xs text-[#8C877D]">
                No orders currently cooking
              </div>
            ) : (
              preparingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border-2 border-[#D66B43]/40 p-4 shadow-md space-y-3.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE2]">
                    <div>
                      <span className="font-serif text-2xl font-bold text-[#252522]">
                        Token #{order.tokenNumber}
                      </span>
                      <span className="text-xs text-[#8C877D] block font-medium">
                        {order.orderNumber} • {order.customerName}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-[#D66B43]/15 text-[#D66B43] text-xs font-bold animate-pulse flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {order.prepTimeEstimate}
                    </span>
                  </div>

                  {/* Interactive Items Check-Off List for Cooks */}
                  <div className="space-y-2 py-1">
                    <div className="text-[10px] font-bold text-[#8C877D] uppercase tracking-wider">
                      Tap item when ready:
                    </div>
                    {order.items.map((it, idx) => {
                      const itemKey = `${order.id}-${idx}`;
                      const isDone = !!checkedItems[itemKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleItemCheck(itemKey)}
                          className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                            isDone
                              ? "bg-emerald-50 border border-emerald-200 text-[#736E65] line-through"
                              : "bg-[#FAF8F5] border border-[#EDE5DA] text-[#252522] hover:border-[#D66B43]"
                          }`}
                        >
                          <span className="text-sm font-bold flex items-center gap-2">
                            <span className={isDone ? "text-emerald-600" : "text-[#D66B43]"}>
                              {it.quantity}x
                            </span>
                            {it.dishName}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                              isDone
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "border-[#C7BEB2] bg-white"
                            }`}
                          >
                            {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[11px] text-[#736E65] font-medium bg-[#FAF8F5] p-2.5 rounded-xl flex items-center justify-between">
                    <div>
                      {order.restaurantName && (
                        <span className="text-[10px] font-bold text-[#c96342] uppercase tracking-wider block">
                          {order.restaurantName}
                        </span>
                      )}
                      <span>Assign To: </span>
                      <span className="font-bold text-[#252522]">
                        {order.tableNumber ? `Table ${order.tableNumber}` : order.tableOrShelf}
                      </span>
                    </div>
                    {order.tableNumber && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#c96342]/10 text-[#c96342] text-[10px] font-bold">
                        <QrCode className="w-3 h-3" />
                        <span>T#{order.tableNumber}</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onUpdateStatus(order.id, "ready")}
                    className="w-full py-3 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Send to Counter Shelf</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 3: READY AT COUNTER / SHELF                            */}
        {/* ============================================================ */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <PackageCheck className="w-4 h-4 text-emerald-700" />
              <span>Ready for Handover</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-emerald-800 shadow-xs">
              {readyOrders.length}
            </span>
          </div>

          <div className="space-y-3.5">
            {readyOrders.length === 0 ? (
              <div className="p-8 text-center bg-white/80 rounded-2xl border border-dashed border-[#EDE5DA] text-xs text-[#8C877D]">
                No orders currently waiting at counter
              </div>
            ) : (
              readyOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border-2 border-emerald-300 p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE2]">
                    <div>
                      <span className="font-serif text-2xl font-bold text-emerald-900">
                        Token #{order.tokenNumber}
                      </span>
                      <span className="text-xs text-[#8C877D] block font-medium">
                        {order.customerName}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Awaiting Pickup
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                    {order.restaurantName && (
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                        {order.restaurantName}
                      </span>
                    )}
                    <span className="text-emerald-900 font-semibold block">Pickup / Dine-In Location:</span>
                    <span className="font-serif text-base font-bold text-emerald-950 flex items-center gap-1.5 mt-0.5">
                      <QrCode className="w-4 h-4 text-emerald-700" />
                      <span>{order.tableNumber ? `Table ${order.tableNumber}` : order.tableOrShelf}</span>
                    </span>
                  </div>

                  <div className="text-xs text-[#736E65]">
                    Items: {order.items.map((i) => `${i.quantity}x ${i.dishName}`).join(", ")}
                  </div>

                  <button
                    onClick={() => onUpdateStatus(order.id, "completed")}
                    className="w-full py-3 rounded-xl bg-[#252522] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-black active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Customer Picked Up</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
