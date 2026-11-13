"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Flame } from "lucide-react";

interface HeroFeaturedSectionProps {
  onExploreClick: () => void;
  onHotDealClick: () => void;
}

export const HeroFeaturedSection: React.FC<HeroFeaturedSectionProps> = ({
  onExploreClick,
  onHotDealClick,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: "slide-1",
      titlePrefix: "Delicious food,",
      titleHighlight: "delivered your way.",
      subtitle:
        "Order from your favorite campus kitchens and get it fresh at your table or express pickup counter with zero queue wait.",
      buttonText: "Order Now",
      plateImage:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      dealBadge: "Hot Deal",
      dealTitle: "30% OFF",
      dealSubtitle: "on all lunch orders",
    },
    {
      id: "slide-2",
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
      id: "slide-3",
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

  // Change 6: Automatically cycle slides every 5 seconds (pause on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const current = slides[activeSlide];
  const prefixWords = current.titlePrefix.split(" ");
  const highlightWords = current.titleHighlight.split(" ");

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-3xl bg-gradient-to-br from-white via-[#FDFBF7] to-[#F5EFE6] border border-[#ECE7DE] shadow-card overflow-hidden"
    >
      <div className="p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Animated Headline */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="space-y-3">
              {/* Change 3: Professional Word-by-Word Reveal Text Animation */}
              <h1
                key={activeSlide}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#252522] tracking-tight leading-[1.14]"
              >
                {/* Prefix Words */}
                <span className="block">
                  {prefixWords.map((word, i) => (
                    <span
                      key={`${activeSlide}-pre-${i}`}
                      className="inline-block overflow-hidden mr-2.5 pb-1"
                    >
                      <motion.span
                        initial={{ y: "115%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.55,
                          delay: i * 0.08,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>

                {/* Highlight Words in Terracotta */}
                <span className="block text-[#D66B43]">
                  {highlightWords.map((word, i) => (
                    <span
                      key={`${activeSlide}-high-${i}`}
                      className="inline-block overflow-hidden mr-2.5 pb-1"
                    >
                      <motion.span
                        initial={{ y: "115%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.18 + i * 0.08,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              </h1>

              {/* Smooth Subtitle Fade */}
              <motion.p
                key={`sub-${activeSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xs sm:text-sm text-[#6E6D66] max-w-md font-normal leading-relaxed pt-1"
              >
                {current.subtitle}
              </motion.p>
            </div>

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
            {/* Round Plate with Spring Rotation & Scale */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, scale: 0.88, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotate: 6 }}
                transition={{ type: "spring", damping: 22, stiffness: 220 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white/90"
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

            {/* Floating Hot Deal Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
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

        {/* Carousel Indicator Dots with 5-Second Timer Progress */}
        <div className="flex items-center justify-center gap-2.5 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="group relative h-2.5 rounded-full overflow-hidden transition-all focus:outline-none"
              style={{ width: activeSlide === i ? "28px" : "10px" }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`w-full h-full rounded-full transition-colors ${
                  activeSlide === i ? "bg-[#D66B43]" : "bg-[#ECE7DE] group-hover:bg-[#D66B43]/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
