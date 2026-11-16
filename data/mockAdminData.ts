export interface AdminOrder {
  id: string;
  orderNumber: string; // e.g. "#D4821"
  tokenNumber: string; // e.g. "42"
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
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
  restaurantId?: string;
  restaurantName?: string;
  tableNumber?: string;
  tableId?: string;
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
    tableOrShelf: "Shelf A • Express Shelf",
    restaurantId: "burger-house",
    restaurantName: "Burger House",
    items: [
      { dishName: "Classic Double Smashed Cheeseburger", quantity: 1, price: 190 },
      { dishName: "Loaded Truffle Parmesan Fries", quantity: 1, price: 140 },
    ],
    totalAmount: 330,
    status: "preparing",
    prepTimeEstimate: "~ 6 min",
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
    tableOrShelf: "Table #T02",
    tableNumber: "T02",
    restaurantId: "burger-house",
    restaurantName: "Burger House",
    items: [
      { dishName: "Truffle Mushroom Swiss Burger", quantity: 1, price: 220 },
      { dishName: "Crispy Golden Onion Rings with Garlic Dip", quantity: 1, price: 120 },
    ],
    totalAmount: 340,
    status: "accepted",
    prepTimeEstimate: "~ 10 min",
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
    tableOrShelf: "Shelf B • Express Shelf",
    restaurantId: "burger-house",
    restaurantName: "Burger House",
    items: [
      { dishName: "Spicy Nashville Crispy Chicken Burger", quantity: 1, price: 210 },
      { dishName: "Thick Salted Caramel Pretzel Shake", quantity: 1, price: 160 },
    ],
    totalAmount: 370,
    status: "preparing",
    prepTimeEstimate: "~ 8 min",
    timeAgo: "9 min ago",
    createdAt: "19:08",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-4",
    orderNumber: "#D4818",
    tokenNumber: "39",
    customerName: "Ananya Iyer",
    customerPhone: "+91 99345 67890",
    orderType: "dine-in",
    tableOrShelf: "Table #T01",
    tableNumber: "T01",
    restaurantId: "burger-house",
    restaurantName: "Burger House",
    items: [
      { dishName: "Smoky BBQ Bacon Double Stack", quantity: 1, price: 260 },
      { dishName: "Smoky Jalapeño Cheese Poppers (6 Pcs)", quantity: 1, price: 130 },
    ],
    totalAmount: 390,
    status: "ready",
    prepTimeEstimate: "Ready for table",
    timeAgo: "14 min ago",
    createdAt: "19:04",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-5",
    orderNumber: "#D4817",
    tokenNumber: "38",
    customerName: "Devansh Singhania",
    customerPhone: "+91 98456 78901",
    orderType: "takeaway",
    tableOrShelf: "Shelf A • Counter 1",
    restaurantId: "burger-house",
    restaurantName: "Burger House",
    items: [
      { dishName: "Crispy Peri Peri Paneer Burger", quantity: 1, price: 180 },
      { dishName: "Classic Oreo Crumb Milkshake", quantity: 1, price: 150 },
    ],
    totalAmount: 330,
    status: "ready",
    prepTimeEstimate: "Ready for pickup",
    timeAgo: "18 min ago",
    createdAt: "19:00",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-6",
    orderNumber: "#D4816",
    tokenNumber: "37",
    customerName: "Pooja Malhotra",
    customerPhone: "+91 97567 89012",
    orderType: "dine-in",
    tableOrShelf: "Table #T03",
    tableNumber: "T03",
    restaurantId: "burger-house",
    restaurantName: "Burger House",
    items: [
      { dishName: "Classic Double Smashed Cheeseburger", quantity: 2, price: 380 },
      { dishName: "Buffalo Hot Glazed Chicken Wings (6 Pcs)", quantity: 1, price: 210 },
    ],
    totalAmount: 590,
    status: "completed",
    prepTimeEstimate: "Served",
    timeAgo: "25 min ago",
    createdAt: "18:52",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "ord-7",
    orderNumber: "#D4815",
    tokenNumber: "36",
    customerName: "Vikramaditya Roy",
    customerPhone: "+91 98678 90123",
    orderType: "takeaway",
    tableOrShelf: "Shelf B • Express Shelf",
    restaurantId: "burger-house",
    restaurantName: "Burger House",
    items: [
      { dishName: "Truffle Mushroom Swiss Burger", quantity: 1, price: 220 },
      { dishName: "Warm Chocolate Molten Lava Cake", quantity: 1, price: 150 },
    ],
    totalAmount: 370,
    status: "completed",
    prepTimeEstimate: "Picked up",
    timeAgo: "32 min ago",
    createdAt: "18:45",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80",
  },
];

