"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

// ==========================================
// DATA MODELS
// ==========================================

export interface Restaurant {
  id: string
  slug: string
  name: string
  logo: string
  coverImage: string
  tagline: string
  description: string
  cuisine: string
  address: string
  phone: string
  email: string
  hours: string
  status: "open" | "closed"
  avgPrepTime: string
  rating: number
  reviewCount: number
  qrCodeUrl: string
  categories: string[]
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  subtitle?: string
  category: "specials" | "mains" | "starters" | "desserts" | "beverages"
  description: string
  price: number
  image: string
  prepTimeMinutes: number
  rating: number
  reviewCount: number
  isVeg: boolean
  isGlutenFree?: boolean
  isChefSpecial?: boolean
  ingredients: string[] // List of ingredient names
  calories?: number
  isAvailable: boolean
}

export interface Ingredient {
  id: string
  restaurantId: string
  name: string
  currentStock: number
  unit: string
  lowStockThreshold: number
  isAvailable: boolean
  affectedDishIds: string[]
}

export interface CartItem {
  item: MenuItem
  quantity: number
  instructions?: string
  customizations?: string[]
}

export interface Order {
  id: string
  orderNumber: string
  restaurantId: string
  restaurantName: string
  customerName: string
  customerPhone: string
  items: CartItem[]
  diningOption: "dine-in" | "takeaway"
  tableNumber?: string
  pickupSlot: string
  subtotal: number
  tax: number
  serviceFee: number
  total: number
  status: "new" | "preparing" | "ready" | "completed" | "cancelled"
  orderTime: string
  promisedTime: string
  preparationProgress: number
  specialInstructions?: string
}

export interface PickupSlot {
  time: string
  maxCapacity: number
  bookedCount: number
  status: "available" | "filling" | "full"
}

export interface CustomerProfile {
  id: string
  name: string
  phone: string
  email: string
  totalOrders: number
  totalSpent: number
  favoriteDishes: string[]
  lastOrderDate: string
}

