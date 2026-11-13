"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Compass,
  MenuSquare,
  ShoppingBag,
  ChefHat,
  CheckCircle2,
  Clock,
  ArrowRight,
  QrCode,
  Sparkles,
  Utensils,
  Smartphone,
} from "lucide-react";

export const ScrollStorytelling = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: "discover",
      number: "01",
      icon: Compass,
      title: "Discover Nearby Restaurants",
      shortDesc: "Browse local kitchens with live prep times before you even step outside.",
      fullDesc:
        "Open DINEFLOW on campus or at work. Instantly discover independent eateries, compare real-time kitchen preparation times, and check what's cooking without calling.",
      badge: "Step 1: Discovery",
    },
    {
      id: "menu",
      number: "02",
      icon: MenuSquare,
      title: "Explore the Digital Menu",
      shortDesc: "Rich visual menus with dietary tags, transparent prices, and zero app download.",
      fullDesc:
        "Browse high-resolution dish photos, verify vegetarian or vegan ingredients, and check up-to-the-minute availability before deciding what you crave.",
      badge: "Step 2: Menu Selection",
    },
    {
      id: "order",
      number: "03",
      icon: ShoppingBag,
      title: "Place Your Order Ahead",
      shortDesc: "Choose dine-in table or schedule a rush-hour takeaway pickup.",
      fullDesc:
        "Select your options, add custom spice instructions, and confirm your order. Pay seamlessly via direct UPI or settle with cash at the counter.",
      badge: "Step 3: Instant Checkout",
    },
    {
      id: "track",
      number: "04",
      icon: ChefHat,
      title: "Track Live Kitchen Preparation",
      shortDesc: "Follow your order in real time as the kitchen team prepares it fresh.",
      fullDesc:
        "Your order routes directly to the kitchen display screen. Watch the live status update from 'Queued' to 'Cooking' with an accurate countdown timer.",
      badge: "Step 4: Live Kitchen Sync",
    },
    {
      id: "collect",
      number: "05",
      icon: CheckCircle2,
      title: "Collect & Enjoy Without Waiting",
      shortDesc: "Arrive just as your food is ready. Skip the 15-minute queue completely.",
      fullDesc:
        "Walk straight up to the counter to collect your packed meal or have it served fresh to your table. Your lunch break is spent eating, not standing in line.",
      badge: "Step 5: Zero-Queue Dining",
    },
  ];

  // Auto-cycle through steps if user is not actively clicking, or sync with scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section
      id="flow"
      ref={containerRef}
      className="py-24 sm:py-32 bg-[#FAF8F3] border-b border-[#ECE7DE] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Interactive Walkthrough
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252522] mt-3">
            From Hungry to Eating in Five Smooth Steps
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6D66] leading-relaxed">
            See how DineFlow eliminates the lunchtime bottleneck for college students and office workers.
          </p>
        </motion.div>

        {/* Two-Column Transforming Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((s, index) => {
              const isActive = activeStep === index;
              const Icon = s.icon;

              return (
                <motion.div
                  key={s.id}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? "bg-white border-[#D66B43] shadow-card"
                      : "bg-[#FAF8F3] hover:bg-white border-[#ECE7DE]"
                  }`}
                >
                  {/* Active Indicator Bar on Left */}
                  {isActive && (
                    <motion.div
                      layoutId="storyActiveBar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D66B43]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#FAF2EE] text-[#D66B43]"
                          : "bg-white border border-[#ECE7DE] text-[#6E6D66]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#D66B43]">
                          Step {s.number}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-semibold text-[#5F7A65] bg-[#EBF1ED] px-2 py-0.5 rounded-full">
                            Active Preview
                          </span>
                        )}
                      </div>
                      <h3
                        className={`text-base font-bold transition-colors ${
                          isActive ? "text-[#252522]" : "text-[#6E6D66]"
                        }`}
                      >
                        {s.title}
                      </h3>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xs text-[#6E6D66] mt-2 leading-relaxed"
                        >
                          {s.fullDesc}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Transforming Product Device Mockup */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white border border-[#ECE7DE] p-6 sm:p-8 lg:p-10 shadow-elevated min-h-[500px] flex flex-col justify-between">
              
              {/* Mockup Top Navigation Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F7F4EE]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5F7A65] animate-pulse" />
                  <span className="text-xs font-bold text-[#252522]">
                    DineFlow Mobile Experience
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#6E6D66]">
                  <Clock className="w-3.5 h-3.5 text-[#D66B43]" />
                  <span>12:45 PM • Campus Lunch Rush</span>
                </div>
              </div>

              {/* Dynamic Transforming Body */}
              <div className="py-6 flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* STATE 1: DISCOVER */}
                  {activeStep === 0 && (
                    <motion.div
                      key="state-discover"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="w-full space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs text-[#6E6D66] mb-1">
                        <span>Nearby Campus Dining (3 spots found)</span>
                        <span className="text-[#D66B43] font-semibold">Sorted by Prep Speed</span>
                      </div>

                      {/* Restaurant 1 */}
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center gap-3.5 hover:border-[#D66B43]/30 transition-all">
                        <img
                          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80"
                          alt="The Corner Café"
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#252522]">The Corner Café</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF2EE] text-[#D66B43]">
                              ⚡ 8 min prep
                            </span>
                          </div>
                          <p className="text-xs text-[#6E6D66]">Paneer Bowls, Wraps & Cold Brew</p>
                          <p className="text-[11px] text-[#5F7A65] font-medium mt-1">150m away • Dine-in & Pickup ready</p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#D66B43] text-white shrink-0">
                          View
                        </span>
                      </div>

                      {/* Restaurant 2 */}
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center gap-3.5">
                        <img
                          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
                          alt="Woodfire Pizza"
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#252522]">Artisan Woodfire Pizzeria</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#EBF1ED] text-[#5F7A65]">
                              12 min prep
                            </span>
                          </div>
                          <p className="text-xs text-[#6E6D66]">Stone Baked Slices & Drinks</p>
                          <p className="text-[11px] text-[#6E6D66] mt-1">300m away • Normal crowd</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STATE 2: EXPLORE MENU */}
                  {activeStep === 1 && (
                    <motion.div
                      key="state-menu"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="w-full space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#F7F4EE]">
                        <div>
                          <p className="text-xs text-[#6E6D66]">Digital Menu</p>
                          <p className="text-sm font-bold text-[#252522]">The Corner Café Catalog</p>
                        </div>
                        <span className="text-xs font-semibold text-[#5F7A65] bg-[#EBF1ED] px-2.5 py-0.5 rounded-full">
                          Dietary Filter Active: Veg
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80"
                            alt="Paneer bowl"
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#5F7A65]" />
                              <span className="text-xs font-bold text-[#252522]">Crispy Paneer Makhani Bowl</span>
                            </div>
                            <p className="text-[11px] text-[#6E6D66]">Makhani gravy, jeera rice, spiced slaw</p>
                            <p className="text-xs font-bold text-[#252522] mt-0.5">₹180.00</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#D66B43] text-white">
                          + Added (1)
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80"
                            alt="Cold brew"
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#5F7A65]" />
                              <span className="text-xs font-bold text-[#252522]">Iced Hazelnut Cold Coffee</span>
                            </div>
                            <p className="text-[11px] text-[#6E6D66]">Dark roast espresso shaken with milk</p>
                            <p className="text-xs font-bold text-[#252522] mt-0.5">₹95.00</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#D66B43] text-white">
                          + Added (1)
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* STATE 3: ORDER AHEAD */}
                  {activeStep === 2 && (
                    <motion.div
                      key="state-order"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="w-full space-y-3.5"
                    >
                      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#ECE7DE]">
                          <span className="text-xs font-bold text-[#252522]">Order Mode</span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FAF2EE] text-[#D66B43]">
                            Scheduled Pickup: 1:15 PM
                          </span>
                        </div>
                        <div className="text-xs text-[#252522] space-y-1">
                          <div className="flex justify-between">
                            <span>1x Crispy Paneer Makhani Bowl</span>
                            <span className="font-semibold">₹180.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>1x Iced Hazelnut Cold Coffee</span>
                            <span className="font-semibold">₹95.00</span>
                          </div>
                          <div className="flex justify-between text-[#6E6D66] pt-1 border-t border-[#ECE7DE]">
                            <span>Taxes & GST (5%)</span>
                            <span>₹13.75</span>
                          </div>
                          <div className="flex justify-between text-sm font-bold text-[#252522] pt-1">
                            <span>Total Due</span>
                            <span className="text-[#D66B43]">₹288.75</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#EBF1ED] border border-[#D5E1D8] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-[#5F7A65]" />
                          <span className="text-xs font-semibold text-[#5F7A65]">
                            Instant Direct UPI Verification
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#5F7A65]">✓ Confirmed</span>
                      </div>
                    </motion.div>
                  )}

                  {/* STATE 4: TRACK PREPARATION */}
                  {activeStep === 3 && (
                    <motion.div
                      key="state-track"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="w-full space-y-4"
                    >
                      <div className="text-center p-4 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE]">
                        <span className="text-xs font-bold text-[#D66B43]">TOKEN #42 • IN THE KITCHEN</span>
                        <h4 className="text-2xl font-bold text-[#252522] mt-1">
                          Cooking Fresh to Order
                        </h4>
                        <p className="text-xs text-[#6E6D66] mt-1">
                          Estimated Ready in <span className="font-bold text-[#D66B43]">4 minutes</span>
                        </p>

                        {/* Progress Stepper */}
                        <div className="mt-4 flex items-center justify-between relative max-w-xs mx-auto">
                          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#ECE7DE] -translate-y-1/2 -z-0" />
                          <div className="w-7 h-7 rounded-full bg-[#5F7A65] text-white flex items-center justify-center text-xs font-bold relative z-10">
                            ✓
                          </div>
                          <div className="w-7 h-7 rounded-full bg-[#D66B43] text-white flex items-center justify-center text-xs font-bold relative z-10 animate-pulse">
                            2
                          </div>
                          <div className="w-7 h-7 rounded-full bg-white border-2 border-[#ECE7DE] text-[#6E6D66] flex items-center justify-center text-xs font-bold relative z-10">
                            3
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-[#6E6D66] mt-2 max-w-xs mx-auto">
                          <span>Received</span>
                          <span className="font-bold text-[#D66B43]">In Kitchen</span>
                          <span>Pickup</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STATE 5: COLLECT & ENJOY */}
                  {activeStep === 4 && (
                    <motion.div
                      key="state-collect"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="w-full text-center space-y-4 py-2"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#EBF1ED] border border-[#D5E1D8] flex items-center justify-center text-[#5F7A65] mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-[#5F7A65]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#5F7A65] uppercase tracking-wider">
                          Ready for Collection
                        </span>
                        <h4 className="text-2xl font-bold text-[#252522] mt-1">
                          Token #42 is Packed & Ready!
                        </h4>
                        <p className="text-xs text-[#6E6D66] max-w-xs mx-auto mt-2 leading-relaxed">
                          Head to The Corner Café pickup shelf. Zero waiting in line — collect your meal and enjoy your break!
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] inline-block text-xs font-semibold text-[#252522]">
                        Total Saved Today: 14 Minutes
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Mockup Bottom Controls */}
              <div className="pt-4 border-t border-[#F7F4EE] flex items-center justify-between text-xs text-[#6E6D66]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D66B43]" />
                  <span>State {activeStep + 1} of 5: {steps[activeStep].title}</span>
                </div>
                <div className="flex items-center gap-1">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeStep === i ? "w-6 bg-[#D66B43]" : "w-1.5 bg-[#ECE7DE]"
                      }`}
                      aria-label={`Jump to step ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
