"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export const PointerFollower: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring for outer trailing ring
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 260, mass: 0.35 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 260, mass: 0.35 });

  // Soft lazy spring for ambient background glow
  const glowX = useSpring(mouseX, { damping: 45, stiffness: 120, mass: 0.8 });
  const glowY = useSpring(mouseY, { damping: 45, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Disable custom follower on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable or interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-interactive]"
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* 1. Ambient Warm Glow Spotlight on the Ivory Background */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-0 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(214, 107, 67, 0.065) 0%, rgba(245, 235, 224, 0.02) 45%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.4 } }}
      />

      {/* 2. Trailing Outer Cursor Ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 34,
          height: 34,
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.7 : 1,
          backgroundColor: isHovered
            ? "rgba(214, 107, 67, 0.12)"
            : "rgba(214, 107, 67, 0.03)",
          borderColor: isHovered
            ? "rgba(214, 107, 67, 0.85)"
            : "rgba(214, 107, 67, 0.45)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25 },
          backgroundColor: { duration: 0.18 },
          borderColor: { duration: 0.18 },
          opacity: { duration: 0.25 },
        }}
      />

      {/* 3. Snappy Precision Central Dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#D66B43] shadow-[0_0_8px_rgba(214,107,67,0.35)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
        }}
        animate={{
          scale: isClicked ? 1.3 : isHovered ? 0.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 500, damping: 28 },
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
};
