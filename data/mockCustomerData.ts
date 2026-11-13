export interface CategoryItem {
  id: string;
  name: string;
  count: number;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isVeg: boolean;
  prepTimeMinutes: number;
  rating: number;
  tags: string[];
  spiceLevel?: "Mild" | "Medium" | "Spicy";
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  prepTime: string;
  rating: number;
  location: string;
  image: string;
  deliveryFee: string;
  currentQueue: number;
  isOpen: boolean;
  isDineIn: boolean;
  isTakeaway: boolean;
  priceLevel: "$" | "$$" | "$$$";
  category: string;
}

export interface RecentOrder {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  dishName: string;
  dishImage: string;
  price: number;
  date: string;
  itemsCount: number;
  dishId: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "pizza",
    name: "Pizza",
    count: 32,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "burgers",
    name: "Burgers",
    count: 28,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "indian",
    name: "Indian",
    count: 24,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "sushi",
    name: "Sushi",
    count: 18,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "desserts",
    name: "Desserts",
    count: 22,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "drinks",
    name: "Drinks",
    count: 16,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "salads",
    name: "Salads",
    count: 20,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80",
  },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "burger-house",
    name: "Burger House",
    tagline: "Double-smashed artisanal patties & brioche buns",
    cuisine: "Burgers, Fast Food",
    prepTime: "15-20 min",
    rating: 4.8,
    location: "Block A • Food Court",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    deliveryFee: "₹0 Express Pickup",
    currentQueue: 4,
    isOpen: true,
    isDineIn: true,
    isTakeaway: true,
    priceLevel: "$$",
    category: "burgers",
  },
  {
    id: "pizza-palace",
    name: "Pizza Palace",
    tagline: "Slow-fermented Neapolitan woodfire slices",
    cuisine: "Pizza, Italian",
    prepTime: "20-25 min",
    rating: 4.9,
    location: "Main Commons • Stall 03",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    deliveryFee: "₹0 Express Pickup",
    currentQueue: 6,
    isOpen: true,
    isDineIn: true,
    isTakeaway: true,
    priceLevel: "$$",
    category: "pizza",
  },
  {
    id: "sushi-world",
    name: "Sushi World",
    tagline: "Fresh nori rolls, nigiri & ramen bowls",
    cuisine: "Sushi, Japanese",
    prepTime: "25-30 min",
    rating: 4.8,
    location: "East Wing Courtyard",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    deliveryFee: "₹0 Express Pickup",
    currentQueue: 3,
    isOpen: true,
    isDineIn: true,
    isTakeaway: true,
    priceLevel: "$$$",
    category: "sushi",
  },
  {
    id: "healthy-bites",
    name: "Healthy Bites",
    tagline: "High-protein macro bowls & organic greens",
    cuisine: "Salads, Healthy",
    prepTime: "10-15 min",
    rating: 4.7,
    location: "Sports Complex Kiosk",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80",
    deliveryFee: "₹0 Express Pickup",
    currentQueue: 2,
    isOpen: true,
    isDineIn: true,
    isTakeaway: true,
    priceLevel: "$$",
    category: "salads",
  },
  {
    id: "corner-cafe",
    name: "The Corner Café",
    tagline: "Artisan cold brews, grilled wraps & toasts",
    cuisine: "Café, Beverages",
    prepTime: "8-12 min",
    rating: 4.9,
    location: "Library Courtyard",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    deliveryFee: "₹0 Express Pickup",
    currentQueue: 3,
    isOpen: true,
    isDineIn: true,
    isTakeaway: true,
    priceLevel: "$",
    category: "drinks",
  },
  {
    id: "tandoor-hub",
    name: "Tandoor & Curry Hub",
    tagline: "Charcoal naan rolls, smoked bowls & dum biryanis",
    cuisine: "Indian, Mughlai",
    prepTime: "18-22 min",
    rating: 4.85,
    location: "Hostel Zone Dine Hall",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
    deliveryFee: "₹0 Express Pickup",
    currentQueue: 8,
    isOpen: true,
    isDineIn: true,
    isTakeaway: true,
    priceLevel: "$$",
    category: "indian",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dish-1",
    name: "Classic Double Smashed Cheeseburger",
    restaurantId: "burger-house",
    restaurantName: "Burger House",
    category: "burgers",
    description: "Two crispy-edged smashed patties with melted sharp cheddar, caramelized onions, house pickles, and secret sauce on a toasted brioche.",
    price: 190,
    originalPrice: 230,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    prepTimeMinutes: 12,
    rating: 4.9,
    tags: ["Bestseller", "Top Pick"],
    spiceLevel: "Medium",
  },
  {
    id: "dish-2",
    name: "Truffle Sourdough Pizza Slice",
    restaurantId: "pizza-palace",
    restaurantName: "Pizza Palace",
    category: "pizza",
    description: "48-hour fermented sourdough base, wild sautéed mushrooms, fior di latte mozzarella, finished with white truffle oil.",
    price: 240,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 15,
    rating: 4.9,
    tags: ["Woodfire", "Gourmet"],
    spiceLevel: "Mild",
  },
  {
    id: "dish-3",
    name: "Salmon & Avocado Maki Roll (8 Pcs)",
    restaurantId: "sushi-world",
    restaurantName: "Sushi World",
    category: "sushi",
    description: "Fresh Atlantic salmon, ripe hass avocado, toasted sesame seeds, served with wasabi, pickled ginger, and artisanal soy dip.",
    price: 320,
    originalPrice: 360,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    prepTimeMinutes: 18,
    rating: 4.85,
    tags: ["Chef Special", "Fresh Catch"],
    spiceLevel: "Mild",
  },
  {
    id: "dish-4",
    name: "Crispy Paneer Makhani Bowl",
    restaurantId: "tandoor-hub",
    restaurantName: "Tandoor & Curry Hub",
    category: "indian",
    description: "Charred cottage cheese cubes in rich cashew-tomato gravy, served over fragrant jeera basmati rice with pickled onions.",
    price: 180,
    originalPrice: 210,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 10,
    rating: 4.95,
    tags: ["Bestseller", "Pure Veg 🌱"],
    spiceLevel: "Medium",
  },
  {
    id: "dish-5",
    name: "Avocado & Edamame Protein Bowl",
    restaurantId: "healthy-bites",
    restaurantName: "Healthy Bites",
    category: "salads",
    description: "Hass avocado chunks, tender shelled edamame, roasted chickpeas, purple cabbage, quinoa, and creamy sesame ginger glaze.",
    price: 220,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 8,
    rating: 4.8,
    tags: ["High Protein", "Clean Eating"],
    spiceLevel: "Mild",
  },
  {
    id: "dish-6",
    name: "Iced Double-Shot Hazelnut Cold Brew",
    restaurantId: "corner-cafe",
    restaurantName: "The Corner Café",
    category: "drinks",
    description: "24-hour slow cold brew steeped with roasted hazelnut notes, lightly sweetened with dates syrup and oat milk froth.",
    price: 130,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 4,
    rating: 4.9,
    tags: ["Cold Brew", "Caffeine"],
    spiceLevel: "Mild",
  },
];

export const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "rec-1",
    restaurantName: "Burger House",
    restaurantImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
    dishName: "Classic Double Smashed Cheeseburger",
    dishImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
    price: 190,
    date: "Yesterday • Lunch",
    itemsCount: 1,
    dishId: "dish-1",
  },
  {
    id: "rec-2",
    restaurantName: "The Corner Café",
    restaurantImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80",
    dishName: "Iced Double-Shot Hazelnut Cold Brew",
    dishImage: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80",
    price: 130,
    date: "12 Nov • Afternoon",
    itemsCount: 1,
    dishId: "dish-6",
  },
  {
    id: "rec-3",
    restaurantName: "Pizza Palace",
    restaurantImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
    dishName: "Truffle Sourdough Pizza Slice",
    dishImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80",
    price: 240,
    date: "10 Nov • Dinner",
    itemsCount: 2,
    dishId: "dish-2",
  },
];
