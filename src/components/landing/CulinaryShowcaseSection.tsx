"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { Sparkles } from "lucide-react";

export const CulinaryShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#FAF8F3] relative overflow-hidden w-full border-b border-[#ECE7DE]"
    >
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Curated Dining
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252522] mt-3">
            Freshly Prepared by Our Partner Kitchens
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E6D66] max-w-xl mx-auto">
            Scroll to rotate through today&apos;s trending dishes. Tap any plate to inspect.
          </p>
        </motion.div>
      </div>

      {/* Full-Length, Edge-to-Edge 3D Carousel (NO Box, NO dashed borders) */}
      <div className="w-full">
        <ThreeDPhotoCarousel scrollContainerRef={sectionRef} />
      </div>

      {/* Subtle indicator bar below carousel */}
      <div className="text-center mt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-[#6E6D66] bg-white border border-[#ECE7DE] px-3.5 py-1.5 rounded-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D66B43]" />
          <span>Interactive 3D Cylinder • Rotates with scroll or drag</span>
        </span>
      </div>
    </section>
  );
};
