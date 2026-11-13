"use client";

import React from "react";
import { Users, FileText, PhoneCall, AlertCircle, ArrowRight } from "lucide-react";

export const ProblemSection = () => {
  const challenges = [
    {
      icon: Users,
      title: "Long Counter Queues",
      description:
        "During lunch and evening peaks, a single ordering counter creates lengthy wait times. Busy diners and office workers with limited breaks frequently leave rather than wait in line.",
    },
    {
      icon: FileText,
      title: "Manual Order Slips & Errors",
      description:
        "Handwritten tickets passed across busy counters easily get misplaced, misinterpreted, or delayed, leading to incorrect dishes, wasted ingredients, and customer frustration.",
    },
    {
      icon: PhoneCall,
      title: "Repeated Customer Inquiries",
      description:
        "Staff spend valuable floor time repeatedly answering phone calls regarding menu pricing, item availability, and takeaway readiness instead of attending to guests in the room.",
    },
    {
      icon: AlertCircle,
      title: "Inefficient Kitchen Coordination",
      description:
        "Without live digital status tracking, the kitchen cannot easily prioritize dine-in tables versus advance takeaway orders, creating uneven prep pacing during high-volume periods.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F5F2EB] border-y border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Operational Reality
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#252522] mt-3">
            The Everyday Friction Behind Independent Hospitality
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            Most local cafés and family-run restaurants lose guests not because of culinary quality or price, 
            but because peak-hour ordering logistics overwhelm limited floor staff.
          </p>
        </div>

        {/* 4-Card Problem Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#ECE7DE] shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-center text-[#D66B43] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#252522] mb-2.5">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[#6E6D66] leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F7F4EE] flex items-center text-xs font-medium text-[#5F7A65]">
                  <span>Addressed by DineFlow</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
