export interface AdminOrder {
  id: string;
  orderNumber: string; // e.g. "#D4821"
  tokenNumber: string; // e.g. "42"
  customerName: string;
  customerPhone: string;
  orderType: "dine-in" | "takeaway";
  tableOrShelf: string; // e.g. "Table #4" or "Shelf B • Express"
  items: {
    dishName: string;
    quantity: number;
    price: number;
    notes?: string;
  }[];
  totalAmount: number;
  status: "new" | "accepted" | "preparing" | "ready" | "completed" | "cancelled";
  prepTimeEstimate: string; // e.g. "~ 8 min"
  timeAgo: string;
  createdAt: string;
  image: string;
}

export interface AdminIngredient {
  id: string;
  name: string;
  category: string;
  currentStock: string;
  minThreshold: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
  affectedDishes: string[];
  unit: string;
  lastUpdated: string;
}

export interface AdminStaffMember {
  id: string;
  name: string;
  role: "Kitchen Head" | "Sous Chef" | "Counter Lead" | "Order Expediter" | "Cashier";
  shift: "Morning (8 AM - 4 PM)" | "Evening (4 PM - 11 PM)" | "Full Day";
  status: "On Shift" | "Break" | "Off Duty";
  phone: string;
  assignedStation: string;
  avatar: string;
}

export interface AdminBestseller {
  id: string;
  name: string;
  category: string;
  ordersCount: number;
  revenue: number;
  image: string;
  rating: number;
}

export const INITIAL_ADMIN_STATS = {
  totalOrders: 124,
  totalOrdersTrend: "+12%",
  inKitchen: 37,
  completed: 82,
  completedTrend: "+8%",
  todayRevenue: 24680,
  todayRevenueTrend: "+14%",
  avgPrepTime: "9.4 min",
  activeTokens: 24,
};

export const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "ord-1",
    orderNumber: "#D4821",
    tokenNumber: "42",
    customerName: "Aarav Sharma",
    customerPhone: "+91 98765 43210",
    orderType: "takeaway",
    tableOrShelf: "Shelf B • Express Shelf",
    items: [
      { dishName: "Crispy Paneer Makhani Bowl", quantity: 1, price: 180 },
      { dishName: "Iced Double-Shot Hazelnut Cold Brew", quantity: 1, price: 130 },
    ],
    totalAmount: 310,
    status: "preparing",
    prepTimeEstimate: "~ 8 min",
    timeAgo: "3 min ago",
    createdAt: "19:15",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-2",
    orderNumber: "#D4820",
    tokenNumber: "41",
    customerName: "Riya Verma",
    customerPhone: "+91 98123 45678",
    orderType: "dine-in",
    tableOrShelf: "Table #06",
    items: [
      { dishName: "Classic Double Smashed Cheeseburger", quantity: 1, price: 190 },
      { dishName: "Crispy Golden Fries", quantity: 1, price: 90 },
    ],
    totalAmount: 280,
    status: "accepted",
    prepTimeEstimate: "~ 12 min",
    timeAgo: "6 min ago",
    createdAt: "19:12",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-3",
    orderNumber: "#D4819",
    tokenNumber: "40",
    customerName: "Kabir Mehta",
    customerPhone: "+91 97234 56789",
    orderType: "takeaway",
    tableOrShelf: "Shelf A • Counter 1",
    items: [{ dishName: "Creamy Truffle Pasta Alfredo", quantity: 1, price: 240 }],
    totalAmount: 240,
    status: "preparing",
    prepTimeEstimate: "~ 10 min",
    timeAgo: "9 min ago",
    createdAt: "19:08",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-4",
    orderNumber: "#D4818",
    tokenNumber: "39",
    customerName: "Ananya Iyer",
    customerPhone: "+91 99345 67890",
    orderType: "dine-in",
    tableOrShelf: "Table #12",
    items: [
      { dishName: "Truffle Sourdough Pizza Slice", quantity: 2, price: 480 },
      { dishName: "Avocado & Edamame Protein Bowl", quantity: 1, price: 220 },
    ],
    totalAmount: 700,
    status: "ready",
    prepTimeEstimate: "Ready for shelf",
    timeAgo: "14 min ago",
    createdAt: "19:04",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-5",
    orderNumber: "#D4817",
    tokenNumber: "38",
    customerName: "Devansh Singhania",
    customerPhone: "+91 98456 78901",
    orderType: "takeaway",
    tableOrShelf: "Shelf C • Express",
    items: [
      { dishName: "Salmon & Avocado Maki Roll (8 Pcs)", quantity: 1, price: 320 },
      { dishName: "Iced Cold Brew", quantity: 1, price: 130 },
    ],
    totalAmount: 450,
    status: "ready",
    prepTimeEstimate: "Ready for pickup",
    timeAgo: "18 min ago",
    createdAt: "19:00",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-6",
    orderNumber: "#D4816",
    tokenNumber: "37",
    customerName: "Pooja Malhotra",
    customerPhone: "+91 97567 89012",
    orderType: "dine-in",
    tableOrShelf: "Table #03",
    items: [
      { dishName: "Crispy Paneer Makhani Bowl", quantity: 2, price: 360 },
      { dishName: "Garlic Butter Naan", quantity: 2, price: 80 },
    ],
    totalAmount: 440,
    status: "completed",
    prepTimeEstimate: "Served",
    timeAgo: "25 min ago",
    createdAt: "18:52",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-7",
    orderNumber: "#D4815",
    tokenNumber: "36",
    customerName: "Vikramaditya Roy",
    customerPhone: "+91 98678 90123",
    orderType: "takeaway",
    tableOrShelf: "Shelf B • Express Shelf",
    items: [
      { dishName: "Double Smashed Cheeseburger", quantity: 1, price: 190 },
      { dishName: "Chocolate Fudge Brownie", quantity: 1, price: 140 },
    ],
    totalAmount: 330,
    status: "completed",
    prepTimeEstimate: "Picked up",
    timeAgo: "32 min ago",
    createdAt: "18:45",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80",
  },
];