// ==========================================
// SEED DEMO DATA
// ==========================================

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: "the-corner-table",
    slug: "the-corner-table",
    name: "The Corner Table",
    logo: "CT",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
    tagline: "Artisanal Kitchen & Hearth",
    description: "An independent neighborhood restaurant bringing thoughtful cooking together with honest seasonal ingredients and zero-wait pickup.",
    cuisine: "Artisanal European & Hearth",
    address: "42 Heritage Lane, Culinary District, Metro 10001",
    phone: "+1 (555) 234-5678",
    email: "hello@thecornertable.com",
    hours: "11:30 AM – 10:00 PM",
    status: "open",
    avgPrepTime: "12-16 min",
    rating: 4.9,
    reviewCount: 380,
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://dineflow.app/r/the-corner-table",
    categories: ["specials", "mains", "starters", "desserts", "beverages"],
  },
  {
    id: "spice-symphony",
    slug: "spice-symphony",
    name: "Spice Symphony",
    logo: "SS",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
    tagline: "Contemporary Clay-Oven & Curries",
    description: "Slow-braised regional curries, tandoori marinades, and fresh-baked za'atar naan crafted over live coal hearths.",
    cuisine: "Contemporary Indian",
    address: "18 Royal Crescent, Spice Market, Metro 10004",
    phone: "+1 (555) 891-2345",
    email: "dine@spicesymphony.com",
    hours: "12:00 PM – 10:30 PM",
    status: "open",
    avgPrepTime: "15-20 min",
    rating: 4.8,
    reviewCount: 290,
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://dineflow.app/r/spice-symphony",
    categories: ["specials", "mains", "starters", "desserts", "beverages"],
  },
  {
    id: "verde-trattoria",
    slug: "verde-trattoria",
    name: "Verde Trattoria",
    logo: "VT",
    coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80",
    tagline: "Hand-Rolled Pasta & Woodfired Focaccia",
    description: "Old-world Italian recipes using organic semolina, 24-month aged Parmigiano, and San Marzano tomatoes.",
    cuisine: "Authentic Italian",
    address: "88 Bellissimo Way, Metro 10002",
    phone: "+1 (555) 432-1098",
    email: "ciao@verdetrattoria.com",
    hours: "11:00 AM – 9:30 PM",
    status: "open",
    avgPrepTime: "14-18 min",
    rating: 4.7,
    reviewCount: 215,
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://dineflow.app/r/verde-trattoria",
    categories: ["mains", "starters", "desserts", "beverages"],
  },
  {
    id: "sakura-izakaya",
    slug: "sakura-izakaya",
    name: "Sakura Robata & Izakaya",
    logo: "SK",
    coverImage: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&auto=format&fit=crop&q=80",
    tagline: "Binchotan Charcoal Grill & Nigiri",
    description: "Crispy skin robata skewers, flash-seared wagyu tataki, and hand-molded nigiri flown in fresh from regional fisheries.",
    cuisine: "Japanese Robata",
    address: "71 Cherry Blossom Blvd, Metro 10006",
    phone: "+1 (555) 765-4321",
    email: "service@sakuraizakaya.com",
    hours: "12:30 PM – 11:00 PM",
    status: "open",
    avgPrepTime: "10-15 min",
    rating: 4.9,
    reviewCount: 420,
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://dineflow.app/r/sakura-izakaya",
    categories: ["specials", "mains", "starters", "beverages"],
  },
]

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // The Corner Table Dishes
  {
    id: "dish-1",
    restaurantId: "the-corner-table",
    name: "Char-Grilled Prime Ribeye",
    subtitle: "Rosemary & Truffle Compound Glaze",
    category: "specials",
    description: "Dry-aged prime ribeye seared over hickory embers, finished with black truffle compound butter, confit garlic, and roasted baby potatoes.",
    price: 680,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
    prepTimeMinutes: 14,
    rating: 4.9,
    reviewCount: 142,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    ingredients: ["Prime Ribeye", "Truffle Butter", "Garlic Confit", "Fresh Rosemary"],
    calories: 680,
    isAvailable: true,
  },
  {
    id: "dish-2",
    restaurantId: "the-corner-table",
    name: "Mediterranean Mezze & Feta Salad",
    subtitle: "Cold-Pressed EVOO & Herb Za'atar",
    category: "starters",
    description: "Crisp organic greens, Persian cucumbers, heirloom tomatoes, sheep's milk feta, Kalamata olives, and citrus oregano vinaigrette.",
    price: 380,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80",
    prepTimeMinutes: 8,
    rating: 4.8,
    reviewCount: 112,
    isVeg: true,
    isGlutenFree: true,
    isChefSpecial: true,
    ingredients: ["Organic Greens", "Kalamata Olives", "Sheep's Milk Feta", "Cold-Pressed EVOO"],
    calories: 340,
    isAvailable: true,
  },
  {
    id: "dish-3",
    restaurantId: "the-corner-table",
    name: "Pan-Seared Wild Atlantic Salmon",
    subtitle: "Lemon Herb Arborio Risotto",
    category: "mains",
    description: "Crispy skin Atlantic salmon over slow-simmered lemon-herb arborio risotto with tender spring asparagus and dill oil emulsion.",
    price: 590,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&auto=format&fit=crop&q=80",
    prepTimeMinutes: 12,
    rating: 4.9,
    reviewCount: 198,
    isVeg: false,
    isGlutenFree: true,
    isChefSpecial: true,
    ingredients: ["Atlantic Wild Salmon", "Arborio Rice", "Fresh Asparagus", "Dill Herb Oil"],
    calories: 520,
    isAvailable: true,
  },
  {
    id: "dish-4",
    restaurantId: "the-corner-table",
    name: "Artisanal Avocado & Egg Tartine",
    subtitle: "Toasted Country Sourdough",
    category: "starters",
    description: "Thick-cut country sourdough with crushed ripe Hass avocado, pasture-raised poached eggs, microgreens, and Aleppo chili crunch.",
    price: 340,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700&auto=format&fit=crop&q=80",
    prepTimeMinutes: 9,
    rating: 4.7,
    reviewCount: 95,
    isVeg: true,
    isGlutenFree: false,
    ingredients: ["Country Sourdough", "Hass Avocado", "Pasture Eggs", "Microgreens"],
    calories: 410,
    isAvailable: true,
  },
  {
    id: "dish-5",
    restaurantId: "the-corner-table",
    name: "Wood-Fired Wild Mushroom Risotto",
    subtitle: "Truffle Peperoncino & Aged Grana",
    category: "mains",
    description: "Forest foraged chanterelle and portobello mushrooms, carnaroli arborio, white wine reduction, and 24-month aged Grana Padano.",
    price: 490,
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=700&auto=format&fit=crop&q=80",
    prepTimeMinutes: 13,
    rating: 4.8,
    reviewCount: 88,
    isVeg: true,
    isGlutenFree: true,
    ingredients: ["Wild Mushrooms", "Arborio Rice", "Grana Padano", "Truffle Butter"],
    calories: 480,
    isAvailable: true,
  },
  {
    id: "dish-6",
    restaurantId: "the-corner-table",
    name: "Valrhona Dark Chocolate Ganache Fondant",
    subtitle: "Smoked Sea Salt & Madagascar Bean Gelato",
    category: "desserts",
    description: "Molten center 70% French Valrhona chocolate cake, paired with cold-churned Madagascar vanilla bean gelato and crushed cocoa nibs.",
    price: 290,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=80",
    prepTimeMinutes: 7,
    rating: 4.9,
    reviewCount: 164,
    isVeg: true,
    isChefSpecial: true,
    ingredients: ["Valrhona Chocolate", "Madagascar Gelato", "Grass-fed Butter"],
    calories: 460,
    isAvailable: true,
  },
  {
    id: "dish-7",
    restaurantId: "the-corner-table",
    name: "Blood Orange & Rosemary Hearth Soda",
    subtitle: "Sparkling House Botanical Extract",
    category: "beverages",
    description: "Cold-pressed Sicilian blood orange, charred rosemary syrup, sparkling mountain spring water, and crushed aromatic juniper.",
    price: 190,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=700&auto=format&fit=crop&q=80",
    prepTimeMinutes: 3,
    rating: 4.8,
    reviewCount: 76,
    isVeg: true,
    ingredients: ["Blood Orange", "Charred Rosemary", "Spring Water"],
    calories: 110,
    isAvailable: true,
  },
]

