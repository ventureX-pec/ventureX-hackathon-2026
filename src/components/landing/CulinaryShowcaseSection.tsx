"use client";

import React from "react";
import { motion } from "motion/react";
import { ThreeDPhotoCarouselDemo } from "@/components/ui/demo";
import { Sparkles, UtensilsCrossed } from "lucide-react";

export const CulinaryShowcaseSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F3] border-b border-[#ECE7DE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Curated Dining
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#252522] mt-3">
            Freshly Prepared by Our Partner Kitchens
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            Drag to rotate through today&apos;s trending dishes. Tap any plate to inspect details.
          </p>
        </motion.div>

        {/* 3D Carousel Mount */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7 }}
        >
          <ThreeDPhotoCarouselDemo />
        </motion.div>

      </div>
    </section>
  );
};
