"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  MotionValue,
} from "motion/react";
import { QrCode } from "lucide-react";

interface StepItem {
  id: string;
  stepNum: string;
  tag: string;
  title: string;
  description: string;
  photoUrl: string;
  photoCaption: string;
}

const steps: StepItem[] = [
  {
    id: "discover",
    stepNum: "01",
    tag: "DISCOVERY",
    title: "Discover Local Kitchens",
    description: "Compare live preparation times at nearby campus eateries before leaving your desk.",
    photoUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    photoCaption: "The Corner Café • 120m away",
  },
  {
    id: "menu",
    stepNum: "02",
    tag: "DIGITAL MENU",
    title: "Explore Digital Menus",
    description: "Browse high-res dish photos with 100% verified dietary filters and live counter stock.",
    photoUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    photoCaption: "Freshly Made-to-Order • In Stock",
  },
  {
    id: "order",
    stepNum: "03",
    tag: "EXPRESS CHECKOUT",
    title: "Order Ahead With UPI",
    description: "Pick your exact lunch break pickup slot and pay in 1 tap with zero queue waiting.",
    photoUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    photoCaption: "Scheduled Pickup • Zero Queue",
  },
  {
    id: "track",
    stepNum: "04",
    tag: "KITCHEN SYNC",
    title: "Track Live Preparation",
    description: "Watch your order route directly to the kitchen display screen with minute-by-minute updates.",
    photoUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    photoCaption: "Direct to Chef • Live Grill Station",
  },
  {
    id: "collect",
    stepNum: "05",
    tag: "INSTANT PICKUP",
    title: "Collect Without Waiting",
    description: "Walk straight to the express pickup shelf, scan your QR token, and enjoy your hot meal.",
    photoUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    photoCaption: "Counter Shelf B • Steaming Hot",
  },
];

