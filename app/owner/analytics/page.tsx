"use client"

import React, { useState } from "react"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  Calendar,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react"

export default function AnalyticsPage() {
  const { currentRestaurantOrders, currentRestaurantMenuItems } = useDineFlow()
  const [dateRange, setDateRange] = useState<"today" | "7d" | "30d">("7d")

  // Computed metrics from real data
  const validOrders = currentRestaurantOrders.filter((o) => o.status !== "cancelled")
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0)
  const averageOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0

  const dineInCount = validOrders.filter((o) => o.diningOption === "dine-in").length
  const takeawayCount = validOrders.filter((o) => o.diningOption === "takeaway").length
  const dineInPct = validOrders.length > 0 ? Math.round((dineInCount / validOrders.length) * 100) : 60

  // Revenue graph data
  const revenueTrendData = [
    { day: "Mon", revenue: 8400, height: "45%" },
    { day: "Tue", revenue: 11200, height: "60%" },
    { day: "Wed", revenue: 9800, height: "52%" },
    { day: "Thu", revenue: 14500, height: "78%" },
    { day: "Fri", revenue: 19800, height: "95%" },
    { day: "Sat", revenue: 22400, height: "100%" },
    { day: "Sun", revenue: 16700, height: "85%" },
  ]

  // Hourly order pacing
  const hourlyData = [
    { hour: "12 PM", count: 18, pct: "75%" },
    { hour: "1 PM", count: 24, pct: "100%" },
    { hour: "2 PM", count: 14, pct: "58%" },
    { hour: "5 PM", count: 8, pct: "33%" },
    { hour: "7 PM", count: 22, pct: "91%" },
    { hour: "8 PM", count: 26, pct: "100%" },
    { hour: "9 PM", count: 16, pct: "66%" },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ede4] text-[#c96342] text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Operational Insights & Revenue Analytics</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Sales & Service Performance
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Real-time sales velocity, peak hour surges, and high-margin dishes
          </p>
        </div>

        {/* Date Filter Buttons */}
        <div className="flex items-center bg-[#faf7f2] p-1 rounded-full border border-[#e7dfd5] text-xs">
          <button
            onClick={() => setDateRange("today")}
            className={`px-3 py-1.5 rounded-full font-medium transition-all ${
              dateRange === "today" ? "bg-[#c96342] text-white shadow-2xs" : "text-[#78716c]"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDateRange("7d")}
            className={`px-3 py-1.5 rounded-full font-medium transition-all ${
              dateRange === "7d" ? "bg-[#c96342] text-white shadow-2xs" : "text-[#78716c]"
            }`}
          >
            Past 7 Days
          </button>
          <button
            onClick={() => setDateRange("30d")}
            className={`px-3 py-1.5 rounded-full font-medium transition-all ${
              dateRange === "30d" ? "bg-[#c96342] text-white shadow-2xs" : "text-[#78716c]"
            }`}
          >
            Past 30 Days
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs space-y-3">
          <div className="flex justify-between items-center text-xs text-[#78716c] uppercase font-semibold">
            <span>Gross Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1c1917]">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.8% vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs space-y-3">
          <div className="flex justify-between items-center text-xs text-[#78716c] uppercase font-semibold">
            <span>Total Orders Placed</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#c96342] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1c1917]">
            {validOrders.length} tickets
          </div>
          <div className="text-xs text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+22% digital ordering adoption</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs space-y-3">
          <div className="flex justify-between items-center text-xs text-[#78716c] uppercase font-semibold">
            <span>Average Order Value (AOV)</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1c1917]">
            ₹{averageOrderValue}
          </div>
          <div className="text-xs text-[#78716c]">
            Average 2.8 items per guest order
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#e7dfd5] shadow-xs space-y-3">
          <div className="flex justify-between items-center text-xs text-[#78716c] uppercase font-semibold">
            <span>Avg Table Turnaround</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#1c1917]">
            38 mins
          </div>
          <div className="text-xs text-emerald-600 flex items-center gap-1">
            <span>-9 mins faster due to QR ordering</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                Revenue Pace Over Time
              </h3>
              <p className="text-xs text-[#78716c]">
                Daily gross receipts across digital dine-in and pickup
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              Avg ₹14,685 / day
            </span>
          </div>

          {/* Clean Interactive CSS/SVG Bar Chart */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 border-b border-[#e7dfd5]">
            {revenueTrendData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#1c1917] bg-[#f4ede4] px-1.5 py-0.5 rounded">
                  ₹{d.revenue}
                </div>
                <div
                  className="w-full max-w-[42px] bg-[#f4ede4] group-hover:bg-[#c96342] rounded-t-xl transition-all duration-300"
                  style={{ height: d.height }}
                />
                <span className="text-xs font-medium text-[#78716c] group-hover:text-[#1c1917]">
                  {d.day}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-[#78716c]">
            <span>Peak Day: Saturday (₹22,400)</span>
            <span>Lowest Day: Monday (₹8,400)</span>
          </div>
        </div>

        {/* Dining Type Breakdown Donut/Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#1c1917]">
            Order Channel Split
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-semibold text-[#1c1917]">
                <span>Dine-In (QR Table Ordering)</span>
                <span>{dineInPct}%</span>
              </div>
              <div className="w-full bg-[#f4ede4] h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#c96342] rounded-full transition-all"
                  style={{ width: `${dineInPct}%` }}
                />
              </div>
              <p className="text-[11px] text-[#78716c] mt-1">
                Zero waiting for menu or waitstaff bill presentation
              </p>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1.5 font-semibold text-[#1c1917]">
                <span>Takeaway & Scheduled Pickup</span>
                <span>{100 - dineInPct}%</span>
              </div>
              <div className="w-full bg-[#f4ede4] h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-700 rounded-full transition-all"
                  style={{ width: `${100 - dineInPct}%` }}
                />
              </div>
              <p className="text-[11px] text-[#78716c] mt-1">
                Zero third-party marketplace commissions saved
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5] text-xs text-[#57534e]">
            <span className="font-bold text-[#1c1917]">Commission Savings:</span> DineFlow direct ordering saved this restaurant <span className="font-bold text-emerald-700">₹8,450</span> in third-party aggregator commissions this week alone.
          </div>
        </div>
      </div>

      {/* Hourly Service Peaks */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e7dfd5] shadow-xs space-y-6">
        <h3 className="font-serif text-lg font-bold text-[#1c1917]">
          Kitchen Service Peak Curve (Orders by Hour)
        </h3>
        <p className="text-xs text-[#78716c]">
          Demonstrates lunch spike at 1:00 PM and dinner rush between 7:30 PM – 8:30 PM
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {hourlyData.map((h, i) => (
            <div
              key={i}
              className="p-3 bg-[#faf7f2] rounded-2xl border border-[#e7dfd5] text-center space-y-2"
            >
              <div className="text-xs font-semibold text-[#78716c]">{h.hour}</div>
              <div className="font-serif text-lg font-bold text-[#1c1917]">
                {h.count} tickets
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#c96342] h-full rounded-full"
                  style={{ width: h.pct }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
