"use client";

import React from "react";

export const MonoMetrics = () => {
  const metrics = [
    {
      value: "0.0%",
      label: "PLATFORM COMMISSION",
      detail: "Family cafes keep 100% margin. Zero 25–30% aggregator commission cuts.",
    },
    {
      value: "10s",
      label: "SCAN-TO-ORDER SPEED",
      detail: "Direct table QR intake eliminates the 15-minute single-counter queue.",
    },
    {
      value: "3.4x",
      label: "LUNCH PEAK TURNOVER",
      detail: "Scheduled pre-orders allow college students to grab & go during 30m lunch breaks.",
    },
    {
      value: "100%",
      label: "DIRECT UPI & CASH",
      detail: "Instant settlement straight to the owner's bank account. No delayed payouts.",
    },
  ];

  return (
    <section id="metrics" className="py-20 border-y border-white/10 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="mono-tag text-neutral-400">[ 02 // PERFORMANCE METRICS ]</span>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-white mt-2">
              Engineered for the Peak Lunch Rush.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Quantifiable impact measured against the Corner Café case study challenges.
          </p>
        </div>

        {/* 4-Column Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {metrics.map((m, idx) => (
            <div key={m.label} className={`pt-6 sm:pt-0 ${idx !== 0 ? "sm:pl-8" : ""}`}>
              <p className="mono-tag text-neutral-400 mb-3">{m.label}</p>
              <p className="text-5xl sm:text-6xl font-medium tracking-tight text-white mb-3">
                {m.value}
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {m.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
