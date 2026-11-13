export interface MenuItem {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  category: "bestsellers" | "bowls" | "quick-bites" | "pizza-wraps" | "beverages";
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
  currentQueue: number; // orders in front
  isOpen: boolean;
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: "corner-cafe",
    name: "The Corner Café",
    tagline: "Healthy Bowls, Grilled Wraps & Artisan Brews",
    cuisine: "Continental & Café",
    prepTime: "6-8 min",
    rating: 4.9,
    location: "Block B, Ground Floor",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    currentQueue: 4,
    isOpen: true,
  },
  {
    id: "woodfire-pizza",
    name: "Artisan Woodfire Pizzeria",
    tagline: "Slow-fermented Neapolitan sourdough slices",
    cuisine: "Italian & Gourmet",
    prepTime: "10-12 min",
    rating: 4.8,
    location: "Main Food Court, Stall 03",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    currentQueue: 7,
    isOpen: true,
  },
  {
    id: "green-bowl",
    name: "Green Bowl & Salad Co.",
    tagline: "High-protein macro bowls & cold-pressed greens",
    cuisine: "Healthy & Nutrition",
    prepTime: "4-6 min",
    rating: 4.7,
    location: "Sports Complex Kiosk",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    currentQueue: 2,
    isOpen: true,
  },
  {
    id: "chai-street",
    name: "Chai & Street Co.",
    tagline: "Kulhad adrak chai, bun maska & hot samosa chaat",
    cuisine: "Indian Snacks & Chai",
    prepTime: "3-5 min",
    rating: 4.9,
    location: "Library Courtyard",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    currentQueue: 3,
    isOpen: true,
  },
  {
    id: "tandoor-hub",
    name: "Tandoor & Curry Hub",
    tagline: "Charcoal naan rolls, smoked bowls & biryanis",
    cuisine: "North Indian & Mughlai",
    prepTime: "12-15 min",
    rating: 4.8,
    location: "Hostel Zone Dine Hall",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    currentQueue: 9,
    isOpen: true,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dish-1",
    name: "Crispy Paneer Makhani Bowl",
    restaurantId: "corner-cafe",
    restaurantName: "The Corner Café",
    category: "bowls",
    description: "Charred cottage cheese cubes in rich cashew-tomato gravy, served over fragrant jeera basmati rice with pickled onions.",
    price: 180,
    originalPrice: 210,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 7,
    rating: 4.9,
    tags: ["Bestseller", "High Protein", "Chef Special"],
    spiceLevel: "Medium",
  },
  {
    id: "dish-2",
    name: "Truffle Mushroom & Mozzarella Slice",
    restaurantId: "woodfire-pizza",
    restaurantName: "Artisan Woodfire Pizzeria",
    category: "pizza-wraps",
    description: "48-hour fermented sourdough base, wild sautéed mushrooms, fior di latte mozzarella, finished with white truffle oil.",
    price: 240,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 10,
    rating: 4.9,
    tags: ["Woodfire", "Sourdough", "Gourmet"],
    spiceLevel: "Mild",
  },
  {
    id: "dish-3",
    name: "Grilled Mediterranean Falafel Wrap",
    restaurantId: "corner-cafe",
    restaurantName: "The Corner Café",
    category: "pizza-wraps",
    description: "Crispy herb falafels, smoked hummus, pickled gherkins, and crunchy romaine wrapped in a warm whole-wheat tortilla.",
    price: 160,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 6,
    rating: 4.7,
    tags: ["Handheld", "Zero Mess", "Quick"],
    spiceLevel: "Medium",
  },
  {
    id: "dish-4",
    name: "Fiery Peri-Peri Cottage Cheese Panini",
    restaurantId: "woodfire-pizza",
    restaurantName: "Artisan Woodfire Pizzeria",
    category: "quick-bites",
    description: "Toasted artisanal ciabatta pressed with spicy peri-peri cottage cheese, roasted bell peppers, and melted cheddar.",
    price: 195,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 8,
    rating: 4.8,
    tags: ["Hot & Toasted", "Bestseller"],
    spiceLevel: "Spicy",
  },
  {
    id: "dish-5",
    name: "Avocado & Edamame Protein Bowl",
    restaurantId: "green-bowl",
    restaurantName: "Green Bowl & Salad Co.",
    category: "bowls",
    description: "Hass avocado chunks, tender shelled edamame, roasted chickpeas, purple cabbage, quinoa, and creamy sesame ginger glaze.",
    price: 220,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 5,
    rating: 4.8,
    tags: ["Macro Clean", "22g Protein", "Vegan"],
    spiceLevel: "Mild",
  },
  {
    id: "dish-6",
    name: "Iced Double-Shot Hazelnut Brew",
    restaurantId: "corner-cafe",
    restaurantName: "The Corner Café",
    category: "beverages",
    description: "24-hour slow cold brew steeped with roasted hazelnut notes, lightly sweetened with dates syrup and oat milk froth.",
    price: 130,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 3,
    rating: 4.9,
    tags: ["Cold Brew", "Caffeine Boost"],
    spiceLevel: "Mild",
  },
  {
    id: "dish-7",
    name: "Kulhad Ginger Cardamom Chai & Maska",
    restaurantId: "chai-street",
    restaurantName: "Chai & Street Co.",
    category: "beverages",
    description: "Freshly crushed ginger and green cardamom brewed with whole milk in authentic clay kulhad, served with toasted butter bun.",
    price: 65,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 3,
    rating: 4.95,
    tags: ["Campus Classic", "Hot Seller"],
    spiceLevel: "Mild",
  },
  {
    id: "dish-8",
    name: "Smoked Dum Vegetable Biryani",
    restaurantId: "tandoor-hub",
    restaurantName: "Tandoor & Curry Hub",
    category: "bowls",
    description: "Long-grain aged basmati layered with saffron, ghee-roasted farm vegetables, mint, and whole spices, sealed with dough dum.",
    price: 210,
    originalPrice: 240,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 12,
    rating: 4.85,
    tags: ["Dum Handi", "Royal Recipe"],
    spiceLevel: "Medium",
  },
  {
    id: "dish-9",
    name: "Amritsari Kulcha with Chana Masala",
    restaurantId: "tandoor-hub",
    restaurantName: "Tandoor & Curry Hub",
    category: "quick-bites",
    description: "Crispy layered tandoor-baked potato and herb kulcha, topped with white butter, served with slow-cooked pindi chole and tamarind chutney.",
    price: 140,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    prepTimeMinutes: 8,
    rating: 4.9,
    tags: ["Butter Crisp", "Popular"],
    spiceLevel: "Medium",
  },
];
