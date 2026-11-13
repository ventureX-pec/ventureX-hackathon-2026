"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface FoodPhotographyBackdropProps {
  isSidebarOpen?: boolean;
  sidebarWidth?: number;
}

export const FoodPhotographyBackdrop: React.FC<FoodPhotographyBackdropProps> = ({
  isSidebarOpen = false,
  sidebarWidth = 256,
}) => {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 h-[1050px] pointer-events-none overflow-hidden select-none -z-10 transition-[left] duration-300 ease-out"
      style={{
        left: isSidebarOpen ? `${sidebarWidth}px` : "0px",
      }}
    >
      {/* ============================================================ */}
      {/* 1. AMBIENT WARM PEACH & APRICOT GLOWS (Matching Reference)   */}
      {/* ============================================================ */}

      {/* Top-Right Large Warm Peach Radial Wash */}
      <div className="absolute -top-20 -right-20 w-[650px] lg:w-[800px] h-[650px] lg:h-[800px] rounded-full bg-gradient-to-br from-[#FDE8DC]/80 via-[#FDF3EC]/50 to-transparent blur-3xl" />

      {/* Hero Ambiance Glow (Behind the central card) */}
      <div className="absolute top-[260px] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FBE5D6]/70 via-[#FDF0E7]/40 to-transparent blur-3xl" />

      {/* Mid-Left Delicate Ivory Glow */}
      <div className="absolute top-[380px] -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#F5ECE0]/60 via-[#FAF6EE]/40 to-transparent blur-3xl" />

      {/* Organic Curved Flowing Wave Shape (Exact shape from reference image) */}
      <svg
        className="absolute top-0 right-0 w-[1000px] lg:w-[1300px] h-[800px] opacity-50 text-[#FBE5D6]/60 pointer-events-none"
        viewBox="0 0 1300 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1300 0C1050 110 880 290 910 520C940 680 820 800 580 800H1300V0Z"
          fill="currentColor"
        />
      </svg>

      {/* ============================================================ */}
      {/* 2. REALISTIC FOOD PHOTOGRAPHY FRAMING THE VIEWPORT           */}
      {/* ============================================================ */}

      {/* A. TOP-LEFT: Large Pizza with Fresh Basil */}
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -left-12 sm:-top-16 sm:-left-16 md:-top-20 md:-left-20 lg:-top-24 lg:-left-24 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.18)] border-4 border-white/70">
          <Image
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=85"
            alt="Artisanal Woodfired Pizza"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 176px, (max-width: 1024px) 288px, 320px"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* B. TOP-RIGHT: Dessert Plate with Chocolate Brownie */}
      <motion.div
        animate={{ y: [2, -2, 2] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-2 -right-10 sm:top-4 sm:-right-14 md:top-6 md:-right-18 lg:top-8 lg:-right-20 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.16)] border-4 border-white/90">
          <Image
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

      {/* C. MIDDLE-LEFT: Creamy Pasta Dish */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[430px] -left-10 sm:top-[440px] sm:-left-14 md:top-[450px] md:-left-16 lg:top-[460px] lg:-left-20 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.16)] border-4 border-white/90">
          <Image
            src="https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=700&q=85"
            alt="Artisanal Pasta Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 224px, 256px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* D. BOTTOM-LEFT: Crispy Golden French Fries */}
      <motion.div
        animate={{ y: [2.5, -2.5, 2.5] }}
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[750px] -left-8 sm:top-[760px] sm:-left-12 md:top-[770px] md:-left-14 lg:top-[780px] lg:-left-16 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.15)] border-4 border-white/80">
          <Image
            src="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=700&q=85"
            alt="Crispy Golden Fries Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 128px, (max-width: 1024px) 192px, 224px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* E. BOTTOM-RIGHT: Fresh Mediterranean Salad Bowl */}
      <motion.div
        animate={{ y: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 11.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[640px] -right-12 sm:top-[660px] sm:-right-16 md:top-[680px] md:-right-20 lg:top-[700px] lg:-right-24 w-44 h-44 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-76 lg:h-76"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(37,37,34,0.18)] border-4 border-white/90">
          <Image
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85"
            alt="Fresh Mediterranean Salad Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 176px, (max-width: 1024px) 272px, 304px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 3. FLOATING NATURAL GARNISH ACCENTS (Basil Leaves & Chili)    */}
      {/* ============================================================ */}

      {/* Fresh Basil Leaf 1: Below Top-Left Pizza */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: [10, -6, 10],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-[270px] left-[45px] lg:left-[65px] w-8 h-8"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(37,37,34,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5C25 15 8 40 12 70C15 90 35 98 55 92C78 85 92 60 88 35C85 18 68 8 50 5Z"
            fill="url(#basil-grad-1)"
          />
          <defs>
            <linearGradient id="basil-grad-1" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6AA358" />
              <stop offset="0.6" stopColor="#4A8338" />
              <stop offset="1" stopColor="#2F5E24" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Fresh Basil Leaf 2: Near Middle-Left Pasta */}
      <motion.div
        animate={{
          y: [4, -4, 4],
          rotate: [-12, 8, -12],
        }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="hidden md:block absolute top-[620px] left-[40px] lg:left-[55px] w-7 h-7"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(37,37,34,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5C25 15 8 40 12 70C15 90 35 98 55 92C78 85 92 60 88 35C85 18 68 8 50 5Z"
            fill="url(#basil-grad-2)"
          />
          <defs>
            <linearGradient id="basil-grad-2" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#75B062" />
              <stop offset="0.6" stopColor="#528E3F" />
              <stop offset="1" stopColor="#35662A" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Fresh Red Chili Pepper (Near Hero card top-right curve in reference) */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: [18, 26, 18],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="hidden xl:block absolute top-[430px] right-[38%] w-7 h-7"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_6px_10px_rgba(214,107,67,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 24C30 18 34 10 42 12C45 13 46 16 44 20"
            stroke="#4A8338"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M36 22C48 20 62 30 68 45C76 64 68 82 48 94C42 97 38 92 40 86C46 72 50 54 44 40C40 32 32 26 36 22Z"
            fill="url(#chili-grad)"
          />
          <defs>
            <linearGradient id="chili-grad" x1="30" y1="20" x2="65" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF4D30" />
              <stop offset="0.6" stopColor="#D62B18" />
              <stop offset="1" stopColor="#9C170B" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};
