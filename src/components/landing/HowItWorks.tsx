"use client";

import React from "react";
import { motion } from "motion/react";
import { Search, ShoppingBag, Utensils, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Discover",
      tagline: "Find a restaurant near you.",
      description:
        "Open DineFlow to explore local independent eateries, compare preparation times, and browse visual digital menus right from your phone.",
    },
    {
      step: "02",
      icon: ShoppingBag,
      title: "Order",
      tagline: "Choose your food and place your order.",
      description:
        "Select takeaway pickup or your dining table, customize your dishes with special instructions, and pay seamlessly via direct UPI or at the counter.",
    },
    {
      step: "03",
      icon: Utensils,
      title: "Enjoy",
      tagline: "Collect your food or enjoy dine-in.",
      description:
        "Step in just as your meal is ready. Skip the 15-minute ordering queue completely and spend your lunch break doing what matters: enjoying your food.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F5F2EB] border-y border-[#ECE7DE]">
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
            Simple & Effortless
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252522] mt-3">
            How DINEFLOW Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            Three simple steps between deciding what to eat and savoring your meal.
          </p>
        </motion.div>

        {/* 3-Step Connected Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-8 border border-[#ECE7DE] shadow-soft hover:shadow-card transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Step Pill & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#E5E0D5] group-hover:text-[#D66B43] transition-colors">
                      {s.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-center text-[#D66B43]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#252522] mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D66B43] mb-3">
                    {s.tagline}
                  </p>
                  <p className="text-sm text-[#6E6D66] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F7F4EE] flex items-center justify-between text-xs text-[#5F7A65] font-medium">
                  <span>Step {index + 1} of 3</span>
                  <span className="w-2 h-2 rounded-full bg-[#5F7A65]" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
