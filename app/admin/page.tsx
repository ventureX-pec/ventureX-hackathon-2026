"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AdminSidebar, AdminTab } from "@/components/admin/AdminSidebar";
import { AdminTopHeader } from "@/components/admin/AdminTopHeader";
import { AdminBackdrop } from "@/components/admin/AdminBackdrop";
import { CursorTrail } from "@/components/motion/CursorTrail";

// Data & Persistence Service
import {
  fetchLiveOrders,
  getStoredOrders,
  updateLiveOrderStatus,
  getStoredDishes,
  saveStoredDishes,
  getStoredIngredients,
  saveStoredIngredients,
  getStoredStaff,
  saveStoredStaff,
  subscribeToDataChanges,
} from "@/lib/dataService";

// Views
import { OverviewView } from "@/components/admin/views/OverviewView";
import { OrdersView } from "@/components/admin/views/OrdersView";
import { KitchenView } from "@/components/admin/views/KitchenView";
import { PickupQueueView } from "@/components/admin/views/PickupQueueView";
import { MenuManagementView } from "@/components/admin/views/MenuManagementView";
import { IngredientsView } from "@/components/admin/views/IngredientsView";
import { RevenueView } from "@/components/admin/views/RevenueView";
import { StaffView } from "@/components/admin/views/StaffView";
import { SettingsView } from "@/components/admin/views/SettingsView";

// Modals
import { AddDishModal } from "@/components/admin/modals/AddDishModal";
import { UpdateStockModal } from "@/components/admin/modals/UpdateStockModal";
import { AddStaffModal } from "@/components/admin/modals/AddStaffModal";
import { OrderDetailsModal } from "@/components/admin/modals/OrderDetailsModal";
import { PickupPassModal } from "@/components/admin/modals/PickupPassModal";

// Data
import {
  INITIAL_ADMIN_STATS,
  INITIAL_ADMIN_ORDERS,
  INITIAL_ADMIN_INGREDIENTS,
  INITIAL_ADMIN_STAFF,
  AdminOrder,
  AdminIngredient,
  AdminStaffMember,
} from "@/data/mockAdminData";
import { MENU_ITEMS, MenuItem } from "@/data/mockCustomerData";

