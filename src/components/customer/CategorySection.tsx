"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CATEGORIES } from "@/data/mockCustomerData";

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onViewAllClick?: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAllClick,
}) => {
  // Triple array for seamless, continuous infinite looping
  const loopingCategories = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

  return (
    <section className="space-y-4 overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252522]">
            Explore Categories
          </h2>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D66B43]/10 text-[#D66B43]">
            Curated Kitchens
          </span>
        </div>

        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold text-[#D66B43] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Infinite Horizontal Marquee moving smoothly from Right to Left */}
      <div className="relative w-full overflow-hidden py-1 group">
        {/* Left & Right subtle gradient fade masks matching warm ivory background */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#FAF8F3] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#FAF8F3] to-transparent" />

        {/* Animated Marquee Strip: 0% -> -33.333% moves RIGHT TO LEFT continuously */}
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          }}
          className="flex items-center gap-4 w-max group-hover:[animation-play-state:paused]"
        >
          {loopingCategories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.div
                key={`${cat.id}-${idx}`}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 w-28 sm:w-32 p-3 sm:p-4 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-between ${
                  isSelected
                    ? "bg-white border-[#D66B43] shadow-card ring-2 ring-[#D66B43]/20"
                    : "bg-white border-[#ECE7DE] hover:border-[#D66B43]/40 shadow-xs"
                }`}
              >
                {/* Category Image in circular container */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 bg-[#FAF8F3] border border-[#ECE7DE] shadow-xs">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="w-full">
                  <h3 className="font-bold text-xs text-[#252522] truncate w-full">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-[#6E6D66] mt-0.5">
                    {cat.count} Kitchens
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
