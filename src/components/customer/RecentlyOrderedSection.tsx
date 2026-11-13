"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { RotateCcw, Clock, Plus, Sparkles } from "lucide-react";
import { RECENT_ORDERS, RecentOrder, MenuItem } from "@/data/mockCustomerData";

interface RecentlyOrderedSectionProps {
  onReorder: (dishId: string) => void;
}

export const RecentlyOrderedSection: React.FC<RecentlyOrderedSectionProps> = ({
  onReorder,
}) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252522]">
            Recently Ordered
          </h2>
          <p className="text-xs text-[#6E6D66]">
            Repeat your favorite campus meals with 1-tap
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {RECENT_ORDERS.map((order) => (
          <div
            key={order.id}
            className="p-3.5 rounded-2xl bg-white border border-[#ECE7DE] shadow-xs flex items-center justify-between gap-3 hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#ECE7DE] flex-shrink-0">
                <Image
                  src={order.dishImage}
                  alt={order.dishName}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>

              <div className="min-w-0">
                <h4 className="font-bold text-xs text-[#252522] truncate">
                  {order.dishName}
                </h4>
                <p className="text-[11px] text-[#6E6D66] truncate mt-0.5">
                  {order.restaurantName} • ₹{order.price}
                </p>
                <span className="text-[10px] text-[#6E6D66]/80">
                  {order.date}
                </span>
              </div>
            </div>

            <button
              onClick={() => onReorder(order.dishId)}
              className="flex-shrink-0 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#FAF8F3] hover:bg-[#D66B43] text-[#252522] hover:text-white border border-[#ECE7DE] hover:border-[#D66B43] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              title="Add to plate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reorder</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
