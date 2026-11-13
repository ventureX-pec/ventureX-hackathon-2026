"use client";

import React from "react";
import { motion } from "motion/react";
import { X, Clock, MapPin, Phone, ChefHat, CheckCircle2, Flame, User } from "lucide-react";
import { AdminOrder } from "@/data/mockAdminData";

interface OrderDetailsModalProps {
  order: AdminOrder | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: AdminOrder["status"]) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-lg bg-white rounded-3xl border border-[#EDE4D8] shadow-2xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-[#252522]">
                {order.orderNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D66B43]/15 text-[#D66B43]">
                Token #{order.tokenNumber}
              </span>
            </div>
            <span className="text-xs text-[#8C877D]">Placed at {order.createdAt} ({order.timeAgo})</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#8C877D] hover:text-[#252522]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer & Destination Box */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EDE5DA] text-xs">
          <div>
            <span className="text-[#8C877D] uppercase font-bold text-[10px] block">Customer</span>
            <div className="font-bold text-[#252522] mt-0.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D66B43]" />
              <span>{order.customerName}</span>
            </div>
            <div className="text-[#736E65] font-mono mt-0.5">{order.customerPhone}</div>
          </div>

          <div>
            <span className="text-[#8C877D] uppercase font-bold text-[10px] block">Destination</span>
            <div className="font-bold text-[#252522] mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D66B43]" />
              <span>{order.tableOrShelf}</span>
            </div>
            <div className="text-[#736E65] capitalize mt-0.5">{order.orderType} order</div>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C877D]">
            Kitchen Ticket Items
          </div>
          <div className="divide-y divide-[#F2ECE2] border border-[#EDE5DA] rounded-2xl p-3 bg-white">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between text-xs first:pt-0 last:pb-0">
                <div>
                  <span className="font-bold text-[#D66B43] mr-2">{item.quantity}x</span>
                  <span className="font-semibold text-[#252522]">{item.dishName}</span>
                  {item.notes && (
                    <span className="text-[10px] text-[#8C877D] block italic">
                      Note: {item.notes}
                    </span>
                  )}
                </div>
                <span className="font-serif font-bold text-sm text-[#252522]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] text-xs font-semibold">
          <span className="text-[#736E65]">Total Bill Value:</span>
          <span className="font-serif text-lg font-bold text-[#252522]">₹{order.totalAmount}</span>
        </div>

        {/* Status Actions */}
        <div className="space-y-2 pt-2 border-t border-[#F2ECE2]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C877D] block">
            Change Order Status:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onUpdateStatus(order.id, "preparing");
                onClose();
              }}
              className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                order.status === "preparing"
                  ? "bg-[#D66B43] text-white border-[#D66B43]"
                  : "bg-[#FAF8F5] border-[#EDE5DA] text-[#5C574F] hover:bg-white"
              }`}
            >
              Cooking
            </button>
            <button
              onClick={() => {
                onUpdateStatus(order.id, "ready");
                onClose();
              }}
              className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                order.status === "ready"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-[#FAF8F5] border-[#EDE5DA] text-[#5C574F] hover:bg-white"
              }`}
            >
              Ready at Shelf
            </button>
            <button
              onClick={() => {
                onUpdateStatus(order.id, "completed");
                onClose();
              }}
              className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                order.status === "completed"
                  ? "bg-black text-white border-black"
                  : "bg-[#FAF8F5] border-[#EDE5DA] text-[#5C574F] hover:bg-white"
              }`}
            >
              Handover
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
