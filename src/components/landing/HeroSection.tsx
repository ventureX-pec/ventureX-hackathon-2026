"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, MapPin, Store, Utensils, CheckCircle2 } from "lucide-react";

export const HeroSection = () => {
  const sampleRestaurants = [
    {
      name: "The Corner Café",
      cuisine: "Bowls, Wraps & Artisan Coffee",
      prepTime: "8 mins prep",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
      status: "Dine-in & Takeaway",
      distance: "150m away",
    },
    {
      name: "Artisan Woodfire Pizzeria",
      cuisine: "Handcrafted Slices & Paninis",
      prepTime: "12 mins prep",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
      status: "Dine-in & Takeaway",
      distance: "300m away",
    },
  ];

  return (
    <section className="relative pt-10 pb-20 sm:pt-14 sm:pb-28 lg:pt-18 lg:pb-32 overflow-hidden bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Narrative & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 space-y-8 text-center lg:text-left"
          >
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF1ED] border border-[#D5E1D8] text-[#5F7A65] text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-[#5F7A65]" />
              <span>Less Waiting. More Enjoying.</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#252522] leading-[1.14]"
            >
              Your Next Meal. <br />
              <span className="text-[#D66B43]">Without the Wait.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg sm:text-xl text-[#6E6D66] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Discover nearby restaurants, explore their menus, and order ahead. 
              Spend less time waiting and more time enjoying your food.
            </motion.p>

            {/* Two CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.a
                href="#customers"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D66B43] text-white text-base font-medium hover:bg-[#BF5832] transition-colors shadow-soft"
              >
                <span>Explore Restaurants</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#restaurants"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#ECE7DE] text-[#252522] text-base font-medium hover:bg-[#F3EFE8] transition-colors shadow-soft"
              >
                <span>Partner With Us</span>
              </motion.a>
            </motion.div>

            {/* Core Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-6 border-t border-[#ECE7DE] grid grid-cols-3 gap-4 text-left"
            >
              <div>
                <p className="text-xs text-[#6E6D66] font-medium">Discovery</p>
                <p className="text-sm font-semibold text-[#252522] mt-0.5">Nearby Menus</p>
              </div>
              <div>
                <p className="text-xs text-[#6E6D66] font-medium">Preparation</p>
                <p className="text-sm font-semibold text-[#252522] mt-0.5">Live Prep Times</p>
              </div>
              <div>
                <p className="text-xs text-[#6E6D66] font-medium">Ordering</p>
                <p className="text-sm font-semibold text-[#252522] mt-0.5">Order Ahead</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Split Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md sm:max-w-xl lg:max-w-none">
              
              {/* Primary Atmospheric Food Photography */}
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-[#ECE7DE] aspect-4/3 sm:aspect-16/11 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                  alt="Delicious artisan dishes served fresh at a local restaurant"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                
                {/* Floating Bottom Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[11px] font-semibold text-[#D66B43] bg-white/95 px-2 py-0.5 rounded-md">
                      Campus Favorite
                    </span>
                    <p className="text-base font-bold text-white mt-1">The Corner Café • Sector 4</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium border border-white/30 text-white">
                    <Clock className="w-3.5 h-3.5 text-white" />
                    <span>8 mins prep</span>
                  </div>
                </div>
              </div>

              {/* Realistic Restaurant Discovery & Order Card (Gentle Floating Motion) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-4 sm:-left-6 w-[92%] sm:w-[340px] rounded-2xl bg-white p-4.5 shadow-card border border-[#ECE7DE]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#F7F4EE]">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#D66B43]" />
                    <span className="text-xs font-bold text-[#252522]">Nearby Restaurants</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF1ED] text-[#5F7A65]">
                    Order Ahead Available
                  </span>
                </div>

                <div className="mt-3 space-y-2.5">
                  {sampleRestaurants.map((res) => (
                    <div
                      key={res.name}
                      className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] hover:border-[#D66B43]/30 transition-colors flex items-center gap-3"
                    >
                      <img
                        src={res.image}
                        alt={res.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#252522] truncate">{res.name}</p>
                        <p className="text-[10px] text-[#6E6D66] truncate">{res.cuisine}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-semibold text-[#D66B43] flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {res.prepTime}
                          </span>
                          <span className="text-[9px] text-[#5F7A65] font-medium bg-white px-1.5 py-0.2 rounded border border-[#ECE7DE]">
                            {res.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Live Badge (Top Right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="hidden sm:flex absolute -top-5 -right-5 rounded-2xl bg-white p-3.5 shadow-card border border-[#ECE7DE] items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FAF2EE] flex items-center justify-center text-[#D66B43]">
                  <CheckCircle2 className="w-5 h-5 text-[#D66B43]" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#6E6D66]">Lunch Break Ready</p>
                  <p className="text-xs font-bold text-[#252522]">Pick Up Without Queues</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
