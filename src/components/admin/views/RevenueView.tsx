"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  TrendingUp,
  BarChart3,
  Calendar,
  ArrowUpRight,
  Flame,
  Award,
  Wallet,
  ShoppingBag,
} from "lucide-react";
import { INITIAL_ADMIN_BESTSELLERS } from "@/data/mockAdminData";

export const RevenueView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily");

  const hourlyData = [
    { hour: "11 AM", revenue: 1800, orders: 9 },
    { hour: "12 PM", revenue: 4200, orders: 21 },
    { hour: "1 PM", revenue: 6800, orders: 34 },
    { hour: "2 PM", revenue: 5400, orders: 26 },
    { hour: "3 PM", revenue: 2100, orders: 11 },
    { hour: "4 PM", revenue: 1900, orders: 10 },
    { hour: "5 PM", revenue: 3200, orders: 16 },
    { hour: "6 PM", revenue: 4900, orders: 24 },
    { hour: "7 PM", revenue: 6100, orders: 29 },
    { hour: "8 PM", revenue: 4500, orders: 22 },
  ];

  const maxRev = Math.max(...hourlyData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
              Revenue & Financial Analytics
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Live P&L Tracking
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#736E65]">
            Sales breakdown, kitchen peak hours, campus student demand and top grossing plates
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF8F5] border border-[#EDE5DA] self-start sm:self-auto">
          {(["daily", "weekly", "monthly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                timeframe === t
                  ? "bg-[#D66B43] text-white shadow-xs"
                  : "text-[#736E65] hover:text-[#252522]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Financial Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#736E65] text-xs">
            <span>Today&apos;s Gross</span>
            <span className="w-8 h-8 rounded-xl bg-[#D66B43]/10 text-[#D66B43] flex items-center justify-center font-bold">
              ₹
            </span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
            ₹24,680
          </div>
          <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% vs yesterday</span>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#736E65] text-xs">
            <span>Weekly Revenue</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
            ₹1,48,200
          </div>
          <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+9.8% vs last week</span>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#736E65] text-xs">
            <span>Monthly Revenue</span>
            <span className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-[#5C574F] flex items-center justify-center font-bold">
              <Wallet className="w-4 h-4" />
            </span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
            ₹5,82,400
          </div>
          <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% monthly target</span>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#736E65] text-xs">
            <span>Avg Order Value (AOV)</span>
            <span className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-[#5C574F] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
            ₹215
          </div>
          <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+₹22 from add-ons</span>
          </div>
        </div>
      </div>

      {/* Main Split: Hourly Trend Chart & Best-Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly Chart (~60%) */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[#EDE4D8] shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#F2ECE2] pb-3">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#252522]">
                Today&apos;s Hourly Revenue & Volume
              </h2>
              <p className="text-xs text-[#736E65]">Peak lunch rush peaked between 1:00 PM - 2:00 PM</p>
            </div>
            <span className="text-xs font-bold text-[#D66B43] bg-[#D66B43]/10 px-2.5 py-1 rounded-full">
              Peak: ₹6.8k/hr
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-2 pt-6">
            {hourlyData.map((d, i) => {
              const heightPct = (d.revenue / maxRev) * 100;
              const isPeak = d.revenue === maxRev;

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#D66B43]">
                    ₹{(d.revenue / 1000).toFixed(1)}k
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-xl transition-all duration-500 group-hover:brightness-110 ${
                      isPeak
                        ? "bg-gradient-to-t from-[#D66B43] to-[#E87A48] shadow-md shadow-[#D66B43]/30"
                        : "bg-[#F0E6D8] group-hover:bg-[#D66B43]/60"
                    }`}
                  />
                  <span className="text-[10px] font-medium text-[#736E65]">{d.hour}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Best-Selling Dishes Leaderboard (~40%) */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-[#EDE4D8] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F2ECE2] pb-3">
            <h2 className="font-serif text-lg font-bold text-[#252522]">
              Top Grossing Plates
            </h2>
            <Award className="w-4 h-4 text-[#D66B43]" />
          </div>

          <div className="space-y-3">
            {INITIAL_ADMIN_BESTSELLERS.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#EDE5DA] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                      idx === 0
                        ? "bg-[#D66B43] text-white"
                        : idx === 1
                        ? "bg-[#E87A48]/20 text-[#D66B43]"
                        : "bg-[#FAF8F5] text-[#736E65]"
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#EDE5DA]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div>
                    <div className="text-xs font-bold text-[#252522] line-clamp-1">{item.name}</div>
                    <div className="text-[10px] text-[#736E65]">{item.ordersCount} orders today</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-serif font-bold text-sm text-[#252522]">
                    ₹{item.revenue.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold">★ {item.rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
