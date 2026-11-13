"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
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
  ClipboardList,
  LayoutGrid,
  UtensilsCrossed,
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
  CustomerOrderDetailsModal,
  CustomerOrderRecord,
} from "@/components/customer/CustomerOrderDetailsModal";
import { CustomerOrdersView } from "@/components/customer/CustomerOrdersView";
import {
  CATEGORIES,
  RESTAURANTS,
  MENU_ITEMS,
  MenuItem,
  Restaurant,
} from "@/data/mockCustomerData";

export default function CustomerDashboardPage() {
  // Navigation & Active Tab ("home", "categories", "restaurants", "orders", "favorites")
  const [activeTab, setActiveTab] = useState<string>("home");

  // Resizable & Collapsible Sidebar State
  const [sidebarWidth, setSidebarWidth] = useState<number>(256);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [restaurantFilter, setRestaurantFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>(["burger-house", "pizza-palace"]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inspectingDish, setInspectingDish] = useState<MenuItem | null>(null);

  // Logged-in Customer & Orders State
  const [loggedInCustomer, setLoggedInCustomer] = useState<{
    name: string;
    email: string;
  }>({
    name: "Alex Morgan",
    email: "alex.morgan@serveza.com",
  });

  const [customerOrders, setCustomerOrders] = useState<CustomerOrderRecord[]>([]);
  const [selectedOrderForModal, setSelectedOrderForModal] =
    useState<CustomerOrderRecord | null>(null);

  // Active Placed Order State (for top live-token banner)
  const [activeOrder, setActiveOrder] = useState<{
    token: string;
    items: CartItem[];
    total: number;
    orderType: "dine-in" | "takeaway";
    tableOrShelf: string;
    pickupSlot: string;
  } | null>(null);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Scroll spy control refs
  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load customer profile and real placed orders on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("serveza_customer_user");
      let currentUser = {
        name: "Alex Morgan",
        email: "alex.morgan@serveza.com",
      };
      if (savedUser) {
        try {
          currentUser = JSON.parse(savedUser);
          setLoggedInCustomer(currentUser);
        } catch (e) {}
      }

      // Check customer-specific storage
      const storageKey = `serveza_orders_${currentUser.email}`;
      const savedOrders =
        localStorage.getItem(storageKey) || localStorage.getItem("serveza_customer_orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomerOrders(parsed);

          // Find any active order to show in the live card
          const latestActive = parsed.find((o: CustomerOrderRecord) =>
            ["pending", "confirmed", "preparing", "out_for_delivery"].includes(o.status)
          );
          if (latestActive) {
            setActiveOrder({
              token: latestActive.tokenNumber,
              items: latestActive.items.map((i: any) => ({
                dish:
                  MENU_ITEMS.find((m) => m.name === i.dishName) || {
                    id: "custom",
                    name: i.dishName,
                    restaurantId: "custom",
                    restaurantName: latestActive.restaurantName,
                    category: "all",
                    description: "",
                    price: i.price,
                    image: i.image || "",
                    isVeg: true,
                    prepTimeMinutes: 15,
                    rating: 4.8,
                    tags: [],
                  },
                quantity: i.quantity,
                instructions: i.instructions,
              })),
              total: latestActive.totalAmount,
              orderType: latestActive.orderType,
              tableOrShelf: latestActive.tableOrShelf,
              pickupSlot: latestActive.pickupSlot,
            });
          }
        }
      }
    } catch (e) {
      console.warn("Could not load customer orders", e);
    }
  }, []);

  // Smooth scroll helper with sticky header offset
  const scrollToSection = (sectionId: string) => {
    isManualScrolling.current = true;

    // If currently on orders or favorites view, switch back to home view first
    if (activeTab === "orders" || activeTab === "favorites") {
      const targetTab =
        sectionId === "categories-section"
          ? "categories"
          : sectionId === "popular-restaurants"
          ? "restaurants"
          : "home";
      setActiveTab(targetTab);

      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -85;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      }, 60);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 900);
      return;
    }

    // Normal in-page smooth scroll
    const el = document.getElementById(sectionId);
    if (el) {
      const targetTab =
        sectionId === "categories-section"
          ? "categories"
          : sectionId === "popular-restaurants"
          ? "restaurants"
          : "home";
      setActiveTab(targetTab);

      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 900);
    }
  };

  // Scroll Spy for Home, Categories, and Restaurants
  useEffect(() => {
    if (activeTab === "orders" || activeTab === "favorites") return;

    const handleScroll = () => {
      if (isManualScrolling.current) return;
      if (activeTab === "orders" || activeTab === "favorites") return;

      const scrollPosition = window.scrollY + 130; // offset below sticky header

      const restEl = document.getElementById("popular-restaurants");
      const catEl = document.getElementById("categories-section");
      const homeEl = document.getElementById("home-section");

      if (restEl && scrollPosition >= restEl.offsetTop) {
        setActiveTab("restaurants");
      } else if (catEl && scrollPosition >= catEl.offsetTop) {
        setActiveTab("categories");
      } else if (homeEl) {
        setActiveTab("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  // Sidebar Tab Navigation Handler
  const handleTabChange = (tab: string) => {
    if (tab === "home") {
      if (activeTab === "orders" || activeTab === "favorites") {
        setActiveTab("home");
      }
      setSelectedCategory("all");
      setRestaurantFilter("all");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "categories") {
      scrollToSection("categories-section");
    } else if (tab === "restaurants") {
      scrollToSection("popular-restaurants");
    } else if (tab === "orders") {
      setActiveTab("orders");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "favorites") {
      setActiveTab("favorites");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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

  // Filtered Restaurants
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((rest) => {
      if (selectedCategory !== "all" && rest.category !== selectedCategory) {
        return false;
      }
      if (activeTab === "favorites" && !favorites.includes(rest.id)) {
        return false;
      }
      if (restaurantFilter === "dine-in" && !rest.isDineIn) return false;
      if (restaurantFilter === "takeaway" && !rest.isTakeaway) return false;
      if (restaurantFilter === "fastest" && parseInt(rest.prepTime) > 15) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = rest.name.toLowerCase().includes(q);
        const matchesCuisine = rest.cuisine.toLowerCase().includes(q);
        if (!matchesName && !matchesCuisine) return false;
      }
      return true;
    });
  }, [selectedCategory, activeTab, favorites, restaurantFilter, searchQuery]);

  // Filtered Menu Items for Featured Dishes
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
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
  }, [selectedCategory, searchQuery]);

  // Checkout trigger: places real order, saves to localStorage, updates My Orders
  const handleCheckout = (details: {
    orderType: "dine-in" | "takeaway";
    tableOrShelf: string;
    pickupSlot: string;
    notes: string;
  }) => {
    const randomToken = Math.floor(10 + Math.random() * 89).toString();
    const orderId = `SF-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const primaryRestaurant = cart[0]?.dish.restaurantName || "Campus Kitchen";

    const newOrder: CustomerOrderRecord = {
      id: orderId,
      tokenNumber: randomToken,
      customerName: loggedInCustomer.name,
      customerEmail: loggedInCustomer.email,
      restaurantName: primaryRestaurant,
      items: cart.map((i) => ({
        dishName: i.dish.name,
        quantity: i.quantity,
        price: i.dish.price,
        image: i.dish.image,
        instructions: i.instructions,
      })),
      totalAmount: cartTotalAmount + Math.round(cartTotalAmount * 0.05),
      status: "preparing",
      orderType: details.orderType,
      tableOrShelf: details.tableOrShelf,
      pickupSlot: details.pickupSlot,
      createdAt: now.toISOString(),
      formattedDate: formattedDate,
      notes: details.notes,
    };

    // Update state and persistent storage
    const updatedOrders = [newOrder, ...customerOrders];
    setCustomerOrders(updatedOrders);

    try {
      localStorage.setItem(`serveza_orders_${loggedInCustomer.email}`, JSON.stringify(updatedOrders));
      localStorage.setItem("serveza_customer_orders", JSON.stringify(updatedOrders));

      // Sync to admin backend orders (dineflow_orders) so the kitchen sees it
      const existingAdmin = localStorage.getItem("dineflow_orders");
      const adminOrders = existingAdmin ? JSON.parse(existingAdmin) : [];
      adminOrders.unshift({
        id: orderId,
        tokenNumber: parseInt(randomToken),
        orderType: details.orderType,
        customerName: loggedInCustomer.name,
        customerPhone: "9876543210",
        items: cart.map((i) => ({
          id: i.dish.id,
          menuItemId: i.dish.id,
          name: i.dish.name,
          price: i.dish.price,
          quantity: i.quantity,
          selectedCustomizations: [],
          specialInstructions: i.instructions,
          image: i.dish.image,
        })),
        subtotal: cartTotalAmount,
        tax: Math.round(cartTotalAmount * 0.05),
        totalAmount: cartTotalAmount + Math.round(cartTotalAmount * 0.05),
        status: "preparing",
        paymentStatus: "paid",
        paymentMethod: "upi",
        pickupTime: details.pickupSlot,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        notes: details.notes,
      });
      localStorage.setItem("dineflow_orders", JSON.stringify(adminOrders));
    } catch (e) {
      console.warn("Could not save order", e);
    }

    setActiveOrder({
      token: randomToken,
      items: [...cart],
      total: cartTotalAmount + Math.round(cartTotalAmount * 0.05),
      ...details,
    });
    setCart([]);
    setIsCartOpen(false);
    setIsSuccessModalOpen(true);
  };

  // Reorder functionality
  const handleReorderOrder = (order: CustomerOrderRecord) => {
    order.items.forEach((item) => {
      const match = MENU_ITEMS.find((m) => m.name === item.dishName);
      if (match) {
        handleAddToCart(match, item.quantity, item.instructions);
      }
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#252522] selection:bg-[#D66B43]/20 selection:text-[#D66B43] relative overflow-x-hidden isolate">
      {/* Editorial Food Photography Background Layer */}
      <FoodPhotographyBackdrop isSidebarOpen={isSidebarOpen} sidebarWidth={sidebarWidth} />

      {/* Light subtle cursor trail */}
      <CursorTrail />

      {/* Resizable & Collapsible Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
        ordersCount={customerOrders.length}
        width={sidebarWidth}
        onWidthChange={setSidebarWidth}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div
        className="relative z-10 flex flex-col min-h-screen transition-all"
        style={{
          paddingLeft: isSidebarOpen ? `${sidebarWidth}px` : "0px",
        }}
      >
        {/* Top Header Bar */}
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
          {/* VIEW 1: My Orders View */}
          {activeTab === "orders" ? (
            <CustomerOrdersView
              orders={customerOrders}
              onOpenDetails={(ord) => setSelectedOrderForModal(ord)}
              onExploreClick={() => {
                setActiveTab("restaurants");
                scrollToSection("popular-restaurants");
              }}
              onReorder={handleReorderOrder}
            />
          ) : activeTab === "favorites" ? (
            /* VIEW 2: Favorites View */
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE7DE]">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252522]">
                      Favorite Places
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D66B43]/10 text-[#D66B43]">
                      {favorites.length} Saved
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6E6D66] mt-1">
                    Your bookmarked campus kitchens and favorite coffee counters
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-[#D66B43] hover:underline cursor-pointer"
                >
                  Back to All Kitchens
                </button>
              </div>

              {filteredRestaurants.length === 0 ? (
                <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-white rounded-3xl border border-[#ECE7DE] p-6 shadow-soft">
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border border-[#ECE7DE] text-[#D66B43] flex items-center justify-center mx-auto shadow-xs">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#252522]">
                    No Favorites Saved Yet
                  </h3>
                  <p className="text-xs text-[#6E6D66] leading-relaxed">
                    Click the heart icon on any restaurant or cafe to bookmark them here for fast zero-wait ordering.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab("restaurants");
                      scrollToSection("popular-restaurants");
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#D66B43] hover:bg-[#BF5832] text-white text-xs font-bold shadow-soft transition-colors cursor-pointer"
                  >
                    Discover Restaurants
                  </button>
                </div>
              ) : (
                <RestaurantSection
                  restaurants={filteredRestaurants}
                  selectedFilter={restaurantFilter}
                  onFilterChange={setRestaurantFilter}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectRestaurant={(restId) => {
                    const rest = RESTAURANTS.find((r) => r.id === restId);
                    if (rest) {
                      setSelectedCategory(rest.category);
                      setActiveTab("home");
                      scrollToSection("menu-dishes");
                    }
                  }}
                  onViewAllClick={() => {
                    setSelectedCategory("all");
                    setRestaurantFilter("all");
                  }}
                />
              )}
            </div>
          ) : (
            /* VIEW 3: Main Dashboard (Home, Categories, Restaurants, Featured Dishes) */
            <>
              {/* Active Live Order Banner (shown only when customer has an active order) */}
              {activeOrder && (
                <ActiveOrderCard
                  tokenNumber={activeOrder.token}
                  itemsCount={activeOrder.items.reduce((s, i) => s + i.quantity, 0)}
                  pickupSlot={activeOrder.pickupSlot}
                  tableOrShelf={activeOrder.tableOrShelf}
                  onOpenModal={() => setIsSuccessModalOpen(true)}
                />
              )}

              {/* 1. Home / Hero Banner Section */}
              <div id="home-section" className="scroll-mt-24">
                <HeroFeaturedSection
                  onExploreClick={() => scrollToSection("popular-restaurants")}
                  onHotDealClick={() => {
                    setSelectedCategory("burgers");
                    scrollToSection("menu-dishes");
                  }}
                />
              </div>

              {/* 2. Categories Marquee Section */}
              <CategorySection
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => {
                  setSelectedCategory(catId);
                  scrollToSection("menu-dishes");
                }}
                onViewAllClick={() => setSelectedCategory("all")}
              />

              {/* 3. Popular Near You / Restaurants Section */}
              <div id="popular-restaurants" className="scroll-mt-24">
                <RestaurantSection
                  restaurants={filteredRestaurants}
                  selectedFilter={restaurantFilter}
                  onFilterChange={setRestaurantFilter}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectRestaurant={(restId) => {
                    const rest = RESTAURANTS.find((r) => r.id === restId);
                    if (rest) {
                      setSelectedCategory(rest.category);
                      scrollToSection("menu-dishes");
                    }
                  }}
                  onViewAllClick={() => {
                    setSelectedCategory("all");
                    setRestaurantFilter("all");
                  }}
                />
              </div>

              {/* 4. Featured Dishes Section */}
              <section id="menu-dishes" className="scroll-mt-24 space-y-4">
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
                      className="text-xs font-semibold text-[#D66B43] hover:underline cursor-pointer"
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

                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
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
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCategory(dish.category);
                                  scrollToSection("popular-restaurants");
                                }}
                                className="text-[10px] font-bold text-[#D66B43] uppercase tracking-wider hover:underline text-left cursor-pointer"
                              >
                                {dish.restaurantName}
                              </button>
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
                                  className="text-[#6E6D66] hover:text-[#D66B43] transition-colors p-0.5 cursor-pointer"
                                  title="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold text-[#252522] w-4 text-center">
                                  {inCart.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(dish.id, 1)}
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
                                onClick={() => handleAddToCart(dish)}
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
              </section>
            </>
          )}
        </main>
      </div>

      {/* Fixed Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
        ordersCount={customerOrders.length}
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
              className="px-3.5 py-1.5 rounded-xl bg-[#D66B43] text-white text-xs font-bold hover:bg-[#BF5832] transition-colors flex items-center gap-1 shadow-soft cursor-pointer"
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

      {/* Live Token Modal (from active order card) */}
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

      {/* Order Details Modal (from My Orders view) */}
      <CustomerOrderDetailsModal
        order={selectedOrderForModal}
        isOpen={!!selectedOrderForModal}
        onClose={() => setSelectedOrderForModal(null)}
        onReorder={handleReorderOrder}
      />
    </div>
  );
}
