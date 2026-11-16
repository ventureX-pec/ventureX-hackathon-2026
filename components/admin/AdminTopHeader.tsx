"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDisplayName, getInitials, getStoredUserProfile } from "@/lib/auth";
import { getStoredStoreStatus, setStoredStoreStatus, subscribeToDataChanges } from "@/lib/dataService";
import {
  MapPin,
  ChevronDown,
  Search,
  Bell,
  PanelLeftOpen,
  PanelLeftClose,
  ShoppingBag,
  ExternalLink,
  ChefHat,
  SlidersHorizontal,
  Sparkles,
  Store,
  PowerOff,
  X,
  CheckCheck,
  Layers,
  Package,
  CheckCircle2,
} from "lucide-react";

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "order" | "stock" | "pickup" | "system";
  read: boolean;
  linkTab?: string;
}

const DEFAULT_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    title: "New Table Order Placed",
    message: "Order #D4821 received for Table #T01 (Classic Double Smashed Cheeseburger + Loaded Truffle Fries)",
    time: "2m ago",
    type: "order",
    read: false,
    linkTab: "orders",
  },
  {
    id: "notif-2",
    title: "Low Ingredient Stock Warning",
    message: "Aged Wisconsin Sharp Cheddar has reached reorder threshold (3.2 kg remaining)",
    time: "14m ago",
    type: "stock",
    read: false,
    linkTab: "ingredients",
  },
  {
    id: "notif-3",
    title: "Express Shelf Handover",
    message: "Token #38 was picked up and verified at Shelf A",
    time: "32m ago",
    type: "pickup",
    read: true,
    linkTab: "pickup",
  },
  {
    id: "notif-4",
    title: "Burger House Live Storefront",
    message: "Storefront is live & actively receiving campus orders at Block A • Food Court",
    time: "1h ago",
    type: "system",
    read: true,
    linkTab: "overview",
  },
];

interface AdminTopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  activeOrdersCount?: number;
  onOpenKitchen?: () => void;
  onNavigateTab?: (tab: string) => void;
  adminName?: string;
  adminEmail?: string;
}

