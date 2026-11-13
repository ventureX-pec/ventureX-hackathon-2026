"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDineFlow } from "@/context/DineFlowContext"
import {
  LayoutDashboard,
  UtensilsCrossed,
  ChefHat,
  BookOpen,
  Boxes,
  Clock,
  Users,
  BarChart3,
  Store,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Menu as MenuIcon,
  X,
} from "lucide-react"

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const {
    currentRestaurant,
    toggleRestaurantOpenStatus,
    orders,
    kitchenWorkload,
  } = useDineFlow()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const activeOrdersCount = orders.filter(
    (o) => o.status === "new" || o.status === "preparing"
  ).length

  const navItems = [
    { label: "Overview", href: "/owner", icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      label: "Live Orders",
      href: "/owner/orders",
      icon: <UtensilsCrossed className="w-4 h-4" />,
      badge: activeOrdersCount > 0 ? activeOrdersCount : undefined,
    },
    {
      label: "Smart Kitchen",
      href: "/owner/kitchen",
      icon: <ChefHat className="w-4 h-4" />,
      alert: kitchenWorkload.isNearCapacity,
    },
    { label: "Menu Management", href: "/owner/menu", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Inventory", href: "/owner/inventory", icon: <Boxes className="w-4 h-4" /> },
    { label: "Pickup Slots", href: "/owner/pickup-slots", icon: <Clock className="w-4 h-4" /> },
    { label: "Customers", href: "/owner/customers", icon: <Users className="w-4 h-4" /> },
    { label: "Analytics", href: "/owner/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Storefront", href: "/owner/storefront", icon: <Store className="w-4 h-4" /> },
    { label: "Settings", href: "/owner/settings", icon: <Settings className="w-4 h-4" /> },
  ]

  // Find page title based on pathname
  const currentNav = navItems.find((item) => item.href === pathname) || navItems[0]

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col antialiased">
      {/* Top Banner: Quick Persona Switcher to Customer View */}
      <div className="bg-[#1c1917] text-white text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c96342] animate-pulse" />
          <span className="text-[11px] font-medium text-[#d6cbbe]">
            DineFlow Operating System • Restaurant Portal
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[11px] text-[#a8a29e]">
            Logged in as Chef Marcus Vance
          </span>
          <Link
            href={`/r/${currentRestaurant.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#e7dfd5] hover:text-white text-[11px] font-medium transition-all"
          >
            <span>Preview Public Storefront</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c96342] hover:bg-[#a84d31] text-white text-[11px] font-medium transition-all shadow-2xs"
          >
            <span>Switch to Customer App</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* ==================================================== */}
        {/* DESKTOP SIDEBAR */}
        {/* ==================================================== */}
        <aside
          className={`hidden md:flex flex-col bg-white border-r border-[#e7dfd5] transition-all duration-300 z-30 select-none ${
            sidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-[#e7dfd5] flex items-center justify-between">
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#c96342] text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                  {currentRestaurant.logo}
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-sm font-bold text-[#1c1917] truncate leading-tight">
                    {currentRestaurant.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        currentRestaurant.status === "open"
                          ? "bg-[#2e7d32] animate-pulse"
                          : "bg-stone-400"
                      }`}
                    />
                    <span className="text-[10px] text-[#78716c] uppercase tracking-wider font-semibold">
                      {currentRestaurant.status === "open" ? "Kitchen Open" : "Closed"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto w-9 h-9 rounded-xl bg-[#c96342] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {currentRestaurant.logo}
              </div>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-7 h-7 rounded-lg hover:bg-[#f4ede4] text-[#57534e] flex items-center justify-center transition-colors cursor-pointer"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Owner Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-[#c96342] text-white shadow-xs"
                      : "text-[#57534e] hover:bg-[#f4ede4] hover:text-[#1c1917]"
                  } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className={isActive ? "text-white" : "text-[#78716c] group-hover:text-[#c96342]"}>
                    {item.icon}
                  </span>
                  {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!sidebarCollapsed && item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-white text-[#c96342]"
                          : "bg-[#c96342] text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {!sidebarCollapsed && item.alert && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="High Workload" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Bottom / Help & User */}
          <div className="p-3 border-t border-[#e7dfd5] space-y-1">
            {!sidebarCollapsed ? (
              <div className="p-2.5 rounded-2xl bg-[#faf7f2] border border-[#e7dfd5] flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#1c1917] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    MV
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-[#1c1917] truncate leading-tight">
                      Marcus Vance
                    </span>
                    <span className="block text-[10px] text-[#78716c] truncate">
                      Head Chef & Owner
                    </span>
                  </div>
                </div>
                <Link
                  href="/"
                  className="text-[#a8a29e] hover:text-[#c96342] transition-colors p-1"
                  title="Logout / Exit"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="flex justify-center p-2">
                <div className="w-8 h-8 rounded-full bg-[#1c1917] text-white text-xs font-bold flex items-center justify-center">
                  MV
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ==================================================== */}
        {/* MAIN WORKSPACE & TOP BAR */}
        {/* ==================================================== */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#e7dfd5] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden w-8 h-8 rounded-lg bg-[#faf7f2] border border-[#e7dfd5] flex items-center justify-center text-[#57534e]"
                aria-label="Open menu"
              >
                <MenuIcon className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs text-[#78716c]">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="font-medium text-[#1c1917]">{currentNav.label}</span>
                </div>
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] tracking-tight truncate leading-tight">
                  {currentNav.label}
                </h1>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Kitchen Open/Close Quick Switch */}
              <button
                onClick={() => toggleRestaurantOpenStatus()}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                  currentRestaurant.status === "open"
                    ? "bg-[#2e7d32]/10 border-[#2e7d32]/30 text-[#2e7d32]"
                    : "bg-stone-100 border-stone-300 text-stone-600"
                }`}
                title="Toggle restaurant status for online ordering"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentRestaurant.status === "open" ? "bg-[#2e7d32] animate-pulse" : "bg-stone-400"
                  }`}
                />
                <span className="hidden sm:inline">
                  {currentRestaurant.status === "open" ? "Kitchen Open" : "Closed"}
                </span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="w-9 h-9 rounded-full bg-[#faf7f2] border border-[#e7dfd5] hover:bg-[#f4ede4] flex items-center justify-center text-[#57534e] transition-colors relative cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c96342]" />
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-[#e7dfd5] shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#e7dfd5]">
                      <span className="text-xs font-bold text-[#1c1917]">Recent Kitchen Alerts</span>
                      <span className="text-[10px] text-[#c96342] font-semibold">2 unread</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] space-y-1">
                        <span className="font-semibold text-[#1c1917] block">
                          New Order #DF-8421
                        </span>
                        <p className="text-[11px] text-[#57534e]">
                          Table 04 • Char-Grilled Prime Ribeye x1, Blood Orange Soda x2.
                        </p>
                        <span className="text-[9.5px] text-[#a8a29e]">2 mins ago</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1 text-amber-900">
                        <span className="font-semibold block">
                          Low Stock Alert: Truffle Butter
                        </span>
                        <p className="text-[11px] text-amber-800">
                          Stock is at 3 jars (threshold 4). Affects 2 menu dishes.
                        </p>
                        <span className="text-[9.5px] text-amber-700">14 mins ago</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Page Workspace Content */}
          <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MOBILE DRAWER */}
      {/* ==================================================== */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white border-r border-[#e7dfd5] p-5 flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#e7dfd5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#c96342] text-white flex items-center justify-center font-bold text-xs">
                  {currentRestaurant.logo}
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#1c1917]">
                    {currentRestaurant.name}
                  </h3>
                  <span className="text-[10px] text-[#78716c]">Owner Dashboard</span>
                </div>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#f4ede4] flex items-center justify-center text-[#57534e]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    pathname === item.href
                      ? "bg-[#c96342] text-white"
                      : "text-[#57534e] hover:bg-[#f4ede4]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full bg-white text-[#c96342] text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#e7dfd5]">
              <Link
                href="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#1c1917] text-white text-xs font-medium text-center block"
              >
                Return to Customer App
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
