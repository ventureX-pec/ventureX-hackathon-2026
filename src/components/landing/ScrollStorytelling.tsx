"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  Compass,
  MenuSquare,
  ShoppingBag,
  ChefHat,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Sparkles,
  MapPin,
  Flame,
  ShieldCheck,
  Check,
} from "lucide-react";

export interface StepData {
  id: string;
  number: string;
  tag: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  highlightChips: string[];
}

export const stepsData: StepData[] = [
  {
    id: "discover",
    number: "01",
    tag: "Campus Discovery",
    title: "Discover Nearby Restaurants",
    shortDesc: "Browse local kitchens with live prep times before you even leave your desk.",
    fullDesc:
      "Open DineFlow on campus or at work. Instantly discover partner cafes, compare live prep queues, and check what's cooking without calling or waiting in line.",
    highlightChips: ["Live Walking Distance", "Rush-Hour Busy Meter", "Live Prep Speeds"],
  },
  {
    id: "menu",
    number: "02",
    tag: "Digital Catalog",
    title: "Explore the Digital Menu",
    shortDesc: "Rich visual menus with dietary tags, transparent prices, and zero app download.",
    fullDesc:
      "Browse high-resolution dish photos, verify vegetarian or vegan ingredients, and check live up-to-the-minute counter availability before ordering.",
    highlightChips: ["100% Pure Veg Filter", "Real-Time Stock Counter", "Transparent Campus Pricing"],
  },
  {
    id: "order",
    number: "03",
    tag: "Express Checkout",
    title: "Place Your Order Ahead",
    shortDesc: "Choose dine-in table or schedule a rush-hour takeaway pickup.",
    fullDesc:
      "Customize spice levels, pick your exact lunch break pickup slot, and pay in one tap with Google Pay, PhonePe, or campus UPI.",
    highlightChips: ["Scheduled Pickup Slots", "Direct 1-Tap UPI", "Zero Aggregator Markup"],
  },
  {
    id: "track",
    number: "04",
    tag: "Kitchen Sync",
    title: "Track Live Kitchen Preparation",
    shortDesc: "Follow your order in real time as the kitchen team prepares it fresh.",
    fullDesc:
      "Your order routes directly to the chef's Kitchen Display System. Watch status progress from 'Queued' to 'Grill Station' with live color-coded countdowns.",
    highlightChips: ["Synchronized Chef KDS", "Minute-by-Minute Countdown", "Priority Order Routing"],
  },
  {
    id: "collect",
    number: "05",
    tag: "Zero-Wait Pickup",
    title: "Collect & Enjoy Without Waiting",
    shortDesc: "Arrive just as your food is ready. Skip the 15-minute queue completely.",
    fullDesc:
      "Walk straight up to the dedicated DineFlow express counter, flash your high-contrast QR token, grab your steaming hot meal, and enjoy lunch with zero delay.",
    highlightChips: ["Express QR Token", "Dedicated Pickup Shelf", "Hot & Fresh Guarantee"],
  },
];

