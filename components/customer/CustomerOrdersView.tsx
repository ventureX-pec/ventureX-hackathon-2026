"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Sparkles,
  ArrowRight,
  Eye,
  RotateCcw,
  UtensilsCrossed,
  Store,
} from "lucide-react";
import { CustomerOrderRecord } from "@/components/customer/CustomerOrderDetailsModal";

interface CustomerOrdersViewProps {
  orders: CustomerOrderRecord[];
  onOpenDetails: (order: CustomerOrderRecord) => void;
  onExploreClick: () => void;
  onReorder?: (order: CustomerOrderRecord) => void;
}

export const CustomerOrdersView: React.FC<CustomerOrdersViewProps> = ({
  orders,
  onOpenDetails,
  onExploreClick,
  onReorder,
}) => {
  const [filter, setFilter] = useState<"all" | "active" | "delivered" | "cancelled">("all");

  const filteredOrders = orders.filter((order) => {
    if (filter === "active") {
      return ["pending", "confirmed", "preparing", "out_for_delivery"].includes(order.status);
    }
    if (filter === "delivered") {
      return order.status === "delivered";
    }
    if (filter === "cancelled") {
      return order.status === "cancelled";
    }
    return true;
  });

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

  const filterTabs = [
    { id: "all", label: "All Orders", count: orders.length },
    {
      id: "active",
      label: "Active",
      count: orders.filter((o) =>
        ["pending", "confirmed", "preparing", "out_for_delivery"].includes(o.status)
      ).length,
    },
    {
      id: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === "delivered").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header & Filter Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#ECE7DE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#252522] tracking-tight">
              My Orders
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D66B43]/10 text-[#D66B43] border border-[#D66B43]/20 shadow-xs">
              {orders.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6D66] font-medium leading-relaxed">
            Real-time campus order status, token receipts, and kitchen history
          </p>
        </div>

        {/* Filter Pills */}
        {orders.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#252522] text-[#FAF8F3] shadow-xs"
                      : "bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#ECE7DE] text-[#6E6D66]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Orders List or Empty State */}
      {filteredOrders.length === 0 ? (
        <div className="py-16 sm:py-20 px-4 text-center max-w-md mx-auto space-y-4 bg-white rounded-3xl border border-[#ECE7DE] shadow-soft">
          <div className="w-16 h-16 rounded-3xl bg-[#FAF8F3] border border-[#ECE7DE] text-[#D66B43] flex items-center justify-center mx-auto shadow-xs">
            <ClipboardList className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#252522]">
              {orders.length === 0
                ? "No Orders Placed Yet"
                : `No ${filter} orders found`}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6D66] max-w-sm mx-auto leading-relaxed">
              {orders.length === 0
                ? "Your order history is empty. Discover gourmet plates from partner kitchens, order ahead, and skip the line!"
                : `You do not have any orders matching the "${filter}" filter right now.`}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D66B43] hover:bg-[#BF5832] text-white text-xs font-bold transition-all shadow-soft hover:shadow-card cursor-pointer"
            >
              <span>Explore Restaurants</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredOrders.map((order) => {
            const statusConfig = getStatusBadge(order.status);
            const StatusIcon = statusConfig.icon;
            const totalItemsCount = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );

            return (
              <motion.div
                key={order.id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-3xl border border-[#ECE7DE] p-5 sm:p-6 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-4"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#ECE7DE]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-[#252522]">
                        {order.restaurantName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF8F3] border border-[#ECE7DE] text-[10px] font-bold text-[#6E6D66]">
                        Token #{order.tokenNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#6E6D66] mt-1">
                      <Clock className="w-3 h-3 text-[#D66B43]" />
                      <span>{order.formattedDate}</span>
                      <span>•</span>
                      <span>Order #{order.id}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${statusConfig.className} flex-shrink-0`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span>{statusConfig.label}</span>
                  </span>
                </div>

                {/* Items Summary */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#6E6D66]">
                    <span>
                      {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
                    </span>
                    <span className="font-medium text-[#252522]">
                      {order.orderType === "dine-in"
                        ? `Dine-In (${order.tableOrShelf})`
                        : `Takeaway (${order.pickupSlot})`}
                    </span>
                  </div>

                  {/* Items Preview Chips */}
                  <div className="space-y-1.5 bg-[#FAF8F3] p-3 rounded-2xl border border-[#ECE7DE]">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-[#252522] font-medium line-clamp-1">
                          {item.quantity} × {item.dishName}
                        </span>
                        <span className="text-[#6E6D66] font-semibold flex-shrink-0">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-[10px] text-[#D66B43] font-semibold pt-0.5">
                        +{order.items.length - 3} more items...
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Footer & Action Buttons */}
                <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#6E6D66] uppercase tracking-wider block">
                      Total Paid
                    </span>
                    <span className="font-serif text-lg font-bold text-[#D66B43]">
                      ₹{order.totalAmount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onReorder && (
                      <button
                        onClick={() => onReorder(order)}
                        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522] hover:border-[#D66B43]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                        title="Reorder items into cart"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#D66B43]" />
                        <span className="hidden sm:inline">Reorder</span>
                      </button>
                    )}

                    <button
                      onClick={() => onOpenDetails(order)}
                      className="px-3.5 py-2 rounded-xl bg-[#252522] hover:bg-[#D66B43] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-soft"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
