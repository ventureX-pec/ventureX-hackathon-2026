"use client";

import React, { useState } from "react";
import Image from "next/image";
import SafeImage from "./SafeImage";
import { motion } from "motion/react";
import {
  Heart,
  Store,
  Clock,
  Star,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ExternalLink,
  UtensilsCrossed,
  Filter,
} from "lucide-react";
import { MenuItem } from "@/data/mockCustomerData";
import { CartItem } from "@/components/customer/CartDrawer";

interface CustomerFavoritesViewProps {
  favoriteDishes: MenuItem[];
  cart: CartItem[];
  onRemoveFavorite: (dishId: string) => void;
  onAddToCart: (dish: MenuItem, quantity?: number, instructions?: string) => void;
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onNavigateToRestaurant: (restaurantId: string, dishId: string) => void;
  onOpenDishModal: (dish: MenuItem) => void;
  onExploreClick: () => void;
}

export const CustomerFavoritesView: React.FC<CustomerFavoritesViewProps> = ({
  favoriteDishes,
  cart,
  onRemoveFavorite,
  onAddToCart,
  onUpdateQuantity,
  onNavigateToRestaurant,
  onOpenDishModal,
  onExploreClick,
}) => {
  const [filterRestaurant, setFilterRestaurant] = useState<string>("all");

  // Get list of unique restaurants present in favorites
  const restaurantOptions = React.useMemo(() => {
    const map = new Map<string, string>();
    favoriteDishes.forEach((d) => map.set(d.restaurantId, d.restaurantName));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [favoriteDishes]);

  const filteredDishes = React.useMemo(() => {
    if (filterRestaurant === "all") return favoriteDishes;
    return favoriteDishes.filter((d) => d.restaurantId === filterRestaurant);
  }, [favoriteDishes, filterRestaurant]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#ECE7DE]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#252522] tracking-tight">
              Favorite Dishes
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D66B43]/10 text-[#D66B43] border border-[#D66B43]/20 shadow-xs">
              {favoriteDishes.length} Saved Plates
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6E6D66] font-medium leading-relaxed">
            Your personal collection of bookmarked dishes across campus partner kitchens
          </p>
        </div>

        {/* Filter by Restaurant if multiple */}
        {restaurantOptions.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setFilterRestaurant("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterRestaurant === "all"
                  ? "bg-[#252522] text-white shadow-xs"
                  : "bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
              }`}
            >
              All Kitchens
            </button>
            {restaurantOptions.map((rest) => (
              <button
                key={rest.id}
                onClick={() => setFilterRestaurant(rest.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  filterRestaurant === rest.id
                    ? "bg-[#252522] text-white shadow-xs"
                    : "bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
                }`}
              >
                {rest.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dishes Grid or Empty State */}
      {favoriteDishes.length === 0 ? (
        <div className="py-16 sm:py-20 px-4 text-center max-w-md mx-auto space-y-4 bg-white rounded-3xl border border-[#ECE7DE] shadow-soft">
          <div className="w-16 h-16 rounded-3xl bg-[#FAF8F3] border border-[#ECE7DE] text-[#D66B43] flex items-center justify-center mx-auto shadow-xs">
            <Heart className="w-8 h-8 fill-[#D66B43]/20" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#252522]">
              No Favorite Dishes Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6D66] max-w-sm mx-auto leading-relaxed">
              Browse any restaurant menu or featured dishes and tap the heart icon on your favorite plates to save them here for one-click re-ordering!
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D66B43] hover:bg-[#BF5832] text-white text-xs font-bold transition-all shadow-soft hover:shadow-card cursor-pointer"
            >
              <span>Explore Restaurant Menus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDishes.map((dish) => {
            const inCart = cart.find((i) => i.dish.id === dish.id);

            return (
              <motion.div
                key={dish.id}
                whileHover={{ y: -3 }}
                className="group bg-white rounded-2xl border border-[#ECE7DE] overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
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

                  {/* Top Badges: Prep Time & Remove Favorite */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-sm text-[#252522] shadow-xs flex items-center gap-1.5 border border-[#ECE7DE]">
                      <Clock className="w-3 h-3 text-[#D66B43]" />
                      {dish.prepTimeMinutes}m prep
                    </span>

                    {/* Remove from Favorites Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(dish.id);
                      }}
                      className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-sm text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      title="Remove from favorites"
                      aria-label="Remove favorite"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
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
                    {/* Restaurant Name Badge (Clicking opens restaurant menu and locates dish) */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToRestaurant(dish.restaurantId, dish.id);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D66B43] uppercase tracking-wider hover:underline cursor-pointer group/link text-left"
                        title={`View ${dish.restaurantName} full menu`}
                      >
                        <Store className="w-3 h-3 text-[#D66B43] flex-shrink-0" />
                        <span className="truncate">{dish.restaurantName}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                      </button>

                      {dish.isVeg ? (
                        <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center p-0.5 flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        </span>
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-sm border border-rose-600 flex items-center justify-center p-0.5 flex-shrink-0">
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

                  {/* Price & Add to Cart Action */}
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
