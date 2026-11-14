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
  menuSection?: string;
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
  slug?: string;
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
    "id": "bh-1",
    "name": "Classic Double Smashed Cheeseburger",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "burgers",
    "menuSection": "Fast Food",
    "description": "Two crispy-edged smashed patties with melted sharp cheddar, caramelized onions, house pickles, and secret sauce on a toasted brioche.",
    "price": 190,
    "originalPrice": 230,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 12,
    "rating": 4.9,
    "tags": [
      "Bestseller",
      "Top Pick"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "bh-2",
    "name": "Truffle Mushroom Swiss Burger",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "burgers",
    "menuSection": "Fast Food",
    "description": "Sautéed garlic cremini mushrooms, melted Swiss Emmental cheese, truffle aioli, and baby arugula on a glossy brioche bun.",
    "price": 220,
    "originalPrice": 260,
    "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 14,
    "rating": 4.8,
    "tags": [
      "Gourmet",
      "Chef Special"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "bh-3",
    "name": "Spicy Nashville Crispy Chicken Burger",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "burgers",
    "menuSection": "Fast Food",
    "description": "Double-dipped fried chicken breast tossed in cayenne butter glaze, topped with creamy cider slaw and dill pickles.",
    "price": 210,
    "originalPrice": 250,
    "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 15,
    "rating": 4.9,
    "tags": [
      "Fiery",
      "Bestseller"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "bh-4",
    "name": "Crispy Peri Peri Paneer Burger",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "burgers",
    "menuSection": "Fast Food",
    "description": "Panko-crusted fresh cottage cheese steak dusted with African peri-peri spices, roasted garlic mayo, and crunchy iceberg lettuce.",
    "price": 180,
    "originalPrice": 210,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 12,
    "rating": 4.75,
    "tags": [
      "Pure Veg 🌱"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "bh-5",
    "name": "Smoky BBQ Bacon Double Stack",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "burgers",
    "menuSection": "Fast Food",
    "description": "Two prime patties, hardwood smoked bacon, aged Monterey Jack cheese, and house bourbon barbecue glaze with crispy onion straws.",
    "price": 260,
    "originalPrice": 290,
    "image": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 16,
    "rating": 4.85,
    "tags": [
      "Meat Lovers"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "bh-6",
    "name": "Loaded Truffle Parmesan Fries",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Hand-cut Idaho russet potato fries tossed with aromatic white truffle oil, grated 24-month parmesan, and fresh chopped parsley.",
    "price": 140,
    "originalPrice": 170,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 8,
    "rating": 4.8,
    "tags": [
      "Crispy",
      "Popular"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "bh-7",
    "name": "Smoky Jalapeño Cheese Poppers (6 Pcs)",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Crispy golden croquettes stuffed with fire-roasted jalapeños, molten cheddar, and cream cheese, served with chipotle ranch.",
    "price": 130,
    "originalPrice": 160,
    "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 8,
    "rating": 4.7,
    "tags": [
      "Cheesy"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "bh-8",
    "name": "Buffalo Hot Glazed Chicken Wings (6 Pcs)",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Crispy chicken wings drenched in tangy New York buffalo sauce, served with cool celery sticks and blue cheese dipping sauce.",
    "price": 210,
    "originalPrice": 240,
    "image": "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 12,
    "rating": 4.85,
    "tags": [
      "Hot & Tangy"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "bh-9",
    "name": "Crispy Golden Onion Rings with Garlic Dip",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Thick-cut sweet yellow onion rings double-battered in craft beer batter, served with smoked paprika aioli.",
    "price": 120,
    "image": "https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 6,
    "rating": 4.65,
    "tags": [
      "Crunchy"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "bh-10",
    "name": "Thick Salted Caramel Pretzel Shake",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Creamy vanilla bean custard churned with salted fleur de sel caramel, crushed salty pretzels, and whipped mascarpone.",
    "price": 160,
    "originalPrice": 190,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 5,
    "rating": 4.9,
    "tags": [
      "Dessert Shake"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "bh-11",
    "name": "Classic Oreo Crumb Milkshake",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Rich dark chocolate fudge and crunchy Oreo biscuits blended with whole farm milk and topped with dark cocoa dust.",
    "price": 150,
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.8,
    "tags": [
      "Kids Favorite"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "bh-12",
    "name": "Chilled Craft Lemonade with Mint & Ginger",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Freshly squeezed lemon juice, crushed garden mint leaves, organic raw cane sugar, and ginger zest over crushed ice.",
    "price": 90,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.7,
    "tags": [
      "Refreshing"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "bh-13",
    "name": "Warm Chocolate Molten Lava Cake",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Decadent dark chocolate soufflé cake with a warm flowing liquid fudge core, served with vanilla chantilly cream.",
    "price": 150,
    "originalPrice": 180,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 8,
    "rating": 4.9,
    "tags": [
      "Warm & Sweet"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "bh-14",
    "name": "New York Baked Cheesecake with Berry Coulis",
    "restaurantId": "burger-house",
    "restaurantName": "Burger House",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Silky Philadelphia cream cheese on a buttery graham cracker crust, drizzled with wild blackberry and raspberry glaze.",
    "price": 190,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.85,
    "tags": [
      "Classic"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-1",
    "name": "Truffle Sourdough Pizza Slice",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "pizza",
    "menuSection": "Fast Food",
    "description": "48-hour fermented sourdough base, wild sautéed mushrooms, fior di latte mozzarella, finished with white truffle oil.",
    "price": 240,
    "originalPrice": 280,
    "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 15,
    "rating": 4.9,
    "tags": [
      "Woodfire",
      "Gourmet"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-2",
    "name": "Classic Margherita con Bufala Pizza",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "pizza",
    "menuSection": "Fast Food",
    "description": "San Marzano D.O.P. tomato sauce, fresh buffalo mozzarella, fragrant Genovese basil leaves, and cold-pressed olive oil.",
    "price": 280,
    "originalPrice": 320,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 15,
    "rating": 4.95,
    "tags": [
      "Italian Classic",
      "Bestseller"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-3",
    "name": "Spicy Pepperoni & Hot Honey Pizza",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "pizza",
    "menuSection": "Fast Food",
    "description": "Crispy cup-and-char pepperoni rounds, aged mozzarella, chili tomato sauce, drizzled with artisan habanero hot honey.",
    "price": 340,
    "originalPrice": 380,
    "image": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 16,
    "rating": 4.9,
    "tags": [
      "Sweet & Spicy",
      "Chef Choice"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "pp-4",
    "name": "Quattro Formaggi Four Cheese White Pie",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "pizza",
    "menuSection": "Fast Food",
    "description": "Garlic cream base layered with creamy Gorgonzola, smoked provolone, fresh mozzarella, and shaved pecorino romano.",
    "price": 320,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 14,
    "rating": 4.85,
    "tags": [
      "Super Cheesy"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-5",
    "name": "Smoked Chicken & Caramelized Onion Pizza",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "pizza",
    "menuSection": "Fast Food",
    "description": "Charcoal-smoked chicken strips, slow-caramelized red onions, roasted bell peppers, and fresh rosemary sprigs.",
    "price": 330,
    "originalPrice": 360,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 16,
    "rating": 4.8,
    "tags": [
      "Woodfire"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "pp-6",
    "name": "Wild Mushroom Fettuccine Alfredo",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "pasta",
    "menuSection": "Main Course",
    "description": "Handmade egg fettuccine tossed in velvety parmesan garlic butter cream, porcini mushrooms, and fresh garden thyme.",
    "price": 270,
    "originalPrice": 310,
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 14,
    "rating": 4.85,
    "tags": [
      "Creamy Pasta"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-7",
    "name": "Spicy Arrabbiata Penne with Roasted Garlic",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "pasta",
    "menuSection": "Main Course",
    "description": "Al dente penne rigate simmered in fiery San Marzano tomato sauce with Calabrian chilies, roasted garlic, and chopped basil.",
    "price": 230,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 12,
    "rating": 4.75,
    "tags": [
      "Spicy Italian"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "pp-8",
    "name": "Slow-Braised Chicken Bolognese Tagliatelle",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "pasta",
    "menuSection": "Main Course",
    "description": "Tender minced chicken simmered for 4 hours with sweet mirepoix vegetables, red wine reduction, and finished with aged parmesan.",
    "price": 310,
    "image": "https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 15,
    "rating": 4.9,
    "tags": [
      "Hearty Bowl"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "pp-9",
    "name": "Cheesy Garlic Sourdough Breadsticks",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Stone-baked sourdough batons brushed with confit garlic butter, sprinkled with oregano and melted mozzarella, with marinara dip.",
    "price": 140,
    "image": "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 10,
    "rating": 4.8,
    "tags": [
      "Fresh Baked"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-10",
    "name": "Heirloom Tomato & Basil Burrata Bruschetta",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Grilled country bread topped with marinated heirloom cherry tomatoes, creamy Puglia burrata cheese, and aged balsamic reduction.",
    "price": 190,
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 8,
    "rating": 4.9,
    "tags": [
      "Artisanal"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-11",
    "name": "Herb Roasted Potato Wedges with Truffle Aioli",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Golden Yukon potato wedges seasoned with sea salt, rosemary, and cracked black pepper, served with velvety truffle mayo.",
    "price": 130,
    "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 10,
    "rating": 4.7,
    "tags": [
      "Crisp"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-12",
    "name": "Traditional Venetian Espresso Tiramisu",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Savoiardi ladyfingers soaked in dark roast espresso, layered with airy mascarpone zabaglione and dusted with Valrhona cocoa.",
    "price": 210,
    "originalPrice": 240,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.95,
    "tags": [
      "Bestseller",
      "Authentic"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-13",
    "name": "Sicilian Blood Orange Sparkling Soda",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Effervescent Italian mineral water infused with sun-ripened Sicilian red oranges and crushed mint.",
    "price": 110,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.7,
    "tags": [
      "Imported Citrus"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "pp-14",
    "name": "Vanilla Panna Cotta with Passionfruit Glaze",
    "restaurantId": "pizza-palace",
    "restaurantName": "Pizza Palace",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Silky Madagascar vanilla bean cooked cream set chilled, paired with tangy tropical passionfruit coulis.",
    "price": 170,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.8,
    "tags": [
      "Light & Sweet"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-1",
    "name": "Salmon & Avocado Maki Roll (8 Pcs)",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "sushi",
    "menuSection": "Chinese",
    "description": "Fresh Atlantic salmon, ripe hass avocado, toasted sesame seeds, served with wasabi, pickled ginger, and artisanal soy dip.",
    "price": 320,
    "originalPrice": 360,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 18,
    "rating": 4.85,
    "tags": [
      "Chef Special",
      "Fresh Catch"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-2",
    "name": "Crispy Tempura Prawn Roll (8 Pcs)",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "sushi",
    "menuSection": "Chinese",
    "description": "Golden fried tiger prawns rolled with cucumber strips, tobiko orange roe, and savory unagi glaze.",
    "price": 340,
    "originalPrice": 380,
    "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 16,
    "rating": 4.9,
    "tags": [
      "Crunchy",
      "Popular"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-3",
    "name": "Spicy Tuna Crunch Roll with Sriracha Mayo",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "sushi",
    "menuSection": "Chinese",
    "description": "Yellowfin tuna tossed in spicy sesame chili oil, tempura crisps, scallions, and Japanese Kewpie mayonnaise.",
    "price": 330,
    "image": "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 15,
    "rating": 4.85,
    "tags": [
      "Spicy Roll"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "sw-4",
    "name": "Avocado Cucumber & Crispy Asparagus Roll",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "sushi",
    "menuSection": "Chinese",
    "description": "Panko fried tender asparagus, fresh cucumber julienne, avocado slices, and yuzu miso dressing.",
    "price": 250,
    "originalPrice": 280,
    "image": "https://images.unsplash.com/photo-1562436260-8c9216eeb703?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 14,
    "rating": 4.8,
    "tags": [
      "Pure Veg 🌱"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-5",
    "name": "Golden Dragon Roll with Glazed Teriyaki",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "sushi",
    "menuSection": "Chinese",
    "description": "Inside-out sushi roll topped with sliced avocado scales, sweet soy reduction, and toasted sesame seeds.",
    "price": 360,
    "image": "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 18,
    "rating": 4.92,
    "tags": [
      "Luxury Signature"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-6",
    "name": "Traditional Tonkotsu Chicken Chashu Ramen",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "ramen",
    "menuSection": "Main Course",
    "description": "12-hour simmered savory broth, wheat noodles, tender sliced braised chicken, soft-boiled ajitsuke egg, and nori sheets.",
    "price": 320,
    "originalPrice": 360,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 20,
    "rating": 4.95,
    "tags": [
      "Hearty Broth",
      "Bestseller"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "sw-7",
    "name": "Spicy Miso Ramen with Charred Corn & Tofu",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "ramen",
    "menuSection": "Main Course",
    "description": "Rich red miso broth, springy ramen noodles, pan-seared silky tofu, sweet charred corn, menma bamboo shoots, and rayu chili oil.",
    "price": 280,
    "image": "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 18,
    "rating": 4.85,
    "tags": [
      "Pure Veg Ramen"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "sw-8",
    "name": "Crispy Teriyaki Chicken Donburi Rice Bowl",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "bowls",
    "menuSection": "Main Course",
    "description": "Steamed Japanese Koshihikari short-grain rice topped with glazed teriyaki chicken thigh, steamed bok choy, and pickled daikon.",
    "price": 290,
    "image": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 16,
    "rating": 4.8,
    "tags": [
      "Rice Bowl"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-9",
    "name": "Pan-Seared Chicken Gyoza Dumplings (6 Pcs)",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Crispy bottom steamed Japanese dumplings stuffed with minced ginger chicken and scallions, served with black vinegar dip.",
    "price": 220,
    "originalPrice": 250,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 12,
    "rating": 4.88,
    "tags": [
      "Handmade Dumplings"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-10",
    "name": "Crispy Vegetable Gyoza with Sesame Soy (6 Pcs)",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Delicate dumplings filled with finely shredded cabbage, shiitake mushrooms, carrots, and water chestnuts.",
    "price": 190,
    "image": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 10,
    "rating": 4.75,
    "tags": [
      "Veg Dumpling"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-11",
    "name": "Steamed Sea Salt & Garlic Edamame Pods",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Fresh green whole soybeans in the pod, steamed and tossed in flaky Maldon sea salt and roasted sesame oil.",
    "price": 160,
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 6,
    "rating": 4.7,
    "tags": [
      "Healthy Snack"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-12",
    "name": "Japanese Crispy Chicken Karaage with Kewpie",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Soy-ginger marinated boneless chicken thigh pieces double-fried in potato starch until ultra-crunchy, served with lemon wedges.",
    "price": 240,
    "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 12,
    "rating": 4.9,
    "tags": [
      "Tokyo Street Food"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "sw-13",
    "name": "Iced Ceremonial Matcha Green Tea Latte",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Stone-ground Uji matcha green tea whisked with silky oat milk and a touch of organic cane sugar over rock ice.",
    "price": 150,
    "image": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.85,
    "tags": [
      "Super Antioxidant"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "sw-14",
    "name": "Sparkling Japanese Yuzu Citrus Cooler",
    "restaurantId": "sushi-world",
    "restaurantName": "Sushi World",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Fragrant Japanese yuzu citrus fruit extract, sparkling water, fresh mint leaves, and lime juice.",
    "price": 130,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.75,
    "tags": [
      "Citrus Zing"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-1",
    "name": "Avocado & Edamame Protein Bowl",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "salads",
    "menuSection": "Main Course",
    "description": "Hass avocado chunks, tender shelled edamame, roasted chickpeas, purple cabbage, quinoa, and creamy sesame ginger glaze.",
    "price": 220,
    "originalPrice": 260,
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 8,
    "rating": 4.8,
    "tags": [
      "High Protein",
      "Clean Eating"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-2",
    "name": "Mediterranean Grilled Chicken Mezze Bowl",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "salads",
    "menuSection": "Main Course",
    "description": "Herb-marinated grilled chicken breast, organic greens, Kalamata olives, heirloom cherry tomatoes, feta crumbles, and tahini dressing.",
    "price": 260,
    "originalPrice": 300,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 10,
    "rating": 4.9,
    "tags": [
      "Keto Friendly",
      "Bestseller"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-3",
    "name": "Roasted Sweet Potato & Quinoa Power Salad",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "salads",
    "menuSection": "Main Course",
    "description": "Caramelized sweet potato cubes, tricolor quinoa, toasted pumpkin seeds, baby spinach, dried cranberries, and maple cider dressing.",
    "price": 210,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 8,
    "rating": 4.75,
    "tags": [
      "Fiber Rich"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-4",
    "name": "Wild Salmon & Baby Spinach Keto Bowl",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "salads",
    "menuSection": "Main Course",
    "description": "Pan-seared Atlantic salmon fillet served over fresh baby spinach, cucumber ribbons, asparagus tips, and lemon dill vinaigrette.",
    "price": 330,
    "originalPrice": 380,
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 12,
    "rating": 4.95,
    "tags": [
      "Omega-3 Rich"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-5",
    "name": "Chipotle Grilled Paneer & Brown Rice Bowl",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "salads",
    "menuSection": "Main Course",
    "description": "Smoked chipotle paneer cubes, nutty organic brown basmati, black beans, charred sweet corn, guacamole, and salsa fresca.",
    "price": 230,
    "image": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 10,
    "rating": 4.85,
    "tags": [
      "Protein Bowl"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "hb-6",
    "name": "Crispy Herb Falafel & Beetroot Hummus Wrap",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "wraps",
    "menuSection": "Fast Food",
    "description": "Whole wheat tortilla rolled with golden chickpea falafels, ruby beetroot hummus, pickled turnips, and garlic tahini yogurt.",
    "price": 180,
    "originalPrice": 210,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 8,
    "rating": 4.8,
    "tags": [
      "Plant Powered"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-7",
    "name": "Smoked Chicken Breast & Avocado Multigrain Wrap",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "wraps",
    "menuSection": "Fast Food",
    "description": "Thinly sliced lean smoked chicken breast, creamy avocado mash, sharp arugula, and Greek yogurt dressing wrapped in multigrain flatbread.",
    "price": 230,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 8,
    "rating": 4.85,
    "tags": [
      "Lean Protein"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-8",
    "name": "Grilled Halloumi & Roasted Bell Pepper Wrap",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "wraps",
    "menuSection": "Fast Food",
    "description": "Char-grilled squeaky Cypriot halloumi cheese, balsamic roasted sweet bell peppers, and basil walnut pesto wrap.",
    "price": 210,
    "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 8,
    "rating": 4.75,
    "tags": [
      "Gourmet Wrap"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-9",
    "name": "Cold-Pressed Green Detox Juice (Apple & Kale)",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "100% pure cold-pressed Granny Smith green apple, Tuscan curly kale, crisp celery, English cucumber, and Persian lime.",
    "price": 140,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.8,
    "tags": [
      "No Added Sugar",
      "Detox"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-10",
    "name": "Immunity Booster Beet & Pomegranate Elixir",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Cold-extracted ruby red beetroot, sweet organic pomegranate seeds, carrot juice, and fresh cold ginger root.",
    "price": 140,
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.85,
    "tags": [
      "Immunity"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-11",
    "name": "Tender Coconut Water with Soaked Chia Seeds",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Fresh coastal green tender coconut water bottled raw with hydrated nutrient-dense black chia seeds.",
    "price": 90,
    "image": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 2,
    "rating": 4.9,
    "tags": [
      "Natural Electrolytes"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-12",
    "name": "Chia Seed & Coconut Milk Pudding with Berries",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Black chia seeds slow-steeped overnight in rich coconut milk, topped with wild blueberries, strawberries, and toasted almonds.",
    "price": 160,
    "image": "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.8,
    "tags": [
      "Gluten Free",
      "Vegan"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-13",
    "name": "Organic Peanut Butter & Cacao Energy Bites (4 Pcs)",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Hand-rolled raw bites made with Medjool dates, roasted crushed peanuts, organic rolled oats, and raw Peruvian cacao powder.",
    "price": 130,
    "image": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 2,
    "rating": 4.75,
    "tags": [
      "Energy Snack"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "hb-14",
    "name": "Acai Berry Super-Smoothie Bowl with House Granola",
    "restaurantId": "healthy-bites",
    "restaurantName": "Healthy Bites",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Thick frozen organic acai berry puree blended with frozen bananas, topped with crunchy honey almond granola and kiwi slices.",
    "price": 230,
    "originalPrice": 260,
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 6,
    "rating": 4.95,
    "tags": [
      "Superfood Bowl",
      "Bestseller"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-1",
    "name": "Iced Double-Shot Hazelnut Cold Brew",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "24-hour slow cold brew steeped with roasted hazelnut notes, lightly sweetened with dates syrup and oat milk froth.",
    "price": 130,
    "originalPrice": 150,
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.9,
    "tags": [
      "Cold Brew",
      "Caffeine"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-2",
    "name": "Signature Spanish Latte with Ceylon Cinnamon",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Double espresso shot layered over sweetened condensed milk, velvety steamed microfoam, and freshly ground true cinnamon.",
    "price": 140,
    "originalPrice": 170,
    "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.92,
    "tags": [
      "Sweet Coffee",
      "Bestseller"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-3",
    "name": "Velvety Flat White with Barista Oat Milk",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Double ristretto pull crowned with smooth, thin layer of steamed micro-textured oat milk with beautiful latte art.",
    "price": 130,
    "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.85,
    "tags": [
      "Barista Craft"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-4",
    "name": "Single-Origin Pour-Over Filter Coffee (Ethiopia)",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Slow-brewed Hario V60 extraction highlighting floral jasmine aromas, bergamot citrus, and honey sweetness.",
    "price": 160,
    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 6,
    "rating": 4.88,
    "tags": [
      "Specialty Coffee"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-5",
    "name": "Iced Caramel Macchiato with Salted Cold Foam",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Chilled milk flavored with Madagascar vanilla, topped with rich espresso float and thick house caramel sauce lattice.",
    "price": 150,
    "image": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 4,
    "rating": 4.8,
    "tags": [
      "Iced Favorite"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-6",
    "name": "Sourdough Avocado Toast with Poached Eggs",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "breakfast",
    "menuSection": "Fast Food",
    "description": "Toasted country sourdough spread with lime guacamole, two farm-fresh runny poached eggs, chili flakes, and toasted hemp seeds.",
    "price": 220,
    "originalPrice": 250,
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 10,
    "rating": 4.9,
    "tags": [
      "All-Day Breakfast",
      "Top Pick"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-7",
    "name": "Truffle Scrambled Eggs on Brioche",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "breakfast",
    "menuSection": "Fast Food",
    "description": "French-style slow-scrambled pasture eggs with butter and cream, white truffle oil, and chives on a thick toasted brioche.",
    "price": 190,
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 8,
    "rating": 4.8,
    "tags": [
      "Comfort Food"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-8",
    "name": "Fluffy Buttermilk Pancakes with Maple & Berries",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "breakfast",
    "menuSection": "Desserts",
    "description": "Stack of 3 pillowy golden pancakes served with whipped salted butter, pure Quebec maple syrup, and fresh seasonal strawberries.",
    "price": 180,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 10,
    "rating": 4.85,
    "tags": [
      "Pancake Stack"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-9",
    "name": "Smoked Chicken & Mozzarella Grilled Panini",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "sandwiches",
    "menuSection": "Fast Food",
    "description": "Artisan ciabatta pressed with roasted chicken breast, buffalo mozzarella, sun-dried tomatoes, and basil walnut pesto.",
    "price": 230,
    "originalPrice": 260,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 8,
    "rating": 4.82,
    "tags": [
      "Crispy Pressed"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-10",
    "name": "Caprese Focaccia with Fresh Mozzarella & Pesto",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "sandwiches",
    "menuSection": "Fast Food",
    "description": "Rosemary olive oil focaccia bread stuffed with sliced fresh fior di latte mozzarella, vine tomatoes, and creamy pine nut pesto.",
    "price": 190,
    "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 6,
    "rating": 4.75,
    "tags": [
      "Italian Sandwich"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-11",
    "name": "French Butter Croissant with Almond Frangipane",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "pastries",
    "menuSection": "Desserts",
    "description": "Laminated flaky Normandy butter croissant filled with almond cream, topped with toasted sliced almonds and powdered sugar.",
    "price": 150,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.9,
    "tags": [
      "Bakery Fresh"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-12",
    "name": "Warm Cinnamon Swirl Danish with Cream Glaze",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "pastries",
    "menuSection": "Desserts",
    "description": "Spiral pastry baked fresh with sweet brown sugar and cinnamon butter, finished with cream cheese glaze.",
    "price": 140,
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.85,
    "tags": [
      "Sweet Treat"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-13",
    "name": "Belgian Dark Chocolate Walnut Fudge Brownie",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "pastries",
    "menuSection": "Desserts",
    "description": "Dense 70% dark Belgian chocolate brownie loaded with toasted walnuts and sea salt crystals, served warm.",
    "price": 130,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 2,
    "rating": 4.9,
    "tags": [
      "Decadent"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "cc-14",
    "name": "Wild Blueberry Streusel Crumb Muffin",
    "restaurantId": "corner-cafe",
    "restaurantName": "The Corner Café",
    "category": "pastries",
    "menuSection": "Desserts",
    "description": "Moist bakery muffin bursting with fresh plump blueberries and crowned with crispy cinnamon butter streusel.",
    "price": 120,
    "image": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 2,
    "rating": 4.75,
    "tags": [
      "Morning Coffee Companion"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "th-1",
    "name": "Crispy Paneer Makhani Bowl",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "indian",
    "menuSection": "North Indian",
    "description": "Charred cottage cheese cubes in rich cashew-tomato gravy, served over fragrant jeera basmati rice with pickled onions.",
    "price": 180,
    "originalPrice": 210,
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 10,
    "rating": 4.95,
    "tags": [
      "Bestseller",
      "Pure Veg 🌱"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "th-2",
    "name": "Old Delhi Style Butter Chicken (Murgh Makhani)",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "indian",
    "menuSection": "North Indian",
    "description": "Tandoor-charred chicken tikka simmered in velvety satin tomato sauce with churned white butter, fenugreek, and cream.",
    "price": 290,
    "originalPrice": 330,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 15,
    "rating": 4.96,
    "tags": [
      "All-Time Favorite",
      "Iconic"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "th-3",
    "name": "Dal Makhani Slow-Simmered Overnight (24 Hrs)",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "indian",
    "menuSection": "North Indian",
    "description": "Whole black urad lentils and kidney beans slow-simmered over tandoor clay embers for 24 hours with butter and cream.",
    "price": 210,
    "originalPrice": 240,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 10,
    "rating": 4.9,
    "tags": [
      "Slow Cooked",
      "Comfort"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "th-4",
    "name": "Kadhai Paneer with Crushed Coriander & Bell Peppers",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "indian",
    "menuSection": "North Indian",
    "description": "Fresh paneer blocks and crunchy peppers tossed in a rustic cast-iron wok with pounded coriander seeds and dry red chilies.",
    "price": 240,
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 12,
    "rating": 4.8,
    "tags": [
      "Spiced Gravy"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "th-5",
    "name": "Kashmiri Mutton Rogan Josh Slow-Braised Gravy",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "indian",
    "menuSection": "North Indian",
    "description": "Tender pieces of goat meat braised with Kashmiri chilies, ratan jot, fennel powder, and dried ginger in rich yogurt gravy.",
    "price": 360,
    "originalPrice": 400,
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 18,
    "rating": 4.92,
    "tags": [
      "Royal Recipe"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "th-6",
    "name": "Charred Amritsari Paneer Tikka (6 Pcs)",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Plump cubes of fresh malai paneer marinated in hung curd, ajwain, and mustard oil, roasted on iron skewers in clay oven.",
    "price": 220,
    "originalPrice": 250,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 12,
    "rating": 4.88,
    "tags": [
      "Clay Oven",
      "Bestseller"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "th-7",
    "name": "Smoky Tandoori Chicken Tikka (6 Pcs)",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Boneless chicken thigh chunks steeped in degi mirch, ginger garlic, and Greek yogurt, cooked over glowing charcoal.",
    "price": 260,
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 14,
    "rating": 4.9,
    "tags": [
      "Charcoal Grilled"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "th-8",
    "name": "Bhatti Ka Murgh Charred Tandoori Chicken (Half)",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Half chicken on the bone marinated in dark roasted whole spices and hung curd, roasted till smoky with lemon butter glaze.",
    "price": 280,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 18,
    "rating": 4.85,
    "tags": [
      "Authentic Bhatti"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "th-9",
    "name": "Dahi Ke Kebab Crispy Spiced Yogurt Patties (4 Pcs)",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "starters",
    "menuSection": "Starters",
    "description": "Silky hung yogurt infused with roasted cumin, green chilies, and fresh mint, shallow-fried with a delicate crunchy crust.",
    "price": 190,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 10,
    "rating": 4.8,
    "tags": [
      "Melt in Mouth"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "th-10",
    "name": "Hyderabadi Chicken Dum Biryani with Mirchi Ka Salan",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "biryani",
    "menuSection": "Biryani & Rice",
    "description": "Aged long-grain basmati rice and marinated chicken cooked on slow 'dum' seal with saffron milk, fried onions, and mint.",
    "price": 270,
    "originalPrice": 310,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    "isVeg": false,
    "prepTimeMinutes": 15,
    "rating": 4.95,
    "tags": [
      "Dum Cooked",
      "Bestseller"
    ],
    "spiceLevel": "Spicy"
  },
  {
    "id": "th-11",
    "name": "Lucknowi Nawabi Subz Biryani with Burani Raita",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "biryani",
    "menuSection": "Biryani & Rice",
    "description": "Layered basmati rice with garden carrots, beans, peas, and paneer cubes infused with kewra water and green cardamom.",
    "price": 220,
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 12,
    "rating": 4.85,
    "tags": [
      "Pure Veg Biryani"
    ],
    "spiceLevel": "Medium"
  },
  {
    "id": "th-12",
    "name": "Garlic Butter Naan Fresh from the Clay Oven",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "breads",
    "menuSection": "Biryani & Rice",
    "description": "Soft leavened flatbread slapped against tandoor wall, glazed with melted salted amul butter and minced garlic cilantro.",
    "price": 60,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 5,
    "rating": 4.9,
    "tags": [
      "Hot Bread"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "th-13",
    "name": "Kesariya Malai Kulfi on a Stick with Pistachios",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Traditional slow-reduced whole milk kulfi infused with Kashmiri saffron strands, green cardamom, and crushed Iranian pista.",
    "price": 110,
    "image": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 2,
    "rating": 4.9,
    "tags": [
      "Traditional Kulfi"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "th-14",
    "name": "Warm Gulab Jamun with Rabri (2 Pcs)",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "desserts",
    "menuSection": "Desserts",
    "description": "Deep-fried khoya dumplings soaked in fragrant rose-cardamom sugar syrup, served over thick chilled rabri.",
    "price": 120,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.92,
    "tags": [
      "Royal Sweet"
    ],
    "spiceLevel": "Mild"
  },
  {
    "id": "th-15",
    "name": "Royal Mango Lassi with Saffron & Cardamom",
    "restaurantId": "tandoor-hub",
    "restaurantName": "Tandoor & Curry Hub",
    "category": "drinks",
    "menuSection": "Beverages",
    "description": "Thick hand-churned yogurt blended with Alphonso mango pulp, saffron essence, and garnished with sliced pistachios.",
    "price": 90,
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "prepTimeMinutes": 3,
    "rating": 4.88,
    "tags": [
      "Thick Lassi"
    ],
    "spiceLevel": "Mild"
  }
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
