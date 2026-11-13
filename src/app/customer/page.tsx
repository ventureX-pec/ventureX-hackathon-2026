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
} from "lucide-react";
import { CursorTrail } from "@/components/motion/CursorTrail";
import { CustomerNavbar } from "@/components/customer/CustomerNavbar";
import { CartDrawer, CartItem } from "@/components/customer/CartDrawer";
import { CheckoutSuccessModal } from "@/components/customer/CheckoutSuccessModal";
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
  const handleAddToCart = (dish: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
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
    { id: "all", label: "All Items" },
    { id: "bestsellers", label: "🔥 Campus Bestsellers" },
    { id: "bowls", label: "Rice & Protein Bowls" },
    { id: "pizza-wraps", label: "Sourdough & Wraps" },
    { id: "quick-bites", label: "Quick Bites (<8m)" },
    { id: "beverages", label: "Cold Brew & Chai" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#252522] selection:bg-[#D66B43]/20 selection:text-[#D66B43]">
      {/* Light subtle cursor trail */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Active Order Live Banner if present */}
        {activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-[#5F7A65]/10 border border-[#5F7A65]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F7A65] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5F7A65]"></span>
              </span>
              <div>
                <p className="text-xs font-bold text-[#252522]">
                  Live Order #{activeOrder.token} in Kitchen Preparation
                </p>
                <p className="text-[11px] text-[#6E6D66]">
                  {activeOrder.items.length} items • {activeOrder.pickupSlot}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSuccessModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#5F7A65] text-[#FAF8F3] text-xs font-bold hover:bg-[#4E6653] transition-colors"
            >
              View QR Pickup Pass
            </button>
          </motion.div>
        )}

        {/* Hero Section Banner */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#252522] via-[#2F2F2B] to-[#1C1C19] text-[#FAF8F3] p-8 md:p-12 overflow-hidden shadow-card">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#D66B43_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D66B43]/20 border border-[#D66B43]/40 text-[#D66B43] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Kitchen Live Sync</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAF8F3] leading-tight">
              Order Ahead. <br />
              <span className="text-[#D66B43]">Pick Up Without The Wait.</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#FAF8F3]/75 max-w-lg leading-relaxed pt-1">
              Choose your favorite campus kitchen, customize your meal, and collect steaming hot food directly from the express counter shelf.
            </p>
          </div>
        </section>

        {/* Partner Kitchens Carousel / Filter */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#252522]">
                Campus Kitchens & Cafés
              </h2>
              <p className="text-xs text-[#6E6D66]">
                Real-time queue depth & preparation speeds
              </p>
            </div>

            {selectedRestaurant !== "all" && (
              <button
                onClick={() => setSelectedRestaurant("all")}
                className="text-xs font-semibold text-[#D66B43] hover:underline"
              >
                Show All Kitchens
              </button>
            )}
          </div>

          {/* Kitchen Cards Horizontal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setSelectedRestaurant("all")}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedRestaurant === "all"
                  ? "bg-[#FFFFFF] border-[#D66B43] shadow-card ring-2 ring-[#D66B43]/20"
                  : "bg-[#FFFFFF] border-[#ECE7DE] hover:border-[#D66B43]/40 shadow-soft"
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
                <h3 className="font-bold text-xs text-[#252522]">All Outlets</h3>
                <p className="text-[11px] text-[#6E6D66] mt-0.5">
                  Browse entire campus menu
                </p>
              </div>
            </motion.div>

            {RESTAURANTS.map((rest) => {
              const isSelected = selectedRestaurant === rest.id;
              return (
                <motion.div
                  key={rest.id}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedRestaurant(rest.id)}
                  className={`relative p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? "bg-[#FFFFFF] border-[#D66B43] shadow-card ring-2 ring-[#D66B43]/20"
                      : "bg-[#FFFFFF] border-[#ECE7DE] hover:border-[#D66B43]/40 shadow-soft"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5F7A65]/10 text-[#5F7A65]">
                      {rest.prepTime}
                    </span>
                    <span className="text-[10px] font-bold text-[#D66B43] flex items-center gap-1">
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
                    <div className="mt-2 text-[10px] text-[#6E6D66] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {rest.currentQueue} orders in queue
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Filter Pills & Veg Toggle */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-y border-[#ECE7DE] py-3.5">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-[#252522] text-[#FAF8F3] shadow-soft"
                        : "bg-[#FFFFFF] border border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522] hover:border-[#D66B43]/30"
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
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                vegOnly
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm"
                  : "bg-[#FFFFFF] border-[#ECE7DE] text-[#6E6D66] hover:text-[#252522]"
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

          {/* Dishes Count & Active Filter Indicator */}
          <div className="flex items-center justify-between text-xs text-[#6E6D66]">
            <span>
              Showing <strong className="text-[#252522]">{filteredDishes.length}</strong> delicious options
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

        {/* Dishes Grid */}
        <section>
          {filteredDishes.length === 0 ? (
            <div className="p-16 text-center bg-[#FFFFFF] rounded-3xl border border-[#ECE7DE] max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EFE8] flex items-center justify-center text-[#6E6D66] mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#252522]">
                No matching dishes found
              </h3>
              <p className="text-xs text-[#6E6D66]">
                Try adjusting your search or switching categories to explore other delicious dishes.
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
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish, idx) => {
                const inCartItem = cart.find((i) => i.dish.id === dish.id);
                return (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group bg-[#FFFFFF] rounded-3xl border border-[#ECE7DE] overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    {/* Dish Photography */}
                    <div className="relative h-52 w-full overflow-hidden bg-[#ECE7DE]">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FAF8F3]/95 backdrop-blur-sm text-[#252522] shadow-sm flex items-center gap-1.5 border border-[#ECE7DE]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          {dish.prepTimeMinutes}m prep
                        </span>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#252522]/90 backdrop-blur-sm text-[#FAF8F3] shadow-sm">
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
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#D66B43] uppercase tracking-wider">
                            {dish.restaurantName}
                          </span>
                          <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center p-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-base text-[#252522] group-hover:text-[#D66B43] transition-colors leading-snug">
                          {dish.name}
                        </h3>

                        <p className="text-xs text-[#6E6D66] line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      {/* Price & Add Action */}
                      <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-lg font-bold text-[#252522]">
                            ₹{dish.price}
                          </span>
                          {dish.originalPrice && (
                            <span className="text-xs text-[#6E6D66] line-through">
                              ₹{dish.originalPrice}
                            </span>
                          )}
                        </div>

                        {inCartItem ? (
                          <div className="flex items-center gap-2 rounded-xl bg-[#FAF8F3] border border-[#D66B43] px-2.5 py-1.5 shadow-sm">
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
        </section>

        {/* Floating Cart Trigger on Mobile */}
        {totalCartCount > 0 && (
          <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCartOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-[#D66B43] text-[#FAF8F3] font-bold text-sm flex items-center justify-between shadow-2xl"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FAF8F3] text-[#D66B43] text-xs font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
                <span>View Plate</span>
              </div>
              <div className="flex items-center gap-2">
                <span>₹{cartTotalAmount}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        )}
      </main>

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
