"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Layers, Check } from "lucide-react";
import { AdminIngredient } from "@/data/mockAdminData";

interface UpdateStockModalProps {
  isOpen: boolean;
  ingredient: AdminIngredient | null;
  onClose: () => void;
  onSave: (ingredientId: string, newStock: string, status: AdminIngredient["status"]) => void;
}

export const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
  isOpen,
  ingredient,
  onClose,
  onSave,
}) => {
  const [stockAmount, setStockAmount] = useState("");
  const [status, setStatus] = useState<AdminIngredient["status"]>("in-stock");

  useEffect(() => {
    if (ingredient) {
      setStockAmount(ingredient.currentStock);
      setStatus(ingredient.status);
    }
  }, [ingredient]);

  if (!isOpen || !ingredient) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(ingredient.id, stockAmount, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md bg-white rounded-3xl border border-[#EDE4D8] shadow-2xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D66B43]/15 text-[#D66B43] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#252522]">Update Stock Level</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#8C877D] hover:text-[#252522]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <span className="text-xs text-[#736E65]">Item Selected:</span>
            <div className="font-serif text-xl font-bold text-[#252522]">{ingredient.name}</div>
            <div className="text-xs text-[#8C877D] mt-0.5">Category: {ingredient.category}</div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">
              Current Available Quantity
            </label>
            <input
              type="text"
              required
              value={stockAmount}
              onChange={(e) => setStockAmount(e.target.value)}
              placeholder="e.g. 25 kg or 50 pcs"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">Stock Status</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus("in-stock")}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                  status === "in-stock"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                    : "bg-[#FAF8F5] border-[#EDE5DA] text-[#736E65]"
                }`}
              >
                In Stock
              </button>
              <button
                type="button"
                onClick={() => setStatus("low-stock")}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                  status === "low-stock"
                    ? "bg-amber-50 border-amber-500 text-amber-800"
                    : "bg-[#FAF8F5] border-[#EDE5DA] text-[#736E65]"
                }`}
              >
                Low Stock
              </button>
              <button
                type="button"
                onClick={() => setStatus("out-of-stock")}
                className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                  status === "out-of-stock"
                    ? "bg-rose-50 border-rose-500 text-rose-800"
                    : "bg-[#FAF8F5] border-[#EDE5DA] text-[#736E65]"
                }`}
              >
                Out of Stock
              </button>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EDE5DA] text-xs">
            <span className="font-bold text-[#5C574F] block mb-1">Affected Dishes ({ingredient.affectedDishes.length}):</span>
            <div className="flex flex-wrap gap-1">
              {ingredient.affectedDishes.map((d, i) => (
                <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#EDE5DA] text-[#736E65]">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-[#EDE5DA] text-xs font-semibold text-[#5C574F] hover:bg-[#FAF8F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs font-bold shadow-md hover:brightness-105"
            >
              Update Inventory
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
