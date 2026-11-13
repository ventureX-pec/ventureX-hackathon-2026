"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Clock,
  Plus,
  Minus,
  Check,
  Filter,
  Flame,
  Leaf,
  Store,
  ArrowRight,
  TrendingUp,
  MapPin,
  ShoppingBag,
  Info,
} from "lucide-react";
import { CursorTrail } from "@/components/motion/CursorTrail";
import { CustomerNavbar } from "@/components/customer/CustomerNavbar";
import { CartDrawer, CartItem } from "@/components/customer/CartDrawer";
import { CheckoutSuccessModal } from "@/components/customer/CheckoutSuccessModal";
import { DishDetailModal } from "@/components/customer/DishDetailModal";
import {
  RESTAURANTS,
  MENU_ITEMS,
  MenuItem,
  Restaurant,
} from "@/data/mockCustomerData";

export default function CustomerDashboardPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [vegOnly, setVegOnly] = useState(false);
  const [inspectingDish, setInspectingDish] = useState<MenuItem | null>(null);

  // Active placed order state
  const [activeOrder, setActiveOrder] = useState<{
    token: string;
    items: CartItem[];
    total: number;
    orderType: "dine-in" | "takeaway";
    tableOrShelf: string;
    pickupSlot: string;
  } | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (dish: MenuItem, quantity = 1, instructions?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                instructions: instructions || item.instructions,
              }
            : item
        );
      }
      return [...prev, { dish, quantity, instructions }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const totalCartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0),
    [cart]
  );

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      // Restaurant filter
      if (selectedRestaurant !== "all" && dish.restaurantId !== selectedRestaurant) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "bestsellers") {
          if (!dish.tags.includes("Bestseller")) return false;
        } else if (dish.category !== selectedCategory) {
          return false;
        }
      }
      // Veg only
      if (vegOnly && !dish.isVeg) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesRest = dish.restaurantName.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        if (!matchesName && !matchesRest && !matchesDesc) return false;
      }
      return true;
    });
  }, [selectedRestaurant, selectedCategory, vegOnly, searchQuery]);

  const activeKitchenData = useMemo(() => {
    if (selectedRestaurant === "all") return null;
    return RESTAURANTS.find((r) => r.id === selectedRestaurant);
  }, [selectedRestaurant]);

  // Checkout trigger
  const handleCheckout = (details: {
    orderType: "dine-in" | "takeaway";
    tableOrShelf: string;
    pickupSlot: string;
    notes: string;
  }) => {
    const randomToken = Math.floor(10 + Math.random() * 89).toString();
    const orderData = {
      token: randomToken,
      items: [...cart],
      total: cartTotalAmount + Math.round(cartTotalAmount * 0.05),
      ...details,
    };
    setActiveOrder(orderData);
    setCart([]);
    setIsCartOpen(false);
    setIsSuccessModalOpen(true);
  };

  const categories = [
    { id: "all", label: "All Plates" },
    { id: "bestsellers", label: "🔥 Campus Bestsellers" },
    { id: "bowls", label: "Rice & Grain Bowls" },
    { id: "pizza-wraps", label: "Sourdough & Wraps" },
    { id: "quick-bites", label: "Quick Bites (<8m)" },
    { id: "beverages", label: "Cold Brew & Kulhad Chai" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#252522] selection:bg-[#D66B43]/20 selection:text-[#D66B43]">
      {/* Subtle, feather-light cursor trail */}
      <CursorTrail />

      {/* Top Customer Navigation */}
      <CustomerNavbar
        totalCartItems={totalCartCount}
        cartTotalAmount={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeOrderToken={activeOrder?.token}
        onOpenActiveOrder={() => setIsSuccessModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Active Order Live Banner if present */}
        {activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 rounded-2xl bg-[#5F7A65]/10 border border-[#5F7A65]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F7A65] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5F7A65]"></span>
              </span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#252522]">
                  Live Token #{activeOrder.token} • Chef is Preparing
                </p>
                <p className="text-xs text-[#6E6D66] mt-0.5">
                  {activeOrder.items.length} items • {activeOrder.pickupSlot}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSuccessModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#5F7A65] text-[#FAF8F3] text-xs font-bold hover:bg-[#4E6653] transition-colors shadow-xs"
            >
              View QR Pickup Pass →
            </button>
          </motion.div>
        )}

        {/* Editorial Hero Header */}
        <section className="border-b border-[#ECE7DE] pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D66B43]/10 border border-[#D66B43]/20 text-[#D66B43] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE CAMPUS DINING • ORDER AHEAD</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#252522] leading-[1.12]">
              Savor the break. <br />
              <span className="text-[#D66B43] italic font-normal">
                Without the counter wait.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#6E6D66] max-w-xl font-normal leading-relaxed">
              Order directly from partner campus kitchens. Customize your plate, skip the 15-minute ordering queue, and collect steaming hot food at the express shelf.
            </p>

            {/* Quick Live Context Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#6E6D66] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>4 Kitchen Windows Open</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D66B43]" />
                <span>Avg 6-8 Min Preparation</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#5F7A65]" />
                <span>Zero Aggregator Markup</span>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Kitchens Spotlight */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D66B43]">
                PARTNER OUTLETS
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#252522] mt-0.5">
                Curated Kitchen Windows
              </h2>
            </div>

            {selectedRestaurant !== "all" && (
              <button
                onClick={() => setSelectedRestaurant("all")}
                className="text-xs font-semibold text-[#D66B43] hover:underline"
              >
                View All Kitchens
              </button>
            )}
          </div>

          {/* Kitchen Selector Horizontal Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* All Outlets Pill */}
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() => setSelectedRestaurant("all")}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedRestaurant === "all"
                  ? "bg-white border-[#D66B43] shadow-card ring-2 ring-[#D66B43]/20"
                  : "bg-white border-[#ECE7DE] hover:border-[#D66B43]/40 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#252522] text-[#FAF8F3] flex items-center justify-center">
                  <Store className="w-4 h-4 text-[#D66B43]" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF8F3] border border-[#ECE7DE] text-[#6E6D66]">
                  {MENU_ITEMS.length} Dishes
                </span>
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#252522]">All Kitchens</h3>
                <p className="text-[11px] text-[#6E6D66] mt-0.5">
                  Full campus menu
                </p>
              </div>
            </motion.div>

            {/* Individual Kitchens */}
            {RESTAURANTS.map((rest) => {
              const isSelected = selectedRestaurant === rest.id;
              return (
                <motion.div
                  key={rest.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedRestaurant(rest.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-[#D66B43] shadow-card ring-2 ring-[#D66B43]/20"
                      : "bg-white border-[#ECE7DE] hover:border-[#D66B43]/40 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5F7A65]/10 text-[#5F7A65]">
                      {rest.prepTime}
                    </span>
                    <span className="text-[10px] font-bold text-[#D66B43]">
                      ⭐ {rest.rating}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs text-[#252522] truncate">
                      {rest.name}
                    </h3>
                    <p className="text-[11px] text-[#6E6D66] truncate mt-0.5">
                      {rest.cuisine}
                    </p>
                    <div className="mt-2 text-[10px] text-[#6E6D66] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{rest.currentQueue} orders ahead</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Kitchen Context Note */}
          {activeKitchenData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 rounded-2xl bg-white border border-[#ECE7DE] shadow-xs flex items-center justify-between gap-4"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-[#252522]">
                    {activeKitchenData.name}
                  </h4>
                  <span className="text-[11px] text-[#6E6D66]">
                    • {activeKitchenData.location}
                  </span>
                </div>
                <p className="text-xs text-[#6E6D66]">
                  {activeKitchenData.tagline}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="px-3 py-1 rounded-xl bg-[#FAF8F3] border border-[#ECE7DE] text-xs font-bold text-[#D66B43]">
                  Ready in {activeKitchenData.prepTime}
                </span>
              </div>
            </motion.div>
          )}
        </section>

        {/* Filter Navigation Bar */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-y border-[#ECE7DE] py-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#252522] text-[#FAF8F3] shadow-xs"
                        : "bg-white border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522] hover:border-[#D66B43]/30"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Pure Veg Toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                vegOnly
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs"
                  : "bg-white border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center p-0.5">
                <div
                  className={`w-2 h-2 rounded-full transition-transform ${
                    vegOnly ? "bg-emerald-600 scale-100" : "bg-transparent scale-0"
                  }`}
                />
              </div>
              <span>Pure Veg Only 🌱</span>
            </button>
          </div>

          {/* Counts & Clear Trigger */}
          <div className="flex items-center justify-between text-xs text-[#6E6D66]">
            <span>
              Showing <strong className="text-[#252522]">{filteredDishes.length}</strong> freshly prepared dishes
            </span>
            {(selectedCategory !== "all" || selectedRestaurant !== "all" || vegOnly || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedRestaurant("all");
                  setVegOnly(false);
                  setSearchQuery("");
                }}
                className="text-[#D66B43] font-semibold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </section>

        {/* Editorial Dishes Grid */}
        <section>
          {filteredDishes.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-[#ECE7DE] max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F3] flex items-center justify-center text-[#6E6D66] mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#252522]">
                No dishes match your selection
              </h3>
              <p className="text-xs text-[#6E6D66]">
                Try selecting a different kitchen or resetting the filters to explore other culinary options.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedRestaurant("all");
                  setVegOnly(false);
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-[#252522] text-[#FAF8F3] text-xs font-semibold hover:bg-[#D66B43] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish, idx) => {
                const inCartItem = cart.find((i) => i.dish.id === dish.id);
                const isHeroItem = idx === 0 && selectedCategory === "all" && selectedRestaurant === "all";

                return (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ y: -4 }}
                    className={`group bg-white rounded-3xl border border-[#ECE7DE] overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between ${
                      isHeroItem ? "md:col-span-2 lg:col-span-2 md:flex-row" : ""
                    }`}
                  >
                    {/* Dish Photography */}
                    <div
                      onClick={() => setInspectingDish(dish)}
                      className={`relative overflow-hidden bg-[#ECE7DE] cursor-pointer ${
                        isHeroItem
                          ? "md:w-1/2 h-64 md:h-full min-h-[260px]"
                          : "h-56 w-full"
                      }`}
                    >
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FAF8F3]/95 backdrop-blur-sm text-[#252522] shadow-xs flex items-center gap-1.5 border border-[#ECE7DE]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          {dish.prepTimeMinutes}m prep
                        </span>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#252522]/90 backdrop-blur-sm text-[#FAF8F3] shadow-xs">
                          ⭐ {dish.rating}
                        </span>
                      </div>

                      {/* Tags */}
                      {dish.tags.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex gap-1.5">
                          {dish.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-[#252522]/80 backdrop-blur-md text-[#FAF8F3]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dish Information */}
                    <div
                      className={`p-5 flex-1 flex flex-col justify-between space-y-4 ${
                        isHeroItem ? "md:p-7 md:w-1/2" : ""
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#D66B43] uppercase tracking-wider">
                            {dish.restaurantName}
                          </span>
                          <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center p-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          </span>
                        </div>

                        <h3
                          onClick={() => setInspectingDish(dish)}
                          className={`font-serif font-bold text-[#252522] group-hover:text-[#D66B43] transition-colors leading-snug cursor-pointer ${
                            isHeroItem ? "text-xl sm:text-2xl" : "text-base"
                          }`}
                        >
                          {dish.name}
                        </h3>

                        <p className="text-xs text-[#6E6D66] line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      {/* Price & Add Action */}
                      <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-lg sm:text-xl font-bold text-[#252522]">
                            ₹{dish.price}
                          </span>
                          {dish.originalPrice && (
                            <span className="text-xs text-[#6E6D66] line-through">
                              ₹{dish.originalPrice}
                            </span>
                          )}
                        </div>

                        {inCartItem ? (
                          <div className="flex items-center gap-2 rounded-xl bg-[#FAF8F3] border border-[#D66B43] px-2.5 py-1.5 shadow-xs">
                            <button
                              onClick={() => handleUpdateQuantity(dish.id, -1)}
                              className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-[#252522] w-5 text-center">
                              {inCartItem.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(dish.id, 1)}
                              className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleAddToCart(dish)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#252522] text-[#FAF8F3] text-xs font-semibold hover:bg-[#D66B43] transition-colors shadow-soft"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Plate</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Floating Island Plate Trigger (Modern Floating Pill) */}
        {totalCartCount > 0 && (
          <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="pointer-events-auto bg-[#252522] text-[#FAF8F3] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 sm:gap-6 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#D66B43] flex items-center justify-center font-bold text-xs text-white">
                  {totalCartCount}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">Plate Ready</span>
                  <span className="text-[11px] text-[#FAF8F3]/70">
                    ₹{cartTotalAmount} • Zero wait pickup
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#D66B43] text-white text-xs font-bold hover:bg-[#BF5832] transition-colors flex items-center gap-1.5 shadow-soft"
              >
                <span>Review & Pay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        )}
      </main>

      {/* Dish Inspection Modal */}
      <DishDetailModal
        dish={inspectingDish}
        onClose={() => setInspectingDish(null)}
        onAddToCart={(d, q, notes) => handleAddToCart(d, q, notes)}
        currentCartQty={
          inspectingDish ? cart.find((i) => i.dish.id === inspectingDish.id)?.quantity || 0 : 0
        }
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Success / Live Token Modal */}
      {activeOrder && (
        <CheckoutSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          tokenNumber={activeOrder.token}
          items={activeOrder.items}
          totalAmount={activeOrder.total}
          orderType={activeOrder.orderType}
          tableOrShelf={activeOrder.tableOrShelf}
          pickupSlot={activeOrder.pickupSlot}
        />
      )}
    </div>
  );
}
