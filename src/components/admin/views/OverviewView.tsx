"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ClipboardList,
  ChefHat,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Plus,
  Layers,
  Users,
  QrCode,
  Flame,
  Clock,
  ExternalLink,
} from "lucide-react";
import { AdminOrder } from "@/data/mockAdminData";

interface OverviewViewProps {
  stats: {
    totalOrders: number;
    totalOrdersTrend: string;
    inKitchen: number;
    completed: number;
    completedTrend: string;
    todayRevenue: number;
    todayRevenueTrend: string;
  };
  liveOrders: AdminOrder[];
  onViewAllOrders: () => void;
  onOpenOrder: (order: AdminOrder) => void;
  onQuickAction: (action: "add-item" | "update-stock" | "manage-staff" | "pickup-pass") => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  stats,
  liveOrders,
  onViewAllOrders,
  onOpenOrder,
  onQuickAction,
}) => {
  return (
    <div className="space-y-7 sm:space-y-8">
      {/* ============================================================ */}
      {/* 1. GREETING & HEADER (Exact Match with Reference Image)       */}
      {/* ============================================================ */}
      <div className="space-y-2">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D66B43]/10 border border-[#D66B43]/20 text-[#D66B43] text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-[#D66B43]" />
          <span>Kitchen Operations</span>
        </div>

        {/* Editorial Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#252522] leading-[1.15]">
          Good Evening,{" "}
          <span className="text-[#D66B43] bg-gradient-to-r from-[#D66B43] to-[#E87A48] bg-clip-text text-transparent">
            Admin.
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-[#736E65] font-normal">
          Here&apos;s what&apos;s happening at your kitchen today.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 2. FOUR SUMMARY STAT CARDS (Grid of 4)                       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {/* Card 1: Total Orders */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#EDE4D8] shadow-[0_10px_25px_rgba(37,37,34,0.04)] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5EFEB] flex items-center justify-center text-[#5C574F] group-hover:scale-105 transition-transform">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#252522]">
            {stats.totalOrders}
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs font-medium text-[#736E65]">Total Orders</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>{stats.totalOrdersTrend}</span>
            </span>
          </div>
        </motion.div>

        {/* Card 2: In Kitchen */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#EDE4D8] shadow-[0_10px_25px_rgba(37,37,34,0.04)] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D66B43]/15 flex items-center justify-center text-[#D66B43] group-hover:scale-105 transition-transform">
              <ChefHat className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#252522]">
            {stats.inKitchen}
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs font-medium text-[#736E65]">In Kitchen</span>
            <span className="w-2 h-2 rounded-full bg-[#D66B43] animate-ping" />
          </div>
        </motion.div>

        {/* Card 3: Completed */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#EDE4D8] shadow-[0_10px_25px_rgba(37,37,34,0.04)] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#252522]">
            {stats.completed}
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs font-medium text-[#736E65]">Completed</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>{stats.completedTrend}</span>
            </span>
          </div>
        </motion.div>

        {/* Card 4: Today's Revenue */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#EDE4D8] shadow-[0_10px_25px_rgba(37,37,34,0.04)] relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D66B43]/15 flex items-center justify-center text-[#D66B43] font-serif font-bold text-lg group-hover:scale-105 transition-transform">
              ₹
            </div>
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#252522]">
            ₹{stats.todayRevenue.toLocaleString("en-IN")}
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs font-medium text-[#736E65]">Today&apos;s Revenue</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>{stats.todayRevenueTrend}</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. LOWER SPLIT: LIVE ORDERS & QUICK ACTIONS                  */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Orders (~60% width) */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-[#EDE4D8] shadow-[0_12px_30px_rgba(37,37,34,0.05)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE2]">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#252522]">
              Live Orders
            </h2>
            <button
              onClick={onViewAllOrders}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#D66B43] hover:underline transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#F2ECE2]">
            {liveOrders.slice(0, 4).map((order) => {
              const itemsList = order.items.map((i) => `${i.dishName}`).join(" • ");

              return (
                <div
                  key={order.id}
                  onClick={() => onOpenOrder(order)}
                  className="py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-[#FAF8F5] -mx-2 px-2 rounded-2xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Food Thumbnail */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 border border-[#EDE5DA] shadow-xs">
                      <Image
                        src={order.image}
                        alt={order.orderNumber}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="56px"
                      />
                    </div>

                    {/* Order ID & Dish info */}
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-[#252522] group-hover:text-[#D66B43] transition-colors">
                        {order.orderNumber}
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#736E65] truncate font-medium mt-0.5">
                        {itemsList}
                      </div>
                    </div>
                  </div>

                  {/* Status Pill & Preparation Time */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        order.status === "preparing"
                          ? "bg-[#D66B43]/15 text-[#D66B43] border border-[#D66B43]/20"
                          : order.status === "accepted"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : order.status === "ready"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-[#F2ECE2] text-[#5C574F]"
                      }`}
                    >
                      {order.status === "preparing"
                        ? "Preparing"
                        : order.status === "accepted"
                        ? "In Kitchen"
                        : order.status === "ready"
                        ? "Ready"
                        : order.status}
                    </span>

                    <span className="text-xs font-semibold text-[#8C877D] hidden sm:inline-block">
                      {order.prepTimeEstimate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quick Actions (~40% width) */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-[#EDE4D8] shadow-[0_12px_30px_rgba(37,37,34,0.05)] space-y-4">
          <div className="pb-2 border-b border-[#F2ECE2]">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#252522]">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Quick Action 1: Add Item */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onQuickAction("add-item")}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE4D8] hover:border-[#D66B43]/40 hover:bg-white text-center flex flex-col items-center justify-center gap-2.5 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#D66B43]/10 text-[#D66B43] flex items-center justify-center group-hover:bg-[#D66B43] group-hover:text-white transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#252522] group-hover:text-[#D66B43] transition-colors">
                Add Item
              </span>
            </motion.button>

            {/* Quick Action 2: Update Stock */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onQuickAction("update-stock")}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE4D8] hover:border-[#D66B43]/40 hover:bg-white text-center flex flex-col items-center justify-center gap-2.5 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F5EFEB] text-[#5C574F] flex items-center justify-center group-hover:bg-[#D66B43] group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#252522] group-hover:text-[#D66B43] transition-colors">
                Update Stock
              </span>
            </motion.button>

            {/* Quick Action 3: Manage Staff */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onQuickAction("manage-staff")}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE4D8] hover:border-[#D66B43]/40 hover:bg-white text-center flex flex-col items-center justify-center gap-2.5 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F5EFEB] text-[#5C574F] flex items-center justify-center group-hover:bg-[#D66B43] group-hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#252522] group-hover:text-[#D66B43] transition-colors">
                Manage Staff
              </span>
            </motion.button>

            {/* Quick Action 4: Pickup Pass */}
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onQuickAction("pickup-pass")}
              className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EDE4D8] hover:border-[#D66B43]/40 hover:bg-white text-center flex flex-col items-center justify-center gap-2.5 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#D66B43]/10 text-[#D66B43] flex items-center justify-center group-hover:bg-[#D66B43] group-hover:text-white transition-colors">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#252522] group-hover:text-[#D66B43] transition-colors">
                Pickup Pass
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
