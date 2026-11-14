"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Clock,
  Store,
  RotateCcw,
  Eye,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Package,
  Coffee,
  ReceiptText,
} from "lucide-react";
import { CustomerOrderRecord } from "@/components/customer/CustomerOrderDetailsModal";

interface PreviousOrdersSectionProps {
  orders: CustomerOrderRecord[];
  onOpenDetails: (order: CustomerOrderRecord) => void;
  onReorder: (order: CustomerOrderRecord) => void;
  onViewAllClick: () => void;
  customerName?: string;
}

export const PreviousOrdersSection: React.FC<PreviousOrdersSectionProps> = ({
  orders,
  onOpenDetails,
  onReorder,
  onViewAllClick,
  customerName,
}) => {
  // Display up to 4 most recent orders on the homepage section
  const recentOrders = orders.slice(0, 4);

  const getStatusBadge = (status: CustomerOrderRecord["status"]) => {
    switch (status) {
      case "pending":
        return {
          label: "Received",
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
          label: "In Kitchen",
          className: "bg-orange-50 text-[#D66B43] border-orange-200",
          icon: Sparkles,
        };
      case "out_for_delivery":
        return {
          label: "Ready for Pickup",
          className: "bg-purple-50 text-purple-700 border-purple-200",
          icon: Package,
        };
      case "delivered":
        return {
          label: "Completed",
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

  return (
    <section id="previous-orders-section" className="space-y-4 sm:space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-[#ECE7DE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D66B43]/10 text-[#D66B43] border border-[#D66B43]/20">
              <ReceiptText className="w-3 h-3" />
              Order History
            </span>
            <span className="text-xs font-semibold text-[#8C877D]">
              Database Synced
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522] tracking-tight">
            Previous Orders
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6D66]">
            Past orders from partner cafés & restaurants saved to your profile for easy 1-tap reordering
          </p>
        </div>

        {orders.length > 0 && (
          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D66B43] hover:text-[#BF5832] transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Orders Grid or Empty State */}
      {recentOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#ECE7DE] p-6 sm:p-8 text-center shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF8F3] border border-[#ECE7DE] text-[#D66B43] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#252522] mb-1">
            {customerName ? `No previous orders yet for ${customerName}` : "No previous orders found"}
          </h3>
          <p className="text-xs text-[#6E6D66] max-w-md mx-auto mb-4 leading-relaxed">
            Whenever you order from <span className="font-semibold text-[#252522]">The Corner Table</span>, <span className="font-semibold text-[#252522]">The Corner Cafe</span>, or other partner restaurants, your full receipt & dish history will be stored in the database for your profile here.
          </p>
          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D66B43] hover:bg-[#BF5832] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>Browse Restaurant Menus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentOrders.map((order) => {
            const statusConfig = getStatusBadge(order.status);
            const StatusIcon = statusConfig.icon;
            const itemsCount = order.items.reduce((s, i) => s + i.quantity, 0);

            return (
              <motion.div
                key={order.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-[#ECE7DE] p-4 sm:p-5 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-3.5 group"
              >
                {/* Top: Restaurant / Café Badge & Status */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    {/* Restaurant / Cafe Name Banner */}
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#D66B43]/10 text-[#D66B43] flex items-center justify-center shrink-0">
                        {order.restaurantName.toLowerCase().includes("cafe") ? (
                          <Coffee className="w-4 h-4" />
                        ) : (
                          <Store className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C877D] block leading-none">
                          Café / Restaurant
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#252522] truncate group-hover:text-[#D66B43] transition-colors mt-0.5">
                          {order.restaurantName}
                        </h4>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusConfig.className} shrink-0`}
                    >
                      <StatusIcon className="w-2.5 h-2.5" />
                      <span>{statusConfig.label}</span>
                    </span>
                  </div>

                  {/* Order Meta details */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#6E6D66] pb-2.5 border-b border-[#F2ECE2]">
                    <Clock className="w-3 h-3 text-[#D66B43]" />
                    <span>{order.formattedDate}</span>
                    <span>•</span>
                    <span className="font-medium text-[#252522]">
                      Token #{order.tokenNumber}
                    </span>
                  </div>
                </div>

                {/* Middle: Dish summary */}
                <div className="space-y-1.5 bg-[#FAF8F3] p-2.5 rounded-xl border border-[#ECE7DE]/60 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#8C877D] font-medium mb-1">
                    <span>{itemsCount} {itemsCount === 1 ? "Item" : "Items"}</span>
                    <span className="text-[#252522]">
                      {order.orderType === "dine-in" ? `Dine-In (${order.tableOrShelf})` : "Takeaway"}
                    </span>
                  </div>

                  {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-[#252522]">
                      <span className="truncate pr-2 font-medium">
                        {item.quantity} × {item.dishName}
                      </span>
                      <span className="text-[#6E6D66] shrink-0 font-semibold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}

                  {order.items.length > 2 && (
                    <span className="text-[10px] font-semibold text-[#D66B43] block pt-0.5">
                      +{order.items.length - 2} more dishes
                    </span>
                  )}
                </div>

                {/* Bottom: Total & Actions */}
                <div className="pt-2 border-t border-[#F2ECE2] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] text-[#8C877D] uppercase tracking-wider block leading-none">
                      Total
                    </span>
                    <span className="font-serif text-sm font-bold text-[#D66B43]">
                      ₹{order.totalAmount}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onReorder(order)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#D66B43] hover:text-white border border-[#ECE7DE] text-[#252522] text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                      title="Add these dishes back into cart"
                    >
                      <RotateCcw className="w-3 h-3 text-[#D66B43] group-hover:text-white" />
                      <span>Reorder</span>
                    </button>

                    <button
                      onClick={() => onOpenDetails(order)}
                      className="p-1.5 rounded-lg bg-[#252522] hover:bg-[#D66B43] text-white transition-colors cursor-pointer shadow-2xs"
                      title="View full receipt"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};