export const INITIAL_ADMIN_INGREDIENTS: AdminIngredient[] = [
  {
    id: "ing-1",
    name: "Artisanal Brioche Buns",
    category: "Bakery",
    currentStock: "140 pcs",
    minThreshold: "30 pcs",
    status: "in-stock",
    affectedDishes: [
      "Classic Double Smashed Cheeseburger",
      "Truffle Mushroom Swiss Burger",
      "Spicy Nashville Crispy Chicken Burger",
    ],
    unit: "pcs",
    lastUpdated: "Today, 17:00",
  },
  {
    id: "ing-2",
    name: "Angus Beef & Smashed Patty Mix",
    category: "Meat & Protein",
    currentStock: "18.5 kg",
    minThreshold: "5.0 kg",
    status: "in-stock",
    affectedDishes: [
      "Classic Double Smashed Cheeseburger",
      "Smoky BBQ Bacon Double Stack",
    ],
    unit: "kg",
    lastUpdated: "Today, 14:30",
  },
  {
    id: "ing-3",
    name: "Aged Wisconsin Sharp Cheddar",
    category: "Dairy",
    currentStock: "3.2 kg",
    minThreshold: "4.0 kg",
    status: "low-stock",
    affectedDishes: [
      "Classic Double Smashed Cheeseburger",
      "Loaded Truffle Parmesan Fries",
    ],
    unit: "kg",
    lastUpdated: "Today, 18:15",
  },
  {
    id: "ing-4",
    name: "Black Truffle Aioli & Sauce",
    category: "Sauces",
    currentStock: "4.5 L",
    minThreshold: "1.5 L",
    status: "in-stock",
    affectedDishes: [
      "Truffle Mushroom Swiss Burger",
      "Loaded Truffle Parmesan Fries",
    ],
    unit: "L",
    lastUpdated: "Yesterday",
  },
  {
    id: "ing-5",
    name: "Russet Potatoes for Hand-Cut Fries",
    category: "Produce",
    currentStock: "28 kg",
    minThreshold: "8.0 kg",
    status: "in-stock",
    affectedDishes: [
      "Loaded Truffle Parmesan Fries",
      "Crispy Seasoned Fries",
    ],
    unit: "kg",
    lastUpdated: "Today, 16:00",
  },
  {
    id: "ing-6",
    name: "Fresh Jalapeño & Dill Pickles",
    category: "Condiments",
    currentStock: "0.8 kg",
    minThreshold: "2.0 kg",
    status: "low-stock",
    affectedDishes: [
      "Classic Double Smashed Cheeseburger",
      "Smoky Jalapeño Cheese Poppers (6 Pcs)",
    ],
    unit: "kg",
    lastUpdated: "Today, 18:40",
  },
];

export const INITIAL_ADMIN_STAFF: AdminStaffMember[] = [
  {
    id: "st-1",
    name: "Chef Marcus Vance",
    role: "Kitchen Head",
    shift: "Full Day",
    status: "On Shift",
    phone: "+91 98111 22334",
    assignedStation: "Burger House Main Smash & Grill",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "st-2",
    name: "Rohit Sen",
    role: "Sous Chef",
    shift: "Evening (4 PM - 11 PM)",
    status: "On Shift",
    phone: "+91 98765 22334",
    assignedStation: "Burger Assembly & Searing Station",
    avatar: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "st-3",
    name: "Priya Nair",
    role: "Counter Lead",
    shift: "Evening (4 PM - 11 PM)",
    status: "On Shift",
    phone: "+91 98765 33445",
    assignedStation: "Express Shelf & Table QR Expediter",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "st-4",
    name: "Alex Chen",
    role: "Order Expediter",
    shift: "Evening (4 PM - 11 PM)",
    status: "Break",
    phone: "+91 98765 44556",
    assignedStation: "Order Dispatch, Fries & Shakes",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
];

export const INITIAL_ADMIN_BESTSELLERS: AdminBestseller[] = [
  {
    id: "bs-1",
    name: "Classic Double Smashed Cheeseburger",
    category: "Burgers",
    ordersCount: 52,
    revenue: 9880,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
  },
  {
    id: "bs-2",
    name: "Truffle Mushroom Swiss Burger",
    category: "Burgers",
    ordersCount: 44,
    revenue: 9680,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=300&q=80",
    rating: 4.85,
  },
  {
    id: "bs-3",
    name: "Loaded Truffle Parmesan Fries",
    category: "Starters",
    ordersCount: 48,
    revenue: 6720,
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=300&q=80",
    rating: 4.95,
  },
  {
    id: "bs-4",
    name: "Thick Salted Caramel Pretzel Shake",
    category: "Drinks",
    ordersCount: 36,
    revenue: 5760,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
  },
];
