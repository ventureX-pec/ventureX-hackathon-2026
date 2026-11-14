"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import SafeImage from "./SafeImage";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Star,
  Search,
  Filter,
  Heart,
  Plus,
  Minus,
  Check,
  Sparkles,
  MapPin,
  ShieldCheck,
  Flame,
  Leaf,
} from "lucide-react";
import { Restaurant, MenuItem } from "@/data/mockCustomerData";
import { CartItem } from "@/components/customer/CartDrawer";

interface RestaurantMenuViewProps {
  restaurant: Restaurant;
  dishes: MenuItem[];
  cart: CartItem[];
  favoriteDishIds: string[];
  onToggleFavoriteDish: (dishId: string) => void;
  onAddToCart: (dish: MenuItem, quantity?: number, instructions?: string) => void;
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onOpenDishModal: (dish: MenuItem) => void;
  onBack: () => void;
  highlightedDishId?: string | null;
}

export const RestaurantMenuView: React.FC<RestaurantMenuViewProps> = ({
  restaurant,
  dishes,
  cart,
  favoriteDishIds,
  onToggleFavoriteDish,
  onAddToCart,
  onUpdateQuantity,
  onOpenDishModal,
  onBack,
  highlightedDishId,
}) => {
  const [selectedSection, setSelectedSection] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  // Extract unique menu sections for this restaurant
  const sections = useMemo(() => {
    const list = Array.from(
      new Set(dishes.map((d) => d.menuSection || "Main Course"))
    );
    return ["All", ...list];
  }, [dishes]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      if (selectedSection !== "All" && (dish.menuSection || "Main Course") !== selectedSection) {
        return false;
      }
      if (vegOnly && !dish.isVeg) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        const matchesTag = dish.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });
  }, [dishes, selectedSection, vegOnly, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#ECE7DE] text-xs font-bold text-[#6E6D66] hover:text-[#252522] hover:border-[#D66B43]/50 shadow-xs transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to All Kitchens</span>
        </button>

        <span className="text-xs text-[#6E6D66] font-medium hidden sm:inline-block">
          {dishes.length} artisanal dishes prepared live
        </span>
      </div>

      {/* Restaurant Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#252522] text-white border border-[#ECE7DE] shadow-card">
        {/* Background Atmosphere Image with Gradient Scrim */}
        <div className="absolute inset-0">
          <SafeImage
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover opacity-35 filter brightness-90"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252522] via-[#252522]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D66B43]/20 border border-[#D66B43]/40 text-[#FAF8F3] text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D66B43]" />
            <span>Campus Partner Kitchen</span>
          </div>

          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF8F3]">
              {restaurant.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF8F3]/80 mt-1.5 max-w-xl leading-relaxed">
              {restaurant.tagline}
            </p>
          </div>

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md text-[#FAF8F3] font-bold flex items-center gap-1.5 border border-white/15">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{restaurant.rating} Rating</span>
            </span>

            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md text-[#FAF8F3] font-medium flex items-center gap-1.5 border border-white/15">
              <Clock className="w-3.5 h-3.5 text-[#D66B43]" />
              <span>{restaurant.prepTime}</span>
            </span>

            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md text-[#FAF8F3] font-medium flex items-center gap-1.5 border border-white/15">
              <MapPin className="w-3.5 h-3.5 text-[#D66B43]" />
              <span>{restaurant.location}</span>
            </span>

            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 backdrop-blur-md text-emerald-300 font-bold border border-emerald-500/30">
              ⚡ {restaurant.currentQueue} orders in queue
            </span>
          </div>
        </div>
      </div>

      {/* Menu Filter Controls & Search */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Section Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {sections.map((section) => {
              const isActive = selectedSection === section;
              const count =
                section === "All"
                  ? dishes.length
                  : dishes.filter((d) => (d.menuSection || "Main Course") === section).length;
              return (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#252522] text-white shadow-soft"
                      : "bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
                  }`}
                >
                  <span>{section}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-[#ECE7DE] text-[#6E6D66]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Veg Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#6E6D66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder={`Search ${restaurant.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#ECE7DE] rounded-full text-xs text-[#252522] placeholder:text-[#6E6D66]/70 focus:outline-none focus:border-[#D66B43] shadow-xs"
              />
            </div>

            {/* Veg Only Toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${
                vegOnly
                  ? "bg-emerald-600 text-white shadow-soft"
                  : "bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Pure Veg</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto space-y-3 bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-soft">
          <p className="font-serif text-lg font-bold text-[#252522]">
            No dishes match your filter
          </p>
          <p className="text-xs text-[#6E6D66]">
            Try clearing your search or switching to another category to explore more items.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSection("All");
              setVegOnly(false);
            }}
            className="px-4 py-2 rounded-full bg-[#D66B43] text-white text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDishes.map((dish) => {
            const inCart = cart.find((i) => i.dish.id === dish.id);
            const isFav = favoriteDishIds.includes(dish.id);
            const isHighlighted = highlightedDishId === dish.id;

            return (
              <motion.div
                key={dish.id}
                id={`dish-card-${dish.id}`}
                whileHover={{ y: -3 }}
                className={`group bg-white rounded-2xl border overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between ${
                  isHighlighted
                    ? "border-[#D66B43] ring-2 ring-[#D66B43]/30"
                    : "border-[#ECE7DE]"
                }`}
              >
                {/* Dish Photo */}
                <div
                  onClick={() => onOpenDishModal(dish)}
                  className="relative h-48 w-full bg-[#ECE7DE] overflow-hidden cursor-pointer"
                >
                  <SafeImage
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-sm text-[#252522] shadow-xs flex items-center gap-1.5 border border-[#ECE7DE]">
                      <Clock className="w-3 h-3 text-[#D66B43]" />
                      {dish.prepTimeMinutes}m prep
                    </span>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavoriteDish(dish.id);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                        isFav
                          ? "bg-rose-50 text-rose-500"
                          : "bg-white/90 text-[#6E6D66] hover:text-rose-500 hover:bg-white"
                      }`}
                      title={isFav ? "Remove from Favorites" : "Save to Favorites"}
                      aria-label="Toggle Favorite"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFav ? "fill-rose-500 text-rose-500" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-2.5 left-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#252522]/90 backdrop-blur-sm text-white shadow-xs">
                      ⭐ {dish.rating}
                    </span>
                  </div>
                </div>

                {/* Dish Info & Actions */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#D66B43] uppercase tracking-wider">
                        {dish.menuSection || "Main Course"}
                      </span>
                      {dish.isVeg ? (
                        <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center p-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        </span>
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-sm border border-rose-600 flex items-center justify-center p-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => onOpenDishModal(dish)}
                      className="font-bold text-sm text-[#252522] group-hover:text-[#D66B43] transition-colors leading-snug cursor-pointer"
                    >
                      {dish.name}
                    </h3>

                    <p className="text-xs text-[#6E6D66] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-2.5 border-t border-[#ECE7DE] flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-base font-bold text-[#252522]">
                        ₹{dish.price}
                      </span>
                      {dish.originalPrice && (
                        <span className="text-[11px] text-[#6E6D66] line-through">
                          ₹{dish.originalPrice}
                        </span>
                      )}
                    </div>

                    {inCart ? (
                      <div className="flex items-center gap-2 rounded-xl bg-[#FAF8F3] border border-[#D66B43] px-2 py-1 shadow-xs">
                        <button
                          onClick={() => onUpdateQuantity(dish.id, -1)}
                          className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5 cursor-pointer"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#252522] w-4 text-center">
                          {inCart.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(dish.id, 1)}
                          className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5 cursor-pointer"
                          title="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onAddToCart(dish)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#252522] text-white text-xs font-semibold hover:bg-[#D66B43] transition-colors shadow-soft cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </motion.button>
                    )}
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
