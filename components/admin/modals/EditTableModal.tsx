"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Edit3, Users, MapPin, CheckCircle2 } from "lucide-react";
import { RestaurantTable } from "@/app/api/tables/route";

interface EditTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: RestaurantTable | null;
  onUpdateTable: (tableId: string, updates: Partial<RestaurantTable>) => void;
}

export const EditTableModal: React.FC<EditTableModalProps> = ({
  isOpen,
  onClose,
  table,
  onUpdateTable,
}) => {
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState(4);
  const [seatingArea, setSeatingArea] = useState("Main Dining Hall");
  const [status, setStatus] = useState<"available" | "occupied" | "reserved" | "inactive">("available");

  useEffect(() => {
    if (table) {
      setTableNumber(table.table_number || "");
      setCapacity(table.capacity || 4);
      setSeatingArea(table.seating_area || "Main Dining Hall");
      setStatus(table.status || "available");
    }
  }, [table]);

  if (!isOpen || !table) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableNumber.trim()) return;

    onUpdateTable(table.id, {
      table_number: tableNumber.trim().toUpperCase(),
      capacity: Number(capacity) || 4,
      seating_area: seatingArea.trim(),
      status,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-md bg-white rounded-3xl border border-[#EDE4D8] shadow-2xl p-6 sm:p-7 space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE2]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#c96342]/15 text-[#c96342] flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#252522]">
                Edit Table {table.table_number}
              </h2>
              <p className="text-[11px] text-[#78716c]">
                Update seating capacity, location, and dine-in status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg text-[#8C877D] hover:text-[#252522]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#252522] mb-1">
              Table Number or Label <span className="text-[#c96342]">*</span>
            </label>
            <input
              type="text"
              required
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EDE4D8] text-xs font-bold text-[#1c1917] focus:outline-none focus:border-[#c96342]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#252522] mb-1">
                Capacity
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EDE4D8] text-xs font-semibold text-[#1c1917] focus:outline-none focus:border-[#c96342]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#252522] mb-1">
                Table Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EDE4D8] text-xs font-semibold text-[#1c1917] focus:outline-none focus:border-[#c96342]"
              >
                <option value="available">Available (Active)</option>
                <option value="occupied">Occupied (Seated)</option>
                <option value="reserved">Reserved</option>
                <option value="inactive">Inactive (Out of Order)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#252522] mb-1">
              Seating Area
            </label>
            <select
              value={seatingArea}
              onChange={(e) => setSeatingArea(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#EDE4D8] text-xs font-medium text-[#1c1917] focus:outline-none focus:border-[#c96342]"
            >
              <option value="Main Dining Hall">Main Dining Hall</option>
              <option value="Window Nook">Window Nook</option>
              <option value="Outdoor Garden Patio">Outdoor Garden Patio</option>
              <option value="Espresso Bar Counter">Espresso Bar Counter</option>
              <option value="Private Dining Booth">Private Dining Booth</option>
              <option value="Rooftop Terrace">Rooftop Terrace</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#EDE4D8] hover:bg-[#FAF8F5] text-xs font-semibold text-[#5C574F] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#c96342] hover:bg-[#b04f32] text-white text-xs font-bold transition-all shadow-md shadow-[#c96342]/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
