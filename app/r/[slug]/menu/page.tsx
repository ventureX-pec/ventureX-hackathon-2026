"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  UtensilsCrossed,
  MapPin,
  Sparkles,
  ArrowLeft,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { RESTAURANTS, MENU_ITEMS, Restaurant, MenuItem } from "@/data/mockCustomerData";
import { RestaurantMenuView } from "@/components/customer/RestaurantMenuView";
import { CartDrawer, CartItem } from "@/components/customer/CartDrawer";
import { DishDetailModal } from "@/components/customer/DishDetailModal";
import { CheckoutSuccessModal } from "@/components/customer/CheckoutSuccessModal";
import { AdminOrder } from "@/data/mockAdminData";
import { createLiveOrder, saveStoredActiveOrder, saveStoredCart, getStoredCart } from "@/lib/dataService";

function TableMenuContent() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || "";
  const slug = rawSlug?.toLowerCase().trim() || "the-corner-table";

  const searchParams = useSearchParams();
  const tableParam = searchParams.get("table"); // e.g. "T01"

  // Standardize table number
  const tableNumber = tableParam ? tableParam.toUpperCase().trim() : "T01";

  // State
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [dishes, setDishes] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inspectingDish, setInspectingDish] = useState<MenuItem | null>(null);
  const [favoriteDishIds, setFavoriteDishIds] = useState<string[]>([]);
  const [isValidTable, setIsValidTable] = useState<boolean>(true);

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

  // Fetch and resolve restaurant & available dishes
  useEffect(() => {
    // 1. Find matching restaurant by slug or alias
    const normalizedSlug = slug.toLowerCase().trim();

    const aliasMap: Record<string, string> = {
      "the-corner-table": "corner-cafe",
      "the-corner-cafe": "corner-cafe",
      "corner-cafe": "corner-cafe",
      "burger-house": "burger-house",
      "pizza-palace": "pizza-palace",
      "sushi-bay": "sushi-world",
      "sushi-world": "sushi-world",
      "healthy-bites": "healthy-bites",
      "tandoor-hub": "tandoor-hub",
      "tandoor-curry-hub": "tandoor-hub",
    };

    const targetId = aliasMap[normalizedSlug] || normalizedSlug;

    let matchedRest = RESTAURANTS.find(
      (r) =>
        r.id === targetId ||
        r.id === normalizedSlug ||
        r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalizedSlug
    );

    // Fallback if slug not found
    if (!matchedRest) {
      matchedRest = RESTAURANTS[0];
    }

    setRestaurant(matchedRest);

    // 2. Fetch dishes belonging specifically to this restaurant
    let restDishes = MENU_ITEMS.filter(
      (d) =>
        d.restaurantId === matchedRest.id ||
        d.restaurantName.toLowerCase().trim() === matchedRest.name.toLowerCase().trim()
    );

    if (restDishes.length === 0) {
      restDishes = MENU_ITEMS.filter((d) => d.restaurantId === matchedRest.id);
    }

    setDishes(restDishes);

    // 3. Load persistent cart from storage
    const storedCart = getStoredCart();
    if (storedCart && storedCart.length > 0) {
      setCart(storedCart);
    }

    // 4. Validate Table
    if (tableNumber) {
      setIsValidTable(true);
    }
  }, [slug, tableNumber]);

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

  // Toggle favorite dish
  const handleToggleFavoriteDish = (dishId: string) => {
    setFavoriteDishIds((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  // Submit Order from Table
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

    const verifiedTable = tableNumber ? `Table ${tableNumber}` : details.tableOrShelf || "Table T01";

    const orderData = {
      id: orderId,
      orderNumber,
      token: randomToken,
      tokenNumber: randomToken,
      items: [...cart],
      total: orderTotal,
      orderType: "dine-in" as const,
      tableOrShelf: verifiedTable,
      pickupSlot: "⚡ Table-Side Service (~10 min)",
      status: "new",
    };

    setActiveOrder(orderData);
    saveStoredActiveOrder(orderData);

    setCart([]);
    saveStoredCart([]);
    setIsCartOpen(false);
    setIsSuccessModalOpen(true);

    // Persist order to Supabase Backend
    const adminOrderPayload: AdminOrder = {
      id: orderId,
      orderNumber,
      tokenNumber: randomToken,
      customerName: "Dine-In Guest",
      customerPhone: "+91 98765 43210",
      orderType: "dine-in",
      tableOrShelf: verifiedTable,
      tableNumber: tableNumber,
      restaurantId: restaurant?.id || slug,
      restaurantName: restaurant?.name || "The Corner Table",
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
      createdAt: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image:
        cart[0]?.dish.image ||
        restaurant?.image ||
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    };

    createLiveOrder(adminOrderPayload);
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-full border-2 border-[#D66B43] border-t-transparent animate-spin mx-auto" />
          <p className="text-sm font-serif font-medium text-[#252522]">
            Loading digital menu for Table {tableNumber}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#252522] selection:bg-[#D66B43]/20 selection:text-[#D66B43] relative overflow-x-hidden">
      {/* ============================================================ */}
      {/* 1. STICKY TOP BRAND & TABLE SEATED BANNER                     */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#ECE7DE] shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          {/* Brand Info */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#c96342] text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              SZ
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-[#1c1917] tracking-tight block leading-tight">
                ServeZa
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#78716c] block">
                Table QR Dine-In
              </span>
            </div>
          </Link>

          {/* Prominent Table Seated Indicator */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbebe4] border border-[#e8cbbd] text-[#c96342] text-xs font-bold shadow-xs animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#c96342]" />
              <span>Ordering for Table {tableNumber}</span>
            </div>

            {/* Quick Cart Pill */}
            {totalCartCount > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#252522] text-[#FAF8F3] text-xs font-bold shadow-xs hover:bg-[#c96342] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{totalCartCount}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. REUSED ARTISANAL RESTAURANT MENU VIEW                      */}
      {/* ============================================================ */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-28">
        <RestaurantMenuView
          restaurant={restaurant}
          dishes={dishes}
          cart={cart}
          favoriteDishIds={favoriteDishIds}
          onToggleFavoriteDish={handleToggleFavoriteDish}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenDishModal={(dish) => setInspectingDish(dish)}
          onBack={() => {
            window.location.href = "/customer";
          }}
        />
      </main>

      {/* ============================================================ */}
      {/* 3. FLOATING CART CHECKOUT BAR                                 */}
      {/* ============================================================ */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pointer-events-auto bg-[#252522] text-[#FAF8F3] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 sm:gap-6 border border-white/10"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#D66B43] text-white text-xs font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
              <div className="text-left">
                <span className="text-[10px] text-[#A8A29E] block uppercase tracking-wider">
                  Table {tableNumber}
                </span>
                <span className="text-xs font-semibold">
                  Plate: ₹{cartTotalAmount}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#D66B43] text-white text-xs font-bold hover:bg-[#BF5832] transition-colors flex items-center gap-1.5 shadow-soft cursor-pointer"
            >
              <span>View Plate & Order</span>
              <span className="text-[11px] font-normal opacity-90">→</span>
            </button>
          </motion.div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. MODALS & DRAWERS                                          */}
      {/* ============================================================ */}
      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={inspectingDish}
        onClose={() => setInspectingDish(null)}
        onAddToCart={(d, q, notes) => handleAddToCart(d, q, notes)}
        currentCartQty={
          inspectingDish ? cart.find((i) => i.dish.id === inspectingDish.id)?.quantity || 0 : 0
        }
        isFavorite={inspectingDish ? favoriteDishIds.includes(inspectingDish.id) : false}
        onToggleFavorite={handleToggleFavoriteDish}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        defaultTable={tableNumber}
        defaultOrderType="dine-in"
        restaurantName={restaurant.name}
      />

      {/* Checkout Success Modal */}
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

export default function RestaurantTableMenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#D66B43] border-t-transparent animate-spin mx-auto" />
            <p className="text-sm font-serif font-medium text-[#252522]">
              Loading table-side digital menu...
            </p>
          </div>
        </div>
      }
    >
      <TableMenuContent />
    </Suspense>
  );
}
