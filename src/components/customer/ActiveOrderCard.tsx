"use client";

import React from "react";
import { motion } from "motion/react";
import { Clock, CheckCircle2, QrCode, ArrowRight } from "lucide-react";

interface ActiveOrderCardProps {
  tokenNumber: string;
  itemsCount: number;
  pickupSlot: string;
  tableOrShelf: string;
  onOpenModal: () => void;
}

export const ActiveOrderCard: React.FC<ActiveOrderCardProps> = ({
  tokenNumber,
  itemsCount,
  pickupSlot,
  tableOrShelf,
  onOpenModal,
}) => {
  const steps = [
    { label: "Placed", done: true },
    { label: "Accepted", done: true },
    { label: "Preparing", active: true },
    { label: "Ready", done: false },
    { label: "Completed", done: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-white border border-[#D66B43]/30 shadow-card space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D66B43] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D66B43]"></span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm text-[#252522]">
                Active Token #{tokenNumber}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D66B43]/10 text-[#D66B43]">
                In Kitchen
              </span>
            </div>
            <p className="text-xs text-[#6E6D66] mt-0.5">
              {itemsCount} {itemsCount === 1 ? "dish" : "dishes"} • {tableOrShelf} • {pickupSlot}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenModal}
          className="px-4 py-2 rounded-xl bg-[#D66B43] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#BF5832] transition-colors shadow-soft"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>View QR Pickup Pass</span>
        </button>
      </div>

      {/* Progress Line */}
      <div className="pt-2 border-t border-[#ECE7DE]">
        <div className="grid grid-cols-5 gap-2 text-center">
          {steps.map((st, i) => (
            <div key={st.label} className="flex flex-col items-center">
              <div
                className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center mb-1 ${
                  st.done
                    ? "bg-[#5F7A65] text-white"
                    : st.active
                    ? "bg-[#D66B43] text-white animate-pulse"
                    : "bg-[#ECE7DE] text-[#6E6D66]"
                }`}
              >
                {st.done ? "✓" : i + 1}
              </div>
              <span
                className={`text-[10px] truncate ${
                  st.active
                    ? "font-bold text-[#D66B43]"
                    : st.done
                    ? "font-semibold text-[#252522]"
                    : "text-[#6E6D66]"
                }`}
              >
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
