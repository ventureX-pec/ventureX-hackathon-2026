"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export const FoodPhotographyBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* ============================================================ */}
      {/* 1. BACKGROUND COLOURS & ORGANIC PEACH SHAPES (Reference Match) */}
      {/* ============================================================ */}

      {/* Large Ambient Peach Wash (Top-Right) */}
      <div className="absolute -top-24 -right-24 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-gradient-to-br from-[#FDE8DC]/80 via-[#FDF3EC]/50 to-transparent blur-3xl" />

      {/* Warm Apricot Glow Behind Hero (Mid-Right) */}
      <div className="absolute top-[280px] right-[5%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#FBE5D6]/70 via-[#FDF0E7]/40 to-transparent blur-3xl" />

      {/* Delicate Ivory/Sage Light Wash (Mid-Left) */}
      <div className="absolute top-[40%] -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#F5ECE0]/60 via-[#FAF6EE]/40 to-transparent blur-3xl" />

      {/* Soft Bottom Warm Wash */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] rounded-full bg-gradient-to-t from-[#F8EAE0]/50 to-transparent blur-3xl" />

      {/* Organic Curved Flowing Wave Shape (Exact shape from reference image) */}
      <svg
        className="absolute top-0 right-0 w-[1100px] lg:w-[1400px] h-[850px] opacity-60 text-[#FBE5D6]/60 pointer-events-none"
        viewBox="0 0 1400 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1400 0C1100 120 920 320 950 560C980 720 850 850 600 850H1400V0Z"
          fill="currentColor"
        />
      </svg>

      {/* ============================================================ */}
      {/* 2. REALISTIC FOOD PHOTOGRAPHY FRAMING THE VIEWPORT           */}
      {/* ============================================================ */}

      {/* A. TOP-LEFT: Large Pizza with Fresh Basil (Partially outside viewport) */}
      <motion.div
        animate={{ y: [-3, 3, -3], rotate: [0, 0.5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -left-16 sm:-top-20 sm:-left-24 md:-top-24 md:-left-28 lg:-top-28 lg:-left-32 w-52 h-52 sm:w-72 sm:h-72 md:w-88 md:h-88 lg:w-[420px] lg:h-[420px]"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_25px_50px_-10px_rgba(37,37,34,0.18)] border-4 border-white/60 bg-white">
          <Image
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85"
            alt="Artisanal Woodfired Pizza"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 208px, (max-width: 1024px) 352px, 420px"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* B. TOP-RIGHT: Dessert Plate with Chocolate Brownie */}
      <motion.div
        animate={{ y: [3, -3, 3], rotate: [0, -0.6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-2 -right-14 sm:top-6 sm:-right-20 md:top-8 md:-right-24 lg:top-10 lg:-right-28 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-84 lg:h-84"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_25px_45px_-8px_rgba(37,37,34,0.16)] border-4 border-white/90 bg-white">
          <Image
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85"
            alt="Decadent Chocolate Brownie Plate"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 176px, (max-width: 1024px) 288px, 336px"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* C. MIDDLE-LEFT: Creamy Pasta Dish */}
      <motion.div
        animate={{ y: [-4, 4, -4], rotate: [0, 0.8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[44%] -left-14 sm:top-[42%] sm:-left-20 md:top-[40%] md:-left-24 lg:top-[38%] lg:-left-28 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-84 lg:h-84 -translate-y-1/2"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_25px_45px_-8px_rgba(37,37,34,0.16)] border-4 border-white/90 bg-white">
          <Image
            src="https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=800&q=85"
            alt="Artisanal Pasta Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 176px, (max-width: 1024px) 288px, 336px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* D. BOTTOM-LEFT: Crispy Golden French Fries */}
      <motion.div
        animate={{ y: [3, -3, 3], rotate: [0, -0.5, 0] }}
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-4 -left-12 sm:bottom-8 sm:-left-16 md:bottom-12 md:-left-20 lg:bottom-16 lg:-left-24 w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-76 lg:h-76"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_25px_45px_-8px_rgba(37,37,34,0.15)] border-4 border-white/80 bg-white">
          <Image
            src="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=85"
            alt="Crispy Golden Fries Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 144px, (max-width: 1024px) 256px, 304px"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
        </div>
      </motion.div>

      {/* E. BOTTOM-RIGHT: Fresh Salad Bowl */}
      <motion.div
        animate={{ y: [-3.5, 3.5, -3.5], rotate: [0, 0.7, 0] }}
        transition={{ duration: 11.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-8 -right-14 sm:-bottom-12 sm:-right-20 md:-bottom-16 md:-right-24 lg:-bottom-20 lg:-right-28 w-52 h-52 sm:w-72 sm:h-72 md:w-88 md:h-88 lg:w-[400px] lg:h-[400px]"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_25px_50px_-10px_rgba(37,37,34,0.18)] border-4 border-white/90 bg-white">
          <Image
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85"
            alt="Fresh Mediterranean Salad Bowl"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 208px, (max-width: 1024px) 352px, 400px"
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
          y: [-5, 6, -5],
          x: [-2, 3, -2],
          rotate: [12, -8, 12],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:block absolute top-[270px] left-[65px] md:left-[80px] lg:left-[110px] w-9 h-9"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_8px_14px_rgba(37,37,34,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5C25 15 8 40 12 70C15 90 35 98 55 92C78 85 92 60 88 35C85 18 68 8 50 5Z"
            fill="url(#basil-grad-1)"
          />
          <path
            d="M50 5C45 35 38 65 32 88M42 35C30 40 20 48 18 58M45 52C36 60 28 68 26 78M48 24C58 28 72 36 78 46M46 42C56 48 68 58 72 68"
            stroke="#2E5A36"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
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
          y: [6, -5, 6],
          x: [3, -2, 3],
          rotate: [-15, 10, -15],
        }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="hidden sm:block absolute top-[620px] left-[55px] md:left-[70px] lg:left-[95px] w-8 h-8"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_8px_14px_rgba(37,37,34,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5C25 15 8 40 12 70C15 90 35 98 55 92C78 85 92 60 88 35C85 18 68 8 50 5Z"
            fill="url(#basil-grad-2)"
          />
          <path
            d="M50 5C45 35 38 65 32 88M42 35C30 40 20 48 18 58M45 52C36 60 28 68 26 78"
            stroke="#2E5A36"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
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

      {/* Fresh Basil Leaf 3: Near Top-Right / Mid-Right */}
      <motion.div
        animate={{
          y: [-4, 5, -4],
          x: [-3, 2, -3],
          rotate: [25, 5, 25],
        }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="hidden md:block absolute top-[430px] right-[50px] lg:right-[80px] w-7 h-7"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_8px_14px_rgba(37,37,34,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5C25 15 8 40 12 70C15 90 35 98 55 92C78 85 92 60 88 35C85 18 68 8 50 5Z"
            fill="url(#basil-grad-3)"
          />
          <defs>
            <linearGradient id="basil-grad-3" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6AA358" />
              <stop offset="1" stopColor="#2F5E24" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Fresh Red Chili Pepper (Exactly as seen hovering near Hero card in reference) */}
      <motion.div
        animate={{
          y: [-5, 6, -5],
          rotate: [18, 28, 18],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="hidden lg:block absolute top-[450px] right-[40%] w-8 h-8 z-10"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_6px_12px_rgba(214,107,67,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Green Stem */}
          <path
            d="M32 24C30 18 34 10 42 12C45 13 46 16 44 20"
            stroke="#4A8338"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Chili Body */}
          <path
            d="M36 22C48 20 62 30 68 45C76 64 68 82 48 94C42 97 38 92 40 86C46 72 50 54 44 40C40 32 32 26 36 22Z"
            fill="url(#chili-grad)"
          />
          {/* Highlight */}
          <path
            d="M44 32C48 38 52 48 50 58"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.4"
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
