"use client";

import React from "react";
import { Home, UtensilsCrossed, ClipboardList, Heart, User } from "lucide-react";

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  favoritesCount?: number;
  ordersCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount = 0,
  ordersCount = 0,
}) => {
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
    { id: "orders", label: "Orders", icon: ClipboardList, badge: ordersCount > 0 ? ordersCount : undefined },
    { id: "favorites", label: "Favorites", icon: Heart, badge: favoritesCount > 0 ? favoritesCount : undefined },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#ECE7DE] px-3 py-2 shadow-lg safe-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? "text-[#D66B43] font-bold"
                  : "text-[#6E6D66] font-medium hover:text-[#252522]"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-[#D66B43]" : "text-[#6E6D66]"}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#D66B43] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#D66B43] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