export const INITIAL_ADMIN_INGREDIENTS: AdminIngredient[] = [
  {
    id: "ing-1",
    name: "Artisanal Brioche Buns",
    category: "Bakery",
    currentStock: "48 pcs",
    minThreshold: "20 pcs",
    status: "in-stock",
    affectedDishes: ["Classic Double Smashed Cheeseburger", "Veg Supreme Burger"],
    unit: "pcs",
    lastUpdated: "Today, 17:00",
  },
  {
    id: "ing-2",
    name: "Fresh Malai Paneer (Cottage Cheese)",
    category: "Dairy",
    currentStock: "14.5 kg",
    minThreshold: "5.0 kg",
    status: "in-stock",
    affectedDishes: ["Crispy Paneer Makhani Bowl", "Tandoori Paneer Naan Roll"],
    unit: "kg",
    lastUpdated: "Today, 14:30",
  },
  {
    id: "ing-3",
    name: "Fior di Latte Mozzarella",
    category: "Dairy",
    currentStock: "2.1 kg",
    minThreshold: "4.0 kg",
    status: "low-stock",
    affectedDishes: ["Truffle Sourdough Pizza", "Four Cheese Pizza"],
    unit: "kg",
    lastUpdated: "Today, 18:15",
  },
  {
    id: "ing-4",
    name: "Aged Saffron Basmati Rice",
    category: "Grains",
    currentStock: "25 kg",
    minThreshold: "10 kg",
    status: "in-stock",
    affectedDishes: ["Royal Dum Biryani Bowl", "Crispy Paneer Bowl"],
    unit: "kg",
    lastUpdated: "Yesterday",
  },
  {
    id: "ing-5",
    name: "Roasted Hazelnut Cold Brew Beans",
    category: "Coffee & Beverage",
    currentStock: "1.2 kg",
    minThreshold: "3.0 kg",
    status: "low-stock",
    affectedDishes: ["Iced Double-Shot Hazelnut Cold Brew"],
    unit: "kg",
    lastUpdated: "Today, 16:00",
  },
  {
    id: "ing-6",
    name: "Atlantic Fresh Salmon Filet",
    category: "Seafood",
    currentStock: "0.0 kg",
    minThreshold: "2.5 kg",
    status: "out-of-stock",
    affectedDishes: ["Salmon & Avocado Maki Roll (8 Pcs)", "Spicy Salmon Nigiri"],
    unit: "kg",
    lastUpdated: "Today, 18:40",
  },
];

export const INITIAL_ADMIN_STAFF: AdminStaffMember[] = [
  {
    id: "st-1",
    name: "Chef Rajinder Singh",
    role: "Kitchen Head",
    shift: "Full Day",
    status: "On Shift",
    phone: "+91 98765 11223",
    assignedStation: "Main Dum & Grill Station",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "st-2",
    name: "Neha Joshi",
    role: "Sous Chef",
    shift: "Evening (4 PM - 11 PM)",
    status: "On Shift",
    phone: "+91 98765 22334",
    assignedStation: "Woodfired Stone Oven",
    avatar: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "st-3",
    name: "Karan Johal",
    role: "Counter Lead",
    shift: "Evening (4 PM - 11 PM)",
    status: "On Shift",
    phone: "+91 98765 33445",
    assignedStation: "Express Shelf & QR Scanner",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "st-4",
    name: "Tanya Sen",
    role: "Order Expediter",
    shift: "Evening (4 PM - 11 PM)",
    status: "Break",
    phone: "+91 98765 44556",
    assignedStation: "Order Dispatch & Packaging",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
];

export const INITIAL_ADMIN_BESTSELLERS: AdminBestseller[] = [
  {
    id: "bs-1",
    name: "Crispy Paneer Makhani Bowl",
    category: "Lunch Bowls",
    ordersCount: 46,
    revenue: 8280,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80",
    rating: 4.95,
  },
  {
    id: "bs-2",
    name: "Double Smashed Cheeseburger",
    category: "Burgers",
    ordersCount: 38,
    revenue: 7220,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
  },
  {
    id: "bs-3",
    name: "Truffle Sourdough Pizza Slice",
    category: "Pizza",
    ordersCount: 29,
    revenue: 6960,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
  },
  {
    id: "bs-4",
    name: "Hazelnut Cold Brew",
    category: "Drinks",
    ordersCount: 34,
    revenue: 4420,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80",
    rating: 4.85,
  },
];
