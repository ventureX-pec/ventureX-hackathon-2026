"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Heart,
} from "lucide-react";
import { CursorTrail } from "@/components/motion/CursorTrail";
import { FoodPhotographyBackdrop } from "@/components/customer/FoodPhotographyBackdrop";
import { Sidebar } from "@/components/customer/Sidebar";
import { MobileBottomNav } from "@/components/customer/MobileBottomNav";
import { TopHeader } from "@/components/customer/TopHeader";
import { HeroFeaturedSection } from "@/components/customer/HeroFeaturedSection";
import { CategorySection } from "@/components/customer/CategorySection";
import { RestaurantSection } from "@/components/customer/RestaurantSection";
import { ActiveOrderCard } from "@/components/customer/ActiveOrderCard";
import { CartDrawer, CartItem } from "@/components/customer/CartDrawer";
import { CheckoutSuccessModal } from "@/components/customer/CheckoutSuccessModal";
import { DishDetailModal } from "@/components/customer/DishDetailModal";
import {
  CATEGORIES,
  RESTAURANTS,
  MENU_ITEMS,
  MenuItem,
  Restaurant,
} from "@/data/mockCustomerData";
import { AdminOrder } from "@/data/mockAdminData";
import {
  createLiveOrder,
  getStoredActiveOrder,
  saveStoredActiveOrder,
  getStoredCart,
  saveStoredCart,
  getStoredFavorites,
  saveStoredFavorites,
  getStoredDishes,
  subscribeToDataChanges,
} from "@/lib/dataService";

