"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface AdminBackdropProps {
  isSidebarOpen?: boolean;
  sidebarWidth?: number;
}

export const AdminBackdrop: React.FC<AdminBackdropProps> = ({
  isSidebarOpen = true,
  sidebarWidth = 260,
}) => {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 bottom-0 pointer-events-none overflow-hidden select-none -z-10 transition-[left] duration-300 ease-out"
      style={{
        left: isSidebarOpen ? `${sidebarWidth}px` : "0px",
      }}
    >
      {/* ============================================================ */}
      {/* 1. WARM PEACH & APRICOT AMBIENT GLOWS (Matching Reference)   */}
      {/* ============================================================ */}

      {/* Top-Right Large Warm Peach Radial Wash */}
      <div className="absolute -top-24 -right-24 w-[650px] lg:w-[850px] h-[650px] lg:h-[850px] rounded-full bg-gradient-to-br from-[#FDE8DC]/80 via-[#FDF3EC]/50 to-transparent blur-3xl" />

      {/* Upper Center Warm Glow Behind Overview Header */}
      <div className="absolute top-[200px] right-[15%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#FBE5D6]/70 via-[#FDF0E7]/40 to-transparent blur-3xl" />

      {/* Mid-Left Gentle Ivory/Sage Wash */}
      <div className="absolute top-[450px] -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#F5ECE0]/60 via-[#FAF6EE]/40 to-transparent blur-3xl" />

      {/* Lower Section Warm Ambiance */}
      <div className="absolute top-[1100px] -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#FDE8DC]/60 via-[#FAF1E8]/35 to-transparent blur-3xl" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[400px] rounded-full bg-gradient-to-t from-[#EAF1EC]/40 to-transparent blur-3xl" />

      {/* Organic Curved Flowing Wave Shape (Exact shape from admin reference image) */}
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
      {/* 2. REALISTIC FOOD PHOTOGRAPHY FRAMING THE WORKSPACE          */}
      {/* ============================================================ */}

      {/* A. Top-Left: Artisanal Pasta / Woodfired Dish */}
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -left-12 sm:-top-16 sm:-left-16 md:-top-20 md:-left-20 lg:-top-22 lg:-left-22 w-40 h-40 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-76 lg:h-76"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.18)] border-4 border-white/70">
          <Image
            src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80"
            alt="Artisanal Pasta Dish"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 272px, 304px"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* B. Top-Right: Decadent Chocolate Brownie Plate (Exactly as in admin reference) */}
      <motion.div
        animate={{ y: [2, -2, 2] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-2 -right-10 sm:top-4 sm:-right-14 md:top-6 md:-right-18 lg:top-8 lg:-right-20 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.16)] border-4 border-white/90">
          <Image
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85"
            alt="Decadent Chocolate Brownie"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 224px, 256px"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* C. Middle-Left: Creamy Pasta Bowl Peeking Beside Sidebar */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[480px] -left-10 sm:top-[490px] sm:-left-14 md:top-[500px] md:-left-16 lg:top-[510px] lg:-left-20 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.16)] border-4 border-white/90">
          <Image
            src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=700&q=80"
            alt="Fresh Pasta Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 224px, 256px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* D. Bottom-Right: Fresh Mediterranean Salad Bowl (Exactly as in admin reference) */}
      <motion.div
        animate={{ y: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 11.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[680px] -right-12 sm:top-[700px] sm:-right-16 md:top-[720px] md:-right-20 lg:top-[740px] lg:-right-24 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.18)] border-4 border-white/90">
          <Image
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85"
            alt="Fresh Mediterranean Salad Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 192px, (max-width: 1024px) 288px, 320px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* E. Lower-Right: Neapolitan Truffle Pizza */}
      <motion.div
        animate={{ y: [2, -2, 2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[1350px] -right-12 sm:top-[1400px] sm:-right-16 md:top-[1450px] md:-right-20 lg:top-[1500px] lg:-right-24 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.18)] border-4 border-white/90">
          <Image
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=85"
            alt="Woodfired Pizza"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 176px, (max-width: 1024px) 256px, 288px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>
    </div>
  );
};