// Continuous auto-flying Left Wall Card
function AutoLeftCard({
  step,
  index,
  progress,
}: {
  step: StepItem;
  index: number;
  progress: MotionValue<number>;
}) {
  const transform = useTransform(progress, (t) => {
    let diff = (index - (t % 5) + 5) % 5;
    if (diff > 2.5) diff -= 5;

    const z = -diff * 350;
    const x = diff > 0 ? diff * 35 : diff * 90;
    const scale = diff > 0 ? Math.max(0.65, 1 - diff * 0.16) : Math.min(1.25, 1 - diff * 0.15);

    return `translateX(${x}px) translateZ(${z}px) rotateY(34deg) scale(${scale})`;
  });

  const opacity = useTransform(progress, (t) => {
    let diff = (index - (t % 5) + 5) % 5;
    if (diff > 2.5) diff -= 5;

    if (Math.abs(diff) <= 0.4) return 1;
    if (diff > 0.4 && diff <= 1.2) return 1 - (diff - 0.4) * 0.55;
    if (diff > 1.2 && diff <= 2.1) return 0.56 - (diff - 1.2) * 0.55;
    if (diff > 2.1) return 0;
    if (diff < -0.4 && diff >= -1.2) return 1 - (-diff - 0.4) * 0.8;
    return 0;
  });

  const zIndex = useTransform(progress, (t) => {
    let diff = (index - (t % 5) + 5) % 5;
    if (diff > 2.5) diff -= 5;
    return Math.round(100 - diff * 20);
  });

  return (
    <motion.div
      className="absolute left-2 sm:left-6 lg:left-12 w-[270px] sm:w-[330px] lg:w-[370px] h-[370px] sm:h-[440px] rounded-3xl bg-white border border-[#ECE7DE] shadow-[0_20px_50px_rgba(37,37,34,0.12)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden pointer-events-none select-none"
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        transform,
        opacity,
        zIndex,
      }}
    >
      {/* App Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#5F7A65]" />
          <span className="text-xs font-bold text-[#252522]">DineFlow Express</span>
        </div>
        <span className="text-[10px] font-bold text-[#D66B43] bg-[#FAF2EE] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {step.tag}
        </span>
      </div>

      {/* Body Content by Step */}
      <div className="flex-1 py-4 flex flex-col justify-center">
        {step.id === "discover" && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80"
                alt="Cafe"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="font-bold text-xs text-[#252522] block">The Corner Café</span>
                <span className="text-[11px] text-[#5F7A65] font-semibold">⚡ 8m prep • 120m away</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80"
                alt="Pizza"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="font-bold text-xs text-[#252522] block">Oven & Hearth</span>
                <span className="text-[11px] text-[#D66B43] font-semibold">12m prep • 280m away</span>
              </div>
            </div>
          </div>
        )}

        {step.id === "menu" && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=300&q=80"
                  alt="Paneer bowl"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-xs font-bold text-[#252522] block">Crispy Paneer Bowl</span>
                  <span className="text-xs font-extrabold text-[#252522] mt-0.5 block">₹180</span>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#D66B43] text-white">
                + Added
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80"
                  alt="Cold brew"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-xs font-bold text-[#252522] block">Iced Hazelnut Coffee</span>
                  <span className="text-xs font-extrabold text-[#252522] mt-0.5 block">₹95</span>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#D66B43] text-white">
                + Added
              </span>
            </div>
          </div>
        )}

        {step.id === "order" && (
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] space-y-3">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#ECE7DE]">
              <span className="text-[#6E6D66]">Scheduled Slot</span>
              <span className="font-bold text-[#D66B43]">1:15 PM Lunch Break</span>
            </div>
            <div className="flex justify-between items-center font-bold text-sm text-[#252522]">
              <span>Total Bill</span>
              <span className="text-[#D66B43] text-base">₹275.00</span>
            </div>
            <div className="w-full py-2.5 rounded-xl bg-[#252522] text-white text-xs font-bold text-center">
              Pay ₹275 via UPI (Instant)
            </div>
          </div>
        )}

        {step.id === "track" && (
          <div className="p-4 rounded-2xl bg-[#252522] text-white space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white/80">Ticket #TK-41</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D66B43]">Grill Station</span>
            </div>
            <div className="text-center py-2">
              <span className="text-3xl font-black text-white block">04:12</span>
              <span className="text-[11px] text-white/70 block mt-0.5">mins remaining</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#FAF8F3]/80 pt-2 border-t border-white/10">
              <span>Station Status</span>
              <span className="text-[#5F7A65] font-bold">On Schedule</span>
            </div>
          </div>
        )}

        {step.id === "collect" && (
          <div className="p-4 rounded-2xl bg-[#EBF1ED] border border-[#5F7A65]/20 text-center space-y-2">
            <div className="w-24 h-24 mx-auto bg-white rounded-2xl p-2 shadow-xs border border-[#ECE7DE] flex items-center justify-center">
              <QrCode className="w-full h-full text-[#252522]" />
            </div>
            <span className="text-lg font-black text-[#252522] block">Token #41</span>
            <span className="text-xs text-[#5F7A65] font-semibold block">Counter Shelf B • Ready</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#ECE7DE] text-[11px] text-[#6E6D66]">
        <span>Step {step.stepNum} of 05</span>
        <span className="font-semibold text-[#252522]">{step.title}</span>
      </div>
    </motion.div>
  );
}

