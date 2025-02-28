export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  variants: ProductVariant[];
  customizable: boolean;
  customizationOptions?: CustomizationOption[];
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  price?: number; // Additional price if different from base
  inStock: boolean;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'text' | 'image' | 'color' | 'position';
  required: boolean;
  options?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization?: any;
  variant?: ProductVariant;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: Address;
  orders?: Order[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}