export const AdminTopHeader: React.FC<AdminTopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  isSidebarOpen = true,
  onToggleSidebar,
  activeOrdersCount = 24,
  onOpenKitchen,
  onNavigateTab,
  adminName,
  adminEmail,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("Block A • Food Court (Burger House)");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isStoreLive, setIsStoreLive] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notification states
  const [notifications, setNotifications] = useState<AdminNotification[]>(DEFAULT_ADMIN_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notif: AdminNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setIsNotificationsOpen(false);
    if (notif.linkTab && onNavigateTab) {
      onNavigateTab(notif.linkTab);
    }
  };

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  // Subscribe to live incoming orders to push notifications
  useEffect(() => {
    const unsubscribeOrders = subscribeToDataChanges((event) => {
      if (event.type === "ORDERS_UPDATED" && Array.isArray(event.payload) && event.payload.length > 0) {
        const latest = event.payload[0];
        if (latest) {
          setNotifications((prev) => {
            const exists = prev.some((n) => n.id === `order-${latest.id}`);
            if (exists) return prev;
            return [
              {
                id: `order-${latest.id}`,
                title: `New Order ${latest.orderNumber}`,
                message: `${latest.customerName} • ${latest.tableNumber ? `Table ${latest.tableNumber}` : latest.tableOrShelf} • ₹${latest.totalAmount}`,
                time: "Just now",
                type: "order",
                read: false,
                linkTab: "orders",
              },
              ...prev,
            ];
          });
        }
      }
    });

    return () => unsubscribeOrders();
  }, []);

  // Sync store status across tabs
  useEffect(() => {
    setIsStoreLive(getStoredStoreStatus());

    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.type === "serveza_store_is_live") {
        setIsStoreLive(getStoredStoreStatus());
      }
    });

    const handleCustomChange = (e: any) => {
      if (typeof e.detail?.isLive === "boolean") {
        setIsStoreLive(e.detail.isLive);
      }
    };
    window.addEventListener("serveza:store-status-change" as any, handleCustomChange);

    return () => {
      unsubscribe();
      window.removeEventListener("serveza:store-status-change" as any, handleCustomChange);
    };
  }, []);

  const handleToggleStoreLive = () => {
    const nextStatus = !isStoreLive;
    setIsStoreLive(nextStatus);
    setStoredStoreStatus(nextStatus);
    setToastMessage(
      nextStatus
        ? "Burger House Kitchen LIVE • Accepting student orders"
        : "Burger House Kitchen PAUSED • New customer checkouts paused"
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dynamic admin profile state
  const [profile, setProfile] = useState<{ name: string; email: string }>({
    name: adminName || "",
    email: adminEmail || "",
  });

  useEffect(() => {
    if (adminName || adminEmail) {
      setProfile({
        name: adminName || "",
        email: adminEmail || "",
      });
      return;
    }
    const stored = getStoredUserProfile("admin");
    if (stored) {
      setProfile({
        name: stored.name || formatDisplayName(stored.email),
        email: stored.email,
      });
    }
  }, [adminName, adminEmail]);

  const displayName = profile.name || (profile.email ? formatDisplayName(profile.email) : "Kitchen Admin");
  const displayEmail = profile.email || "admin@serveza.kitchen";
  const initials = getInitials(displayName);

  const locations = [
    "Block A • Food Court (Burger House)",
    "Main Commons • Stall 03 (Pizza Palace)",
    "Courtyard Wing • Block A (The Corner Café)",
    "East Wing Courtyard (Sushi World)",
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F3]/80 backdrop-blur-md border-b border-[#ECE5DA]/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Sidebar Toggle & Location Selector */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-[#ECE5DA] text-[#252522] hover:text-[#D66B43] hover:border-[#D66B43]/40 shadow-xs transition-colors"
                title={isSidebarOpen ? "Collapse Sidebar" : "Open Sidebar"}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose className="w-4 h-4" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4 text-[#D66B43]" />
                )}
              </button>
            )}

            {/* Location Selector (matches reference "📍 Main Food Court, Block A v") */}
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#252522] hover:text-[#D66B43] transition-colors bg-white/60 px-3 py-1.5 rounded-xl border border-[#EDE5DA]/80"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D66B43]" />
                <span className="max-w-[170px] truncate">{selectedLocation}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7A756D]" />
              </button>

              {isLocationOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-[#ECE5DA] shadow-[0_15px_30px_rgba(37,37,34,0.08)] p-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C877D] uppercase tracking-wider">
                    Select Kitchen Outlet
                  </div>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedLocation === loc
                          ? "bg-[#D66B43]/10 text-[#D66B43] font-semibold"
                          : "text-[#252522] hover:bg-[#F2ECE2]"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Search Bar (Rounded-full pill matching reference) */}
          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C877D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search orders, menu items, ingredients..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#EDE5DA] text-xs text-[#252522] placeholder:text-[#8C877D] shadow-[0_2px_8px_rgba(37,37,34,0.02)] focus:outline-none focus:border-[#D66B43] focus:ring-2 focus:ring-[#D66B43]/15 transition-all"
              />
            </div>
          </div>

          {/* Right: Actions, Notifications & Admin Profile */}
          <div className="flex items-center gap-2.5">
            {/* Live Store Status / Accepting Orders Toggle */}
            <button
              onClick={handleToggleStoreLive}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs border cursor-pointer active:scale-95 ${
                isStoreLive
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                  : "bg-rose-50 border-rose-300 text-rose-800 hover:bg-rose-100"
              }`}
              title={
                isStoreLive
                  ? "Store is currently LIVE & accepting orders • Click to pause"
                  : "Store is currently PAUSED • Click to go live & accept orders"
              }
            >
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  isStoreLive
                    ? "bg-emerald-500 animate-pulse ring-2 ring-emerald-200"
                    : "bg-rose-500 ring-2 ring-rose-200"
                }`}
              />
              <Store className={`w-3.5 h-3.5 ${isStoreLive ? "text-emerald-700" : "text-rose-600"}`} />
              <span className="hidden sm:inline">{isStoreLive ? "Accepting Orders" : "Orders Paused"}</span>
              <span className="sm:hidden">{isStoreLive ? "Live" : "Paused"}</span>
            </button>

            {/* Quick Kitchen Display Shortcut */}
            {onOpenKitchen && (
              <button
                onClick={onOpenKitchen}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-[#EDE5DA] text-xs font-medium text-[#252522] hover:border-[#D66B43]/40 shadow-xs transition-colors cursor-pointer"
                title="Open KDS Screen"
              >
                <ChefHat className="w-3.5 h-3.5 text-[#D66B43]" />
                <span>KDS</span>
              </button>
            )}

            {/* Notification Bell with Floating Popover */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded-full border transition-all cursor-pointer ${
                  isNotificationsOpen
                    ? "bg-[#D66B43]/10 border-[#D66B43] text-[#D66B43]"
                    : "bg-white border-[#EDE5DA] text-[#252522] hover:text-[#D66B43] hover:border-[#D66B43]/40 shadow-xs"
                }`}
                aria-label="Notifications"
                title="Kitchen Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D66B43] text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Modal / Popover */}
              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#ECE5DA] shadow-[0_20px_40px_rgba(37,37,34,0.12)] z-50 overflow-hidden animate-in fade-in duration-200">
                  {/* Popover Header */}
                  <div className="p-3.5 px-4 bg-[#FAF8F5] border-b border-[#F2ECE2] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#D66B43]/15 text-[#D66B43] flex items-center justify-center">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#252522]">Kitchen Notifications</h4>
                        <p className="text-[10px] text-[#8C877D]">
                          {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? "s" : ""}` : "All notifications read"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="px-2 py-1 rounded-lg text-[10px] font-semibold text-[#D66B43] hover:bg-[#D66B43]/10 transition-colors cursor-pointer"
                          title="Mark all as read"
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => setIsNotificationsOpen(false)}
                        className="p-1 rounded-lg text-[#8C877D] hover:text-[#252522] hover:bg-[#F2ECE2] transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#F5EFE6] scrollbar-thin">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] text-[#8C877D] flex items-center justify-center mx-auto">
                          <CheckCheck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-xs font-semibold text-[#252522]">No notifications</p>
                        <p className="text-[11px] text-[#8C877D]">You&apos;re all caught up with kitchen alerts</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`p-3.5 hover:bg-[#FAF8F5] transition-colors cursor-pointer flex items-start gap-3 relative group ${
                            !notif.read ? "bg-[#FAF6F0]/60" : ""
                          }`}
                        >
                          {/* Type Icon */}
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            notif.type === "order"
                              ? "bg-amber-100 text-amber-700"
                              : notif.type === "stock"
                              ? "bg-rose-100 text-rose-700"
                              : notif.type === "pickup"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {notif.type === "order" && <ShoppingBag className="w-4 h-4" />}
                            {notif.type === "stock" && <Layers className="w-4 h-4" />}
                            {notif.type === "pickup" && <Package className="w-4 h-4" />}
                            {notif.type === "system" && <Sparkles className="w-4 h-4" />}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className={`text-xs font-bold truncate ${!notif.read ? "text-[#252522]" : "text-[#5C5954]"}`}>
                                {notif.title}
                              </span>
                              <span className="text-[10px] text-[#8C877D] shrink-0 font-medium">
                                {notif.time}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#736E65] leading-relaxed line-clamp-2">
                              {notif.message}
                            </p>
                          </div>

                          {/* Unread indicator dot */}
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-[#D66B43] shrink-0 mt-2" />
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Popover Footer */}
                  {notifications.length > 0 && (
                    <div className="p-2.5 px-4 bg-[#FAF8F5] border-t border-[#F2ECE2] flex items-center justify-between text-[11px]">
                      <button
                        onClick={handleClearAll}
                        className="text-[#8C877D] hover:text-rose-600 transition-colors cursor-pointer font-medium"
                      >
                        Clear all alerts
                      </button>
                      <button
                        onClick={() => {
                          setIsNotificationsOpen(false);
                          if (onNavigateTab) onNavigateTab("orders");
                        }}
                        className="text-[#D66B43] hover:underline font-semibold cursor-pointer"
                      >
                        Go to Orders Board →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Customer Portal Link Pill */}
            <Link
              href="/customer?restaurant=burger-house"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D66B43]/10 border border-[#D66B43]/20 text-[#D66B43] text-xs font-semibold hover:bg-[#D66B43]/15 transition-colors"
              title="Open Burger House in Customer Store"
            >
              <span>Burger House Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-white border border-[#EDE5DA] hover:border-[#D66B43]/40 shadow-xs transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D66B43] to-[#F4A261] text-white text-[11px] font-bold flex items-center justify-center">
                  {initials}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-[#252522] leading-none truncate max-w-[120px]">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-[#8C877D] leading-none mt-0.5">Admin</div>
                </div>
                <ChevronDown className="w-3 h-3 text-[#8C877D]" />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-white border border-[#ECE5DA] shadow-[0_15px_30px_rgba(37,37,34,0.08)] p-1.5 z-50">
                  <div className="px-3 py-2 border-b border-[#F2ECE2]">
                    <div className="text-xs font-bold text-[#252522] truncate">{displayName}</div>
                    <div className="text-[11px] text-[#8C877D] truncate">{displayEmail}</div>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/customer"
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-[#252522] hover:bg-[#F2ECE2] flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D66B43]" />
                      <span>Switch to Customer App</span>
                    </Link>
                    <Link
                      href="/"
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-[#252522] hover:bg-[#F2ECE2] flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D66B43]" />
                      <span>Landing Page</span>
                    </Link>
                    <Link
                      href="/login"
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <span>Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Animated Feedback Banner when toggled */}
        {toastMessage && (
          <div
            className={`mt-2.5 px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between border shadow-xs transition-all ${
              isStoreLive
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isStoreLive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs hover:opacity-70 cursor-pointer ml-3 font-bold text-gray-500"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
