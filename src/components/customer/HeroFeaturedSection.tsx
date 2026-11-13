"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Flame, Menu as MenuIcon, Sparkles } from "lucide-react";

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
      titlePrefix: "Delicious food,",
      titleHighlight: "delivered your way.",
      subtitle:
        "Order from your favorite campus kitchens and get it fresh at your table or express pickup shelf with zero queue wait.",
      primaryCta: "Order Now",
      secondaryCta: "See Our Menu",
      plateImage:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
      dealBadge: "Hot Deal",
      dealTitle: "30% OFF",
      dealSubtitle: "on all lunch orders",
      garnishEmoji: "🌶️",
      glowColor: "from-[#F4A261]/30 via-[#D66B43]/15 to-transparent",
    },
    {
      id: "slide-2",
      eyebrow: "48-Hour Slow Fermented",
      titlePrefix: "Artisanal crust,",
      titleHighlight: "baked woodfired fresh.",
      subtitle:
        "Hand-stretched sourdough pizzas blistered in an 800° stone oven with melting fior di latte and cold-pressed basil olive oil.",
      primaryCta: "View Pizzas",
      secondaryCta: "See Our Menu",
      plateImage:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
      dealBadge: "Chef Special",
      dealTitle: "BOGO Slices",
      dealSubtitle: "every weekday break",
      garnishEmoji: "🌿",
      glowColor: "from-[#E87A48]/30 via-[#D66B43]/15 to-transparent",
    },
    {
      id: "slide-3",
      eyebrow: "Slow Dum Charcoal Cooking",
      titlePrefix: "Fragrant royal pots,",
      titleHighlight: "steeped in saffron dum.",
      subtitle:
        "Aged basmati rice sealed with dough dum, ghee-roasted farm vegetables, tender paneer cubes, and hand-ground spice pot aromatics.",
      primaryCta: "Taste Bowls",
      secondaryCta: "See Our Menu",
      plateImage:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85",
      dealBadge: "Campus Deal",
      dealTitle: "₹50 OFF",
      dealSubtitle: "on royal combo bowls",
      garnishEmoji: "✨",
      glowColor: "from-[#D66B43]/30 via-[#F4A261]/15 to-transparent",
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
  const prefixWords = current.titlePrefix.split(" ");
  const highlightWords = current.titleHighlight.split(" ");

  return (
    <section className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-white/95 via-[#FFF9F5]/90 to-[#FDF1E7]/80 backdrop-blur-xl border border-[#EDE4D8]/80 shadow-[0_20px_50px_-12px_rgba(214,107,67,0.08)] overflow-hidden">
      {/* Warm Ambient Radial Glow behind the food plate */}
      <div
        className={`absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full pointer-events-none opacity-70 blur-3xl bg-radial ${current.glowColor} transition-colors duration-1000`}
      />

      {/* Subtle organic light wash in the top left */}
      <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-gradient-to-br from-[#FAF0E6]/50 to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Eyebrow Tag */}
            <motion.div
              key={`eyebrow-${activeSlide}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D66B43]/10 border border-[#D66B43]/20 text-[#D66B43] text-xs font-semibold"
            >
              <Flame className="w-3.5 h-3.5 fill-[#D66B43]" />
              <span>{current.eyebrow}</span>
            </motion.div>

            {/* Word-by-Word Smooth Reveal Heading */}
            <h1
              key={`h1-${activeSlide}`}
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-[#252522] leading-[1.18]"
            >
              {/* Prefix Words (Deep Charcoal) */}
              <span className="block">
                {prefixWords.map((word, i) => (
                  <span
                    key={`p-${activeSlide}-${i}`}
                    className="inline-block overflow-hidden mr-2.5 pb-2 pt-0.5"
                  >
                    <motion.span
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.45,
                        delay: i * 0.06,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>

              {/* Highlight Words (Rich Terracotta with warm glow) */}
              <span className="block text-[#D66B43]">
                {highlightWords.map((word, i) => (
                  <span
                    key={`h-${activeSlide}-${i}`}
                    className="inline-block overflow-hidden mr-2.5 pb-2 pt-0.5"
                  >
                    <motion.span
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.12 + i * 0.06,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className="inline-block bg-gradient-to-r from-[#D66B43] to-[#E87A48] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(214,107,67,0.2)]"
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
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-xs sm:text-sm text-[#6E6D66] max-w-lg font-normal leading-relaxed"
            >
              {current.subtitle}
            </motion.p>

            {/* Dual CTAs (Order Now + See Our Menu) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(214,107,67,0.35)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 hover:brightness-105 transition-all"
              >
                <span>{current.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#FFFFFF" }}
                whileTap={{ scale: 0.98 }}
                onClick={onHotDealClick}
                className="px-5 py-3.5 rounded-full bg-white/90 border border-[#E5DDD0] text-[#252522] text-xs sm:text-sm font-semibold hover:border-[#D66B43]/40 shadow-xs transition-all flex items-center gap-2"
              >
                <MenuIcon className="w-4 h-4 text-[#D66B43]" />
                <span>{current.secondaryCta}</span>
              </motion.button>
            </div>

            {/* Campus Express Feature Badge */}
            <div className="pt-1 flex items-center gap-2.5 text-xs text-[#7A786F]">
              <div className="w-6 h-6 rounded-lg bg-[#D66B43]/10 flex items-center justify-center text-sm">
                ⚡
              </div>
              <span className="text-[11px] font-medium">
                Live Kitchen Sync • Express Pickup Shelf • Zero Queue Wait
              </span>
            </div>
          </div>

          {/* Right Column: Gourmet Food Plate + Floating Deal Card (Foodora Reference) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[280px] sm:min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeSlide}`}
                initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotate: 4 }}
                transition={{ type: "spring", damping: 22, stiffness: 220 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white/95 group"
              >
                <Image
                  src={current.plateImage}
                  alt={current.titlePrefix}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 256px, 320px"
                  priority
                />

                {/* Subtle soft vignette on plate border */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Hot Deal Card (Identical to Foodora Reference) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onClick={onHotDealClick}
              className="absolute -top-2 sm:top-2 right-0 sm:-right-2 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#EDE5DA] shadow-[0_10px_25px_rgba(37,37,34,0.08)] cursor-pointer hover:shadow-xl hover:scale-105 transition-all group"
            >
              <div className="flex items-center gap-1.5 text-[#D66B43] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                <Flame className="w-3.5 h-3.5 fill-[#D66B43]" />
                <span>{current.dealBadge}</span>
              </div>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#252522]">
                {current.dealTitle}
              </div>
              <div className="text-[10px] text-[#6E6D66] font-medium mb-1.5">
                {current.dealSubtitle}
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D66B43] group-hover:underline">
                <span>Order Now</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3 Infinite Carousel Indicator Dots (Looping 1 -> 2 -> 3 -> 1) */}
        <div className="flex items-center justify-center gap-2 mt-6 pt-3 border-t border-[#ECE5DA]/60">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="group relative h-2 rounded-full overflow-hidden transition-all focus:outline-none"
              style={{ width: activeSlide === i ? "28px" : "10px" }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`w-full h-full rounded-full transition-colors duration-300 ${
                  activeSlide === i
                    ? "bg-[#D66B43]"
                    : "bg-[#E8DFD3] group-hover:bg-[#D66B43]/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
