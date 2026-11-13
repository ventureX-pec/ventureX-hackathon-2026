"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface AdminBackdropProps {
  isSidebarOpen?: boolean;
  sidebarWidth?: number;
}

export const AdminBackdrop: React.FC<AdminBackdropProps> = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10"
    >
      {/* ============================================================ */}
      {/* 1. WARM PEACH & APRICOT AMBIENT GLOWS (Matching Reference)   */}
      {/* ============================================================ */}

      {/* Top-Right Large Warm Peach Radial Wash */}
      <div className="absolute -top-28 -right-28 w-[700px] lg:w-[900px] h-[700px] lg:h-[900px] rounded-full bg-gradient-to-br from-[#FDE8DC]/85 via-[#FDF3EC]/50 to-transparent blur-3xl" />

      {/* Center Warm Ambiance Glow (Behind Cards - Soft, never harsh) */}
      <div className="absolute top-[240px] right-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FBE5D6]/60 via-[#FDF0E7]/35 to-transparent blur-3xl" />

      {/* Mid-Left Gentle Ivory/Sage Wash */}
      <div className="absolute top-[500px] -left-28 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F5ECE0]/60 via-[#FAF6EE]/40 to-transparent blur-3xl" />

      {/* Bottom Section Warm Ambiance */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[450px] rounded-full bg-gradient-to-t from-[#F8EAE0]/50 to-transparent blur-3xl" />

      {/* Flowing Organic Wave Shape (Exact shape from admin reference image) */}
      <svg
        className="absolute top-0 right-0 w-[1100px] lg:w-[1400px] h-[850px] opacity-55 text-[#FBE5D6]/60 pointer-events-none"
        viewBox="0 0 1400 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1400 0C1120 110 940 310 970 540C1000 700 880 820 620 850H1400V0Z"
          fill="currentColor"
        />
      </svg>

      {/* ============================================================ */}
      {/* 2. REALISTIC FOOD PHOTOGRAPHY IN FAR CORNERS ONLY             */}
      {/* Strictly in outer gutters - NEVER overlapping text or cards  */}
      {/* ============================================================ */}

      {/* A. Top-Left: Tucked in the far top-left window corner (Behind sidebar / top edge) */}
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -left-16 sm:-top-20 sm:-left-20 w-44 h-44 sm:w-60 sm:h-60 rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.18)] border-4 border-white/70"
      >
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80"
            alt="Artisanal Pasta Dish"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 176px, 240px"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* B. Top-Right: Decadent Chocolate Brownie (Far top-right viewport corner) */}
      <motion.div
        animate={{ y: [2, -2, 2] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-8 -right-12 sm:-top-10 sm:-right-16 md:-top-12 md:-right-20 w-40 h-40 sm:w-56 sm:h-56 md:w-68 md:h-68 rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.16)] border-4 border-white/90"
      >
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85"
            alt="Decadent Chocolate Brownie"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 160px, 272px"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* C. Middle-Left: Creamy Pasta Bowl (Tucked deep on left gutter below sidebar) */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="hidden xl:block absolute top-[540px] -left-20 w-48 h-48 rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.16)] border-4 border-white/90"
      >
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=700&q=80"
            alt="Fresh Pasta Bowl"
            fill
            className="object-cover"
            sizes="192px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* D. Bottom-Right: Fresh Mediterranean Salad Bowl (Far bottom-right viewport corner) */}
      <motion.div
        animate={{ y: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 11.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[700px] sm:top-[740px] -right-16 sm:-right-24 md:-right-32 w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88 rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.18)] border-4 border-white/90"
      >
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85"
            alt="Fresh Mediterranean Salad Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 224px, 352px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>
    </div>
  );
};
