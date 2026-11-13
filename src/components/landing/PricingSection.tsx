"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter Café",
      badge: null,
      description: "Ideal for small corner coffee shops, kiosks, and food trucks.",
      priceMonthly: "₹1,499",
      priceAnnual: "₹1,199",
      period: "per month",
      popular: false,
      features: [
        "Up to 8 QR dining tables",
        "Mobile-first contactless menu",
        "Instant out-of-stock (86'd) toggle",
        "Direct UPI scan & cash pay",
        "Basic daily sales summary",
        "Email support",
      ],
      ctaText: "Start Free Trial",
    },
    {
      name: "Growth Restaurant",
      badge: "Recommended for Independent Dining",
      description: "Complete operational suite for bustling cafes and family eateries.",
      priceMonthly: "₹2,999",
      priceAnnual: "₹2,399",
      period: "per month",
      popular: true,
      features: [
        "Up to 24 QR dining tables",
        "Full Kitchen Display System (KDS)",
        "Scheduled takeaway & pre-orders",
        "Cashier POS terminal & KOT print",
        "Peak lunch rush heatmap analytics",
        "Table occupancy map",
        "Priority 24/7 WhatsApp & phone support",
      ],
      ctaText: "Get Started with Growth",
    },
    {
      name: "Multi-Outlet / Campus",
      badge: null,
      description: "For busy multi-station cafeterias and growing local restaurant chains.",
      priceMonthly: "₹5,499",
      priceAnnual: "₹4,399",
      period: "per month",
      popular: false,
      features: [
        "Unlimited tables & ordering points",
        "Multiple Kitchen Display screens",
        "Multi-counter cashier registers",
        "AI menu digitizer & photo importer",
        "Advanced inventory & prep forecasting",
        "Custom restaurant branding & domains",
        "Dedicated account onboarding manager",
      ],
      ctaText: "Contact for Outlets",
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#F5F2EB] border-y border-[#ECE7DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#252522] mt-3">
            Predictable Software. Zero Commission Cuts.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            Unlike delivery aggregators that siphon 25–30% of your top-line sales, 
            DineFlow operates on flat, straightforward software subscriptions.
          </p>

          {/* Clearly labelled illustrative pricing notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE6DF] text-[#6E6D66] text-xs">
            <span>Illustrative commercial tiers for independent restaurant operations</span>
          </div>

          {/* Billing Switcher */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-[#252522]" : "text-[#6E6D66]"}`}>
              Billed Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative w-12 h-6 rounded-full bg-[#252522] p-1 transition-colors cursor-pointer"
              aria-label="Toggle Billing Cycle"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  billingCycle === "annual" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${billingCycle === "annual" ? "text-[#252522]" : "text-[#6E6D66]"}`}>
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FAF2EE] text-[#D66B43]">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const price = billingCycle === "annual" ? p.priceAnnual : p.priceMonthly;

            return (
              <div
                key={p.name}
                className={`rounded-3xl p-8 bg-white border transition-all flex flex-col justify-between relative ${
                  p.popular
                    ? "border-2 border-[#D66B43] shadow-card lg:-translate-y-2"
                    : "border-[#ECE7DE] shadow-soft hover:shadow-card"
                }`}
              >
                {/* Popular Pill Badge */}
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D66B43] text-white text-xs font-semibold shadow-xs whitespace-nowrap">
                    {p.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-[#252522]">{p.name}</h3>
                  <p className="text-xs text-[#6E6D66] mt-2 min-h-[34px] leading-relaxed">
                    {p.description}
                  </p>

                  <div className="mt-6 mb-6 pb-6 border-b border-[#F7F4EE]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold tracking-tight text-[#252522]">
                        {price}
                      </span>
                      <span className="text-xs text-[#6E6D66] font-medium">
                        {p.period}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5F7A65] font-medium mt-1">
                      Keep 100% of order revenue (0% commission)
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-[#252522] uppercase tracking-wider">
                      Included Capabilities:
                    </p>
                    {p.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs text-[#252522]">
                        <Check className="w-4 h-4 text-[#5F7A65] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-8 border-t border-[#F7F4EE]">
                  <Link
                    href="/menu"
                    className={`w-full py-3 px-4 rounded-xl text-center text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      p.popular
                        ? "bg-[#D66B43] text-white hover:bg-[#BF5832] shadow-soft"
                        : "bg-[#252522] text-[#FAF8F3] hover:bg-[#383834]"
                    }`}
                  >
                    <span>{p.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
