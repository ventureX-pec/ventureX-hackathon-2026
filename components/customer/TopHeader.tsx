"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDisplayName, getInitials } from "@/lib/auth";
import {
  MapPin,
  ChevronDown,
  Search,
  ShoppingBag,
  Bell,
  UtensilsCrossed,
  PanelLeftOpen,
  PanelLeftClose,
  X,
  CheckCheck,
  Sparkles,
} from "lucide-react";

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  cartTotal,
  onOpenCart,
  isSidebarOpen = true,
  onToggleSidebar,
  userName,
  userEmail,
  userAvatar,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("Main Food Court, Block A");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Dynamic user profile state (accepts props or hydrates from local session)
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    avatar?: string;
  }>({
    name: userName || "",
    email: userEmail || "",
    avatar: userAvatar || "",
  });

  useEffect(() => {
    if (userName || userEmail) {
      setProfile({
        name: userName || "",
        email: userEmail || "",
        avatar: userAvatar || "",
      });
      return;
    }

    if (typeof window !== "undefined") {
      try {
        const stored =
          localStorage.getItem("serveza_customer_user") ||
          localStorage.getItem("serveza_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setProfile({
            name: parsed.name || (parsed.email ? formatDisplayName(parsed.email) : ""),
            email: parsed.email || "",
            avatar: parsed.avatar || parsed.avatar_url || "",
          });
        }
      } catch (e) {}
    }
  }, [userName, userEmail, userAvatar]);

  const displayName =
    profile.name ||
    (profile.email ? formatDisplayName(profile.email) : "Guest Diner");
  const initials = getInitials(displayName);

  // Customer Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: "cust-1",
      title: "Burger House Express Pickup Ready",
      message: "Zero queue pick-up active at Food Court Block A. Smashed patties ready in ~12 mins.",
      time: "5m ago",
      read: false,
    },
    {
      id: "cust-2",
      title: "Table-Side Digital Ordering",
      message: "Scan any table QR standee to link your bill and get dishes served to your chair.",
      time: "20m ago",
      read: false,
    },
    {
      id: "cust-3",
      title: "Welcome to ServeZa!",
      message: "Order scratch-cooked hearth meals across 6 campus restaurants with real-time tracking.",
      time: "1h ago",
      read: true,
    },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const locations = [
    "Main Food Court, Block A",
    "Academic Block B • Table #12",
    "Library Courtyard • Kiosk",
    "Sports Complex • Stall 04",
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F3]/60 backdrop-blur-md border-b border-[#ECE7DE]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left on Mobile: Logo; Left on Desktop: Sidebar Toggle & Location */}
          <div className="flex items-center gap-3">
            {/* Desktop Sidebar Toggle Button */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-[#ECE7DE] text-[#252522] hover:text-[#D66B43] hover:border-[#D66B43]/40 shadow-xs transition-colors"
                title={isSidebarOpen ? "Collapse Sidebar" : "Open Sidebar"}
                aria-label={isSidebarOpen ? "Collapse Sidebar" : "Open Sidebar"}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose className="w-4 h-4" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4 text-[#D66B43]" />
                )}
              </button>
            )}

            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden flex items-center gap-2">
              <img
                src="/logo.png"
                alt="ServeZa Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="font-serif text-lg font-bold text-[#252522]">
                Serve<span className="text-[#D66B43]">Za</span>
              </span>
            </Link>

            {/* Location Selector (matches reference "📍 New York, USA v") */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#252522] hover:text-[#D66B43] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D66B43]" />
                <span className="max-w-[170px] truncate">{selectedLocation}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6E6D66]" />
              </button>

              {isLocationOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-[#ECE7DE] shadow-card p-1.5 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#6E6D66] uppercase tracking-wider">
                    Choose Delivery / Table Spot
                  </div>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                        selectedLocation === loc
                          ? "bg-[#D66B43]/10 text-[#D66B43] font-semibold"
                          : "text-[#252522] hover:bg-[#FAF8F3]"
                      }`}
                    >
                      <span>{loc}</span>
                      {selectedLocation === loc && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D66B43]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#6E6D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for food, restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-full bg-white border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43] shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6E6D66] hover:text-[#252522]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right: Cart, Notifications & Profile */}
          <div className="flex items-center gap-3">
            {/* Cart Icon with Orange Badge */}
            <button
              onClick={onOpenCart}
              className="relative w-9 h-9 rounded-full bg-white border border-[#ECE7DE] flex items-center justify-center text-[#252522] hover:border-[#D66B43] hover:text-[#D66B43] shadow-xs transition-all"
              title="Open Plate Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D66B43] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notification Bell with Floating Popover */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isNotificationsOpen
                    ? "bg-[#D66B43]/10 border-[#D66B43] text-[#D66B43]"
                    : "bg-white border-[#ECE7DE] text-[#252522] hover:border-[#D66B43] hover:text-[#D66B43] shadow-xs"
                }`}
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D66B43] text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Popover */}
              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 sm:w-88 rounded-2xl bg-white border border-[#ECE7DE] shadow-[0_20px_40px_rgba(37,37,34,0.12)] z-50 overflow-hidden animate-in fade-in duration-200">
                  <div className="p-3.5 px-4 bg-[#FAF8F5] border-b border-[#F2ECE2] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#D66B43]/15 text-[#D66B43] flex items-center justify-center">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#252522]">Notifications</h4>
                        <p className="text-[10px] text-[#8C877D]">
                          {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? "s" : ""}` : "All notifications read"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {unreadCount > 0 && (
                        <button
                          onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                          className="px-2 py-1 rounded-lg text-[10px] font-semibold text-[#D66B43] hover:bg-[#D66B43]/10 transition-colors cursor-pointer"
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

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#F5EFE6] scrollbar-thin">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center space-y-1">
                        <CheckCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                        <p className="text-xs font-semibold text-[#252522]">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() =>
                            setNotifications((prev) =>
                              prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
                            )
                          }
                          className={`p-3.5 hover:bg-[#FAF8F5] transition-colors cursor-pointer flex items-start gap-3 ${
                            !notif.read ? "bg-[#FAF6F0]/60" : ""
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#D66B43]/10 text-[#D66B43] flex items-center justify-center shrink-0 mt-0.5">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className={`text-xs font-bold truncate ${!notif.read ? "text-[#252522]" : "text-[#5C5954]"}`}>
                                {notif.title}
                              </span>
                              <span className="text-[10px] text-[#8C877D] shrink-0">{notif.time}</span>
                            </div>
                            <p className="text-[11px] text-[#736E65] leading-relaxed line-clamp-2">
                              {notif.message}
                            </p>
                          </div>
                          {!notif.read && <span className="w-2 h-2 rounded-full bg-[#D66B43] shrink-0 mt-2" />}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <Link
              href="/login"
              title={`Signed in as ${displayName} • Click to switch or sign out`}
              className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#ECE7DE] hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-[#D66B43] to-[#F4A261] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={displayName}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <span className="text-xs font-bold text-[#252522] group-hover:text-[#D66B43] transition-colors truncate max-w-[130px]">
                {displayName}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#6E6D66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for food, restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-full bg-white border border-[#ECE7DE] text-xs text-[#252522] placeholder:text-[#6E6D66] focus:outline-none focus:border-[#D66B43] shadow-xs"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
