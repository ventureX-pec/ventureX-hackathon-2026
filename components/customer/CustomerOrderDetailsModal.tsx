"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Package,
  Receipt,
  UtensilsCrossed,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export interface CustomerOrderRecord {
  id: string;
  tokenNumber: string;
  customerName: string;
  customerEmail: string;
  restaurantName: string;
  items: {
    dishName: string;
    quantity: number;
    price: number;
    image?: string;
    instructions?: string;
  }[];
  totalAmount: number;
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
  orderType: "dine-in" | "takeaway";
  tableOrShelf: string;
  pickupSlot: string;
  createdAt: string;
  formattedDate: string;
  notes?: string;
}

interface CustomerOrderDetailsModalProps {
  order: CustomerOrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onReorder?: (order: CustomerOrderRecord) => void;
}

export const CustomerOrderDetailsModal: React.FC<CustomerOrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onReorder,
}) => {
  if (!isOpen || !order) return null;

  const getStatusBadge = (status: CustomerOrderRecord["status"]) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          className: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock,
        };
      case "confirmed":
        return {
          label: "Confirmed",
          className: "bg-blue-50 text-blue-700 border-blue-200",
          icon: CheckCircle2,
        };
      case "preparing":
        return {
          label: "Preparing in Kitchen",
          className: "bg-orange-50 text-[#D66B43] border-orange-200",
          icon: Sparkles,
        };
      case "out_for_delivery":
        return {
          label: "Out for Delivery",
          className: "bg-purple-50 text-purple-700 border-purple-200",
          icon: Package,
        };
      case "delivered":
        return {
          label: "Delivered",
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
        };
      case "cancelled":
        return {
          label: "Cancelled",
          className: "bg-rose-50 text-rose-700 border-rose-200",
          icon: AlertCircle,
        };
      default:
        return {
          label: status,
          className: "bg-stone-50 text-stone-700 border-stone-200",
          icon: Clock,
        };
    }
  };

  const statusConfig = getStatusBadge(order.status);
  const StatusIcon = statusConfig.icon;

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = order.totalAmount - subtotal;

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          className="relative w-full max-w-lg bg-white rounded-3xl border border-[#ECE7DE] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#ECE7DE] bg-[#FAF8F3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D66B43]/10 text-[#D66B43] flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-[#252522]">
                    Order #{order.id}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusConfig.className}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    <span>{statusConfig.label}</span>
                  </span>
                </div>
                <p className="text-xs text-[#6E6D66] mt-0.5">
                  {order.formattedDate} • {order.restaurantName}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522] flex items-center justify-center transition-colors shadow-xs"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* Live Token & Pickup Info */}
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D66B43]">
                  Counter Pickup Token
                </span>
                <div className="font-serif text-3xl font-bold text-[#252522] mt-0.5">
                  #{order.tokenNumber}
                </div>
              </div>

              <div className="text-right space-y-1">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-white border border-[#ECE7DE] text-xs font-semibold text-[#252522]">
                  {order.orderType === "dine-in" ? "Dine-In" : "Takeaway"}
                </span>
                <p className="text-xs text-[#6E6D66]">{order.tableOrShelf}</p>
                <p className="text-[11px] font-medium text-[#D66B43]">
                  {order.pickupSlot}
                </p>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#6E6D66] uppercase tracking-wider">
                Items Ordered ({order.items.reduce((s, i) => s + i.quantity, 0)})
              </h4>

              <div className="divide-y divide-[#ECE7DE] border border-[#ECE7DE] rounded-2xl overflow-hidden bg-white">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.dishName}-${index}`}
                    className="p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#ECE7DE] flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.dishName}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] flex items-center justify-center text-[#D66B43] flex-shrink-0">
                          <UtensilsCrossed className="w-5 h-5" />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#252522]">
                            {item.quantity} × {item.dishName}
                          </span>
                        </div>
                        {item.instructions && (
                          <p className="text-[11px] text-[#6E6D66] italic mt-0.5 line-clamp-1">
                            {item.instructions}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#252522]">
                        ₹{item.price * item.quantity}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-[#6E6D66]">
                          ₹{item.price} each
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="space-y-2 pt-2 border-t border-[#ECE7DE] text-xs">
              <div className="flex justify-between text-[#6E6D66]">
                <span>Item Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#6E6D66]">
                <span>Taxes & Kitchen Packaging (5%)</span>
                <span>₹{taxes > 0 ? taxes : 0}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#252522] pt-2 border-t border-[#ECE7DE]">
                <span>Total Amount Paid</span>
                <span className="font-serif text-base text-[#D66B43]">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] text-[11px] text-[#6E6D66] space-y-1">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-semibold text-[#252522]">
                  {order.customerName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Account Email:</span>
                <span className="font-semibold text-[#252522]">
                  {order.customerEmail}
                </span>
              </div>
              {order.notes && (
                <div className="flex justify-between pt-1 border-t border-[#ECE7DE]">
                  <span>Special Notes:</span>
                  <span className="text-[#252522] italic">{order.notes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 border-t border-[#ECE7DE] bg-white flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#ECE7DE] text-xs font-semibold text-[#6E6D66] hover:text-[#252522] hover:bg-[#FAF8F3] transition-colors"
            >
              Close
            </button>

            {onReorder && (
              <button
                onClick={() => {
                  onReorder(order);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#252522] hover:bg-[#D66B43] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-soft"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reorder Items</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
