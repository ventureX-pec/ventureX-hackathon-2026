"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Clock,
  QrCode,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  X,
  Share2,
  BellRing,
} from "lucide-react";
import { CartItem } from "./CartDrawer";

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenNumber: string;
  items: CartItem[];
  totalAmount: number;
  orderType: "dine-in" | "takeaway";
  tableOrShelf: string;
  pickupSlot: string;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  tokenNumber,
  items,
  totalAmount,
  orderType,
  tableOrShelf,
  pickupSlot,
}) => {
  const [prepProgress, setPrepProgress] = useState(35); // 35% in kitchen
  const [activeStep, setActiveStep] = useState(2); // 1 = Received, 2 = Cooking, 3 = Ready
  const [countdownMinutes, setCountdownMinutes] = useState(7);
  const [countdownSeconds, setCountdownSeconds] = useState(30);

  useEffect(() => {
    if (isOpen) {
      // Confetti burst
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#D66B43", "#5F7A65", "#FAF8F3", "#252522"],
      });

      // Countdown interval
      const timer = setInterval(() => {
        setCountdownSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1;
          setCountdownMinutes((prevMin) => (prevMin > 0 ? prevMin - 1 : 0));
          return 59;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#252522]/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-lg bg-[#FAF8F3] rounded-3xl border border-[#ECE7DE] shadow-2xl overflow-hidden z-10 text-[#252522]"
        >
          {/* Header Banner */}
          <div className="bg-[#5F7A65] text-[#FAF8F3] p-6 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF8F3]/20 flex items-center justify-center hover:bg-[#FAF8F3]/30 transition-colors"
            >
              <X className="w-4 h-4 text-[#FAF8F3]" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.15 }}
              className="w-14 h-14 rounded-2xl bg-[#FAF8F3] text-[#5F7A65] mx-auto flex items-center justify-center shadow-soft mb-3"
            >
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </motion.div>

            <h3 className="font-serif font-bold text-2xl tracking-tight">
              Order Confirmed & Sent to Kitchen!
            </h3>
            <p className="text-xs text-[#FAF8F3]/80 mt-1">
              Paid ₹{totalAmount} via 1-Tap UPI • Direct Kitchen Display Sync
            </p>
          </div>

          {/* Token Ticket Card */}
          <div className="p-6 space-y-6">
            {/* The Big Token Badge */}
            <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#ECE7DE] shadow-soft text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D66B43] via-[#5F7A65] to-[#D66B43]" />

              <div className="text-[11px] font-bold text-[#6E6D66] uppercase tracking-wider mb-1">
                Express Digital Pickup Pass
              </div>
              <div className="font-serif text-5xl font-black tracking-tight text-[#252522] my-1">
                #{tokenNumber}
              </div>
              <p className="text-xs font-semibold text-[#D66B43]">
                {orderType === "dine-in" ? `Service for ${tableOrShelf}` : `Collect at ${tableOrShelf}`}
              </p>

              {/* QR Code representation */}
              <div className="mt-4 p-3 bg-[#FAF8F3] inline-block rounded-xl border border-[#ECE7DE]">
                <div className="w-28 h-28 mx-auto flex items-center justify-center bg-white p-2 rounded-lg border border-[#ECE7DE]">
                  <QrCode className="w-full h-full text-[#252522]" />
                </div>
                <div className="text-[10px] text-[#6E6D66] font-mono mt-1">
                  TOKEN-{tokenNumber}-SCAN-AT-COUNTER
                </div>
              </div>
            </div>

            {/* Live Prep Timeline & Countdown */}
            <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#ECE7DE] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#252522] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D66B43]" />
                  Estimated Time: {countdownMinutes}:
                  {countdownSeconds < 10 ? `0${countdownSeconds}` : countdownSeconds} min
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5F7A65]/10 text-[#5F7A65]">
                  Kitchen Slicing & Cooking
                </span>
              </div>

              {/* Step dots */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#5F7A65] text-[#FAF8F3] text-xs flex items-center justify-center font-bold mb-1">
                    ✓
                  </div>
                  <span className="text-[11px] font-semibold text-[#252522]">Received</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#D66B43] text-[#FAF8F3] text-xs flex items-center justify-center font-bold mb-1 animate-pulse">
                    2
                  </div>
                  <span className="text-[11px] font-semibold text-[#D66B43]">Preparing</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#ECE7DE] text-[#6E6D66] text-xs flex items-center justify-center font-bold mb-1">
                    3
                  </div>
                  <span className="text-[11px] font-medium text-[#6E6D66]">Ready</span>
                </div>
              </div>
            </div>

            {/* Items Summary Accordion */}
            <div className="text-xs text-[#6E6D66] border-t border-[#ECE7DE] pt-3 flex items-center justify-between">
              <span>{items.reduce((s, i) => s + i.quantity, 0)} Items Ordered</span>
              <span className="font-semibold text-[#252522]">{pickupSlot}</span>
            </div>

            {/* Done / Return Action */}
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-[#252522] text-[#FAF8F3] font-bold text-xs hover:bg-[#D66B43] transition-colors shadow-soft"
            >
              Done • Return to Live Menu
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
