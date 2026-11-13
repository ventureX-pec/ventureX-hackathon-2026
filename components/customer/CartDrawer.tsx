"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Clock,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { MenuItem } from "@/data/mockCustomerData";

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  instructions?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onCheckout: (details: {
    orderType: "dine-in" | "takeaway";
    tableOrShelf: string;
    pickupSlot: string;
    notes: string;
  }) => void;
  defaultTable?: string;
  defaultOrderType?: "dine-in" | "takeaway";
  restaurantName?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  defaultTable,
  defaultOrderType,
  restaurantName,
}) => {
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">(
    defaultOrderType || (defaultTable ? "dine-in" : "takeaway")
  );
  const [tableOrShelf, setTableOrShelf] = useState(
    defaultTable ? `Table ${defaultTable}` : "Shelf B • Express"
  );
  const [pickupSlot, setPickupSlot] = useState(
    defaultTable ? "⚡ Table-Side Service (~10 min)" : "⚡ Instant (Ready in ~8-10 min)"
  );
  const [specialNotes, setSpecialNotes] = useState("");

  // Sync if defaultTable changes
  React.useEffect(() => {
    if (defaultTable) {
      setOrderType("dine-in");
      setTableOrShelf(`Table ${defaultTable}`);
      setPickupSlot("⚡ Table-Side Service (~10 min)");
    }
  }, [defaultTable]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  const slots = [
    "⚡ Instant (Ready in ~8-10 min)",
    "🕒 1:15 PM Break Slot",
    "🕒 1:45 PM Break Slot",
    "🕒 2:15 PM Post-Lecture",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#252522]/40 backdrop-blur-sm z-50"
          />

          {/* Drawer Slide-Over */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF8F3] text-[#252522] z-50 flex flex-col shadow-2xl border-l border-[#ECE7DE]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#ECE7DE] bg-[#FFFFFF]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D66B43]/10 text-[#D66B43] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#252522]">
                    Your ServeZa Plate
                  </h3>
                  <p className="text-[11px] text-[#6E6D66]">
                    {items.length} {items.length === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#F3EFE8] flex items-center justify-center text-[#6E6D66] hover:text-[#252522] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dine-In Table Indicator Banner */}
            {defaultTable && (
              <div className="mx-5 mt-4 p-3 rounded-2xl bg-[#fbebe4] border border-[#e8cbbd] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#c96342] uppercase tracking-wider block">
                    {restaurantName || "Dine-In Restaurant"}
                  </span>
                  <span className="font-serif font-bold text-[#1c1917] text-sm">
                    Table {defaultTable}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#c96342] text-white text-[10px] font-bold shadow-xs">
                  Dine-In Table Seated
                </span>
              </div>
            )}

            {/* Scrollable Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#F3EFE8] flex items-center justify-center text-[#6E6D66] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#252522] mb-1">
                  Your plate is empty
                </h4>
                <p className="text-xs text-[#6E6D66] max-w-xs mb-6 leading-relaxed">
                  Explore fresh bowls, sourdough slices, and artisanal coffees from campus kitchens.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#252522] text-[#FAF8F3] text-xs font-semibold hover:bg-[#D66B43] transition-colors shadow-soft"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Dining Mode Segmented Toggle */}
                <div className="p-1 rounded-xl bg-[#F3EFE8] flex items-center">
                  <button
                    onClick={() => {
                      setOrderType("takeaway");
                      setTableOrShelf("Shelf B • Express Shelf");
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      orderType === "takeaway"
                        ? "bg-[#FFFFFF] text-[#252522] shadow-sm"
                        : "text-[#6E6D66] hover:text-[#252522]"
                    }`}
                  >
                    <span>🛍️ Express Pickup</span>
                  </button>

                  <button
                    onClick={() => {
                      setOrderType("dine-in");
                      setTableOrShelf("Table #12");
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      orderType === "dine-in"
                        ? "bg-[#FFFFFF] text-[#252522] shadow-sm"
                        : "text-[#6E6D66] hover:text-[#252522]"
                    }`}
                  >
                    <span>🍽️ Dine-In Table</span>
                  </button>
                </div>

                {/* Table or Shelf Selector */}
                <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#ECE7DE]">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#252522]">
                      {orderType === "dine-in" ? "Table Number" : "Express Pickup Point"}
                    </span>
                    <span className="text-[11px] text-[#5F7A65] font-medium flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Zero Line Wait
                    </span>
                  </div>
                  <input
                    type="text"
                    value={tableOrShelf}
                    onChange={(e) => setTableOrShelf(e.target.value)}
                    placeholder={orderType === "dine-in" ? "e.g. Table #14" : "Shelf A, B, or C"}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] text-xs font-medium text-[#252522] focus:outline-none focus:border-[#D66B43]"
                  />
                </div>

                {/* Scheduled Slot Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#252522] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D66B43]" />
                      Kitchen Sync Slot
                    </span>
                    <span className="text-[11px] text-[#6E6D66]">Prepared fresh</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setPickupSlot(slot)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                          pickupSlot === slot
                            ? "bg-[#D66B43]/10 border-[#D66B43] text-[#D66B43] shadow-sm"
                            : "bg-[#FFFFFF] border-[#ECE7DE] text-[#252522] hover:border-[#D66B43]/30"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-[#6E6D66] uppercase tracking-wider">
                    Selected Items ({items.length})
                  </h4>

                  <div className="divide-y divide-[#ECE7DE]">
                    {items.map((item) => (
                      <div key={item.dish.id} className="py-3 flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#ECE7DE] flex-shrink-0">
                          <Image
                            src={item.dish.image}
                            alt={item.dish.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-xs text-[#252522] truncate">
                            {item.dish.name}
                          </h5>
                          <p className="text-[11px] text-[#6E6D66] truncate">
                            {item.dish.restaurantName}
                          </p>
                          <span className="text-xs font-bold text-[#D66B43]">
                            ₹{item.dish.price * item.quantity}
                          </span>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-2 rounded-lg bg-[#FFFFFF] border border-[#ECE7DE] px-2 py-1 shadow-sm">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#252522] w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.dish.id)}
                          className="p-1 text-[#6E6D66] hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-semibold text-[#252522] mb-1.5">
                    Chef Note / Special Instructions
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Extra green chutney, less spice..."
                    className="w-full px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43]"
                  />
                </div>

                {/* Bill Breakdown */}
                <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#ECE7DE] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6E6D66]">
                    <span>Item Total</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#5F7A65] font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Direct Kitchen Sync
                    </span>
                    <span>₹0 (FREE)</span>
                  </div>
                  <div className="flex justify-between text-[#6E6D66]">
                    <span>Taxes & GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>
                  <div className="pt-2 border-t border-[#ECE7DE] flex justify-between font-bold text-sm text-[#252522]">
                    <span>Total Amount</span>
                    <span className="text-[#D66B43]">₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Sticky Bottom Checkout Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#ECE7DE] bg-[#FFFFFF] space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-[#6E6D66]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5F7A65]" />
                    Instant UPI Token • 100% Refund Guarantee
                  </span>
                  <span className="font-bold text-xs text-[#252522]">₹{grandTotal}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    onCheckout({
                      orderType,
                      tableOrShelf,
                      pickupSlot,
                      notes: specialNotes,
                    })
                  }
                  className="w-full py-3.5 rounded-xl bg-[#D66B43] text-[#FAF8F3] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#BF5832] transition-colors shadow-soft"
                >
                  <span>Pay ₹{grandTotal} with 1-Tap UPI</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
