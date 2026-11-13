"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Layers,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { AdminIngredient } from "@/data/mockAdminData";

interface IngredientsViewProps {
  ingredients: AdminIngredient[];
  onOpenUpdateModal: (ingredient: AdminIngredient) => void;
}

export const IngredientsView: React.FC<IngredientsViewProps> = ({
  ingredients,
  onOpenUpdateModal,
}) => {
  const [filterStatus, setFilterStatus] = useState<"all" | "low" | "out">("all");
  const [search, setSearch] = useState("");

  const filtered = ingredients.filter((ing) => {
    if (filterStatus === "low" && ing.status !== "low-stock") return false;
    if (filterStatus === "out" && ing.status !== "out-of-stock") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        ing.name.toLowerCase().includes(q) ||
        ing.category.toLowerCase().includes(q) ||
        ing.affectedDishes.some((d) => d.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const lowStockCount = ingredients.filter((i) => i.status === "low-stock").length;
  const outOfStockCount = ingredients.filter((i) => i.status === "out-of-stock").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
              Kitchen Ingredients & Inventory
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D66B43]/10 text-[#D66B43]">
              {ingredients.length} Tracked Supplies
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#736E65]">
            Live raw material levels & automatic menu dish dependency monitoring
          </p>
        </div>
      </div>

      {/* Stock Alerts Warning Banner if low/out */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-amber-900 text-sm">Inventory Attention Needed</div>
              <div className="text-amber-800">
                {outOfStockCount > 0 && `${outOfStockCount} ingredient out of stock. `}
                {lowStockCount > 0 && `${lowStockCount} items below minimum safety threshold.`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus(filterStatus === "low" ? "all" : "low")}
              className="px-3 py-1.5 rounded-full bg-white border border-amber-300 text-amber-900 font-bold hover:bg-amber-100 transition-colors"
            >
              Filter Needs Attention
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filterStatus === "all"
                ? "bg-[#D66B43] text-white shadow-xs"
                : "bg-white border border-[#EDE5DA] text-[#5C574F]"
            }`}
          >
            All Supplies ({ingredients.length})
          </button>
          <button
            onClick={() => setFilterStatus("low")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filterStatus === "low"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-white border border-[#EDE5DA] text-amber-800"
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterStatus("out")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filterStatus === "out"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-white border border-[#EDE5DA] text-rose-800"
            }`}
          >
            Out of Stock ({outOfStockCount})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C877D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredient or dish..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
          />
        </div>
      </div>

      {/* Ingredients List Table/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#EDE4D8] p-5 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#F2ECE2]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#252522]">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-medium text-[#8C877D] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#EDE5DA]">
                    {item.category}
                  </span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    item.status === "in-stock"
                      ? "bg-emerald-100 text-emerald-800"
                      : item.status === "low-stock"
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-rose-100 text-rose-800 border border-rose-200"
                  }`}
                >
                  {item.status === "in-stock"
                    ? "In Stock"
                    : item.status === "low-stock"
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>
              </div>

              {/* Stock Quantity Indicators */}
              <div className="mt-4 grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EDE5DA]">
                <div>
                  <span className="text-[10px] text-[#8C877D] uppercase font-bold block">
                    Available Stock
                  </span>
                  <span className="font-serif text-xl font-bold text-[#252522]">
                    {item.currentStock}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8C877D] uppercase font-bold block">
                    Min Threshold
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#736E65]">
                    {item.minThreshold}
                  </span>
                </div>
              </div>

              {/* Affected Dishes */}
              <div className="mt-3 space-y-1">
                <span className="text-[11px] font-bold text-[#5C574F] block">
                  Dishes Linked ({item.affectedDishes.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.affectedDishes.map((dish, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-white border border-[#EDE5DA] text-[#5C574F]"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#F2ECE2] flex items-center justify-between">
              <span className="text-[10px] text-[#8C877D]">Updated: {item.lastUpdated}</span>
              <button
                onClick={() => onOpenUpdateModal(item)}
                className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#EDE5DA] hover:border-[#D66B43] hover:text-[#D66B43] text-xs font-bold text-[#252522] transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restock</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
