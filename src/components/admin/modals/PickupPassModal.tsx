"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { X, QrCode, CheckCircle2, Search, Sparkles } from "lucide-react";
import { AdminOrder } from "@/data/mockAdminData";

interface PickupPassModalProps {
  isOpen: boolean;
  orders: AdminOrder[];
  onClose: () => void;
  onConfirmPickup: (orderId: string) => void;
}

export const PickupPassModal: React.FC<PickupPassModalProps> = ({
  isOpen,
  orders,
  onClose,
  onConfirmPickup,
}) => {
  const [tokenInput, setTokenInput] = useState("");
  const [matchedOrder, setMatchedOrder] = useState<AdminOrder | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) =>
        o.tokenNumber === tokenInput.trim() ||
        o.orderNumber.toLowerCase() === tokenInput.trim().toLowerCase()
    );
    if (found) {
      setMatchedOrder(found);
    } else {
      setMatchedOrder(null);
      alert(`No active order matching token #${tokenInput} found.`);
    }
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
              <QrCode className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#252522]">Express Pickup Scanner</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#8C877D] hover:text-[#252522]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mock QR Scanner Camera Viewfinder */}
        <div className="relative w-full h-44 rounded-2xl bg-[#1A1816] text-white flex flex-col items-center justify-center p-4 overflow-hidden border border-[#3E3A35]">
          <div className="w-32 h-32 border-2 border-dashed border-[#D66B43] rounded-2xl flex items-center justify-center relative">
            <span className="w-full h-0.5 bg-[#D66B43] absolute top-1/2 -translate-y-1/2 animate-pulse" />
            <QrCode className="w-12 h-12 text-white/40" />
          </div>
          <span className="text-[10px] text-white/60 mt-2">
            Center student&apos;s digital phone QR pass or enter token below
          </span>
        </div>

        {/* Token Input Form */}
        <form onSubmit={handleVerify} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-[#5C574F] block mb-1">
              Token Number / Order ID
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="e.g. 42 or #D4821"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#D66B43] text-white text-xs font-bold hover:brightness-105 transition-all shadow-xs"
              >
                Lookup
              </button>
            </div>
          </div>
        </form>

        {/* Matched Ticket Preview */}
        {matchedOrder && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-serif text-xl font-bold text-emerald-950">
                  Token #{matchedOrder.tokenNumber}
                </span>
                <span className="text-xs text-emerald-700 block">{matchedOrder.customerName}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-200/80 text-emerald-900">
                {matchedOrder.status}
              </span>
            </div>

            <div className="text-xs text-emerald-800">
              Assigned Shelf: <span className="font-bold">{matchedOrder.tableOrShelf}</span>
            </div>

            <div className="text-xs text-emerald-700">
              Items: {matchedOrder.items.map((i) => `${i.quantity}x ${i.dishName}`).join(", ")}
            </div>

            <button
              onClick={() => {
                onConfirmPickup(matchedOrder.id);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Handover & Release Slot</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
