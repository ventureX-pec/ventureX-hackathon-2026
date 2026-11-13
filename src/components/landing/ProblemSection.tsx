"use client";

import React from "react";
import { motion } from "motion/react";
import { Clock, HelpCircle, FileText, ArrowRight } from "lucide-react";

export const ProblemSection = () => {
  const painPoints = [
    {
      icon: Clock,
      title: "Long Waiting Times During Peak Hours",
      description:
        "When lunch hour hits, a single ordering counter creates lengthy queues. Diners with 30-minute breaks spend half their time simply waiting to order.",
      highlight: "10–15 mins lost in line",
    },
    {
      icon: HelpCircle,
      title: "No Easy Way to Check Menus and Availability",
      description:
        "Customers have to walk in physically or make repetitive phone calls just to check what dishes are on offer, their current prices, or if an item has sold out.",
      highlight: "Staff tied up on phone calls",
    },
    {
      icon: FileText,
      title: "Restaurant Staff Managing Orders Manually",
      description:
        "Orders written down on paper chits are prone to errors, misplacement, and confusion between dine-in tables and takeaway parcels in the kitchen.",
      highlight: "Misplaced tickets & order mixups",
    },
  ];

  return (
    <section id="problem" className="py-20 sm:py-28 bg-[#F5F2EB] border-y border-[#ECE7DE]">
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
            The Everyday Reality
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252522] mt-3">
            Your Lunch Break Shouldn&apos;t Be Spent in a Queue.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            Dining out during busy hours often feels like an exercise in patience. 
            Both hungry diners and hard-working restaurant staff face the same daily bottlenecks.
          </p>
        </motion.div>

        {/* Three Pain Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-8 border border-[#ECE7DE] shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-center text-[#D66B43] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#252522] mb-3 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-sm text-[#6E6D66] leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F7F4EE]">
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FAF2EE] text-[#D66B43]">
                    {point.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
