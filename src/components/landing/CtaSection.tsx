"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-[#252522] text-[#FAF8F3] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-elevated"
        >
          {/* Subtle Warm Amber Glow in Top Right */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D66B43]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#FAF8F3] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#D66B43]" />
              <span>Less Waiting. More Enjoying.</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready for a Better Dining Experience?
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Whether you&apos;re looking for your next meal or running a local restaurant, 
              DINEFLOW brings a smarter dining experience closer.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.a
                href="#customers"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D66B43] text-white font-medium text-sm hover:bg-[#BF5832] transition-colors shadow-soft"
              >
                <span>Explore DINEFLOW</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#restaurants"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-colors"
              >
                <span>Partner With Us</span>
              </motion.a>
            </div>

            {/* Reassurances */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7A65]" />
                <span>Zero commission on orders</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7A65]" />
                <span>No app download needed for diners</span>
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5F7A65]" />
                <span>Set up in under 10 minutes</span>
              </span>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
