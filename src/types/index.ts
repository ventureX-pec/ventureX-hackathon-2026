export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'gluten-free';

export interface CustomizationOption {
  name: string;
  price: number;
}

export interface CustomizationGroup {
  name: string;
  required?: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  dietary: DietaryType;
  isAvailable: boolean;
  prepTimeMins: number;
  isPopular?: boolean;
  isChefsSpecial?: boolean;
  allergens?: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy';
  customizations?: CustomizationGroup[];
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedCustomizations: string[];
  specialInstructions?: string;
  image: string;
}

export type OrderType = 'dine-in' | 'takeaway';

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export type PaymentStatus = 'paid' | 'pay_at_counter';

export type PaymentMethod = 'upi' | 'cash' | 'card';

export interface Order {
  id: string;
  tokenNumber: number;
  orderType: OrderType;
  tableNumber?: number;
  customerName: string;
  customerPhone?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  pickupTime?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  upiId: string;
  openingHours: string;
  tablesCount: number;
  avgPreparationTimeMins: number;
}