export default function AdminDashboardPage() {
  // Navigation & Active View State
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Sidebar Resizable & Collapsible State
  const [sidebarWidth, setSidebarWidth] = useState<number>(260);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Core Kitchen State (Hydrated from persistent storage & Supabase)
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS);
  const [dishes, setDishes] = useState<MenuItem[]>(MENU_ITEMS);
  const [ingredients, setIngredients] =
    useState<AdminIngredient[]>(INITIAL_ADMIN_INGREDIENTS);
  const [staffList, setStaffList] =
    useState<AdminStaffMember[]>(INITIAL_ADMIN_STAFF);

  // Hydrate persistent state on mount & fetch live Supabase orders
  useEffect(() => {
    // 1. Instantly load locally saved state so there is zero flicker or hardcoded reset
    setOrders(getStoredOrders());
    setDishes(getStoredDishes());
    setIngredients(getStoredIngredients());
    setStaffList(getStoredStaff());

    // 2. Fetch live database orders from Supabase
    fetchLiveOrders().then((liveOrders) => {
      if (liveOrders && liveOrders.length > 0) {
        setOrders(liveOrders);
      }
    });

    // 3. Listen to cross-tab updates (e.g. customer places an order on /customer)
    const unsubscribe = subscribeToDataChanges((event) => {
      if (event.type === "ORDERS_UPDATED" && Array.isArray(event.payload)) {
        setOrders(event.payload);
      } else if (event.type === "DISHES_UPDATED" && Array.isArray(event.payload)) {
        setDishes(event.payload);
      } else if (event.type === "INGREDIENTS_UPDATED" && Array.isArray(event.payload)) {
        setIngredients(event.payload);
      } else if (event.type === "STAFF_UPDATED" && Array.isArray(event.payload)) {
        setStaffList(event.payload);
      }
    });

    return () => unsubscribe();
  }, []);

  // Modals Open State
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [selectedIngredientForUpdate, setSelectedIngredientForUpdate] =
    useState<AdminIngredient | null>(null);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [inspectingOrder, setInspectingOrder] = useState<AdminOrder | null>(null);
  const [isPickupPassOpen, setIsPickupPassOpen] = useState(false);

  // Dynamic Calculated Stats based on live state
  const stats = useMemo(() => {
    const totalOrders = orders.length + 117; // offset with historical baseline
    const inKitchen = orders.filter(
      (o) => o.status === "new" || o.status === "accepted" || o.status === "preparing"
    ).length;
    const completed = orders.filter((o) => o.status === "completed").length + 75;
    const todayRevenue =
      orders.reduce((sum, o) => sum + o.totalAmount, 0) + 22450;

    return {
      totalOrders,
      totalOrdersTrend: "+12%",
      inKitchen,
      completed,
      completedTrend: "+8%",
      todayRevenue,
      todayRevenueTrend: "+14%",
    };
  }, [orders]);

  // Order status transitions (Persisted to Supabase Database + LocalStorage)
  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: AdminOrder["status"]
  ) => {
    updateLiveOrderStatus(orderId, newStatus).then((updated) => {
      setOrders(updated);
    });
  };

  // Toggle dish availability (Persisted across refreshes)
  const handleToggleDishAvailability = (dishId: string) => {
    setDishes((prev) => {
      const updated = prev.map((d) => {
        if (d.id === dishId) {
          const current = (d as any).isAvailable !== false;
          return { ...d, isAvailable: !current };
        }
        return d;
      });
      saveStoredDishes(updated);
      return updated;
    });
  };

  // Add new dish (Persisted across refreshes)
  const handleAddDish = (newDish: MenuItem) => {
    setDishes((prev) => {
      const updated = [newDish, ...prev];
      saveStoredDishes(updated);
      return updated;
    });
  };

  // Update ingredient stock (Persisted across refreshes)
  const handleUpdateStock = (
    id: string,
    newStock: string,
    status: AdminIngredient["status"]
  ) => {
    setIngredients((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              currentStock: newStock,
              status,
              lastUpdated: "Just now",
            }
          : item
      );
      saveStoredIngredients(updated);
      return updated;
    });
  };

  // Add staff member (Persisted across refreshes)
  const handleAddStaff = (newStaff: AdminStaffMember) => {
    setStaffList((prev) => {
      const updated = [...prev, newStaff];
      saveStoredStaff(updated);
      return updated;
    });
  };

  // Quick Action Handler from Overview
  const handleQuickAction = (
    action: "add-item" | "update-stock" | "manage-staff" | "pickup-pass"
  ) => {
    switch (action) {
      case "add-item":
        setIsAddDishOpen(true);
        break;
      case "update-stock":
        setSelectedIngredientForUpdate(ingredients[0]);
        break;
      case "manage-staff":
        setActiveTab("staff");
        break;
      case "pickup-pass":
        setIsPickupPassOpen(true);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#252522] selection:bg-[#D66B43]/20 selection:text-[#D66B43] relative overflow-x-hidden isolate">
      {/* Editorial Food Photography Background (Framed to match reference) */}
      <AdminBackdrop isSidebarOpen={isSidebarOpen} sidebarWidth={sidebarWidth} />

      {/* Light subtle cursor trail */}
      <CursorTrail />

      {/* Fixed Admin Sidebar with Drag-to-Resize Handle */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSearchQuery("");
        }}
        ordersCount={orders.filter((o) => o.status !== "completed").length}
        width={sidebarWidth}
        onWidthChange={setSidebarWidth}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Admin Workspace Content Area */}
      <div
        className="relative z-10 flex flex-col min-h-screen transition-all duration-300 ease-out"
        style={{
          paddingLeft: isSidebarOpen ? `${sidebarWidth}px` : "0px",
        }}
      >
        {/* Top Header */}
        <AdminTopHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          activeOrdersCount={orders.filter((o) => o.status !== "completed").length}
          onOpenKitchen={() => setActiveTab("kitchen")}
        />

        {/* Dashboard Body */}
        <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 pb-28 lg:pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "overview" && (
                <OverviewView
                  stats={stats}
                  liveOrders={orders}
                  onViewAllOrders={() => setActiveTab("orders")}
                  onOpenOrder={(order) => setInspectingOrder(order)}
                  onQuickAction={handleQuickAction}
                />
              )}

              {activeTab === "orders" && (
                <OrdersView
                  orders={orders}
                  onUpdateStatus={handleUpdateOrderStatus}
                  onOpenOrder={(order) => setInspectingOrder(order)}
                  searchQuery={searchQuery}
                />
              )}

              {activeTab === "kitchen" && (
                <KitchenView
                  orders={orders}
                  onUpdateStatus={handleUpdateOrderStatus}
                />
              )}

              {activeTab === "pickup" && (
                <PickupQueueView
                  orders={orders}
                  onCompleteOrder={(id) => handleUpdateOrderStatus(id, "completed")}
                  onOpenQrScanner={() => setIsPickupPassOpen(true)}
                />
              )}

              {activeTab === "menu" && (
                <MenuManagementView
                  dishes={dishes}
                  onToggleAvailability={handleToggleDishAvailability}
                  onOpenAddModal={() => setIsAddDishOpen(true)}
                  onDeleteDish={(id) =>
                    setDishes((prev) => prev.filter((d) => d.id !== id))
                  }
                />
              )}

              {activeTab === "ingredients" && (
                <IngredientsView
                  ingredients={ingredients}
                  onOpenUpdateModal={(ing) => setSelectedIngredientForUpdate(ing)}
                />
              )}

              {activeTab === "revenue" && <RevenueView />}

              {activeTab === "staff" && (
                <StaffView
                  staffList={staffList}
                  onOpenAddStaffModal={() => setIsAddStaffOpen(true)}
                />
              )}

              {activeTab === "settings" && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ============================================================ */}
      {/* MODALS & DRAWERS                                              */}
      {/* ============================================================ */}

      {/* 1. Add Dish Modal */}
      <AddDishModal
        isOpen={isAddDishOpen}
        onClose={() => setIsAddDishOpen(false)}
        onAddDish={handleAddDish}
      />

      {/* 2. Update Stock Modal */}
      <UpdateStockModal
        isOpen={!!selectedIngredientForUpdate}
        ingredient={selectedIngredientForUpdate}
        onClose={() => setSelectedIngredientForUpdate(null)}
        onSave={handleUpdateStock}
      />

      {/* 3. Add Staff Modal */}
      <AddStaffModal
        isOpen={isAddStaffOpen}
        onClose={() => setIsAddStaffOpen(false)}
        onAddStaff={handleAddStaff}
      />

      {/* 4. Order Details Modal */}
      <OrderDetailsModal
        order={inspectingOrder}
        onClose={() => setInspectingOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      {/* 5. Pickup Pass / QR Scanner Modal */}
      <PickupPassModal
        isOpen={isPickupPassOpen}
        orders={orders}
        onClose={() => setIsPickupPassOpen(false)}
        onConfirmPickup={(orderId) =>
          handleUpdateOrderStatus(orderId, "completed")
        }
      />
    </div>
  );
}
