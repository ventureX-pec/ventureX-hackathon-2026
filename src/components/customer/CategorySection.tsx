"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CATEGORIES, CategoryItem } from "@/data/mockCustomerData";

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
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252522]">
          Categories
        </h2>
        <button
          onClick={onViewAllClick}
          className="text-xs font-semibold text-[#D66B43] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Categories Cards: Touch-scrollable on mobile, flex/grid on desktop */}
      <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none">
        {/* "All" category pill/card */}
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectCategory("all")}
          className={`flex-shrink-0 w-28 sm:w-32 p-3 sm:p-4 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-between ${
            selectedCategory === "all"
              ? "bg-white border-[#D66B43] shadow-card ring-2 ring-[#D66B43]/20"
              : "bg-white border-[#ECE7DE] hover:border-[#D66B43]/40 shadow-xs"
          }`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-center text-xl mb-2">
            ✨
          </div>
          <div>
            <h3 className="font-bold text-xs text-[#252522]">All Food</h3>
            <p className="text-[10px] text-[#6E6D66] mt-0.5">All Kitchens</p>
          </div>
        </motion.div>

        {/* Dynamic Categories matching reference */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -2 }}
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

              <div>
                <h3 className="font-bold text-xs text-[#252522] truncate w-full">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-[#6E6D66] mt-0.5">
                  {cat.count} Restaurants
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