export const INITIAL_INGREDIENTS: Ingredient[] = [
  {
    id: "ing-1",
    restaurantId: "the-corner-table",
    name: "Prime Ribeye",
    currentStock: 14,
    unit: "cuts",
    lowStockThreshold: 5,
    isAvailable: true,
    affectedDishIds: ["dish-1"],
  },
  {
    id: "ing-2",
    restaurantId: "the-corner-table",
    name: "Truffle Butter",
    currentStock: 3,
    unit: "jars (500g)",
    lowStockThreshold: 4, // low stock!
    isAvailable: true,
    affectedDishIds: ["dish-1", "dish-5"],
  },
  {
    id: "ing-3",
    restaurantId: "the-corner-table",
    name: "Atlantic Wild Salmon",
    currentStock: 18,
    unit: "fillets",
    lowStockThreshold: 6,
    isAvailable: true,
    affectedDishIds: ["dish-3"],
  },
  {
    id: "ing-4",
    restaurantId: "the-corner-table",
    name: "Arborio Rice",
    currentStock: 35,
    unit: "kg",
    lowStockThreshold: 10,
    isAvailable: true,
    affectedDishIds: ["dish-3", "dish-5"],
  },
  {
    id: "ing-5",
    restaurantId: "the-corner-table",
    name: "Sheep's Milk Feta",
    currentStock: 8,
    unit: "blocks",
    lowStockThreshold: 4,
    isAvailable: true,
    affectedDishIds: ["dish-2"],
  },
  {
    id: "ing-6",
    restaurantId: "the-corner-table",
    name: "Hass Avocado",
    currentStock: 2,
    unit: "crates",
    lowStockThreshold: 3, // low stock!
    isAvailable: true,
    affectedDishIds: ["dish-4"],
  },
  {
    id: "ing-7",
    restaurantId: "the-corner-table",
    name: "Valrhona Chocolate",
    currentStock: 12,
    unit: "kg",
    lowStockThreshold: 4,
    isAvailable: true,
    affectedDishIds: ["dish-6"],
  },
]

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "DF-8421",
    restaurantId: "the-corner-table",
    restaurantName: "The Corner Table",
    customerName: "Julian Hayes",
    customerPhone: "+1 (555) 723-9012",
    items: [
      {
        item: INITIAL_MENU_ITEMS[0], // Prime Ribeye
        quantity: 1,
        instructions: "Medium rare, sauce on side",
      },
      {
        item: INITIAL_MENU_ITEMS[6], // Blood Orange Soda
        quantity: 2,
      },
    ],
    diningOption: "dine-in",
    tableNumber: "Table 04",
    pickupSlot: "7:15 PM",
    subtotal: 1060,
    tax: 53,
    serviceFee: 30,
    total: 1143,
    status: "new",
    orderTime: "7:02 PM",
    promisedTime: "7:18 PM",
    preparationProgress: 15,
    specialInstructions: "Celebrating 1st anniversary table.",
  },
  {
    id: "ord-102",
    orderNumber: "DF-8420",
    restaurantId: "the-corner-table",
    restaurantName: "The Corner Table",
    customerName: "Sarah Chen",
    customerPhone: "+1 (555) 349-8120",
    items: [
      {
        item: INITIAL_MENU_ITEMS[2], // Salmon
        quantity: 1,
      },
      {
        item: INITIAL_MENU_ITEMS[1], // Mezze Salad
        quantity: 1,
      },
    ],
    diningOption: "takeaway",
    pickupSlot: "7:10 PM",
    subtotal: 970,
    tax: 48,
    serviceFee: 25,
    total: 1043,
    status: "preparing",
    orderTime: "6:52 PM",
    promisedTime: "7:08 PM",
    preparationProgress: 65,
    specialInstructions: "Priority takeaway pickup on way to hospital shift.",
  },
  {
    id: "ord-103",
    orderNumber: "DF-8419",
    restaurantId: "the-corner-table",
    restaurantName: "The Corner Table",
    customerName: "Liam O'Connor",
    customerPhone: "+1 (555) 912-3841",
    items: [
      {
        item: INITIAL_MENU_ITEMS[4], // Mushroom Risotto
        quantity: 2,
      },
      {
        item: INITIAL_MENU_ITEMS[5], // Fondant
        quantity: 1,
      },
    ],
    diningOption: "takeaway",
    pickupSlot: "7:00 PM",
    subtotal: 1270,
    tax: 63,
    serviceFee: 30,
    total: 1363,
    status: "ready",
    orderTime: "6:40 PM",
    promisedTime: "6:58 PM",
    preparationProgress: 100,
    specialInstructions: "Bag neatly sealed with thermal foil.",
  },
  {
    id: "ord-104",
    orderNumber: "DF-8418",
    restaurantId: "the-corner-table",
    restaurantName: "The Corner Table",
    customerName: "Amara Patel",
    customerPhone: "+1 (555) 482-1982",
    items: [
      {
        item: INITIAL_MENU_ITEMS[3], // Avocado Tartine
        quantity: 2,
      },
      {
        item: INITIAL_MENU_ITEMS[6], // Soda
        quantity: 2,
      },
    ],
    diningOption: "dine-in",
    tableNumber: "Table 09",
    pickupSlot: "6:45 PM",
    subtotal: 1060,
    tax: 53,
    serviceFee: 30,
    total: 1143,
    status: "completed",
    orderTime: "6:15 PM",
    promisedTime: "6:32 PM",
    preparationProgress: 100,
  },
]

