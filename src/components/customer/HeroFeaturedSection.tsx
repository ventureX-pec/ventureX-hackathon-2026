"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

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
      titlePrefix: "Delicious food,",
      titleHighlight: "delivered your way.",
      subtitle:
        "Order from your favorite campus kitchens and get it fresh at your table or express pickup counter with zero queue wait.",
      buttonText: "Order Now",
      plateImage:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", // Gourmet roasted feast plate matching reference
      dealBadge: "Hot Deal",
      dealTitle: "30% OFF",
      dealSubtitle: "on all lunch orders",
    },
    {
      titlePrefix: "Craving artisanal,",
      titleHighlight: "woodfired crust?",
      subtitle:
        "48-hour slow fermented sourdough pizzas and Neapolitan slices baked fresh every 15 minutes at Pizza Palace.",
      buttonText: "View Pizzas",
      plateImage:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      dealBadge: "Chef Special",
      dealTitle: "BOGO Slices",
      dealSubtitle: "every weekday break",
    },
    {
      titlePrefix: "Power your day with",
      titleHighlight: "clean macro bowls.",
      subtitle:
        "High-protein bowls, edamame greens, and 24-hour steeped hazelnut cold brew directly from Healthy Bites.",
      buttonText: "Browse Bowls",
      plateImage:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      dealBadge: "Healthy Deal",
      dealTitle: "₹50 CASHBACK",
      dealSubtitle: "on cold pressed combos",
    },
  ];

  const current = slides[activeSlide];

  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-white via-[#FDFBF7] to-[#F5EFE6] border border-[#ECE7DE] shadow-card overflow-hidden">
      <div className="p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#252522] tracking-tight leading-[1.12]">
                  {current.titlePrefix} <br />
                  <span className="text-[#D66B43]">{current.titleHighlight}</span>
                </h1>

                <p className="text-xs sm:text-sm text-[#6E6D66] max-w-md font-normal leading-relaxed pt-1">
                  {current.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D66B43] text-white text-xs sm:text-sm font-bold shadow-soft hover:bg-[#BF5832] transition-colors"
              >
                <span>{current.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Right: Plate Photo & Floating Hot Deal Card (exact reference layout) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Round Plate */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 240 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white/80"
              >
                <Image
                  src={current.plateImage}
                  alt="Featured Plate"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 256px, 320px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating Hot Deal Card (matches reference floating card in top right of hero) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onHotDealClick}
              className="absolute -top-3 sm:top-2 right-0 sm:-right-2 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#ECE7DE] shadow-card cursor-pointer hover:shadow-xl transition-all"
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
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D66B43] hover:underline">
                <span>Order Now</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel Indicator Dots (matches reference ● ○ ○) */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-2 rounded-full transition-all ${
                activeSlide === i
                  ? "w-6 bg-[#D66B43]"
                  : "w-2 bg-[#ECE7DE] hover:bg-[#D66B43]/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