export default function CustomerDashboardPage() {
  // Navigation & Active Tab
  const [activeTab, setActiveTab] = useState<string>("home");

  // Change 1: Resizable & Collapsible Sidebar State (defaults to collapsed as in visual reference)
  const [sidebarWidth, setSidebarWidth] = useState<number>(256);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [restaurantFilter, setRestaurantFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>(["burger-house", "pizza-palace"]);

  // Menu Dishes State (Hydrated from persistent storage)
  const [dishes, setDishes] = useState<MenuItem[]>(MENU_ITEMS);

  // Cart & Order State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inspectingDish, setInspectingDish] = useState<MenuItem | null>(null);

  // Active Placed Order State (Hydrated from persistent storage)
  const [activeOrder, setActiveOrder] = useState<{
    id?: string;
    token: string;
    tokenNumber?: string;
    items: CartItem[];
    total: number;
    orderType: "dine-in" | "takeaway";
    tableOrShelf: string;
    pickupSlot: string;
    status?: string;
  } | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Hydrate persistent customer state & subscribe to live updates
  useEffect(() => {
    // 1. Load active order from storage
    const storedOrder = getStoredActiveOrder();
    if (storedOrder) {
      setActiveOrder(storedOrder);
    }

    // 2. Load cart & favorites
    setCart(getStoredCart());
    const storedFavs = getStoredFavorites();
    if (storedFavs && storedFavs.length > 0) {
      setFavorites(storedFavs);
    }

    // 3. Load dishes
    setDishes(getStoredDishes());

    // 4. Subscribe to cross-tab & Supabase live sync
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.type === "DISHES_UPDATED" && Array.isArray(event.payload)) {
        setDishes(event.payload);
      } else if (event.type === "ORDERS_UPDATED" && Array.isArray(event.payload)) {
        // Check if our active order had its status updated in the kitchen
        const current = getStoredActiveOrder();
        if (current) {
          const match = event.payload.find(
            (o: AdminOrder) =>
              o.id === current.id || o.tokenNumber === current.token
          );
          if (match && match.status !== current.status) {
            const updated = {
              ...current,
              status: match.status,
              prepTimeEstimate: match.prepTimeEstimate,
            };
            setActiveOrder(updated);
            saveStoredActiveOrder(updated);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      saveStoredFavorites(updated);
      return updated;
    });
  };

  // Cart operations
  const handleAddToCart = (dish: MenuItem, quantity = 1, instructions?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.dish.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                instructions: instructions || item.instructions,
              }
            : item
        );
      } else {
        updated = [...prev, { dish, quantity, instructions }];
      }
      saveStoredCart(updated);
      return updated;
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      saveStoredCart(updated);
      return updated;
    });
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.dish.id !== dishId);
      saveStoredCart(updated);
      return updated;
    });
  };

  const totalCartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0),
    [cart]
  );

  // Filtered Restaurants
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((rest) => {
      // Category filter
      if (selectedCategory !== "all" && rest.category !== selectedCategory) {
        return false;
      }
      // Tab filter
      if (activeTab === "favorites" && !favorites.includes(rest.id)) {
        return false;
      }
      // Filter options
      if (restaurantFilter === "dine-in" && !rest.isDineIn) return false;
      if (restaurantFilter === "takeaway" && !rest.isTakeaway) return false;
      if (restaurantFilter === "fastest" && parseInt(rest.prepTime) > 15) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = rest.name.toLowerCase().includes(q);
        const matchesCuisine = rest.cuisine.toLowerCase().includes(q);
        if (!matchesName && !matchesCuisine) return false;
      }
      return true;
    });
  }, [selectedCategory, activeTab, favorites, restaurantFilter, searchQuery]);

  // Filtered Menu Items (Dynamically reflects live dishes from database & storage)
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Respect item availability toggled by admin
      if ((dish as any).isAvailable === false) {
        return false;
      }
      if (selectedCategory !== "all" && dish.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        const matchesRest = dish.restaurantName.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesRest) return false;
      }
      return true;
    });
  }, [dishes, selectedCategory, searchQuery]);

  // Checkout trigger (Saves to Supabase Database, syncs with Admin KDS, & persists locally)
  const handleCheckout = (details: {
    orderType: "dine-in" | "takeaway";
    tableOrShelf: string;
    pickupSlot: string;
    notes: string;
  }) => {
    const randomToken = Math.floor(10 + Math.random() * 89).toString();
    const orderTotal = cartTotalAmount + Math.round(cartTotalAmount * 0.05);
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `#D${Math.floor(1000 + Math.random() * 9000)}`;

    const orderData = {
      id: orderId,
      orderNumber,
      token: randomToken,
      tokenNumber: randomToken,
      items: [...cart],
      total: orderTotal,
      totalAmount: orderTotal,
      customerName: "Alex Morgan",
      customerPhone: "+91 98765 43210",
      status: "new",
      prepTimeEstimate: "~ 12 min",
      timeAgo: "Just now",
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image:
        cart[0]?.dish.image ||
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
      ...details,
    };

    // 1. Immediately persist active order for zero-flicker resilience
    setActiveOrder(orderData);
    saveStoredActiveOrder(orderData);

    // 2. Clear customer cart and persist
    setCart([]);
    saveStoredCart([]);
    setIsCartOpen(false);
    setIsSuccessModalOpen(true);

    // 3. Persist order to Supabase Database (syncs live with Admin Kitchen KDS)
    const adminOrderPayload: AdminOrder = {
      id: orderId,
      orderNumber,
      tokenNumber: randomToken,
      customerName: "Alex Morgan",
      customerPhone: "+91 98765 43210",
      orderType: details.orderType,
      tableOrShelf: details.tableOrShelf,
      items: cart.map((c) => ({
        dishName: c.dish.name,
        quantity: c.quantity,
        price: c.dish.price,
        notes: details.notes || c.instructions,
      })),
      totalAmount: orderTotal,
      status: "new",
      prepTimeEstimate: "~ 12 min",
      timeAgo: "Just now",
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image:
        cart[0]?.dish.image ||
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    };

    createLiveOrder(adminOrderPayload);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#252522] selection:bg-[#D66B43]/20 selection:text-[#D66B43] relative overflow-x-hidden isolate">
      {/* Editorial Food Photography Background Layer (Frames the layout, dynamically tracks sidebar width) */}
      <FoodPhotographyBackdrop isSidebarOpen={isSidebarOpen} sidebarWidth={sidebarWidth} />

      {/* Light subtle cursor trail */}
      <CursorTrail />

      {/* Change 1 & 2: Resizable & Collapsible Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "home") {
            setSelectedCategory("all");
            setRestaurantFilter("all");
          }
        }}
        favoritesCount={favorites.length}
        width={sidebarWidth}
        onWidthChange={setSidebarWidth}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area (relative z-10 ensures all cards & content stay strictly in front of background decorations) */}
      <div
        className="relative z-10 flex flex-col min-h-screen transition-all"
        style={{
          paddingLeft: isSidebarOpen ? `${sidebarWidth}px` : "0px",
        }}
      >
        {/* Top Header Bar with Sidebar Toggle Button */}
        <TopHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cartCount={totalCartCount}
          cartTotal={cartTotalAmount}
          onOpenCart={() => setIsCartOpen(true)}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Dashboard Body */}
        <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 pb-28 lg:pb-16">
          {/* Active Order Card */}
          {activeOrder && (
            <ActiveOrderCard
              tokenNumber={activeOrder.token}
              itemsCount={activeOrder.items.reduce((s, i) => s + i.quantity, 0)}
              pickupSlot={activeOrder.pickupSlot}
              tableOrShelf={activeOrder.tableOrShelf}
              onOpenModal={() => setIsSuccessModalOpen(true)}
            />
          )}

          {/* Change 3 & 6: Hero Banner with Word-by-Word Reveal & 5-Second Auto Slide */}
          <HeroFeaturedSection
            onExploreClick={() => {
              const el = document.getElementById("popular-restaurants");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            onHotDealClick={() => {
              setSelectedCategory("burgers");
              const el = document.getElementById("menu-dishes");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* Change 4: Infinite Left-to-Right Continuous Marquee Categories without 'All' icon */}
          <CategorySection
            selectedCategory={selectedCategory}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            onViewAllClick={() => setSelectedCategory("all")}
          />

          {/* Popular Restaurants Section */}
          <div id="popular-restaurants">
            <RestaurantSection
              restaurants={filteredRestaurants}
              selectedFilter={restaurantFilter}
              onFilterChange={setRestaurantFilter}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectRestaurant={(restId) => {
                const rest = RESTAURANTS.find((r) => r.id === restId);
                if (rest) setSelectedCategory(rest.category);
              }}
              onViewAllClick={() => {
                setSelectedCategory("all");
                setRestaurantFilter("all");
              }}
            />
          </div>

          {/* Featured Dishes / Menu Items Grid */}
          <section id="menu-dishes" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252522]">
                  Featured Dishes
                </h2>
                <p className="text-xs text-[#6E6D66]">
                  Steaming hot plates prepared directly by partner kitchens
                </p>
              </div>

              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs font-semibold text-[#D66B43] hover:underline"
                >
                  Show All Dishes
                </button>
              )}
            </div>

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
                      onClick={() => setInspectingDish(dish)}
                      className="relative h-48 w-full bg-[#ECE7DE] overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-sm text-[#252522] shadow-xs flex items-center gap-1.5 border border-[#ECE7DE]">
                          <Clock className="w-3 h-3 text-[#D66B43]" />
                          {dish.prepTimeMinutes}m prep
                        </span>

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
                            {dish.restaurantName}
                          </span>
                          {dish.isVeg && (
                            <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center p-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            </span>
                          )}
                        </div>

                        <h3
                          onClick={() => setInspectingDish(dish)}
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
                              onClick={() => handleUpdateQuantity(dish.id, -1)}
                              className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#252522] w-4 text-center">
                              {inCart.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(dish.id, 1)}
                              className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAddToCart(dish)}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#252522] text-white text-xs font-semibold hover:bg-[#D66B43] transition-colors shadow-soft"
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
          </section>

          {/* Change 5: Recently Ordered section has been completely removed per user request */}
        </main>
      </div>

      {/* Fixed Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (tab === "orders" && activeOrder) {
            setIsSuccessModalOpen(true);
          }
        }}
        favoritesCount={favorites.length}
        ordersCount={activeOrder ? 1 : 0}
      />

      {/* Floating Island Cart Trigger for Mobile / Quick Access */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-16 lg:bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pointer-events-auto bg-[#252522] text-[#FAF8F3] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 sm:gap-6 border border-white/10"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#D66B43] text-white text-xs font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
              <span className="text-xs font-semibold">
                Plate: ₹{cartTotalAmount}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#D66B43] text-white text-xs font-bold hover:bg-[#BF5832] transition-colors flex items-center gap-1 shadow-soft"
            >
              <span>View Plate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      )}

      {/* Dish Customization Modal */}
      <DishDetailModal
        dish={inspectingDish}
        onClose={() => setInspectingDish(null)}
        onAddToCart={(d, q, notes) => handleAddToCart(d, q, notes)}
        currentCartQty={
          inspectingDish ? cart.find((i) => i.dish.id === inspectingDish.id)?.quantity || 0 : 0
        }
      />

      {/* Cart Drawer */}
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
