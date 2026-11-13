"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  QrCode,
  Smartphone,
  ChefHat,
  BarChart3,
  ListOrdered,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: "qr-menu",
      icon: QrCode,
      title: "QR Digital Menu",
      tagline: "Always up-to-date, interactive menus right on guest tables.",
      description:
        "Replace expensive printed paper menus that get damaged and outdated. DineFlow digital menus load instantly in mobile browsers without downloading an app. Guests browse dishes with high-resolution imagery, dietary indicators, spice levels, and customization options.",
      highlights: [
        "Instant contactless access via custom table QR standees",
        "Dietary badges: Pure Vegetarian, Vegan, Non-Veg, and Gluten-Free",
        "Instant item out-of-stock toggle (86'd) in a single tap",
        "Zero customer app installation needed",
      ],
      previewType: "menu",
    },
    {
      id: "ordering",
      icon: Smartphone,
      title: "Smart Online Ordering",
      tagline: "Seamless ordering for both dine-in guests and takeaway regulars.",
      description:
        "Dine-in guests order directly from their seats, while neighborhood students and office workers can pre-order their lunch takeaway in advance. Guests pay instantly through direct UPI or choose to settle at the counter, eliminating counter bottlenecks.",
      highlights: [
        "Pre-scheduled takeaway slots tailored for peak lunch breaks",
        "Direct UPI scan & instant verification or counter pay option",
        "Custom item modifiers (add-ons, spice preference, special notes)",
        "Zero platform commissions or third-party intermediary cuts",
      ],
      previewType: "ordering",
    },
    {
      id: "live-orders",
      icon: ListOrdered,
      title: "Live Order Management",
      tagline: "Synchronized order intake connecting floor, counter, and kitchen.",
      description:
        "Consolidate every incoming order into a centralized digital stream. Front-of-house staff can monitor table occupancy, generate kitchen order tickets (KOT), settle bills, and track active orders in real time without confusion.",
      highlights: [
        "Real-time status updates from order placement to meal service",
        "Color-coded separation between dine-in tables and takeaway pickup",
        "Instant digital receipt generation and itemized billing",
        "Eliminates misplaced paper order tickets completely",
      ],
      previewType: "orders",
    },
    {
      id: "kds",
      icon: ChefHat,
      title: "Kitchen Display System (KDS)",
      tagline: "Clear, time-tracked order tickets engineered for culinary staff.",
      description:
        "Mount any standard tablet or monitor in the kitchen. Order cards appear in chronological sequence with live elapsed preparation timers. Kitchen staff advance order tickets from Preparing to Ready with a single tap, keeping service pacing smooth.",
      highlights: [
        "Chronological Kanban ticket columns: Received, In Prep, Ready",
        "Active elapsed timers warning when preparation exceeds target time",
        "One-tap ticket advancement and clear allergen/note callouts",
        "Audio and visual chimes when new tickets arrive",
      ],
      previewType: "kds",
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: "Restaurant Analytics",
      tagline: "Understand peak rush periods, top-selling dishes, and table turns.",
      description:
        "Gain clear visibility into daily sales trends, hourly peak demand patterns, and average preparation duration. Use real customer data to optimize prep scheduling, reduce food waste, and staff accurately for lunch rushes.",
      highlights: [
        "Hourly volume heatmap showing the 12:00 PM – 2:30 PM peak surge",
        "Popular item performance ranking by revenue and volume",
        "Average preparation and turnover duration metrics",
        "Daily, weekly, and monthly revenue summaries",
      ],
      previewType: "analytics",
    },
  ];

  const current = features[activeTab];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Core Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#252522] mt-3">
            Designed for the Realities of Running an Independent Kitchen
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            Every feature in DineFlow was built to eliminate operational bottlenecks, reduce staffing stress, 
            and elevate the guest dining experience.
          </p>
        </div>

        {/* Feature Tab Navigation */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#ECE7DE] mb-12">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#252522] text-[#FAF8F3] shadow-soft font-semibold"
                    : "bg-white text-[#6E6D66] hover:text-[#252522] hover:bg-[#F3EFE8] border border-[#ECE7DE]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#D66B43]" : "text-[#6E6D66]"}`} />
                <span>{feat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Content Display Box */}
        <div className="rounded-3xl bg-white border border-[#ECE7DE] p-6 sm:p-10 lg:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Narrative & Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2EE] text-[#D66B43] text-xs font-semibold">
                  <span>Feature {activeTab + 1} of 5</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#252522] mt-3">
                  {current.title}
                </h3>
                <p className="text-base font-medium text-[#D66B43] mt-1">
                  {current.tagline}
                </p>
                <p className="text-sm sm:text-base text-[#6E6D66] mt-4 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Bullet Checklist */}
              <div className="space-y-3 pt-2">
                {current.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#252522]">
                    <CheckCircle2 className="w-4 h-4 text-[#5F7A65] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Link */}
              <div className="pt-4">
                <Link
                  href={
                    current.previewType === "menu"
                      ? "/menu"
                      : current.previewType === "kds"
                      ? "/kitchen"
                      : current.previewType === "orders"
                      ? "/pos"
                      : "/admin"
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D66B43] hover:text-[#BF5832] transition-colors group"
                >
                  <span>Experience this live in the application</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: Realistic UI Visual Component Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] p-5 sm:p-6 shadow-soft">
                
                {/* PREVIEW 1: DIGITAL MENU CARD */}
                {current.previewType === "menu" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                      <div>
                        <p className="text-xs font-medium text-[#6E6D66]">Digital Guest View</p>
                        <p className="text-sm font-bold text-[#252522]">Table 4 • Menu Catalog</p>
                      </div>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#EBF1ED] text-[#5F7A65]">
                        Instant Mobile Web
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#ECE7DE] flex gap-3.5 items-center">
                      <img
                        src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80"
                        alt="Paneer bowl"
                        className="w-18 h-18 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2 h-2 rounded-full bg-[#5F7A65]" />
                          <span className="text-[11px] font-medium text-[#5F7A65]">Vegetarian • 8m Prep</span>
                        </div>
                        <p className="text-sm font-semibold text-[#252522]">Crispy Paneer Makhani Bowl</p>
                        <p className="text-xs text-[#6E6D66] line-clamp-1">Creamy makhani gravy over jeera rice</p>
                        <p className="text-xs font-bold text-[#252522] mt-1">₹180.00</p>
                      </div>
                      <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#ECE7DE] text-[#252522]">
                        + Add
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#ECE7DE] flex gap-3.5 items-center">
                      <img
                        src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80"
                        alt="Iced cold brew"
                        className="w-18 h-18 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-2 h-2 rounded-full bg-[#5F7A65]" />
                          <span className="text-[11px] font-medium text-[#5F7A65]">Popular Beverage • 3m Prep</span>
                        </div>
                        <p className="text-sm font-semibold text-[#252522]">Iced Hazelnut Cold Coffee</p>
                        <p className="text-xs text-[#6E6D66] line-clamp-1">Slow-brewed dark roast espresso</p>
                        <p className="text-xs font-bold text-[#252522] mt-1">₹95.00</p>
                      </div>
                      <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#ECE7DE] text-[#252522]">
                        + Add
                      </span>
                    </div>
                  </div>
                )}

                {/* PREVIEW 2: SMART ORDERING & PRE-ORDER */}
                {current.previewType === "ordering" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                      <div>
                        <p className="text-xs font-medium text-[#6E6D66]">Order Mode Selection</p>
                        <p className="text-sm font-bold text-[#252522]">Campus Lunch Break Checkout</p>
                      </div>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FAF2EE] text-[#D66B43]">
                        Zero Commission
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl border-2 border-[#D66B43] bg-white">
                        <p className="text-xs font-bold text-[#252522]">Dine-In Table</p>
                        <p className="text-[11px] text-[#6E6D66] mt-0.5">Table #4 (QR Scanned)</p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-[#ECE7DE] bg-white">
                        <p className="text-xs font-bold text-[#252522]">Scheduled Pickup</p>
                        <p className="text-[11px] text-[#6E6D66] mt-0.5">Ready at 1:20 PM</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-[#ECE7DE] space-y-2">
                      <div className="flex justify-between text-xs text-[#6E6D66]">
                        <span>Subtotal (2 items)</span>
                        <span>₹275.00</span>
                      </div>
                      <div className="flex justify-between text-xs text-[#6E6D66]">
                        <span>Taxes & Kitchen Service</span>
                        <span>₹13.75</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-[#252522] pt-2 border-t border-[#F7F4EE]">
                        <span>Total Due</span>
                        <span className="text-[#D66B43]">₹288.75</span>
                      </div>
                      <div className="pt-2">
                        <div className="w-full py-2 rounded-lg bg-[#252522] text-[#FAF8F3] text-center text-xs font-medium">
                          Pay Directly via UPI QR or Counter
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PREVIEW 3: LIVE ORDER STREAM */}
                {current.previewType === "orders" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                      <div>
                        <p className="text-xs font-medium text-[#6E6D66]">Central Order Console</p>
                        <p className="text-sm font-bold text-[#252522]">Floor & Counter Status</p>
                      </div>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#EBF1ED] text-[#5F7A65]">
                        Live Sync
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="bg-white p-3.5 rounded-xl border border-[#ECE7DE] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#252522]">#TK-41</span>
                            <span className="text-[11px] px-2 py-0.2 rounded bg-[#FAF2EE] text-[#D66B43] font-medium">
                              Table 3
                            </span>
                          </div>
                          <p className="text-xs text-[#6E6D66] mt-0.5">Aarav S. • Paneer Bowl & Cold Coffee</p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FAF2EE] text-[#D66B43]">
                          Preparing
                        </span>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-[#ECE7DE] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#252522]">#TK-42</span>
                            <span className="text-[11px] px-2 py-0.2 rounded bg-[#EBF1ED] text-[#5F7A65] font-medium">
                              Takeaway (1:20 PM)
                            </span>
                          </div>
                          <p className="text-xs text-[#6E6D66] mt-0.5">Priya V. • 2x Veg Crunch Burger Combo</p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#EBF1ED] text-[#5F7A65]">
                          Ready for Pickup
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PREVIEW 4: KITCHEN DISPLAY SYSTEM */}
                {current.previewType === "kds" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                      <div>
                        <p className="text-xs font-medium text-[#6E6D66]">Kitchen Station Display</p>
                        <p className="text-sm font-bold text-[#252522]">Station 1 (Hot Line & Grill)</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#5F7A65] font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#5F7A65]" />
                        <span>Online</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#D66B43]/30 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#252522]">TICKET #41 • TABLE 3</span>
                        <span className="flex items-center gap-1 text-xs text-[#D66B43] font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>4:20 elapsed</span>
                        </span>
                      </div>

                      <div className="text-xs space-y-1.5 text-[#252522] border-t border-[#F7F4EE] pt-2">
                        <div className="flex justify-between">
                          <span className="font-medium">1x Crispy Paneer Makhani Bowl</span>
                          <span className="text-[#6E6D66]">Line 1</span>
                        </div>
                        <p className="text-[11px] text-[#D66B43] font-medium pl-3 border-l-2 border-[#D66B43]">
                          Note: Medium spice level requested
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#F7F4EE] flex justify-end">
                        <span className="px-3 py-1.5 rounded-lg bg-[#5F7A65] text-white text-xs font-medium">
                          Mark Ticket Ready
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PREVIEW 5: ANALYTICS & INSIGHTS */}
                {current.previewType === "analytics" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                      <div>
                        <p className="text-xs font-medium text-[#6E6D66]">Performance Overview</p>
                        <p className="text-sm font-bold text-[#252522]">Today&apos;s Lunch Capacity</p>
                      </div>
                      <span className="text-xs font-semibold text-[#5F7A65] flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+28% Peak Efficiency</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white border border-[#ECE7DE]">
                        <p className="text-[11px] text-[#6E6D66]">Average Ticket Time</p>
                        <p className="text-lg font-bold text-[#252522] mt-0.5">8.4 mins</p>
                        <p className="text-[10px] text-[#5F7A65] mt-0.5">-6m from manual slips</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-[#ECE7DE]">
                        <p className="text-[11px] text-[#6E6D66]">Completed Orders</p>
                        <p className="text-lg font-bold text-[#252522] mt-0.5">64 Orders</p>
                        <p className="text-[10px] text-[#5F7A65] mt-0.5">100% Direct Revenue</p>
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-[#ECE7DE]">
                      <p className="text-xs font-semibold text-[#252522] mb-2">Hourly Order Volume</p>
                      <div className="flex items-end gap-2 h-16 pt-2">
                        <div className="flex-1 bg-[#FAF2EE] rounded-t h-[30%]" title="11:00 AM" />
                        <div className="flex-1 bg-[#FAF2EE] rounded-t h-[45%]" title="12:00 PM" />
                        <div className="flex-1 bg-[#D66B43] rounded-t h-[95%]" title="1:00 PM Lunch Rush" />
                        <div className="flex-1 bg-[#D66B43] rounded-t h-[80%]" title="1:30 PM Peak" />
                        <div className="flex-1 bg-[#FAF2EE] rounded-t h-[40%]" title="2:30 PM" />
                        <div className="flex-1 bg-[#FAF2EE] rounded-t h-[55%]" title="Evening" />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#6E6D66] mt-1">
                        <span>11 AM</span>
                        <span className="font-semibold text-[#D66B43]">1 PM Peak Rush</span>
                        <span>Evening</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
