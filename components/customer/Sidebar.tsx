"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Home,
  LayoutGrid,
  UtensilsCrossed,
  ClipboardList,
  Heart,
  PanelLeftClose,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount?: number;
  ordersCount?: number;
  width: number;
  onWidthChange: (w: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  favoritesCount = 0,
  ordersCount = 0,
  width,
  onWidthChange,
  isOpen,
  onToggle,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Updated navigation order: Home -> Categories -> Restaurants -> My Orders -> Favorites
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "categories", label: "Categories", icon: LayoutGrid },
    { id: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
    {
      id: "orders",
      label: "My Orders",
      icon: ClipboardList,
      badge: ordersCount > 0 ? ordersCount : undefined,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: Heart,
      badge: favoritesCount > 0 ? favoritesCount : undefined,
    },
  ];

  // Mouse drag handler for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = Math.max(190, Math.min(380, e.clientX));
      onWidthChange(newWidth);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    if (isDragging) {
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onWidthChange]);

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  if (!isOpen) return null;

  return (
    <aside
      ref={sidebarRef}
      style={{ width: `${width}px` }}
      className="hidden lg:flex fixed left-0 top-0 bottom-0 bg-white border-r border-[#ECE7DE] flex-col justify-between p-6 z-40 transition-all select-none"
    >
      {/* Top Header: Brand Logo & Collapse Button */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="ServeZa Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-bold tracking-tight text-[#252522] truncate">
                  Serve<span className="text-[#D66B43]">Za</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D66B43] flex-shrink-0" />
              </div>
              <span className="text-[10px] text-[#6E6D66] font-medium tracking-wide truncate">
                Zero Wait Food Portal
              </span>
            </div>
          </Link>

          {/* Complete Close / Collapse Button */}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-[#6E6D66] hover:text-[#252522] hover:bg-[#FAF8F3] border border-transparent hover:border-[#ECE7DE] transition-colors"
            title="Collapse Sidebar"
            aria-label="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#D66B43]/10 text-[#D66B43] shadow-xs"
                    : "text-[#6E6D66] hover:text-[#252522] hover:bg-[#FAF8F3]"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-[#D66B43]" : "text-[#6E6D66]"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="w-5 h-5 rounded-full bg-[#D66B43] text-white text-[10px] font-bold flex items-center justify-center shadow-xs flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Clean Bottom Area */}
      <div className="pt-4 border-t border-[#ECE7DE] flex items-center justify-between text-[11px] text-[#6E6D66]">
        <span>Drag right edge to resize</span>
        <button
          onClick={onToggle}
          className="text-[#D66B43] font-semibold hover:underline cursor-pointer"
        >
          Hide
        </button>
      </div>

      {/* Resizable Slider Drag Handle on the Right Edge */}
      <div
        onMouseDown={handleDragStart}
        className={`absolute top-0 right-0 bottom-0 w-2 cursor-col-resize group transition-colors flex items-center justify-center ${
          isDragging ? "bg-[#D66B43]" : "hover:bg-[#D66B43]/30"
        }`}
        title="Drag to resize sidebar width"
      >
        <div
          className={`w-0.5 h-8 rounded-full transition-colors ${
            isDragging ? "bg-white" : "bg-[#ECE7DE] group-hover:bg-[#D66B43]"
          }`}
        />
      </div>
    </aside>
  );
};