export const INITIAL_PICKUP_SLOTS: PickupSlot[] = [
  { time: "7:00 PM – 7:15 PM", maxCapacity: 5, bookedCount: 4, status: "filling" },
  { time: "7:15 PM – 7:30 PM", maxCapacity: 5, bookedCount: 5, status: "full" },
  { time: "7:30 PM – 7:45 PM", maxCapacity: 6, bookedCount: 3, status: "available" },
  { time: "7:45 PM – 8:00 PM", maxCapacity: 6, bookedCount: 2, status: "available" },
  { time: "8:00 PM – 8:15 PM", maxCapacity: 5, bookedCount: 1, status: "available" },
  { time: "8:15 PM – 8:30 PM", maxCapacity: 5, bookedCount: 0, status: "available" },
]

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: "cust-1",
    name: "Julian Hayes",
    phone: "+1 (555) 723-9012",
    email: "julian.hayes@example.com",
    totalOrders: 12,
    totalSpent: 11430,
    favoriteDishes: ["Char-Grilled Prime Ribeye", "Blood Orange Soda"],
    lastOrderDate: "Today, 7:02 PM",
  },
  {
    id: "cust-2",
    name: "Sarah Chen",
    phone: "+1 (555) 349-8120",
    email: "sarah.chen@example.com",
    totalOrders: 8,
    totalSpent: 8340,
    favoriteDishes: ["Pan-Seared Wild Atlantic Salmon", "Mezze Salad"],
    lastOrderDate: "Today, 6:52 PM",
  },
  {
    id: "cust-3",
    name: "Liam O'Connor",
    phone: "+1 (555) 912-3841",
    email: "liam.oc@example.com",
    totalOrders: 6,
    totalSpent: 6890,
    favoriteDishes: ["Wood-Fired Wild Mushroom Risotto", "Dark Chocolate Fondant"],
    lastOrderDate: "Today, 6:40 PM",
  },
  {
    id: "cust-4",
    name: "Amara Patel",
    phone: "+1 (555) 482-1982",
    email: "amara.patel@example.com",
    totalOrders: 15,
    totalSpent: 14200,
    favoriteDishes: ["Artisanal Avocado & Egg Tartine"],
    lastOrderDate: "Today, 6:15 PM",
  },
]

