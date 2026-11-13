"use client";

import React from "react";
import { motion } from "motion/react";
import {
  ChefHat,
  MenuSquare,
  ListOrdered,
  Clock,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const ForRestaurantsSection = () => {
  const features = [
    {
      icon: MenuSquare,
      title: "Digital Menu Management",
      desc: "Add dishes, update prices, and toggle items out of stock (86'd) with one tap in real time.",
    },
    {
      icon: ListOrdered,
      title: "Centralised Order Management",
      desc: "One synchronized digital stream for table orders, counter walk-ins, and scheduled takeaways.",
    },
    {
      icon: ChefHat,
      title: "Kitchen Order Tracking (KDS)",
      desc: "Live preparation countdown timers with color-coded tickets keep kitchen pacing on track.",
    },
    {
      icon: Clock,
      title: "Dine-in and Takeaway Support",
      desc: "Give guests the freedom to order at table standees or pre-order lunch pickups from class.",
    },
    {
      icon: BarChart3,
      title: "Restaurant Insights & Heatmaps",
      desc: "Gain clear visibility into peak lunch rush surges, best-selling dishes, and prep duration.",
    },
  ];

  return (
    <section id="restaurants" className="py-20 sm:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
              For Restaurant Operators
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252522] leading-tight">
              Great Food Deserves Better Operations.
            </h2>
            <p className="text-base sm:text-lg text-[#6E6D66] leading-relaxed max-w-2xl">
              Give your restaurant a digital edge. Manage orders, menus and kitchen workflows 
              through one simple platform — without paying 30% aggregator commissions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5 flex justify-start lg:justify-end"
          >
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#252522] text-[#FAF8F3] text-sm font-semibold hover:bg-[#383834] transition-colors shadow-soft"
            >
              <span>Bring Your Restaurant to DINEFLOW</span>
              <ArrowRight className="w-4 h-4 text-[#D66B43]" />
            </motion.a>
          </motion.div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white border border-[#ECE7DE] shadow-soft hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF2EE] flex items-center justify-center text-[#D66B43] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#252522] mb-1.5">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-[#6E6D66] leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}

          {/* 6th Highlight: 0% Commission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="p-6 rounded-2xl bg-[#EBF1ED] border border-[#D5E1D8] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#5F7A65] mb-4 shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252522] mb-1.5">Zero Platform Commissions</h3>
              <p className="text-xs sm:text-sm text-[#5F7A65] leading-relaxed">
                Direct UPI and counter settlement. You keep 100% of your earnings with zero third-party cuts.
              </p>
            </div>
            <p className="text-xs font-bold text-[#5F7A65] pt-4 mt-4 border-t border-[#D5E1D8]">
              100% Direct Revenue
            </p>
          </motion.div>
        </div>

        {/* Elegant Dashboard Visual Mockup (Non-Functional Visual Preview) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white border border-[#ECE7DE] shadow-elevated p-6 sm:p-8 lg:p-10"
        >
          {/* Mockup Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#ECE7DE] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5F7A65]" />
                <h3 className="text-base font-bold text-[#252522]">Kitchen Display & Table Management Console</h3>
              </div>
              <p className="text-xs text-[#6E6D66] mt-0.5">Sample live view for The Corner Café</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#EBF1ED] text-[#5F7A65] border border-[#D5E1D8]">
                3 Active Kitchen Tickets
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#FAF2EE] text-[#D66B43] border border-[#F3DFD8]">
                9/14 Tables Occupied
              </span>
            </div>
          </div>

          {/* Mockup Ticket Board (3 Tickets) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Ticket 1: Preparing */}
            <div className="rounded-2xl p-5 bg-[#FAF8F3] border border-[#ECE7DE] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#252522]">#TK-41 • TABLE 3</span>
                <span className="text-[11px] font-semibold text-[#D66B43] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>4:20 elapsed</span>
                </span>
              </div>
              <div className="text-xs text-[#252522] space-y-1.5 border-t border-[#ECE7DE] pt-2.5">
                <p className="font-semibold">1x Crispy Paneer Makhani Bowl</p>
                <p className="text-[11px] text-[#D66B43]">Note: Medium spice requested</p>
                <p className="font-semibold pt-1">1x Iced Hazelnut Cold Coffee</p>
              </div>
              <div className="pt-2 border-t border-[#ECE7DE] flex items-center justify-between text-xs">
                <span className="font-bold text-[#252522]">₹320.25</span>
                <span className="px-2 py-0.5 rounded bg-[#FAF2EE] text-[#D66B43] font-semibold text-[10px]">
                  Cooking
                </span>
              </div>
            </div>

            {/* Ticket 2: Takeaway Pre-order */}
            <div className="rounded-2xl p-5 bg-[#FAF8F3] border border-[#ECE7DE] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#252522]">#TK-42 • TAKEAWAY</span>
                <span className="text-[11px] font-semibold text-[#5F7A65] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Pickup 1:15 PM</span>
                </span>
              </div>
              <div className="text-xs text-[#252522] space-y-1.5 border-t border-[#ECE7DE] pt-2.5">
                <p className="font-semibold">2x Double Decker Veg Burger</p>
                <p className="font-semibold">1x Cheesy Loaded Truffle Fries</p>
                <p className="text-[11px] text-[#6E6D66]">Pack ketchup packets</p>
              </div>
              <div className="pt-2 border-t border-[#ECE7DE] flex items-center justify-between text-xs">
                <span className="font-bold text-[#252522]">₹554.40</span>
                <span className="px-2 py-0.5 rounded bg-[#EBF1ED] text-[#5F7A65] font-semibold text-[10px]">
                  Scheduled (Ready in 3m)
                </span>
              </div>
            </div>

            {/* Ticket 3: Ready for Table 7 */}
            <div className="rounded-2xl p-5 bg-[#FAF8F3] border border-[#ECE7DE] space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#252522]">#TK-40 • TABLE 7</span>
                <span className="text-[11px] font-semibold text-[#5F7A65] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ready</span>
                </span>
              </div>
              <div className="text-xs text-[#252522] space-y-1.5 border-t border-[#ECE7DE] pt-2.5">
                <p className="font-semibold">2x Peri-Peri Chicken Burger</p>
                <p className="font-semibold">2x Mint Mojito Fizz</p>
              </div>
              <div className="pt-2 border-t border-[#ECE7DE] flex items-center justify-between text-xs">
                <span className="font-bold text-[#252522]">₹546.00</span>
                <span className="px-2 py-0.5 rounded bg-[#5F7A65] text-white font-semibold text-[10px]">
                  Served to Table
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
