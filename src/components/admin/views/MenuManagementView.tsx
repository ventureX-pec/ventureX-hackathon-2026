"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Plus,
  Search,
  Check,
  X,
  Flame,
  Clock,
  Edit2,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { MenuItem } from "@/data/mockCustomerData";

interface MenuManagementViewProps {
  dishes: MenuItem[];
  onToggleAvailability: (dishId: string) => void;
  onOpenAddModal: () => void;
  onEditDish?: (dish: MenuItem) => void;
  onDeleteDish?: (dishId: string) => void;
}

export const MenuManagementView: React.FC<MenuManagementViewProps> = ({
  dishes,
  onToggleAvailability,
  onOpenAddModal,
  onEditDish,
  onDeleteDish,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "burgers", label: "Burgers" },
    { id: "pizza", label: "Pizza" },
    { id: "indian", label: "Lunch Bowls" },
    { id: "sushi", label: "Sushi & Asian" },
    { id: "salads", label: "Healthy & Salads" },
    { id: "drinks", label: "Beverages" },
  ];

  const filteredDishes = dishes.filter((dish) => {
    if (selectedCategory !== "all" && dish.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = dish.name.toLowerCase().includes(q);
      const matchesDesc = dish.description.toLowerCase().includes(q);
      if (!matchesName && !matchesDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EDE4D8] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
              Menu Management
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D66B43]/10 text-[#D66B43]">
              {dishes.length} Items Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#736E65]">
            Manage prices, stock availability, photos and culinary categories
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Controls: Search & Category Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#D66B43] text-white shadow-xs"
                  : "bg-white border border-[#EDE5DA] text-[#5C574F] hover:bg-[#FAF8F5] hover:text-[#252522]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C877D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish name..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#EDE5DA] text-xs text-[#252522] focus:outline-none focus:border-[#D66B43]"
          />
        </div>
      </div>

      {/* Dishes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDishes.map((dish) => {
          // If dish does not have an isAvailable property, default to true
          const isAvailable = (dish as any).isAvailable !== false;

          return (
            <motion.div
              key={dish.id}
              layout
              className={`bg-white/95 backdrop-blur-md rounded-3xl border border-[#EDE4D8] overflow-hidden shadow-xs flex flex-col justify-between transition-all ${
                !isAvailable ? "opacity-75 grayscale-[30%]" : "hover:shadow-md"
              }`}
            >
              <div>
                {/* Dish Photo */}
                <div className="relative w-full h-44 bg-[#FAF8F5]">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs ${
                        dish.isVeg
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                      }`}
                    >
                      {dish.isVeg ? "VEG 🌱" : "NON-VEG 🍗"}
                    </span>
                    {dish.rating && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md text-[#252522]">
                        ★ {dish.rating}
                      </span>
                    )}
                  </div>

                  {/* In-Stock / Out-of-Stock Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-md backdrop-blur-md ${
                        isAvailable
                          ? "bg-emerald-500/90 text-white"
                          : "bg-rose-500/90 text-white"
                      }`}
                    >
                      {isAvailable ? "In Stock" : "Sold Out"}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#252522] leading-tight">
                      {dish.name}
                    </h3>
                    <span className="font-serif text-lg font-bold text-[#D66B43] shrink-0">
                      ₹{dish.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#736E65] line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>

                  <div className="pt-2 flex items-center gap-3 text-xs text-[#8C877D]">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D66B43]" />
                      <span>{dish.prepTimeMinutes} min prep</span>
                    </span>
                    <span className="text-[11px] capitalize bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#EDE5DA]">
                      {dish.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Availability Toggle & Edit */}
              <div className="px-5 pb-5 pt-2 border-t border-[#F2ECE2] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleAvailability(dish.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      isAvailable ? "bg-[#D66B43]" : "bg-gray-300"
                    }`}
                    aria-label="Toggle availability"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isAvailable ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-xs font-semibold text-[#5C574F]">
                    {isAvailable ? "Available" : "Disabled"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {onEditDish && (
                    <button
                      onClick={() => onEditDish(dish)}
                      className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EDE5DA] text-[#5C574F] hover:text-[#D66B43] hover:bg-white transition-colors"
                      title="Edit dish"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeleteDish && (
                    <button
                      onClick={() => onDeleteDish(dish.id)}
                      className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EDE5DA] text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Delete dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