// ==========================================
// CONTEXT INTERFACE
// ==========================================

interface DineFlowContextType {
  // Multi-restaurant state
  restaurants: Restaurant[]
  currentRestaurantId: string
  setCurrentRestaurantId: (id: string) => void
  currentRestaurant: Restaurant
  toggleRestaurantOpenStatus: (restaurantId?: string) => void
  updateRestaurantProfile: (data: Partial<Restaurant>) => void

  // Menu Management
  menuItems: MenuItem[]
  currentRestaurantMenuItems: MenuItem[]
  addMenuItem: (item: Omit<MenuItem, "id">) => void
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void
  deleteMenuItem: (id: string) => void
  toggleDishAvailability: (id: string) => void

  // Inventory & Linking
  ingredients: Ingredient[]
  currentRestaurantIngredients: Ingredient[]
  updateIngredientStock: (id: string, delta: number) => void
  toggleIngredientAvailability: (id: string) => void
  addIngredient: (ingredient: Omit<Ingredient, "id">) => void

  // Orders & Kitchen
  orders: Order[]
  currentRestaurantOrders: Order[]
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  placeNewOrder: (orderData: {
    customerName: string
    customerPhone: string
    items: CartItem[]
    diningOption: "dine-in" | "takeaway"
    tableNumber?: string
    pickupSlot: string
    specialInstructions?: string
  }) => Order

  // Kitchen Workload
  kitchenWorkload: {
    activeOrders: number
    capacityMax: number
    loadPercentage: number
    avgPrepTimeMinutes: number
    isNearCapacity: boolean
    delayWarning: string | null
  }