// Continuous auto-flying Right Wall Card
function AutoRightCard({
  step,
  index,
  progress,
}: {
  step: StepItem;
  index: number;
  progress: MotionValue<number>;
}) {
  const transform = useTransform(progress, (t) => {
    let diff = (index - (t % 5) + 5) % 5;
    if (diff > 2.5) diff -= 5;

    const z = -diff * 350;
    const x = diff > 0 ? -diff * 35 : -diff * 90;
    const scale = diff > 0 ? Math.max(0.65, 1 - diff * 0.16) : Math.min(1.25, 1 - diff * 0.15);

    return `translateX(${x}px) translateZ(${z}px) rotateY(-34deg) scale(${scale})`;
  });

  const opacity = useTransform(progress, (t) => {
    let diff = (index - (t % 5) + 5) % 5;
    if (diff > 2.5) diff -= 5;

    if (Math.abs(diff) <= 0.4) return 1;
    if (diff > 0.4 && diff <= 1.2) return 1 - (diff - 0.4) * 0.55;
    if (diff > 1.2 && diff <= 2.1) return 0.56 - (diff - 1.2) * 0.55;
    if (diff > 2.1) return 0;
    if (diff < -0.4 && diff >= -1.2) return 1 - (-diff - 0.4) * 0.8;
    return 0;
  });

  const zIndex = useTransform(progress, (t) => {
    let diff = (index - (t % 5) + 5) % 5;
    if (diff > 2.5) diff -= 5;
    return Math.round(100 - diff * 20);
  });

  return (
    <motion.div
      className="absolute right-2 sm:right-6 lg:right-12 w-[270px] sm:w-[330px] lg:w-[370px] h-[370px] sm:h-[440px] rounded-3xl overflow-hidden border border-[#ECE7DE] shadow-[0_20px_50px_rgba(37,37,34,0.14)] pointer-events-none select-none"
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        transform,
        opacity,
        zIndex,
      }}
    >
      <img
        src={step.photoUrl}
        alt={step.photoCaption}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-between p-5 sm:p-6 text-white">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF8F3]/95 text-[#252522] backdrop-blur-md">
            Step {step.stepNum}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#D66B43] text-white">
            {step.tag}
          </span>
        </div>
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {step.photoCaption}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}

export const ScrollStorytelling = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);

  // Auto-play RAF loop: smoothly advances progress continuously like a video
  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    // Completes 1 full loop (5 steps) in ~17.5 seconds
    const increment = (delta / 17500) * 5;
    const nextVal = (progress.get() + increment) % 5;
    progress.set(nextVal);
  });

  // Keep center text in sync with whichever step is currently in front focus
  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      const stepIndex = Math.floor((latest + 0.5) % 5);
      setActiveStep((prev) => (prev !== stepIndex ? stepIndex : prev));
    });
    return () => unsubscribe();
  }, [progress]);

  const currentStep = steps[activeStep];

  return (
    <section
      id="flow"
      className="py-20 sm:py-28 bg-[#FAF8F3] relative overflow-hidden border-b border-[#ECE7DE]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Editorial Subtitle */}
      <div className="text-center mb-6 sm:mb-10 z-30 pointer-events-none">
        <span className="text-xs font-bold tracking-widest uppercase text-[#D66B43]">
          THE DINEFLOW JOURNEY
        </span>
      </div>

      {/* 3D Perspective Corridor Viewport */}
      <div
        className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px] flex items-center justify-center overflow-hidden"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Edge Gradient Blend Masks to smoothly blend into ivory background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF8F3] via-[#FAF8F3]/80 to-transparent z-20" />

        {/* Left Wall 3D Cards - Continuous auto-flying loop */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center pointer-events-none">
          {steps.map((step, idx) => (
            <AutoLeftCard
              key={`auto-left-${step.id}`}
              step={step}
              index={idx}
              progress={progress}
            />
          ))}
        </div>

        {/* Right Wall 3D Cards - Continuous auto-flying loop */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center pointer-events-none">
          {steps.map((step, idx) => (
            <AutoRightCard
              key={`auto-right-${step.id}`}
              step={step}
              index={idx}
              progress={progress}
            />
          ))}
        </div>

        {/* Center Corridor Content (Zero Clutter, No Arrows, Wide Breathing Room) */}
        <div className="relative z-30 max-w-sm sm:max-w-md lg:max-w-lg mx-auto text-center px-4 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`center-text-${currentStep.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-3"
            >
              {/* Step indicator */}
              <span className="text-xs font-bold text-[#D66B43] tracking-widest uppercase block">
                STEP {currentStep.stepNum} OF 05
              </span>

              {/* Big Elegant Headline */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#252522] tracking-tight leading-tight">
                {currentStep.title}
              </h3>

              {/* Single Concise Description Sentence */}
              <p className="text-sm sm:text-base text-[#6E6D66] leading-relaxed max-w-md mx-auto">
                {currentStep.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Progress Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === i
                    ? "w-8 bg-[#D66B43]"
                    : "w-2 bg-[#ECE7DE]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
