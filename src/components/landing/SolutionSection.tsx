"use client";

import React from "react";
import { motion } from "motion/react";
import { Compass, ShoppingBag, LayoutDashboard, CheckCircle2, Clock, Sparkles } from "lucide-react";

export const SolutionSection = () => {
  const solutions = [
    {
      icon: Compass,
      tag: "For Diners",
      title: "Discover Local Restaurants",
      tagline: "Find nearby eateries and explore their live menus.",
      description:
        "Browse independent cafes, college neighborhood diners, and family eateries around you. See visual menus with up-to-date pricing, ingredient details, and accurate preparation times before leaving your desk.",
      perks: [
        "Live estimated preparation times",
        "Dietary indicators (Veg, Vegan, Gluten-Free)",
        "Accurate real-time dish availability",
      ],
      previewImg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: ShoppingBag,
      tag: "Order Ahead",
      title: "Order Before You Arrive",
      tagline: "Cut unnecessary waiting completely out of your day.",
      description:
        "Place your order ahead while walking from your lecture or office. Whether you are grabbing a quick takeaway bowl or sitting down at a table, your meal is freshly prepped and ready when you step inside.",
      perks: [
        "Scheduled takeaway pickup slots",
        "Direct contactless table QR ordering",
        "Direct UPI scan & instant confirmation",
      ],
      previewImg: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: LayoutDashboard,
      tag: "For Kitchens",
      title: "A Smarter Restaurant Experience",
      tagline: "One unified system for incoming orders, menus & kitchen.",
      description:
        "Local restaurants receive digital orders routed straight to a kitchen display screen. No more misplaced slips, manual phone calls, or chaotic counter crowds. Staff focus entirely on hospitality and food quality.",
      perks: [
        "Real-time Kitchen Display (KDS) with timers",
        "1-click dish out-of-stock toggle (86'd)",
        "Zero aggregator commissions (keep 100% margin)",
      ],
      previewImg: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section id="customers" className="py-20 sm:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            The DINEFLOW Solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252522] mt-3">
            A Better Way to Discover, Order & Dine.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            DineFlow bridges the gap between hungry diners on tight schedules and local 
            independent kitchens looking to serve smarter.
          </p>
        </motion.div>

        {/* 3 Solution Feature Cards */}
        <div className="space-y-12">
          {solutions.map((sol, index) => {
            const Icon = sol.icon;
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`rounded-3xl bg-white border border-[#ECE7DE] p-8 sm:p-10 lg:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
              >
                {/* Text Side */}
                <div className={`lg:col-span-6 space-y-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#5F7A65] text-xs font-semibold">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{sol.tag}</span>
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#252522] mt-3">
                      {sol.title}
                    </h3>
                    <p className="text-base font-semibold text-[#D66B43] mt-1">
                      {sol.tagline}
                    </p>
                    <p className="text-sm sm:text-base text-[#6E6D66] mt-4 leading-relaxed">
                      {sol.description}
                    </p>
                  </div>

                  {/* Perks Checklist */}
                  <div className="space-y-2.5 pt-2 border-t border-[#F7F4EE]">
                    {sol.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-[#252522]">
                        <CheckCircle2 className="w-4 h-4 text-[#5F7A65] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Image Preview Side */}
                <div className={`lg:col-span-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden border border-[#ECE7DE] shadow-soft aspect-16/10 bg-[#FAF8F3]"
                  >
                    <img
                      src={sol.previewImg}
                      alt={sol.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-xs font-bold drop-shadow-sm">
                        {sol.title}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium">
                        Seamless Flow
                      </span>
                    </div>
                  </motion.div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
