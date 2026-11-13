"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChefHat,
  MenuSquare,
  ListOrdered,
  Clock,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BellRing,
} from "lucide-react";

export const ForRestaurantsSection = () => {
  const [operationsStage, setOperationsStage] = useState<"received" | "preparing" | "ready">("preparing");

  // Cycle through operations lifecycle every 4 seconds to demonstrate live KDS workflow
  useEffect(() => {
    const interval = setInterval(() => {
      setOperationsStage((prev) => {
        if (prev === "received") return "preparing";
        if (prev === "preparing") return "ready";
        return "received";
      });
    }, 4200);
    return () => clearInterval(interval);
  }, []);

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

        {/* 6 Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
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
            transition={{ delay: 0.45, duration: 0.5 }}
            whileHover={{ y: -4 }}
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

        {/* Animated Visual Representation of Restaurant Operations */}
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
                <h3 className="text-base font-bold text-[#252522]">Live Kitchen Coordination Workflow</h3>
              </div>
              <p className="text-xs text-[#6E6D66] mt-0.5">Automated ticket progression demonstration</p>
            </div>

            {/* Stage Selector Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE]">
              <button
                onClick={() => setOperationsStage("received")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  operationsStage === "received" ? "bg-[#FAF2EE] text-[#D66B43] shadow-xs" : "text-[#6E6D66]"
                }`}
              >
                1. New Order
              </button>
              <button
                onClick={() => setOperationsStage("preparing")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  operationsStage === "preparing" ? "bg-[#FAF2EE] text-[#D66B43] shadow-xs" : "text-[#6E6D66]"
                }`}
              >
                2. In Kitchen
              </button>
              <button
                onClick={() => setOperationsStage("ready")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  operationsStage === "ready" ? "bg-[#EBF1ED] text-[#5F7A65] shadow-xs" : "text-[#6E6D66]"
                }`}
              >
                3. Ready
              </button>
            </div>
          </div>

          {/* Animated Coordinated Order Ticket Showcase */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* STAGE 1: ORDER ENTRY */}
            <motion.div
              animate={{
                borderColor: operationsStage === "received" ? "#D66B43" : "#ECE7DE",
                scale: operationsStage === "received" ? 1.02 : 1.0,
              }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-5 border transition-all ${
                operationsStage === "received" ? "bg-[#FAF8F3] shadow-card ring-1 ring-[#D66B43]/30" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F7F4EE]">
                <div className="flex items-center gap-2">
                  <BellRing className={`w-4 h-4 ${operationsStage === "received" ? "text-[#D66B43] animate-bounce" : "text-[#6E6D66]"}`} />
                  <span className="text-xs font-bold text-[#252522]">Step 1: Order Intake</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF2EE] text-[#D66B43]">
                  Guest QR Scanned
                </span>
              </div>
              <div className="mt-3 text-xs text-[#252522] space-y-1.5">
                <p className="font-semibold text-sm">Table #4 • Order #TK-44</p>
                <p className="text-[#6E6D66]">1x Crispy Paneer Makhani Bowl</p>
                <p className="text-[#6E6D66]">1x Iced Hazelnut Cold Coffee</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F7F4EE] flex justify-between items-center text-xs">
                <span className="text-[#6E6D66]">Routed to line</span>
                <span className="font-bold text-[#5F7A65]">Instant &lt;0.2s</span>
              </div>
            </motion.div>

            {/* STAGE 2: KITCHEN DISPLAY */}
            <motion.div
              animate={{
                borderColor: operationsStage === "preparing" ? "#D66B43" : "#ECE7DE",
                scale: operationsStage === "preparing" ? 1.02 : 1.0,
              }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-5 border transition-all ${
                operationsStage === "preparing" ? "bg-[#FAF8F3] shadow-card ring-1 ring-[#D66B43]/30" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F7F4EE]">
                <div className="flex items-center gap-2">
                  <ChefHat className={`w-4 h-4 ${operationsStage === "preparing" ? "text-[#D66B43]" : "text-[#6E6D66]"}`} />
                  <span className="text-xs font-bold text-[#252522]">Step 2: Active Prep</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF2EE] text-[#D66B43] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Cooking (4m)</span>
                </span>
              </div>
              <div className="mt-3 text-xs text-[#252522] space-y-1.5">
                <p className="font-semibold text-sm">Line 1: Hot Station</p>
                <p className="text-[#D66B43] font-medium bg-white px-2 py-1 rounded border border-[#ECE7DE]">
                  Chef Note: Medium spice requested
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F7F4EE] flex justify-between items-center text-xs">
                <span className="text-[#6E6D66]">Timer Pacing</span>
                <span className="font-bold text-[#D66B43]">On Target</span>
              </div>
            </motion.div>

            {/* STAGE 3: ORDER READY */}
            <motion.div
              animate={{
                borderColor: operationsStage === "ready" ? "#5F7A65" : "#ECE7DE",
                scale: operationsStage === "ready" ? 1.02 : 1.0,
              }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-5 border transition-all ${
                operationsStage === "ready" ? "bg-[#EBF1ED] shadow-card ring-1 ring-[#5F7A65]/30" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#D5E1D8]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${operationsStage === "ready" ? "text-[#5F7A65]" : "text-[#6E6D66]"}`} />
                  <span className="text-xs font-bold text-[#252522]">Step 3: Service Call</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#5F7A65] text-white">
                  Ready for Guest
                </span>
              </div>
              <div className="mt-3 text-xs text-[#252522] space-y-1.5">
                <p className="font-semibold text-sm">Table #4 Alert Sent</p>
                <p className="text-[#5F7A65] font-medium">Food plated & served without delay</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D5E1D8] flex justify-between items-center text-xs">
                <span className="text-[#5F7A65]">Total Turnaround</span>
                <span className="font-bold text-[#5F7A65]">7.8 Minutes</span>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