  // Pickup Slots
  pickupSlots: PickupSlot[]
  updateSlotCapacity: (time: string, newCapacity: number) => void

  // Customers
  customers: CustomerProfile[]

  // Cart (Customer side)
  cart: CartItem[]
  addToCart: (item: MenuItem, quantity?: number, instructions?: string, customizations?: string[]) => void
  removeFromCart: (itemId: string) => void
  updateCartQuantity: (itemId: string, delta: number) => void
  clearCart: () => void
  cartSubtotal: number
  cartTotal: number
  cartCount: number
  isCartDrawerOpen: boolean
  setIsCartDrawerOpen: (open: boolean) => void

  // Favourites
  favouriteRestaurantIds: string[]
  toggleFavouriteRestaurant: (id: string) => void
  favouriteDishIds: string[]
  toggleFavouriteDish: (id: string) => void

  // Active User Persona
  activePersona: "customer" | "owner"
  setActivePersona: (persona: "customer" | "owner") => void
}

const DineFlowContext = createContext<DineFlowContextType | undefined>(undefined)

const STORAGE_KEY = "dineflow_platform_state_v1"

export function DineFlowProvider({ children }: { children: React.ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS)
  const [currentRestaurantId, setCurrentRestaurantId] = useState<string>("the-corner-table")
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS)
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS)
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS)
  const [pickupSlots, setPickupSlots] = useState<PickupSlot[]>(INITIAL_PICKUP_SLOTS)
  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [favouriteRestaurantIds, setFavouriteRestaurantIds] = useState<string[]>(["the-corner-table"])
  const [favouriteDishIds, setFavouriteDishIds] = useState<string[]>(["dish-1", "dish-3"])
  const [activePersona, setActivePersona] = useState<"customer" | "owner">("customer")

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.restaurants) setRestaurants(parsed.restaurants)
        if (parsed.menuItems) setMenuItems(parsed.menuItems)
        if (parsed.ingredients) setIngredients(parsed.ingredients)
        if (parsed.orders) setOrders(parsed.orders)
        if (parsed.pickupSlots) setPickupSlots(parsed.pickupSlots)
        if (parsed.customers) setCustomers(parsed.customers)
        if (parsed.favouriteRestaurantIds) setFavouriteRestaurantIds(parsed.favouriteRestaurantIds)
        if (parsed.favouriteDishIds) setFavouriteDishIds(parsed.favouriteDishIds)
      }
    } catch {
      // Use fallback defaults
    }
  }, [])

  // Save to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          restaurants,
          menuItems,
          ingredients,
          orders,
          pickupSlots,
          customers,
          favouriteRestaurantIds,
          favouriteDishIds,
        })
      )
    } catch {
      // Ignore quota storage issues
    }
  }, [restaurants, menuItems, ingredients, orders, pickupSlots, customers, favouriteRestaurantIds, favouriteDishIds])

  // Current Restaurant
  const currentRestaurant =
    restaurants.find((r) => r.id === currentRestaurantId) || restaurants[0]

  // Filtered lists for current restaurant
  const currentRestaurantMenuItems = menuItems.filter(
    (m) => m.restaurantId === currentRestaurantId
  )
  const currentRestaurantIngredients = ingredients.filter(
    (i) => i.restaurantId === currentRestaurantId
  )
  const currentRestaurantOrders = orders.filter(
    (o) => o.restaurantId === currentRestaurantId
  )

  // Toggle restaurant open/close
  const toggleRestaurantOpenStatus = (restaurantId = currentRestaurantId) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId
          ? { ...r, status: r.status === "open" ? "closed" : "open" }
          : r
      )
    )
  }

  // Update restaurant profile
  const updateRestaurantProfile = (data: Partial<Restaurant>) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === currentRestaurantId ? { ...r, ...data } : r))
    )
  }

  // Menu actions
  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: "dish-" + Date.now(),
      restaurantId: currentRestaurantId,
    }
    setMenuItems((prev) => [newItem, ...prev])
  }

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    )
  }

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id))
    setCart((prev) => prev.filter((ci) => ci.item.id !== id))
  }

  const toggleDishAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isAvailable: !m.isAvailable } : m))
    )
  }

  // Inventory & linking actions:
  // If an ingredient is marked unavailable, automatically mark all affected dishes unavailable!
  const toggleIngredientAvailability = (id: string) => {
    setIngredients((prevIngs) => {
      const target = prevIngs.find((i) => i.id === id)
      if (!target) return prevIngs

      const newAvailable = !target.isAvailable

      // If becoming unavailable, disable dependent dishes
      if (!newAvailable && target.affectedDishIds?.length) {
        setMenuItems((prevDishes) =>
          prevDishes.map((d) =>
            target.affectedDishIds.includes(d.id)
              ? { ...d, isAvailable: false }
              : d
          )
        )
      }

      return prevIngs.map((i) =>
        i.id === id ? { ...i, isAvailable: newAvailable } : i
      )
    })
  }

  const updateIngredientStock = (id: string, delta: number) => {
    setIngredients((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = Math.max(0, i.currentStock + delta)
          const isOut = newQty === 0
          if (isOut && i.affectedDishIds?.length) {
            setMenuItems((prevDishes) =>
              prevDishes.map((d) =>
                i.affectedDishIds.includes(d.id)
                  ? { ...d, isAvailable: false }
                  : d
              )
            )
          }
          return {
            ...i,
            currentStock: newQty,
            isAvailable: newQty > 0,
          }
        }
        return i
      })
    )
  }

  const addIngredient = (ingredient: Omit<Ingredient, "id">) => {
    const newIng: Ingredient = {
      ...ingredient,
      id: "ing-" + Date.now(),
      restaurantId: currentRestaurantId,
    }
    setIngredients((prev) => [...prev, newIng])
  }

  // Orders & Kitchen actions
  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          let progress = o.preparationProgress
          if (status === "new") progress = 10
          if (status === "preparing") progress = 50
          if (status === "ready") progress = 90
          if (status === "completed") progress = 100
          if (status === "cancelled") progress = 0
          return { ...o, status, preparationProgress: progress }
        }
        return o
      })
    )
  }

  const placeNewOrder = (data: {
    customerName: string
    customerPhone: string
    items: CartItem[]
    diningOption: "dine-in" | "takeaway"
    tableNumber?: string
    pickupSlot: string
    specialInstructions?: string
  }): Order => {
    const subtotal = data.items.reduce(
      (sum, ci) => sum + ci.item.price * ci.quantity,
      0
    )
    const tax = Math.round(subtotal * 0.05)
    const serviceFee = data.diningOption === "takeaway" ? 25 : 35
    const total = subtotal + tax + serviceFee

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    const promisedMin = now.getMinutes() + 18
    now.setMinutes(promisedMin)
    const promisedStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })

    const newOrder: Order = {
      id: "ord-" + Date.now(),
      orderNumber: "DF-" + Math.floor(1000 + Math.random() * 9000),
      restaurantId: currentRestaurantId,
      restaurantName: currentRestaurant.name,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      items: data.items,
      diningOption: data.diningOption,
      tableNumber: data.tableNumber,
      pickupSlot: data.pickupSlot,
      subtotal,
      tax,
      serviceFee,
      total,
      status: "new",
      orderTime: timeStr,
      promisedTime: promisedStr,
      preparationProgress: 10,
      specialInstructions: data.specialInstructions,
    }

    setOrders((prev) => [newOrder, ...prev])

    // Update customer history or create profile
    setCustomers((prev) => {
      const existing = prev.find((c) => c.phone === data.customerPhone || c.name === data.customerName)
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + total,
                lastOrderDate: "Just now",
              }
            : c
        )
      } else {
        const newCust: CustomerProfile = {
          id: "cust-" + Date.now(),
          name: data.customerName,
          phone: data.customerPhone,
          email: `${data.customerName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
          totalOrders: 1,
          totalSpent: total,
          favoriteDishes: [data.items[0]?.item.name || "Chef's Special"],
          lastOrderDate: "Just now",
        }
        return [newCust, ...prev]
      }
    })

    // Increment booked count for pickup slot
    setPickupSlots((prev) =>
      prev.map((s) => {
        if (s.time.includes(data.pickupSlot) || data.pickupSlot.includes(s.time)) {
          const booked = s.bookedCount + 1
          return {
            ...s,
            bookedCount: booked,
            status: booked >= s.maxCapacity ? "full" : booked >= s.maxCapacity - 1 ? "filling" : "available",
          }
        }
        return s
      })
    )

    // Clear cart
    setCart([])
    return newOrder
  }

  // Kitchen Workload Calculation Engine
  const activeOrders = currentRestaurantOrders.filter(
    (o) => o.status === "new" || o.status === "preparing"
  ).length
  const capacityMax = 14
  const loadPercentage = Math.min(100, Math.round((activeOrders / capacityMax) * 100))
  const avgPrepTimeMinutes = activeOrders > 8 ? 22 : activeOrders > 4 ? 16 : 12
  const isNearCapacity = loadPercentage >= 75
  const delayWarning =
    loadPercentage >= 85
      ? "High Ticket Volume: Orders placed in the next 15 mins may experience +8 min prep delays."
      : null

  const kitchenWorkload = {
    activeOrders,
    capacityMax,
    loadPercentage,
    avgPrepTimeMinutes,
    isNearCapacity,
    delayWarning,
  }

  // Pickup Slots actions
  const updateSlotCapacity = (time: string, newCapacity: number) => {
    setPickupSlots((prev) =>
      prev.map((s) =>
        s.time === time
          ? {
              ...s,
              maxCapacity: newCapacity,
              status: s.bookedCount >= newCapacity ? "full" : "available",
            }
          : s
      )
    )
  }

  // Cart operations
  const addToCart = (
    item: MenuItem,
    quantity = 1,
    instructions?: string,
    customizations?: string[]
  ) => {
    if (!item.isAvailable) return
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id)
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id
            ? {
                ...ci,
                quantity: ci.quantity + quantity,
                instructions: instructions || ci.instructions,
                customizations: customizations || ci.customizations,
              }
            : ci
        )
      }
      return [...prev, { item, quantity, instructions, customizations }]
    })
    setIsCartDrawerOpen(true)
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId))
  }

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) =>
          ci.item.id === itemId
            ? { ...ci, quantity: Math.max(0, ci.quantity + delta) }
            : ci
        )
        .filter((ci) => ci.quantity > 0)
    )
  }

  const clearCart = () => setCart([])

  const cartSubtotal = cart.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  )
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + Math.round(cartSubtotal * 0.05) + 30 : 0
  const cartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0)

  // Favourites actions
  const toggleFavouriteRestaurant = (id: string) => {
    setFavouriteRestaurantIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleFavouriteDish = (id: string) => {
    setFavouriteDishIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <DineFlowContext.Provider
      value={{
        restaurants,
        currentRestaurantId,
        setCurrentRestaurantId,
        currentRestaurant,
        toggleRestaurantOpenStatus,
        updateRestaurantProfile,

        menuItems,
        currentRestaurantMenuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleDishAvailability,

        ingredients,
        currentRestaurantIngredients,
        updateIngredientStock,
        toggleIngredientAvailability,
        addIngredient,

        orders,
        currentRestaurantOrders,
        updateOrderStatus,
        placeNewOrder,

        kitchenWorkload,
        pickupSlots,
        updateSlotCapacity,

        customers,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,

        favouriteRestaurantIds,
        toggleFavouriteRestaurant,
        favouriteDishIds,
        toggleFavouriteDish,

        activePersona,
        setActivePersona,
      }}
    >
      {children}
    </DineFlowContext.Provider>
  )
}

export function useDineFlow() {
  const context = useContext(DineFlowContext)
  if (!context) {
    throw new Error("useDineFlow must be used within a DineFlowProvider")
  }
  return context
}
