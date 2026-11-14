"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import SafeImage from "./SafeImage";

interface FoodPhotographyBackdropProps {
  isSidebarOpen?: boolean;
  sidebarWidth?: number;
  activeTab?: string;
}

export const FoodPhotographyBackdrop: React.FC<FoodPhotographyBackdropProps> = ({
  isSidebarOpen = false,
  sidebarWidth = 256,
  activeTab = "home",
}) => {
  // Only show decorative floating food plates on the home explore tab
  // On orders, favorites, and restaurant menus, keep a clean, focused ambient background
  const showFloatingPlates = !activeTab || activeTab === "home";

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 bottom-0 pointer-events-none overflow-hidden select-none -z-10 transition-[left] duration-300 ease-out"
      style={{
        left: isSidebarOpen ? `${sidebarWidth}px` : "0px",
      }}
    >
      {/* ============================================================ */}
      {/* 1. CONTINUOUS WARM AMBIENT LIGHTING THROUGHOUT FULL SCROLL   */}
      {/* ============================================================ */}

      {/* Top Hero Section: Peach & Apricot Glow */}
      <div className="absolute -top-20 -right-20 w-[650px] lg:w-[850px] h-[650px] lg:h-[850px] rounded-full bg-gradient-to-br from-[#FDE8DC]/80 via-[#FDF3EC]/50 to-transparent blur-3xl" />
      <div className="absolute top-[260px] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FBE5D6]/70 via-[#FDF0E7]/40 to-transparent blur-3xl" />
      <div className="absolute top-[380px] -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#F5ECE0]/60 via-[#FAF6EE]/40 to-transparent blur-3xl" />

      {/* Mid Section (Categories & Popular Restaurants ~900px - 1700px): Soft Sage & Warm Peach */}
      <div className="absolute top-[950px] -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#FDE8DC]/65 via-[#FBE5D6]/35 to-transparent blur-3xl" />
      <div className="absolute top-[1250px] -left-28 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#E8F0EA]/60 via-[#F2ECE4]/40 to-transparent blur-3xl" />
      <div className="absolute top-[1500px] right-[8%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FCEADB]/60 via-[#FDF3EC]/35 to-transparent blur-3xl" />

      {/* Lower Section (Featured Dishes Grid ~1700px - 2600px): Warm Terracotta & Cream Ambiance */}
      <div className="absolute top-[1850px] -left-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FCE8DC]/70 via-[#FAF1E8]/40 to-transparent blur-3xl" />
      <div className="absolute top-[2150px] -right-20 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#FDE8DC]/65 via-[#FAF6EE]/40 to-transparent blur-3xl" />
      <div className="absolute bottom-10 left-1/4 w-[550px] h-[450px] rounded-full bg-gradient-to-t from-[#EAF1EC]/40 via-[#F8EAE0]/35 to-transparent blur-3xl" />

      {/* Continuous Flowing Organic SVG Waves (Top to Bottom) */}
      <svg
        className="absolute top-0 right-0 w-[1000px] lg:w-[1300px] h-[800px] opacity-40 text-[#FBE5D6]/50 pointer-events-none"
        viewBox="0 0 1300 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1300 0C1050 110 880 290 910 520C940 680 820 800 580 800H1300V0Z"
          fill="currentColor"
        />
      </svg>

      <svg
        className="absolute top-[1100px] left-0 w-[900px] lg:w-[1200px] h-[900px] opacity-30 text-[#F6ECE0]/50 pointer-events-none"
        viewBox="0 0 1200 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 200C250 150 480 320 450 580C420 780 600 880 900 900H0V200Z"
          fill="currentColor"
        />
      </svg>

      {/* ============================================================ */}
      {/* 2. FLOATING EDITORIAL FOOD PLATES (ONLY ON HOME TAB)         */}
      {/* All plates placed with safe margins away from text headings  */}
      {/* ============================================================ */}
      {showFloatingPlates && (
        <>
          {/* Top-Right: Decadent Chocolate Brownie Dessert Plate */}
          <motion.div
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-2 -right-10 sm:top-4 sm:-right-14 md:top-6 md:-right-18 lg:top-8 lg:-right-20 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 opacity-75"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.12)] border-4 border-white/90">
              <SafeImage
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85"
                alt="Decadent Chocolate Brownie Plate"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 224px, 256px"
                priority
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
            </div>
          </motion.div>

          {/* Lower-Right: Fresh Mediterranean Salad Bowl */}
          <motion.div
            animate={{ y: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 11.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[640px] -right-12 sm:top-[660px] sm:-right-16 md:top-[680px] md:-right-20 lg:top-[700px] lg:-right-24 w-44 h-44 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-76 lg:h-76 opacity-70"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.14)] border-4 border-white/90">
              <SafeImage
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85"
                alt="Fresh Mediterranean Salad Bowl"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 272px, 304px"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
            </div>
          </motion.div>

          {/* Far Left Top Edge (Only on Ultra-Wide 2XL displays, safely tucked away from headings) */}
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="hidden 2xl:block absolute -top-12 -left-48 w-72 h-72 opacity-35"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.12)] border-4 border-white/70">
              <SafeImage
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=85"
                alt="Artisanal Woodfired Pizza"
                fill
                className="object-cover"
                sizes="288px"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
            </div>
          </motion.div>

          {/* Mid-Right: Gourmet Artisan Parfait / Dessert */}
          <motion.div
            animate={{ y: [3, -3, 3], rotate: [0, -0.6, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[1380px] -right-10 sm:-right-14 md:-right-18 lg:-right-20 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 opacity-65"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.14)] border-4 border-white/90">
              <SafeImage
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80"
                alt="Artisan Dessert Plate"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 208px, 240px"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
            </div>
          </motion.div>

          {/* Lower-Right: Neapolitan Truffle Pizza Slices */}
          <motion.div
            animate={{ y: [2.5, -2.5, 2.5] }}
            transition={{ duration: 12.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-[2080px] -right-12 sm:-right-16 md:-right-20 lg:-right-24 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 opacity-65"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.14)] border-4 border-white/90">
              <SafeImage
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80"
                alt="Artisanal Truffle Pizza"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 256px, 288px"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
            </div>
          </motion.div>

          {/* Floating Subtle Herb Accents on Right Side */}
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [18, 26, 18] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="hidden xl:block absolute top-[430px] right-[15%] w-7 h-7 opacity-60"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(214,107,67,0.18)]" fill="none">
              <path d="M32 24C30 18 34 10 42 12C45 13 46 16 44 20" stroke="#4A8338" strokeWidth="5" strokeLinecap="round" />
              <path d="M36 22C48 20 62 30 68 45C76 64 68 82 48 94C42 97 38 92 40 86C46 72 50 54 44 40C40 32 32 26 36 22Z" fill="url(#bg-chili)" />
              <defs>
                <linearGradient id="bg-chili" x1="30" y1="20" x2="65" y2="90" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF4D30" />
                  <stop offset="0.6" stopColor="#D62B18" />
                  <stop offset="1" stopColor="#9C170B" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [15, -10, 15] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden md:block absolute top-[1150px] right-[40px] lg:right-[60px] w-8 h-8 opacity-60"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(37,37,34,0.12)]" fill="none">
              <path d="M50 5C25 15 8 40 12 70C15 90 35 98 55 92C78 85 92 60 88 35C85 18 68 8 50 5Z" fill="url(#bg-basil-3)" />
              <defs>
                <linearGradient id="bg-basil-3" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6AA358" />
                  <stop offset="1" stopColor="#2F5E24" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </>
      )}
    </div>
  );
};
