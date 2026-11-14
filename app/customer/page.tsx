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
import { RestaurantMenuView } from "@/components/customer/RestaurantMenuView";
import { CustomerFavoritesView } from "@/components/customer/CustomerFavoritesView";
import { ActiveOrderCard } from "@/components/customer/ActiveOrderCard";
import { CartDrawer, CartItem } from "@/components/customer/CartDrawer";
import { CheckoutSuccessModal } from "@/components/customer/CheckoutSuccessModal";
import { DishDetailModal } from "@/components/customer/DishDetailModal";
import {
  CustomerOrderDetailsModal,
  CustomerOrderRecord,
} from "@/components/customer/CustomerOrderDetailsModal";
import { CustomerOrdersView } from "@/components/customer/CustomerOrdersView";
import { PreviousOrdersSection } from "@/components/customer/PreviousOrdersSection";
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
  subscribeToDataChanges,
  fetchCustomerOrdersFromDb,
} from "@/lib/dataService";
import { formatDisplayName, getStoredUserProfile, setStoredUserProfile } from "@/lib/auth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function CustomerDashboardPage() {
  // Navigation & Active Tab ("home", "categories", "restaurants", "orders", "favorites")
  const [activeTab, setActiveTab] = useState<string>("home");

  // Selected Restaurant for In-Depth Menu View
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [highlightedDishId, setHighlightedDishId] = useState<string | null>(null);

  // Resizable & Collapsible Sidebar State
  const [sidebarWidth, setSidebarWidth] = useState<number>(256);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [restaurantFilter, setRestaurantFilter] = useState<string>("all");
  const [restaurantFavorites, setRestaurantFavorites] = useState<string[]>([
    "burger-house",
    "pizza-palace",
  ]);

  // Dish-Level Favorites (Persisted in localStorage)
  const [favoriteDishIds, setFavoriteDishIds] = useState<string[]>([
    "bh-1",
    "th-1",
    "pp-1",
  ]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inspectingDish, setInspectingDish] = useState<MenuItem | null>(null);

  // Logged-in Customer & Orders State
  const [loggedInCustomer, setLoggedInCustomer] = useState<{
    name: string;
    email: string;
    avatar?: string;
  }>({
    name: "Alex Morgan",
    email: "alex.morgan@serveza.com",
    avatar: "",
  });

  const [customerOrders, setCustomerOrders] = useState<CustomerOrderRecord[]>([]);
  const [selectedOrderForModal, setSelectedOrderForModal] =
    useState<CustomerOrderRecord | null>(null);

  // Active Placed Order State
  const [activeOrder, setActiveOrder] = useState<{
    id?: string;
    orderNumber?: string;
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll spy control refs
  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load user profile, orders, cart, and favorite dishes on mount & subscribe to Supabase live changes
  useEffect(() => {
    try {
      // 1. Check Supabase live session first
      if (isSupabaseConfigured()) {
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user?.email) {
            const dynamicName =
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              formatDisplayName(user.email);
            const dynamicAvatar =
              user.user_metadata?.avatar_url ||
              user.user_metadata?.picture ||
              "";
            const currentProfile = {
              name: dynamicName,
              email: user.email,
              avatar: dynamicAvatar,
            };
            setLoggedInCustomer(currentProfile);
            setStoredUserProfile({
              id: user.id,
              email: user.email,
              name: dynamicName,
              role: "customer",
              avatar: dynamicAvatar,
            });
          }
        }).catch(() => {});
      }

      // 2. Load stored profile from localStorage
      const storedUser = getStoredUserProfile("customer");
      let currentUser = {
        name: "Alex Morgan",
        email: "alex.morgan@serveza.com",
        avatar: "",
      };
      if (storedUser && storedUser.email) {
        currentUser = {
          name: storedUser.name || formatDisplayName(storedUser.email),
          email: storedUser.email,
          avatar: storedUser.avatar || "",
        };
        setLoggedInCustomer(currentUser);
      }

      // Load persistent dish favorites for this customer
      const favKey = `serveza_fav_dishes_${currentUser.email}`;
      const savedFavs =
        localStorage.getItem(favKey) || localStorage.getItem("serveza_favorite_dishes");
      if (savedFavs) {
        try {
          const parsedFavs = JSON.parse(savedFavs);
          if (Array.isArray(parsedFavs)) {
            setFavoriteDishIds(parsedFavs);
          }
        } catch (e) {}
      }

      // Load persistent cart
      const storedCart = getStoredCart();
      if (storedCart && storedCart.length > 0) {
        setCart(storedCart);
      }

      // Load persistent customer orders for this profile
      const storageKey = `serveza_orders_${currentUser.email}`;
      const savedOrders = localStorage.getItem(storageKey);
      if (savedOrders) {
        try {
          const parsed = JSON.parse(savedOrders);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCustomerOrders(parsed);

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
                      category: "bowls",
                      description: "",
                      price: i.price,
                      image:
                        i.image ||
                        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
                      isVeg: true,
                      prepTimeMinutes: 12,
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
        } catch (e) {}
      } else if (currentUser.email === "alex.morgan@serveza.com") {
        // Fallback demo order only for default demo user
        const demoOrders = localStorage.getItem("serveza_customer_orders");
        if (demoOrders) {
          try {
            setCustomerOrders(JSON.parse(demoOrders));
          } catch (e) {}
        }
      }

      // Fetch profile-specific orders from Supabase Database
      fetchCustomerOrdersFromDb(currentUser.email, currentUser.name)
        .then((dbOrders) => {
          if (Array.isArray(dbOrders) && dbOrders.length > 0) {
            const mappedRecords: CustomerOrderRecord[] = dbOrders.map((ord) => ({
              id: ord.id,
              tokenNumber: ord.tokenNumber || "01",
              customerName: ord.customerName || currentUser.name,
              customerEmail: ord.customerEmail || currentUser.email,
              restaurantName:
                ord.restaurantName ||
                (ord.restaurantId === "burger-house"
                  ? "Burger House"
                  : ord.restaurantId === "pizza-palace"
                  ? "Pizza Palace"
                  : "The Corner Table"),
              items: ord.items.map((i) => ({
                dishName: i.dishName,
                quantity: i.quantity,
                price: i.price,
                image: ord.image,
                instructions: i.notes,
              })),
              totalAmount: ord.totalAmount,
              status:
                ord.status === "completed"
                  ? "delivered"
                  : ord.status === "ready"
                  ? "out_for_delivery"
                  : ord.status === "preparing" || ord.status === "accepted"
                  ? "preparing"
                  : ord.status === "cancelled"
                  ? "cancelled"
                  : "pending",
              orderType: ord.orderType || "takeaway",
              tableOrShelf: ord.tableOrShelf || "Counter 1",
              pickupSlot: ord.tableOrShelf || "Express Pickup",
              createdAt: ord.createdAt || new Date().toISOString(),
              formattedDate: ord.timeAgo || ord.createdAt || "Recent order",
            }));

            setCustomerOrders(mappedRecords);
            localStorage.setItem(storageKey, JSON.stringify(mappedRecords));
          }
        })
        .catch(() => {});

      // Check persistent active order
      const storedActive = getStoredActiveOrder();
      if (storedActive) {
        setActiveOrder(storedActive);
      }
    } catch (e) {}

    // Subscribe to cross-tab & Supabase live sync
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.type === "ORDERS_UPDATED" && Array.isArray(event.payload)) {
        // When kitchen updates order status (e.g. from Preparing to Ready), update active order
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

  // Synchronize orders whenever authenticated customer profile switches
  useEffect(() => {
    if (!loggedInCustomer?.email) return;
    const storageKey = `serveza_orders_${loggedInCustomer.email}`;
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setCustomerOrders(parsed);
      } catch (e) {}
    } else if (loggedInCustomer.email !== "alex.morgan@serveza.com") {
      setCustomerOrders([]);
    }

    fetchCustomerOrdersFromDb(loggedInCustomer.email, loggedInCustomer.name)
      .then((dbOrders) => {
        if (Array.isArray(dbOrders) && dbOrders.length > 0) {
          const mappedRecords: CustomerOrderRecord[] = dbOrders.map((ord) => ({
            id: ord.id,
            tokenNumber: ord.tokenNumber || "01",
            customerName: ord.customerName || loggedInCustomer.name,
            customerEmail: ord.customerEmail || loggedInCustomer.email,
            restaurantName:
              ord.restaurantName ||
              (ord.restaurantId === "burger-house"
                ? "Burger House"
                : ord.restaurantId === "pizza-palace"
                ? "Pizza Palace"
                : "The Corner Table"),
            items: ord.items.map((i) => ({
              dishName: i.dishName,
              quantity: i.quantity,
              price: i.price,
              image: ord.image,
              instructions: i.notes,
            })),
            totalAmount: ord.totalAmount,
            status:
              ord.status === "completed"
                ? "delivered"
                : ord.status === "ready"
                ? "out_for_delivery"
                : ord.status === "preparing" || ord.status === "accepted"
                ? "preparing"
                : ord.status === "cancelled"
                ? "cancelled"
                : "pending",
            orderType: ord.orderType || "takeaway",
            tableOrShelf: ord.tableOrShelf || "Counter 1",
            pickupSlot: ord.tableOrShelf || "Express Pickup",
            createdAt: ord.createdAt || new Date().toISOString(),
            formattedDate: ord.timeAgo || ord.createdAt || "Recent order",
          }));

          setCustomerOrders(mappedRecords);
          localStorage.setItem(storageKey, JSON.stringify(mappedRecords));
        }
      })
      .catch(() => {});
  }, [loggedInCustomer.email, loggedInCustomer.name]);

  // Dish-Level Favorite Toggle Handler
  const handleToggleFavoriteDish = (dishId: string) => {
    setFavoriteDishIds((prev) => {
      const next = prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId];
      try {
        localStorage.setItem(`serveza_fav_dishes_${loggedInCustomer.email}`, JSON.stringify(next));
        localStorage.setItem("serveza_favorite_dishes", JSON.stringify(next));
      } catch (e) {
        console.warn("Could not save favorites", e);
      }
      return next;
    });
  };

  // Restaurant Menu Navigation
  const handleOpenRestaurant = (restaurantId: string, targetDishId?: string) => {
    setSelectedRestaurantId(restaurantId);
    setHighlightedDishId(targetDishId || null);
    if (activeTab === "orders" || activeTab === "favorites") {
      setActiveTab("home");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth scroll helper with sticky header offset
  const scrollToSection = (sectionId: string) => {
    setSelectedRestaurantId(null);
    isManualScrolling.current = true;

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
    if (activeTab === "orders" || activeTab === "favorites" || selectedRestaurantId) return;

    const handleScroll = () => {
      if (isManualScrolling.current) return;
      if (activeTab === "orders" || activeTab === "favorites" || selectedRestaurantId) return;

      const scrollPosition = window.scrollY + 130;

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
  }, [activeTab, selectedRestaurantId]);

  // Sidebar Tab Navigation Handler
  const handleTabChange = (tab: string) => {
    setSelectedRestaurantId(null);
    setHighlightedDishId(null);

    if (tab === "home") {
      setActiveTab("home");
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
      if (selectedCategory !== "all" && rest.category !== selectedCategory) {
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
  }, [selectedCategory, restaurantFilter, searchQuery]);

  // Active restaurant object if in restaurant menu view
  const activeRestaurantObj = useMemo(() => {
    if (!selectedRestaurantId) return null;
    return RESTAURANTS.find((r) => r.id === selectedRestaurantId) || null;
  }, [selectedRestaurantId]);

  // Dishes belonging to the selected restaurant
  const selectedRestaurantDishes = useMemo(() => {
    if (!selectedRestaurantId) return [];
    return MENU_ITEMS.filter((d) => d.restaurantId === selectedRestaurantId);
  }, [selectedRestaurantId]);

  // Customer's Favorited Dishes
  const customerFavoriteDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => favoriteDishIds.includes(dish.id));
  }, [favoriteDishIds]);

  // Featured Dishes for the main homepage
  const featuredDishes = useMemo(() => {
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

  // Checkout trigger (Saves to Supabase Database, syncs with Admin KDS, & updates Customer Orders)
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
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const primaryRestaurant =
      cart[0]?.dish.restaurantName ||
      (selectedRestaurantId
        ? RESTAURANTS.find((r) => r.id === selectedRestaurantId)?.name
        : "The Corner Table") ||
      "The Corner Table";
    const primaryRestaurantId =
      cart[0]?.dish.restaurantId ||
      selectedRestaurantId ||
      "the-corner-table";

    // 1. Create Customer History Record (for "My Orders" tab)
    const newCustomerOrder: CustomerOrderRecord = {
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
      totalAmount: orderTotal,
      status: "preparing",
      orderType: details.orderType,
      tableOrShelf: details.tableOrShelf,
      pickupSlot: details.pickupSlot,
      createdAt: now.toISOString(),
      formattedDate: formattedDate,
      notes: details.notes,
    };

    const updatedOrders = [newCustomerOrder, ...customerOrders];
    setCustomerOrders(updatedOrders);

    try {
      localStorage.setItem(`serveza_orders_${loggedInCustomer.email}`, JSON.stringify(updatedOrders));
      localStorage.setItem("serveza_customer_orders", JSON.stringify(updatedOrders));
    } catch (e) {
      console.warn("Could not save customer order", e);
    }

    // 2. Create Active Order State for live tracking card
    const activeOrderData = {
      id: orderId,
      orderNumber,
      token: randomToken,
      tokenNumber: randomToken,
      items: [...cart],
      total: orderTotal,
      orderType: details.orderType,
      tableOrShelf: details.tableOrShelf,
      pickupSlot: details.pickupSlot,
      status: "preparing",
    };

    setActiveOrder(activeOrderData);
    saveStoredActiveOrder(activeOrderData);

    // 3. Clear customer cart & update storage
    setCart([]);
    saveStoredCart([]);
    setIsCartOpen(false);
    setIsSuccessModalOpen(true);

    // 4. Persist to Supabase PostgreSQL Database (Instantly syncs with Admin Kitchen KDS)
    const adminOrderPayload: AdminOrder = {
      id: orderId,
      orderNumber,
      tokenNumber: randomToken,
      customerName: loggedInCustomer.name,
      customerEmail: loggedInCustomer.email,
      customerPhone: "+91 98765 43210",
      restaurantId: primaryRestaurantId,
      restaurantName: primaryRestaurant,
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
      createdAt: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image:
        cart[0]?.dish.image ||
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    };

    createLiveOrder(adminOrderPayload);
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
      <FoodPhotographyBackdrop isSidebarOpen={isDesktop && isSidebarOpen} sidebarWidth={sidebarWidth} activeTab={activeTab} />

      {/* Light subtle cursor trail */}
      <CursorTrail />

      {/* Resizable & Collapsible Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favoriteDishIds.length}
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
          paddingLeft: isDesktop && isSidebarOpen ? `${sidebarWidth}px` : "0px",
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
          userName={loggedInCustomer.name}
          userEmail={loggedInCustomer.email}
          userAvatar={loggedInCustomer.avatar}
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
            /* VIEW 2: Favorites View (Displays individual liked dishes with restaurant details) */
            <CustomerFavoritesView
              favoriteDishes={customerFavoriteDishes}
              cart={cart}
              onRemoveFavorite={handleToggleFavoriteDish}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onNavigateToRestaurant={(restId, dishId) =>
                handleOpenRestaurant(restId, dishId)
              }
              onOpenDishModal={(dish) => setInspectingDish(dish)}
              onExploreClick={() => {
                setActiveTab("restaurants");
                scrollToSection("popular-restaurants");
              }}
            />
          ) : selectedRestaurantId && activeRestaurantObj ? (
            /* VIEW 3: Dedicated In-Depth Restaurant Menu View (12-20 dishes with categories & search) */
            <RestaurantMenuView
              restaurant={activeRestaurantObj}
              dishes={selectedRestaurantDishes}
              cart={cart}
              favoriteDishIds={favoriteDishIds}
              onToggleFavoriteDish={handleToggleFavoriteDish}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onOpenDishModal={(dish) => setInspectingDish(dish)}
              onBack={() => {
                setSelectedRestaurantId(null);
                setHighlightedDishId(null);
              }}
              highlightedDishId={highlightedDishId}
            />
          ) : (
            /* VIEW 4: Main Homepage (Hero, Categories, Popular Near You, Featured Dishes) */
            <>
              {/* Active Live Order Banner */}
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

              {/* Previous Orders Section (Real-time orders with café/restaurant name, synced to database) */}
              <PreviousOrdersSection
                orders={customerOrders}
                onOpenDetails={(ord) => setSelectedOrderForModal(ord)}
                onReorder={handleReorderOrder}
                onViewAllClick={() => {
                  setActiveTab("orders");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                customerName={loggedInCustomer.name}
              />

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
                  favorites={restaurantFavorites}
                  onToggleFavorite={(id) => {
                    setRestaurantFavorites((prev) =>
                      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
                    );
                  }}
                  onSelectRestaurant={(restId) => handleOpenRestaurant(restId)}
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
                      Handcrafted specialties prepared hot across campus partner kitchens
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
                  {featuredDishes.slice(0, 15).map((dish) => {
                    const inCart = cart.find((i) => i.dish.id === dish.id);
                    const isFav = favoriteDishIds.includes(dish.id);

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

                            {/* Dish Favorite Heart Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavoriteDish(dish.id);
                              }}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                                isFav
                                    ? "bg-rose-50 text-rose-500"
                                  : "bg-white/90 text-[#6E6D66] hover:text-rose-500 hover:bg-white"
                              }`}
                              title={isFav ? "Remove from Favorites" : "Save to Favorites"}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${
                                  isFav ? "fill-rose-500 text-rose-500" : ""
                                }`}
                              />
                            </button>
                          </div>

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
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenRestaurant(dish.restaurantId, dish.id);
                                }}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D66B43] uppercase tracking-wider hover:underline text-left cursor-pointer"
                                title={`Open ${dish.restaurantName} full menu`}
                              >
                                <Store className="w-3 h-3" />
                                <span>{dish.restaurantName}</span>
                              </button>

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
        favoritesCount={favoriteDishIds.length}
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

      {/* Dish Customization Modal (with Favorite Heart support) */}
      <DishDetailModal
        dish={inspectingDish}
        onClose={() => setInspectingDish(null)}
        onAddToCart={(d, q, notes) => handleAddToCart(d, q, notes)}
        currentCartQty={
          inspectingDish ? cart.find((i) => i.dish.id === inspectingDish.id)?.quantity || 0 : 0
        }
        isFavorite={inspectingDish ? favoriteDishIds.includes(inspectingDish.id) : false}
        onToggleFavorite={(dishId) => handleToggleFavoriteDish(dishId)}
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
