"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  MenuItem,
  Order,
  RestaurantInfo,
  CartItem,
  OrderType,
  OrderStatus,
  PaymentMethod,
} from "@/types";
import {
  initialMenuItems,
  initialOrders,
  initialRestaurantInfo,
} from "@/data/mockData";

interface RestaurantContextType {
  restaurant: RestaurantInfo;
  menuItems: MenuItem[];
  orders: Order[];
  cart: CartItem[];
  orderType: OrderType;
  selectedTable: number;
  pickupTime: string;
  customerName: string;
  customerPhone: string;
  
  setOrderType: (type: OrderType) => void;
  setSelectedTable: (table: number) => void;
  setPickupTime: (time: string) => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  
  addToCart: (
    item: MenuItem,
    quantity?: number,
    customizations?: string[],
    instructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => { subtotal: number; tax: number; total: number; count: number };
  
  placeOrder: (paymentMethod: PaymentMethod, payAtCounter?: boolean, notes?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  toggleItemAvailability: (itemId: string) => void;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  resetAllData: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENU: "dineflow_menu_items",
  ORDERS: "dineflow_orders",
  INFO: "dineflow_info",
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [restaurant, setRestaurant] = useState<RestaurantInfo>(initialRestaurantInfo);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [selectedTable, setSelectedTable] = useState<number>(4);
  const [pickupTime, setPickupTime] = useState<string>("In 15 mins");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");

  useEffect(() => {
    try {
      const savedMenu = localStorage.getItem(STORAGE_KEYS.MENU);
      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      const savedInfo = localStorage.getItem(STORAGE_KEYS.INFO);

      if (savedMenu) setMenuItems(JSON.parse(savedMenu));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedInfo) setRestaurant(JSON.parse(savedInfo));
    } catch (e) {
      console.warn("Could not load localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
    } catch (e) {}
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    customizations: string[] = [],
    instructions?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.menuItemId === item.id &&
          JSON.stringify(ci.selectedCustomizations.sort()) ===
            JSON.stringify(customizations.sort())
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (instructions) {
          updated[existingIndex].specialInstructions = instructions;
        }
        return updated;
      }

      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity,
        selectedCustomizations: customizations,
        specialInstructions: instructions,
        image: item.image,
      };

      return [...prev, newCartItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, tax, total, count };
  };

  const placeOrder = (
    paymentMethod: PaymentMethod,
    payAtCounter = false,
    notes?: string
  ): Order => {
    const { subtotal, tax, total } = getCartTotal();
    const token = Math.floor(10 + Math.random() * 89);
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;

    const newOrder: Order = {
      id: orderId,
      tokenNumber: token,
      orderType,
      tableNumber: orderType === "dine-in" ? selectedTable : undefined,
      customerName: customerName || (orderType === "dine-in" ? `Table ${selectedTable} Guest` : "Takeaway Guest"),
      customerPhone: customerPhone || undefined,
      items: [...cart],
      subtotal,
      tax,
      totalAmount: total,
      status: "pending",
      paymentStatus: payAtCounter ? "pay_at_counter" : "paid",
      paymentMethod,
      pickupTime: orderType === "takeaway" ? pickupTime : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, status, updatedAt: new Date().toISOString() }
          : ord
      )
    );
  };

  const toggleItemAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteMenuItem = (itemId: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const resetAllData = () => {
    setRestaurant(initialRestaurantInfo);
    setMenuItems(initialMenuItems);
    setOrders(initialOrders);
    setCart([]);
    try {
      localStorage.clear();
    } catch (e) {}
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
        menuItems,
        orders,
        cart,
        orderType,
        selectedTable,
        pickupTime,
        customerName,
        customerPhone,
        setOrderType,
        setSelectedTable,
        setPickupTime,
        setCustomerName,
        setCustomerPhone,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        placeOrder,
        updateOrderStatus,
        toggleItemAvailability,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        resetAllData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};