export const ScrollStorytelling = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-advance corridor if not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepsData.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Synchronize with scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 90,
  });

  const currentStep = stepsData[activeStep];

  return (
    <section
      id="flow"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FAF8F3] border-b border-[#ECE7DE] relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold tracking-wider uppercase text-[#D66B43]">
            Interactive 3D Corridor Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#252522] mt-2.5">
            From Hungry to Eating in Five Smooth Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E6D66] max-w-2xl mx-auto">
            Experience how DineFlow transforms campus dining. Follow the interactive 3D corridor as an order travels from discovery to instant collection.
          </p>
        </motion.div>
      </div>

      {/* 3D Corridor Viewport */}
      <div
        className="relative w-full h-[620px] sm:h-[720px] lg:h-[780px] overflow-hidden flex items-center justify-center"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Ambient Warm Vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/70 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#FAF8F3] via-[#FAF8F3]/70 to-transparent z-20" />

        {/* ======================================================== */}
        {/* LEFT 3D PERSPECTIVE WALL (App Interface Cards)           */}
        {/* ======================================================== */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-end pointer-events-none pr-4 sm:pr-8 lg:pr-14"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {stepsData.map((step, idx) => {
            const offset = idx - activeStep;
            // Cards fly along the 3D corridor
            const z = -offset * 320;
            const x = offset * 110 - 20;
            const scale = Math.max(0.65, 1 - Math.abs(offset) * 0.18);
            const opacity =
              offset === 0
                ? 1
                : Math.abs(offset) === 1
                ? 0.55
                : Math.abs(offset) === 2
                ? 0.2
                : 0;

            const isCurrent = offset === 0;

            return (
              <motion.div
                key={`left-card-${step.id}`}
                className="absolute w-[300px] sm:w-[380px] lg:w-[420px] h-[400px] sm:h-[480px] rounded-3xl bg-white border border-[#ECE7DE] shadow-[0_22px_60px_rgba(37,37,34,0.12)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
                style={{
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  zIndex: 20 - Math.abs(offset) * 3,
                }}
                animate={{
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(34deg) scale(${scale})`,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 24,
                  mass: 0.8,
                }}
              >
                {/* Header bar of App Mockup */}
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5F7A65] animate-pulse" />
                    <span className="text-xs font-bold text-[#252522]">
                      DineFlow Express App
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#D66B43] bg-[#FAF2EE] px-2.5 py-0.5 rounded-full">
                    {step.tag}
                  </span>
                </div>

                {/* Body Content by Step */}
                <div className="flex-1 py-4 flex flex-col justify-center">
                  {/* STEP 1: DISCOVERY MAP */}
                  {step.id === "discover" && (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"
                          alt="The Corner Cafe"
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#252522]">The Corner Café</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF1ED] text-[#5F7A65]">
                              ⚡ 6m prep
                            </span>
                          </div>
                          <p className="text-xs text-[#6E6D66]">Panini, Burgers & Cold Brew</p>
                          <p className="text-[11px] text-[#5F7A65] font-medium mt-1">120m from Library • Quiet</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
                          alt="Woodfire Pizza"
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#252522]">Oven & Hearth</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF2EE] text-[#D66B43]">
                              10m prep
                            </span>
                          </div>
                          <p className="text-xs text-[#6E6D66]">Neapolitan Sourdough Slices</p>
                          <p className="text-[11px] text-[#6E6D66] mt-1">280m from Academic Block</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DIGITAL MENU CATALOG */}
                  {step.id === "menu" && (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=300&q=80"
                            alt="Paneer bowl"
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-[#252522] block">
                              Crispy Paneer Makhani Bowl
                            </span>
                            <span className="text-[11px] text-[#6E6D66] block">
                              Jeera rice, makhani gravy
                            </span>
                            <span className="text-xs font-extrabold text-[#252522] mt-0.5 block">
                              ₹180.00
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#D66B43] text-white shrink-0">
                          + Added (1)
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80"
                            alt="Cold brew"
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-[#252522] block">
                              Iced Hazelnut Cold Coffee
                            </span>
                            <span className="text-[11px] text-[#6E6D66] block">
                              Double-steeped Arabica
                            </span>
                            <span className="text-xs font-extrabold text-[#252522] mt-0.5 block">
                              ₹95.00
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#D66B43] text-white shrink-0">
                          + Added (1)
                        </span>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: ORDER AHEAD CHECKOUT */}
                  {step.id === "order" && (
                    <div className="space-y-3.5 p-4 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE]">
                      <div className="flex justify-between items-center pb-2 border-b border-[#ECE7DE]">
                        <span className="text-xs font-bold text-[#252522]">Order Mode</span>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF2EE] text-[#D66B43]">
                          Express Pickup • 1:15 PM
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-[#252522]">
                        <div className="flex justify-between">
                          <span className="text-[#6E6D66]">1x Crispy Paneer Bowl</span>
                          <span className="font-semibold">₹180</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6E6D66]">1x Iced Hazelnut Coffee</span>
                          <span className="font-semibold">₹95</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-[#ECE7DE] font-bold text-sm">
                          <span>Total Amount</span>
                          <span className="text-[#D66B43]">₹275.00</span>
                        </div>
                      </div>
                      <button className="w-full py-2.5 rounded-xl bg-[#252522] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D66B43]" />
                        <span>Pay ₹275 via UPI (Instant)</span>
                      </button>
                    </div>
                  )}

                  {/* STEP 4: LIVE KDS KITCHEN SYNC */}
                  {step.id === "track" && (
                    <div className="space-y-3.5 p-4 rounded-2xl bg-[#252522] text-white">
                      <div className="flex justify-between items-center pb-2 border-b border-white/15">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D66B43] animate-ping" />
                          <span className="text-xs font-bold">Kitchen Ticket #TK-41</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D66B43] text-white">
                          On Grill Station
                        </span>
                      </div>
                      <div className="text-center py-2">
                        <span className="text-3xl font-black tracking-tight text-white block">
                          04:12
                        </span>
                        <span className="text-[11px] text-white/70 block mt-0.5">
                          Estimated prep minutes remaining
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
                        <div className="p-1.5 rounded-lg bg-white/10 text-[#FAF8F3]">1. Ticket In</div>
                        <div className="p-1.5 rounded-lg bg-[#D66B43] text-white">2. Cooking</div>
                        <div className="p-1.5 rounded-lg bg-white/5 text-white/40">3. Ready</div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: INSTANT QR COLLECTION */}
                  {step.id === "collect" && (
                    <div className="p-4 rounded-2xl bg-[#EBF1ED] border border-[#5F7A65]/30 text-center space-y-3">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5F7A65]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Order Ready for Collection!</span>
                      </div>
                      <div className="w-28 h-28 mx-auto bg-white rounded-2xl p-2.5 shadow-sm border border-[#ECE7DE] flex items-center justify-center">
                        <QrCode className="w-full h-full text-[#252522]" />
                      </div>
                      <div>
                        <span className="text-xl font-black text-[#252522] block">Token #41</span>
                        <span className="text-xs text-[#5F7A65] font-medium block mt-0.5">
                          Counter 2 • Shelf B (Hot & Fresh)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer status of Card */}
                <div className="flex items-center justify-between pt-3 border-t border-[#ECE7DE] text-[11px] text-[#6E6D66]">
                  <span>Step {step.number} of 05</span>
                  <span className="font-semibold text-[#252522]">{step.title}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* RIGHT 3D PERSPECTIVE WALL (Real-World Photography Cards) */}
        {/* ======================================================== */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-start pointer-events-none pl-4 sm:pl-8 lg:pl-14"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {stepsData.map((step, idx) => {
            const offset = idx - activeStep;
            const z = -offset * 320;
            const x = -offset * 110 + 20;
            const scale = Math.max(0.65, 1 - Math.abs(offset) * 0.18);
            const opacity =
              offset === 0
                ? 1
                : Math.abs(offset) === 1
                ? 0.55
                : Math.abs(offset) === 2
                ? 0.2
                : 0;

            // Verified rich Unsplash imagery matching each step
            const imageMap: Record<string, { src: string; caption: string; stat: string }> = {
              discover: {
                src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                caption: "Local Partner Kitchens Connected",
                stat: "3 Cafes within 300m",
              },
              menu: {
                src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                caption: "Freshly Made-to-Order Menu",
                stat: "14 Bowls Remaining",
              },
              order: {
                src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
                caption: "Instant Digital UPI Checkout",
                stat: "Zero Counter Queue",
              },
              track: {
                src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
                caption: "Live Chef Display Station Sync",
                stat: "Real-Time KDS Timer",
              },
              collect: {
                src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
                caption: "Steaming Fresh Order Pickup",
                stat: "Saved 18 Mins Wait",
              },
            };

            const cardVisual = imageMap[step.id];

            return (
              <motion.div
                key={`right-card-${step.id}`}
                className="absolute w-[300px] sm:w-[380px] lg:w-[420px] h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#ECE7DE] shadow-[0_22px_60px_rgba(37,37,34,0.14)]"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  zIndex: 20 - Math.abs(offset) * 3,
                }}
                animate={{
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(-34deg) scale(${scale})`,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 24,
                  mass: 0.8,
                }}
              >
                {/* Full-bleed Photo */}
                <img
                  src={cardVisual.src}
                  alt={cardVisual.caption}
                  className="w-full h-full object-cover"
                />

                {/* Editorial Vignette & Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-6 text-white">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF8F3]/95 text-[#252522] backdrop-blur-md shadow-xs">
                      {step.tag}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#D66B43] text-white shadow-xs">
                      {cardVisual.stat}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-white/80 font-medium block">
                      Live Campus Reality
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-1">
                      {cardVisual.caption}
                    </h4>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">
                      {step.shortDesc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* CENTER HORIZON CORRIDOR (Focus Typography & Navigation)  */}
        {/* ======================================================== */}
        <div className="relative z-30 max-w-xl mx-auto px-4 text-center pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`center-info-${currentStep.id}`}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Step Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF2EE] border border-[#D66B43]/20 text-[#D66B43] text-xs font-bold shadow-xs">
                <span>STEP {currentStep.number} OF 05</span>
                <span>•</span>
                <span>{currentStep.tag}</span>
              </div>

              {/* Main Step Headline */}
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252522] leading-tight">
                {currentStep.title}
              </h3>

              {/* Detailed Description */}
              <p className="text-sm sm:text-base text-[#6E6D66] leading-relaxed max-w-lg mx-auto">
                {currentStep.fullDesc}
              </p>

              {/* Highlight Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {currentStep.highlightChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#ECE7DE] text-[#252522] shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5 text-[#5F7A65]" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step Pill Switchers */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-8 pt-4 border-t border-[#ECE7DE]/60">
            {stepsData.map((s, index) => {
              const isSelected = activeStep === index;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(index)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-[#D66B43] text-white shadow-sm scale-105"
                      : "bg-white text-[#6E6D66] hover:text-[#252522] hover:bg-[#F2ECE1] border border-[#ECE7DE]"
                  }`}
                >
                  <span className="opacity-70 mr-1">{s.number}</span>
                  <span>{s.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() =>
                setActiveStep((prev) => (prev === 0 ? stepsData.length - 1 : prev - 1))
              }
              className="w-9 h-9 rounded-full bg-white hover:bg-[#FAF8F3] border border-[#ECE7DE] text-[#252522] flex items-center justify-center shadow-xs transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-bold text-[#6E6D66]">
              {activeStep + 1} / {stepsData.length}
            </span>

            <button
              onClick={() =>
                setActiveStep((prev) => (prev + 1) % stepsData.length)
              }
              className="w-9 h-9 rounded-full bg-white hover:bg-[#FAF8F3] border border-[#ECE7DE] text-[#252522] flex items-center justify-center shadow-xs transition-colors"
              aria-label="Next step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
