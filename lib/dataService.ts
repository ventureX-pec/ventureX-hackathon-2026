import { AdminOrder, AdminIngredient, AdminStaffMember, INITIAL_ADMIN_ORDERS, INITIAL_ADMIN_INGREDIENTS, INITIAL_ADMIN_STAFF } from "@/data/mockAdminData";
import { MenuItem, MENU_ITEMS } from "@/data/mockCustomerData";

const STORAGE_KEYS = {
  ORDERS: "serveza_orders",
  DISHES: "serveza_dishes",
  INGREDIENTS: "serveza_ingredients",
  STAFF: "serveza_staff",
  ACTIVE_ORDER: "serveza_active_order",
  CART: "serveza_cart",
  FAVORITES: "serveza_favorites",
};

// Cross-tab broadcast channel for instantaneous reactive updates
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  broadcastChannel = new BroadcastChannel("serveza_sync_channel");
}

function broadcastEvent(type: string, payload?: any) {
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type, payload, timestamp: Date.now() });
  }
}

/**
 * Register a listener for cross-tab and live sync events
 */
export function subscribeToDataChanges(callback: (event: { type: string; payload?: any }) => void) {
  if (typeof window === "undefined") return () => {};

  const handleBroadcast = (e: MessageEvent) => {
    if (e.data && e.data.type) {
      callback(e.data);
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key && Object.values(STORAGE_KEYS).includes(e.key)) {
      callback({ type: e.key, payload: e.newValue ? JSON.parse(e.newValue) : null });
    }
  };

  broadcastChannel?.addEventListener("message", handleBroadcast);
  window.addEventListener("storage", handleStorage);

  return () => {
    broadcastChannel?.removeEventListener("message", handleBroadcast);
    window.removeEventListener("storage", handleStorage);
  };
}

// ============================================================================
// ORDERS: Supabase Database + LocalStorage Synchronized Layer
// ============================================================================

export function getStoredOrders(): AdminOrder[] {
  if (typeof window === "undefined") return INITIAL_ADMIN_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("[DataService] Error reading orders:", e);
  }
  return INITIAL_ADMIN_ORDERS;
}

export function saveStoredOrders(orders: AdminOrder[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    broadcastEvent("ORDERS_UPDATED", orders);
  } catch (e) {
    console.error("[DataService] Error saving orders:", e);
  }
}

/**
 * Fetches live orders from Supabase (/api/orders) and syncs local storage
 */
export async function fetchLiveOrders(): Promise<AdminOrder[]> {
  try {
    const res = await fetch("/api/orders");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.orders)) {
      saveStoredOrders(data.orders);
      return data.orders;
    }
  } catch (err) {
    console.warn("[DataService] Fallback to cached orders:", err);
  }
  return getStoredOrders();
}

/**
 * Creates an order in Supabase and updates local store
 */
export async function createLiveOrder(order: AdminOrder): Promise<AdminOrder> {
  // 1. Immediately save to local storage for zero-latency UI response
  const current = getStoredOrders();
  const updated = [order, ...current.filter((o) => o.id !== order.id)];
  saveStoredOrders(updated);

  // 2. Persist to Supabase Database
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.order) {
        const synced = [data.order, ...current.filter((o) => o.id !== order.id)];
        saveStoredOrders(synced);
        return data.order;
      }
    }
  } catch (err) {
    console.error("[DataService] Error posting order to backend:", err);
  }

  return order;
}

/**
 * Updates order status in Supabase and updates local store
 */
export async function updateLiveOrderStatus(
  orderId: string,
  newStatus: AdminOrder["status"],
  prepTimeEstimate?: string
): Promise<AdminOrder[]> {
  const current = getStoredOrders();
  const updated = current.map((ord) => {
    if (ord.id === orderId) {
      return {
        ...ord,
        status: newStatus,
        prepTimeEstimate:
          prepTimeEstimate ||
          (newStatus === "ready"
            ? "Ready for shelf"
            : newStatus === "completed"
            ? "Handed over"
            : ord.prepTimeEstimate),
      };
    }
    return ord;
  });

  saveStoredOrders(updated);

  // Sync with Supabase Database
  try {
    fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status: newStatus, prepTimeEstimate }),
    }).catch((e) => console.warn("[DataService] Async patch error:", e));
  } catch (err) {
    console.error("[DataService] Patch failed:", err);
  }

  return updated;
}

// ============================================================================
// DISHES & MENU PERSISTENCE
// ============================================================================

export function getStoredDishes(): MenuItem[] {
  if (typeof window === "undefined") return MENU_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DISHES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("[DataService] Error reading dishes:", e);
  }
  return MENU_ITEMS;
}

export function saveStoredDishes(dishes: MenuItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.DISHES, JSON.stringify(dishes));
    broadcastEvent("DISHES_UPDATED", dishes);
  } catch (e) {
    console.error("[DataService] Error saving dishes:", e);
  }
}

// ============================================================================
// INGREDIENTS & STOCK PERSISTENCE
// ============================================================================

export function getStoredIngredients(): AdminIngredient[] {
  if (typeof window === "undefined") return INITIAL_ADMIN_INGREDIENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INGREDIENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("[DataService] Error reading ingredients:", e);
  }
  return INITIAL_ADMIN_INGREDIENTS;
}

export function saveStoredIngredients(ingredients: AdminIngredient[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(ingredients));
    broadcastEvent("INGREDIENTS_UPDATED", ingredients);
  } catch (e) {
    console.error("[DataService] Error saving ingredients:", e);
  }
}

// ============================================================================
// STAFF PERSISTENCE
// ============================================================================

export function getStoredStaff(): AdminStaffMember[] {
  if (typeof window === "undefined") return INITIAL_ADMIN_STAFF;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STAFF);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("[DataService] Error reading staff:", e);
  }
  return INITIAL_ADMIN_STAFF;
}

export function saveStoredStaff(staff: AdminStaffMember[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
    broadcastEvent("STAFF_UPDATED", staff);
  } catch (e) {
    console.error("[DataService] Error saving staff:", e);
  }
}

// ============================================================================
// CUSTOMER ACTIVE ORDER, CART, & FAVORITES PERSISTENCE
// ============================================================================

export function getStoredActiveOrder(): any | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_ORDER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("[DataService] Error reading active order:", e);
  }
  return null;
}

export function saveStoredActiveOrder(order: any | null) {
  if (typeof window === "undefined") return;
  try {
    if (order) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ORDER, JSON.stringify(order));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_ORDER);
    }
    broadcastEvent("ACTIVE_ORDER_UPDATED", order);
  } catch (e) {
    console.error("[DataService] Error saving active order:", e);
  }
}

export function getStoredCart(): any[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("[DataService] Error reading cart:", e);
  }
  return [];
}

export function saveStoredCart(cart: any[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (e) {
    console.error("[DataService] Error saving cart:", e);
  }
}

export function getStoredFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("[DataService] Error reading favorites:", e);
  }
  return [];
}

export function saveStoredFavorites(favs: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
  } catch (e) {
    console.error("[DataService] Error saving favorites:", e);
  }
}
