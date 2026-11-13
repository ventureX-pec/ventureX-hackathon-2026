"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Flame, Sparkles, UtensilsCrossed, Menu as MenuIcon } from "lucide-react";

interface HeroFeaturedSectionProps {
  onExploreClick: () => void;
  onHotDealClick: () => void;
}

export const HeroFeaturedSection: React.FC<HeroFeaturedSectionProps> = ({
  onExploreClick,
  onHotDealClick,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: "slide-1",
      eyebrow: "Hot, Fresh & Sizzling",
      titleWhite: "Hot, fresh burgers",
      titleColored: "made for any time cravings",
      subtitle:
        "Made with fresh ingredients, juicy double patties, and soft brioche buns, grilled to perfection and served steaming hot.",
      primaryCta: "Order Now",
      secondaryCta: "See Our Menu",
      heroImage:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
      badgeText: "30% OFF Today",
      ambientGlow: "from-[#D66B43]/30 via-[#B84E26]/15 to-transparent",
      accentColor: "#E87A48",
      garnishEmoji: "🌶️",
    },
    {
      id: "slide-2",
      eyebrow: "48-Hour Slow Fermented",
      titleWhite: "Woodfired pizzas",
      titleColored: "with melting artisanal cheese",
      subtitle:
        "Hand-stretched sourdough crust blistered in an 800° stone oven, topped with fior di latte mozzarella and cold-pressed olive oil.",
      primaryCta: "Explore Slices",
      secondaryCta: "See Our Menu",
      heroImage:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=85",
      badgeText: "BOGO Slices",
      ambientGlow: "from-[#D66B43]/35 via-[#9E3E1C]/20 to-transparent",
      accentColor: "#F49342",
      garnishEmoji: "🌿",
    },
    {
      id: "slide-3",
      eyebrow: "Slow Dum Charcoal Cooking",
      titleWhite: "Rich royal bowls",
      titleColored: "steeped in fragrant saffron",
      subtitle:
        "Aged basmati rice sealed with dough dum, ghee-roasted farm vegetables, tender paneer cubes, and hand-ground spice pot aromatics.",
      primaryCta: "Taste Bowls",
      secondaryCta: "See Our Menu",
      heroImage:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=85",
      badgeText: "Chef Special",
      ambientGlow: "from-[#C45E36]/30 via-[#7E2F13]/20 to-transparent",
      accentColor: "#F28C38",
      garnishEmoji: "✨",
    },
  ];

  // Infinite 5-Second Automatic Cycle (1 -> 2 -> 3 -> 1 -> 2 -> 3...)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];
  const whiteWords = current.titleWhite.split(" ");
  const coloredWords = current.titleColored.split(" ");

  return (
    <section className="relative rounded-[32px] bg-gradient-to-br from-[#1C1714] via-[#181310] to-[#0E0C0A] text-[#FAF8F3] overflow-hidden shadow-2xl border border-[#38261E]">
      {/* Cinematic Ambient Glow behind the food (inspired by the attached image) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-60 blur-3xl bg-radial from-[#D66B43]/40 via-[#8A3414]/20 to-transparent" />

      {/* Floating Sparkles & Garnish Embers in the background */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-1/3 text-2xl select-none opacity-80 pointer-events-none"
      >
        {current.garnishEmoji}
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8], rotate: [-4, 4, -4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-24 text-xl select-none opacity-70 pointer-events-none"
      >
        🍅
      </motion.div>

      <div className="relative z-10 p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Eyebrow Pill */}
            <motion.div
              key={`eye-${activeSlide}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D66B43]/20 border border-[#D66B43]/30 text-[#E87A48] text-xs font-semibold"
            >
              <Flame className="w-3.5 h-3.5 fill-[#E87A48]" />
              <span>{current.eyebrow}</span>
            </motion.div>

            {/* Word-by-Word Smooth Reveal Heading */}
            <h1
              key={`heading-${activeSlide}`}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]"
            >
              {/* White Words */}
              <span className="block">
                {whiteWords.map((word, i) => (
                  <span
                    key={`w-${activeSlide}-${i}`}
                    className="inline-block overflow-hidden mr-2.5 pb-1"
                  >
                    <motion.span
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.07,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>

              {/* Glowing Warm Terracotta Words */}
              <span className="block" style={{ color: current.accentColor }}>
                {coloredWords.map((word, i) => (
                  <span
                    key={`c-${activeSlide}-${i}`}
                    className="inline-block overflow-hidden mr-2.5 pb-1"
                  >
                    <motion.span
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.15 + i * 0.07,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className="inline-block drop-shadow-[0_2px_12px_rgba(232,122,72,0.35)]"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              key={`sub-${activeSlide}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="text-xs sm:text-sm text-[#FAF8F3]/75 max-w-lg font-normal leading-relaxed"
            >
              {current.subtitle}
            </motion.p>

            {/* CTAs matching the attached image ("Order now" + "See our menu") */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(214,107,67,0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 hover:brightness-110 transition-all"
              >
                <span>{current.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onHotDealClick}
                className="px-5 py-3.5 rounded-full bg-white/5 border border-white/20 text-[#FAF8F3] text-xs sm:text-sm font-semibold hover:border-white/40 transition-all flex items-center gap-2 backdrop-blur-xs"
              >
                <MenuIcon className="w-4 h-4" />
                <span>{current.secondaryCta}</span>
              </motion.button>
            </div>

            {/* Bottom 24-Hour / Zero Wait Delivery Service Pill */}
            <div className="pt-2 flex items-center gap-2.5 text-xs text-[#FAF8F3]/65">
              <div className="w-6 h-6 rounded-lg bg-[#D66B43]/20 flex items-center justify-center text-sm">
                🛵
              </div>
              <span className="text-[11px] font-medium">
                Live Kitchen Sync • Instant Counter Shelf Pickup & Dine-In
              </span>
            </div>
          </div>

          {/* Right Column: Epic Gourmet Food Centerpiece with Floating Effect */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] sm:min-h-[380px]">
            {/* Ambient Back Glow Ring */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#D66B43]/20 blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeSlide}`}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
              >
                <Image
                  src={current.heroImage}
                  alt={current.titleWhite}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 288px, 384px"
                  priority
                />

                {/* Subtle vignette on the image edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Deal Tag badge on bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D66B43] text-white shadow-md">
                    {current.badgeText}
                  </span>
                  <span className="text-[11px] text-white/90 font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    Live Campus Kitchen
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3 Infinite Carousel Indicator Dots (Looping 1 -> 2 -> 3 -> 1) */}
        <div className="flex items-center justify-center gap-2.5 mt-6 pt-4 border-t border-white/10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="group relative h-2 rounded-full overflow-hidden transition-all focus:outline-none"
              style={{ width: activeSlide === i ? "32px" : "10px" }}
              aria-label={`Slide ${i + 1}`}
            >
              <div
                className={`w-full h-full rounded-full transition-colors ${
                  activeSlide === i ? "bg-[#D66B43]" : "bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
