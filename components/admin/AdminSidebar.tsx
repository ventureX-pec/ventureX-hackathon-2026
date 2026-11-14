"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Bell,
  ChefHat,
  Package,
  UtensilsCrossed,
  Layers,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Flame,
  PanelLeftClose,
  ChevronRight,
} from "lucide-react";

export type AdminTab =
  | "overview"
  | "orders"
  | "kitchen"
  | "pickup"
  | "menu"
  | "ingredients"
  | "revenue"
  | "staff"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  ordersCount?: number;
  width?: number;
  onWidthChange?: (w: number) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  ordersCount = 24,
  width = 260,
  onWidthChange,
  isOpen = true,
  onToggle,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Drag resizing handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !onWidthChange) return;
      const newWidth = Math.min(Math.max(e.clientX, 200), 380);
      onWidthChange(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, onWidthChange]);

  const navGroups = [
    {
      group: "OPERATIONS",
      items: [
        { id: "overview" as AdminTab, label: "Overview", icon: LayoutDashboard },
        { id: "orders" as AdminTab, label: "Orders", icon: Bell, badge: ordersCount },
        { id: "kitchen" as AdminTab, label: "Kitchen", icon: ChefHat },
        { id: "pickup" as AdminTab, label: "Pickup Queue", icon: Package },
      ],
    },
    {
      group: "RESTAURANT",
      items: [
        { id: "menu" as AdminTab, label: "Menu Management", icon: UtensilsCrossed },
        { id: "ingredients" as AdminTab, label: "Ingredients", icon: Layers },
        { id: "revenue" as AdminTab, label: "Revenue", icon: BarChart3 },
      ],
    },
    {
      group: "MANAGEMENT",
      items: [
        { id: "staff" as AdminTab, label: "Staff", icon: Users },
        { id: "settings" as AdminTab, label: "Settings", icon: Settings },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <aside
      ref={sidebarRef}
      style={{ width: `${width}px` }}
      className="fixed top-0 left-0 bottom-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-xl border-r border-[#ECE5DA] shadow-[4px_0_24px_rgba(37,37,34,0.03)] flex flex-col justify-between select-none"
    >
      {/* Top Header & Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-5 scrollbar-thin">
        {/* Brand Header */}
        <div className="flex items-center justify-between gap-2 px-2 pb-5 border-b border-[#EFE8DE] mb-5">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="ServeZa Logo"
              className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-[#252522] block leading-none">
                Serve<span className="text-[#D66B43]">Za</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#8C877D] uppercase">
                Admin Workspace
              </span>
            </div>
          </Link>

          {/* Collapse Button */}
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-[#8C877D] hover:text-[#252522] hover:bg-[#F0EAE1] transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1.5">
              <div className="px-3 text-[10px] font-bold tracking-wider text-[#8C877D] uppercase">
                {group.group}
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#D66B43] to-[#E87A48] text-white shadow-[0_4px_14px_rgba(214,107,67,0.35)] font-semibold"
                          : "text-[#5C5954] hover:text-[#252522] hover:bg-[#F2ECE2]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#7A756D]"}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && item.badge > 0 && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive
                              ? "bg-white/25 text-white"
                              : "bg-[#D66B43] text-white shadow-xs"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile / Quick Info */}
      <div className="p-3 border-t border-[#EFE8DE] bg-[#FAF8F5]">
        <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-[#F2ECE2] transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#D66B43]/15 text-[#D66B43] font-bold text-xs flex items-center justify-center shrink-0">
              AS
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#252522] truncate">Aarav Sharma</div>
              <div className="text-[10px] text-[#8C877D] truncate">Kitchen Admin</div>
            </div>
          </div>

          <Link
            href="/customer"
            className="p-1.5 rounded-xl text-[#8C877D] hover:text-[#D66B43] hover:bg-white transition-colors"
            title="Switch to Customer View"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Draggable Resize Handle */}
      {onWidthChange && (
        <div
          onMouseDown={() => setIsResizing(true)}
          className={`absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-[#D66B43]/40 transition-colors ${
            isResizing ? "bg-[#D66B43] w-1" : "bg-transparent"
          }`}
          title="Drag to resize sidebar"
        />
      )}
    </aside>
  );
};
