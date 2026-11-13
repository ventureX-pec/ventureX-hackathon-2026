"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Clock,
  Sparkles,
  Flame,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  UtensilsCrossed,
} from "lucide-react";
import { MenuItem } from "@/data/mockCustomerData";

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number, instructions?: string) => void;
  currentCartQty?: number;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  currentCartQty = 0,
}) => {
  const [qty, setQty] = useState(currentCartQty > 0 ? currentCartQty : 1);
  const [selectedSpice, setSelectedSpice] = useState<string>("Balanced");
  const [notes, setNotes] = useState("");

  if (!dish) return null;

  const spiceOptions = ["Mild", "Balanced", "Fiery"];

  const handleAdd = () => {
    onAddToCart(dish, qty, notes ? `Spice: ${selectedSpice}. ${notes}` : `Spice: ${selectedSpice}`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#252522]/40 backdrop-blur-md"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="relative w-full max-w-xl bg-[#FAF8F3] rounded-3xl border border-[#ECE7DE] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header Image with Gradient Overlays */}
          <div className="relative h-64 sm:h-72 w-full bg-[#ECE7DE] overflow-hidden flex-shrink-0">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/80 via-transparent to-black/20" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF8F3]/90 backdrop-blur-md text-[#252522] flex items-center justify-center hover:bg-white shadow-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badges on Image */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF8F3]/95 backdrop-blur-sm text-[#252522]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {dish.restaurantName}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FAF8F3] tracking-tight leading-snug drop-shadow-sm">
                  {dish.name}
                </h3>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-xl font-serif font-bold text-[#FAF8F3]">
                  ₹{dish.price}
                </div>
                {dish.originalPrice && (
                  <div className="text-xs text-[#FAF8F3]/70 line-through">
                    ₹{dish.originalPrice}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#252522]">
            {/* Metadata Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#ECE7DE] text-center">
                <div className="text-[10px] font-bold text-[#6E6D66] uppercase tracking-wider">
                  Prep Window
                </div>
                <div className="text-sm font-bold text-[#252522] mt-0.5 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D66B43]" />
                  {dish.prepTimeMinutes} mins
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#ECE7DE] text-center">
                <div className="text-[10px] font-bold text-[#6E6D66] uppercase tracking-wider">
                  Rating
                </div>
                <div className="text-sm font-bold text-[#252522] mt-0.5 flex items-center justify-center gap-1">
                  ⭐ {dish.rating}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#ECE7DE] text-center">
                <div className="text-[10px] font-bold text-[#6E6D66] uppercase tracking-wider">
                  Dietary
                </div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5 flex items-center justify-center gap-1">
                  100% Veg 🌱
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E6D66]">
                Chef&apos;s Description
              </h4>
              <p className="text-sm text-[#252522] leading-relaxed font-normal">
                {dish.description}
              </p>
            </div>

            {/* Custom Spice Level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#252522] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#D66B43]" />
                  Spice & Seasoning Preference
                </span>
                <span className="text-[11px] text-[#6E6D66]">Customized for you</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {spiceOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSpice(s)}
                    className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      selectedSpice === s
                        ? "bg-[#D66B43]/10 border-[#D66B43] text-[#D66B43] shadow-xs"
                        : "bg-[#FFFFFF] border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#252522]">
                Special Preparation Note (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Keep dressing on the side, extra napkins..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43]"
              />
            </div>
          </div>

          {/* Sticky Bottom Footer */}
          <div className="p-5 border-t border-[#ECE7DE] bg-[#FFFFFF] flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] px-3 py-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-[#252522] w-6 text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Plate CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#D66B43] text-[#FAF8F3] font-bold text-sm flex items-center justify-between hover:bg-[#BF5832] transition-colors shadow-soft"
            >
              <span>Add to Plate</span>
              <span>₹{dish.price * qty}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
