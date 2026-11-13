"use client";

import React from "react";
import { Store, QrCode, MonitorCheck, ArrowRight, Check } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Store,
      title: "Set Up Your Restaurant",
      tagline: "Live in less than ten minutes.",
      description:
        "Input your dishes, categorize by course, set dietary tags, and customize pricing. Generate elegant, printable QR standee cards for your dining tables with a single click.",
      details: [
        "Simple digital menu onboarding",
        "Configurable table count & seating maps",
        "Instant out-of-stock toggle (86'd items)",
      ],
    },
    {
      number: "02",
      icon: QrCode,
      title: "Guests Place Orders",
      tagline: "Zero queues, zero friction.",
      description:
        "Dine-in customers scan the table QR code to browse, customize, and order instantly. Nearby students and office workers can pre-order takeaway to bypass the counter line.",
      details: [
        "Loads directly in mobile browsers",
        "Custom spice levels and add-ons",
        "Direct UPI scan or pay-at-counter",
      ],
    },
    {
      number: "03",
      icon: MonitorCheck,
      title: "Manage Everything From One Hub",
      tagline: "Total operational harmony.",
      description:
        "Orders route automatically to the Kitchen Display System with preparation timers. The cashier terminal tracks bills, while owner analytics provide peak-hour clarity.",
      details: [
        "Real-time kitchen ticket Kanban",
        "Table occupancy and billing status",
        "Peak lunch rush volume tracking",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F5F2EB] border-y border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Simple Implementation
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#252522] mt-3">
            How DineFlow Transforms Your Everyday Service
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            No expensive hardware installations. No complex staff training manuals. 
            A straightforward three-step transition to digital hospitality.
          </p>
        </div>

        {/* Three Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-8 border border-[#ECE7DE] shadow-soft hover:shadow-card transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-[#E2DDD3] group-hover:text-[#D66B43] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-center text-[#D66B43]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Narrative */}
                  <h3 className="text-xl font-semibold text-[#252522]">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#D66B43] mt-1 mb-3">
                    {step.tagline}
                  </p>
                  <p className="text-sm text-[#6E6D66] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Checklist */}
                <div className="pt-6 mt-6 border-t border-[#F7F4EE] space-y-2.5">
                  {step.details.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#252522]">
                      <Check className="w-3.5 h-3.5 text-[#5F7A65] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
