"use client";

import React, { useState } from "react";
import Image from "next/image";
import SafeImage from "./SafeImage";
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
  Heart,
} from "lucide-react";
import { MenuItem } from "@/data/mockCustomerData";

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number, instructions?: string) => void;
  currentCartQty?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (dishId: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  currentCartQty = 0,
  isFavorite = false,
  onToggleFavorite,
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
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          className="relative w-full max-w-lg bg-[#FAF8F3] rounded-3xl border border-[#ECE7DE] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header Image with Floating Action Buttons */}
          <div className="relative h-60 w-full bg-[#ECE7DE] flex-shrink-0">
            <SafeImage
              src={dish.image}
              alt={dish.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 500px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252522]/90 via-[#252522]/30 to-transparent" />

            {/* Top Bar with Favorite Heart & Close */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(dish.id)}
                  className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm text-[#6E6D66] hover:text-rose-500 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </button>
              )}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm text-[#252522] hover:bg-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Badges on Image */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF8F3]/95 backdrop-blur-sm text-[#252522]">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      dish.isVeg ? "bg-emerald-600" : "bg-rose-600"
                    }`}
                  />
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
                <div className="text-sm font-bold text-[#252522] mt-0.5">
                  ⭐ {dish.rating} / 5.0
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#ECE7DE] text-center">
                <div className="text-[10px] font-bold text-[#6E6D66] uppercase tracking-wider">
                  Dietary
                </div>
                <div className="text-sm font-bold text-[#252522] mt-0.5">
                  {dish.isVeg ? "🌱 100% Veg" : "🍗 Non-Veg"}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E6D66]">
                About This Dish
              </h4>
              <p className="text-xs text-[#252522] leading-relaxed">
                {dish.description}
              </p>
            </div>

            {/* Spice Preference */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E6D66] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#D66B43]" />
                <span>Spice Preference</span>
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {spiceOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedSpice(opt)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSpice === opt
                        ? "bg-[#D66B43] border-[#D66B43] text-white shadow-soft"
                        : "bg-white border-[#ECE7DE] text-[#252522] hover:border-[#D66B43]/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E6D66]">
                Kitchen Instructions (Optional)
              </h4>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Extra napkins, no onions, dressing on side..."
                rows={2}
                className="w-full p-3 rounded-xl bg-white border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66]/60 focus:outline-none focus:border-[#D66B43] resize-none"
              />
            </div>
          </div>

          {/* Footer Quantity & Add to Cart Action */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#ECE7DE] flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-[#FAF8F3] border border-[#ECE7DE] rounded-xl px-3 py-1.5 shadow-xs">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="text-[#6E6D66] hover:text-[#252522] transition-colors cursor-pointer"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-[#252522] w-4 text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="text-[#6E6D66] hover:text-[#252522] transition-colors cursor-pointer"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Total & Add Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className="flex-1 py-3 px-5 rounded-xl bg-[#252522] hover:bg-[#D66B43] text-white text-xs font-bold flex items-center justify-between transition-colors shadow-soft cursor-pointer"
            >
              <span>Add to Plate</span>
              <span className="font-serif text-sm">₹{dish.price * qty}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
