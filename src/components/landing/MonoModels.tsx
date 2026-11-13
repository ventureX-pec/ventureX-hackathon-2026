"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Smartphone,
  ChefHat,
  MonitorCheck,
  LayoutDashboard,
  ArrowUpRight,
  Check,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

export const MonoModels = () => {
  const [activeModel, setActiveModel] = useState<number>(0);

  const models = [
    {
      id: "01",
      name: "Guest QR & Lunch Pre-Order",
      category: "CUSTOMER INTERFACE",
      icon: Smartphone,
      link: "/menu?table=4",
      actionText: "Open Guest Menu",
      tagline: "Instant order intake right from the table or hostel room.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
      specs: [
        { label: "Deployment", value: "Zero App Download (Web-First PWA)" },
        { label: "Scan Time", value: "Under 10 Seconds" },
        { label: "Payment", value: "Direct UPI QR / Pay at Counter" },
        { label: "Key Advantage", value: "Eliminates lunch break counter lines" },
      ],
      features: [
        "Table QR Dine-in: Scan standee, order directly to the kitchen without standing in queue",
        "Scheduled Takeaway: Students can order 20 mins ahead from class and pick up on time",
        "Smart Dietary Filters: Pure Veg, Non-Veg, Vegan, and Quick Prep (<8 min) filters",
        "Live Order Status Tracker: Real-time progress bar from kitchen prep to pickup",
      ],
    },
    {
      id: "02",
      name: "Kitchen Display System (KDS)",
      category: "OPERATIONS CORE",
      icon: ChefHat,
      link: "/kitchen",
      actionText: "Launch Kitchen KDS",
      tagline: "Replaces handwritten paper chits with a synchronized digital Kanban.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80",
      specs: [
        { label: "Device Target", value: "Kitchen Tablets / Wall Display" },
        { label: "Sync Latency", value: "< 250ms Instant Sync" },
        { label: "Alerts", value: "Visual & Audio Bell Chime" },
        { label: "Key Advantage", value: "Zero misplaced tickets or mixed up orders" },
      ],
      features: [
        "Color-Coded Tickets: Amber for Dine-in Table #, Blue for Scheduled Takeaway",
        "Preparation Timers: Turns amber after 10m and red after 15m to prevent delayed meals",
        "1-Tap Status Advancement: Move from Pending -> Cooking -> Ready for Serving",
        "Special Instruction Badges: Clear highlights for 'Less spicy', 'Extra crispy', etc.",
      ],
    },
    {
      id: "03",
      name: "Cashier POS Terminal",
      category: "COUNTER REGISTER",
      icon: MonitorCheck,
      link: "/pos",
      actionText: "Open Counter POS",
      tagline: "Fast walk-in touch billing for guests who still prefer the physical counter.",
      image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80",
      specs: [
        { label: "Workflow", value: "Rapid Touch-Key Ordering" },
        { label: "Tender Types", value: "Cash, UPI, Split Payment" },
        { label: "Table State", value: "Live Occupancy Grid (1-14)" },
        { label: "Key Advantage", value: "Unified billing with no paper confusion" },
      ],
      features: [
        "Touch Grid Speed: Cashier taps items and sends directly to the kitchen in 3 seconds",
        "Table Occupancy Map: Visual indicator of free vs occupied tables and open tabs",
        "Instant KOT Dispatch: Eliminates staff walking slips back and forth to the chef",
        "Quick Bill Settlement: Tender cash, print receipt, or generate quick UPI QR",
      ],
    },
    {
      id: "04",
      name: "Owner Autonomy & AI Magic",
      category: "MANAGEMENT HUB",
      icon: LayoutDashboard,
      link: "/admin",
      actionText: "Explore Owner Hub",
      tagline: "Total control over menu, peak rush hours, and 1-click inventory.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      specs: [
        { label: "Menu AI", value: "Photo & Text Menu Digitizer" },
        { label: "Stock Control", value: "Instant 1-Click 86'd Out-of-Stock" },
        { label: "Table Assets", value: "Printable QR Standee Generator" },
        { label: "Key Advantage", value: "Zero commissions, 100% owner control" },
      ],
      features: [
        "1-Click Stock Toggle: Turn off sold-out dishes in 1 tap so guests can't order them",
        "AI Menu Digitizer: Upload a photo of the paper menu to auto-extract items and prices",
        "Printable QR Standees: Generate custom branded table tent QR cards for Tables 1-14",
        "Lunch Rush Analytics: Visual peak-hour breakdown helping owners schedule kitchen staff",
      ],
    },
  ];

  const current = models[activeModel];

  return (
    <section id="models" className="py-24 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="mono-tag text-neutral-400">[ 03 // ARCHITECTURAL SYSTEM MODELS ]</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-2">
              Four Interlocking Surfaces.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Every persona in the restaurant operates on a synchronized real-time surface.
          </p>
        </div>

        {/* Model Selector Tabs (MONO Style) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 border-b border-white/10 mb-10">
          {models.map((m, idx) => {
            const isActive = activeModel === idx;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModel(idx)}
                className={`flex items-center gap-3 px-5 py-3 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                <span className={`mono-tag text-[10px] ${isActive ? "text-neutral-600" : "text-neutral-500"}`}>
                  {m.id}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-600" : "text-neutral-400"}`} />
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Model Showcase Box */}
        <div className="rounded-3xl bg-[#111113] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Details & Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="mono-tag px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px]">
                  {current.category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-white mt-3">
                  {current.name}
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 mt-2 leading-relaxed">
                  {current.tagline}
                </p>
              </div>

              {/* Technical Spec List */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {current.specs.map((spec) => (
                  <div key={spec.label} className="bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    <p className="mono-tag text-[9px] text-neutral-400 mb-1">{spec.label}</p>
                    <p className="text-xs sm:text-sm font-medium text-white">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-2">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Launch Action */}
              <div className="pt-4">
                <Link
                  href={current.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all active:scale-95 shadow-md"
                >
                  <span>{current.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: High Quality Imagery Card */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 aspect-4/3 sm:aspect-16/10 lg:aspect-square bg-neutral-900 group">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <span className="mono-tag text-[10px] text-neutral-300">SURFACE REPOSITORY</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  REACTIVE STATE SYNC
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
